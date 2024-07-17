'use client'

import { columns } from '@/components/collections/Collectioncoloumn'
import { DataTable } from '@/components/custom ui/DataTable'
import { useEffect, useState } from 'react'

function Collections() {

  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState([])

  const getCollection = async() => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json()
      setCollection(data)
      setLoading(false)

    } catch (error) {
      console.log("collection_GET_clientside",error);
      
    }
  }

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={collection} />
    </div>
  )
}

export default Collections