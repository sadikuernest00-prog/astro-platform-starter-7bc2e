import type { APIRoute } from 'astro';

interface User {
  id: number;
  name: string;
}

// In-memory users array (replace with a real database later)
let users: User[] = [];
let nextId = 1;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { name } = await request.json();

  if (!name || typeof name !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid or missing name' }), { status: 400 });
  }

  const newUser: User = { id: nextId++, name };
  users.push(newUser);

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
