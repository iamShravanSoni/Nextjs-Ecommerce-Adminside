"use client"

import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import Collectionform from "@/components/collections/Collectionform";

const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {

    const [loading, setLoading] = useState(true)
    const [collectionDetail, setCollectionDetail] = useState<CollectionType | null>(null)

    const getCollectionDetail = async() => {
        try {
            const response = await fetch(`/api/collections/${params.collectionId}`, {
                method: 'GET'
            });
            const data = await response.json();
            setCollectionDetail(data);
            setLoading(false);
        } catch (error) {
            console.error("collectionDetail_GET_clientside",error);
            setLoading(false);
        }
    }

    useEffect(() => {
      getCollectionDetail();
    }, [])
    

    return loading ? (
      <Loader />
    ) : (
      <div>
        <Collectionform initialData={collectionDetail} />
      </div>
    );
}

export default CollectionDetails;