import { http } from "@/lib/api";

export const getArticles = async ({
  projectId,
  sectionType,
  cursor,
}: {
  projectId?: string;
  sectionType?: SectionType;
  cursor?: { id: string; createdAt: string };
} = {}) => {
  return (
    await http.get<{ data: Article[]; cursor: Cursor }>(`/articles`, {
      params: { project_id: projectId, section_type: sectionType, cursor },
    })
  ).data;
};

export const getArticle = async (id: string) => {
  return (await http.get<Article>(`/articles/${id}`)).data;
};

export const getFromTanky = async (id: string) => {
  return (
    await http.get<string>(`/p/${id}`, {
      baseURL: "https://kuda.hitam.id/pavid/en/api/page",
    })
  ).data;
};
