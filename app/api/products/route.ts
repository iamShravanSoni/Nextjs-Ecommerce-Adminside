import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        await connectToDB()
        console.log("mongdb is connected")

        const {
          title,
          description,
          media,
          category,
          collections,
          tags,
          sizes,
          colors,
          price,
          expense,
        } = await req.json()

        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Not enough data to create a product", {
              status: 400,
            });
        }

        const newProduct = await Product.create({
          title,
          description,
          media,
          category,
          collections,
          tags,
          sizes,
          colors,
          price,
          expense,
        });

        await newProduct.save()

        return new NextResponse(newProduct, {status: 201});

    } catch (error) {
        console.log("[products_POST_serverside]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}