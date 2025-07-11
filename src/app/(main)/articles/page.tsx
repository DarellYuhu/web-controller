import { getArticles } from "@/api/article";
import { ArticleListItem } from "@/components/article-list-item";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="space-y-6">
      {/* <Button asChild> */}
      {/*   <Link href={"/articles/create"}>Create article</Link> */}
      {/* </Button> */}
      <div className="flex flex-col gap-3">
        {articles.map((item) => (
          <ArticleListItem article={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
