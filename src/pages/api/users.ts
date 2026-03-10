import type { APIRoute } from "astro"
import { users, createUser } from "../../utils/store"

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ users }), {
    headers: { "Content-Type": "application/json" }
  })
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const name = String(body.name || "").trim()

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400 }
      )
    }

    const user = createUser(name)

    return new Response(
      JSON.stringify({
        success: true,
        user
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
