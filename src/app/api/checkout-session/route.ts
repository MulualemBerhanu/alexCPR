// Checkout temporarily disabled for deployment
// export async function POST(req: Request) {
//   // ...existing code...
// } 

export async function POST() {
  return new Response(
    JSON.stringify({ error: "Checkout temporarily disabled" }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
} 