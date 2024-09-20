import axios from "axios";

export const getAllOrders = async () => {
  try {
    const response = await axios.get("http://localhost:4000/order/all-orders");
    return response.data;
  } catch (error) {
    console.error("Error getting all orders:", error);
    return null;
  }
};

export const getAggregatedOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/order/aggregate-orders",
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting aggregated orders:", error);
    return null;
  }
};

export const getOrders = async (
  page = 1,
  pageSize = 12,
  search = "",
  sortOrder = "desc",
) => {
  try {
    const response = await axios.get("http://localhost:4000/order", {
      params: {
        page,
        pageSize,
        search,
        sortOrder,
      },
    });

    const { orders, totalCount } = response.data;

    return { orders, totalCount };
  } catch (error) {
    console.error("Error getting orders:", error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/order/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting order by id:", error);
    return null;
  }
};
