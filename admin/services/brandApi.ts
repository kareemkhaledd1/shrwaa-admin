// services/brandApi.ts
import axios from "axios";
const URL = "http://localhost:4000/brand";

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
