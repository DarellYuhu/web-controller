// @ts-ignore
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      sub: string;
      username: string;
      name: string;
      role: string;
    };
  }
  interface User {
    token: string;
    user: {
      id: string;
      username: string;
      name: string;
      role: string;
    };
  }
}
