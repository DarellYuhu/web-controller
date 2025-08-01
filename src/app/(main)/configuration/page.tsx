"use client";

import { AddPromptDropdown } from "@/components/add-prompt-dropdown";
import { CreateMetadataForm } from "@/components/forms/create-metadata-form";
import { CreatePromptForm } from "@/components/forms/create-prompt-form";
import { PromptListItem } from "@/components/prompt-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WhitelistDialog } from "@/components/whitelist-dialog";
import { useAuthors } from "@/hooks/use-authors";
import { useCategories } from "@/hooks/use-categories";
import { usePrompts } from "@/hooks/use-prompts";
import { useTags } from "@/hooks/use-tags";
import { useWhitelist } from "@/hooks/use-whitelist";
import { http } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
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
import { CircleAlertIcon, Trash } from "lucide-react";

export const dynamic = "force-dynamic";
export default function ConfigurationPage() {
  const { data: authors } = useAuthors();
  const { data: tags } = useTags();
  const { data: categories } = useCategories();
  const { data: whitelist } = useWhitelist();
  const { data: prompts } = usePrompts();
  return (
    <div className="space-y-4">
      <CreateMetadataForm />
      <div className="grid grid-cols-2 gap-3">
        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Author</p>
          <div className="space-y-2 mt-4">
            {authors?.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Category</p>
          <div className="space-y-2 mt-4">
            {categories?.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Tag</p>
          <div className="space-y-2 mt-4">
            {tags?.map((item) => (
              <div key={item.id} className="rounded-md p-3 border">
                {item.name}
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5">
          <p className="font-semibold text-xl">Whitelist</p>
          <div className="space-y-2 mt-4">
            {whitelist?.map((item) => (
              <div
                key={item.id}
                className="rounded-md p-3 border flex justify-between items-center group"
              >
                <p>{item.name}</p>
                <div className="space-x-2">
                  <WhitelistDialog item={item} />
                  <DeleteWhitelistAlert id={item.id} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <ScrollArea className="h-[400px] rounded-md border p-5 col-span-full">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-xl">Prompt</p>
            <div className="space-x-2">
              <AddPromptDropdown />
              <CreatePromptForm />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {prompts?.map((item) => (
              <PromptListItem item={item} key={item.id} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
function DeleteWhitelistAlert({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await http.delete(`/whitelist/${id}`);
    },
    onSuccess() {
      toast.success("Whitelist deleted successfully 🎊");
      queryClient.invalidateQueries({ queryKey: ["whitelist"] });
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
          size={"sm"}
          className="group-hover:visible group-hover:opacity-100 invisible opacity-0 ml-auto rounded-sm"
        >
          <Trash /> Delete
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
            <AlertDialogTitle>Delete whitelist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this whitelist?
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
