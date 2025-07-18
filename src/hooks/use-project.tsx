import { getProject } from "@/api/project";
import { useQuery } from "@tanstack/react-query";

export const useProject = (id?: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id!),
    enabled: !!id,
  });
};
