"use client";

import { useState } from "react";
import { updateProduct } from "../../lib/actions/products";
import { Product } from "@prisma/client";

export default function EditProductModal({
  product,
}: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:text-blue-900"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Edit Product
            </h2>

            <form action={updateProduct} className="space-y-3">
              <input type="hidden" name="id" value={product.id} />

              <input
                name="name"
                defaultValue={product.name}
                className="w-full border p-2 rounded"
                placeholder="Product Name"
              />

              <input
                name="sku"
                defaultValue={product.sku ?? ""}
                className="w-full border p-2 rounded"
                placeholder="SKU"
              />

              <input
                type="number"
                name="price"
                defaultValue={Number(product.price)}
                className="w-full border p-2 rounded"
                placeholder="Price"
              />

              <input
                type="number"
                name="quantity"
                defaultValue={product.quantity}
                className="w-full border p-2 rounded"
                placeholder="Quantity"
              />

              <input
                type="number"
                name="lowStockAt"
                defaultValue={product.lowStockAt ?? ""}
                className="w-full border p-2 rounded"
                placeholder="Low Stock Threshold"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}