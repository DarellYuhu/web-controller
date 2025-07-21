import { Eye } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export const WhitelistDialog = ({
  item,
}: {
  item: BaseMetadata & { prompts: Prompt[] };
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className:
            "group-hover:visible invisible group-hover:opacity-100 opacity-0 transition duration-100",
        })}
      >
        <Eye /> Detail
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            Bellow is the listed prompt under this whitelist
          </DialogDescription>
        </DialogHeader>
        {item.prompts.map((prompt) => (
          <div key={prompt.id} className="rounded-md p-3 border">
            {prompt.text}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
