import axiosInstance from "./axiosInstance.js";

export async function getCategories() {
  const data = await axiosInstance.get("/categories");
  return data;
}
export async function createEditCategory(formData: FormData, id: string) {
  const url = id ? `/categories/${id}` : "/categories";
  const method = id ? "patch" : "post";
  const data = await axiosInstance({
    url,
    method,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
