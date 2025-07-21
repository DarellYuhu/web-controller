import { getTags } from "@/api/tag";
import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => {
      return getTags();
    },
  });
};
