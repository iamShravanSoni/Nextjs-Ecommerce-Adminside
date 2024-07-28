'use client'

import { DataTable } from '@/components/custom ui/DataTable'
import Loader from '@/components/custom ui/Loader'
import { columns } from '@/components/Products/Productcoloumn'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function Collections() {

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState([])

  const getCollection = async() => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json()
      setCollection(data)
      setLoading(false)

    } catch (error) {
      console.log("product_POST_clientside",error);
      
    }
  }

  useEffect(() => {
    getCollection();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collection} searchKey="title" />
    </div>
  );
}

export default Collections