export function getOwnerIds(): string[] {
  const raw = process.env.TELEGRAM_OWNER_ID?.trim() || "";
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(item => String(item).trim());
    }
    if (typeof parsed === "number" || typeof parsed === "string") {
      return [String(parsed).trim()];
    }
  } catch (e) {
    // Ignore JSON parse error and fallback to manual parsing
  }
  return raw
    .replace(/[\[\]]/g, "")
    .split(",")
    .map(id => id.trim())
    .filter(id => id.length > 0);
}

export const isOwner = (id: number) => {
  if (process.env.TELEGRAM_PUBLIC_MODE === "true") {
    return true;
  }
  const ownerIds = getOwnerIds();
  return ownerIds.includes(String(id));
};