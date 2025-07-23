"use client";

import { ArticleListItem } from "@/components/article-list-item";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useInfiniteArticles } from "@/hooks/use-infinite-articles";
import { http } from "@/lib/api";
import { useSelectedData } from "@/stores/selected-store";
import { useMutation } from "@tanstack/react-query";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { IoPushOutline } from "react-icons/io5";
import { toast } from "sonner";

export default function ArticlesPage() {
  const { data, fetchNextPage } = useInfiniteArticles({ isDraft: true });
  const setArray = useSelectedData((state) => state.setArray);
  const selected = useSelectedData((state) => state.selected);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: { data: string[] }) => {
      await http.post("/articles/drafts", payload);
    },
    onSuccess() {
      toast.success("Articles published successfully 🎊");
    },
    onError() {
      toast.error("Something went wrong");
    },
  });
  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: async (payload: { data: string[] }) => {
      await http.delete("/articles", { params: { list: payload.data } });
    },
    onSuccess() {
      toast.success("Articles deleted successfully 🎊");
    },
    onError() {
      toast.error("Something went wrong");
    },
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <Checkbox
              onCheckedChange={(state) => {
                if (state && data) {
                  setArray(
                    data.pages.flatMap((page) => page.data.map((i) => i.id)),
                  );
                } else {
                  setArray([]);
                }
              }}
            />{" "}
            <p>Select all</p>
          </div>
          <div className="space-x-2">
            <Button
              disabled={selected.length === 0 || isPending}
              onClick={() => mutate({ data: selected })}
            >
              <IoPushOutline />
              Publish
            </Button>
            <Button
              disabled={selected.length === 0 || isDeleting}
              onClick={() => handleDelete({ data: selected })}
              variant={"destructive"}
            >
              <Trash />
              Delete draft
            </Button>
            <Button asChild>
              <Link href={"/articles/create"}>
                <Plus /> Create
              </Link>
            </Button>
          </div>
        </div>
        {data?.pages
          .flatMap((item) => item.data)
          .map((item) => <ArticleListItem article={item} key={item.id} />)}
      </div>
      <Button onClick={() => fetchNextPage()} className="flex place-self-end">
        More
      </Button>
    </div>
  );
}
