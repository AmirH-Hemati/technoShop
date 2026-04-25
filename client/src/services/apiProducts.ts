import type { FilterType } from "@/types/filter.type.js";

import axiosInstance from "./axiosInstance.js";

export async function getProduct(slug: string) {
  const { data } = await axiosInstance.get(`/products/${slug}`);
  return data.data;
}
export async function getProductComments(id: string) {
  const { data } = await axiosInstance.get(`/products/${id}/comments`);
  return data.data;
}
export async function getProductReviews(id: string) {
  const { data } = await axiosInstance.get(`/products/${id}/reviews`);
  return data.data;
}
export async function getProducts({
  filters,
  search,
}: {
  filters: FilterType;
  search: string;
}) {
  let query = "";

  // if (filters.length > 0) {
  //   const filterValue = filters
  //     .map((filter) => `${filter.field}=${filter.value}`)
  //     .join("&");
  //   query += filterValue;
  // }

  // if (sort.length > 0) {
  //   query += `${query ? "&" : ""}sort=${sort.join(",")}`;
  // }

  // if (search) {
  //   query += `${query ? "&" : ""}search=${search}`;
  // }
  const { data } = await axiosInstance.get(`/products?${query}`);
  return data.data;
}

export async function getProductsByIds(ids: string[]) {
  const { data } = await axiosInstance.post(`/products/by-ids`, { ids });
  return data.data;
}

export async function getProductsByCategory(category: string) {
  const { data } = await axiosInstance.get(`/products?category=${category}`);
  return data.data;
}

export async function getLatestProducts() {
  const { data } = await axiosInstance({
    method: "get",
    url: `/products`,
  });

  return data.data;
}
export async function createEditProduct(newProduct: FormData, id: string) {
  const url = id ? `/products/${id}` : "/products";
  const method = id ? "patch" : "post";
  const { data } = await axiosInstance({
    url,
    method,
    data: newProduct,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.data;
}

export async function deleteProduct(id: string) {
  const { data } = await axiosInstance.delete(`/products/${id}`);

  return data.data;
}
