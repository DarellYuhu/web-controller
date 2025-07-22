import { http } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Payload = {
  id: string;
  payload: { score: number; promptId: string }[];
};

export const useUpdatePrompts = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: Payload) => {
      await http.patch(`/whitelist/${id}/prompts`, { data: payload });
    },
    onSuccess() {
      toast.success("Prompts updated successfully 🎊");
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });
};
