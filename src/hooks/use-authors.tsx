import { getAuthors } from "@/api/author";
import { useQuery } from "@tanstack/react-query";

export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: () => {
      return getAuthors();
    },
  });
};
