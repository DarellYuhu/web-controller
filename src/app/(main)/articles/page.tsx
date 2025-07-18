"use client";

import { ArticleListItem } from "@/components/article-list-item";
import { Button } from "@/components/ui/button";
import { useInfiniteArticles } from "@/hooks/use-infinite-articles";

export default function ArticlesPage() {
  const { data, fetchNextPage } = useInfiniteArticles();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
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
