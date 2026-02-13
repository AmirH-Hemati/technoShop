import axiosInstance from "./axiosInstance.js";

export async function getMyOrders(status: string) {
  const { data } = await axiosInstance.get(`/orders/myOrders?status=${status}`);
  return data.data;
}

export async function getOrders() {
  const { data } = await axiosInstance.get(`/orders/`);
  return data.data;
}

export async function createOrder(orders, address) {
  const { data } = await axiosInstance.post(`/payments/create/sessions`, {
    orders,
    address,
  });
  return data;
}

export async function deleteAddress(id: string) {
  const { data } = await axiosInstance.delete(`/addresses/${id}`);
  return data.data;
}
