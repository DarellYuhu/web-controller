import { ArticleHeader } from "./template/article-header";
import { Header } from "./template/header";
import { Highlight } from "./template/highlight";
import { TopPicks } from "./template/top-picks";

export const TemplateSelector = ({
  type,
  model,
}: {
  type: string;
  model: number;
}) => {
  console.log("anjay keren bet");
  switch (type) {
    case "header":
      return <Header selected={model} />;
    case "highlight":
      return <Highlight selected={model} />;

    case "topPicks":
      return <TopPicks selected={model} />;
    case "articleHeader":
      return <ArticleHeader selected={model} />;

    default:
      return <div>unkown model</div>;
  }
};
