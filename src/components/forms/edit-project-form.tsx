import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Pencil, X } from "lucide-react";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SingleFileUploader } from "../single-file-uploader";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  icon: z
    .union([
      z.file().mime(["image/png", "image/jpeg", "image/svg+xml"]),
      z.string(),
    ])
    .optional(),
  logo: z
    .union([z.file().mime(["image/png", "image/jpeg"]), z.string()])
    .optional(),
});
type FormSchema = z.infer<typeof formSchema>;

export const EditProjectForm = ({ project }: { project: Project }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      icon: project.icon,
      logo: project.logo,
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      await http.patch(`/projects/${project.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast.success("Project updated successfully 🎊");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
      <DialogTrigger className={buttonVariants({ size: "sm" })}>
        <Pencil /> Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project detail</DialogTitle>
          <DialogDescription>
            Please fill all the required field bellow
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-screen">
          <Form {...form}>
            <form
              className="space-y-4"
              id="edit-project-form"
              onSubmit={form.handleSubmit((val) => mutate(val))}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      {typeof form.watch("icon") === "string" ? (
                        <div className="relative">
                          <img
                            src={field.value}
                            alt="project-icon"
                            className="size-64 object-contain"
                          />
                          <Button
                            size={"icon"}
                            className="absolute top-2 right-2"
                            variant={"destructive"}
                            type="button"
                            onClick={() => form.setValue("icon", undefined)}
                          >
                            <X size={8} />
                          </Button>
                        </div>
                      ) : (
                        <SingleFileUploader
                          onFileChange={(file) =>
                            file[0] && field.onChange(file[0].file)
                          }
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      {typeof form.watch("logo") === "string" ? (
                        <div className="relative">
                          <img
                            src={field.value}
                            alt="project-icon"
                            className="size-64 object-contain"
                          />
                          <Button
                            size={"icon"}
                            className="absolute top-2 right-2"
                            variant={"destructive"}
                            type="button"
                            onClick={() => form.setValue("logo", undefined)}
                          >
                            <X size={8} />
                          </Button>
                        </div>
                      ) : (
                        <SingleFileUploader
                          onFileChange={(file) =>
                            file[0] && field.onChange(file[0].file)
                          }
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button form="edit-project-form" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
