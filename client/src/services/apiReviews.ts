import axiosInstance from "./axiosInstance.js";

export async function getReviews() {
  const data = await axiosInstance.get(`/reviews`);

  return data;
}

export async function createReview(
  review: string,
  rating: number,
  productId: string,
) {
  const data = await axiosInstance.post("/reviews", {
    review,
    product: productId,
    rating,
  });

  return data;
}
