import type { APIRoute } from "astro"
import { users, trustLines } from "../../utils/store"

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ trustLines }), {
    headers: { "Content-Type": "application/json" }
  })
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    const from = Number(body.from)
    const to = Number(body.to)
    const limit = Number(body.limit)

    if (!Number.isFinite(from) || !Number.isFinite(to) || !Number.isFinite(limit)) {
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

    const trust = {
      from,
      to,
      limit,
      used: 0
    }

    trustLines.push(trust)

    return new Response(
      JSON.stringify({
        success: true,
        trust
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
