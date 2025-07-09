"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { SingleSelect } from "../single-select";
import { capitalize } from "lodash";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { useRef } from "react";

enum Type {
  WHITELIST = "WHITELIST",
  TAG = "TAG",
  AUTHOR = "AUTHOR",
  CATEGORY = "CATEGORY",
}

const formSchema = z.object({
  name: z.string().nonempty(),
  type: z.nativeEnum(Type),
});
type FormSchema = z.infer<typeof formSchema>;

export const CreateMetadataForm = () => {
  const form = useForm<FormSchema>({ resolver: zodResolver(formSchema) });
  const closeRef = useRef<HTMLButtonElement>(null);
  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      const normalized = payload.name.split(/\s*,\s*/);
      let path = "";
      switch (payload.type) {
        case "WHITELIST":
          path = "/whitelist";
          break;
        case "TAG":
          path = "/tags";
          break;
        case "AUTHOR":
          path = "/authors";
          break;
        case "CATEGORY":
          path = "/categories";
          break;
      }
      await http.post(path, { data: normalized });
    },
    onSuccess() {
      toast.success("Data submitted!");
      closeRef.current?.click();
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className={buttonVariants()}>Add</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new data</DialogTitle>
          <DialogDescription>
            Please select the type that you want to add and input the value in
            the field bellow.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="create-metadata-form"
            onSubmit={form.handleSubmit((val) => mutate(val))}
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <SingleSelect
                      options={Object.values(Type).map((t) => ({
                        value: t.toString(),
                        label: capitalize(t.toString()),
                      }))}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Separate by comma (, )</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose
            ref={closeRef}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </DialogClose>
          <Button type="submit" form="create-metadata-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
