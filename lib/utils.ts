export function extractCompany(role: string): string {
  if (role.includes(" - ")) return role.split(" - ")[1]?.trim() ?? "";
  if (role.includes(", ")) return role.split(", ")[1]?.trim() ?? "";
  return "";
}

export function extractTitle(role: string): string {
  if (role.includes(" - ")) return role.split(" - ")[0]?.trim() ?? role;
  if (role.includes(", ")) return role.split(", ")[0]?.trim() ?? role;
  return role;
}
