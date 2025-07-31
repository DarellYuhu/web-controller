import { format } from "date-fns";
import Link from "next/link";
import readingTime from "reading-time";
import { Separator } from "../ui/separator";

export const Highlight = ({ selected }: { selected: number }) => {
  const more = highlights.slice(1);
  const mainArticle = highlights[0];

  switch (selected) {
    case 1:
      return (
        <div className="flex flex-row justify-between bg-black p-10 gap-4">
          {more.map((article, idx) => (
            <Link href={`/read/${article.slug}`} key={idx}>
              <div
                className="bg-neutral-600 rounded-md h-96 flex p-3"
                style={{
                  backgroundImage: `url(${article.imageUrl})`,
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-neutral-100 self-end rounded-md p-2">
                  <p className="line-clamp-1 text-lg">{article.title}</p>
                  <p className="line-clamp-3 text-sm">{article.contents}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );

    case 2:
      return (
        <div className="p-10 space-y-10">
          <div className="flex flex-row justify-between gap-4">
            {more.map((article, idx) => (
              <Link href={`/read/${article.slug}`} key={idx}>
                <div className="flex flex-row gap-4">
                  <img
                    alt="article image"
                    src={article.imageUrl}
                    className="size-24 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-lg">{article.category}</p>
                    <p className="text-sm line-clamp-2">{article.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href={`/read/${mainArticle?.slug}`}>
            <div className="space-y-4">
              <img
                alt="article image"
                className="w-full h-[550px] rounded-md object-cover"
                src={mainArticle?.imageUrl}
              />
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4">
                  <p className="p-2 border rounded-md text-sm">
                    {mainArticle?.category}
                  </p>
                  <p className="p-2 border rounded-md text-sm">
                    {mainArticle?.authorName}
                  </p>
                </div>

                <div className="text-sm flex flex-row gap-2">
                  {mainArticle && (
                    <p>{format(mainArticle?.datePublished, "MMM dd, yyyy")}</p>
                  )}
                  ---
                  {mainArticle && (
                    <p>{readingTime(mainArticle?.contents).minutes}</p>
                  )}
                </div>
              </div>
              <p className="text-5xl line-clamp-2">{mainArticle?.title}</p>
            </div>
          </Link>
        </div>
      );

    case 3:
      return (
        <div className="flex flex-row bg-black text-white p-10 gap-10">
          <div className="flex-2/3 flex flex-col justify-between">
            <Link href={`/read/${mainArticle?.slug}`}>
              <div className="space-y-5">
                <div className="flex flex-row gap-5 text-sm">
                  <p>{mainArticle?.category}</p>
                  {mainArticle && (
                    <p>{readingTime(mainArticle?.contents).minutes}</p>
                  )}
                </div>
                <p className="line-clamp-4 text-6xl">{mainArticle?.title}</p>
              </div>
            </Link>
            <div className="flex flex-row justify-between">
              {more.slice(0, 2).map((article, idx) => (
                <Link href={`/read/${article.slug}`} key={idx}>
                  <div className="space-y-4">
                    <img
                      alt="article image"
                      className="w-32 h-20 object-cover"
                      src={article.imageUrl}
                    />
                    <p className="line-clamp-3">{article.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1/3 bg-red-800 p-5">
            <p className="bg text-xl mb-5">Popular this week</p>
            <div className="gap-5">
              {populars.map((article, idx) => (
                <Link href={`/read/${article.slug}`} key={idx}>
                  <div key={idx} className="flex flex-row gap-2 mb-5">
                    <img
                      alt="article image"
                      className="w-28 h-20 object-cover"
                      src={article.imageUrl}
                    />
                    <div className="flex flex-col justify-center">
                      <div className="space-x-4 flex flex-row text-sm">
                        <p>{article.category}</p>
                        <p>{readingTime(article.contents).minutes} minutes</p>
                      </div>
                      <div className="w-64">
                        <p className="line-clamp-2">{article.title}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="p-10 bg-black text-gray-600">
          <Link href={`/read/${mainArticle?.slug}`}>
            <div className="grid grid-cols-2">
              <div className="space-y-10">
                <p className="line-clamp-3 text-6xl font-semibold text-white">
                  {mainArticle?.title}
                </p>
                <p className="line-clamp-4 text-sm">{mainArticle?.contents}</p>
                <div className="flex flex-row space-x-2 h-5 items-center text-sm">
                  <p>{mainArticle?.category}</p>
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-neutral-500"
                  />
                  <p>{mainArticle?.authorName}</p>
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-neutral-500"
                  />
                  {mainArticle && (
                    <p>{format(mainArticle?.datePublished, "MMM dd, yyyy")}</p>
                  )}
                </div>
              </div>
              <div className="h-[500px] justify-center flex">
                <img
                  className="object-cover w-[500px] h-full"
                  alt="article image"
                  src={mainArticle?.imageUrl}
                />
              </div>
            </div>
          </Link>
          <Separator className="bg-red-600 my-10" />
          <div className="flex flex-row justify-between">
            {more.map((article, idx) => (
              <Link href={`/read/${mainArticle?.slug}`} key={idx}>
                <div className="flex flex-row gap-4">
                  <img
                    className="size-24 object-cover"
                    src={article.imageUrl}
                    alt="article"
                  />
                  <div className="w-60 flex flex-col justify-between">
                    <div className="text-sm flex flex-row gap-2 h-3 items-center">
                      <p>{article.authorName}</p>
                      <Separator
                        orientation="vertical"
                        className="bg-neutral-500"
                      />
                      <p>
                        {mainArticle &&
                          format(mainArticle?.datePublished, "MMM dd, yyyy")}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-white">{article.title}</p>
                    <div className="text-sm flex flex-row gap-2 h-3 items-center">
                      <p>{article.category}</p>
                      <Separator
                        orientation="vertical"
                        className="bg-neutral-500"
                      />
                      <p>{readingTime(article.contents).minutes}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
  }
};

const highlights = [
  {
    slug: "article-1",
    title: "First Article",
    contents: "This is the content of the first article.",
    imageUrl: "/assets/news-img-placeholder.png",
    category: "Category 1",
    authorName: "Author 1",
    datePublished: new Date("2023-07-01"),
  },
  {
    slug: "article-2",
    title: "Second Article",
    contents: "This is the content of the second article.",
    imageUrl: "/assets/news-img-placeholder.png",
    category: "Category 2",
    authorName: "Author 2",
    datePublished: new Date("2023-07-02"),
  },
  {
    slug: "article-3",
    title: "Third Article",
    contents: "This is the content of the third article.",
    imageUrl: "/assets/news-img-placeholder.png",
    category: "Category 3",
    authorName: "Author 3",
    datePublished: new Date("2023-07-03"),
  },
];

const populars = [
  {
    slug: "popular-1",
    title: "Popular Article 1",
    contents: "This is the content of the popular article 1.",
    imageUrl: "/assets/news-img-placeholder.png",
    category: "Popular Category 1",
    authorName: "Popular Author 1",
    datePublished: new Date("2023-07-10"),
  },
  {
    slug: "popular-2",
    title: "Popular Article 2",
    contents: "This is the content of the popular article 2.",
    imageUrl: "/assets/news-img-placeholder.png",
    category: "Popular Category 2",
    authorName: "Popular Author 2",
    datePublished: new Date("2023-07-11"),
  },
  {
    slug: "popular-3",
    title: "Popular Article 3",
    contents: "This is the content of the popular article 3.",
    imageUrl: "/assets/news-img-placeholder.png",
    category: "Popular Category 3",
    authorName: "Popular Author 3",
    datePublished: new Date("2023-07-12"),
  },
];
