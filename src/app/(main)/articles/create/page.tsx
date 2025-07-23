"use client";

import { FileUploader } from "@/components/file-uploader";
import { MarkdownEditor } from "@/components/markdown-editor";
import { SingleSelect } from "@/components/single-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthors } from "@/hooks/use-authors";
import { useCategories } from "@/hooks/use-categories";
import { useTags } from "@/hooks/use-tags";
import { http } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";

const formSchema = z.object({
  contents: z.string().nonempty(),
  title: z.string().nonempty(),
  image: z.file().mime(["image/png", "image/jpeg"]),
  tagId: z.string(),
  categoryId: z.string(),
  authorId: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;

export default function CraeteArticlePage() {
  const { data: tags } = useTags();
  const { data: categories } = useCategories();
  const { data: authors } = useAuthors();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      contents: "",
      image: undefined,
      tagId: "",
      authorId: "",
      categoryId: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormSchema) => {
      await http.post("articles", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess() {
      toast.success("Article created successfully 🎊");
    },
    onError() {
      toast.error("Something went wrong");
    },
  });
  return (
    <div className="space-y-4">
      <p className="font-semibold text-xl">Create new article</p>
      <Form {...form}>
        <form
          className="space-y-4"
          id="create-article-form"
          onSubmit={form.handleSubmit((val) => mutate(val))}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <Input {...field} placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleSelect
                      options={
                        tags?.map((i) => ({
                          label: i.name,
                          value: i.id,
                        })) ?? []
                      }
                      onValueChange={field.onChange}
                      placeholder="Select Tag"
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleSelect
                      placeholder="Select Category"
                      onValueChange={field.onChange}
                      value={field.value}
                      options={
                        categories?.map((i) => ({
                          label: i.name,
                          value: i.id,
                        })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <SingleSelect
                      options={
                        authors?.map((i) => ({
                          label: i.name,
                          value: i.id,
                        })) ?? []
                      }
                      onValueChange={field.onChange}
                      value={field.value}
                      placeholder="Select Author"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    value={
                      field.value && field.value instanceof File
                        ? [field.value]
                        : undefined
                    }
                    accept={{ "image/*": [] }}
                    maxSize={1024 * 1024 * 10}
                    onValueChange={(val) => field.onChange(val[0] ?? undefined)}
                    multiple={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MarkdownEditor
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        className="flex justify-self-end"
        type="submit"
        form="create-article-form"
        disabled={isPending}
      >
        Submit
      </Button>
    </div>
  );
}
