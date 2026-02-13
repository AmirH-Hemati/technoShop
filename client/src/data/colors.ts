import type { SelectOptionType } from "@/types/select-option-types.js";

export type Color = SelectOptionType & { hex: string };
export const colors: Color[] = [
  { label: "مشکی", value: "black", hex: "#000000" },
  { label: "سفید", value: "white", hex: "#ffffff" },
  { label: "قرمز", value: "red", hex: "#ff0000" },
  { label: "آبی", value: "blue", hex: "#0000ff" },
  { label: "سبز", value: "green", hex: "#00ff00" },
  { label: "خاکستری", value: "gray", hex: "#808080" },
  { label: "طلایی", value: "gold", hex: "#FFD700" },
  { label: "نقره‌ای", value: "silver", hex: "#C0C0C0" },
  { label: "بنفش", value: "purple", hex: "#800080" },
  { label: "آبی تیره", value: "navy", hex: "#000080" },
  { label: "قرمز نئون", value: "neon-red", hex: "#FF073A" },
  { label: "سبز نئون", value: "neon-green", hex: "#39FF14" },
];
