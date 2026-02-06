import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");

  if (!fileUrl) {
    return new NextResponse("Missing url", { status: 400 });
  }

  const res = await fetch(fileUrl);

  if (!res.ok) {
    return new NextResponse("Failed to fetch file", { status: 500 });
  }

  const blob = await res.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Type":
        res.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": "attachment",
    },
  });
}
