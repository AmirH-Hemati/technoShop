export function formatToman(value) {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان ";
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("fa-IR");
}
