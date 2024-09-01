import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });;

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[collectionDetail_GET_serverside", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Title is not exists", { status: 400 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and Image is required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[collectionDetail_POST_serverside", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "collection not found" }),
        { status: 404 }
      );
    }

    await Collection.findByIdAndDelete(params.collectionId);

    return new NextResponse("Collection is deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[collection_DELETE_serverside", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
