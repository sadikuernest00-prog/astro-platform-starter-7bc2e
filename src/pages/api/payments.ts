import type { APIRoute } from "astro"
import { users, trustLines, payments } from "../../utils/store"

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ payments }), {
    headers: { "Content-Type": "application/json" }
  })
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    const from = Number(body.from)
    const to = Number(body.to)
    const amount = Number(body.amount)

    if (!Number.isFinite(from) || !Number.isFinite(to) || !Number.isFinite(amount)) {
      return new Response(
        JSON.stringify({ error: "Invalid numbers" }),
        { status: 400 }
      )
    }

    const fromUser = users.find(u => u.id === from)
    const toUser = users.find(u => u.id === to)

    if (!fromUser || !toUser) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      )
    }

    const trust = trustLines.find(t => t.from === from && t.to === to)

    if (!trust) {
      return new Response(
        JSON.stringify({ error: "No trust line exists" }),
        { status: 400 }
      )
    }

    if (trust.used + amount > trust.limit) {
      return new Response(
        JSON.stringify({ error: "Trust limit exceeded" }),
        { status: 400 }
      )
    }

    trust.used += amount

    const payment = {
      from,
      to,
      amount,
      time: Date.now()
    }

    payments.push(payment)

    return new Response(
      JSON.stringify({
        success: true,
        payment,
        remainingTrust: trust.limit - trust.used
      }),
      { headers: { "Content-Type": "application/json" } }
    )

  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400 }
    )
  }
}
