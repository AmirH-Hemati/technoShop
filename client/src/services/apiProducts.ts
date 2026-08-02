import type { ProductType } from "@/features/products/types/product.js";

import type { FilterType } from "@/types/filter.type.js";

import axiosInstance from "./axiosInstance.js";

export async function getProduct(slug: string) {
  const data = await axiosInstance.get(`/products/${slug}`);
  return data;
}
export async function getProductComments(id: string) {
  const data = await axiosInstance.get(`/products/${id}/comments`);
  return data;
}
export async function getProductReviews(id: string) {
  const data = await axiosInstance.get(`/products/${id}/reviews`);
  return data;
}
export async function getProducts({
  filters,
  search,
}: {
  filters: FilterType;
  search: string;
}) {
  const queryParams: string[] = [];

  if (filters.colors && filters.colors.length > 0) {
    queryParams.push(`colors=${filters.colors.join(",")}`);
  }

  if (filters.brands && filters.brands.length > 0) {
    queryParams.push(`brands=${filters.brands.join(",")}`);
  }

  if (filters.categories && filters.categories.length > 0) {
    queryParams.push(`categories=${filters.categories.join(",")}`);
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    queryParams.push(`price[lte]=${filters.minPrice}`);
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    queryParams.push(`price[gte]=${filters.maxPrice}`);
  }

  if (filters.sort && filters.sort !== "none") {
    queryParams.push(`sort=${filters.sort}`);
  }

  if (search && search.length >= 2) {
    queryParams.push(`search=${search}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  const data = await axiosInstance.get(`/products${queryString}`);

  return data;
}

export async function getProductsByIds(ids: string[]) {
  const data = await axiosInstance.post(`/products/by-ids`, { ids });
  return data;
}

export async function getProductsByCategory(category: string) {
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
export async function createEditProduct(newProduct: FormData, id: string) {
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

export async function deleteProduct(id: string) {
  const data = await axiosInstance.delete(`/products/${id}`);

  return data;
}
