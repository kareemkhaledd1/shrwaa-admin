"use client";

import { useOrderByID } from "@/hooks/useOrderByID";
import Spinner from "@/ui/Spinner";
import { useRouter } from "next/navigation";
import Modal from "@/ui/Modal";
import Form from "@/ui/Form";
import Menus from "@/ui/Menus";
import FormRow from "@/ui/FormRow";
import Layout from "@/ui/Layout";
import { useDelegateUser } from "@/hooks/useDelegateUser";
import { useDelegateOrder } from "@/hooks/useDelegateOrder";
import { useState } from "react";
import CustomerDetail from "@/ui/CustomerDetail";
import ProductDetail from "@/ui/ProductDetail";

function OrderPage({ params }: { params: { id: string } }) {
  const { order, isPending } = useOrderByID(params.id);
  const route = useRouter();

  const { delegateUsers } = useDelegateUser();
  const { delegate, isPending: isDelegating } = useDelegateOrder();

  const [selectedDelegate, setSelectedDelegate] = useState("");

  const handleDelegateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    delegate({ orderId: params.id, delegateId: selectedDelegate });
  };

  if (isPending) return <Spinner />;

  return (
    <Layout>
      <div>
        <h1 className="text-4xl mb-5 font-bold">Order detail</h1>
      </div>
      <div className="py-10 bg-orange-500 rounded-xl">
        <h2 className="py-2 px-5 text-white text-3xl">Order Id: {order.id}</h2>
      </div>
      <ProductDetail order={order} />
      <CustomerDetail order={order} />
      <div className="flex justify-end gap-5 mt-5">
        <button
          className="bg-gray-400 py-3 px-6 text-white rounded-md text-lg"
          onClick={() => route.back()}
        >
          Cancel
        </button>
        <Modal>
          <Menus.Menu>
            <Modal.Open opens="assign-order">
              <button className="bg-orange-500 hover:bg-orange-600 py-3 px-6 text-white rounded-md text-lg">
                Assign order
              </button>
            </Modal.Open>
            <Modal.Window name="assign-order">
              <Form onSubmit={handleDelegateOrder}>
                <FormRow label="order id">
                  <input
                    type="text"
                    id="orderId"
                    defaultValue={params.id}
                    disabled
                    className="w-[300px] py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
                  />
                </FormRow>
                <FormRow label="delegate name">
                  <select
                    className="w-[300px] py-1.5 px-3 border rounded border-gray-300  outline-none focus:border-orange-500 transition-all duration-300"
                    value={selectedDelegate}
                    onChange={(e: any) => setSelectedDelegate(e.target.value)}
                  >
                    <option>Select Delegate</option>
                    {delegateUsers?.map(
                      (user: { id: string; username: string }) => (
                        <option key={user.id} value={user.id}>
                          {user.username}
                        </option>
                      ),
                    )}
                  </select>
                </FormRow>
                <div className="flex justify-end gap-5 pt-[1.2rem]">
                  <button
                    className="bg-gray-200 text-gray-600 text-sm font-semibold px-3 py-3 rounded-md"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-orange-500 text-sm font-semibold text-white px-5 py-3 rounded-md"
                    type="submit"
                    disabled={isDelegating}
                  >
                    {isDelegating ? "sending..." : "send"}
                  </button>
                </div>
              </Form>
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Layout>
  );
}

export default OrderPage;
