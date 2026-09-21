export function slug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^آ-ی۰-۹a-zA-Z-]/g, "");
}