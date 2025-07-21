import { http } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const usePrompts = () => {
  return useQuery({
    queryKey: ["prompts"],
    queryFn: async () => {
      const { data } = await http.get<Prompt[]>("prompts");
      return data;
    },
  });
};
