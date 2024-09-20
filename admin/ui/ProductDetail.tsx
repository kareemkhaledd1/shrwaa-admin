import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";

interface ProductDetailProps {
  product: {
    img: string;
    name: string;
  };
  price: number;
  status: string;
}

function ProductDetail({ order }: { order: ProductDetailProps }) {
  return (
    <div>
      <h3 className="text-2xl p-5 font-semibold">Product detail</h3>
      <div className="bg-white p-5 rounded-xl border border-orange-300">
        <div className="flex items-center mt-2">
          <Image
            src={order.product.img}
            alt={order.product.name}
            width={400}
            height={200}
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div className="ml-10 space-y-3">
            <p className="space-x-2 ">
              <span className="font-semibold">Phone name:</span>
              <span className="text-gray-600">{order.product.name}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Price:</span>
              <span className="text-gray-600">
                {formatCurrency(order.price)}
              </span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">status:</span>
              <span className="text-gray-600">{order.status}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
