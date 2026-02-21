import type { UserInfo } from "@/features/users/schema/user.js";

export type Address = {
  _id: string;
  user: UserInfo;
  title: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};
