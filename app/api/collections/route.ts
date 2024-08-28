import Collection from "@/lib/models/Collections";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        // const { userId } = auth()

        // if (!userId) {
        // return new NextResponse("Sign-in kar phele", { status: 403 })
        // }

        await connectToDB();    
        console.log("Database connected successfully for POST request");

        const { title, description, image} = await req.json()

        const existCollection = await Collection.findOne({title});

        if (existCollection) {
            return new NextResponse("Title already exists", {status:400})
        }

        if (!title || !image) {
          return new NextResponse("Title and image are required", {
            status: 400,
          });
        }

        const newCollection = await Collection.create({
            title,
            description,
            image
        })

        await newCollection.save();

        return NextResponse.json(newCollection, {status:200})

    } catch (error) {
        console.log("[collections_POST_serverside]",error);
        return new NextResponse("Internal Server Error", {status:500})
    }
}

export const GET = async(req:NextRequest) => {
    try {
        await connectToDB();

        const collections = await Collection.find().sort({ createdAt:"desc" })

        return NextResponse.json(collections, {status: 200})

    } catch (error) {
        console.log("[collection_GET_serverside", error)
        return new NextResponse("Internal server error", {status:500})
    }
}
