import axiosInstance from "./axiosInstance.js";

export async function getComments() {
  const data = await axiosInstance.get(`/favoriets/myFavoriets`);

  return data;
}

export async function createComment(comment, productId) {
  const data = await axiosInstance.post("/comments/", {
    comment,
    product: productId,
  });

  return data;
}

export async function deleteFavoriet(id) {
  const data = await axiosInstance.delete(`/favoriets/${id}`);

  return data;
}
