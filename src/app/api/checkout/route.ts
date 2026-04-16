import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, frequency } = (await req.json()) as {
      amount: number;
      frequency: "one-time" | "monthly";
    };

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Kwota musi wynosić min. 1 zł" }, { status: 400 });
    }

    const unitAmount = Math.round(amount * 100); // grosze
    const origin = req.headers.get("origin") || "http://localhost:3000";

    if (frequency === "monthly") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "pln",
              recurring: { interval: "month" },
              product_data: { name: "Wsparcie Letters. — miesięczne" },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}?donation=success`,
        cancel_url: `${origin}?donation=cancel`,
      });

      return NextResponse.json({ url: session.url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: { name: "Wsparcie Letters. — jednorazowe" },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}?donation=success`,
      cancel_url: `${origin}?donation=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Nie udało się utworzyć sesji płatności" }, { status: 500 });
  }
}
