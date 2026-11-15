import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~services/api";

import { keys } from "./keys";

export const useCard = (studentId: string) =>
	useQuery({ queryKey: keys.card(studentId), queryFn: () => api.getCard(studentId) });

/** Asks for a place with a workshop's code; the instructor approves it later. */
export function useJoinWorkshop(studentId: string) {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (code: string) => api.joinWorkshop(studentId, code),
		onSuccess: () => client.invalidateQueries({ queryKey: keys.card(studentId) }),
	});
}

/** Deletes the student's photo together with its consent record. */
export function useRemovePhoto(studentId: string) {
	const client = useQueryClient();
	return useMutation({
		mutationFn: () => api.removePhoto(studentId),
		onSuccess: (student) => client.setQueryData(keys.student(studentId), student),
	});
}
