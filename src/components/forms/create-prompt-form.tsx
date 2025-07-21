"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Plus, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  data: z.array(
    z.object({
      text: z.string(),
    }),
  ),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreatePromptForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: [{ text: "" }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "data",
  });
  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      await http.post("/prompts", payload);
    },
    onSuccess: () => {
      toast.success("Prompt created successfully 🎊");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>Create Prompt</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create prompt form</DialogTitle>
          <DialogDescription>
            Please fill the field bellow to{" "}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="create-prompt-form"
            onSubmit={form.handleSubmit((val) => mutate(val))}
          >
            <Button
              size={"sm"}
              className="flex place-self-end"
              type="button"
              onClick={() => append({ text: "" })}
            >
              <Plus /> Add
            </Button>
            {fields.map((field, idx) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`data.${idx}.text`}
                render={({ field }) => (
                  <FormItem className="flex gap-2">
                    <FormControl>
                      <Textarea {...field} placeholder="Prompt..." />
                    </FormControl>
                    <FormMessage />
                    <Button
                      className="size-8"
                      type="button"
                      size={"icon"}
                      onClick={() => remove(idx)}
                      variant={"destructive"}
                    >
                      <Trash />
                    </Button>
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-prompt-form">
            Submit
          </Button>
          <DialogClose className={buttonVariants({ variant: "outline" })}>
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
