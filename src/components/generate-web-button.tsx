"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { http } from "@/lib/api";
import { toast } from "sonner";

export const GenerateWebButton = ({ projectId }: { projectId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await http.post(`/generator/${projectId}`);
    },
    onSuccess() {
      toast.success("Web is being generated");
    },
    onError() {
      toast.error("Something went wrong");
    },
  });
  return (
    <Button size={"sm"} onClick={() => mutate()} disabled={isPending}>
      Generate Web
    </Button>
  );
};
