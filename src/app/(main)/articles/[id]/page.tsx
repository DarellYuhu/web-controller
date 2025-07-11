import { getArticle } from "@/api/article";
import { Badge } from "@/components/ui/badge";
import { Dot, UserPen } from "lucide-react";
import Markdown from "react-markdown";
import { format } from "date-fns";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);
  console.log(article);
  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-3xl">{article.title}</h1>
      <img
        src={article.imageUrl}
        className="w-[720px] h-[320px] object-cover rounded-md justify-self-center flex"
        alt={article.title}
      />
      <div className="space-x-2">
        <Badge variant={"outline"}>
          <UserPen />
          {article.author}
        </Badge>
        <Badge variant={"outline"}>{article.category}</Badge>
        <Badge>{article.project}</Badge>
        {article.datePublished && (
          <Badge>
            <Dot />{" "}
            {`Published: ${format(article.datePublished, "dd MMM yyyy")}`}
          </Badge>
        )}
      </div>
      <div className="markdown">
        <Markdown>{article.contents}</Markdown>
      </div>
    </div>
  );
}
