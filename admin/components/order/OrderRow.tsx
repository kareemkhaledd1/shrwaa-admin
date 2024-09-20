"use client";

import Table from "@/ui/Table";
import { formatCurrency } from "@/utils/helpers";
import { format } from "date-fns";
import Link from "next/link";

interface OrderRowProps {
  id: string;
  username: string;
  phoneNumber: number;
  block: string;
  avenue: string;
  street: string;
  building: string;
  city: string;
  product: {
    name: string;
    img: FileList | string;
  };
  price: number;
  status: string;
  orderStatus: string;
  createdAt: string;
}

function OrderRow({
  order,
  index,
  currentPage,
  pageSize,
  totalCount,
  sortOrder,
}: {
  order: OrderRowProps;
  index: number;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  sortOrder: string;
}) {
  const { product, price, createdAt, id, orderStatus } = order;

  const continuousIndex =
    sortOrder === "asc"
      ? (currentPage - 1) * pageSize + index + 1
      : totalCount - ((currentPage - 1) * pageSize + index);

  return (
    <Table.Row>
      <div className="grid place-items-center font-medium">
        {continuousIndex}
      </div>
      <div className="text-gray-600 font-semibold text-sm self-center">
        {product?.name}
      </div>
      <div className="text-sm font-medium text-slate-600">
        {formatCurrency(price)}
      </div>
      <div
        className={`${orderStatus === "Pending" ? "bg-blue-100" : orderStatus === "Processing" ? "bg-yellow-100" : orderStatus === "confirmed" ? "bg-green-100" : ""}  py-1 px-2 rounded-xl w-max self-center text-[13px] font-medium tracking-wide`}
      >
        {orderStatus}
      </div>
      <div className="text-sm font-medium text-slate-600">
        {format(new Date(createdAt), "MMM dd yyyy")}
      </div>
      <div>
        <Link
          href={`/orders/${id}`}
          className="bg-gray-400 text-white font-medium hover:bg-gray-500 py-1 px-2 rounded-md w-max self-center text-[13px]"
        >
          See details
        </Link>
      </div>
    </Table.Row>
  );
}

export default OrderRow;
