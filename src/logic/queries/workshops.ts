import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~services/api";

import type { NewStudent } from "~typing/students";

import { keys } from "./keys";

export const useWorkshop = (workshopId: string) =>
	useQuery({ queryKey: keys.workshop(workshopId), queryFn: () => api.getWorkshop(workshopId) });

export const useRoster = (workshopId: string) =>
	useQuery({ queryKey: keys.roster(workshopId), queryFn: () => api.getRoster(workshopId) });

export const useStudent = (studentId: string) =>
	useQuery({ queryKey: keys.student(studentId), queryFn: () => api.getStudent(studentId) });

export const useReviewList = (workshopId: string) =>
	useQuery({ queryKey: keys.review(workshopId), queryFn: () => api.getReviewList(workshopId) });

export const useEnrollmentCode = (workshopId: string) =>
	useQuery({ queryKey: keys.code(workshopId), queryFn: () => api.getEnrollmentCode(workshopId) });

/** Approve, remove and add students; each refreshes the lists that show them. */
export function useEnrollment(workshopId: string) {
	const client = useQueryClient();
	const refresh = () => {
		client.invalidateQueries({ queryKey: keys.roster(workshopId) });
		client.invalidateQueries({ queryKey: keys.review(workshopId) });
	};

	return {
		approve: useMutation({
			mutationFn: (studentId: string) => api.approve(workshopId, studentId),
			onSuccess: refresh,
		}),
		release: useMutation({
			mutationFn: (studentId: string) => api.release(workshopId, studentId),
			onSuccess: refresh,
		}),
		add: useMutation({
			mutationFn: (input: NewStudent) => api.addStudent(workshopId, input),
			onSuccess: refresh,
		}),
		rotateCode: useMutation({
			mutationFn: () => api.rotateEnrollmentCode(workshopId),
			onSuccess: (code) => client.setQueryData(keys.code(workshopId), code),
		}),
	};
}
