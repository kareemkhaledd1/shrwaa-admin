"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAggregatedOrders } from "@/hooks/useAggregatedOrders";
import Spinner from "@/ui/Spinner";
import { format } from "date-fns";

interface OrderData {
  _id: string;
  count: number;
}

function OrderCharts() {
  const { data, isPending } = useAggregatedOrders();

  const formatData = (data: OrderData[]) => {
    return data.map((item) => ({
      ...item,
      _id: format(new Date(item._id), "MMM dd"), // Format date to 'YYYY-MM-DD'
    }));
  };

  const typedData: OrderData[] = formatData(data || []);

  if (isPending) return <Spinner />;

  return (
    <div className="w-full bg-white p-5 rounded-md border border-gray-200">
      <h2 className="mb-5 text-2xl font-semibold">Total Orders</h2>
      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart
          data={typedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="_id" />
          <YAxis />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            name="TotalOrders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderCharts;
