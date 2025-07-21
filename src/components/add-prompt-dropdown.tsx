import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useWhitelist } from "@/hooks/use-whitelist";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { useSelectedData } from "@/stores/selected-store";

export const AddPromptDropdown = () => {
  const { selected, setSelected } = useSelectedData();
  const { data: whitelist } = useWhitelist();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      await http.post(`/whitelist/${id}/prompts`, { data: selected });
    },
    onSuccess() {
      toast.success("Prompts added to the whitelist successfully");
    },
    onError() {
      toast.error("Something went wrong");
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={selected.length === 0}>
        <Button variant={"outline"}>
          Add to whitelist...
          <ChevronDownIcon
            className="-me-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {whitelist?.map((option) => (
          <DropdownMenuItem key={option.id} onClick={() => mutate(option.id)}>
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
