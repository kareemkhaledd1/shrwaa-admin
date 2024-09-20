import axios from "axios";

export async function delegateOrder({
  orderId,
  delegateId,
}: {
  orderId: string;
  delegateId: string;
}) {
  try {
    const response = await axios.post(
      "http://localhost:4000/delegate/create",
      {
        orderId,
        delegateId,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
