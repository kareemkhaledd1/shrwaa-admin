// services/brandApi.ts
import axios from "axios";
const URL = "http://localhost:4000/brand";

export async function getAllBrands() {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function getBrands(page = 1, pageSize = 8, filter = "all") {
  try {
    const response = await axios.get(URL, {
      params: {
        page,
        pageSize,
        filter,
      },
    });

    const { brands, totalCount } = response.data;

    return { brands, totalCount };
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { brands: [], totalCount: 0 };
  }
}

export async function createBrand(newBrand: any) {
  try {
    const response = await axios.post(URL, newBrand, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating brand:", error);
    return null;
  }
}

export async function updateBrand(updatedBrand: any, id?: string) {
  try {
    const response = await axios.put(`${URL}/${id}`, updatedBrand, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating brand:", error);
    return null;
  }
}

export async function deleteBrand(id: string) {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting brand:", error);
    return null;
  }
}
