import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
 
  interface Session {
    user: {
      
      id: string;
    } & DefaultSession["user"]; 
  }
}


// this section just simply past from next auth nothing special 