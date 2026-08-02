import axiosInstance from "./axiosInstance.js";

export async function getProduct(id) {
  const data = await axiosInstance.get(`/products/${id}`);
  return data;
}

export async function getUsers({ filters, sort }) {
  let query = "";

  if (filters.length > 0) {
    const filterValue = filters
      .map((filter) => `${filter.field}=${filter.value}`)
      .join("&");
    console.log(filterValue);
    query += filterValue;
  }

  if (sort.length > 0) {
    query += `${query ? "&" : ""}sort=${sort.join(",")}`;
  }

  const data = await axiosInstance.get(`/users?${query}`);
  return data;
}

export async function getProductsByCategory(category) {
  const data = await axiosInstance.get(`/products?category=${category}`);
  return data;
}

export async function getLatestProducts() {
  const data = await axiosInstance({
    method: "get",
    url: `/products`,
  });

  return data;
}
export async function createEditProduct(newProduct, id) {
  const url = id ? `/products/${id}` : "/products";
  const method = id ? "patch" : "post";
  const data = await axiosInstance({
    url,
    method,
    data: newProduct,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function deleteUser(id) {
  const data = await axiosInstance.delete(`/users/${id}`);

  return data;
}
