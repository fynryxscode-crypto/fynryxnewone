import type { LucideIcon } from "lucide-react";
import {
  Globe, Smartphone, MonitorUp, Megaphone, Layers,
  MapPin, Box, Users, PenTool, BrainCircuit,
  // deliverable icons
  Code2, Gauge, ShieldCheck, LayoutDashboard, RefreshCw, Plug,
  Search, Share2, Mail, BarChart3, Target, TrendingUp,
  Cpu, Eye, MessageSquare, Database, Workflow, Lightbulb,
  Brush, Frame, Component, Accessibility, TestTube, Rocket,
  Map, Navigation, Bell, Activity, Radio, Settings,
  UserCheck, HeadphonesIcon, ClipboardList, Award, Building2, Calendar,
  Monitor, Puzzle, Cog, Download, Filter, Zap,
  Tablet, Watch, CreditCard, Mic, Camera,
  Bot, Network, LineChart, FlaskConical, Layers as LayersIcon, BrainCircuit as BrainIcon,
} from "lucide-react";

export interface ServiceDeliverable {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ServiceProcess {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ServiceIndustry {
  icon: LucideIcon;
  name: string;
}

export interface ServiceTech {
  name: string;
  logo: string;
}

export interface ServicePortfolio {
  tag: string;
  title: string;
  metric: string;
  metricLabel: string;
  desc: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  heroGradient: string;
  accentFrom: string;
  accentTo: string;
  accentHex: string;
  Icon: LucideIcon;
  heroHighlights: string[];
  deliverables: ServiceDeliverable[];
  process: ServiceProcess[];
  industries: ServiceIndustry[];
  techStack: ServiceTech[];
  portfolio: ServicePortfolio[];
  faqs: ServiceFAQ[];
}

const DEVICONS = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const servicesData: ServiceData[] = [
  /* ── 1. Web Development ───────────────────────────────────── */
  {
    slug: "web-development",
    name: "Web Development",
    category: "Development",
    tagline: "Lightning-fast, SEO-optimised web applications built for scale — from landing pages to enterprise platforms.",
    description: "We architect and build high-performance web applications using React, Next.js, Node.js, and Laravel. Every project is engineered for speed, security, and conversion — not just aesthetics.",
    heroGradient: "from-[#1a237e] via-[#1565C0] to-[#0a0f1e]",
    accentFrom: "from-blue-500",
    accentTo: "to-cyan-400",
    accentHex: "#2f55ff",
    Icon: Globe,
    heroHighlights: ["Custom Web Apps", "E-Commerce", "CMS Platforms", "REST APIs", "Performance Tuning"],
    deliverables: [
      { icon: Code2, title: "Custom Web Applications", desc: "Tailored React/Next.js applications with server-side rendering, dynamic routing, and pixel-perfect UI built for your exact requirements." },
      { icon: LayoutDashboard, title: "E-Commerce Platforms", desc: "Scalable online stores with payment gateways (Stripe, Razorpay), inventory management, and conversion-optimised checkout flows." },
      { icon: Gauge, title: "Performance Optimisation", desc: "Core Web Vitals tuning, lazy loading, CDN integration, and code splitting to achieve 90+ Lighthouse scores consistently." },
      { icon: ShieldCheck, title: "Security Hardening", desc: "OWASP Top 10 mitigation, HTTPS/SSL, rate limiting, CSRF protection, and regular vulnerability scanning for every deployment." },
      { icon: Plug, title: "API Development & Integration", desc: "RESTful and GraphQL API design with OpenAPI documentation, third-party integrations (CRM, ERP, payment, analytics)." },
      { icon: RefreshCw, title: "Maintenance & Support", desc: "Monthly maintenance plans including updates, backups, uptime monitoring, and priority bug resolution with defined SLAs." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Discovery & Strategy", desc: "We analyse your goals, target audience, competitor landscape, and technical requirements to define a precise project scope." },
      { step: "02", icon: Brush, title: "UI/UX Design", desc: "Wireframes in Figma, interactive prototypes, and design system creation — approved by you before a single line of code is written." },
      { step: "03", icon: Code2, title: "Development", desc: "Agile 2-week sprints with daily standups. Frontend + backend built in parallel with continuous integration and code reviews." },
      { step: "04", icon: TestTube, title: "QA & Testing", desc: "Manual + automated testing across 15+ device/browser combinations. Performance, security, and accessibility audits before launch." },
      { step: "05", icon: Rocket, title: "Launch & Growth", desc: "Zero-downtime deployment, DNS setup, analytics configuration, and post-launch monitoring with 30-day hypercare support." },
    ],
    industries: [
      { icon: Building2, name: "Enterprise" }, { icon: CreditCard, name: "FinTech" },
      { icon: Layers, name: "SaaS" }, { icon: Globe, name: "E-Commerce" },
      { icon: Users, name: "Healthcare" }, { icon: Lightbulb, name: "Education" },
      { icon: MapPin, name: "Real Estate" }, { icon: Megaphone, name: "Media" },
    ],
    techStack: [
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "Next.js", logo: `${DEVICONS}/nextjs/nextjs-original.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: "PostgreSQL", logo: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: "Tailwind CSS", logo: `${DEVICONS}/tailwindcss/tailwindcss-plain.svg` },
    ],
    portfolio: [
      { tag: "E-Commerce", title: "Multi-Vendor Marketplace", metric: "340%", metricLabel: "increase in conversions", desc: "Built a scalable marketplace platform with real-time inventory, multi-currency support, and an AI-powered recommendation engine." },
      { tag: "SaaS", title: "B2B Analytics Dashboard", metric: "2.1s", metricLabel: "avg. load time (down from 8s)", desc: "Re-architected a legacy dashboard into a React + Next.js SSR application with 99.9% uptime and role-based access control." },
      { tag: "FinTech", title: "Digital Banking Portal", metric: "50K+", metricLabel: "active users at launch", desc: "Developed a secure, PCI-DSS compliant web banking portal with real-time transactions, KYC, and biometric authentication." },
    ],
    faqs: [
      { q: "How long does a typical web development project take?", a: "A professional marketing website takes 3–5 weeks. A full-stack web application or e-commerce platform typically takes 8–16 weeks depending on complexity, integrations, and the number of pages/features." },
      { q: "Do you build with WordPress or custom code?", a: "Both — we build custom React/Next.js applications for maximum performance and flexibility, and headless WordPress (with Next.js frontend) for content-heavy sites requiring non-technical editing." },
      { q: "Who owns the code and IP after delivery?", a: "You do — 100%. Upon final payment, we transfer full ownership of all source code, assets, and documentation. We also provide a handover session and technical documentation." },
      { q: "Do you provide hosting and domain setup?", a: "Yes — we handle full deployment to Vercel, AWS, or your preferred cloud provider. We also assist with domain registration, DNS configuration, SSL certificates, and CDN setup." },
    ],
  },

  /* ── 2. Android App Development ──────────────────────────── */
  {
    slug: "android-app-development",
    name: "Android App Development",
    category: "Mobile Development",
    tagline: "Native Android applications that captivate billions of users with smooth 60fps performance and platform-perfect UX.",
    description: "We build native Android apps with Kotlin and Jetpack Compose — from MVP to enterprise-grade applications. Every app is optimised for Google Play, battery efficiency, and the full Android device ecosystem.",
    heroGradient: "from-[#1B5E20] via-[#2E7D32] to-[#0a0f1e]",
    accentFrom: "from-green-500",
    accentTo: "to-emerald-400",
    accentHex: "#3DDC84",
    Icon: Smartphone,
    heroHighlights: ["Kotlin / Java", "Jetpack Compose", "Firebase", "Google Play", "Material 3"],
    deliverables: [
      { icon: Smartphone, title: "Native Android App", desc: "Kotlin-first Android development with Jetpack Compose for declarative, performant UI that adapts beautifully across all Android screen sizes." },
      { icon: Database, title: "Backend & API Integration", desc: "Firebase (Firestore, Auth, FCM) or custom REST/GraphQL API integration with offline-first Room database caching for seamless UX." },
      { icon: Bell, title: "Push Notifications", desc: "Firebase Cloud Messaging (FCM) integration for targeted, segmented push notifications with deep-link routing and A/B testing." },
      { icon: CreditCard, title: "In-App Payments", desc: "Google Play Billing integration with subscription management, one-time purchases, and payment gateway (Stripe/Razorpay) SDK integration." },
      { icon: ShieldCheck, title: "Security & Compliance", desc: "Biometric authentication, certificate pinning, data encryption at rest/in-transit, and GDPR-compliant data handling practices." },
      { icon: Rocket, title: "Play Store Launch", desc: "Full Play Store submission: store listing optimisation (ASO), screenshots, privacy policy, content rating, and release management." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Ideation & Scoping", desc: "User story mapping, feature prioritisation, and Android-specific UX research to define a precise development roadmap." },
      { step: "02", icon: Brush, title: "Material Design UI", desc: "Material 3 compliant UI design in Figma — adaptive layouts for phones, tablets, and foldables, approved before development." },
      { step: "03", icon: Code2, title: "Agile Development", desc: "2-week sprints with working APK delivered each cycle. Unit tests (JUnit), instrumented tests (Espresso) written alongside features." },
      { step: "04", icon: TestTube, title: "Device Testing", desc: "Tested across 20+ real Android devices via Firebase Test Lab — covering different OS versions, screen sizes, and manufacturers." },
      { step: "05", icon: Rocket, title: "Launch & ASO", desc: "Managed Play Store submission, phased rollout, crash monitoring via Firebase Crashlytics, and App Store Optimisation." },
    ],
    industries: [
      { icon: CreditCard, name: "FinTech" }, { icon: Users, name: "Healthcare" },
      { icon: Globe, name: "E-Commerce" }, { icon: Lightbulb, name: "EdTech" },
      { icon: MapPin, name: "Logistics" }, { icon: Megaphone, name: "Social Media" },
      { icon: Building2, name: "Enterprise" }, { icon: Layers, name: "On-Demand" },
    ],
    techStack: [
      { name: "Kotlin", logo: `${DEVICONS}/kotlin/kotlin-original.svg` },
      { name: "Android", logo: `${DEVICONS}/android/android-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "Gradle", logo: `${DEVICONS}/gradle/gradle-plain.svg` },
    ],
    portfolio: [
      { tag: "FinTech", title: "Digital Wallet App", metric: "4.8★", metricLabel: "Play Store rating", desc: "Built a UPI-integrated digital wallet with biometric auth, bill payments, and real-time transaction notifications for 100K+ users." },
      { tag: "Healthcare", title: "Doctor Consultation App", metric: "200K+", metricLabel: "downloads in 3 months", desc: "Developed a telemedicine app with WebRTC video calls, prescription management, and pharmacy integration." },
      { tag: "Logistics", title: "Fleet Tracking App", metric: "35%", metricLabel: "fuel cost reduction", desc: "Built a driver-facing Android app with offline GPS tracking, route optimisation, and real-time dispatch communication." },
    ],
    faqs: [
      { q: "Do you develop for older Android versions?", a: "We target Android 8.0+ (API 26+) by default, covering 95%+ of active devices. We can support older versions if required, though some modern Jetpack features may not be available." },
      { q: "Kotlin or Java — which do you use?", a: "Kotlin exclusively for new projects — it's Google's preferred language with null-safety, coroutines, and Jetpack Compose. We maintain and migrate Java codebases as well." },
      { q: "Can you publish the app to the Play Store on our behalf?", a: "Yes — we handle the full Play Store submission including account setup (if needed), store listing, screenshots, content rating, privacy policy, and phased rollout management." },
      { q: "How do you handle Android's fragmentation (so many device types)?", a: "We use adaptive layouts (ConstraintLayout, WindowSizeClass), Firebase Test Lab for multi-device testing, and follow Android's official compatibility guidelines to ensure consistent behaviour across 500+ device models." },
    ],
  },

  /* ── 3. Chrome Extension Development ─────────────────────── */
  {
    slug: "chrome-extension-development",
    name: "Chrome Extension Development",
    category: "Browser Tools",
    tagline: "Custom Chrome extensions that supercharge workflows, automate tasks, and bring your product directly into the browser.",
    description: "We build production-ready Chrome extensions using Manifest V3 — from productivity tools and web scrapers to CRM integrations and enterprise security plugins. Published on the Chrome Web Store or deployed privately.",
    heroGradient: "from-[#1A237E] via-[#283593] to-[#0a0f1e]",
    accentFrom: "from-indigo-500",
    accentTo: "to-blue-400",
    accentHex: "#4285F4",
    Icon: MonitorUp,
    heroHighlights: ["Manifest V3", "Content Scripts", "Background Workers", "Web Store", "Enterprise Deploy"],
    deliverables: [
      { icon: Monitor, title: "Manifest V3 Extension", desc: "Fully compliant MV3 extensions using service workers, declarativeNetRequest, and modern Web APIs — future-proofed for Chrome's evolving platform." },
      { icon: Puzzle, title: "Content Script Injection", desc: "Page-level DOM manipulation, data extraction, UI injection, and interaction with web pages for seamless in-browser workflows." },
      { icon: Cog, title: "Background Services", desc: "Service worker logic for background processing, alarm scheduling, cross-tab communication, and persistent state management." },
      { icon: Filter, title: "Web Scraping & Automation", desc: "Automated data extraction, form filling, and workflow automation tools built with Chrome's extension APIs and headless-compatible architecture." },
      { icon: Plug, title: "CRM & SaaS Integration", desc: "Native integration with Salesforce, HubSpot, Notion, Slack, Jira, and custom APIs — bringing your tools directly into users' browsing context." },
      { icon: Download, title: "Web Store Submission", desc: "Complete Chrome Web Store submission: privacy policy, screenshots, store listing copy, and policy compliance review to ensure first-pass approval." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Requirements & Permissions", desc: "Define the extension's permissions model, content script scope, and storage requirements to minimise permission footprint for user trust." },
      { step: "02", icon: Brush, title: "Popup & Options UI", desc: "Design the extension popup, options page, and any injected UI components — consistent with your brand identity." },
      { step: "03", icon: Code2, title: "MV3 Development", desc: "TypeScript-first development with React popup UI, service worker background scripts, and content scripts — built with Vite for fast builds." },
      { step: "04", icon: TestTube, title: "Cross-Browser Testing", desc: "Tested on Chrome, Brave, and Edge (Chromium-based). Compatibility verified across major websites and edge cases." },
      { step: "05", icon: Rocket, title: "Web Store Launch", desc: "Chrome Web Store submission with review navigation, or private enterprise deployment via managed policy/Workspaces." },
    ],
    industries: [
      { icon: Building2, name: "Sales & CRM" }, { icon: Lightbulb, name: "EdTech" },
      { icon: BarChart3, name: "Marketing" }, { icon: ShieldCheck, name: "Security" },
      { icon: Layers, name: "Productivity" }, { icon: Globe, name: "E-Commerce" },
      { icon: Database, name: "Data & Research" }, { icon: Users, name: "HR & Recruiting" },
    ],
    techStack: [
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "JavaScript", logo: `${DEVICONS}/javascript/javascript-original.svg` },
      { name: "Webpack", logo: `${DEVICONS}/webpack/webpack-original.svg` },
    ],
    portfolio: [
      { tag: "Sales", title: "LinkedIn CRM Sidebar", metric: "3x", metricLabel: "faster lead capture", desc: "Built a Chrome extension that auto-populates Salesforce records from LinkedIn profiles with one click — saving sales teams 2+ hours/day." },
      { tag: "EdTech", title: "Reading Companion Tool", metric: "50K+", metricLabel: "active installs", desc: "Developed a vocabulary-building extension that overlays definitions, translations, and spaced-repetition flashcards on any webpage." },
      { tag: "Security", title: "Enterprise Policy Manager", metric: "Enterprise", metricLabel: "deployed via Workspaces", desc: "Built a private extension enforcing URL filtering, form data masking, and compliance logging for a 500-person financial firm." },
    ],
    faqs: [
      { q: "What is Manifest V3 and why does it matter?", a: "Manifest V3 is Chrome's current extension platform. Google deprecated MV2 in 2024. MV3 uses service workers instead of persistent background pages, offering better security and performance — all our extensions are MV3-native." },
      { q: "Can your extensions work on Firefox and Edge too?", a: "Chrome extensions based on the WebExtensions API work on Edge (Chromium) with minimal changes. Firefox requires some adaptation due to API differences — we offer cross-browser builds upon request." },
      { q: "How long does Chrome Web Store review take?", a: "Typically 1–7 days for initial review. Updates are usually approved within 24 hours. We write policy-compliant descriptions and privacy disclosures to minimise rejection risk." },
      { q: "Can you deploy an extension privately without the Web Store?", a: "Yes — for enterprise use, we package extensions as .crx files deployable via Google Workspace Admin Console or Windows Group Policy, completely bypassing the public Web Store." },
    ],
  },

  /* ── 4. Digital Marketing ─────────────────────────────────── */
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    category: "Growth & Marketing",
    tagline: "Data-driven marketing strategies that multiply your traffic, qualified leads, and revenue — not just vanity metrics.",
    description: "We execute full-funnel digital marketing: SEO, paid media (Google/Meta Ads), social media growth, content strategy, and email automation. Every campaign is ROI-focused with weekly reporting and continuous optimisation.",
    heroGradient: "from-[#E65100] via-[#BF360C] to-[#0a0f1e]",
    accentFrom: "from-orange-500",
    accentTo: "to-amber-400",
    accentHex: "#FF6B2B",
    Icon: Megaphone,
    heroHighlights: ["SEO", "Google Ads", "Meta Ads", "Content Marketing", "Email Automation"],
    deliverables: [
      { icon: Search, title: "SEO & Technical Optimisation", desc: "Keyword research, on-page SEO, technical audits (Core Web Vitals, crawlability), link building, and local SEO for sustainable organic growth." },
      { icon: Target, title: "Paid Media (PPC)", desc: "Google Search, Display, Shopping, and YouTube ad campaigns alongside Meta (Facebook/Instagram) and LinkedIn Ads — managed with daily bid optimisation." },
      { icon: Share2, title: "Social Media Marketing", desc: "Platform-specific content calendars, community management, influencer partnerships, and organic growth strategies for LinkedIn, Instagram, and X." },
      { icon: Mail, title: "Email Marketing Automation", desc: "Klaviyo/Mailchimp drip sequences, abandoned cart campaigns, segmented newsletters, and lifecycle email flows with A/B tested subject lines." },
      { icon: BarChart3, title: "Analytics & Reporting", desc: "GA4 setup, conversion tracking, custom dashboards (Looker Studio), weekly performance reports, and monthly strategy reviews." },
      { icon: TrendingUp, title: "Conversion Rate Optimisation", desc: "Landing page A/B tests, heat mapping (Hotjar), user session analysis, and funnel optimisation to maximise ROI from existing traffic." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Audit & Strategy", desc: "Full digital audit: SEO health, competitor analysis, audience research, and channel-specific opportunity mapping." },
      { step: "02", icon: Target, title: "Campaign Planning", desc: "90-day roadmap with KPIs, budget allocation, content calendar, and channel mix tailored to your acquisition goals." },
      { step: "03", icon: Rocket, title: "Launch & Execution", desc: "Campaign creation, ad creative production, landing page optimisation, and SEO content publishing across all channels." },
      { step: "04", icon: BarChart3, title: "Monitor & Optimise", desc: "Daily bid management, weekly performance reviews, A/B test iteration, and real-time budget reallocation to top performers." },
      { step: "05", icon: TrendingUp, title: "Report & Scale", desc: "Monthly executive reports with attribution data, ROI analysis, and scaling recommendations for top-performing channels." },
    ],
    industries: [
      { icon: Globe, name: "E-Commerce" }, { icon: Building2, name: "SaaS / B2B" },
      { icon: Users, name: "Healthcare" }, { icon: Lightbulb, name: "EdTech" },
      { icon: MapPin, name: "Real Estate" }, { icon: Megaphone, name: "D2C Brands" },
      { icon: CreditCard, name: "FinTech" }, { icon: Layers, name: "Hospitality" },
    ],
    techStack: [
      { name: "Google Analytics", logo: `${DEVICONS}/google/google-original.svg` },
      { name: "JavaScript", logo: `${DEVICONS}/javascript/javascript-original.svg` },
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
      { name: "MySQL", logo: `${DEVICONS}/mysql/mysql-original.svg` },
    ],
    portfolio: [
      { tag: "E-Commerce", title: "Fashion D2C Brand", metric: "8x", metricLabel: "ROAS on Meta Ads", desc: "Scaled a D2C fashion brand from ₹2L to ₹18L/month ad spend via creative testing, lookalike audiences, and retargeting funnels." },
      { tag: "SaaS", title: "B2B Software Company", metric: "420%", metricLabel: "organic traffic growth in 6 months", desc: "Technical SEO overhaul + content strategy (32 long-form articles) drove first-page rankings for 85 target keywords." },
      { tag: "Real Estate", title: "Property Developer", metric: "₹4.2Cr", metricLabel: "in qualified leads from Google Ads", desc: "Managed Google Search and Display campaigns targeting high-intent buyers — reducing cost-per-lead by 62% in 90 days." },
    ],
    faqs: [
      { q: "How long before I see results from SEO?", a: "Technical SEO improvements are visible in 4–8 weeks. Ranking improvements for competitive keywords typically take 3–6 months of sustained content and link building. Paid channels show results from day one." },
      { q: "What is your minimum monthly retainer for digital marketing?", a: "Our digital marketing retainers start at ₹25,000/month for a single-channel focus (e.g., SEO only). Full-funnel campaigns (SEO + PPC + Social) typically start at ₹60,000–₹80,000/month excluding ad spend." },
      { q: "Do you manage the ad budget or does the client?", a: "The ad budget is always controlled by the client directly through their own ad accounts. We manage strategy, creative, targeting, and optimisation — you pay the platforms directly and us a management fee." },
      { q: "How do you measure and report success?", a: "We set KPIs in week one (traffic, leads, ROAS, CPL) and report weekly via a Looker Studio dashboard. Monthly strategy calls review performance, learnings, and next month's plan." },
    ],
  },

  /* ── 5. Flutter App Development ──────────────────────────── */
  {
    slug: "flutter-app-development",
    name: "Flutter App Development",
    category: "Mobile Development",
    tagline: "One codebase. Two stores. Beautiful, natively compiled iOS and Android apps delivered faster and at lower cost.",
    description: "We build high-performance cross-platform mobile apps with Flutter and Dart — from consumer apps to enterprise solutions. A single Flutter codebase delivers pixel-perfect, 60fps experiences on iOS, Android, and Web simultaneously.",
    heroGradient: "from-[#006064] via-[#00838F] to-[#0a0f1e]",
    accentFrom: "from-cyan-500",
    accentTo: "to-teal-400",
    accentHex: "#54C5F8",
    Icon: Layers,
    heroHighlights: ["Dart", "BLoC / Riverpod", "Firebase", "Animations", "Single Codebase"],
    deliverables: [
      { icon: Layers, title: "Cross-Platform Flutter App", desc: "Single Dart codebase delivering identical, natively compiled experiences on iOS, Android, and (optionally) web — saving 40–50% vs native teams." },
      { icon: Brush, title: "Custom UI & Animations", desc: "Custom widget development, Rive and Lottie animations, and complex gesture handling for polished, delightful user experiences." },
      { icon: Database, title: "State Management", desc: "BLoC, Riverpod, or GetX architecture with clean code separation, reactive UI, and testable business logic." },
      { icon: Bell, title: "Firebase Integration", desc: "Authentication, Firestore real-time database, Cloud Messaging (FCM), Analytics, Crashlytics, and Remote Config." },
      { icon: Plug, title: "Native API Access", desc: "Platform channels for device-specific APIs: camera, GPS, biometrics, Bluetooth, NFC, and hardware sensors." },
      { icon: Rocket, title: "Dual Store Deployment", desc: "Simultaneous App Store and Play Store submission with CI/CD via Codemagic — keeping both platforms in sync with each release." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Product Discovery", desc: "Feature mapping, user journey definition, and Flutter architecture planning — BLoC, Riverpod, or GetX selection based on project scope." },
      { step: "02", icon: Brush, title: "UI/UX Design", desc: "Figma designs for both iOS and Android form factors, custom widget library planning, and animation storyboarding." },
      { step: "03", icon: Code2, title: "Flutter Development", desc: "Clean architecture, test-driven development, and 2-week sprint delivery of APK/IPA builds for stakeholder review." },
      { step: "04", icon: TestTube, title: "Platform Testing", desc: "Widget tests, integration tests, and manual QA on real iOS and Android devices across multiple OS versions." },
      { step: "05", icon: Rocket, title: "Store Submission", desc: "Simultaneous App Store and Play Store submissions with ASO-optimised listings, screenshots, and phased rollout." },
    ],
    industries: [
      { icon: CreditCard, name: "FinTech" }, { icon: Users, name: "Healthcare" },
      { icon: Globe, name: "E-Commerce" }, { icon: Lightbulb, name: "EdTech" },
      { icon: MapPin, name: "On-Demand" }, { icon: Megaphone, name: "Social" },
      { icon: Building2, name: "Enterprise" }, { icon: Layers, name: "Travel" },
    ],
    techStack: [
      { name: "Flutter", logo: `${DEVICONS}/flutter/flutter-original.svg` },
      { name: "Dart", logo: `${DEVICONS}/dart/dart-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "Android", logo: `${DEVICONS}/android/android-original.svg` },
    ],
    portfolio: [
      { tag: "FinTech", title: "Investment Tracker App", metric: "4.9★", metricLabel: "combined store rating", desc: "Built a real-time stock and mutual fund tracking app with custom charts, portfolio analytics, and SIP calculators." },
      { tag: "On-Demand", title: "Home Services Marketplace", metric: "15K+", metricLabel: "bookings in first month", desc: "Developed a three-sided marketplace (customer, provider, admin) with real-time tracking, in-app chat, and Razorpay integration." },
      { tag: "Healthcare", title: "Fitness & Wellness App", metric: "100K+", metricLabel: "downloads in 60 days", desc: "Created an AI-powered fitness app with workout plans, nutrition tracking, wearable sync (Apple Health / Google Fit), and live coaching." },
    ],
    faqs: [
      { q: "Is Flutter performance as good as native apps?", a: "Flutter renders with its own Skia/Impeller engine at 60fps — bypassing native UI components. Benchmarks show Flutter matching or exceeding React Native in performance, with most users unable to distinguish it from native apps." },
      { q: "Can one Flutter developer replace two native teams?", a: "For most consumer apps, yes. A single Flutter team covers iOS, Android, and optionally Web. You save 40–60% on development cost vs maintaining separate iOS (Swift) and Android (Kotlin) teams." },
      { q: "What state management solution do you use in Flutter?", a: "We evaluate on a project-by-project basis. BLoC for large enterprise apps needing strict separation, Riverpod for medium-complexity apps, and GetX for rapid MVP development." },
      { q: "How do you handle platform-specific features (Face ID, Android widgets)?", a: "Via Flutter platform channels — we write thin native Swift/Kotlin wrappers for platform-exclusive APIs and call them from Dart. We also use community packages (pub.dev) for common native integrations." },
    ],
  },

  /* ── 6. GPS Vehicle Tracking ──────────────────────────────── */
  {
    slug: "gps-vehicle-tracking",
    name: "GPS Vehicle Tracking",
    category: "IoT & Fleet Tech",
    tagline: "Real-time fleet management systems that cut fuel costs, prevent theft, and give you full visibility over every vehicle.",
    description: "We build end-to-end GPS vehicle tracking solutions — from hardware integration and real-time tracking dashboards to driver behaviour analytics and route optimisation. Deployed for fleets of 5 to 5,000+ vehicles.",
    heroGradient: "from-[#004D40] via-[#00695C] to-[#0a0f1e]",
    accentFrom: "from-teal-500",
    accentTo: "to-cyan-400",
    accentHex: "#00BCD4",
    Icon: MapPin,
    heroHighlights: ["Real-time Tracking", "Route Optimisation", "Driver Analytics", "Geofencing", "Fleet Dashboard"],
    deliverables: [
      { icon: Map, title: "Real-Time Tracking Dashboard", desc: "Live vehicle positions on interactive maps (Google Maps / Mapbox) with sub-10-second update intervals, historical playback, and multi-vehicle views." },
      { icon: Navigation, title: "Route Optimisation", desc: "AI-powered route planning that minimises fuel consumption, accounts for traffic, and prioritises delivery sequences for maximum efficiency." },
      { icon: Bell, title: "Geofencing & Alerts", desc: "Zone-based entry/exit alerts, speed violation notifications, ignition on/off events, and panic button integration sent via SMS, email, or push." },
      { icon: Activity, title: "Driver Behaviour Analytics", desc: "Harsh braking, acceleration, cornering, and idling reports scored per driver — enabling coaching programs and insurance premium reduction." },
      { icon: Radio, title: "Hardware Integration", desc: "Integration with GT06, Teltonika, Concox, and custom OBD-II tracking hardware via TCP/UDP server with proprietary or standard protocols." },
      { icon: Settings, title: "Fleet Management Reports", desc: "Automated daily, weekly, and monthly fleet reports: mileage, fuel consumption, utilisation rates, maintenance schedules, and driver scorecards." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Fleet Requirements Analysis", desc: "Number of vehicles, hardware type, reporting needs, and integration requirements with existing ERP or logistics systems." },
      { step: "02", icon: Code2, title: "Protocol & Server Setup", desc: "GPS protocol parsing server (TCP/UDP), database schema for high-frequency telemetry data, and real-time event pipeline architecture." },
      { step: "03", icon: Map, title: "Dashboard Development", desc: "Web dashboard and mobile apps with live maps, custom report builders, alert configuration, and role-based user management." },
      { step: "04", icon: TestTube, title: "Hardware Integration & Testing", desc: "Device-specific protocol implementation, signal testing across connectivity types (4G/2G), and end-to-end telemetry validation." },
      { step: "05", icon: Rocket, title: "Fleet Rollout & Training", desc: "Phased vehicle onboarding, operations team training, admin panel handover, and 30-day post-launch monitoring." },
    ],
    industries: [
      { icon: Layers, name: "Logistics & Courier" }, { icon: Building2, name: "Construction" },
      { icon: Users, name: "School Bus" }, { icon: Globe, name: "E-Commerce Delivery" },
      { icon: MapPin, name: "Taxi & Cab" }, { icon: Lightbulb, name: "Government Fleet" },
      { icon: CreditCard, name: "Insurance" }, { icon: Megaphone, name: "Field Services" },
    ],
    techStack: [
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: "MongoDB", logo: `${DEVICONS}/mongodb/mongodb-original.svg` },
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "Redis", logo: `${DEVICONS}/redis/redis-original.svg` },
    ],
    portfolio: [
      { tag: "Logistics", title: "National Courier Fleet", metric: "28%", metricLabel: "fuel cost reduction", desc: "Built a 1,200-vehicle tracking system with route optimisation, delivery verification, and driver scoring — saving ₹40L/month in fuel." },
      { tag: "School Transport", title: "Student Safety Platform", metric: "2,500", metricLabel: "buses tracked live", desc: "Developed a GPS tracking and parent notification system for a state school transport network with panic alerts and attendance integration." },
      { tag: "Construction", title: "Heavy Equipment Tracker", metric: "Zero", metricLabel: "asset theft incidents post-launch", desc: "Deployed geofencing and ignition control for 350 pieces of heavy equipment across 12 active construction sites." },
    ],
    faqs: [
      { q: "What GPS hardware do you work with?", a: "We integrate with 50+ GPS device manufacturers including Teltonika, GT06, Concox, Queclink, Meitrack, and Coban — as well as custom OBD-II dongles and asset trackers. We can also help source appropriate hardware." },
      { q: "How often is vehicle location updated?", a: "Update frequency is configurable — from every 5 seconds (for high-frequency dispatch) to every 60 seconds (for overnight monitoring). Higher frequency increases data costs which we factor into the architecture." },
      { q: "Can the system integrate with our existing ERP or TMS?", a: "Yes — we provide REST API and webhook integrations with SAP, Oracle TMS, custom ERPs, and logistics platforms. We've built integrations with Zoho, Tally, and custom dispatch systems." },
      { q: "Is the tracking data stored and how long?", a: "By default we retain 12 months of detailed telemetry (positions, events) and 24 months of summarised data (daily reports). Retention periods are fully configurable based on your compliance requirements." },
    ],
  },

  /* ── 7. iOS App Development ───────────────────────────────── */
  {
    slug: "ios-app-development",
    name: "iOS App Development",
    category: "Mobile Development",
    tagline: "Premium iOS applications crafted for Apple's ecosystem — fluid, fast, and built to Apple's exacting quality standards.",
    description: "We develop native iOS apps with Swift and SwiftUI for iPhone, iPad, Apple Watch, and Mac. Our apps leverage the full depth of Apple's platform APIs — from ARKit and HealthKit to StoreKit and CoreML — for truly differentiated experiences.",
    heroGradient: "from-[#1c1c1e] via-[#2c2c2e] to-[#0a0f1e]",
    accentFrom: "from-slate-400",
    accentTo: "to-blue-400",
    accentHex: "#007AFF",
    Icon: Box,
    heroHighlights: ["Swift / SwiftUI", "Combine", "CoreML", "HealthKit", "App Store"],
    deliverables: [
      { icon: Tablet, title: "Universal iOS App", desc: "Swift + SwiftUI applications targeting iPhone, iPad, and optionally Mac (Catalyst / native macOS) — with adaptive layouts for every Apple screen size." },
      { icon: Watch, title: "Apple Platform APIs", desc: "Deep integration with HealthKit, ARKit, CoreML, CoreLocation, MapKit, Sign in with Apple, StoreKit, PassKit, and iCloud sync." },
      { icon: CreditCard, title: "In-App Purchases", desc: "StoreKit 2 integration for subscriptions (auto-renewable, non-renewable), one-time purchases, and App Store Connect product management." },
      { icon: ShieldCheck, title: "Privacy & Security", desc: "iOS privacy manifest compliance, App Tracking Transparency, Keychain credential storage, biometric authentication, and App Transport Security." },
      { icon: Mic, title: "Advanced Capabilities", desc: "Siri Shortcuts, WidgetKit (home screen widgets), Live Activities, Push Notifications (APNs), and Background App Refresh." },
      { icon: Rocket, title: "App Store Submission", desc: "Complete App Store submission: metadata, screenshots, preview videos, App Review guideline compliance, and phased release management." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Apple Platform Strategy", desc: "Target device selection (iPhone/iPad/Mac/Watch), iOS version support range, App Store category, and monetisation model planning." },
      { step: "02", icon: Brush, title: "HIG-Compliant Design", desc: "Apple Human Interface Guidelines compliant UI design in Figma — native navigation patterns, SF Symbols, and Dynamic Type support." },
      { step: "03", icon: Code2, title: "Swift Development", desc: "SwiftUI-first with UIKit for complex custom components. Clean Architecture (MVVM/TCA), Combine for reactive data flows, async/await concurrency." },
      { step: "04", icon: TestTube, title: "TestFlight Beta", desc: "Internal + external TestFlight testing, XCTest unit tests, XCUITest UI automation, and device-specific compatibility verification." },
      { step: "05", icon: Rocket, title: "App Store Launch", desc: "App Store Connect submission with full metadata, phased rollout, post-launch monitoring with Crashlytics, and ASO optimisation." },
    ],
    industries: [
      { icon: CreditCard, name: "FinTech" }, { icon: Users, name: "Healthcare" },
      { icon: Globe, name: "E-Commerce" }, { icon: Lightbulb, name: "EdTech" },
      { icon: Megaphone, name: "Social Media" }, { icon: Building2, name: "Enterprise" },
      { icon: MapPin, name: "Travel" }, { icon: Layers, name: "Lifestyle" },
    ],
    techStack: [
      { name: "Swift", logo: `${DEVICONS}/swift/swift-original.svg` },
      { name: "Xcode", logo: `${DEVICONS}/xcode/xcode-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
    ],
    portfolio: [
      { tag: "FinTech", title: "Wealth Management App", metric: "4.9★", metricLabel: "App Store rating (2,000+ reviews)", desc: "Built a portfolio management app with real-time market data, custom charting, biometric auth, and Face ID-protected trades." },
      { tag: "Healthcare", title: "Mental Wellness App", metric: "#1", metricLabel: "in Health & Fitness category", desc: "Developed a CBT-based wellness app with Apple HealthKit integration, mood tracking, guided meditations, and therapist video sessions." },
      { tag: "Enterprise", title: "Field Inspection Tool", metric: "90%", metricLabel: "reduction in paper reports", desc: "iPad app for site inspectors with offline-first data capture, annotated photo reports, and automatic sync to a SharePoint backend." },
    ],
    faqs: [
      { q: "SwiftUI or UIKit for my new iOS app?", a: "SwiftUI for all new projects targeting iOS 16+. It significantly reduces development time and provides native animations. For complex custom UI or older OS support, we use UIKit or a SwiftUI + UIKit hybrid." },
      { q: "How do you handle App Store rejections?", a: "We proactively review App Store Review Guidelines before submission and have a 97%+ first-submission approval rate. If rejected, we address reviewer feedback within 24–48 hours and resubmit with a detailed response." },
      { q: "Do you support Apple Watch and iPad multitasking?", a: "Yes — we build universal apps supporting iPhone, iPad (with Split View and Slide Over), and watchOS companion apps. Mac Catalyst and native macOS targets are available on request." },
      { q: "Can you integrate CoreML models into our app?", a: "Yes — we integrate on-device CoreML models for image classification, object detection, text analysis, and custom prediction tasks. For larger models, we deploy to a backend API and call it from the app." },
    ],
  },

  /* ── 8. IT Staffing ───────────────────────────────────────── */
  {
    slug: "it-staffing",
    name: "IT Staffing",
    category: "Talent Solutions",
    tagline: "Pre-vetted engineering talent — onboarded in days, aligned to your culture, and hitting the ground running.",
    description: "We source, vet, and place dedicated software engineers, QA testers, DevOps engineers, UI/UX designers, and technical leads. Our talent works exclusively on your projects, in your timezone, with your processes.",
    heroGradient: "from-[#4A148C] via-[#6A1B9A] to-[#0a0f1e]",
    accentFrom: "from-purple-500",
    accentTo: "to-violet-400",
    accentHex: "#8B5CF6",
    Icon: Users,
    heroHighlights: ["Pre-vetted Talent", "3-Day Onboarding", "Dedicated Teams", "Any Timezone", "Zero Recruitment Fee"],
    deliverables: [
      { icon: UserCheck, title: "Pre-Vetted Engineers", desc: "Every candidate completes a 4-stage technical assessment: aptitude screen, coding challenge, technical interview, and culture-fit evaluation before you see their profile." },
      { icon: Users, title: "Dedicated Team Models", desc: "Hire individual engineers, pod teams (FE + BE + QA), or full product teams. All resources work exclusively on your project — no shared time." },
      { icon: HeadphonesIcon, title: "Account Management", desc: "A dedicated account manager oversees talent performance, handles escalations, manages replacements, and provides monthly performance reports." },
      { icon: ClipboardList, title: "Skill Coverage", desc: "Frontend (React, Vue, Angular), Backend (Node, Python, Java, PHP), Mobile (Flutter, Swift, Kotlin), DevOps (AWS, Docker, K8s), QA, UI/UX, and Data Engineering." },
      { icon: Award, title: "Performance Guarantee", desc: "14-day risk-free trial. If a placed engineer doesn't meet your standards within 2 weeks, we replace them at no additional cost — guaranteed." },
      { icon: Calendar, title: "Flexible Engagement", desc: "Monthly rolling contracts with 15-day notice period. Scale team size up or down each month based on your sprint needs and budget." },
    ],
    process: [
      { step: "01", icon: ClipboardList, title: "Requirements Brief", desc: "30-minute call to understand the tech stack, seniority level, team timezone, working style, and budget — we configure the search accordingly." },
      { step: "02", icon: Search, title: "Talent Matching", desc: "Within 48 hours, we present 2–3 pre-vetted candidate profiles with technical assessment scores, portfolios, and availability dates." },
      { step: "03", icon: UserCheck, title: "Client Interviews", desc: "You interview shortlisted candidates directly. We coordinate scheduling, prepare candidates, and gather your feedback after each session." },
      { step: "04", icon: Rocket, title: "Onboarding in 3 Days", desc: "Once you confirm a candidate, we handle contracts, NDAs, tool access setup, and structured first-week onboarding within 72 hours." },
      { step: "05", icon: BarChart3, title: "Ongoing Management", desc: "Monthly check-ins, performance scoring, skill-development tracking, and proactive replacement if any engineer underperforms." },
    ],
    industries: [
      { icon: Layers, name: "SaaS Startups" }, { icon: Building2, name: "Enterprises" },
      { icon: CreditCard, name: "FinTech" }, { icon: Users, name: "Healthcare IT" },
      { icon: Globe, name: "E-Commerce" }, { icon: Lightbulb, name: "EdTech" },
      { icon: MapPin, name: "Logistics Tech" }, { icon: Megaphone, name: "MarTech" },
    ],
    techStack: [
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    portfolio: [
      { tag: "SaaS Startup", title: "Series A Fintech Scale-up", metric: "8 engineers", metricLabel: "placed in 3 weeks", desc: "Staffed a complete product team (2 FE, 2 BE, 1 DevOps, 1 QA, 1 UX, 1 PM equivalent) enabling the client to triple their feature output." },
      { tag: "Enterprise", title: "Legacy System Modernisation", metric: "18 months", metricLabel: "engagement, zero attrition", desc: "Placed a dedicated Java + React team of 6 to migrate a 15-year-old insurance platform to a modern microservices architecture." },
      { tag: "Healthcare IT", title: "EHR Platform Buildout", metric: "Zero", metricLabel: "replacement requests in 12 months", desc: "Sourced 4 HIPAA-aware healthcare software engineers (React + Python) who integrated seamlessly with the client's US-based product team." },
    ],
    faqs: [
      { q: "What is the typical lead time to place an engineer?", a: "We present 2–3 pre-vetted profiles within 48–72 hours of receiving your requirements brief. Onboarding can be completed within 3 business days of candidate confirmation." },
      { q: "What seniority levels do you place?", a: "Junior (1–3 yrs), Mid-level (3–5 yrs), Senior (5–8 yrs), and Lead/Principal engineers (8+ yrs). We also place specialised roles: DevOps, QA automation, data engineers, and UI/UX designers." },
      { q: "Do the engineers work in our timezone?", a: "Yes — we have talent across IST (India), EET (Eastern Europe), and LATAM time zones. We match timezone overlap requirements specified during the briefing, typically achieving 4–6 hours of real-time collaboration." },
      { q: "How is billing structured?", a: "We charge a fixed monthly rate per resource, invoiced at the start of each month. Rates depend on seniority, tech stack, and timezone. There are no placement fees, recruitment costs, or hidden charges." },
    ],
  },

  /* ── 9. UI/UX Development ─────────────────────────────────── */
  {
    slug: "ui-ux-development",
    name: "UI/UX Development",
    category: "Design",
    tagline: "Research-driven design that converts — beautiful interfaces backed by user psychology, data, and pixel-perfect execution.",
    description: "We design intuitive, accessible, and visually stunning digital interfaces from UX research and wireframes through to production-ready Figma systems and front-end implementation. Great design isn't decoration — it's your competitive moat.",
    heroGradient: "from-[#880E4F] via-[#AD1457] to-[#0a0f1e]",
    accentFrom: "from-pink-500",
    accentTo: "to-rose-400",
    accentHex: "#FF2BC2",
    Icon: PenTool,
    heroHighlights: ["UX Research", "Figma Systems", "Prototyping", "Accessibility", "Dev Handoff"],
    deliverables: [
      { icon: Search, title: "UX Research & Audit", desc: "User interviews, competitor analysis, heuristic evaluation, and usability testing to identify friction points before designing solutions." },
      { icon: Frame, title: "Design System & Figma Library", desc: "Scalable component libraries with design tokens, auto-layout, variables for dark/light mode, and documentation for engineering teams." },
      { icon: Brush, title: "High-Fidelity UI Design", desc: "Pixel-perfect screen designs across all breakpoints (mobile, tablet, desktop) with consistent spacing, typography, and color systems." },
      { icon: Component, title: "Interactive Prototyping", desc: "Clickable Figma prototypes with micro-interactions, transition animations, and user flow logic for stakeholder demos and user testing." },
      { icon: Accessibility, title: "Accessibility (WCAG 2.1)", desc: "AA/AAA compliance: color contrast, focus states, semantic structure, keyboard navigation, and screen reader compatibility review." },
      { icon: Code2, title: "Front-End Implementation", desc: "Figma-to-code handoff with React/Next.js implementation, Tailwind CSS, Framer Motion animations, and cross-browser testing." },
    ],
    process: [
      { step: "01", icon: Search, title: "Discover & Research", desc: "Stakeholder workshops, user interviews, analytics review, and competitive benchmarking to establish design principles and success metrics." },
      { step: "02", icon: Lightbulb, title: "Wireframe & Architect", desc: "Low-fidelity wireframes for all key flows — rapid iteration with stakeholders before investing in visual design polish." },
      { step: "03", icon: Brush, title: "Visual Design", desc: "High-fidelity screens: color palette, typography, icon library, component library, and responsive layouts in Figma." },
      { step: "04", icon: Component, title: "Prototype & Test", desc: "Interactive prototype for usability testing with 5–8 real users. Insights fed back into design iteration before handoff." },
      { step: "05", icon: Rocket, title: "Handoff & Implement", desc: "Developer handoff via Figma Inspect/Dev Mode with annotated specs, exported assets, and optional front-end implementation." },
    ],
    industries: [
      { icon: Layers, name: "SaaS / B2B" }, { icon: Globe, name: "E-Commerce" },
      { icon: CreditCard, name: "FinTech" }, { icon: Users, name: "Healthcare" },
      { icon: Lightbulb, name: "EdTech" }, { icon: Building2, name: "Enterprise" },
      { icon: Megaphone, name: "Consumer Apps" }, { icon: MapPin, name: "Travel" },
    ],
    techStack: [
      { name: "Figma", logo: `${DEVICONS}/figma/figma-original.svg` },
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "Tailwind CSS", logo: `${DEVICONS}/tailwindcss/tailwindcss-plain.svg` },
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
    ],
    portfolio: [
      { tag: "SaaS", title: "B2B Analytics Platform Redesign", metric: "67%", metricLabel: "reduction in support tickets", desc: "Redesigned a complex data analytics dashboard for 50K+ users — reducing cognitive load, improving navigation, and cutting onboarding time from 4 hours to 45 minutes." },
      { tag: "FinTech", title: "Digital Bank Mobile App", metric: "4.8★", metricLabel: "UX satisfaction score (post-launch)", desc: "Designed a 0-to-1 mobile banking experience: full design system, 120+ screens across iOS and Android, and developer handoff in 8 weeks." },
      { tag: "E-Commerce", title: "Checkout Flow Optimisation", metric: "31%", metricLabel: "increase in checkout completion rate", desc: "Redesigned a 5-step checkout into a single-page flow with progressive disclosure — increasing revenue by ₹18L/month for a fashion retailer." },
    ],
    faqs: [
      { q: "What deliverables do I receive at the end of a UI/UX project?", a: "Figma source files (all pages, components, design tokens), exported assets (icons, images in appropriate formats), a handoff document with CSS specs, an interactive prototype link, and optionally a design system documentation site." },
      { q: "Do you conduct actual user testing or just internal reviews?", a: "Both — we conduct moderated usability testing with 5–8 real users from your target audience (recruited by us or from your database) using Maze or Lookback, generating a structured insights report." },
      { q: "Can you work with our existing brand guidelines?", a: "Absolutely. We operate within your brand identity (colors, typography, logo) while elevating the UI with better spacing, component architecture, and micro-interactions. If you need brand guidelines created, that's a separate offering." },
      { q: "Do you also implement the designs in code?", a: "Yes — as an optional add-on, we implement the Figma designs as React/Next.js + Tailwind CSS components with Framer Motion animations. This eliminates design-to-dev translation gaps and ensures pixel-perfect results." },
    ],
  },

  /* ── 10. AI & ML Development ──────────────────────────────── */
  {
    slug: "ai-ml-development",
    name: "AI & ML Development",
    category: "Artificial Intelligence",
    tagline: "Production-grade AI systems that automate decisions, surface insights, and create intelligent product experiences.",
    description: "We design, train, and deploy machine learning models and LLM-powered applications for real business impact — from computer vision and NLP to predictive analytics and AI-driven automation. Not demos. Production AI.",
    heroGradient: "from-[#1A0533] via-[#2D0B55] to-[#0a0f1e]",
    accentFrom: "from-violet-500",
    accentTo: "to-cyan-400",
    accentHex: "#7C3AED",
    Icon: BrainCircuit,
    heroHighlights: ["LLM Integration", "Computer Vision", "NLP", "Predictive Analytics", "MLOps"],
    deliverables: [
      { icon: Bot, title: "LLM-Powered Applications", desc: "Custom AI assistants, RAG chatbots, document intelligence, and workflow automation using GPT-4, Claude, Gemini, and open-source LLMs (Llama, Mistral)." },
      { icon: Eye, title: "Computer Vision", desc: "Object detection, image classification, OCR, face recognition, quality inspection, and medical imaging analysis with PyTorch and ONNX deployment." },
      { icon: MessageSquare, title: "NLP & Text Analytics", desc: "Sentiment analysis, entity extraction, document summarisation, classification, and semantic search using fine-tuned transformers and vector embeddings." },
      { icon: LineChart, title: "Predictive Analytics", desc: "Churn prediction, demand forecasting, fraud detection, dynamic pricing, and recommendation engines trained on your proprietary data." },
      { icon: Network, title: "AI API Development", desc: "FastAPI or Node.js REST APIs wrapping your ML models — with authentication, rate limiting, monitoring, and auto-scaling infrastructure." },
      { icon: FlaskConical, title: "MLOps & Model Lifecycle", desc: "MLflow experiment tracking, model versioning, automated retraining pipelines, A/B testing, drift detection, and production monitoring dashboards." },
    ],
    process: [
      { step: "01", icon: Lightbulb, title: "Problem Framing", desc: "Translate the business problem into an ML problem statement, define success metrics, and validate data availability and quality." },
      { step: "02", icon: Database, title: "Data Preparation", desc: "Data collection, cleaning, labelling (if needed), feature engineering, and exploratory data analysis to understand patterns and distributions." },
      { step: "03", icon: FlaskConical, title: "Model Development", desc: "Baseline models, iterative experimentation, hyperparameter tuning, and ensemble methods — tracked in MLflow for full reproducibility." },
      { step: "04", icon: TestTube, title: "Evaluation & Validation", desc: "Offline metrics (accuracy, F1, AUC), online A/B testing, bias auditing, and business impact validation before production deployment." },
      { step: "05", icon: Rocket, title: "Deploy & Monitor", desc: "Containerised model serving (Docker + FastAPI), cloud deployment (AWS SageMaker, GCP Vertex AI), and real-time drift monitoring." },
    ],
    industries: [
      { icon: CreditCard, name: "FinTech / Fraud" }, { icon: Users, name: "Healthcare AI" },
      { icon: Globe, name: "E-Commerce Reco" }, { icon: Lightbulb, name: "EdTech" },
      { icon: Building2, name: "Enterprise Automation" }, { icon: Layers, name: "SaaS Products" },
      { icon: MapPin, name: "Logistics / Supply" }, { icon: Megaphone, name: "Marketing AI" },
    ],
    techStack: [
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
      { name: "PyTorch", logo: `${DEVICONS}/pytorch/pytorch-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
      { name: "Jupyter", logo: `${DEVICONS}/jupyter/jupyter-original.svg` },
    ],
    portfolio: [
      { tag: "FinTech", title: "Real-Time Fraud Detection", metric: "94.7%", metricLabel: "precision on live transactions", desc: "Built a gradient boosting fraud detection system processing 50K+ transactions/hour with sub-50ms latency, deployed on AWS SageMaker." },
      { tag: "E-Commerce", title: "AI Recommendation Engine", metric: "23%", metricLabel: "increase in average order value", desc: "Designed a collaborative filtering + content-based hybrid recommender using customer behaviour data for a 2M-user fashion marketplace." },
      { tag: "Healthcare", title: "Medical Report Analyser", metric: "91%", metricLabel: "accuracy on diagnostic extraction", desc: "Fine-tuned a transformer model on 200K radiology reports to extract structured diagnoses, findings, and recommendations automatically." },
    ],
    faqs: [
      { q: "Do we need a large dataset to build an AI model?", a: "Not always. For custom classification tasks, 500–5,000 labelled examples can be sufficient using transfer learning. For LLM applications (RAG/chatbots), your existing documents are the data — no labelling required." },
      { q: "Can you build a chatbot that answers questions about our documents?", a: "Yes — this is a RAG (Retrieval-Augmented Generation) application. We ingest your documents into a vector database (Pinecone, Weaviate, or pgvector), embed queries at runtime, and generate answers grounded in your content using GPT-4 or Claude." },
      { q: "How do you ensure AI model output quality in production?", a: "We implement output validation, hallucination detection, confidence scoring, human-in-the-loop review for edge cases, and continuous monitoring for accuracy drift — with automated retraining triggers." },
      { q: "What is MLOps and do we need it?", a: "MLOps is the practice of managing the full ML lifecycle in production (versioning, retraining, monitoring). For any business-critical AI system, yes — without it, models degrade silently as real-world data changes. We set up lightweight MLflow-based MLOps from day one." },
    ],
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined =>
  servicesData.find((s) => s.slug === slug);
