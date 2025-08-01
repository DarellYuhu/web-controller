import { useSelectedData } from "@/stores/selected-store";
import { Checkbox } from "./ui/checkbox";
import { CircleAlertIcon, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

export const PromptListItem = ({ item }: { item: Prompt }) => {
  const { selected, setSelected } = useSelectedData();
  return (
    <div className="rounded-md p-3 border flex items-center gap-2 group">
      <Checkbox
        checked={selected.includes(item.id)}
        onCheckedChange={() => setSelected(item.id)}
      />
      <p>{item.text}</p>
      <DeleteAlert id={item.id} />
    </div>
  );
};

function DeleteAlert({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await http.delete(`/prompts/${id}`);
    },
    onSuccess() {
      toast.success("Prompt deleted successfully 🎊");
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      setOpen(false);
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size={"icon"}
          className="size-7 group-hover:visible group-hover:opacity-100 invisible opacity-0 ml-auto rounded-sm"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prompt? This also delete the
              prompt from the whitelist.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()} disabled={isPending}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
