import { http } from "@/lib/api";
import { SectionType } from "@/types/exported";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

export const useInfiniteArticles = ({
  isDraft,
}: { isDraft?: boolean } = {}) => {
  const { id }: { id?: string } = useParams();
  const searchParams = useSearchParams();
  const sectionType = searchParams.get("section_type") as unknown as
    | SectionType
    | undefined;
  return useInfiniteQuery({
    queryKey: ["articles", { id, sectionType }],
    initialPageParam: { createdAt: new Date().toISOString(), id: "" },
    queryFn: async ({
      pageParam,
    }: {
      pageParam: { id: string; createdAt: string };
    }) => {
      return (
        await http.get<{ data: Article[]; cursor: Cursor }>(`/articles`, {
          params: {
            project_id: id,
            section_type: sectionType,
            is_draft: isDraft,
            cursor: pageParam,
          },
        })
      ).data;
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
  });
};
