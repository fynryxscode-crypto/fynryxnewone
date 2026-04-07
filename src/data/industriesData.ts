const DEVICONS = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export interface IndustryFeature { iconName: string; title: string; desc: string; }
export interface IndustryFAQ { q: string; a: string; }
export interface IndustryTech { name: string; logo: string; }
export interface IndustryStat { value: string; label: string; }
export interface IndustryData {
  slug: string; name: string; tagline: string; description: string;
  heroGradient: string; accentFrom: string; accentTo: string; accentHex: string;
  iconName: string; heroHighlights: string[]; stats: IndustryStat[];
  solutions: IndustryFeature[]; features: IndustryFeature[];
  techStack: IndustryTech[]; faqs: IndustryFAQ[];
}

export const industriesData: IndustryData[] = [
  {
    "slug": "agriculture-farming-app",
    "name": "Agriculture & Farming",
    "tagline": "Precision agriculture powered by IoT, AI, and real-time data — transforming farms into smart, profitable operations.",
    "description": "Modern agriculture faces rising costs, climate volatility, and supply-chain gaps. Digital platforms bridge these gaps with sensor data, predictive analytics, and direct market access — enabling farmers to boost yield while cutting waste.",
    "heroGradient": "from-[#0d2b1a] via-[#0a3d26] to-[#050b14]",
    "accentFrom": "from-emerald-500",
    "accentTo": "to-green-400",
    "accentHex": "#10b981",
    "iconName": "Leaf",
    "heroHighlights": [
      "Crop Monitoring",
      "IoT Sensor Data",
      "Weather Intelligence",
      "Market Pricing",
      "Yield Analytics"
    ],
    "stats": [
      {
        "value": "40%",
        "label": "Yield Increase"
      },
      {
        "value": "60%",
        "label": "Water Saved"
      },
      {
        "value": "500+",
        "label": "Farms Digitised"
      },
      {
        "value": "3x",
        "label": "ROI Delivered"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Mobile Farm Management",
        "desc": "iOS & Android apps giving farmers complete field control from any device, anywhere."
      },
      {
        "iconName": "BarChart3",
        "title": "Yield Analytics Dashboard",
        "desc": "Real-time analytics on crop health, soil data, and productivity trends in one view."
      },
      {
        "iconName": "Cloud",
        "title": "Cloud Data Platform",
        "desc": "Centralised cloud infrastructure storing sensor readings, forecasts, and farm history."
      },
      {
        "iconName": "Bot",
        "title": "AI Crop Advisory",
        "desc": "Machine learning models that predict optimal planting, irrigation, and harvest windows."
      },
      {
        "iconName": "Map",
        "title": "GIS Field Mapping",
        "desc": "Geospatial mapping for plot management, boundary drawing, and zone-based analytics."
      },
      {
        "iconName": "Users",
        "title": "Farmer Community Portal",
        "desc": "Peer-to-peer marketplace and knowledge-sharing platform connecting farmers to buyers."
      }
    ],
    "features": [
      {
        "iconName": "Wifi",
        "title": "IoT Sensor Integration",
        "desc": "Seamless integration with soil moisture, temperature, humidity, and pH sensors for automated alerts."
      },
      {
        "iconName": "Leaf",
        "title": "Crop Health Monitoring",
        "desc": "Drone imagery and NDVI analysis to detect disease, pest damage, and nutrient deficiencies early."
      },
      {
        "iconName": "Cloud",
        "title": "Weather Intelligence",
        "desc": "Hyper-local 14-day forecasts with automated advisory for irrigation and spray schedules."
      },
      {
        "iconName": "TrendingUp",
        "title": "Market Price Tracker",
        "desc": "Live commodity prices from APMC mandis integrated with sell-order recommendations."
      },
      {
        "iconName": "Package",
        "title": "Inventory & Input Management",
        "desc": "Track seeds, fertilisers, and pesticides with expiry alerts and reorder automation."
      },
      {
        "iconName": "Map",
        "title": "GPS Field Navigation",
        "desc": "Tractor GPS guidance, field boundary mapping, and automated field-log generation."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can the app work offline in areas with poor connectivity?",
        "a": "Yes — our apps use offline-first architecture with local SQLite/Realm storage, syncing automatically when connectivity is restored."
      },
      {
        "q": "Does the platform support IoT sensor hardware integration?",
        "a": "We integrate with most MQTT-based IoT sensors and popular hardware like Arduino, Raspberry Pi, and commercial agri-sensors via standard APIs."
      },
      {
        "q": "How long does it take to build an agriculture management app?",
        "a": "A core MVP typically takes 10–14 weeks. Full-featured platforms with IoT, AI advisory, and marketplace modules take 20–28 weeks."
      },
      {
        "q": "Do you provide post-launch support and model retraining?",
        "a": "Yes — we offer monthly maintenance plans that include model retraining with new season data, feature updates, and 24/7 monitoring."
      }
    ]
  },
  {
    "slug": "blockchain-development",
    "name": "Blockchain Development",
    "tagline": "Decentralised, trustless, and tamper-proof — we build blockchain solutions that redefine business transparency.",
    "description": "Enterprises struggle with data silos, fraud, and intermediary costs. Blockchain eliminates these friction points with immutable ledgers, smart contracts, and decentralised governance — unlocking new levels of trust and efficiency.",
    "heroGradient": "from-[#1a0d3d] via-[#2d1b69] to-[#050b14]",
    "accentFrom": "from-violet-500",
    "accentTo": "to-purple-400",
    "accentHex": "#8b5cf6",
    "iconName": "Network",
    "heroHighlights": [
      "Smart Contracts",
      "DeFi Protocols",
      "NFT Platforms",
      "Supply Chain",
      "Token Launches"
    ],
    "stats": [
      {
        "value": "150+",
        "label": "DApps Deployed"
      },
      {
        "value": "$500M+",
        "label": "Assets Secured"
      },
      {
        "value": "99.9%",
        "label": "Uptime SLA"
      },
      {
        "value": "5+",
        "label": "Chains Supported"
      }
    ],
    "solutions": [
      {
        "iconName": "Code2",
        "title": "Smart Contract Development",
        "desc": "Audited Solidity/Rust contracts for DeFi, DAOs, NFTs, and custom token logic."
      },
      {
        "iconName": "Globe",
        "title": "DApp Frontend Development",
        "desc": "React-based decentralised application UIs with wallet connect and real-time chain data."
      },
      {
        "iconName": "Shield",
        "title": "Security Auditing",
        "desc": "Comprehensive smart contract audits covering reentrancy, overflows, and access control flaws."
      },
      {
        "iconName": "Layers",
        "title": "Layer 2 Scaling",
        "desc": "Polygon, Arbitrum, and zkSync integrations to reduce gas fees and increase throughput."
      },
      {
        "iconName": "Link",
        "title": "Cross-Chain Bridges",
        "desc": "Token and data bridges enabling seamless interoperability between EVM-compatible chains."
      },
      {
        "iconName": "Database",
        "title": "Private Blockchain Networks",
        "desc": "Hyperledger Fabric and Quorum enterprise networks for consortium and supply-chain use cases."
      }
    ],
    "features": [
      {
        "iconName": "Lock",
        "title": "Immutable Ledger",
        "desc": "Every transaction is cryptographically hashed and permanently recorded — no single party can alter history."
      },
      {
        "iconName": "Code2",
        "title": "Self-Executing Smart Contracts",
        "desc": "Business logic encoded on-chain fires automatically when conditions are met, eliminating intermediaries."
      },
      {
        "iconName": "Eye",
        "title": "Full Auditability",
        "desc": "Every state change is publicly verifiable on-chain, enabling real-time audits with zero manual effort."
      },
      {
        "iconName": "Fingerprint",
        "title": "Decentralised Identity (DID)",
        "desc": "W3C-standard DIDs give users sovereign control over their credentials without centralised databases."
      },
      {
        "iconName": "Shield",
        "title": "Zero-Knowledge Proofs",
        "desc": "zk-SNARKs for privacy-preserving verification — prove you know something without revealing the data."
      },
      {
        "iconName": "Globe",
        "title": "Token & NFT Standards",
        "desc": "ERC-20, ERC-721, ERC-1155, and custom token standards with full marketplace integrations."
      }
    ],
    "techStack": [
      {
        "name": "Solidity",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg"
      },
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Which blockchains do you develop on?",
        "a": "We work on Ethereum, Polygon, BNB Chain, Solana, Avalanche, Arbitrum, and private networks like Hyperledger Fabric and Quorum."
      },
      {
        "q": "Do you perform security audits before deployment?",
        "a": "Every smart contract goes through an internal 3-stage audit plus optional third-party audit (Certik, Hacken) before mainnet deployment."
      },
      {
        "q": "How much does a DeFi protocol or NFT marketplace cost?",
        "a": "Simple NFT minting contracts start from ₹2–5L. Full DeFi protocols or DAO governance systems are typically ₹15–50L depending on complexity."
      },
      {
        "q": "Can you migrate our existing system to blockchain?",
        "a": "Yes — we handle hybrid architectures that connect your existing databases/APIs to blockchain for selective on-chain verification without full rewrites."
      }
    ]
  },
  {
    "slug": "crm-development",
    "name": "CRM Development",
    "tagline": "Custom CRM platforms that unify sales, support, and marketing into one intelligent, revenue-driving system.",
    "description": "Off-the-shelf CRMs force businesses into rigid workflows that don't match real sales processes. Custom CRM development gives you total control — matching your pipeline, automations, and reporting to exactly how your team works.",
    "heroGradient": "from-[#0d1f3d] via-[#1a3a6b] to-[#050b14]",
    "accentFrom": "from-blue-500",
    "accentTo": "to-cyan-400",
    "accentHex": "#3b82f6",
    "iconName": "Users",
    "heroHighlights": [
      "Pipeline Management",
      "Lead Scoring",
      "Email Automation",
      "Sales Analytics",
      "Customer 360°"
    ],
    "stats": [
      {
        "value": "35%",
        "label": "Sales Lift"
      },
      {
        "value": "200+",
        "label": "CRMs Shipped"
      },
      {
        "value": "50%",
        "label": "Faster Follow-ups"
      },
      {
        "value": "4.9★",
        "label": "Client Rating"
      }
    ],
    "solutions": [
      {
        "iconName": "Users",
        "title": "Lead & Contact Management",
        "desc": "Centralised contact database with full interaction history, tags, and smart segmentation."
      },
      {
        "iconName": "TrendingUp",
        "title": "Sales Pipeline Builder",
        "desc": "Drag-and-drop Kanban pipelines with stage-based automation triggers and deal velocity tracking."
      },
      {
        "iconName": "Bell",
        "title": "Automated Follow-ups",
        "desc": "Sequence-based email, SMS, and WhatsApp follow-up workflows triggered by lead behaviour."
      },
      {
        "iconName": "BarChart3",
        "title": "Revenue Analytics",
        "desc": "Real-time dashboards showing win rates, cycle times, rep performance, and revenue forecasts."
      },
      {
        "iconName": "Globe",
        "title": "Third-Party Integrations",
        "desc": "Native connectors for Gmail, Outlook, Slack, Zoho, WhatsApp Business, and payment gateways."
      },
      {
        "iconName": "Smartphone",
        "title": "Mobile CRM App",
        "desc": "Native iOS/Android app for field sales reps with offline support and geo-check-in."
      }
    ],
    "features": [
      {
        "iconName": "Target",
        "title": "AI Lead Scoring",
        "desc": "ML model ranks leads by conversion probability using 50+ behavioural and demographic signals."
      },
      {
        "iconName": "Calendar",
        "title": "Meeting Scheduler",
        "desc": "Embedded booking widget synced with Google/Outlook calendar — zero back-and-forth scheduling."
      },
      {
        "iconName": "MessageSquare",
        "title": "Unified Inbox",
        "desc": "All customer communications (email, chat, SMS, WhatsApp) in one threaded conversation view."
      },
      {
        "iconName": "PieChart",
        "title": "Custom Report Builder",
        "desc": "Drag-and-drop report designer with filters, groupings, and scheduled PDF/Excel exports."
      },
      {
        "iconName": "UserCheck",
        "title": "Role-Based Access Control",
        "desc": "Granular permissions by team, territory, and deal stage — ensuring data privacy compliance."
      },
      {
        "iconName": "Lightbulb",
        "title": "AI Deal Intelligence",
        "desc": "Surfaces next-best actions, competitor mentions, and churn risk signals from call/email transcripts."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How is a custom CRM better than Salesforce or HubSpot?",
        "a": "Custom CRMs have zero per-seat fees, match your exact workflow, integrate with any internal system, and scale without licensing cost explosions — typically paying off within 18–24 months."
      },
      {
        "q": "Can you migrate data from our existing CRM?",
        "a": "Yes — we handle data migration from Salesforce, HubSpot, Zoho, Pipedrive, and spreadsheets with validation, deduplication, and zero downtime."
      },
      {
        "q": "How long to build a CRM from scratch?",
        "a": "A core CRM (contacts, pipeline, tasks, basic reporting) takes 12–16 weeks. Full-featured platforms with AI, mobile apps, and integrations take 20–30 weeks."
      },
      {
        "q": "Do you offer training and onboarding support?",
        "a": "Yes — we provide video documentation, live admin training sessions, and a 60-day hypercare period with dedicated support post-launch."
      }
    ]
  },
  {
    "slug": "dr-consultation-app",
    "name": "Dr. Consultation App",
    "tagline": "On-demand doctor consultations — connecting patients and physicians instantly via video, chat, and AI triage.",
    "description": "Healthcare access is limited by geography, wait times, and appointment friction. Digital consultation platforms remove these barriers, enabling patients to connect with certified doctors in minutes while giving physicians flexible, scalable practices.",
    "heroGradient": "from-[#0d2d35] via-[#0a4a5c] to-[#050b14]",
    "accentFrom": "from-teal-500",
    "accentTo": "to-cyan-400",
    "accentHex": "#14b8a6",
    "iconName": "Stethoscope",
    "heroHighlights": [
      "Video Consultation",
      "AI Symptom Checker",
      "e-Prescription",
      "Appointment Booking",
      "EHR Access"
    ],
    "stats": [
      {
        "value": "10M+",
        "label": "Consultations"
      },
      {
        "value": "< 5 min",
        "label": "Average Wait"
      },
      {
        "value": "5K+",
        "label": "Doctors Onboarded"
      },
      {
        "value": "HIPAA",
        "label": "Compliant"
      }
    ],
    "solutions": [
      {
        "iconName": "Video",
        "title": "HD Video Consultations",
        "desc": "WebRTC-powered video calls with adaptive bitrate for reliable connections on 3G/4G networks."
      },
      {
        "iconName": "Calendar",
        "title": "Smart Appointment Engine",
        "desc": "Availability-aware booking with specialty filters, instant slots, and automated reminders."
      },
      {
        "iconName": "Bot",
        "title": "AI Symptom Triage",
        "desc": "NLP-based symptom checker that routes patients to the right specialist with urgency scoring."
      },
      {
        "iconName": "Database",
        "title": "Electronic Health Records",
        "desc": "Structured patient history, lab reports, prescriptions, and vitals stored securely with HL7 FHIR."
      },
      {
        "iconName": "MessageSquare",
        "title": "Secure Patient Messaging",
        "desc": "End-to-end encrypted text and media chat for follow-up queries and prescription clarifications."
      },
      {
        "iconName": "CreditCard",
        "title": "Payment & Insurance",
        "desc": "Multi-gateway payment processing with insurance claim integration and auto-billing for subscriptions."
      }
    ],
    "features": [
      {
        "iconName": "Video",
        "title": "Instant Video / Audio Call",
        "desc": "One-tap HD video or voice consultation with screen-share for reviewing lab reports together."
      },
      {
        "iconName": "Activity",
        "title": "Digital e-Prescription",
        "desc": "Doctors generate digitally signed prescriptions in-app, which patients can share with any pharmacy."
      },
      {
        "iconName": "HeartPulse",
        "title": "Vitals & Health Tracking",
        "desc": "Integration with wearables (Apple Watch, Fitbit) to share real-time heart rate, SpO2, and sleep data."
      },
      {
        "iconName": "Calendar",
        "title": "Appointment Reminders",
        "desc": "Multi-channel reminders (SMS, push, WhatsApp) reducing no-shows by over 60%."
      },
      {
        "iconName": "Shield",
        "title": "HIPAA-Compliant Architecture",
        "desc": "End-to-end encryption, audit logs, RBAC, and data residency controls for full regulatory compliance."
      },
      {
        "iconName": "Star",
        "title": "Doctor Rating & Reviews",
        "desc": "Transparent review system with verified-patient ratings helping users choose the right specialist."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Is the platform compliant with HIPAA and India's DPDP Act?",
        "a": "Yes — we build with end-to-end encryption, audit trails, data minimisation, and consent management to meet HIPAA, GDPR, and India's DPDP requirements."
      },
      {
        "q": "Can we integrate with existing hospital HIS/EMR systems?",
        "a": "Yes — we integrate with major HIS/EMR systems (Epic, Cerner, Practo, eHospital) via HL7 FHIR and REST APIs."
      },
      {
        "q": "How do you handle poor network conditions during video calls?",
        "a": "We use adaptive bitrate streaming and fallback to audio-only or chat mode when bandwidth drops below threshold, ensuring consultation continuity."
      },
      {
        "q": "How long does telemedicine app development take?",
        "a": "A core telemedicine MVP (video + booking + prescription) takes 14–18 weeks. Full platform with AI triage, EHR, and billing takes 24–32 weeks."
      }
    ]
  },
  {
    "slug": "e-commerce-app-web",
    "name": "E-Commerce App & Web",
    "tagline": "Conversion-engineered shopping experiences — fast, personalised, and built to scale to millions of transactions.",
    "description": "E-commerce competition is relentless, and shoppers expect sub-second load times, personalised recommendations, and frictionless checkout. We engineer platforms that convert visitors into buyers and buyers into loyal advocates.",
    "heroGradient": "from-[#2d1200] via-[#5c2800] to-[#050b14]",
    "accentFrom": "from-orange-500",
    "accentTo": "to-amber-400",
    "accentHex": "#f97316",
    "iconName": "ShoppingCart",
    "heroHighlights": [
      "Product Catalogue",
      "1-Click Checkout",
      "AI Recommendations",
      "Live Inventory",
      "Seller Dashboard"
    ],
    "stats": [
      {
        "value": "320%",
        "label": "Avg Conversion Lift"
      },
      {
        "value": "50ms",
        "label": "Page Load Target"
      },
      {
        "value": "100+",
        "label": "Stores Launched"
      },
      {
        "value": "₹500Cr+",
        "label": "GMV Processed"
      }
    ],
    "solutions": [
      {
        "iconName": "ShoppingCart",
        "title": "Custom Storefront",
        "desc": "Pixel-perfect storefronts with mega menus, faceted search, and mobile-first responsive layouts."
      },
      {
        "iconName": "CreditCard",
        "title": "Payment Gateway Integration",
        "desc": "Razorpay, Stripe, PayU, UPI, and BNPL integrations with PCI-DSS compliant checkout flows."
      },
      {
        "iconName": "Package",
        "title": "Inventory Management",
        "desc": "Real-time multi-warehouse stock tracking with auto-reorder triggers and barcode scanning."
      },
      {
        "iconName": "Bot",
        "title": "AI Product Recommendations",
        "desc": "Collaborative filtering engine that personalises homepage, PDP, and cart upsell recommendations."
      },
      {
        "iconName": "BarChart3",
        "title": "Seller & Admin Dashboard",
        "desc": "Comprehensive analytics with GMV trends, return rates, bestsellers, and cohort analysis."
      },
      {
        "iconName": "Truck",
        "title": "Logistics Integration",
        "desc": "Shiprocket, Delhivery, and Bluedart integrations with live tracking and automated RTO handling."
      }
    ],
    "features": [
      {
        "iconName": "Search",
        "title": "AI-Powered Search",
        "desc": "Semantic search with typo tolerance, synonym expansion, and visual search via image upload."
      },
      {
        "iconName": "QrCode",
        "title": "Quick Reorder & Wishlist",
        "desc": "One-tap reorder from order history and sharable wishlists to drive repeat purchase rates."
      },
      {
        "iconName": "Tag",
        "title": "Dynamic Pricing & Coupons",
        "desc": "Rule-based pricing engine with coupon stacking, flash sale timers, and personalised discounts."
      },
      {
        "iconName": "Star",
        "title": "Reviews & Q&A System",
        "desc": "Verified buyer reviews with photo/video uploads, seller responses, and helpfulness voting."
      },
      {
        "iconName": "MessageCircle",
        "title": "Live Chat & Chatbot",
        "desc": "AI chatbot handles 80% of pre-sales queries; seamless handoff to human agents for complex cases."
      },
      {
        "iconName": "Shield",
        "title": "Fraud Detection",
        "desc": "ML-based order fraud scoring with velocity checks, device fingerprinting, and OTP verification."
      }
    ],
    "techStack": [
      {
        "name": "Next.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can you build a multi-vendor marketplace like Amazon or Flipkart?",
        "a": "Yes — we specialise in multi-vendor platforms with seller onboarding, commission management, dispute resolution, and split-payment payouts."
      },
      {
        "q": "How do you handle high-traffic events like sales?",
        "a": "We use auto-scaling infrastructure on AWS/GCP, Redis caching layers, CDN for assets, and load testing pre-event to guarantee uptime during peak traffic."
      },
      {
        "q": "Can you migrate from Shopify/WooCommerce to a custom platform?",
        "a": "Yes — we migrate products, orders, customers, reviews, and SEO metadata with zero downtime using a parallel-run migration strategy."
      },
      {
        "q": "What is the typical e-commerce app development timeline?",
        "a": "A B2C storefront with app takes 16–22 weeks. Multi-vendor marketplace platforms with seller portals, logistics, and advanced analytics take 28–40 weeks."
      }
    ]
  },
  {
    "slug": "education-app",
    "name": "Education App",
    "tagline": "Interactive, adaptive learning platforms that engage students and empower educators at every level.",
    "description": "Traditional education fails to personalise learning at scale. EdTech platforms powered by AI, gamification, and live collaboration tools deliver measurable learning outcomes — whether for K-12, higher education, or corporate training.",
    "heroGradient": "from-[#0d1545] via-[#1a2b7a] to-[#050b14]",
    "accentFrom": "from-indigo-500",
    "accentTo": "to-violet-400",
    "accentHex": "#6366f1",
    "iconName": "GraduationCap",
    "heroHighlights": [
      "Live Classes",
      "Adaptive Learning",
      "Progress Tracking",
      "Gamification",
      "Certificates"
    ],
    "stats": [
      {
        "value": "5M+",
        "label": "Students Served"
      },
      {
        "value": "92%",
        "label": "Course Completion"
      },
      {
        "value": "300+",
        "label": "Institutes Onboarded"
      },
      {
        "value": "40+",
        "label": "Languages Supported"
      }
    ],
    "solutions": [
      {
        "iconName": "Video",
        "title": "Live & Recorded Classes",
        "desc": "HLS-based video streaming with DVR rewind, multi-track subtitles, and speed control."
      },
      {
        "iconName": "Bot",
        "title": "AI Tutor & Doubt Engine",
        "desc": "NLP-powered doubt resolution that answers student questions instantly from the course content."
      },
      {
        "iconName": "BarChart3",
        "title": "Learning Analytics",
        "desc": "Instructor dashboards showing watch time, quiz scores, engagement heatmaps, and at-risk learners."
      },
      {
        "iconName": "Award",
        "title": "Certification Engine",
        "desc": "Auto-generated blockchain-verified certificates upon course completion with shareable LinkedIn badges."
      },
      {
        "iconName": "Users",
        "title": "Collaborative Classrooms",
        "desc": "Virtual whiteboard, breakout rooms, hand-raise, polls, and peer Q&A for interactive live sessions."
      },
      {
        "iconName": "Smartphone",
        "title": "Offline Learning Mode",
        "desc": "Download lessons for offline viewing on mobile — perfect for students in low-connectivity regions."
      }
    ],
    "features": [
      {
        "iconName": "Target",
        "title": "Adaptive Learning Paths",
        "desc": "AI adjusts content difficulty and sequence based on each learner's quiz performance and pace."
      },
      {
        "iconName": "Star",
        "title": "Gamification & Leaderboards",
        "desc": "Points, badges, streaks, and weekly leaderboards that drive daily engagement and habit formation."
      },
      {
        "iconName": "BookOpen",
        "title": "Rich Content Library",
        "desc": "Support for video, PDF, SCORM, interactive H5P, simulations, and VR/AR content types."
      },
      {
        "iconName": "Calendar",
        "title": "Smart Scheduling",
        "desc": "Automated timetable generation for live classes with timezone normalisation for global cohorts."
      },
      {
        "iconName": "PieChart",
        "title": "Parent & Guardian Portal",
        "desc": "Real-time visibility into attendance, grades, homework, and teacher feedback for school parents."
      },
      {
        "iconName": "Shield",
        "title": "Anti-Cheating Technology",
        "desc": "Proctoring with webcam monitoring, tab-switch detection, and IP restriction for high-stakes exams."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can you build both a mobile app and web platform for the same content?",
        "a": "Yes — we use a shared backend API with React Native for mobile and React/Next.js for web, ensuring content parity and single CMS management."
      },
      {
        "q": "Do you support SCORM and LTI standards for existing content?",
        "a": "Yes — we support SCORM 1.2, SCORM 2004, and LTI 1.3 for importing content from authoring tools like Articulate and integrating with LMS systems."
      },
      {
        "q": "How do you handle thousands of students in a live class simultaneously?",
        "a": "We use WebRTC for host and HLS broadcast for viewers, supporting 10,000+ concurrent students per session with CDN-optimised delivery."
      },
      {
        "q": "What is the typical EdTech platform development timeline?",
        "a": "A core LMS with video, quizzes, and progress tracking takes 14–18 weeks. Full marketplace with live classes, AI tutor, and mobile apps takes 24–32 weeks."
      }
    ]
  },
  {
    "slug": "fintech-app",
    "name": "Fintech App",
    "tagline": "Secure, compliant, and lightning-fast financial applications trusted by banks, startups, and enterprises.",
    "description": "Financial services are undergoing radical disruption. Consumers demand real-time payments, AI-driven insights, and zero-friction onboarding. We build regulated fintech products that balance security, compliance, and delightful UX.",
    "heroGradient": "from-[#002d1a] via-[#00472a] to-[#050b14]",
    "accentFrom": "from-emerald-500",
    "accentTo": "to-teal-400",
    "accentHex": "#10b981",
    "iconName": "DollarSign",
    "heroHighlights": [
      "KYC Verification",
      "UPI/Wallet",
      "Fraud Detection",
      "BNPL Engine",
      "Investment Tracking"
    ],
    "stats": [
      {
        "value": "$2.3B+",
        "label": "Transactions Processed"
      },
      {
        "value": "99.99%",
        "label": "Uptime Delivered"
      },
      {
        "value": "80+",
        "label": "Fintech Apps Built"
      },
      {
        "value": "PCI DSS",
        "label": "Certified Stack"
      }
    ],
    "solutions": [
      {
        "iconName": "CreditCard",
        "title": "Digital Wallet & Payments",
        "desc": "Multi-currency wallets supporting UPI, NEFT, IMPS, cards, and international wire transfers."
      },
      {
        "iconName": "Shield",
        "title": "Fraud Detection Engine",
        "desc": "Real-time ML scoring on every transaction with velocity checks, geo-anomaly, and device fingerprinting."
      },
      {
        "iconName": "BarChart3",
        "title": "Investment & Portfolio Dashboard",
        "desc": "Live NAV tracking, P&L analytics, and goal-based SIP management for wealth platforms."
      },
      {
        "iconName": "Fingerprint",
        "title": "KYC / AML Compliance",
        "desc": "Aadhaar OTP, Video KYC, PAN verification, and CKYC integration with BSA/AML monitoring."
      },
      {
        "iconName": "Bot",
        "title": "AI Financial Advisor",
        "desc": "Robo-advisory that generates personalised investment recommendations based on risk profile and goals."
      },
      {
        "iconName": "Smartphone",
        "title": "Mobile Banking App",
        "desc": "Full-featured banking app with biometric auth, account aggregation, and spend analytics."
      }
    ],
    "features": [
      {
        "iconName": "Fingerprint",
        "title": "Biometric Authentication",
        "desc": "Fingerprint, Face ID, and TOTP-based MFA for every sensitive transaction — meeting RBI guidelines."
      },
      {
        "iconName": "Shield",
        "title": "Real-time Fraud Detection",
        "desc": "Sub-100ms fraud scoring on every transaction using an ensemble ML model with 99.7% accuracy."
      },
      {
        "iconName": "QrCode",
        "title": "QR & UPI Payments",
        "desc": "Dynamic QR generation, UPI deep-links, and AutoPay mandate management built on NPCI specs."
      },
      {
        "iconName": "BarChart3",
        "title": "Spend Analytics & Budgeting",
        "desc": "Automatic transaction categorisation with monthly budget tracking and overspend alerts."
      },
      {
        "iconName": "Globe",
        "title": "Multi-Currency Support",
        "desc": "40+ currency support with live forex rates, FX fee transparency, and cross-border transfer compliance."
      },
      {
        "iconName": "Bell",
        "title": "Instant Push Notifications",
        "desc": "Sub-second transaction notifications via FCM/APNs with deep-link navigation to the relevant screen."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Do you build RBI-compliant payment and lending applications?",
        "a": "Yes — we build fully compliant systems following RBI's NBFC/PA/PG guidelines, including mandatory audit trails, data localisation, and incident reporting."
      },
      {
        "q": "How do you secure financial data against breaches?",
        "a": "We use AES-256 encryption at rest, TLS 1.3 in transit, HSM-backed key management, zero-trust network architecture, and quarterly penetration testing."
      },
      {
        "q": "Can you integrate with core banking systems (CBS)?",
        "a": "Yes — we integrate with Finacle, BankFlex, Oracle FLEXCUBE, and FIS via ISO 20022, ISO 8583, and REST APIs."
      },
      {
        "q": "What is the timeline and cost for a fintech MVP?",
        "a": "A digital wallet MVP takes 14–18 weeks (₹15–30L). Full neobanking platforms with lending, investments, and KYC take 32–52 weeks."
      }
    ]
  },
  {
    "slug": "food-delivery-app",
    "name": "Food Delivery App",
    "tagline": "Hyper-local food delivery ecosystems connecting restaurants, riders, and customers in real-time.",
    "description": "The food delivery market demands sub-30-minute fulfilment, real-time tracking, and seamless multi-restaurant ordering. We build end-to-end delivery platforms with three-sided marketplace logic — customers, restaurants, and delivery partners all in one system.",
    "heroGradient": "from-[#2d1800] via-[#5c3200] to-[#050b14]",
    "accentFrom": "from-amber-500",
    "accentTo": "to-orange-400",
    "accentHex": "#f59e0b",
    "iconName": "Utensils",
    "heroHighlights": [
      "Live Order Tracking",
      "Restaurant Dashboard",
      "Rider Management",
      "Smart Dispatch",
      "Loyalty Rewards"
    ],
    "stats": [
      {
        "value": "2M+",
        "label": "Orders Delivered"
      },
      {
        "value": "28 min",
        "label": "Avg Delivery Time"
      },
      {
        "value": "150+",
        "label": "Apps Launched"
      },
      {
        "value": "99.5%",
        "label": "Order Accuracy"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Customer App",
        "desc": "Intuitive ordering app with live tracking, saved addresses, real-time ETA, and in-app chat."
      },
      {
        "iconName": "Map",
        "title": "Rider / Driver App",
        "desc": "Delivery partner app with order queue, GPS navigation, earnings dashboard, and availability toggle."
      },
      {
        "iconName": "BarChart3",
        "title": "Restaurant Dashboard",
        "desc": "Web/tablet portal for menu management, live order screen, preparation time control, and reports."
      },
      {
        "iconName": "Bot",
        "title": "Smart Dispatch Engine",
        "desc": "ML-based order routing that assigns riders based on proximity, workload, and estimated delivery time."
      },
      {
        "iconName": "CreditCard",
        "title": "Payment & Wallet",
        "desc": "Multi-method checkout (UPI, cards, wallets, COD) with instant refund processing and split bills."
      },
      {
        "iconName": "Bell",
        "title": "Push Notification Engine",
        "desc": "Real-time order updates, promotions, and rider location alerts via FCM/APNs."
      }
    ],
    "features": [
      {
        "iconName": "Navigation",
        "title": "Real-time GPS Tracking",
        "desc": "Live rider location on customer map with ETA countdown updated every 5 seconds."
      },
      {
        "iconName": "Star",
        "title": "Smart Rating System",
        "desc": "Post-delivery ratings for food quality, packaging, and rider — with AI-flagged review moderation."
      },
      {
        "iconName": "Tag",
        "title": "Coupon & Loyalty Engine",
        "desc": "Stackable promo codes, cashback wallets, punch-card loyalty, and referral reward programmes."
      },
      {
        "iconName": "Clock",
        "title": "Scheduled Orders",
        "desc": "Advance order scheduling up to 7 days out with kitchen confirmation and timed dispatch."
      },
      {
        "iconName": "Users",
        "title": "Group Ordering",
        "desc": "Multiple users add items to a shared cart with individual payment splits — ideal for office orders."
      },
      {
        "iconName": "BarChart3",
        "title": "Restaurant Analytics",
        "desc": "Revenue heatmaps, peak-hour analysis, popular item tracking, and customer retention reports."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      },
      {
        "name": "Google Cloud",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Do you build both the customer app and restaurant/rider dashboards?",
        "a": "Yes — we deliver all three surfaces: customer iOS/Android app, restaurant web/tablet dashboard, and rider mobile app in a single engagement."
      },
      {
        "q": "How does the smart dispatch algorithm work?",
        "a": "Our engine uses Dijkstra-based routing + ML load balancing to assign the nearest available rider, considering traffic, preparation time, and rider performance score."
      },
      {
        "q": "Can the platform handle multiple cities and zone-based delivery?",
        "a": "Yes — we support multi-zone configuration with city-specific restaurant catalogues, delivery fees, surge pricing, and zone-based rider pools."
      },
      {
        "q": "What is the typical timeline and investment?",
        "a": "A core 3-app food delivery MVP takes 16–20 weeks (₹18–35L). Enterprise platforms with hyperlocal AI and advanced analytics take 28–40 weeks."
      }
    ]
  },
  {
    "slug": "gps-tracking-devices",
    "name": "GPS Tracking Devices",
    "tagline": "Real-time fleet intelligence — track every asset, cut fuel costs, and prevent theft with centimetre precision.",
    "description": "Fleet operators lose 15–25% of fuel and operating costs to inefficiency, unauthorized use, and poor route planning. GPS tracking platforms restore full visibility — from ignition events to driver behaviour — in real time.",
    "heroGradient": "from-[#001f3d] via-[#003670] to-[#050b14]",
    "accentFrom": "from-cyan-500",
    "accentTo": "to-blue-400",
    "accentHex": "#06b6d4",
    "iconName": "MapPin",
    "heroHighlights": [
      "Live Fleet Map",
      "Geo-fencing",
      "Driver Scoring",
      "Fuel Analytics",
      "Trip History"
    ],
    "stats": [
      {
        "value": "20%",
        "label": "Fuel Savings"
      },
      {
        "value": "500K+",
        "label": "Vehicles Tracked"
      },
      {
        "value": "< 5 sec",
        "label": "Update Interval"
      },
      {
        "value": "99.97%",
        "label": "Uptime"
      }
    ],
    "solutions": [
      {
        "iconName": "Map",
        "title": "Live Fleet Map",
        "desc": "Real-time map with all vehicle positions, speed, direction, and status overlaid on Google Maps / OSM."
      },
      {
        "iconName": "Navigation",
        "title": "Route Optimisation",
        "desc": "AI route planning that minimises mileage, fuel, and time across multi-stop delivery schedules."
      },
      {
        "iconName": "Bell",
        "title": "Geo-fence Alerts",
        "desc": "Define virtual perimeters and receive instant alerts when vehicles enter or exit designated zones."
      },
      {
        "iconName": "BarChart3",
        "title": "Fuel Monitoring",
        "desc": "Fuel sensor integration tracking consumption, refills, and drain events with anomaly detection."
      },
      {
        "iconName": "Smartphone",
        "title": "Driver Mobile App",
        "desc": "Driver-facing app for trip logging, delivery confirmation, SOS, and in-app navigation."
      },
      {
        "iconName": "Database",
        "title": "Trip History & Reports",
        "desc": "Searchable 12-month trip archive with distance, idle time, speed violations, and export to PDF/Excel."
      }
    ],
    "features": [
      {
        "iconName": "MapPin",
        "title": "Centimetre-level GPS",
        "desc": "GNSS multi-constellation tracking (GPS, GLONASS, Galileo) with <2m accuracy."
      },
      {
        "iconName": "Activity",
        "title": "Driver Behaviour Scoring",
        "desc": "Harsh braking, acceleration, cornering, and speeding scored per driver per trip for safety coaching."
      },
      {
        "iconName": "Bell",
        "title": "Theft & Tamper Alerts",
        "desc": "Ignition cut relay, door sensor alerts, and SIM-swap detection with instant push/SMS notifications."
      },
      {
        "iconName": "Truck",
        "title": "OBD-II Integration",
        "desc": "Engine diagnostics — DTC error codes, RPM, coolant temp, battery voltage — direct from vehicle ECU."
      },
      {
        "iconName": "Clock",
        "title": "Idle Time Analytics",
        "desc": "Track engine-idle hours and cost per vehicle, enabling policy enforcement and idle reduction campaigns."
      },
      {
        "iconName": "Shield",
        "title": "Data Retention & Compliance",
        "desc": "Full audit trail with tamper-proof logs for insurance claims, compliance, and incident investigations."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Which GPS hardware do you support?",
        "a": "We integrate with Teltonika, Concox, Queclink, Coban, and custom MQTT-based devices via GPRS/4G protocols."
      },
      {
        "q": "How frequently does the vehicle position update?",
        "a": "Default is every 5–10 seconds while moving; configurable down to 1-second intervals for high-precision use cases like ambulance tracking."
      },
      {
        "q": "Can the platform scale to 50,000+ vehicles?",
        "a": "Yes — our platform uses MQTT message brokers (EMQX), time-series databases (TimescaleDB), and Kubernetes auto-scaling to handle millions of daily data points."
      },
      {
        "q": "Do you offer white-label GPS platform licensing?",
        "a": "Yes — we offer white-label builds for fleet management SaaS companies, with branded mobile apps, custom domains, and multi-tenant architecture."
      }
    ]
  },
  {
    "slug": "grocery-delivery-app",
    "name": "Grocery Delivery App",
    "tagline": "10-minute grocery delivery — slot-based fulfilment, smart inventory, and micro-warehouse orchestration.",
    "description": "Quick-commerce has reset consumer expectations: groceries must arrive in under 30 minutes. We build dark-store management systems, hyper-local inventory engines, and lightning-fast customer apps that make this promise a reality.",
    "heroGradient": "from-[#0a2200] via-[#153a00] to-[#050b14]",
    "accentFrom": "from-lime-500",
    "accentTo": "to-green-400",
    "accentHex": "#84cc16",
    "iconName": "ShoppingBasket",
    "heroHighlights": [
      "10-min Delivery",
      "Dark Store Mgmt",
      "Dynamic Pricing",
      "Substitution Logic",
      "Slot Booking"
    ],
    "stats": [
      {
        "value": "12 min",
        "label": "Avg Delivery Time"
      },
      {
        "value": "98.5%",
        "label": "Item Availability"
      },
      {
        "value": "5K+",
        "label": "SKUs Managed"
      },
      {
        "value": "4.8★",
        "label": "App Store Rating"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Customer Ordering App",
        "desc": "Category browsing, smart search, voice ordering, and one-tap reorder from purchase history."
      },
      {
        "iconName": "Package",
        "title": "Dark Store Management",
        "desc": "Real-time inventory across micro-warehouses with putaway, picking, and packing workflows."
      },
      {
        "iconName": "Map",
        "title": "Delivery Route Optimisation",
        "desc": "Multi-stop route engine minimising delivery time while maximising rider batch efficiency."
      },
      {
        "iconName": "BarChart3",
        "title": "Demand Forecasting",
        "desc": "ML forecasts that predict demand by SKU, zone, and time-slot to prevent stockouts and overstock."
      },
      {
        "iconName": "Bot",
        "title": "Smart Substitution Engine",
        "desc": "AI suggests nearest available substitutes when items are out of stock, with customer approval flow."
      },
      {
        "iconName": "Tag",
        "title": "Promotions & Hyperlocal Offers",
        "desc": "Zone-specific flash deals, loyalty stamps, and referral programmes configured per dark store."
      }
    ],
    "features": [
      {
        "iconName": "Clock",
        "title": "Slot-based Delivery",
        "desc": "30-minute delivery windows with capacity management and real-time slot availability for customers."
      },
      {
        "iconName": "Search",
        "title": "Visual Product Search",
        "desc": "Upload a photo of any product to find exact matches in the catalogue via ML image recognition."
      },
      {
        "iconName": "Bell",
        "title": "Out-of-Stock Notifications",
        "desc": "Automatic alerts when saved items are restocked, driving repeat traffic without ads."
      },
      {
        "iconName": "Activity",
        "title": "Live Order Tracking",
        "desc": "Real-time picker → packer → rider status with live GPS map for the last-mile stage."
      },
      {
        "iconName": "Shield",
        "title": "Freshness Guarantee System",
        "desc": "Expiry-date scanning at ingest, FIFO picking logic, and auto-disposition for near-expiry stock."
      },
      {
        "iconName": "Star",
        "title": "Subscription Baskets",
        "desc": "Weekly auto-delivery baskets for staples with smart top-up suggestions and flexible pause/edit."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "Google Cloud",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How do you manage inventory across multiple dark stores?",
        "a": "We use a centralised inventory service with dark-store-specific stock levels, inter-store transfer workflows, and real-time sync to prevent overselling."
      },
      {
        "q": "How do you achieve sub-15-minute delivery times?",
        "a": "Through dark-store proximity design (≤2km radius), optimised picking paths (zone-based warehouse layout), and ML dispatch that batches nearby orders."
      },
      {
        "q": "Can the platform handle 1,000+ concurrent orders during peak hours?",
        "a": "Yes — our event-driven architecture on Kubernetes handles burst traffic with auto-scaling, Redis order queues, and database connection pooling."
      },
      {
        "q": "What is the typical build timeline and cost?",
        "a": "A core grocery MVP (customer app, picker app, admin panel) takes 14–18 weeks (₹15–28L). Full quick-commerce platform with AI and dark-store ops takes 28–36 weeks."
      }
    ]
  },
  {
    "slug": "healthcare-and-fitness-app",
    "name": "Healthcare & Fitness App",
    "tagline": "Digital health companions that track, motivate, and empower users to live healthier every day.",
    "description": "Preventive health and fitness have become trillion-dollar markets driven by wearable data, AI coaching, and social accountability. We build HIPAA-ready health platforms that seamlessly blend medical data, fitness tracking, and behaviour-change science.",
    "heroGradient": "from-[#2d0020] via-[#5a0040] to-[#050b14]",
    "accentFrom": "from-pink-500",
    "accentTo": "to-rose-400",
    "accentHex": "#ec4899",
    "iconName": "HeartPulse",
    "heroHighlights": [
      "Wearable Sync",
      "AI Health Coach",
      "Workout Planner",
      "Nutrition Tracking",
      "Telehealth"
    ],
    "stats": [
      {
        "value": "10M+",
        "label": "Active Users"
      },
      {
        "value": "82%",
        "label": "Goal Achievement"
      },
      {
        "value": "500+",
        "label": "Health Apps Built"
      },
      {
        "value": "HIPAA",
        "label": "Compliant"
      }
    ],
    "solutions": [
      {
        "iconName": "Activity",
        "title": "Fitness & Activity Tracking",
        "desc": "Step count, calories, workout detection, and 60+ activity types tracked via phone sensors and wearables."
      },
      {
        "iconName": "HeartPulse",
        "title": "Health Vitals Monitoring",
        "desc": "Heart rate, SpO2, sleep stages, HRV, and stress levels from Apple Watch, Fitbit, and Garmin."
      },
      {
        "iconName": "Bot",
        "title": "AI Personal Coach",
        "desc": "Adaptive workout and nutrition plans that evolve weekly based on performance, recovery, and goals."
      },
      {
        "iconName": "Users",
        "title": "Social & Community Features",
        "desc": "Friend challenges, group fitness events, and community feed to drive accountability and motivation."
      },
      {
        "iconName": "Database",
        "title": "Health Data Platform",
        "desc": "HL7 FHIR-compliant health data store integrating with hospital EHRs and insurance platforms."
      },
      {
        "iconName": "Video",
        "title": "Live & On-demand Workouts",
        "desc": "Instructor-led video workouts with adaptive difficulty, form feedback via AI vision, and scheduling."
      }
    ],
    "features": [
      {
        "iconName": "Heart",
        "title": "Real-time Heart Rate Zones",
        "desc": "Zone-based training guidance (fat burn, cardio, peak) with audio cues during workouts."
      },
      {
        "iconName": "Smartphone",
        "title": "Wearable Integration",
        "desc": "HealthKit, Google Fit, Samsung Health, and Fitbit SDK integration for automatic data sync."
      },
      {
        "iconName": "Calendar",
        "title": "Personalised Meal Plans",
        "desc": "AI generates daily meal plans matching calorie targets, dietary preferences, and macro goals."
      },
      {
        "iconName": "Bell",
        "title": "Smart Reminders & Nudges",
        "desc": "Context-aware reminders based on calendar, location, and previous behaviour patterns."
      },
      {
        "iconName": "Star",
        "title": "Streak & Achievement System",
        "desc": "Daily streaks, monthly challenges, and milestone badges that sustain long-term behaviour change."
      },
      {
        "iconName": "Shield",
        "title": "Medical Data Privacy",
        "desc": "HIPAA-grade encryption, consent management, and data export rights for all health records."
      }
    ],
    "techStack": [
      {
        "name": "Swift",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg"
      },
      {
        "name": "Kotlin",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can the app sync with Apple Watch and Fitbit simultaneously?",
        "a": "Yes — we integrate with HealthKit (iOS), Google Fit (Android), Fitbit Web API, and Garmin Connect, with unified data normalisation in our health data layer."
      },
      {
        "q": "Do you build medical-grade health apps or just fitness trackers?",
        "a": "Both — from consumer fitness apps to clinical-grade platforms for chronic disease management, mental health, and post-surgical rehab with physician oversight."
      },
      {
        "q": "How do you handle HIPAA compliance for health data?",
        "a": "We implement BAA agreements, AES-256 encryption at rest, TLS 1.3 in transit, access logs, automatic de-identification, and right-to-deletion workflows."
      },
      {
        "q": "What is the build timeline for a fitness app?",
        "a": "A core fitness tracker MVP takes 10–14 weeks. Full health platform with wearable sync, AI coaching, nutrition, and telehealth takes 22–32 weeks."
      }
    ]
  },
  {
    "slug": "hotel-booking-app-website",
    "name": "Hotel Booking App",
    "tagline": "Frictionless hotel discovery and booking — from search to stay confirmation in under 60 seconds.",
    "description": "Travel and hospitality demand seamless digital experiences across search, booking, and in-stay services. We build OTA platforms, property management systems, and guest experience apps that maximise occupancy and satisfaction.",
    "heroGradient": "from-[#2d1a00] via-[#4a2e00] to-[#050b14]",
    "accentFrom": "from-amber-500",
    "accentTo": "to-yellow-400",
    "accentHex": "#f59e0b",
    "iconName": "Bed",
    "heroHighlights": [
      "Smart Search",
      "Dynamic Pricing",
      "Loyalty Points",
      "In-App Concierge",
      "Channel Manager"
    ],
    "stats": [
      {
        "value": "5M+",
        "label": "Bookings Processed"
      },
      {
        "value": "35%",
        "label": "Direct Booking Lift"
      },
      {
        "value": "200+",
        "label": "Properties Onboarded"
      },
      {
        "value": "4.9★",
        "label": "Guest Rating Avg"
      }
    ],
    "solutions": [
      {
        "iconName": "Search",
        "title": "Smart Hotel Search",
        "desc": "Filter by location, amenities, price, and sentiment — with map view and AI-ranked results."
      },
      {
        "iconName": "Calendar",
        "title": "Real-time Availability Engine",
        "desc": "Two-way channel manager sync with OTA platforms (Booking.com, Expedia) for live inventory."
      },
      {
        "iconName": "CreditCard",
        "title": "Secure Booking & Payment",
        "desc": "One-click checkout with saved cards, UPI, EMI, and multi-currency support."
      },
      {
        "iconName": "Bot",
        "title": "AI Pricing Optimisation",
        "desc": "Dynamic rate recommendations based on demand forecasting, competitor rates, and occupancy."
      },
      {
        "iconName": "MessageSquare",
        "title": "In-app Guest Messaging",
        "desc": "Pre-arrival, in-stay, and post-checkout messaging with automated service request handling."
      },
      {
        "iconName": "BarChart3",
        "title": "Property Analytics Dashboard",
        "desc": "RevPAR, ADR, occupancy rate, and review sentiment analytics for property managers."
      }
    ],
    "features": [
      {
        "iconName": "Map",
        "title": "Interactive Map Search",
        "desc": "Explore hotels on an interactive map with price pins, instant price calendar, and neighbourhood info."
      },
      {
        "iconName": "Star",
        "title": "Verified Reviews & Photos",
        "desc": "Post-stay reviews with photo uploads, AI sentiment analysis, and response management for hotels."
      },
      {
        "iconName": "Award",
        "title": "Loyalty & Rewards Programme",
        "desc": "Points-per-stay, tier upgrades, and redemption for room upgrades, F&B credits, and free nights."
      },
      {
        "iconName": "Smartphone",
        "title": "Digital Key & Check-in",
        "desc": "NFC/QR-based mobile room key and contactless check-in — bypassing the front desk entirely."
      },
      {
        "iconName": "Bell",
        "title": "Concierge & Service Requests",
        "desc": "In-app room service orders, housekeeping requests, cab booking, and local experience curation."
      },
      {
        "iconName": "Globe",
        "title": "Multi-language & Currency",
        "desc": "50+ language localisation with 30+ currency display and auto-conversion for international travellers."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can you build both the guest app and hotel management system?",
        "a": "Yes — we build the full stack: guest iOS/Android app, property management web dashboard, housekeeping tablet app, and channel manager in one engagement."
      },
      {
        "q": "How do you handle OTA channel manager synchronisation?",
        "a": "We integrate with SiteMinder, Cloudbeds, and direct OTA APIs (Booking.com, Expedia) using two-way XML/REST sync with conflict resolution."
      },
      {
        "q": "Can the platform support boutique hotels and large hotel chains?",
        "a": "Yes — our multi-tenant architecture supports both single-property boutiques and enterprise chains with centralised control and property-level customisation."
      },
      {
        "q": "What is the typical hotel booking app development timeline?",
        "a": "A guest booking app with property portal takes 14–18 weeks. Full OTA marketplace with channel manager, loyalty, and analytics takes 24–36 weeks."
      }
    ]
  },
  {
    "slug": "iot-development",
    "name": "IoT Development",
    "tagline": "Connecting the physical and digital worlds — smart devices, real-time data, and autonomous control at scale.",
    "description": "The Internet of Things is enabling predictive maintenance, smart buildings, and automated industrial operations. We engineer end-to-end IoT systems from firmware and embedded software to cloud data pipelines and real-time dashboards.",
    "heroGradient": "from-[#001d3d] via-[#002f5c] to-[#050b14]",
    "accentFrom": "from-cyan-400",
    "accentTo": "to-indigo-500",
    "accentHex": "#06b6d4",
    "iconName": "Wifi",
    "heroHighlights": [
      "Device Management",
      "OTA Updates",
      "Edge Computing",
      "MQTT Messaging",
      "Digital Twins"
    ],
    "stats": [
      {
        "value": "1M+",
        "label": "Devices Connected"
      },
      {
        "value": "< 50ms",
        "label": "Data Latency"
      },
      {
        "value": "300+",
        "label": "IoT Projects"
      },
      {
        "value": "99.9%",
        "label": "Device Uptime"
      }
    ],
    "solutions": [
      {
        "iconName": "Cpu",
        "title": "Firmware & Embedded Dev",
        "desc": "C/C++ firmware for STM32, ESP32, and Arduino with RTOS, power optimisation, and OTA update support."
      },
      {
        "iconName": "Cloud",
        "title": "IoT Cloud Platform",
        "desc": "AWS IoT Core / Azure IoT Hub integration with device registry, shadow sync, and rule engines."
      },
      {
        "iconName": "Database",
        "title": "Time-Series Data Storage",
        "desc": "InfluxDB and TimescaleDB pipelines for high-frequency sensor data with retention policies."
      },
      {
        "iconName": "BarChart3",
        "title": "Real-time Monitoring Dashboard",
        "desc": "Grafana/custom dashboards with live sensor feeds, alert thresholds, and historical charting."
      },
      {
        "iconName": "Shield",
        "title": "Device Security",
        "desc": "Mutual TLS, certificate-based auth, encrypted OTA, and anomaly detection for device-level security."
      },
      {
        "iconName": "Bot",
        "title": "Predictive Maintenance AI",
        "desc": "ML models trained on sensor data to predict equipment failure 2–4 weeks before it occurs."
      }
    ],
    "features": [
      {
        "iconName": "Wifi",
        "title": "Multi-Protocol Support",
        "desc": "MQTT, CoAP, AMQP, HTTP, WebSocket, BLE, Zigbee, and Z-Wave support in a unified gateway."
      },
      {
        "iconName": "Bell",
        "title": "Real-time Alerting",
        "desc": "Configurable threshold alerts via push, SMS, email, and PagerDuty integration — sub-second response."
      },
      {
        "iconName": "Cpu",
        "title": "Edge Computing",
        "desc": "Deploy inference models on-device to process data locally, reducing cloud latency and bandwidth costs."
      },
      {
        "iconName": "Settings",
        "title": "Remote Device Management",
        "desc": "Over-the-air firmware updates, remote reboot, config push, and device health monitoring from the cloud."
      },
      {
        "iconName": "Database",
        "title": "Digital Twins",
        "desc": "Virtual device replicas with real-time state sync enabling simulation, testing, and predictive analytics."
      },
      {
        "iconName": "Globe",
        "title": "Geofence & Location Services",
        "desc": "GPS/BLE-based asset tracking with geofence triggers for industrial and logistics IoT deployments."
      }
    ],
    "techStack": [
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Do you develop the hardware as well as the software?",
        "a": "We specialise in the software stack — firmware, cloud platform, and dashboards. For hardware, we work with your existing devices or partner with trusted electronics design firms."
      },
      {
        "q": "How do you secure IoT devices against cyber attacks?",
        "a": "We implement device certificates, mutual TLS, signed firmware, network segmentation, anomaly detection, and regular security audits per OWASP IoT guidelines."
      },
      {
        "q": "Can your platform scale to millions of connected devices?",
        "a": "Yes — using AWS IoT Core with auto-scaling, Kafka for stream processing, and TimescaleDB with table partitioning, we've architected systems for 10M+ devices."
      },
      {
        "q": "What is the typical IoT project timeline?",
        "a": "A cloud-connected device dashboard MVP takes 10–14 weeks. Full industrial IoT platforms with edge AI, predictive maintenance, and mobile apps take 24–36 weeks."
      }
    ]
  },
  {
    "slug": "laundry-app-development",
    "name": "Laundry App Development",
    "tagline": "On-demand laundry & dry-cleaning platforms — schedule, track, and deliver with zero hassle.",
    "description": "Urban consumers demand convenience in every routine chore. Laundry apps digitise the entire pick-up-wash-deliver cycle with real-time order tracking, subscription packages, and route-optimised driver dispatch.",
    "heroGradient": "from-[#001f3d] via-[#003366] to-[#050b14]",
    "accentFrom": "from-sky-500",
    "accentTo": "to-blue-400",
    "accentHex": "#0ea5e9",
    "iconName": "Shirt",
    "heroHighlights": [
      "Pickup Scheduling",
      "Order Tracking",
      "Subscription Plans",
      "Driver Dispatch",
      "Garment Tagging"
    ],
    "stats": [
      {
        "value": "500K+",
        "label": "Orders Processed"
      },
      {
        "value": "4 hrs",
        "label": "Express Turnaround"
      },
      {
        "value": "98%",
        "label": "On-time Delivery"
      },
      {
        "value": "4.7★",
        "label": "Customer Rating"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Customer Booking App",
        "desc": "Schedule pickups, choose services (wash/dry-clean/iron), add special instructions, and track in real time."
      },
      {
        "iconName": "Truck",
        "title": "Driver Dispatch App",
        "desc": "Route-optimised pickup/delivery queues with QR scanning for garment handover and digital signatures."
      },
      {
        "iconName": "BarChart3",
        "title": "Laundry Operations Dashboard",
        "desc": "Order management, garment tracking by QR/RFID, staff assignment, and production-stage status."
      },
      {
        "iconName": "Tag",
        "title": "Subscription Packages",
        "desc": "Weekly/monthly plans with auto-scheduling, volume discounts, and loyalty points."
      },
      {
        "iconName": "CreditCard",
        "title": "Payment & Wallet",
        "desc": "Subscription billing, per-order payments, wallet top-up, and automated invoice generation."
      },
      {
        "iconName": "Bell",
        "title": "SMS / Push Notifications",
        "desc": "Order confirmation, pickup reminders, wash-complete, and out-for-delivery alerts."
      }
    ],
    "features": [
      {
        "iconName": "QrCode",
        "title": "Garment Tagging & Tracking",
        "desc": "Each garment gets a QR tag at pickup, enabling item-level tracking through wash, dry, fold, and delivery."
      },
      {
        "iconName": "Calendar",
        "title": "Slot-based Pickup Scheduling",
        "desc": "Customers book 1-hour pickup windows up to 7 days in advance with real-time slot capacity."
      },
      {
        "iconName": "Navigation",
        "title": "Live Driver Tracking",
        "desc": "Real-time driver location on map during pickup and delivery legs with ETA countdown."
      },
      {
        "iconName": "Star",
        "title": "Garment Condition Reports",
        "desc": "Pre-wash condition photos logged and shared with customer — full transparency on pre-existing damage."
      },
      {
        "iconName": "Globe",
        "title": "Multi-outlet Support",
        "desc": "Manage multiple laundry outlets, assign orders by zone, and consolidate analytics across locations."
      },
      {
        "iconName": "Shield",
        "title": "Loss & Damage Protection",
        "desc": "Digital proof-of-handover, itemised order manifests, and damage-claim workflows with photo evidence."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      },
      {
        "name": "Google Cloud",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can the app handle multiple service types like dry-cleaning, ironing, and alteration?",
        "a": "Yes — our platform supports unlimited service categories with individual pricing, turnaround times, and production workflows per service type."
      },
      {
        "q": "How do you integrate RFID or barcode-based garment tracking?",
        "a": "We integrate with standard RFID readers (Zebra, Honeywell) and barcode scanners via Bluetooth or USB, linking each scan event to the order lifecycle."
      },
      {
        "q": "Can the platform support a franchise laundry network?",
        "a": "Yes — we build multi-tenant architectures with franchise-level branding, independent operations, and centralised reporting for the franchisor."
      },
      {
        "q": "What is the typical development timeline?",
        "a": "A core 3-app laundry platform (customer, driver, admin) takes 12–16 weeks. Enterprise franchise platforms with RFID and advanced analytics take 20–28 weeks."
      }
    ]
  },
  {
    "slug": "live-streaming-app",
    "name": "Live Streaming App",
    "tagline": "Broadcast to millions in real time — ultra-low-latency streaming with monetisation built in.",
    "description": "Live streaming is reshaping entertainment, commerce, and education. Whether it is a gaming broadcast, a live shopping event, or a global conference, we build streaming platforms with sub-second latency, interactive tools, and creator monetisation.",
    "heroGradient": "from-[#2d0000] via-[#5c0000] to-[#050b14]",
    "accentFrom": "from-red-500",
    "accentTo": "to-rose-400",
    "accentHex": "#ef4444",
    "iconName": "Video",
    "heroHighlights": [
      "Ultra-low Latency",
      "Live Shopping",
      "Multi-host Streams",
      "Gift Economy",
      "VOD Archive"
    ],
    "stats": [
      {
        "value": "500K",
        "label": "Peak Concurrent Viewers"
      },
      {
        "value": "< 1 sec",
        "label": "Latency"
      },
      {
        "value": "99.99%",
        "label": "Stream Uptime"
      },
      {
        "value": "50+",
        "label": "Platforms Launched"
      }
    ],
    "solutions": [
      {
        "iconName": "Video",
        "title": "RTMP / WebRTC Ingest",
        "desc": "Accept streams from OBS, mobile cameras, and browser-based studios with adaptive bitrate encoding."
      },
      {
        "iconName": "Globe",
        "title": "Global CDN Delivery",
        "desc": "Cloudflare / AWS CloudFront CDN for 200+ PoPs delivering streams with <1s latency worldwide."
      },
      {
        "iconName": "Users",
        "title": "Interactive Viewer Tools",
        "desc": "Real-time chat, polls, reactions, Q&A, and screen sharing to engage audiences during streams."
      },
      {
        "iconName": "Gift",
        "title": "Monetisation Engine",
        "desc": "Virtual gifts, paid super-chats, subscription badges, pay-per-view, and tip jars for creators."
      },
      {
        "iconName": "BarChart3",
        "title": "Creator Analytics",
        "desc": "Concurrent viewers, engagement rate, revenue breakdown, geographic heatmaps, and replay analytics."
      },
      {
        "iconName": "Database",
        "title": "VOD & Clip Management",
        "desc": "Auto-archive all streams, clip editor, highlight reels, and searchable VOD library with transcripts."
      }
    ],
    "features": [
      {
        "iconName": "Play",
        "title": "Multi-quality Adaptive Streaming",
        "desc": "HLS/DASH with ABR ensures smooth playback on 3G or 4K screens without buffering."
      },
      {
        "iconName": "Users",
        "title": "Co-hosting & Guest Invites",
        "desc": "Multi-host live streams with up to 12 simultaneous video feeds in a grid or spotlight layout."
      },
      {
        "iconName": "Mic",
        "title": "Live Audio Rooms",
        "desc": "Clubhouse-style audio stages with raise-hand, speaker rotation, and recording support."
      },
      {
        "iconName": "Bell",
        "title": "Stream Scheduler & Reminders",
        "desc": "Future stream scheduling with calendar export and push notification reminders for followers."
      },
      {
        "iconName": "Shield",
        "title": "Content Moderation & DRM",
        "desc": "AI-powered NSFW detection, comment filtering, Widevine/FairPlay DRM, and geo-blocking."
      },
      {
        "iconName": "Smartphone",
        "title": "Mobile Broadcasting",
        "desc": "Native iOS/Android broadcaster with switchable cameras, filters, real-time stats, and landscape mode."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "What is the maximum number of concurrent viewers you can support?",
        "a": "With our CDN-based delivery architecture, we have supported 500K+ concurrent viewers per stream. Theoretical limits scale with CDN capacity — effectively unlimited."
      },
      {
        "q": "How do you achieve sub-second stream latency?",
        "a": "We use WebRTC for ultra-low latency (sub-500ms) for interactive streams and LL-HLS for broadcast-quality streams with 1–3 second latency at scale."
      },
      {
        "q": "Can you build a live commerce / live shopping platform?",
        "a": "Yes — we build live shopping features including product tag overlays, one-tap in-stream purchase, cart integration, and instant payment checkout without leaving the stream."
      },
      {
        "q": "What is the typical live streaming platform development timeline?",
        "a": "A core streaming app with chat and monetisation takes 14–18 weeks. Full platform with CDN infrastructure, creator tools, and mobile apps takes 24–32 weeks."
      }
    ]
  },
  {
    "slug": "logistic-app",
    "name": "Logistic App",
    "tagline": "End-to-end logistics digitisation — from order creation to last-mile proof of delivery.",
    "description": "Modern logistics demands real-time visibility across hundreds of shipments, automated dispatch, and seamless carrier integration. We build TMS platforms, driver apps, and shipper portals that bring supply-chain efficiency to the next level.",
    "heroGradient": "from-[#2d1600] via-[#4a2800] to-[#050b14]",
    "accentFrom": "from-orange-500",
    "accentTo": "to-yellow-400",
    "accentHex": "#f97316",
    "iconName": "Truck",
    "heroHighlights": [
      "Shipment Tracking",
      "Route Optimisation",
      "POD Capture",
      "Carrier Integration",
      "Fleet Analytics"
    ],
    "stats": [
      {
        "value": "30%",
        "label": "Cost Reduction"
      },
      {
        "value": "1M+",
        "label": "Shipments Tracked"
      },
      {
        "value": "25%",
        "label": "On-time Improvement"
      },
      {
        "value": "200+",
        "label": "Carriers Integrated"
      }
    ],
    "solutions": [
      {
        "iconName": "Map",
        "title": "Shipment Tracking Portal",
        "desc": "Web and mobile tracking for shippers with live ETA, exception alerts, and multi-carrier visibility."
      },
      {
        "iconName": "Truck",
        "title": "Driver Mobile App",
        "desc": "Turn-by-turn navigation, delivery manifests, POD capture with photo/signature, and in-app chat."
      },
      {
        "iconName": "Navigation",
        "title": "Route Optimisation Engine",
        "desc": "VRP solver for multi-stop routes minimising distance, fuel, and time across large fleets."
      },
      {
        "iconName": "BarChart3",
        "title": "Logistics Analytics Dashboard",
        "desc": "OTIF rates, dwell times, carrier performance, and cost-per-shipment analytics for operations teams."
      },
      {
        "iconName": "Globe",
        "title": "Carrier Integration Hub",
        "desc": "API connections to DTDC, Delhivery, FedEx, DHL, Bluedart, and Shiprocket in one platform."
      },
      {
        "iconName": "Bell",
        "title": "Exception Management",
        "desc": "Automated alerts for delays, failed deliveries, and customs holds with escalation workflows."
      }
    ],
    "features": [
      {
        "iconName": "Camera",
        "title": "Digital POD (Proof of Delivery)",
        "desc": "Driver captures recipient photo, digital signature, and geo-stamp at delivery point — legally valid."
      },
      {
        "iconName": "QrCode",
        "title": "Barcode / QR Shipment Scanning",
        "desc": "Scan shipments at each hub milestone to update status in real time for shipper and recipient."
      },
      {
        "iconName": "Navigation",
        "title": "Dynamic Re-routing",
        "desc": "Real-time route adjustment for traffic, road closures, and priority order insertions mid-route."
      },
      {
        "iconName": "Clock",
        "title": "Delivery Time Windows",
        "desc": "Customer-defined delivery windows with automated reschedule flows for missed deliveries."
      },
      {
        "iconName": "Package",
        "title": "Warehouse Management Integration",
        "desc": "Native WMS connectors for order pick-pack-ship workflows with inventory deduction triggers."
      },
      {
        "iconName": "Activity",
        "title": "Real-time Fleet Telematics",
        "desc": "Speed, fuel, idle time, and harsh events from vehicle OBD integrated into dispatch decisions."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can you integrate with our existing ERP (SAP/Oracle) for order data?",
        "a": "Yes — we build bidirectional connectors to SAP, Oracle, Microsoft Dynamics, and NetSuite for order creation, status updates, and invoice generation."
      },
      {
        "q": "How do you handle cross-border / international logistics compliance?",
        "a": "We integrate with customs clearance APIs, generate HS code suggestions, and connect with trade compliance databases for international shipment workflows."
      },
      {
        "q": "Can the platform manage both B2B and B2C shipments?",
        "a": "Yes — our platform supports separate workflows for pallet/LTL B2B shipments and parcel-level B2C last-mile delivery with different SLAs and tracking UX."
      },
      {
        "q": "What is the typical logistics app development timeline?",
        "a": "A core TMS with tracking, driver app, and shipper portal takes 14–18 weeks. Full enterprise logistics suite with WMS integration and AI takes 26–36 weeks."
      }
    ]
  },
  {
    "slug": "media-entertainment-app",
    "name": "Media & Entertainment App",
    "tagline": "Content platforms that captivate — streaming, social, and interactive entertainment for every screen.",
    "description": "Audiences now expect on-demand everything — personalised feeds, interactive stories, and cross-platform experiences. We build OTT platforms, music apps, and entertainment super-apps with the engagement mechanics to win and retain attention.",
    "heroGradient": "from-[#1a0030] via-[#35005e] to-[#050b14]",
    "accentFrom": "from-violet-500",
    "accentTo": "to-pink-400",
    "accentHex": "#a855f7",
    "iconName": "Tv",
    "heroHighlights": [
      "OTT Streaming",
      "AI Content Feed",
      "Interactive Stories",
      "Creator Tools",
      "Multi-screen Cast"
    ],
    "stats": [
      {
        "value": "50M+",
        "label": "Content Views/Month"
      },
      {
        "value": "4.8★",
        "label": "App Store Rating"
      },
      {
        "value": "75+",
        "label": "OTT Apps Delivered"
      },
      {
        "value": "180+",
        "label": "Content Formats"
      }
    ],
    "solutions": [
      {
        "iconName": "Play",
        "title": "OTT Video Streaming",
        "desc": "Adaptive bitrate HLS/DASH streaming with offline downloads, Chromecast, and AirPlay support."
      },
      {
        "iconName": "Bot",
        "title": "AI Content Recommendation",
        "desc": "Collaborative + content-based filtering for personalised home feed, similar content, and continue-watching."
      },
      {
        "iconName": "Users",
        "title": "Creator Studio & CMS",
        "desc": "Content upload portal with transcoding pipeline, metadata management, and monetisation controls."
      },
      {
        "iconName": "Gift",
        "title": "Monetisation Suite",
        "desc": "SVOD, TVOD, AVOD, and hybrid models with subscription management and ad-insertion."
      },
      {
        "iconName": "Globe",
        "title": "Multi-platform Delivery",
        "desc": "Single content pipeline delivering to iOS, Android, Smart TV, web, Fire TV, and Roku apps."
      },
      {
        "iconName": "Camera",
        "title": "Short-form & Reels",
        "desc": "TikTok-style short video editor with filters, music, text overlays, and auto-captioning."
      }
    ],
    "features": [
      {
        "iconName": "Play",
        "title": "Adaptive Video Quality",
        "desc": "Automatic 144p–4K quality switching based on network speed for uninterrupted viewing."
      },
      {
        "iconName": "Shield",
        "title": "DRM & Anti-piracy",
        "desc": "Widevine L1, FairPlay, and PlayReady DRM with watermarking and geographic content restrictions."
      },
      {
        "iconName": "Mic",
        "title": "Podcast & Audio Platform",
        "desc": "Chapter markers, variable speed playback, sleep timer, and RSS ingestion for podcast integration."
      },
      {
        "iconName": "MessageSquare",
        "title": "Social Watch Parties",
        "desc": "Synchronised co-watching with audio/video chat, reactions, and shared commentary feeds."
      },
      {
        "iconName": "Bell",
        "title": "Personalised Notifications",
        "desc": "AI-timed push notifications for new releases, reminders, and personalised recommendations."
      },
      {
        "iconName": "Award",
        "title": "Gamified Engagement",
        "desc": "Watch streaks, trivia after episodes, fan badges, and leaderboards to boost session depth."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How do you handle video transcoding for different resolutions and devices?",
        "a": "We use AWS Elastic Transcoder or MediaConvert to auto-generate multiple renditions (240p–4K) per upload with HLS packaging for adaptive bitrate delivery."
      },
      {
        "q": "Can you build an app for Samsung and LG Smart TVs?",
        "a": "Yes — we develop for Samsung Tizen, LG webOS, Android TV/Google TV, Apple TV (tvOS), Fire TV, and Roku in addition to iOS, Android, and web."
      },
      {
        "q": "How do you implement content recommendations for new users with no history?",
        "a": "New users see curated editorial picks and trending content. After 3–5 interactions, collaborative filtering kicks in with hybrid personalisation."
      },
      {
        "q": "What is the typical OTT platform development timeline?",
        "a": "A core OTT app with video player, catalogue, and subscriptions takes 16–20 weeks. Full platform with Smart TV, creator tools, and AI recommendation takes 28–40 weeks."
      }
    ]
  },
  {
    "slug": "news-app",
    "name": "News App",
    "tagline": "Personalised, real-time news experiences that keep readers informed and keep publishers monetised.",
    "description": "News consumption has shifted to mobile-first, personalised feeds. Publishers need platforms that deliver breaking news instantly, support multiple monetisation models, and build loyal readership through personalisation and push engagement.",
    "heroGradient": "from-[#0d1520] via-[#1a2d45] to-[#050b14]",
    "accentFrom": "from-slate-400",
    "accentTo": "to-blue-400",
    "accentHex": "#64748b",
    "iconName": "Newspaper",
    "heroHighlights": [
      "Personalised Feed",
      "Breaking Alerts",
      "Offline Reading",
      "Multi-format Content",
      "Paywall Engine"
    ],
    "stats": [
      {
        "value": "10M+",
        "label": "Daily Readers"
      },
      {
        "value": "< 1 sec",
        "label": "Article Load Time"
      },
      {
        "value": "60+",
        "label": "News Apps Launched"
      },
      {
        "value": "3x",
        "label": "Push CTR Vs Industry"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Mobile News App",
        "desc": "iOS and Android news apps with infinite scroll, swipe navigation, and offline article saving."
      },
      {
        "iconName": "Bot",
        "title": "AI Personalisation Engine",
        "desc": "Topic, source, and reading-time preferences drive a personalised feed ranked by engagement signals."
      },
      {
        "iconName": "Bell",
        "title": "Breaking News Push System",
        "desc": "Sub-second push delivery for breaking news with smart segmentation and A/B tested headlines."
      },
      {
        "iconName": "CreditCard",
        "title": "Paywall & Subscription Engine",
        "desc": "Metered, freemium, and hard paywall configurations with subscriber management and invoicing."
      },
      {
        "iconName": "Database",
        "title": "CMS & Editorial Dashboard",
        "desc": "Headless CMS for multi-format publishing (articles, videos, podcasts, live blogs) with scheduling."
      },
      {
        "iconName": "BarChart3",
        "title": "Audience Analytics",
        "desc": "Real-time readership dashboard with article-level engagement, scroll depth, and churn prediction."
      }
    ],
    "features": [
      {
        "iconName": "BookOpen",
        "title": "Save & Read Later",
        "desc": "One-tap article save with offline sync — users read saved articles on flights or in metros without data."
      },
      {
        "iconName": "Globe",
        "title": "Multi-language Support",
        "desc": "Auto-translation to 20+ languages with language-specific editorial curation and notifications."
      },
      {
        "iconName": "Radio",
        "title": "Text-to-Speech",
        "desc": "AI voice reads articles aloud with natural prosody — ideal for commuters and accessibility."
      },
      {
        "iconName": "Play",
        "title": "Short Video & Explainers",
        "desc": "Vertical video news cards and explainer animations embedded seamlessly in article feeds."
      },
      {
        "iconName": "Search",
        "title": "Smart Search & Discovery",
        "desc": "Semantic article search with autocomplete, trending topics, and related article suggestions."
      },
      {
        "iconName": "Shield",
        "title": "Fact-check & Source Trust",
        "desc": "Source credibility scores, fact-check labels, and misinformation detection badges on articles."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Next.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can you build a news aggregator that pulls from multiple publishers?",
        "a": "Yes — we integrate RSS feeds, news APIs (NewsAPI, GDELT), and scraping pipelines with deduplication, summarisation, and entity tagging."
      },
      {
        "q": "How do you implement a paywall without hurting SEO?",
        "a": "We use Google's Flexible Sampling guidelines with server-side rendering, structured data, and metered access to balance SEO and subscriber conversion."
      },
      {
        "q": "Can the app support live blog coverage during breaking events?",
        "a": "Yes — our live blog module supports timestamped updates, pinned posts, auto-refresh, and WebSocket-based push for real-time updates without page reload."
      },
      {
        "q": "What is the typical news app development timeline?",
        "a": "A core news app with personalisation and push notifications takes 12–16 weeks. Full platform with paywall, CMS, video, and analytics takes 22–30 weeks."
      }
    ]
  },
  {
    "slug": "on-demand-app",
    "name": "On-Demand App",
    "tagline": "Any service, anywhere, in minutes — scalable on-demand platforms for the experience economy.",
    "description": "On-demand economy apps have disrupted every service vertical from beauty to home repairs. We build scalable service marketplaces with real-time provider matching, booking management, and integrated payments that connect supply and demand instantly.",
    "heroGradient": "from-[#1a0040] via-[#300070] to-[#050b14]",
    "accentFrom": "from-violet-500",
    "accentTo": "to-purple-400",
    "accentHex": "#7c3aed",
    "iconName": "Zap",
    "heroHighlights": [
      "Instant Matching",
      "Provider Profiles",
      "Live Tracking",
      "In-app Payments",
      "Review System"
    ],
    "stats": [
      {
        "value": "3M+",
        "label": "Service Requests"
      },
      {
        "value": "< 8 min",
        "label": "Provider Match Time"
      },
      {
        "value": "120+",
        "label": "On-demand Apps Built"
      },
      {
        "value": "4.8★",
        "label": "User Satisfaction"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Customer App",
        "desc": "Service discovery, instant booking, provider selection, and live ETA with in-app communication."
      },
      {
        "iconName": "Users",
        "title": "Provider / Professional App",
        "desc": "Job queue management, availability toggle, earnings tracking, and profile management for service pros."
      },
      {
        "iconName": "BarChart3",
        "title": "Admin & Operations Dashboard",
        "desc": "Demand heatmaps, provider utilisation, SLA compliance, and revenue analytics for platform ops."
      },
      {
        "iconName": "Bot",
        "title": "Smart Matching Algorithm",
        "desc": "ML-based provider matching on proximity, rating, specialisation, and real-time availability."
      },
      {
        "iconName": "CreditCard",
        "title": "Escrow Payment System",
        "desc": "Payment held in escrow until service completion — with dispute resolution and refund workflows."
      },
      {
        "iconName": "Star",
        "title": "Quality & Safety Tools",
        "desc": "Background checks, licence verification, real-time monitoring, and SOS panic button for safety."
      }
    ],
    "features": [
      {
        "iconName": "Navigation",
        "title": "Real-time Provider Tracking",
        "desc": "Live GPS tracking from acceptance to arrival with animated map and accurate ETA."
      },
      {
        "iconName": "Calendar",
        "title": "Advance Booking & Scheduling",
        "desc": "Schedule services up to 30 days ahead with dynamic pricing based on demand and time slots."
      },
      {
        "iconName": "Award",
        "title": "Verified Provider Profiles",
        "desc": "ID, background, certification, and insurance verification displayed on public provider profiles."
      },
      {
        "iconName": "MessageSquare",
        "title": "In-app Chat & Calls",
        "desc": "Anonymous masked calls and chat between customers and providers — privacy-preserving."
      },
      {
        "iconName": "Tag",
        "title": "Dynamic Surge Pricing",
        "desc": "Demand-based surge multipliers with transparency display before booking confirmation."
      },
      {
        "iconName": "Globe",
        "title": "Multi-service Verticals",
        "desc": "Single platform supporting multiple service categories (home, beauty, health) with separate funnels."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "Firebase",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg"
      },
      {
        "name": "Google Cloud",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "What types of on-demand services have you built apps for?",
        "a": "We have built platforms for home cleaning, beauty/salon, plumbing, electrical, car wash, pet care, tutoring, fitness training, and legal/medical consultations."
      },
      {
        "q": "How do you handle provider onboarding and verification at scale?",
        "a": "We build automated onboarding flows with document upload, OCR extraction, third-party background check APIs (AuthBridge, IDfy), and admin approval queues."
      },
      {
        "q": "Can the platform handle seasonal demand spikes?",
        "a": "Yes — our Kubernetes-based infrastructure auto-scales horizontally, and the matching engine uses Redis-backed queues to handle 10x normal demand during peak periods."
      },
      {
        "q": "What is the typical on-demand app development timeline?",
        "a": "A 3-sided marketplace MVP (customer, provider, admin) takes 14–18 weeks. Enterprise platform with AI matching, surge pricing, and analytics takes 22–30 weeks."
      }
    ]
  },
  {
    "slug": "real-estate-marketplace",
    "name": "Real Estate Marketplace",
    "tagline": "Proptech platforms that bring transparency, speed, and intelligence to property buying, selling, and renting.",
    "description": "Real estate transactions are complex, opaque, and slow. Digital marketplaces with AI valuation, virtual tours, and e-signing streamline every stage — from search to close — reducing transaction time from months to weeks.",
    "heroGradient": "from-[#1f1200] via-[#3d2400] to-[#050b14]",
    "accentFrom": "from-amber-500",
    "accentTo": "to-yellow-400",
    "accentHex": "#f59e0b",
    "iconName": "Home",
    "heroHighlights": [
      "AI Valuation",
      "3D Virtual Tours",
      "EMI Calculator",
      "Agent CRM",
      "E-signing"
    ],
    "stats": [
      {
        "value": "₹5000Cr+",
        "label": "Properties Listed"
      },
      {
        "value": "2M+",
        "label": "Monthly Searches"
      },
      {
        "value": "60%",
        "label": "Faster Closings"
      },
      {
        "value": "80+",
        "label": "PropTech Apps Built"
      }
    ],
    "solutions": [
      {
        "iconName": "Search",
        "title": "Property Search & Discovery",
        "desc": "Map-based search with polygon draw, filters (BHK, price, amenities), and AI-ranked results."
      },
      {
        "iconName": "Bot",
        "title": "AI Property Valuation",
        "desc": "AVM engine using comparable sales, location signals, and market trends for instant price estimates."
      },
      {
        "iconName": "Users",
        "title": "Agent & Broker Portal",
        "desc": "Lead management, property listing tools, client communication, and deal pipeline for agents."
      },
      {
        "iconName": "Camera",
        "title": "3D Tour & Virtual Staging",
        "desc": "360 degree virtual tour integration (Matterport/custom) and AI-based virtual staging for empty units."
      },
      {
        "iconName": "Database",
        "title": "Property Management System",
        "desc": "Lease management, rent collection, maintenance requests, and tenant communication for landlords."
      },
      {
        "iconName": "CreditCard",
        "title": "Home Loan & EMI Tools",
        "desc": "Eligibility checker, lender comparison, document upload, and application status tracking."
      }
    ],
    "features": [
      {
        "iconName": "Map",
        "title": "Neighbourhood Intelligence",
        "desc": "School ratings, transit scores, walkability, crime index, and development plan overlays on property maps."
      },
      {
        "iconName": "Camera",
        "title": "Verified Photo & Video Listings",
        "desc": "Professional photo standards enforcement, video walkthroughs, and drone footage support."
      },
      {
        "iconName": "Bell",
        "title": "Saved Search Alerts",
        "desc": "Instant notifications when new properties matching saved criteria enter the market."
      },
      {
        "iconName": "Shield",
        "title": "Document Verification",
        "desc": "Title deed, RERA registration, and NOC verification integrated with legal document checks."
      },
      {
        "iconName": "CheckCircle2",
        "title": "E-signing & Digital Agreements",
        "desc": "Aadhaar-signed rent agreements and sale deeds — legally valid, executed in minutes."
      },
      {
        "iconName": "BarChart3",
        "title": "Market Trend Analytics",
        "desc": "Price trend charts, supply-demand indicators, and investment yield estimates by locality."
      }
    ],
    "techStack": [
      {
        "name": "Next.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can you build a platform like 99acres or MagicBricks?",
        "a": "Yes — we build full-stack property marketplaces with buyer/seller/agent user types, listing management, AI valuation, lead routing, and subscription plans."
      },
      {
        "q": "How do you implement RERA compliance in the platform?",
        "a": "We integrate RERA project registration verification, mandatory RERA number display, and compliance check APIs for states with available APIs."
      },
      {
        "q": "Can the platform support commercial real estate in addition to residential?",
        "a": "Yes — we build unified platforms with separate workflows for residential, commercial, industrial, and land listings with type-specific search filters and attributes."
      },
      {
        "q": "What is the typical real estate app development timeline?",
        "a": "A property search portal with agent listings takes 14–18 weeks. Full marketplace with AI valuation, virtual tours, loan tools, and CRM takes 26–36 weeks."
      }
    ]
  },
  {
    "slug": "saas-and-paas",
    "name": "SaaS & PaaS Solutions",
    "tagline": "Cloud-native platforms built for scale — multi-tenant SaaS and developer-ready PaaS delivered to market fast.",
    "description": "Building SaaS requires mastery of multi-tenancy, subscription billing, usage metering, and enterprise security. We design and build SaaS platforms from architecture to first enterprise customer — and PaaS products that developers love.",
    "heroGradient": "from-[#0d1f45] via-[#1a3570] to-[#050b14]",
    "accentFrom": "from-blue-500",
    "accentTo": "to-indigo-400",
    "accentHex": "#3b82f6",
    "iconName": "Cloud",
    "heroHighlights": [
      "Multi-tenancy",
      "Usage Metering",
      "White-labelling",
      "SSO / SAML",
      "API-first Design"
    ],
    "stats": [
      {
        "value": "100+",
        "label": "SaaS Products Built"
      },
      {
        "value": "99.99%",
        "label": "Uptime SLA"
      },
      {
        "value": "10M+",
        "label": "API Calls/Day"
      },
      {
        "value": "60%",
        "label": "Faster Time-to-Market"
      }
    ],
    "solutions": [
      {
        "iconName": "Layers",
        "title": "Multi-tenant Architecture",
        "desc": "Silo, pool, or hybrid tenancy models with data isolation, per-tenant config, and shared infrastructure."
      },
      {
        "iconName": "CreditCard",
        "title": "Subscription Billing Engine",
        "desc": "Stripe/Razorpay integration with usage metering, proration, dunning, and invoice management."
      },
      {
        "iconName": "Globe",
        "title": "White-label & Custom Domains",
        "desc": "Branded subdomain routing, custom email domains, and per-tenant theming with CSS variable overrides."
      },
      {
        "iconName": "Key",
        "title": "Enterprise SSO & RBAC",
        "desc": "SAML 2.0, OAuth 2.0, OIDC SSO integration with team-based RBAC and audit logs."
      },
      {
        "iconName": "Code2",
        "title": "Developer API & SDK",
        "desc": "RESTful and GraphQL APIs with OpenAPI docs, SDK generation, and sandbox test environments."
      },
      {
        "iconName": "BarChart3",
        "title": "SaaS Metrics Dashboard",
        "desc": "MRR, ARR, churn, LTV, CAC, and cohort retention analytics for product and finance teams."
      }
    ],
    "features": [
      {
        "iconName": "Shield",
        "title": "SOC 2 / ISO 27001 Readiness",
        "desc": "Security architecture, audit logging, and documentation aligned with SOC 2 Type II requirements."
      },
      {
        "iconName": "Activity",
        "title": "Uptime & Health Monitoring",
        "desc": "Prometheus + Grafana monitoring with PagerDuty alerting, status page, and SLA reporting."
      },
      {
        "iconName": "Database",
        "title": "Data Export & Portability",
        "desc": "One-click full data export in JSON/CSV formats for GDPR compliance and customer trust."
      },
      {
        "iconName": "Settings",
        "title": "Feature Flags & Rollouts",
        "desc": "Progressive feature rollouts, A/B testing, and tenant-specific feature toggles without deploys."
      },
      {
        "iconName": "Globe",
        "title": "Multi-region Deployment",
        "desc": "Data residency controls with EU, US, and APAC region options for enterprise compliance."
      },
      {
        "iconName": "Rocket",
        "title": "CI/CD & Developer Tooling",
        "desc": "GitHub Actions pipelines, preview environments, one-click rollbacks, and automated testing gates."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "Which multi-tenancy model do you recommend — silo or pool?",
        "a": "It depends on your compliance needs and pricing tier. We typically start with schema-per-tenant (pool) for scale/cost and add silo tenancy for enterprise customers requiring data isolation."
      },
      {
        "q": "How do you handle subscription metering and overage billing?",
        "a": "We use Stripe Metered Billing or custom meter tables with real-time usage tracking, threshold alerts, and automated overage invoicing at cycle end."
      },
      {
        "q": "Do you help with SOC 2 compliance?",
        "a": "Yes — we design the security architecture and provide the technical controls documentation needed for SOC 2 Type I. We partner with compliance specialists for the full audit process."
      },
      {
        "q": "What is the typical SaaS platform development timeline?",
        "a": "A core SaaS product (auth, billing, core feature, admin) takes 16–22 weeks. Production-ready with enterprise SSO, API, and compliance tooling takes 28–40 weeks."
      }
    ]
  },
  {
    "slug": "security-management-app",
    "name": "Security Management App",
    "tagline": "Unified physical and cyber security operations — incidents, patrols, access, and threats in one command centre.",
    "description": "Security operations teams manage complex, multi-site environments where response time is critical. We build security management platforms that centralise incident reporting, patrol tracking, access control, and CCTV monitoring for enterprise and government clients.",
    "heroGradient": "from-[#200000] via-[#400000] to-[#050b14]",
    "accentFrom": "from-red-500",
    "accentTo": "to-rose-400",
    "accentHex": "#ef4444",
    "iconName": "ShieldCheck",
    "heroHighlights": [
      "Incident Reporting",
      "Guard Patrol Tracking",
      "Access Control",
      "Visitor Management",
      "CCTV Integration"
    ],
    "stats": [
      {
        "value": "90%",
        "label": "Faster Incident Response"
      },
      {
        "value": "500+",
        "label": "Sites Secured"
      },
      {
        "value": "24/7",
        "label": "Monitoring Support"
      },
      {
        "value": "ISO 27001",
        "label": "Architecture"
      }
    ],
    "solutions": [
      {
        "iconName": "Shield",
        "title": "Incident Management System",
        "desc": "Real-time incident logging with photo, GPS, and escalation workflows for security teams."
      },
      {
        "iconName": "Navigation",
        "title": "Guard Patrol Tracking",
        "desc": "NFC/QR checkpoint scanning with patrol route compliance monitoring and tour reports."
      },
      {
        "iconName": "Key",
        "title": "Access Control Integration",
        "desc": "Integration with HID, Lenel, and SALTO access control systems for unified entry management."
      },
      {
        "iconName": "Camera",
        "title": "CCTV & AI Surveillance",
        "desc": "Camera feed integration with AI object detection, face recognition, and anomaly alerting."
      },
      {
        "iconName": "Users",
        "title": "Visitor Management System",
        "desc": "Pre-registration, ID scanning, badge printing, host notifications, and blacklist checking."
      },
      {
        "iconName": "Bell",
        "title": "Alarm & Threat Intelligence",
        "desc": "Integration with alarm systems with ML-based false-alarm filtering and priority dispatch."
      }
    ],
    "features": [
      {
        "iconName": "MapPin",
        "title": "Multi-site Command Centre",
        "desc": "Unified map-based view of all sites, active incidents, guard positions, and alerts in real time."
      },
      {
        "iconName": "Clock",
        "title": "Shift Scheduling & Attendance",
        "desc": "Guard roster management, geofenced clock-in, overtime tracking, and payroll export."
      },
      {
        "iconName": "Activity",
        "title": "SOS & Panic Button",
        "desc": "Guard SOS sends instant GPS location, photo, and alert to supervisor and control room simultaneously."
      },
      {
        "iconName": "Database",
        "title": "Audit Trail & Compliance Reports",
        "desc": "Tamper-proof incident logs, patrol completion reports, and compliance summaries for auditors."
      },
      {
        "iconName": "Fingerprint",
        "title": "Biometric Access Logs",
        "desc": "Fingerprint and face recognition entries logged with timestamp and zone for full access audit."
      },
      {
        "iconName": "Eye",
        "title": "Video Evidence Management",
        "desc": "Clip extraction and tagging of CCTV footage linked to incident reports for evidence chains."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can the app integrate with our existing access control hardware?",
        "a": "Yes — we integrate with major access control brands including HID, Lenel, SALTO, Suprema, and ZKTeco via their published APIs and SDKs."
      },
      {
        "q": "How does the AI-based CCTV surveillance work?",
        "a": "We integrate with camera feeds using OpenCV / DeepStream for real-time object detection, person counting, loitering detection, and crowd density alerts."
      },
      {
        "q": "Can the system manage multi-location security for a nationwide enterprise?",
        "a": "Yes — our multi-tenant architecture supports hierarchical access (national to regional to site) with role-based dashboards and consolidated reporting."
      },
      {
        "q": "What is the typical security management app development timeline?",
        "a": "A core incident + patrol system takes 12–16 weeks. Full platform with CCTV integration, access control, visitor management, and analytics takes 22–30 weeks."
      }
    ]
  },
  {
    "slug": "social-media-app",
    "name": "Social Media App",
    "tagline": "Next-generation social platforms with AI-driven feeds, creator tools, and viral engagement mechanics.",
    "description": "Social media success depends on engagement loops, content discovery, and creator monetisation. We build social platforms with algorithmic feeds, AR features, and community tools that drive daily active usage and organic growth.",
    "heroGradient": "from-[#2d0030] via-[#56005a] to-[#050b14]",
    "accentFrom": "from-pink-500",
    "accentTo": "to-purple-400",
    "accentHex": "#ec4899",
    "iconName": "MessageCircle",
    "heroHighlights": [
      "Algorithmic Feed",
      "Stories & Reels",
      "Creator Monetisation",
      "Live Streaming",
      "AR Filters"
    ],
    "stats": [
      {
        "value": "50M+",
        "label": "Monthly Active Users"
      },
      {
        "value": "25 min",
        "label": "Avg Session Time"
      },
      {
        "value": "30+",
        "label": "Social Apps Launched"
      },
      {
        "value": "4.7★",
        "label": "App Store Rating"
      }
    ],
    "solutions": [
      {
        "iconName": "Bot",
        "title": "AI Recommendation Engine",
        "desc": "Multi-signal feed ranking (engagement, recency, relationship, diversity) for addictive content discovery."
      },
      {
        "iconName": "Video",
        "title": "Short Video & Reels",
        "desc": "TikTok-style vertical video with editor, filters, duets, and stitch features built on HLS streaming."
      },
      {
        "iconName": "Users",
        "title": "Communities & Groups",
        "desc": "Interest-based groups with moderation tools, pinned posts, events, and membership tiers."
      },
      {
        "iconName": "Gift",
        "title": "Creator Monetisation Tools",
        "desc": "Subscriptions, virtual gifts, branded content deals, affiliate links, and tip jars for creators."
      },
      {
        "iconName": "Camera",
        "title": "AR Filters & Effects",
        "desc": "SparkAR/custom AR filters with face tracking, background effects, and branded filter creation."
      },
      {
        "iconName": "Shield",
        "title": "Trust & Safety Platform",
        "desc": "AI content moderation, hash-matching for illegal content, and community-based reporting tools."
      }
    ],
    "features": [
      {
        "iconName": "Share2",
        "title": "Cross-platform Sharing",
        "desc": "Share posts to WhatsApp, Instagram, Twitter, and embed links with OG preview card generation."
      },
      {
        "iconName": "Bell",
        "title": "Smart Notification Engine",
        "desc": "AI-optimised notification timing and content to maximise re-engagement without notification fatigue."
      },
      {
        "iconName": "Star",
        "title": "Trending & Discovery",
        "desc": "Trending topics, hashtag pages, and explore tab with geo-based local content surfacing."
      },
      {
        "iconName": "MessageSquare",
        "title": "End-to-end Encrypted DMs",
        "desc": "Private messaging with disappearing messages, voice notes, reactions, and group threads."
      },
      {
        "iconName": "Activity",
        "title": "Creator Analytics Studio",
        "desc": "Reach, impressions, follower demographics, content performance, and revenue analytics for creators."
      },
      {
        "iconName": "Globe",
        "title": "Multi-language Content",
        "desc": "Auto-translation of captions, AI alt-text generation, and region-specific content policies."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      }
    ],
    "faqs": [
      {
        "q": "How do you build an algorithmic content feed from scratch?",
        "a": "We implement a multi-stage ranking pipeline: candidate generation (embedding-based retrieval), scoring (engagement prediction model), and diversity injection — similar to TikTok's FYP architecture."
      },
      {
        "q": "How do you handle content moderation at scale?",
        "a": "We use a multi-layer approach: automated AI classifiers (images, text, video), hash-matching (PhotoDNA), user reporting queues, and human review for edge cases."
      },
      {
        "q": "Can the platform support 10M+ users on launch day?",
        "a": "With proper infrastructure design — Cassandra for social graph, Redis for feed cache, CDN for media, and Kubernetes auto-scaling — yes, we have handled 10M+ user launches."
      },
      {
        "q": "What is the typical social app development timeline?",
        "a": "A core social feed + video MVP takes 18–24 weeks. Full platform with AI feed, live streaming, creator tools, and moderation takes 32–44 weeks."
      }
    ]
  },
  {
    "slug": "taxi-booking-app",
    "name": "Taxi Booking App",
    "tagline": "Ride-hailing platforms built for reliability, driver earnings, and passenger delight — from MVP to IPO scale.",
    "description": "The ride-hailing market demands sub-60-second driver matching, transparent pricing, and a safety-first experience. We build complete three-sided mobility platforms — passengers, drivers, and operations — engineered for hyper-local density and global scale.",
    "heroGradient": "from-[#1f1a00] via-[#3d3400] to-[#050b14]",
    "accentFrom": "from-yellow-500",
    "accentTo": "to-amber-400",
    "accentHex": "#eab308",
    "iconName": "Car",
    "heroHighlights": [
      "30-sec Matching",
      "Surge Pricing",
      "Driver Earnings",
      "SOS Safety",
      "Corporate Rides"
    ],
    "stats": [
      {
        "value": "10M+",
        "label": "Rides Completed"
      },
      {
        "value": "< 45 sec",
        "label": "Avg Pickup Wait"
      },
      {
        "value": "50+",
        "label": "Mobility Apps Built"
      },
      {
        "value": "99.9%",
        "label": "Match Success Rate"
      }
    ],
    "solutions": [
      {
        "iconName": "Smartphone",
        "title": "Passenger App",
        "desc": "Ride booking with saved locations, vehicle type selection, live tracking, and split-fare support."
      },
      {
        "iconName": "Car",
        "title": "Driver App",
        "desc": "Job acceptance, turn-by-turn navigation, earnings dashboard, and in-app support for drivers."
      },
      {
        "iconName": "BarChart3",
        "title": "Operations Dashboard",
        "desc": "Live fleet map, demand heatmaps, driver performance, revenue analytics, and fleet management."
      },
      {
        "iconName": "Bot",
        "title": "Real-time Dispatch Engine",
        "desc": "Sub-second driver matching using spatial indexing (geohash/H3) and ML acceptance prediction."
      },
      {
        "iconName": "CreditCard",
        "title": "Payments & Payouts",
        "desc": "Multi-method passenger payments with automated daily/weekly driver payouts and TDS deduction."
      },
      {
        "iconName": "Globe",
        "title": "Corporate & B2B Platform",
        "desc": "Business accounts with employee ride authorisation, central billing, and spend analytics."
      }
    ],
    "features": [
      {
        "iconName": "Navigation",
        "title": "Live Ride Tracking",
        "desc": "Real-time driver location with animated map, ETA updates every 5 seconds, and route deviation alerts."
      },
      {
        "iconName": "Tag",
        "title": "Dynamic Surge Pricing",
        "desc": "Demand-aware surge multipliers with pre-ride fare estimate transparency and price lock option."
      },
      {
        "iconName": "Shield",
        "title": "Safety & SOS System",
        "desc": "In-ride SOS with 3-tap activation sending location to emergency contacts and a safety operations team."
      },
      {
        "iconName": "Star",
        "title": "Two-way Rating System",
        "desc": "Post-ride ratings for both driver and passenger maintaining quality standards on both sides."
      },
      {
        "iconName": "Wallet",
        "title": "Wallet & Promo Engine",
        "desc": "Ride credits, first-ride discounts, referral bonuses, and cashback wallets with balance management."
      },
      {
        "iconName": "Activity",
        "title": "Driver Earnings Analytics",
        "desc": "Daily/weekly earnings breakdown, trip count, acceptance rate, online hours, and incentive tracking."
      }
    ],
    "techStack": [
      {
        "name": "React Native",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Node.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
      },
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "Google Cloud",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How does the driver matching algorithm work?",
        "a": "We use geohash-based spatial indexing (similar to Uber's H3 library) to find nearby available drivers, then apply ML scoring for acceptance probability and ETA accuracy."
      },
      {
        "q": "Can the platform support multiple ride categories (auto, bike, cab, SUV)?",
        "a": "Yes — we support unlimited vehicle categories with separate pricing matrices, vehicle validation rules, and category-specific UI flows for both passengers and drivers."
      },
      {
        "q": "How do you implement surge pricing?",
        "a": "Surge is calculated in real-time by comparing demand (open requests) to supply (available drivers) per geohash cell, with configurable multipliers and a pre-booking fare lock option."
      },
      {
        "q": "What is the typical ride-hailing app development timeline?",
        "a": "A 3-app ride-hailing MVP (passenger, driver, admin) takes 18–24 weeks (₹25–45L). Enterprise platform with corporate accounts, AI dispatch, and analytics takes 32–44 weeks."
      }
    ]
  }
];

export const getIndustryBySlug = (slug: string): IndustryData | undefined =>
  industriesData.find((i) => i.slug === slug);
