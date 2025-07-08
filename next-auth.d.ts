import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
 
  interface Session {
    user: {
      
      id: string;
    } & DefaultSession["user"]; 
  }
}


// this section just simply paste from next auth nothing special 
//basically defiing auth