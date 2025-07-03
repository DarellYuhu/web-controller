"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { useRef } from "react";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    name: z.string().nonempty(),
    tag: z.array(z.string()).nonempty(),
    port: z.coerce.number().positive().min(4000),
  })
  .required({ name: true });
type FormSchema = z.infer<typeof formSchema>;

export const CreateProjectForm = () => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      port: 0,
      tag: [],
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      await http.post("/projects", payload);
    },
    onSuccess: () => {
      toast.success("Project created successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else toast.error("Operation fail. Something went wrong!");
    },
  });

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className={buttonVariants()}>Add Project</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
          <DialogDescription>
            Please fill all the required field bellow to create the project!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="create-project-form"
            onSubmit={form.handleSubmit((val) => mutate(val))}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Tag</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) =>
                        field.onChange(e.target.value.split(/\s*,\s*/))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Seperate by comma (, ). Article that marked with this tag
                    will be be used by this project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>Min: 4000</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="create-project-form" type="submit">
            Submit
          </Button>
          <DialogClose
            ref={closeBtnRef}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
