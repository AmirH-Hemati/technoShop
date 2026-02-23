import type { UserInfo } from "@/features/users/types/user.js";

export type AddressType = {
  _id: string;
  user: UserInfo;
  fullAddress: string;
  province: string;
  city: string;
  postalCode: string;
  plate: string;
  unit: string;
  lat: number;
  lng: number;
  recipientName: string;
  recipientPhone: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateAddressType = Omit<
  AddressType,
  "_id" | "createdAt" | "updatedAt" | "user"
>;
