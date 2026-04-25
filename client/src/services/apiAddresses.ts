import type { Address } from "@/features/addresses/types/address.js";

import axiosInstance from "./axiosInstance.js";

export async function getMyAddresses() {
  const { data } = await axiosInstance.get("/addresses/myAddress");
  return data.data;
}
export async function createEditAddress(newAddress: Address, id?: string) {
  const url = id ? `/addresses/${id}` : "/addresses";
  const method = id ? "patch" : "post";
  const { data } = await axiosInstance({
    url,
    method,
    data: newAddress,
  });

  return data.data;
}
export async function deleteAddress(id: string) {
  const { data } = await axiosInstance.delete(`/addresses/${id}`);
  return data.data;
}
