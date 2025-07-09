import { getArticles } from "@/api/article";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="space-y-6">
      <Button asChild>
        <Link href={"/articles/create"}>Create article</Link>
      </Button>
      {/* <CreateArticleForm /> */}
      <div className="flex flex-col gap-3">
        {articles.map((item) => (
          <div
            className="border rounded-md flex flex-row p-3 gap-4"
            key={item.id}
          >
            <img
              src={item.imageUrl}
              alt={item.slug}
              className="size-40 rounded-md object-cover shrink-0"
            />
            <div>
              <div className="flex flex-row gap-2">
                <Badge variant={"outline"}>
                  <UserPen />
                  {item.authorName}
                </Badge>
                <Badge variant={"outline"}>{item.category}</Badge>
                {item.project && <Badge>{item.project}</Badge>}
              </div>
              <p className="font-semibold">{item.title}</p>
              <p className="line-clamp-3">{item.contents}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
