// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {


    try {
        const authnicationParameter = getUploadAuthParams({
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        });

        return Response.json({
          authnicationParameter,
          publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        });
    }
    catch (error) {
        return Response.json(
            {
            error: "Authnication for imagekit not response"
        },
            { status: 400 
            }
        ); 
    }
}
