import { withAuth } from "next-auth/middleware";
//import next response from the response file
import { NextResponse } from "next/server";
//copy form the nextauth documenataion ,this function nextresposnse
export default withAuth(

    function middleware(){
    return NextResponse.next();
    },
    //now the backend  both return callbacks
    
    {
        
        callbacks: {
            authorized({ req, token })
            {
                const { pathname } = req.nextUrl;
                //this all check wht to show the user 
                if (
                    pathname.startsWith("/api/auth")
                    ||
                    pathname === "/login"
                    ||
                    pathname === "/register"
                )
                    return true;
                //for the frontend part everyone see video dont login but auth option show
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true;
                }
                //return final token if token is empty then token is true ,if token is true then only true
                return !!token;
            }
        },
        
        },
    
    
);

// this basically matcher what to show and what to no show the user...
export const config = {
    matcher:[
        /*
        *Match all request paths except:
        *- _next/static (static file)
        *- _next/image  (image optimization file)
        *- favicon.ico (favicon file)
        *- public folder



        */
        "((?._next/static|_next/image|favicon.ico|public/).*)",
    ]
}
 //middleware is btn frontend and backend ,i.e frontend make client and backend break into api futher auth then middleware used to to run before this file file basically {code snippet}