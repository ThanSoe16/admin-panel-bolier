"use client";

function getExtensionFromUrl(url: string): string | null {
  try {
    const clean = url.split("?")[0].split("#")[0];
    const ext = clean.substring(clean.lastIndexOf(".") + 1);
    return ext && ext !== clean ? ext : null;
  } catch {
    return null;
  }
}

function withNoCache(url: string) {
  const u = new URL(url);
  u.searchParams.set("not-from-cache-please", Date.now().toString());
  return u.toString();
}

export async function downloadFile({
  url,
  filename,
  downloadName,
}: {
  url: string;
  filename: string;
  downloadName: string;
}) {
  const noCacheUrl = withNoCache(url);

  const ext = getExtensionFromUrl(filename);
  const finalFilename = ext ? `${downloadName}.${ext}` : downloadName;

  const proxyUrl = `/api/download?url=${encodeURIComponent(noCacheUrl)}`;

  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error("Download failed");

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = finalFilename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(blobUrl);
}
