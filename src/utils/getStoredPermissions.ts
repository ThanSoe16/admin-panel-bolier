export function getStoredPermissions(): string[] {
  if (typeof document === 'undefined') return [];

  const match = document.cookie.split('; ').find((row) => row.startsWith('permissions='));

  if (!match) {
    return [];
  }

  try {
    const raw = decodeURIComponent(match.split('=')[1]);
    // console.log("🔍 Raw permissions cookie:", raw);

    const parsed = JSON.parse(raw);
    return parsed ?? [];
  } catch (error) {
    console.error('🚨 Failed to parse permissions cookie:', error);
    return [];
  }
}
