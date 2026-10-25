import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const catalog: Record<number, { name: string; price: number }> = {
  1: { name: "Dew Drops Hydrating Serum", price: 38 },
  2: { name: "Cloud Nine Moisturizer", price: 32 },
  3: { name: "Nourish Hair Elixir", price: 26 },
  4: { name: "Sculpt & Glow Tint", price: 29 },
  5: { name: "Rosewater Reset Mist", price: 21 },
  6: { name: "Silk Finish Lip Oil", price: 18 },
  7: { name: "Body Polish Ritual", price: 24 },
  8: { name: "Overnight Repair Cream", price: 44 },
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Checkout is not configured yet. Add STRIPE_SECRET_KEY to the server environment." }, { status: 503 });
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || !("items" in body) || !Array.isArray(body.items)) {
      return NextResponse.json({ error: "Provide a list of cart items." }, { status: 400 });
    }

    const items = body.items as Array<{ id?: unknown; quantity?: unknown }>;
    if (items.length < 1 || items.length > 50) {
      return NextResponse.json({ error: "Your cart must contain between 1 and 50 line items." }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const item of items) {
      const id = Number(item?.id);
      const quantity = Number(item?.quantity);
      const product = catalog[id];
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json({ error: "One or more cart items are invalid." }, { status: 400 });
      }
      lineItems.push({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: product.price * 100,
          product_data: { name: product.name },
        },
      });
    }

    const stripe = new Stripe(secret);
    const baseUrl = process.env.APP_URL || new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${baseUrl}/?checkout=success`,
      cancel_url: `${baseUrl}/?checkout=cancelled#shop`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "NG", "AU", "DE", "FR"] },
      metadata: { store: "emerald-beauty-store" },
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Unable to start checkout. Please try again." }, { status: 500 });
  }
}
