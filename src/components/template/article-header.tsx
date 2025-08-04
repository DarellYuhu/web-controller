import { format } from "date-fns";
import { Badge } from "../ui/badge";
import readingTime from "reading-time";
import { Separator } from "../ui/separator";
import { User2 } from "lucide-react";

export const ArticleHeader = ({ selected }: { selected: number }) => {
  switch (selected) {
    case 1:
      return (
        <header className="p-10 space-y-4">
          <img
            src={article.imageUrl}
            alt="article image"
            className="w-full h-[500px] object-cover"
          />

          <div className="flex flex-row justify-between items-center">
            <div className="space-x-4">
              <Badge variant={"outline"} className="text-lg">
                {article.category}
              </Badge>
              <Badge variant={"outline"} className="text-lg">
                {article.authorName}
              </Badge>
            </div>

            <div className="flex flex-row gap-2 items-center h-3">
              <p>{format(article.datePublished, "dd MMM, yyyy")}</p>
              <Separator orientation="vertical" className="bg-neutral-400" />
              <p>{readingTime(article.contents).text}</p>
            </div>
          </div>

          <h1 className="text-4xl">{article.title}</h1>
        </header>
      );

    case 2:
      return (
        <header className="bg-black text-white p-10">
          <p className="border-l-2 border-red-600 pl-4">{article.category}</p>

          <div className="flex flex-row gap-10 mt-10">
            {/* image */}
            <img
              className="h-[400px] w-[550px] object-cover"
              src={article.imageUrl}
              alt="article image"
            />

            {/* detail */}
            <div className="flex-1 justify-between flex flex-col">
              <div className="flex flex-row gap-3 h-3 items-center">
                <p>{article.category}</p>
                <Separator orientation="vertical" className="bg-neutral-500" />
                <p>{format(article.datePublished, "dd MMM, yyyy")}</p>
              </div>
              <h1 className="text-6xl line-clamp-4">{article.title}</h1>
              <div className="flex flex-row gap-2 items-center">
                <div className="p-2 bg-neutral-600 rounded-full">
                  <User2 size={20} />
                </div>
                <p>{article.authorName}</p>
              </div>
            </div>
          </div>
        </header>
      );

    case 3:
      return (
        <header className="p-10">
          <p className="text-2xl border-b-red-600 border-b-2 w-fit">
            {article.category}
          </p>
          <Separator className="mb-8 p-[1px]" />
          <div className="space-y-4">
            <h1 className="text-4xl">{article.title}</h1>
            <div className="h-3 items-center flex flex-row gap-2">
              <p>{article.authorName}</p>
              <Separator orientation="vertical" className="bg-neutral-500" />
              <p>{format(article.datePublished, "dd MMM, yyyy")}</p>
            </div>
            <img
              className="h-[500px] w-full object-cover"
              alt="article image"
              src={article.imageUrl}
            />
          </div>
        </header>
      );
  }
};

const article = {
  imageUrl: "/assets/news-img-placeholder.png",
  category: "Technology",
  authorName: "John Doe",
  datePublished: new Date(),
  contents: "This is a sample article content for testing.",
  title: "Sample Article Title",
};
