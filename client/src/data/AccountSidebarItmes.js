import { Bag, Heart, Location, UserEdit } from "iconsax-reactjs";

export const sidebar = [
  { to: "/account/personalInfo", label: "اطلاعات حساب کاربری", icon: UserEdit },
  { to: "/account/orders", label: "سفارش ها", icon: Bag },
  { to: "/account/myFavoriets", label: "لیست های من ", icon: Heart },
  { to: "/account/addresses", label: "آدرس ها", icon: Location },
];
