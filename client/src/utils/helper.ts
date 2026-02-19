export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان ";
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("fa-IR");
}

export const formatPrice = (price: number) => price.toLocaleString("fa-IR");
