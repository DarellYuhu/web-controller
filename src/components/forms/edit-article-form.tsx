"use client";

import { MarkdownEditor } from "@/components/markdown-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { SingleSelect } from "../single-select";
import { FileUploader } from "../file-uploader";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/lib/api";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useReference } from "@/hooks/use-reference";

const formSchema = z.object({
  contents: z.string().nonempty(),
  tagId: z.string().nonempty(),
  authorId: z.string().nonempty(),
  categoryId: z.string().nonempty(),
  image: z
    .union([z.file().mime(["image/png", "image/jpeg"]), z.string()])
    .optional(),
});
type FormSchema = z.infer<typeof formSchema>;
type Props = {
  article: Article;
  tags: BaseMetadata[];
  authors: BaseMetadata[];
  categories: Category[];
};

export function EditArticleForm({ tags, categories, authors, article }: Props) {
  const { data: reference } = useReference();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contents: article.contents ?? "",
      categoryId: article.categoryId ?? "",
      authorId: article.authorId ?? "",
      tagId: article.tagId ?? "",
      image: article.imageUrl ?? undefined,
    },
  });
  const { mutate } = useMutation({
    async mutationFn(payload: FormSchema) {
      if (typeof payload.image === "string") payload.image = undefined;
      await http.patch(`/articles/${article.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess() {
      toast.success("Article updated successfully 🎊");
    },
    onError() {
      toast.error("Something went wrong!");
    },
  });
  return (
    <div className="space-y-4">
      <p className="font-semibold text-xl">{article.title}</p>
      <Form {...form}>
        <form
          className="space-y-4"
          id="edit-article-form"
          onSubmit={form.handleSubmit((value) => mutate(value))}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tagId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SingleSelect
                      options={tags.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))}
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
                      options={categories.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))}
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
                      options={authors.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))}
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
                  {typeof form.watch("image") === "string" ? (
                    <div className="relative h-64 w-full">
                      <img
                        src={field.value}
                        alt="preview-image"
                        className="size-full rounded-md object-contain border p-1"
                      />
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        className="absolute top-2 right-2"
                        type="button"
                        onClick={() => form.setValue("image", undefined)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  ) : (
                    <FileUploader
                      value={
                        field.value && field.value instanceof File
                          ? [field.value]
                          : undefined
                      }
                      accept={{ "image/*": [] }}
                      maxSize={1024 * 1024 * 10}
                      onValueChange={(val) =>
                        field.onChange(val[0] ?? undefined)
                      }
                      multiple={false}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {reference && (
            <div className="h-[320px] overflow-y-auto p-2 rounded-md border">
              <p className="font-semibold text-gray-400">Reference</p>
              <div dangerouslySetInnerHTML={{ __html: reference }} />
            </div>
          )}
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
        form="edit-article-form"
      >
        Submit
      </Button>
    </div>
  );
}
