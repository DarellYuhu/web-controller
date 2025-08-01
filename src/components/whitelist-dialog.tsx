import { Eye, Save } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useUpdatePrompts } from "@/hooks/use-update-prompts";
import { ScrollArea } from "./ui/scroll-area";

const formSchema = z.object({
  data: z.array(
    z.object({
      promptId: z.string(),
      score: z.number().nonnegative().max(10),
    }),
  ),
});
type FormSchema = z.infer<typeof formSchema>;

export const WhitelistDialog = ({
  item,
}: {
  item: BaseMetadata & { prompts: Prompt[] };
}) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: item.prompts.map((item) => ({
        promptId: item.id,
        score: item.score,
      })),
    },
  });
  const { fields } = useFieldArray({ control: form.control, name: "data" });
  const { mutate } = useUpdatePrompts();
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
        <ScrollArea className="h-[600px]">
          <Form {...form}>
            <form
              id="update-prompts-form"
              className="space-y-4"
              onSubmit={form.handleSubmit((val) =>
                mutate({ id: item.id, payload: val.data }),
              )}
            >
              {fields.map((field, idx) => (
                <div key={field.id} className="rounded-md p-3 border space-y-2">
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`data.${idx}.score`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Score</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(e.currentTarget.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Textarea
                    readOnly={true}
                    value={
                      item.prompts.find(({ id }) => id === field.promptId)?.text
                    }
                  />
                </div>
              ))}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="update-prompts-form">
            <Save /> Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
