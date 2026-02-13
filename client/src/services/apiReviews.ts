import axiosInstance from "./axiosInstance.js";

export async function getReviews() {
  const { data } = await axiosInstance.get(`/reviews`);

  return data.data;
}

export async function createReview(review, rating, productId) {
  const { data } = await axiosInstance.post("/reviews", {
    review,
    product: productId,
    rating,
  });

  return data.data;
}
