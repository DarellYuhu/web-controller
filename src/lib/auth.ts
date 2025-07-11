import { signIn as signInFn } from "@/api/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await signInFn({
          username: credentials.username as string,
          password: credentials.password as string,
        });
        return { ...res, id: res.user.id };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.sub = user.user.id;
        token.username = user.user.username;
        token.name = user.user.name;
        token.role = user.user.role;
      }
      return token;
    },
    session({ session, token }) {
      /// @ts-ignore
      session.user = token;
      return session;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
