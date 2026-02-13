import { AlignBottom, Category, Profile2User, Shop } from "iconsax-reactjs";

export const sidebar = [
  { to: "dashboard", label: "داشبورد", icon: AlignBottom },
  { to: "products", label: "محصولات", icon: Shop },
  { to: "categories", label: "دسته بندی ها", icon: Category },
  { to: "orders", label: "سفارشات", icon: Category },
  {
    to: "users",
    label: "کاربران",
    icon: Profile2User,
  },
];
