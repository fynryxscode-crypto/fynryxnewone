import{r as t,s as T,j as e,B as x,f as z,z as U}from"./index-DWrKz8Mb.js";import{X as W}from"./x-DJuQudJr.js";import{U as O}from"./user-CmW0NoOE.js";import{L as B}from"./loader-circle-uG0Uk0ey.js";const H=["What services do you offer?","How much does a website cost?","Tell me about mobile app development","Book a free consultation"],q=`You are Fynryx AI — a smart, professional, and friendly assistant for Fynryx, a premium IT solutions and consulting company.

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
- Never make up false information about Fynryx.`,_={role:"assistant",content:"Hi! I'm the Fynryx AI assistant. I can answer questions about our services, pricing, process, and more. How can I help you today?"},J=()=>{const[l,g]=t.useState(!1),[d,M]=t.useState(null),[c,f]=t.useState([_]),[u,y]=t.useState(""),[r,v]=t.useState(!1),[w,j]=t.useState(null),N=t.useRef(null),m=t.useRef(null);t.useEffect(()=>{var s;l&&((s=N.current)==null||s.scrollIntoView({behavior:"smooth"}))},[c,l]);const L=t.useCallback(s=>{m.current&&clearTimeout(m.current),m.current=setTimeout(async()=>{try{if(d)await T.from("chatbot_logs").update({messages:s}).eq("id",d);else{const{data:a,error:n}=await T.from("chatbot_logs").insert({user_name:"Website Visitor",messages:s,created_at:new Date().toISOString()}).select().single();if(n)throw n;a&&M(a.id)}}catch(a){console.error("Failed to sync chat log:",a)}},500)},[d]),S=async s=>{var I,k,C,A,F,D;if(!s.trim()||r)return;const a={role:"user",content:s},n=[...c,a];f(n),y(""),v(!0),j(null);try{const o="AIzaSyA4nClLU7P8cWsrs6m8IMvcUPTC3l85rPA",p=n.slice(-20).map(i=>({role:i.role==="assistant"?"model":"user",parts:[{text:i.content}]})),h=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${o}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system_instruction:{parts:[{text:q}]},contents:p,generationConfig:{temperature:.7,maxOutputTokens:800}})});if(!h.ok){const i=await h.json().catch(()=>({}));throw new Error(((I=i==null?void 0:i.error)==null?void 0:I.message)||"Failed to reach AI. Please try again.")}const b=await h.json(),R={role:"assistant",content:((D=(F=(A=(C=(k=b==null?void 0:b.candidates)==null?void 0:k[0])==null?void 0:C.content)==null?void 0:A.parts)==null?void 0:F[0])==null?void 0:D.text)||"Sorry, I couldn't generate a response."},P=[...n,R];f(P),L(P)}catch(o){const p=o instanceof Error?o.message:"Failed to get a response. Please try again.";j(p)}finally{v(!1)}},E=s=>{s.preventDefault(),S(u)};return e.jsxs("div",{className:"fixed bottom-6 right-6 z-[9999]",children:[l&&e.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[620px] flex flex-col overflow-hidden border border-gray-100 mb-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5",children:[e.jsxs("div",{className:"bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 flex justify-between items-center shrink-0 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25"}),e.jsx("div",{className:"w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 flex items-center justify-center relative",children:e.jsx(x,{size:22,className:"text-white","aria-hidden":"true"})})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-black text-[15px] leading-tight flex items-center gap-2",children:["Fynryx AI",e.jsx("span",{className:"text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase tracking-widest",children:"Bot"})]}),e.jsxs("div",{className:"flex items-center gap-1.5 mt-0.5 opacity-80",children:[e.jsx("span",{className:"w-1.5 h-1.5 bg-green-400 rounded-full","aria-hidden":"true"}),e.jsx("p",{className:"text-[10px] font-black tracking-widest uppercase",children:"Live Response"})]})]})]}),e.jsx("button",{onClick:()=>g(!1),"aria-label":"Close chat",className:"text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl",children:e.jsx(W,{size:20})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-5 bg-[#f8fafc] flex flex-col gap-5",role:"log","aria-live":"polite","aria-label":"Chat messages",children:[c.map((s,a)=>e.jsxs("div",{className:`flex ${s.role==="user"?"justify-end":"justify-start"} items-end gap-3`,children:[s.role==="assistant"&&e.jsx("div",{className:"w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm",children:e.jsx(x,{size:16,className:"text-[#2f55ff]","aria-hidden":"true"})}),e.jsx("div",{className:`max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap ${s.role==="user"?"bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 rounded-br-sm":"bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-sm"}`,children:s.content}),s.role==="user"&&e.jsx("div",{className:"w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm",children:e.jsx(O,{size:16,className:"text-slate-500","aria-hidden":"true"})})]},a)),r&&e.jsxs("div",{className:"flex justify-start items-end gap-3",children:[e.jsx("div",{className:"w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200",children:e.jsx(x,{size:16,className:"text-[#2f55ff]","aria-hidden":"true"})}),e.jsx("div",{className:"bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-sm p-4 shadow-sm",children:e.jsxs("div",{className:"flex space-x-1.5 items-center","aria-label":"Typing",children:[e.jsx("div",{className:"w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"}),e.jsx("div",{className:"w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.15s]"}),e.jsx("div",{className:"w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]"})]})})]}),w&&e.jsx("div",{role:"alert",className:"text-center text-[11px] font-bold tracking-tight text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 shadow-sm mx-4",children:w}),e.jsx("div",{ref:N})]}),e.jsx("div",{className:"px-5 py-3 bg-[#f8fafc] border-t border-slate-100 flex flex-wrap gap-2 shrink-0",children:H.map(s=>e.jsx("button",{onClick:()=>S(s),disabled:r,className:"text-[10px] font-bold px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md disabled:opacity-40",children:s},s))}),e.jsxs("div",{className:"p-5 border-t border-slate-100 bg-white shrink-0",children:[e.jsxs("form",{onSubmit:E,className:"flex gap-3 items-center",children:[e.jsx("input",{type:"text",value:u,onChange:s=>y(s.target.value),placeholder:"Type your message...",disabled:r,"aria-label":"Chat message input",className:"flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[14px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all disabled:opacity-50 text-slate-900 font-medium"}),e.jsx("button",{type:"submit",disabled:r||!u.trim(),"aria-label":"Send message",className:"bg-gradient-to-br from-blue-700 to-blue-500 text-white p-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all flex items-center justify-center shrink-0 border border-white/20",children:r?e.jsx(B,{size:20,className:"animate-spin"}):e.jsx(z,{size:20,className:"drop-shadow-sm"})})]}),e.jsx("p",{className:"text-[9px] font-bold text-center text-slate-400 mt-3 uppercase tracking-widest opacity-60",children:"Neural Assistant · Intelligence by Fynryx"})]})]}),!l&&e.jsxs("button",{onClick:()=>g(!0),"aria-label":"Open AI chat assistant",className:"bg-gradient-to-br from-blue-800 to-blue-600 text-white p-5 rounded-[1.5rem] shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-2 active:scale-90 group relative flex items-center justify-center overflow-hidden border-2 border-white/20",children:[e.jsx("div",{className:"absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors","aria-hidden":"true"}),e.jsx("div",{className:"absolute inset-0 bg-blue-400/30 rounded-full animate-ping opacity-20","aria-hidden":"true"}),e.jsx(U,{size:32,className:"relative z-10 drop-shadow-md"}),e.jsx("span",{className:"absolute top-2 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-[3px] border-white animate-pulse","aria-hidden":"true"})]})]})};export{J as default};
