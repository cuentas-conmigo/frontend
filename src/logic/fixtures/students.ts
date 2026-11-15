import type { StudentProfile } from "~typing/students";

/** Invented students for the prototype; no real names, phones or photos. */
export const sampleStudents: readonly StudentProfile[] = [
	{
		id: "s-1",
		name: "Rosa Martínez",
		phone: "5500000001",
		helpers: [{ name: "Lucía", relation: "Hija", phone: "5500001122" }],
	},
	{ id: "s-2", name: "Ana López", phone: "5500000002" },
	{ id: "s-3", name: "Élida Ramírez", phone: "5500000003" },
	{ id: "s-4", name: "Carmen Ortiz", phone: "5500000004" },
	{
		id: "s-5",
		name: "Luisa Gómez",
		phone: "5500000005",
		helpers: [{ name: "Jorge", relation: "Hijo", phone: "5500003344" }],
	},
	{ id: "s-6", name: "Teresa Ruiz", phone: "5500000006" },
];

/** Finds a sample student by id. */
export function findStudent(id: string): StudentProfile | undefined {
	return sampleStudents.find((student) => student.id === id);
}
