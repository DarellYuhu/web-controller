import { http } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useReference = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ["reference", { id }],
    queryFn: async () => {
      const { data } = await http.get<string>(`/p/${id}`, {
        baseURL: "https://kuda.hitam.id/pavid/en/api/page",
      });
      return data;
    },
  });
};
