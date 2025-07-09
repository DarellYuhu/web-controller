import { http } from "@/lib/api";

export const getArticles = async () => {
  return (await http.get<Article[]>(`/articles`)).data;
};
