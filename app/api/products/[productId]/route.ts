import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({path:"collections", model: Collection})

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[productDetail_GET_serverside", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        {
          status: 404,
        }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      price,
      expense,
      tags,
      sizes,
      colors,
    } = await req.json();

    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !price ||
      !expense ||
      !sizes ||
      !colors
    ) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );
    // included in new data, but not included in the previous data

    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // included in previous data, but not included in the new data

    // Update collections
    await Promise.all([
      // Update added collections with this product
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      // Update removed collections without this product
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    const updateProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        price,
        expense,
        tags,
        sizes,
        colors,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updateProduct.save();

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error) {
    console.log("porduct_POST_serverside", error);
    return new NextResponse("Internal Server Error!", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(params.productId);

    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse("Product is deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[product_DELETE_serverside", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
