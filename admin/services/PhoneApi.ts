import axios from "axios";

export const getPhones = async (
  page = 1,
  pageSize = 8,
  filter = "",
  id?: string,
) => {
  const response = await axios.get(
    `${id ? `http://localhost:4000/product?brand=${id}` : "http://localhost:4000/product"}`,
    {
      params: {
        page,
        pageSize,
        search: filter,
        id,
      },
    },
  );
  const { products, totalCount } = response.data;
  console.log("products", products);

  return { products, totalCount };
};

export const createPhone = async (newPhone: any) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/product",
      newPhone,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error creating phone:", error);
    return null;
  }
};

export const updatePhone = async (updatedPhone: any, id?: string) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/product/${id}`,
      updatedPhone,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating phone:", error);
    return null;
  }
};

export const deletePhone = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:4000/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting phone:", error);
    return null;
  }
};
