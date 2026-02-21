type UserRole = "admin" | "user";

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nationalCode: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
