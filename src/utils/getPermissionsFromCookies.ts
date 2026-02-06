export function getPermissionsFromCookies(): string[] {
  if (typeof document === "undefined") return [];

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("permissions="));

  if (!match) {
    return [];
  }

  try {
    const raw = decodeURIComponent(match.split("=")[1]);
    // console.log("🔍 Raw permissions cookie:", raw);

    const parsed = JSON.parse(raw);

    // console.log("🔍 Parsed permissions cookie:", parsed);

    // Return keys that have a non-empty array value
    if (typeof parsed === "object" && parsed !== null) {
      return Object.keys(parsed).filter(
        (key) => Array.isArray(parsed[key]) && parsed[key].length > 0,
      );
    }

    return [];
  } catch (error) {
    console.error("🚨 Failed to parse permissions cookie:", error);
    return [];
  }
}
