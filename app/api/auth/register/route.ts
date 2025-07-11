import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/moudel/User";

//make a function which check for registration and other details as

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" }, //password and email is missing user regitred then this happen
        {
          status: 400,
        }
      );
    }

    //// connect to data base first check the datbase connection it is present or not ,if not then how we proceed to check whether the user is or not

    await connectToDatabase()
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "email already exist " },
        {
          status: 400,
        }
      )
    }
    //if not present the entry to data base t

    await User.create({
      email,
      password,
    })

    return NextResponse.json(
      { message: "email registered successfully" },
      {
        status: 400,
      }
    )
  } catch (error) {
    console.log("registration error", error);
    return NextResponse.json(
      { error: "registration error" },
      {
        status: 400,
      }
    )
  }
}

//this code standlone provide the feature for registration only bcz login is done only nextauth through google or the provider
