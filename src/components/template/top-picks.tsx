import { ArrowRightCircle, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import readingTime from "reading-time";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const TopPicks = ({ selected }: { selected: number }) => {
  switch (selected) {
    case 1:
      return (
        <div className="p-10 space-y-8">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Top Picks</p>
          </div>
          <div className="flex flex-row justify-between">
            {data.slice(0, 4).map((article, idx) => (
              <Link key={idx} href={`/read/${article.slug}`}>
                <div className="w-72 space-y-3 rounded-md border p-2 shadow-md">
                  <img
                    className="h-48 w-full object-cover rounded-md"
                    src={article.imageUrl}
                    alt="article image"
                  />
                  <p className="font-semibold line-clamp-2">{article.title}</p>
                  <p className="text-sm line-clamp-2">{article.contents}</p>
                  <div className="flex flex-row items-center gap-3 p-2 bg-neutral-100 rounded-lg">
                    <div className="rounded-lg p-2 bg-neutral-200">
                      <User size={25} />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold">
                        {article.authorName}
                      </p>
                      <p>{format(article.datePublished, "MMM dd, yyyy")}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="p-10 space-y-8">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Top Picks</p>
            <Link href={"#"} className="flex flex-row items-center">
              See all{" "}
              <span className="ml-2">
                <ArrowRightCircle size={16} />
              </span>
            </Link>
          </div>
          <div className="flex flex-row justify-between">
            {data.slice(0, 4).map((article, idx) => (
              <div key={idx} className="w-72 space-y-3">
                <img
                  className="h-48 w-full object-cover rounded-md"
                  src={article.imageUrl}
                  alt="article image"
                />
                <div className="flex flex-row h-3 items-center gap-2">
                  <p className="text-sm">{article.authorName}</p>
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-700"
                  />
                  <p>{format(article.datePublished, "MMM dd, yyyy")}</p>
                </div>
                <p className="font-semibold line-clamp-2">{article.title}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 3:
      return (
        <div className="p-10 space-y-8">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Top Picks</p>
            <Button size={"sm"} className="font-normal rounded-sm bg-red-600">
              See all
            </Button>
          </div>
          <div className="flex flex-row justify-between">
            {data.slice(0, 4).map((article, idx) => (
              <div key={idx} className="w-64 space-y-3">
                <div className="size-64 relative">
                  <img
                    className="w-full h-full object-cover"
                    src={article.imageUrl}
                    alt="article image"
                  />
                  <Badge
                    className="absolute bottom-1 left-1 rounded-xs"
                    variant={"secondary"}
                  >
                    {article.category}
                  </Badge>
                </div>
                <p className="font-semibold line-clamp-2">{article.title}</p>
                <div className="flex flex-row h-3 items-center gap-2">
                  <p className="text-sm">{article.authorName}</p>
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-700"
                  />
                  <p className="text-sm">
                    {readingTime(article.contents).minutes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 4:
      return (
        <div className="p-10 space-y-8">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-semibold">Top Picks</p>
            <Link href={"#"} className="flex flex-row items-center">
              See all{" "}
              <span className="ml-2">
                <ChevronRight size={16} />
              </span>
            </Link>
          </div>
          <div className="flex flex-row justify-between">
            {data.slice(0, 4).map((article, idx) => (
              <div key={idx} className="w-64 space-y-3">
                <img
                  className="size-64 object-cover"
                  src={article.imageUrl}
                  alt="article image"
                />
                <div>
                  <p className="font-semibold line-clamp-2">{article.title}</p>
                  <p className="text-sm line-clamp-2">{article.contents}</p>
                </div>
                <div className="flex flex-row h-3 items-center gap-2">
                  <p className="text-sm">{article.category}</p>
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-700"
                  />
                  <p className="text-sm">
                    {readingTime(article.contents).minutes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

const data = [
  {
    slug: "article-1",
    imageUrl: "/assets/news-img-placeholder.png",
    title: "Sample Article 1",
    contents: "This is a brief description of Sample Article 1.",
    authorName: "Author One",
    datePublished: new Date("2023-07-01"),
    category: "Category A",
  },
  {
    slug: "article-2",
    imageUrl: "/assets/news-img-placeholder.png",
    title: "Sample Article 2",
    contents: "This is a brief description of Sample Article 2.",
    authorName: "Author Two",
    datePublished: new Date("2023-07-02"),
    category: "Category B",
  },
  {
    slug: "article-3",
    imageUrl: "/assets/news-img-placeholder.png",
    title: "Sample Article 3",
    contents: "This is a brief description of Sample Article 3.",
    authorName: "Author Three",
    datePublished: new Date("2023-07-03"),
    category: "Category C",
  },
  {
    slug: "article-4",
    imageUrl: "/assets/news-img-placeholder.png",
    title: "Sample Article 4",
    contents: "This is a brief description of Sample Article 4.",
    authorName: "Author Four",
    datePublished: new Date("2023-07-04"),
    category: "Category D",
  },
];
