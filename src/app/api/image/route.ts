import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the URL query parameter from the request
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "No image URL provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType, // Dynamic type (PNG, JPEG, etc.)
        "Cache-Control": "public, max-age=86400, immutable",
        "Access-Control-Allow-Origin": "*", // Allow all origins
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
