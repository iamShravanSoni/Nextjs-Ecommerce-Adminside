"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { Button } from "../ui/button";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "categroy",
    header: "Categroy",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell:({row}) => row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id} item="product" />,
  },
];
