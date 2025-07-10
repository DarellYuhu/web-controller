import { http } from "@/lib/api";

export const signIn = async (payload: {
  username?: string;
  password?: string;
}) => {
  return (
    await http.post<{
      token: string;
      user: {
        id: string;
        username: string;
        name: string;
        role: string;
      };
    }>("/auth/sign-in", payload)
  ).data;
};
