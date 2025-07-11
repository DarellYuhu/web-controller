import { http } from "@/lib/api";

export const getProjects = async () => {
  return (await http.get<Project[]>("/projects")).data;
};

export const getProject = async (id: string) => {
  return (await http.get<Project>(`/projects/${id}`)).data;
};
