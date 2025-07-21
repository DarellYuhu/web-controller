import { getWhitelist } from "@/api/whitelist";
import { useQuery } from "@tanstack/react-query";

export const useWhitelist = () => {
  return useQuery({
    queryKey: ["whitelist"],
    queryFn: () => {
      return getWhitelist();
    },
  });
};
