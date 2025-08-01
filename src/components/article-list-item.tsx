"use client";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, UserPen } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { useSelectedData } from "@/stores/selected-store";

export const ArticleListItem = ({ article }: { article: Article }) => {
  const { setSelected, selected } = useSelectedData();
  return (
    <div className="group border rounded-md flex flex-row p-3 gap-4 relative">
      <Checkbox
        className={`absolute top-4 left-4 bg-white group-hover:visible group-hover:opacity-100 invisible opacity-0 transition duration-150 ${selected.includes(article.id) && "opacity-100 visible"}`}
        checked={selected.includes(article.id)}
        onCheckedChange={() => setSelected(article.id)}
      />
      <img
        src={article.imageUrl}
        alt={article.slug}
        className="size-40 rounded-md object-cover shrink-0"
      />
      <div>
        <div className="flex flex-row gap-2">
          {article.author && (
            <Badge variant={"outline"}>
              <UserPen />
              {article.author}
            </Badge>
          )}
          <Badge variant={"outline"}>{article.category}</Badge>
          {article.project && <Badge>{article.project}</Badge>}
        </div>
        <p className="font-semibold">{article.title}</p>
        <p className="line-clamp-3">{article.contents}</p>
      </div>
      <div className="absolute top-2 right-2 group-hover:visible group-hover:opacity-100 invisible opacity-0 transition duration-150 space-x-2">
        <Button variant={"outline"} asChild>
          <Link href={`/articles/${article.id}/edit`}>
            <Pencil /> Edit
          </Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href={`/articles/${article.id}`}>
            <Eye /> View
          </Link>
        </Button>
      </div>
    </div>
  );
};
