"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const QUICK_ACTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "Tell me about mobile app development",
  "Book a free consultation",
];

const SYSTEM_PROMPT = `You are Fynryx AI — a smart, professional, and friendly assistant for Fynryx, a premium IT solutions and consulting company.

## About Fynryx
Fynryx is a full-service technology company over the 10+ years of experience in the industry
 that delivers cutting-edge digital solutions to businesses worldwide. We transform ideas into scalable, high-performance products.

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

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm the Fynryx AI assistant. I can answer questions about our services, pricing, process, and more. How can I help you today?",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Debounce timer to batch the two Supabase writes into one
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Debounced sync — waits 500 ms after the last call before writing to Supabase
  const syncChatLog = useCallback(
    (updatedMessages: Message[]) => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      syncTimerRef.current = setTimeout(async () => {
        try {
          if (!sessionId) {
            const { data, error: logErr } = await supabase
              .from("chatbot_logs")
              .insert({
                user_name: "Website Visitor",
                messages: updatedMessages,
                created_at: new Date().toISOString(),
              })
              .select()
              .single();
            if (logErr) throw logErr;
            if (data) setSessionId(data.id);
          } else {
            await supabase
              .from("chatbot_logs")
              .update({ messages: updatedMessages })
              .eq("id", sessionId);
          }
        } catch (e) {
          console.error("Failed to sync chat log:", e);
        }
      }, 500);
    },
    [sessionId]
  );

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage: Message = { role: "user", content: userMessage };
    const withUser = [...messages, newUserMessage];

    setMessages(withUser);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      // Direct call to Gemini from frontend for Vite (Note: In production consider a proxy or edge function for security)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("AI Assistant is undergoing maintenance. Please contact us directly at 74166-46611.");
      }

      const geminiContents = withUser.slice(-20).map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: geminiContents,
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
              topP: 0.95,
              topK: 40
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || "Failed to reach AI. Please try again.");
      }

      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

      const assistantMsg: Message = { role: "assistant", content };
      const finalMessages = [...withUser, assistantMsg];

      setMessages(finalMessages);
      // Single debounced write for the full exchange
      syncChatLog(finalMessages);
    } catch (err: any) {
      console.error("Gemini Error:", err);
      let msg = "Failed to get a response. Please try again.";
      if (err.message?.includes("quota") || err.message?.includes("429")) {
        msg = "We're experiencing high demand right now. Please try again in 60 seconds or call 74166-46611.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[620px] flex flex-col overflow-hidden border border-gray-100 mb-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 flex justify-between items-center shrink-0 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25" />
                <div className="w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex items-center justify-center relative">
                  <Bot size={22} className="text-white" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-[15px] leading-tight flex items-center gap-2">
                  Fynryx AI
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase tracking-widest">Bot</span>
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5 opacity-80">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" aria-hidden="true" />
                  <p className="text-[10px] font-black tracking-widest uppercase">Live Response</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-5 bg-[#f8fafc] flex flex-col gap-5"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <Bot size={16} className="text-[#2f55ff]" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-br-sm"
                      : "bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <User size={16} className="text-slate-500" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-end gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200">
                  <Bot size={16} className="text-[#2f55ff]" aria-hidden="true" />
                </div>
                <div className="bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-sm p-4 shadow-sm">
                  <div className="flex space-x-1.5 items-center" aria-label="Typing">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div role="alert" className="text-center text-[11px] font-bold tracking-tight text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 shadow-sm mx-4">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-5 py-3 bg-[#f8fafc] border-t border-slate-100 flex flex-wrap gap-2 shrink-0">
            {QUICK_ACTIONS.map((label) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                disabled={isLoading}
                className="text-[10px] font-bold px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md disabled:opacity-40"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-slate-100 bg-white shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                aria-label="Chat message input"
                className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-50 text-slate-900 font-medium"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="bg-gradient-to-br from-blue-700 to-blue-500 text-white p-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all flex items-center justify-center shrink-0 border border-white/20"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} className="drop-shadow-sm" />
                )}
              </button>
            </form>
            <p className="text-[9px] font-bold text-center text-slate-400 mt-3 uppercase tracking-widest opacity-60">
              Neural Assistant · Intelligence by Fynryx
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat assistant"
          className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-5 rounded-[1.5rem] shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-2 active:scale-90 group relative flex items-center justify-center overflow-hidden border-2 border-white/20"
        >
          <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" aria-hidden="true" />
          <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping opacity-20" aria-hidden="true" />
          <MessageCircle size={32} className="relative z-10 drop-shadow-md" />
          <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-white animate-pulse" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
