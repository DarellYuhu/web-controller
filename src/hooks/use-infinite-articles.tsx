import { getArticles } from "@/api/article";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export const useInfiniteArticles = () => {
  const { id }: { id?: string } = useParams();
  const searchParams = useSearchParams();
  const sectionType = searchParams.get("section_type") as unknown as
    | SectionType
    | undefined;
  return useInfiniteQuery({
    queryKey: ["articles", { id, sectionType }],
    initialPageParam: { createdAt: new Date().toISOString(), id: "" },
    queryFn: ({
      pageParam,
    }: {
      pageParam: { id: string; createdAt: string };
    }) =>
      getArticles({
        cursor: pageParam,
        projectId: id,
        sectionType,
      }),
    getNextPageParam: (lastPage) => lastPage.cursor,
  });
};
