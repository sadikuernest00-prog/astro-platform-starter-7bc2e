import type { APIRoute } from "astro";

interface TrustLine {
  id: number;
  from: number;
  to: number;
  creditLimit: number;
}

let trustLines: TrustLine[] = [];
let nextTrustId = 1;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(trustLines), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { from, to, limit } = await request.json();

  if (
    typeof from !== "number" ||
    typeof to !== "number" ||
    typeof limit !== "number" ||
    limit <= 0
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid trust line data" }),
      { status: 400 }
    );
  }

  const newTrust: TrustLine = {
    id: nextTrustId++,
    from,
    to,
    creditLimit: limit,
  };

  trustLines.push(newTrust);

  return new Response(JSON.stringify(newTrust), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
