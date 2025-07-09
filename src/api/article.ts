import { http } from "@/lib/api";

export const getArticles = async () => {
  return (await http.get<Article[]>(`/articles`)).data;
};

export const getArticle = async (id: string) => {
  return (await http.get<Article>(`/articles/${id}`)).data;
};
