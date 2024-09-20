interface Order {
  username: string;
  phoneNumber: string;
  block: string;
  avenue: string;
  street: string;
  building: string;
  city: string;
}

function CustomerDetail({ order }: { order: Order }) {
  return (
    <div>
      <h3 className="text-2xl p-5 font-semibold">Customer detail</h3>
      <div className="bg-white p-5 rounded-xl border border-orange-300">
        <div className="flex items-center mt-2">
          <div className="ml-10 space-y-3">
            <p className="space-x-2">
              <span className="font-semibold">Username:</span>
              <span className="text-gray-600">{order.username}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Phone number:</span>
              <span className="text-gray-600">{order.phoneNumber}</span>
            </p>
            <p className="space-x-2">
              <span className={"font-semibold"}>Block:</span>
              <span className="text-gray-600">{order.block}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Avenue:</span>
              <span className="text-gray-600">{order.avenue}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Street:</span>
              <span className="text-gray-600">{order.street}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">Building:</span>
              <span className="text-gray-600">{order.building}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold">City:</span>
              <span className="text-gray-600">{order.city}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
