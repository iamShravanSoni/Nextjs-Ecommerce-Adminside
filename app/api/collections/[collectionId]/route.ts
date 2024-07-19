import Collection from "@/lib/models/Collections";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
  try {
    await connectToDB();

    await Collection.findOneAndDelete(params.collectionId);

    return new NextResponse("Collection is deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[collection_DELETE_serverside", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
