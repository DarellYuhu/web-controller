"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useSelectedData } from "@/stores/selected-store";
import { SectionType } from "@/types/exported";

export const SetSectionDropdown = () => {
  const selected = useSelectedData((state) => state.selected);
  const { id } = useParams();
  const { mutate } = useMutation({
    mutationFn: async ({ type }: { type: SectionType }) => {
      await http.patch(`/projects/${id}`, {
        newSection: selected.map((articleId) => ({ articleId, type })),
      });
    },
    onSuccess() {
      toast.success("Data submitted successfully 🎊");
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!(selected.length > 0)}>
        <Button variant={"outline"}>
          Menu{" "}
          <ChevronDownIcon
            className="-me-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add article to section...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => mutate({ type: SectionType.Highlight })}
        >
          Highlight
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutate({ type: SectionType.TopPick })}>
          Top Picks
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutate({ type: SectionType.Popular })}>
          Popular
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
