import axiosInstance from "./axiosInstance.js";

export async function getMyAddresses() {
  const { data } = await axiosInstance.get("/addresses/myAddress");
  return data.data;
}
export async function createEditAddress(newAddress, id) {
  console.log(newAddress);
  const url = id ? `/addresses/${id}` : "/addresses";
  const method = id ? "patch" : "post";
  const { data } = await axiosInstance({
    url,
    method,
    data: newAddress,
  });

  return data.data;
}
export async function deleteAddress(id) {
  const { data } = await axiosInstance.delete(`/addresses/${id}`);
  return data.data;
}
