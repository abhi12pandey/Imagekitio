import { NextAuthOptions } from "next-auth";
//impoert nextauth option are the provider like github,email
import CredentialsProvider from "next-auth/providers/credentials"
//this are the provider
import { connectToDatabase } from "./db";
//connect the database
import User from "@/moudel/User";
//User from models
import bcrypt from "bcryptjs";
//password from models

// authOptions bascially here define the credentials ,here email and password are the credentials
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
              email: { label: "Email", type: "text" },
              password:{label:"Password",type:"password"}
          },
          //this credentials function used for  check wheteherr the mail and password is missing and throw an error ,used try and throw block 
          
          async authorize(credentials) {
              // mail and pasword is missing
              if (!credentials?.email || !credentials?.password) {
                  throw new Error("email ans password is missing");
              }

              // first connect the database to check the validation
              try {
                  
                  await connectToDatabase();
                  // find credentials.email in the database 
                  const user = await User.findOne({ email: credentials.email });

               // if credentials.user not found then throw an error
                  if (!user) {
                      throw new Error("user is not found");
                  }
                  //this check similarlay password from creedntials
                  const isValid = await bcrypt.compare(credentials.password, user.password);

                  //if password is not valid then throw an error

                  if (!isValid) {
                      throw new Error("password is inavalid");
                  }
                  // return the fun ,id create and to string especially in the typescript
                  return {
                      id: user._id.toString(),
                      email:user.email
                  }


              } 
              // now finally thorw an error
              catch (error) {
                  console.log("error in auth ", error);
                  throw new Error;
                  
              }

              
          },
    }),

    ],
    



    //callbacks start basically jwt and all the session
    callbacks: {
        //jwt token
        async jwt({ token, user }) {
            if (user) {
                token.id=user.id
            }
            return token;
        },
        //session token
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                //here this line throw an error sometime because typescript has a significant prblm in datatype so always typecast this
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error:"/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        
    },
    secret:process.env.NEXTAUTH_SECRET
};

