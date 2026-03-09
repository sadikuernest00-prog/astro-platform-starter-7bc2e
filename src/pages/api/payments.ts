import type { APIRoute } from "astro";

interface TrustLine {
  from: number;
  to: number;
  creditLimit: number;
}

// Use the same trustLines array as in trust.ts, or for simplicity, duplicate it here for now.
// In a real app, you'd use a shared database or state.

let trustLines: TrustLine[] = [
  // Example trust lines for testing (replace with your real data or shared storage)
  { from: 1, to: 2, creditLimit: 100 },
  { from: 2, to: 3, creditLimit: 100 },
  { from: 3, to: 4, creditLimit: 100 },
];

// Helper function to find a path using BFS
function findPath(start: number, end: number, graph: TrustLine[]): number[] | null {
  let queue: number[][] = [[start]];
  let visited = new Set<number>();

  while (queue.length > 0) {
    let path = queue.shift()!;
    let node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);
      for (const edge of graph) {
        if (edge.from === node && !visited.has(edge.to)) {
          queue.push([...path, edge.to]);
        }
      }
    }
  }

  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const { from, to, amount } = await request.json();

  if (typeof from !== "number" || typeof to !== "number" || typeof amount !== "number" || amount <= 0) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  const path = findPath(from, to, trustLines);

  if (!path) {
    return new Response(JSON.stringify({ error: "No trust path found" }), { status: 400 });
  }

  return new Response(
    JSON.stringify({
      status: "payment routed",
      path,
      amount,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
