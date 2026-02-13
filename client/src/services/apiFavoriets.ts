import axiosInstance from "./axiosInstance.js";

export async function getMyFavoriets() {
  const { data } = await axiosInstance.get(`/favoriets/myFavoriets`);

  return data.data;
}

export async function createFavoriet(productId) {
  const { data } = await axiosInstance.post("/favoriets", {
    productId,
  });

  return data;
}

export async function deleteFavoriet(id) {
  const { data } = await axiosInstance.delete(`/favoriets/${id}`);

  return data.data;
}
