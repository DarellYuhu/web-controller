import { http } from "@/lib/api";

export const getArticles = async ({
  projectId,
  sectionType,
}: {
  projectId?: string;
  sectionType?: SectionType;
} = {}) => {
  return (
    await http.get<Article[]>(`/articles`, {
      params: { project_id: projectId, section_type: sectionType },
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
