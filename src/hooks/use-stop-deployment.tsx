import { http } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useStopDeployment = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await http.post(`/projects/${id}/stop`);
    },
    onSuccess() {
      toast.success("Website stopped successfully 🎊");
    },
    onError() {
      toast.error("Fail stop website");
    },
  });
};
