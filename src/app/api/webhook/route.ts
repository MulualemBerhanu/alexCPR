export async function POST() {
  return new Response(
    JSON.stringify({ error: "Webhook temporarily disabled" }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
} 