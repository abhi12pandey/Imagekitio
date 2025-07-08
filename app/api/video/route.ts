import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { Ivideo } from "@/moudel/Video";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
//
//this is get https request basically used to show all the video in the home screen for both login or !login user 
export async function GET() {
    //check the info. from database
    await connectToDatabase();
    try {
        const videos = await Video.find({}).lean()  // lean used for  remove mongoose documents and return simple typescript only need ,reason api fast response
        
        if (!videos || videos.length === 0)         //if video not found or video length==0
            return NextResponse.json([], { status: 200 }) //return empty array and status
        
        
        
    } catch (error) {
        //catch the error final error
        console.log("video get error",error)
        return NextResponse.json({
           error:"not fetch video check it once "
        }, {
           status:500
       })
    }
}
//this is post http request that will used to upload your video for only logined user only
export async function POST(request:NextRequest) {
    try {
        // through getserrverseesoion know the seesion id through different authoption as mentioned in auth.ts
        const session = await getServerSession(authOptions);
        //if seesion not found then through an error and status
        if (!session)
            return NextResponse.json({ error: "Unauthorized" },
                { status: 401 })
        
        
        //final connect to database and check all the data 
        await connectToDatabase()
        const body: Ivideo = await request.json()
        if (!body.title ||
            !body.description ||
            !body.thumbnailUrl ||
            !body.videoUrl
        
        )
            //return respone if titl,des,url,thumbanilurl missing
            
            return NextResponse.json({ error: "required field are missing for video upload" },
             {
                 status:401
             }
         )   
        // and finally controls and transformation chechk this ,fixed the height,width and set quality max to 100 from moudle folder <Ivideo>
        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality:body.transformation?.quality?? 100
            },
            
        }
        
        
        //used for creation new in the give height and width of the video
      const newVideo=  await Video.create(videoData)
        return NextResponse.json(newVideo);     //return reposne as new video basically new video creaed
    } catch (error) {
        //this throw an error occur if all reuirement is not completed then this trhow an erro....and stastus
        console.log("not create video due to error", error);
        return NextResponse.json({
            error:"something wrong happen to create video",
        },
        {status:500})
    }
}