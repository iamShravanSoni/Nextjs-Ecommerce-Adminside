import Collection from "@/lib/models/Collections";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        const {userId} = auth()

        if(!userId) {
            return new NextResponse("Phele sign-in kar", {status:403})
        }

        await connectToDB();

        const { title, description, image} = await req.json()

        const existCollection = await Collection.findOne({title});

        if (existCollection) {
            return new NextResponse("Title already exists", {status:400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image
        })

        await newCollection.save();

        return NextResponse.json(newCollection, {status:200})

    } catch (error) {
        console.log("[collections_POST]",error);
        return new NextResponse("Internal Server Error", {status:500})
    }
}

export default POST