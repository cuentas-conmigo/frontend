import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messages } from "~messages";
import { api } from "~services/api";

import type { ChargeOption, Payment, StartPayment } from "~typing/charges";

import { customOptionId } from "~typing/charges";
import { keys } from "./keys";

export const useChargeOptions = (workshopId: string) =>
	useQuery({
		queryKey: keys.chargeOptions(workshopId),
		queryFn: () => api.getChargeOptions(workshopId),
	});

/**
 * The charge picked on "¿Qué paga?": one of the workshop's options, or the amount typed on
 * "Ingresa el monto" when `optionId` is `custom`.
 */
export function useChargeChoice(
	workshopId: string,
	optionId: string | undefined,
	typedAmount?: string
) {
	const options = useChargeOptions(workshopId);
	const amount = Number(typedAmount);
	const option: ChargeOption | undefined =
		optionId === customOptionId
			? Number.isFinite(amount) && amount > 0
				? {
						id: customOptionId,
						label: messages.amount.concept,
						detail: messages.amount.concept,
						amount,
					}
				: undefined
			: options.data?.find((item) => item.id === optionId);
	return {
		option,
		isPending: optionId !== customOptionId && options.isPending,
		isError: options.isError,
	};
}

/** Starts a payment and seeds its cache entry, so the waiting screen has it at once. */
export function useStartPayment() {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (input: StartPayment) => api.startPayment(input),
		onSuccess: (payment) => client.setQueryData(keys.payment(payment.id), payment),
	});
}

/** Polls a payment every 2 s until it is paid, then refreshes the roster and the student's card. */
export function usePayment(paymentId: string | undefined, intervalMs = 2000) {
	const client = useQueryClient();
	const query = useQuery({
		queryKey: keys.payment(paymentId ?? ""),
		queryFn: () => api.getPayment(paymentId ?? ""),
		enabled: Boolean(paymentId),
		refetchInterval: (state) => (state.state.data?.status === "paid" ? false : intervalMs),
	});
	const paid: Payment | undefined = query.data?.status === "paid" ? query.data : undefined;

	useEffect(() => {
		if (!paid) return;
		client.invalidateQueries({ queryKey: keys.roster(paid.workshopId) });
		client.invalidateQueries({ queryKey: keys.card(paid.studentId) });
	}, [client, paid]);

	return query;
}
