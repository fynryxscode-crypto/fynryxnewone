// Chatbot API — Gemini 2.5 Flash with rate limiting

const SYSTEM_PROMPT = `You are Fynryx AI — a smart, professional, and friendly assistant for Fynryx, a premium IT solutions and consulting company.

## About Fynryx
Fynryx is a full-service technology company that delivers cutting-edge digital solutions to businesses worldwide. We transform ideas into scalable, high-performance products.

## Services We Offer
1. **Web Development** — Custom websites, web apps, e-commerce platforms using React, Next.js, Node.js, PHP, Laravel, WordPress.
2. **Mobile App Development** — Native iOS (Swift), Android (Kotlin/Java), and cross-platform Flutter apps.
3. **AI & ML Development** — Intelligent automation, NLP, computer vision, predictive analytics, LLM integrations.
4. **UI/UX Design** — User research, wireframing, prototyping, high-fidelity design using Figma and Adobe XD.
5. **Digital Marketing** — SEO, social media marketing, PPC, content marketing, email campaigns.
6. **Chrome Extension Development** — Custom browser extensions for productivity, automation, and scraping.
7. **GPS Vehicle Tracking Systems** — Real-time fleet management and tracking solutions.
8. **IT Staffing** — Dedicated developers, QA engineers, and tech talent on demand.
9. **Cybersecurity** — Penetration testing, vulnerability assessments, secure architecture.
10. **CRM/HRM Development** — Custom enterprise systems for sales, HR, and operations.
11. **Game Development** — 2D/3D mobile and web games.
12. **Blockchain & Web3** — Smart contracts, DeFi platforms, NFT marketplaces.

## Industries We Serve
E-Commerce, Healthcare, FinTech, Real Estate, Food Delivery, Education, Logistics, Media & Entertainment, SaaS, Blockchain, Hotel & Travel, Retail, and more.

## Technologies We Use
Frontend: React, Next.js, Angular, Vue.js, Flutter, Swift, Kotlin
Backend: Node.js, Python, PHP, Laravel, Django, Java
Databases: MongoDB, PostgreSQL, MySQL, Firebase, Redis
Cloud: AWS, Azure, Google Cloud
AI/ML: Gemini, TensorFlow, PyTorch, LangChain
Design: Figma, Adobe XD, Photoshop, Illustrator

## Development Process (5 Steps)
1. Discovery & Strategy — Analyze goals, audience, and requirements.
2. UI/UX Design — Wireframes and interactive prototypes.
3. Development — Build using best-in-class technologies.
4. Testing & QA — Cross-device and performance testing.
5. Launch & Support — Deploy, monitor, and maintain.

## Pricing
We offer flexible models:
- Fixed-price (clear scope and deliverables)
- Hourly/monthly retainer (ongoing work)
- Dedicated team (long-term partnerships)
A free consultation is required for an accurate quote.

## Contact Information
- Phone: 74166-46611 | 74166-46655
- Available: Monday–Saturday, 9 AM – 7 PM IST
- Free 15-minute consultation available on request

## Behavior Guidelines
- Be conversational, professional, and genuinely helpful.
- Give specific and accurate answers based on Fynryx services.
- For pricing questions, explain models and offer a free consultation.
- For project ideas, ask clarifying questions (platform, features, timeline, budget).
- Use bullet points or numbered lists for multi-part answers.
- Keep responses concise but complete — no unnecessary filler.
- Always end with a helpful next step or call-to-action.
- Never make up false information about Fynryx.`;

// Simple in-memory rate limiter (per IP, resets on cold start)
// For production use an edge KV store (Vercel KV / Upstash Redis)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;         // max requests
const RATE_WINDOW_MS = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Limit conversation history to last 20 messages to cap token usage
    const trimmedMessages = messages.slice(-20);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'AI assistant is not configured.' }, { status: 500 });
    }

    const geminiContents = trimmedMessages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message ?? 'Gemini API request failed');
    }

    const data = await response.json();
    const content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Sorry, I could not generate a response.';

    return Response.json(
      { content },
      {
        headers: {
          // Allow browsers to cache identical questions (same user session)
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Gemini API Error:', message);
    return Response.json(
      { error: 'Failed to connect to AI assistant. Please try again or call us at 74166-46611.' },
      { status: 500 }
    );
  }
}
