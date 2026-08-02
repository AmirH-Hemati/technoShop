import { Bag, Heart, Icon, Location, UserEdit } from "iconsax-reactjs";

export interface SidebarAccountType {
  href: string;
  label: string;
  icon: Icon;
}

export const sidebar: SidebarAccountType[] = [
  {
    href: "/account/personalInfo",
    label: "اطلاعات حساب کاربری",
    icon: UserEdit,
  },
  { href: "/account/orders", label: "سفارش ها", icon: Bag },
  { href: "/account/myFavoriets", label: "لیست های من ", icon: Heart },
  { href: "/account/addresses", label: "آدرس ها", icon: Location },
];
