import { http } from "@/lib/api";

export const getArticles = async () => {
  return (await http.get<Article[]>(`/articles`)).data;
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
