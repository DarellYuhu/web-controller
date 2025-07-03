import { http } from "@/lib/api";

export const getProjects = async () => {
  return (await http.get<Project[]>("/projects")).data;
};
