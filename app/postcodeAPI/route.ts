import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const postcode = req.nextUrl.searchParams.get("postcode");
  if (!postcode)
    return NextResponse.json({ error: "Postcode required" }, { status: 400 });

  const clean = postcode.replace(/\s+/g, "").toUpperCase();
  const res = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    return NextResponse.json(
      { error: "Invalid or unknown postcode" },
      { status: 404 },
    );
  }

  const { latitude, longitude, admin_district, region } = data.result;
  return NextResponse.json({ latitude, longitude, admin_district, region });
}
