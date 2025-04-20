import { SubjectDocument } from "@/types/schemaTypes";

/**
 * Fetches subjects for a given grade from the API.
 * @param grade - The grade number (1-12)
 * @returns Promise<SubjectDocument[]>
 * @throws Error if the network request fails
 */
export async function fetchSubjectsByGrade(
  grade: number
): Promise<SubjectDocument[]> {
  const res = await fetch(`/api/subject/get/${grade}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch subjects: ${res.status} ${res.statusText}`
    );
  }
  const json = await res.json();
  return json.data || [];
}
