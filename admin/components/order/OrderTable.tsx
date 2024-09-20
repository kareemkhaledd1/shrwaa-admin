"use client";

import Table from "@/ui/Table";
import OrderRow from "@/components/order/OrderRow";
import { useOrder } from "@/hooks/useOrder";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";
import { useSearchParams } from "next/navigation";

function OrderTable() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 12;

  const { orders, isPending, totalCount, SortOrder } = useOrder();

  if (isPending) return <Spinner />;

  return (
    <Table columns={"0.6fr 1.8fr 1fr 1fr 1fr 1fr"}>
      <Table.Header>
        <div>Order Id</div>
        <div>Product name</div>
        <div>Price</div>
        <div>Status</div>
        <div>Order Date</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={orders}
        render={(order, index) => (
          <OrderRow
            key={order.id}
            order={order}
            index={index}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            sortOrder={SortOrder}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={totalCount} pageSize={12} />
      </Table.Footer>
    </Table>
  );
}

export default OrderTable;
