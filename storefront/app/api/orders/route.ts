import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderResponse = await fetch(`http://order-service/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.log({ errorData });
      return NextResponse.json({
        detail: errorData.detail || "Failed to create order",
      }, { status: orderResponse.status });
    }

    const data = await orderResponse.json();
    return NextResponse.json(data, { status: orderResponse.status });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}
