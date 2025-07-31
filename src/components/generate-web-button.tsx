"use client";

import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { MonitorCog } from "lucide-react";

export const GenerateWebButton = ({ projectId }: { projectId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await http.post(`/projects/${projectId}/generate`);
    },
    onSuccess() {
      toast.success("Web is being generated");
    },
    onError() {
      toast.error("Something went wrong");
    },
  });
  return (
    <DropdownMenuItem onClick={() => mutate()} disabled={isPending}>
      <MonitorCog /> Generate Web
    </DropdownMenuItem>
  );
};
