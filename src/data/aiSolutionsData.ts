const DEVICONS = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export interface AIServiceDeliverable { iconName: string; title: string; desc: string; }
export interface AIServiceFeature { iconName: string; title: string; desc: string; }
export interface AIServiceUseCase { iconName: string; industry: string; desc: string; }
export interface AIServiceProcess { step: string; iconName: string; title: string; desc: string; }
export interface AIServiceTech { name: string; logo: string; }
export interface AIServiceFAQ { q: string; a: string; }

export interface AIServiceData {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  heroGradient: string;
  accentFrom: string;
  accentTo: string;
  accentHex: string;
  iconName: string;
  heroHighlights: string[];
  deliverables: AIServiceDeliverable[];
  features: AIServiceFeature[];
  useCases: AIServiceUseCase[];
  process: AIServiceProcess[];
  techStack: AIServiceTech[];
  faqs: AIServiceFAQ[];
}

export const aiSolutionsData: AIServiceData[] = [
  {
    "slug": "ai-development-services",
    "name": "AI Development Services",
    "category": "AI & Data Services",
    "tagline": "End-to-end artificial intelligence solutions that automate decisions, uncover insights, and supercharge your product — built for production, not just demos.",
    "description": "From intelligent recommendation engines to computer vision pipelines and predictive analytics, we engineer bespoke AI systems that integrate seamlessly with your existing infrastructure. Our models are trained on your data, optimised for your KPIs, and monitored in production 24/7.",
    "heroGradient": "from-[#0d0a2e] via-[#1a0a4e] to-[#05080f]",
    "accentFrom": "from-violet-500",
    "accentTo": "to-purple-600",
    "accentHex": "#7c3aed",
    "iconName": "Brain",
    "heroHighlights": [
      "Custom ML Models",
      "Computer Vision",
      "Predictive Analytics",
      "NLP Pipelines",
      "AI Integration"
    ],
    "deliverables": [
      {
        "iconName": "Cpu",
        "title": "Custom ML Models",
        "desc": "Supervised, unsupervised, and reinforcement learning models trained and tuned on your proprietary data."
      },
      {
        "iconName": "Eye",
        "title": "Computer Vision",
        "desc": "Object detection, OCR, image classification, and real-time video analytics for industry use cases."
      },
      {
        "iconName": "BarChart3",
        "title": "Predictive Analytics",
        "desc": "Forecast demand, churn, revenue, and risk with statistical models backed by your historical data."
      },
      {
        "iconName": "MessageSquare",
        "title": "NLP & Text AI",
        "desc": "Sentiment analysis, entity extraction, summarisation, and classification at scale."
      },
      {
        "iconName": "Zap",
        "title": "Real-time Inference",
        "desc": "Low-latency model serving APIs with auto-scaling, A/B testing, and monitoring built in."
      },
      {
        "iconName": "CloudLightning",
        "title": "MLOps & Deployment",
        "desc": "CI/CD pipelines for models — versioning, drift detection, retraining triggers, and explainability."
      }
    ],
    "features": [
      {
        "iconName": "Shield",
        "title": "Explainable AI (XAI)",
        "desc": "Transparent model decisions with SHAP, LIME, and audit trails for regulated industries."
      },
      {
        "iconName": "RefreshCw",
        "title": "Auto-Retraining Loops",
        "desc": "Models that self-improve as new data arrives — no manual retraining needed."
      },
      {
        "iconName": "Globe",
        "title": "REST & GraphQL APIs",
        "desc": "Production-grade endpoints with auth, rate-limiting, versioning, and OpenAPI docs."
      },
      {
        "iconName": "Database",
        "title": "Multi-Modal Support",
        "desc": "Handle text, image, audio, tabular, and time-series data in one unified pipeline."
      },
      {
        "iconName": "Lock",
        "title": "Privacy-Preserving AI",
        "desc": "Federated learning and differential privacy for GDPR/HIPAA-sensitive deployments."
      },
      {
        "iconName": "TrendingUp",
        "title": "Business KPI Alignment",
        "desc": "Every model optimised for a measurable business outcome — not just academic accuracy scores."
      }
    ],
    "useCases": [
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "Disease prediction, medical imaging analysis, and patient risk stratification."
      },
      {
        "iconName": "CreditCard",
        "industry": "Fintech",
        "desc": "Fraud detection, credit scoring, algorithmic trading, and AML compliance."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce",
        "desc": "Personalised recommendations, dynamic pricing, and demand forecasting."
      },
      {
        "iconName": "Factory",
        "industry": "Manufacturing",
        "desc": "Predictive maintenance, quality control vision, and supply chain optimisation."
      },
      {
        "iconName": "Truck",
        "industry": "Logistics",
        "desc": "Route optimisation, ETA prediction, and automated anomaly detection."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Discovery & Data Audit",
        "desc": "Map use cases, audit available data sources, and define success metrics."
      },
      {
        "step": "02",
        "iconName": "BarChart3",
        "title": "Data Preparation",
        "desc": "Clean, label, feature-engineer, and split datasets for optimal model performance."
      },
      {
        "step": "03",
        "iconName": "Cpu",
        "title": "Model Development",
        "desc": "Train, evaluate, and iterate across multiple architectures using rigorous experimentation."
      },
      {
        "step": "04",
        "iconName": "ShieldCheck",
        "title": "Validation & QA",
        "desc": "Stress-test for accuracy, bias, fairness, and edge-case robustness before deployment."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Deploy & Monitor",
        "desc": "Ship to production with CI/CD pipelines, dashboards, and automated drift alerts."
      }
    ],
    "techStack": [
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "TensorFlow",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg"
      },
      {
        "name": "PyTorch",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "Kubernetes",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "FastAPI",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Do we need a large dataset to get started?",
        "a": "Not necessarily. We begin with a data audit and can leverage transfer learning, synthetic data, or publicly available datasets to bootstrap models when proprietary data is limited."
      },
      {
        "q": "How long does a typical AI project take?",
        "a": "A focused MVP with one AI capability usually takes 6–12 weeks. More complex multi-model platforms are scoped per project after discovery."
      },
      {
        "q": "Can the models integrate with our existing software?",
        "a": "Yes — we expose all models as REST or GraphQL APIs that integrate with any stack. We also handle SDK wrappers, webhooks, and direct database triggers."
      },
      {
        "q": "What happens when the model's accuracy degrades over time?",
        "a": "We set up automated drift detection and retraining pipelines. You receive alerts and our team handles scheduled model refreshes as part of ongoing support."
      }
    ]
  },
  {
    "slug": "chatbot-development",
    "name": "Chatbot Development",
    "category": "AI & Data Services",
    "tagline": "Intelligent conversational agents that handle support, capture leads, book appointments, and delight users — 24/7, across every channel.",
    "description": "We build NLP-powered chatbots that understand intent, maintain context across multi-turn conversations, and escalate seamlessly to human agents. From simple FAQ bots to sophisticated AI assistants with memory and tool use, every bot we ship is trained on your business data.",
    "heroGradient": "from-[#0a1628] via-[#0d2045] to-[#05080f]",
    "accentFrom": "from-blue-500",
    "accentTo": "to-cyan-500",
    "accentHex": "#3b82f6",
    "iconName": "Bot",
    "heroHighlights": [
      "NLP Intent Engine",
      "Multi-Platform",
      "Lead Capture",
      "Live Handoff",
      "Analytics Dashboard"
    ],
    "deliverables": [
      {
        "iconName": "Brain",
        "title": "NLP Intent Engine",
        "desc": "Fine-tuned language models that understand variations in phrasing, slang, and domain-specific terminology."
      },
      {
        "iconName": "Globe",
        "title": "Omnichannel Deployment",
        "desc": "Ship to web widget, WhatsApp, Telegram, Slack, Facebook Messenger, and mobile apps from one codebase."
      },
      {
        "iconName": "Users",
        "title": "Lead Capture Flows",
        "desc": "Intelligent qualification sequences that collect contact details and route hot leads to your CRM automatically."
      },
      {
        "iconName": "PhoneCall",
        "title": "Live Agent Handoff",
        "desc": "Seamless escalation to human agents with full conversation context preserved — no repeat questions."
      },
      {
        "iconName": "BarChart3",
        "title": "Analytics Dashboard",
        "desc": "Track resolution rate, CSAT, drop-off points, and top intents in real time to continuously improve."
      },
      {
        "iconName": "Zap",
        "title": "API & CRM Integration",
        "desc": "Pull order status, booking data, or account info live from your backend during conversations."
      }
    ],
    "features": [
      {
        "iconName": "MessageSquare",
        "title": "Multi-Turn Memory",
        "desc": "Maintains context across the entire conversation thread — no need to repeat yourself."
      },
      {
        "iconName": "Globe",
        "title": "Multilingual Support",
        "desc": "Serve users in 50+ languages with automatic language detection and localised responses."
      },
      {
        "iconName": "Shield",
        "title": "Sensitive Data Handling",
        "desc": "PII masking, GDPR compliance, and encrypted conversation storage for regulated industries."
      },
      {
        "iconName": "RefreshCw",
        "title": "Continuous Learning",
        "desc": "Feedback loops that flag mishandled intents for retraining — the bot gets smarter every week."
      },
      {
        "iconName": "Cpu",
        "title": "Voice Channel Support",
        "desc": "Extend to IVR and voice assistants with speech-to-text and text-to-speech integration."
      },
      {
        "iconName": "Settings",
        "title": "No-Code Flow Builder",
        "desc": "Business teams can edit FAQ content, decision trees, and quick-reply menus without dev involvement."
      }
    ],
    "useCases": [
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce",
        "desc": "Order tracking, returns, product recommendations, and cart recovery via chat."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "Appointment booking, symptom triage, medication reminders, and insurance queries."
      },
      {
        "iconName": "Landmark",
        "industry": "Banking",
        "desc": "Balance enquiry, fraud alerts, loan pre-qualification, and branch locators."
      },
      {
        "iconName": "GraduationCap",
        "industry": "Education",
        "desc": "Admissions FAQ, course guidance, timetable queries, and student onboarding."
      },
      {
        "iconName": "Hotel",
        "industry": "Hospitality",
        "desc": "Room booking, concierge services, local recommendations, and checkout assistance."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Intent Mapping",
        "desc": "Workshop to capture all user intents, entities, and conversation flows specific to your business."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Dialogue Design",
        "desc": "Architect conversation trees, fallback handling, and escalation triggers in a visual flow tool."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "NLP Training",
        "desc": "Build and fine-tune the intent classification and entity extraction models on your domain data."
      },
      {
        "step": "04",
        "iconName": "ShieldCheck",
        "title": "Testing & Tuning",
        "desc": "Adversarial testing across thousands of real user messages to hit >95% intent accuracy."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Launch & Iterate",
        "desc": "Deploy to all channels simultaneously, monitor live metrics, and push weekly improvements."
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
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Which messaging platforms do you support?",
        "a": "We support web widget, WhatsApp Business API, Facebook Messenger, Telegram, Slack, MS Teams, and mobile SDK for iOS/Android out of the box."
      },
      {
        "q": "Can the chatbot handle complex multi-step processes?",
        "a": "Yes. We build stateful conversation managers that can handle multi-step bookings, form fills, and transactional flows with full error recovery."
      },
      {
        "q": "How do you handle questions the bot doesn't understand?",
        "a": "We implement graceful fallback flows that collect the unanswered question, offer alternatives, and optionally escalate to a live agent — ensuring no user is left stuck."
      },
      {
        "q": "Will the bot improve over time?",
        "a": "Absolutely. We set up weekly review cycles where mishandled conversations are flagged, reviewed, and used to retrain the NLP model — continuous improvement is baked in."
      }
    ]
  },
  {
    "slug": "data-engineering-service",
    "name": "Data Engineering Service",
    "category": "AI & Data Services",
    "tagline": "Robust data pipelines, warehouses, and lakehouses that turn raw, siloed data into a clean, governed, analytics-ready asset your entire organisation can trust.",
    "description": "We architect and build the data infrastructure that powers your BI, ML, and AI initiatives. From real-time streaming pipelines to batch ETL orchestration and data quality frameworks, we make sure your data is always fresh, accurate, and accessible — at any scale.",
    "heroGradient": "from-[#051a14] via-[#062d20] to-[#05080f]",
    "accentFrom": "from-emerald-500",
    "accentTo": "to-teal-500",
    "accentHex": "#10b981",
    "iconName": "Database",
    "heroHighlights": [
      "ETL / ELT Pipelines",
      "Data Warehouse",
      "Real-time Streaming",
      "Data Quality",
      "BI Dashboards"
    ],
    "deliverables": [
      {
        "iconName": "ArrowRight",
        "title": "ETL / ELT Pipelines",
        "desc": "Automated ingestion from 100+ source systems — APIs, databases, files, streams — into your warehouse."
      },
      {
        "iconName": "Database",
        "title": "Data Warehouse / Lakehouse",
        "desc": "Scalable Snowflake, BigQuery, Redshift, or Databricks environments with optimal schema design."
      },
      {
        "iconName": "Zap",
        "title": "Real-time Streaming",
        "desc": "Apache Kafka / Kinesis pipelines for sub-second event processing and live analytics."
      },
      {
        "iconName": "ShieldCheck",
        "title": "Data Quality Framework",
        "desc": "Automated validation, anomaly detection, lineage tracking, and SLA alerting on every pipeline."
      },
      {
        "iconName": "BarChart3",
        "title": "BI & Dashboard Delivery",
        "desc": "Tableau, Power BI, or Metabase dashboards connected to governed, well-documented data models."
      },
      {
        "iconName": "Lock",
        "title": "Data Governance & Security",
        "desc": "Role-based access, PII masking, audit logs, and compliance controls for GDPR and SOC 2."
      }
    ],
    "features": [
      {
        "iconName": "RefreshCw",
        "title": "Incremental Loads",
        "desc": "Change data capture (CDC) ensures only new/updated records are processed — slashing compute costs."
      },
      {
        "iconName": "Clock",
        "title": "Pipeline Monitoring",
        "desc": "Real-time observability with Airflow, Prefect, or dbt alerts — SLA breaches trigger immediate notifications."
      },
      {
        "iconName": "Layers",
        "title": "Medallion Architecture",
        "desc": "Bronze/Silver/Gold data layers that separate raw ingestion from clean, business-ready datasets."
      },
      {
        "iconName": "Globe",
        "title": "Multi-Source Integration",
        "desc": "Unified pipelines from Salesforce, HubSpot, Stripe, MySQL, MongoDB, S3, and custom APIs."
      },
      {
        "iconName": "TrendingUp",
        "title": "Cost Optimisation",
        "desc": "Query optimisation, partitioning, and clustering strategies that cut warehouse spend by up to 60%."
      },
      {
        "iconName": "Code2",
        "title": "DataOps Practices",
        "desc": "Version-controlled transformations with dbt, automated testing, and one-click environment promotion."
      }
    ],
    "useCases": [
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce",
        "desc": "Unified customer 360, real-time inventory, and attribution modelling across channels."
      },
      {
        "iconName": "CreditCard",
        "industry": "Fintech",
        "desc": "Transaction streaming, risk data marts, and regulatory reporting pipelines."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "FHIR data integration, clinical trial pipelines, and population health analytics."
      },
      {
        "iconName": "Factory",
        "industry": "Manufacturing",
        "desc": "IoT sensor ingestion, OEE tracking, and predictive maintenance data lakes."
      },
      {
        "iconName": "Building2",
        "industry": "SaaS",
        "desc": "Product analytics pipelines, billing reconciliation, and customer usage dashboards."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Data Discovery",
        "desc": "Catalogue all data sources, assess quality, and map business questions to datasets."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Architecture Design",
        "desc": "Design warehouse schema, pipeline topology, orchestration strategy, and cost model."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Pipeline Build",
        "desc": "Develop ingestion, transformation, and loading layers with full test coverage."
      },
      {
        "step": "04",
        "iconName": "ShieldCheck",
        "title": "Quality & Load Testing",
        "desc": "Validate data accuracy, test pipeline resilience, and benchmark query performance."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Go Live & Operate",
        "desc": "Deploy to production with monitoring dashboards, runbooks, and a 30-day hypercare period."
      }
    ],
    "techStack": [
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "Apache Spark",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "MongoDB",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Google Cloud",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
      },
      {
        "name": "Kubernetes",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How long does it take to build a data warehouse from scratch?",
        "a": "A foundational warehouse with 3–5 source integrations and core dashboards typically takes 6–10 weeks. More complex environments with real-time streaming are scoped per project."
      },
      {
        "q": "Can you work with our existing BI tools?",
        "a": "Yes — we connect to Tableau, Power BI, Looker, Metabase, Superset, or any JDBC-compatible tool. We focus on making the underlying data layer rock-solid."
      },
      {
        "q": "What if our data quality is very poor right now?",
        "a": "That's exactly where we start. Data quality assessment and remediation is always Phase 1. We implement Great Expectations or dbt tests to prevent bad data from ever reaching dashboards."
      },
      {
        "q": "Do you provide ongoing pipeline maintenance?",
        "a": "Yes — we offer managed pipeline operations including monitoring, incident response, schema change handling, and monthly performance reviews."
      }
    ]
  },
  {
    "slug": "generative-ai",
    "name": "Generative AI",
    "category": "AI & Data Services",
    "tagline": "Harness the power of large language models, image generation, and multimodal AI to create content, automate creativity, and build next-generation products.",
    "description": "We help businesses integrate and build on top of GPT-4, Gemini, Claude, Stable Diffusion, and open-source LLMs. From RAG-powered knowledge bases to AI content pipelines and multimodal apps — we turn generative AI capabilities into real, measurable business value.",
    "heroGradient": "from-[#1a0a2e] via-[#2d0a4e] to-[#05080f]",
    "accentFrom": "from-fuchsia-500",
    "accentTo": "to-pink-500",
    "accentHex": "#d946ef",
    "iconName": "Sparkles",
    "heroHighlights": [
      "LLM Integration",
      "RAG Systems",
      "Content Generation",
      "Fine-tuning",
      "Multimodal AI"
    ],
    "deliverables": [
      {
        "iconName": "Brain",
        "title": "LLM Integration & Fine-tuning",
        "desc": "Connect GPT-4o, Gemini, Claude, or Llama to your product — or fine-tune open-source models on your data."
      },
      {
        "iconName": "Database",
        "title": "RAG Knowledge Bases",
        "desc": "Retrieval-Augmented Generation systems that answer questions from your private documents with citations."
      },
      {
        "iconName": "Sparkles",
        "title": "AI Content Pipelines",
        "desc": "Automated generation of marketing copy, product descriptions, reports, and structured data at scale."
      },
      {
        "iconName": "Eye",
        "title": "Image & Video AI",
        "desc": "DALL-E, Stable Diffusion, and Runway integrations for creative asset generation and visual search."
      },
      {
        "iconName": "Code2",
        "title": "AI-Powered Dev Tools",
        "desc": "Code generation, review, documentation, and test writing assistants embedded in your dev workflow."
      },
      {
        "iconName": "Shield",
        "title": "Guardrails & Safety",
        "desc": "Prompt injection protection, content moderation, output validation, and hallucination mitigation."
      }
    ],
    "features": [
      {
        "iconName": "Lock",
        "title": "Private & On-Premise LLMs",
        "desc": "Deploy open-source models (Llama 3, Mistral, Phi) on your own infrastructure — no data leaves your environment."
      },
      {
        "iconName": "Zap",
        "title": "Streaming Responses",
        "desc": "Token-by-token streaming for real-time UX — users see output as it generates, like ChatGPT."
      },
      {
        "iconName": "Layers",
        "title": "Multi-Model Orchestration",
        "desc": "Route queries to the best model for each task — quality, cost, and latency optimised automatically."
      },
      {
        "iconName": "RefreshCw",
        "title": "Prompt Version Control",
        "desc": "Manage, A/B test, and rollback prompts like code — full audit trail of every system prompt change."
      },
      {
        "iconName": "BarChart3",
        "title": "Token Cost Management",
        "desc": "Caching, context compression, and model selection logic that cuts LLM API spend by 40–70%."
      },
      {
        "iconName": "Globe",
        "title": "Multilingual Generation",
        "desc": "Generate high-quality content in 50+ languages with automatic localisation and tone matching."
      }
    ],
    "useCases": [
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce",
        "desc": "Automated product descriptions, personalised emails, and visual search with image AI."
      },
      {
        "iconName": "GraduationCap",
        "industry": "EdTech",
        "desc": "AI tutors, personalised learning paths, automated quiz generation, and essay feedback."
      },
      {
        "iconName": "Building2",
        "industry": "Legal & Compliance",
        "desc": "Contract summarisation, clause extraction, due diligence assistants, and regulatory Q&A."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "Clinical note summarisation, patient communication drafting, and medical literature search."
      },
      {
        "iconName": "Landmark",
        "industry": "Media & Publishing",
        "desc": "SEO article generation, content repurposing, podcast transcription, and ad copy creation."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Use Case Validation",
        "desc": "Identify where GenAI creates the most value — prioritised by ROI and implementation complexity."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Model Selection",
        "desc": "Evaluate open vs. closed models, on-premise vs. API, and fine-tuning vs. prompt engineering for your use case."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Build & Integrate",
        "desc": "Develop the AI pipeline, connect to your data sources, and embed in your product or workflow."
      },
      {
        "step": "04",
        "iconName": "ShieldCheck",
        "title": "Evaluation & Safety",
        "desc": "Systematic prompt testing, output quality scoring, hallucination audits, and guardrail implementation."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Deploy & Optimise",
        "desc": "Ship to production with cost monitoring, latency tracking, and iterative prompt/model improvements."
      }
    ],
    "techStack": [
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "PyTorch",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg"
      },
      {
        "name": "FastAPI",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"
      },
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Which AI models do you work with?",
        "a": "We work across the full spectrum — OpenAI (GPT-4o, o1), Google (Gemini 1.5 Pro), Anthropic (Claude), and open-source (Llama 3, Mistral, Phi-3). Model selection is always driven by your use case, budget, and data privacy requirements."
      },
      {
        "q": "How do you prevent AI hallucinations in production?",
        "a": "We implement RAG with source citation, confidence scoring, output validation pipelines, and human-in-the-loop review workflows for high-stakes outputs. Perfect accuracy is never promised, but we engineer for maximum reliability."
      },
      {
        "q": "Can we keep our data private and not send it to OpenAI?",
        "a": "Absolutely. We can deploy open-source models entirely on your own cloud or on-premise infrastructure. Alternatively, Azure OpenAI offers enterprise data privacy guarantees if you prefer GPT-4."
      },
      {
        "q": "How much does GenAI development cost?",
        "a": "Scope varies widely. A RAG-powered knowledge base starts around ₹3–5L. A full-featured AI assistant with fine-tuning, multi-model routing, and production infrastructure typically ranges from ₹10–30L+."
      }
    ]
  },
  {
    "slug": "robotic-process-automation",
    "name": "Robotic Process Automation",
    "category": "AI & Data Services",
    "tagline": "Eliminate repetitive manual work by deploying software robots that execute rule-based tasks faster, cheaper, and with zero errors — 24 hours a day.",
    "description": "We design, build, and manage RPA solutions using UiPath, Automation Anywhere, and Python-based bots that integrate with any application — legacy or modern. From invoice processing to data entry, report generation, and cross-system synchronisation, we automate the work your team hates doing.",
    "heroGradient": "from-[#1a0c00] via-[#2d1800] to-[#05080f]",
    "accentFrom": "from-orange-500",
    "accentTo": "to-amber-500",
    "accentHex": "#f97316",
    "iconName": "Cog",
    "heroHighlights": [
      "Process Automation",
      "Zero Errors",
      "24/7 Operation",
      "Legacy Integration",
      "ROI in Weeks"
    ],
    "deliverables": [
      {
        "iconName": "Zap",
        "title": "Process Discovery & Mining",
        "desc": "Automated analysis of employee workflows to identify the highest-ROI automation candidates."
      },
      {
        "iconName": "Cog",
        "title": "Bot Development",
        "desc": "Attended and unattended bots built on UiPath, Automation Anywhere, or custom Python frameworks."
      },
      {
        "iconName": "Globe",
        "title": "Legacy System Integration",
        "desc": "Automate interactions with any app — even screen-scraping for systems without APIs."
      },
      {
        "iconName": "BarChart3",
        "title": "Process Orchestration",
        "desc": "Central control room for scheduling, monitoring, and managing your entire bot fleet."
      },
      {
        "iconName": "Brain",
        "title": "Intelligent Document Processing",
        "desc": "OCR + AI extraction from invoices, contracts, forms, and emails — with 99%+ accuracy."
      },
      {
        "iconName": "ShieldCheck",
        "title": "Exception Handling",
        "desc": "Robust error recovery workflows that handle edge cases, flag exceptions, and alert operators."
      }
    ],
    "features": [
      {
        "iconName": "Clock",
        "title": "Sub-Second Execution",
        "desc": "Bots complete in seconds what takes humans minutes — throughput scales instantly with demand."
      },
      {
        "iconName": "Shield",
        "title": "Audit Trail & Compliance",
        "desc": "Complete logs of every bot action for SOX, GDPR, and internal compliance requirements."
      },
      {
        "iconName": "RefreshCw",
        "title": "Self-Healing Bots",
        "desc": "AI-assisted bots that detect UI changes and auto-adapt — reducing maintenance overhead by 70%."
      },
      {
        "iconName": "Users",
        "title": "Human-in-the-Loop",
        "desc": "Configurable checkpoints where bots pause for human review before executing sensitive actions."
      },
      {
        "iconName": "TrendingUp",
        "title": "ROI Tracking Dashboard",
        "desc": "Real-time dashboard showing hours saved, error rates, and cost reduction per automated process."
      },
      {
        "iconName": "Layers",
        "title": "Hybrid Automation",
        "desc": "Combine RPA with AI/ML, APIs, and microservices for end-to-end intelligent process automation."
      }
    ],
    "useCases": [
      {
        "iconName": "Landmark",
        "industry": "Banking & Finance",
        "desc": "KYC data entry, loan processing, reconciliation, and regulatory report generation."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "Claims processing, patient record updates, appointment scheduling, and billing."
      },
      {
        "iconName": "Factory",
        "industry": "Manufacturing",
        "desc": "Purchase order processing, inventory updates, compliance reporting, and quality logs."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "Retail & E-commerce",
        "desc": "Order management, returns processing, supplier invoicing, and price synchronisation."
      },
      {
        "iconName": "Building2",
        "industry": "HR & Back-Office",
        "desc": "Employee onboarding, payroll data entry, leave management, and IT provisioning."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Process Assessment",
        "desc": "Document current-state workflows, measure time/cost, and calculate automation ROI."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Bot Design",
        "desc": "Create process definition documents (PDDs) and design exception handling strategies."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Bot Development",
        "desc": "Build, unit-test, and peer-review automation scripts against real test data."
      },
      {
        "step": "04",
        "iconName": "ShieldCheck",
        "title": "UAT & Sign-Off",
        "desc": "Run bots in parallel with human workers to validate accuracy and edge case coverage."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Production Deployment",
        "desc": "Deploy to the control room with scheduling, monitoring, and 30-day hypercare support."
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
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "MySQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
      },
      {
        "name": "Azure",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
      },
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "What types of processes are best suited for RPA?",
        "a": "High-volume, rule-based, repetitive tasks with structured inputs are ideal — data entry, copy-paste between systems, report generation, and form processing. If a human can follow a step-by-step procedure, a bot can too."
      },
      {
        "q": "How quickly can we see ROI?",
        "a": "Most clients see full ROI within 3–6 months of deployment. Simple processes can be automated in 2–3 weeks. We provide a detailed ROI projection before any engagement begins."
      },
      {
        "q": "What happens when the underlying software UI changes?",
        "a": "We build self-healing bots with AI-based element detection, and include a UI change SLA in all support contracts — your automation won't break silently."
      },
      {
        "q": "Do you support both attended and unattended automation?",
        "a": "Yes. Attended bots assist humans in real time (triggered on-demand from a user's desktop) while unattended bots run fully autonomously on a schedule or event trigger. We often combine both."
      }
    ]
  },
  {
    "slug": "business-protecting-services",
    "name": "Business Protecting Services",
    "category": "Digital Transformation",
    "tagline": "Comprehensive cybersecurity, compliance, and risk management solutions that protect your data, brand, and revenue from modern digital threats.",
    "description": "From penetration testing and threat monitoring to data loss prevention and compliance frameworks, we build the security posture your business needs to operate confidently in a hostile digital environment. We protect what you've built.",
    "heroGradient": "from-[#1a0505] via-[#2d0a0a] to-[#05080f]",
    "accentFrom": "from-red-500",
    "accentTo": "to-rose-600",
    "accentHex": "#ef4444",
    "iconName": "ShieldCheck",
    "heroHighlights": [
      "Threat Monitoring",
      "Pen Testing",
      "DLP Solutions",
      "Compliance Audit",
      "Incident Response"
    ],
    "deliverables": [
      {
        "iconName": "Shield",
        "title": "Security Architecture Review",
        "desc": "End-to-end audit of your infrastructure, codebase, and processes to identify vulnerabilities."
      },
      {
        "iconName": "Eye",
        "title": "24/7 Threat Monitoring",
        "desc": "SOC-as-a-service with SIEM integration, anomaly detection, and real-time alert triage."
      },
      {
        "iconName": "Lock",
        "title": "Penetration Testing",
        "desc": "Ethical hacking — web app, API, network, and social engineering tests with detailed remediation reports."
      },
      {
        "iconName": "Database",
        "title": "Data Loss Prevention",
        "desc": "DLP policies, encryption at rest/transit, and access control frameworks protecting sensitive data."
      },
      {
        "iconName": "ShieldCheck",
        "title": "Compliance Readiness",
        "desc": "Gap analysis and remediation for GDPR, ISO 27001, SOC 2, HIPAA, and PCI-DSS."
      },
      {
        "iconName": "Zap",
        "title": "Incident Response",
        "desc": "Rapid containment, forensic analysis, and recovery playbooks for security incidents."
      }
    ],
    "features": [
      {
        "iconName": "Brain",
        "title": "AI Threat Detection",
        "desc": "Machine learning models that identify zero-day threats and anomalous behaviour in real time."
      },
      {
        "iconName": "RefreshCw",
        "title": "Automated Patch Management",
        "desc": "Continuous vulnerability scanning with automated patching workflows to close CVEs fast."
      },
      {
        "iconName": "Users",
        "title": "Security Awareness Training",
        "desc": "Phishing simulations and training programmes that turn your employees into a human firewall."
      },
      {
        "iconName": "Globe",
        "title": "Cloud Security Posture",
        "desc": "CSPM tools that catch misconfigurations in AWS, Azure, and GCP before attackers do."
      },
      {
        "iconName": "BarChart3",
        "title": "Risk Scoring Dashboard",
        "desc": "Business-friendly risk score dashboard so leadership can make informed security investments."
      },
      {
        "iconName": "Clock",
        "title": "Mean Time to Respond",
        "desc": "SLA-backed incident response with guaranteed MTTR targets and post-incident reports."
      }
    ],
    "useCases": [
      {
        "iconName": "Landmark",
        "industry": "Banking & Finance",
        "desc": "Fraud prevention, API security, PCI-DSS compliance, and insider threat detection."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "HIPAA compliance, EHR security, medical device protection, and ransomware response."
      },
      {
        "iconName": "Building2",
        "industry": "SaaS Companies",
        "desc": "SOC 2 readiness, pen testing, bug bounty management, and secure SDLC implementation."
      },
      {
        "iconName": "Factory",
        "industry": "Manufacturing & OT",
        "desc": "ICS/SCADA security, network segmentation, and operational technology threat monitoring."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce",
        "desc": "PCI-DSS compliance, bot mitigation, account takeover prevention, and fraud analytics."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Security Assessment",
        "desc": "Comprehensive audit of your current security posture — assets, risks, and compliance gaps."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Risk Prioritisation",
        "desc": "Score and rank findings by business impact to focus remediation on highest-priority gaps."
      },
      {
        "step": "03",
        "iconName": "ShieldCheck",
        "title": "Controls Implementation",
        "desc": "Deploy technical and process controls — firewalls, IAM, DLP, monitoring, and policies."
      },
      {
        "step": "04",
        "iconName": "Eye",
        "title": "Testing & Validation",
        "desc": "Pen test, red team, and compliance audit to verify controls are working as designed."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Ongoing Monitoring",
        "desc": "Continuous threat monitoring, quarterly reviews, and annual re-assessment under retainer."
      }
    ],
    "techStack": [
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      },
      {
        "name": "Linux",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Azure",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
      },
      {
        "name": "Kubernetes",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How often should we conduct penetration testing?",
        "a": "We recommend at minimum annual pen tests, plus tests after major releases, infrastructure changes, or post-incident. High-compliance industries (finance, healthcare) typically require quarterly testing."
      },
      {
        "q": "Can you help us achieve ISO 27001 or SOC 2 certification?",
        "a": "Yes — we run full gap assessments, implement required controls, create documentation, and provide audit support. We have clients who have achieved certification within 4–6 months of engaging us."
      },
      {
        "q": "What's included in 24/7 threat monitoring?",
        "a": "Our SOC service includes SIEM log aggregation, automated alert triage, human analyst review for high-severity alerts, monthly threat reports, and a guaranteed response SLA."
      },
      {
        "q": "Do you handle incident response for active breaches?",
        "a": "Yes — we offer a retained IR service with guaranteed 2-hour response times for critical incidents, covering containment, forensics, eradication, recovery, and post-incident reporting."
      }
    ]
  },
  {
    "slug": "product-design-ideation-services",
    "name": "Product Design & Ideation",
    "category": "Digital Transformation",
    "tagline": "From blank-page ideas to validated, pixel-perfect product designs — we help you build products users love before a single line of code is written.",
    "description": "We combine design thinking, user research, and world-class Figma craftsmanship to turn your product vision into high-fidelity prototypes. Our design process eliminates expensive post-launch rewrites by validating with real users early and often.",
    "heroGradient": "from-[#0a1200] via-[#182600] to-[#05080f]",
    "accentFrom": "from-lime-500",
    "accentTo": "to-yellow-500",
    "accentHex": "#84cc16",
    "iconName": "Lightbulb",
    "heroHighlights": [
      "Design Thinking",
      "User Research",
      "Figma Prototypes",
      "Usability Testing",
      "Design Systems"
    ],
    "deliverables": [
      {
        "iconName": "Search",
        "title": "User Research & Discovery",
        "desc": "Interviews, surveys, competitive analysis, and journey mapping to understand real user needs."
      },
      {
        "iconName": "Layers",
        "title": "Information Architecture",
        "desc": "Sitemaps, user flows, and navigation design that make complex products feel intuitive."
      },
      {
        "iconName": "Eye",
        "title": "Wireframes & Prototypes",
        "desc": "From low-fidelity sketches to interactive Figma prototypes ready for usability testing."
      },
      {
        "iconName": "Sparkles",
        "title": "High-Fidelity UI Design",
        "desc": "Pixel-perfect screens with custom visual language, motion design, and micro-interactions."
      },
      {
        "iconName": "Layers",
        "title": "Design System Creation",
        "desc": "Component libraries and token-based design systems that scale across your entire product suite."
      },
      {
        "iconName": "ShieldCheck",
        "title": "Handoff & Dev Collaboration",
        "desc": "Developer-ready Figma specs with measurements, assets, and design QA throughout build."
      }
    ],
    "features": [
      {
        "iconName": "Users",
        "title": "Validated with Real Users",
        "desc": "Every major design decision is tested with 5–8 target users before engineering begins — not after."
      },
      {
        "iconName": "RefreshCw",
        "title": "Rapid Iteration",
        "desc": "Weekly design sprints with stakeholder reviews — we move fast without sacrificing quality."
      },
      {
        "iconName": "Globe",
        "title": "Accessibility-First (WCAG 2.1)",
        "desc": "Every design meets WCAG 2.1 AA — inclusive products reach more users and reduce legal risk."
      },
      {
        "iconName": "Cpu",
        "title": "AI-Assisted Design",
        "desc": "We use AI tools (Midjourney, Galileo, Framer AI) to dramatically accelerate visual ideation."
      },
      {
        "iconName": "BarChart3",
        "title": "Conversion-Optimised",
        "desc": "CRO principles baked into every layout — button placement, form design, and onboarding flows."
      },
      {
        "iconName": "Smartphone",
        "title": "Mobile-First Approach",
        "desc": "Designed for mobile first, then scaled up — ensuring a flawless experience on every screen size."
      }
    ],
    "useCases": [
      {
        "iconName": "Building2",
        "industry": "SaaS Products",
        "desc": "Onboarding flows, dashboard design, and complex data visualisation for B2B SaaS."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce",
        "desc": "Conversion-optimised product pages, checkout flows, and mobile shopping experiences."
      },
      {
        "iconName": "HeartPulse",
        "industry": "HealthTech",
        "desc": "Patient portals, clinical dashboards, and telemedicine interfaces with strict accessibility."
      },
      {
        "iconName": "GraduationCap",
        "industry": "EdTech",
        "desc": "Learning management systems, course builders, and student engagement interfaces."
      },
      {
        "iconName": "CreditCard",
        "industry": "Fintech",
        "desc": "Onboarding KYC flows, investment dashboards, and payment UX that builds trust."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Discover & Define",
        "desc": "User research, competitive audit, and problem statement definition in a focused discovery sprint."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Ideate & Sketch",
        "desc": "Rapid sketching, design studio workshops, and information architecture mapping."
      },
      {
        "step": "03",
        "iconName": "Eye",
        "title": "Prototype",
        "desc": "Interactive Figma prototypes built to simulate real product interactions and test assumptions."
      },
      {
        "step": "04",
        "iconName": "Users",
        "title": "User Testing",
        "desc": "Moderated usability sessions with target users — insights drive design refinements."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Finalise & Hand Off",
        "desc": "Polished UI, design system docs, and a QA-supported handoff to engineering."
      }
    ],
    "techStack": [
      {
        "name": "React",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
      },
      {
        "name": "Next.js",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
      },
      {
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
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
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "JavaScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "What deliverables do we get at the end of the design phase?",
        "a": "You receive a complete Figma file with all screens, components, and variants; a design system with documented tokens; interactive prototypes; and a handoff guide for developers. All assets are yours."
      },
      {
        "q": "Do you conduct real user testing?",
        "a": "Yes — it's non-negotiable. We run moderated usability sessions with 5–8 users matching your target persona before finalising any major user flow. Results directly shape the final design."
      },
      {
        "q": "How long does product design take?",
        "a": "A focused MVP design (5–10 core screens with a design system) typically takes 3–5 weeks. Full-scale product design for complex SaaS platforms is 6–10 weeks depending on scope."
      },
      {
        "q": "Can you work with our existing brand guidelines?",
        "a": "Absolutely. We extend your existing brand identity into a digital product context. If you don't have guidelines yet, we can create them as part of the engagement."
      }
    ]
  },
  {
    "slug": "resource-augmentation-services",
    "name": "Resource Augmentation Services",
    "category": "Digital Transformation",
    "tagline": "Scale your engineering team on-demand with pre-vetted senior developers, designers, and architects who integrate seamlessly into your workflow — no hiring overhead.",
    "description": "When your roadmap outpaces your headcount, we embed skilled professionals directly into your team. Our engineers work in your timezone, use your tools, follow your processes, and take full ownership of outcomes — not just ticket velocity.",
    "heroGradient": "from-[#080a28] via-[#0d1245] to-[#05080f]",
    "accentFrom": "from-indigo-500",
    "accentTo": "to-blue-600",
    "accentHex": "#6366f1",
    "iconName": "Users",
    "heroHighlights": [
      "On-Demand Scaling",
      "Senior Talent",
      "Full Integration",
      "No Hiring Overhead",
      "IP Ownership"
    ],
    "deliverables": [
      {
        "iconName": "Code2",
        "title": "Full-Stack Developers",
        "desc": "React, Node.js, Python, Go, Java — senior engineers who hit the ground running from day one."
      },
      {
        "iconName": "Eye",
        "title": "UI/UX Designers",
        "desc": "Product designers who own feature design end-to-end, from user research to polished Figma deliverables."
      },
      {
        "iconName": "Brain",
        "title": "AI/ML Engineers",
        "desc": "Specialists in LLMs, ML engineering, data science, and MLOps for AI product development."
      },
      {
        "iconName": "Database",
        "title": "Data Engineers & Architects",
        "desc": "Pipeline builders, warehouse designers, and analytics engineers to power your data strategy."
      },
      {
        "iconName": "Layers",
        "title": "Cloud & DevOps Engineers",
        "desc": "AWS/GCP/Azure architects and platform engineers who own your infrastructure and CI/CD."
      },
      {
        "iconName": "ShieldCheck",
        "title": "QA & Test Engineers",
        "desc": "Manual and automation testers embedded in your squads to maintain quality at velocity."
      }
    ],
    "features": [
      {
        "iconName": "Clock",
        "title": "72-Hour Onboarding",
        "desc": "Our engineers are fully productive within 72 hours — no long ramp-up periods."
      },
      {
        "iconName": "Globe",
        "title": "Timezone Flexibility",
        "desc": "We match working hours to your team — IST, US, EU, or hybrid overlap models available."
      },
      {
        "iconName": "Shield",
        "title": "NDA & IP Protection",
        "desc": "All work is under signed NDA with full IP assignment to your company — always."
      },
      {
        "iconName": "RefreshCw",
        "title": "Flex Up or Down",
        "desc": "Add or remove team members monthly based on your sprint workload — no penalties."
      },
      {
        "iconName": "Users",
        "title": "Direct Communication",
        "desc": "Your engineers communicate directly with your team in Slack/Teams — no account manager middlemen."
      },
      {
        "iconName": "TrendingUp",
        "title": "Performance Tracking",
        "desc": "Monthly velocity reviews with KPIs, code quality metrics, and satisfaction scores."
      }
    ],
    "useCases": [
      {
        "iconName": "Rocket",
        "industry": "Startups",
        "desc": "Build your initial engineering team fast without the 3–6 month hiring cycle."
      },
      {
        "iconName": "Building2",
        "industry": "Scale-ups",
        "desc": "Augment existing teams during product sprints, platform migrations, or new feature launches."
      },
      {
        "iconName": "Globe",
        "industry": "Enterprises",
        "desc": "Fill specialist skill gaps (AI, mobile, cloud) without creating permanent headcount."
      },
      {
        "iconName": "Code2",
        "industry": "Agencies",
        "desc": "White-label development capacity for client projects when your bench is fully booked."
      },
      {
        "iconName": "Layers",
        "industry": "Digital Transformation",
        "desc": "Embed transformation specialists alongside legacy team members to accelerate modernisation."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Requirements Brief",
        "desc": "Define required skills, seniority, timezone, duration, and expected deliverables."
      },
      {
        "step": "02",
        "iconName": "Users",
        "title": "Candidate Shortlist",
        "desc": "We present 2–3 pre-vetted candidates within 48–72 hours for your technical interview."
      },
      {
        "step": "03",
        "iconName": "ShieldCheck",
        "title": "Trial Period",
        "desc": "Optional 1-week paid trial to validate fit before committing to a longer engagement."
      },
      {
        "step": "04",
        "iconName": "Layers",
        "title": "Onboarding",
        "desc": "Engineers join your Slack, Jira, GitHub, and standups — fully embedded within 72 hours."
      },
      {
        "step": "05",
        "iconName": "TrendingUp",
        "title": "Ongoing Review",
        "desc": "Monthly performance reviews with OKR tracking and the option to extend, scale, or change roles."
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
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Kubernetes",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How quickly can you provide engineers?",
        "a": "We can have a shortlist of 2–3 pre-vetted candidates ready for your technical interview within 48–72 hours. Onboarding takes another 1–3 days. Most clients have engineers productive within one week of engagement."
      },
      {
        "q": "Who manages the engineers day-to-day?",
        "a": "Your team does. Our engineers report to your tech lead, attend your standups, and follow your sprint process. We provide oversight, but there is no Fynryx account manager in the communication chain."
      },
      {
        "q": "What is the minimum engagement period?",
        "a": "We require a minimum of 1 month for individual engineers and 3 months for teams. This ensures enough time for real impact and proper knowledge transfer."
      },
      {
        "q": "Who owns the code and intellectual property?",
        "a": "Your company owns 100% of all work product. Every engineer signs an IP assignment agreement before starting. There are no licensing fees or claims after the engagement ends."
      }
    ]
  },
  {
    "slug": "cms-development-services",
    "name": "CMS Development Services",
    "category": "Enterprise Solutions",
    "tagline": "Headless and traditional CMS platforms that give your content teams full control without engineering bottlenecks — scalable, fast, and SEO-optimised.",
    "description": "We build custom content management systems and integrate best-in-class headless CMS platforms (Sanity, Contentful, Strapi) so your marketing, editorial, and product teams can publish content independently while developers maintain full architectural control.",
    "heroGradient": "from-[#001a2e] via-[#002845] to-[#05080f]",
    "accentFrom": "from-sky-500",
    "accentTo": "to-blue-600",
    "accentHex": "#0ea5e9",
    "iconName": "Layout",
    "heroHighlights": [
      "Headless CMS",
      "SEO Optimised",
      "Multi-channel",
      "Content Workflows",
      "Custom Fields"
    ],
    "deliverables": [
      {
        "iconName": "Layers",
        "title": "Headless CMS Architecture",
        "desc": "Decouple content from presentation — publish to web, mobile, kiosk, and digital signage from one source."
      },
      {
        "iconName": "Code2",
        "title": "Custom CMS Build",
        "desc": "Bespoke content management for complex editorial workflows, multi-tenant sites, and unique schemas."
      },
      {
        "iconName": "Globe",
        "title": "Multi-Language & Localisation",
        "desc": "Full i18n support with language-specific workflows, editorial review, and automatic locale routing."
      },
      {
        "iconName": "Search",
        "title": "SEO Toolkit Integration",
        "desc": "Real-time SEO scoring, metadata management, structured data, and sitemap automation."
      },
      {
        "iconName": "Users",
        "title": "Editorial Workflow Engine",
        "desc": "Draft → Review → Approve → Publish pipelines with role-based permissions and audit trails."
      },
      {
        "iconName": "Zap",
        "title": "Performance Optimisation",
        "desc": "CDN integration, image optimisation, and static generation strategies for sub-100ms load times."
      }
    ],
    "features": [
      {
        "iconName": "Brain",
        "title": "AI Content Assist",
        "desc": "Integrated AI writing suggestions, SEO recommendations, and auto-tagging within the CMS editor."
      },
      {
        "iconName": "RefreshCw",
        "title": "Preview Environments",
        "desc": "Editors can preview content on any channel before publishing — no more 'what will it look like?' questions."
      },
      {
        "iconName": "Shield",
        "title": "Granular Permissions",
        "desc": "Role-based access with field-level permissions — control exactly who can edit what."
      },
      {
        "iconName": "BarChart3",
        "title": "Content Analytics",
        "desc": "Page performance, content engagement, and A/B test results surfaced directly in the CMS."
      },
      {
        "iconName": "Layers",
        "title": "Reusable Content Blocks",
        "desc": "Component-based content architecture — build once, reuse everywhere, maintain brand consistency."
      },
      {
        "iconName": "Globe",
        "title": "API-First Delivery",
        "desc": "REST and GraphQL content APIs for any frontend framework — React, Vue, Flutter, or native."
      }
    ],
    "useCases": [
      {
        "iconName": "Building2",
        "industry": "Enterprise Portals",
        "desc": "Multi-site, multi-brand CMS with centralised governance and local editorial control."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "E-commerce Content",
        "desc": "Product content, landing pages, blog, and campaign management with commerce integration."
      },
      {
        "iconName": "Landmark",
        "industry": "Media & Publishing",
        "desc": "High-volume article publishing, paywall management, and newsletter content pipelines."
      },
      {
        "iconName": "GraduationCap",
        "industry": "Education",
        "desc": "Course content management, curriculum publishing, and multi-language course delivery."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "Patient education content, regulatory-compliant publishing, and multilingual health information."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Content Audit",
        "desc": "Audit existing content, map editorial workflows, and define content types and relationships."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Architecture Design",
        "desc": "Design content schema, API structure, CDN strategy, and editorial permission model."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "CMS Build & Integration",
        "desc": "Configure or build the CMS, connect to your frontend(s), and integrate third-party services."
      },
      {
        "step": "04",
        "iconName": "Users",
        "title": "Editor Training & UAT",
        "desc": "Train content teams, run editorial workflow UAT, and validate SEO and performance baselines."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Launch & Migrate",
        "desc": "Launch new CMS with full content migration from legacy platforms and zero downtime cutover."
      }
    ],
    "techStack": [
      {
        "name": "React",
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
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      },
      {
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "MySQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Should we use a headless CMS or a traditional CMS like WordPress?",
        "a": "It depends on your architecture. Headless CMS (Sanity, Contentful, Strapi) is ideal for multi-channel delivery, performance-critical sites, and custom frontends. WordPress remains excellent for content-heavy sites needing a large plugin ecosystem. We'll recommend the right approach after a discovery call."
      },
      {
        "q": "Can you migrate our existing content to the new CMS?",
        "a": "Yes — content migration is a standard part of every CMS project. We build automated migration scripts, validate content integrity, and conduct parallel running before full cutover."
      },
      {
        "q": "How do we handle multi-language content management?",
        "a": "We implement locale-based content models where each content item has language variants, separate editorial workflows per locale, and automatic routing based on user browser/region settings."
      },
      {
        "q": "What ongoing support do you provide post-launch?",
        "a": "We offer tiered support plans covering bug fixes, security updates, performance monitoring, and feature additions. Content schema changes and editor training are also covered."
      }
    ]
  },
  {
    "slug": "erp-software-development",
    "name": "ERP Software Development",
    "category": "Enterprise Solutions",
    "tagline": "Custom ERP systems that unify your operations, finance, HR, and supply chain into a single source of truth — eliminating spreadsheet chaos and data silos forever.",
    "description": "Off-the-shelf ERPs are too rigid and too expensive to customise. We build purpose-fit ERP platforms for mid-market and enterprise businesses that reflect your exact workflows, integrate with your existing tools, and scale as you grow — without six-figure licence fees.",
    "heroGradient": "from-[#050a1a] via-[#08142e] to-[#05080f]",
    "accentFrom": "from-slate-400",
    "accentTo": "to-blue-500",
    "accentHex": "#64748b",
    "iconName": "Building2",
    "heroHighlights": [
      "Finance Module",
      "HR & Payroll",
      "Supply Chain",
      "Real-time Reporting",
      "Multi-entity"
    ],
    "deliverables": [
      {
        "iconName": "DollarSign",
        "title": "Finance & Accounting Module",
        "desc": "GL, AP/AR, multi-currency, tax compliance, bank reconciliation, and audit-ready financial reporting."
      },
      {
        "iconName": "Users",
        "title": "HR & Payroll Management",
        "desc": "Employee records, leave management, payroll processing, performance cycles, and compliance."
      },
      {
        "iconName": "Truck",
        "title": "Supply Chain & Inventory",
        "desc": "Purchase orders, vendor management, goods receipt, warehouse tracking, and stock alerts."
      },
      {
        "iconName": "BarChart3",
        "title": "Business Intelligence & Reports",
        "desc": "Real-time dashboards, KPI scorecards, and ad-hoc reporting across all business functions."
      },
      {
        "iconName": "Globe",
        "title": "Third-Party Integration Hub",
        "desc": "Pre-built connectors for banking, e-commerce, CRM, logistics, and government tax portals."
      },
      {
        "iconName": "ShieldCheck",
        "title": "Role-Based Access & Audit",
        "desc": "Granular permissions with complete audit trail — every action logged, every change traceable."
      }
    ],
    "features": [
      {
        "iconName": "Zap",
        "title": "Workflow Automation",
        "desc": "Approval workflows, automated alerts, and rule-based triggers eliminate manual follow-up."
      },
      {
        "iconName": "Layers",
        "title": "Multi-Entity Support",
        "desc": "Manage multiple companies, branches, and cost centres within a single ERP instance."
      },
      {
        "iconName": "RefreshCw",
        "title": "Real-time Sync",
        "desc": "All modules share a single data model — a purchase order instantly updates stock, finance, and reporting."
      },
      {
        "iconName": "Smartphone",
        "title": "Mobile ERP App",
        "desc": "Approve purchase orders, view dashboards, and manage tasks from iOS or Android anywhere."
      },
      {
        "iconName": "Database",
        "title": "Data Migration",
        "desc": "Complete migration from QuickBooks, Tally, SAP B1, legacy custom systems, or spreadsheets."
      },
      {
        "iconName": "Clock",
        "title": "Offline Capability",
        "desc": "Field staff can continue working without connectivity — data syncs automatically when back online."
      }
    ],
    "useCases": [
      {
        "iconName": "Factory",
        "industry": "Manufacturing",
        "desc": "Production planning, BOM management, shop floor tracking, and quality control."
      },
      {
        "iconName": "Truck",
        "industry": "Distribution & Logistics",
        "desc": "Warehouse management, fleet tracking, delivery scheduling, and route optimisation."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "Retail Chains",
        "desc": "Multi-store inventory, centralised purchasing, POS integration, and franchise management."
      },
      {
        "iconName": "Building2",
        "industry": "Construction & Projects",
        "desc": "Project costing, subcontractor management, progress billing, and equipment tracking."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Healthcare",
        "desc": "Hospital operations, billing, pharmacy, procurement, and HR in one integrated platform."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Business Process Mapping",
        "desc": "Document all workflows, pain points, integrations needed, and define the ERP scope."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "System Architecture",
        "desc": "Design module structure, data model, integration approach, and technology stack."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Phased Development",
        "desc": "Build core modules first, deliver working software in sprints, iterate based on feedback."
      },
      {
        "step": "04",
        "iconName": "Users",
        "title": "Data Migration & UAT",
        "desc": "Migrate historical data, train power users, and run parallel operations to validate accuracy."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Go-Live & Support",
        "desc": "Phased cutover with hypercare support team on-site for the first 30 days post-launch."
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
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Kubernetes",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Why build a custom ERP instead of buying SAP or Oracle?",
        "a": "Off-the-shelf ERPs cost ₹20–200L+ per year in licences alone, require expensive consultants to customise, and force your business to adapt to software rigidity. A custom ERP is built around your workflows, owned outright, and can be modified whenever you need — typically breaking even within 2 years."
      },
      {
        "q": "How long does ERP development take?",
        "a": "A focused ERP with 4–5 core modules (Finance, HR, Inventory, Reporting) typically takes 4–6 months. We deliver value in phases — you start using completed modules while others are still being built."
      },
      {
        "q": "Can you integrate with our existing bank, GST portal, or legacy system?",
        "a": "Yes — we build integration connectors for Indian banking APIs, GST compliance portals, tally data migration, and any custom legacy system via file-based or API integration."
      },
      {
        "q": "What happens after go-live?",
        "a": "We provide a mandatory 30-day hypercare period with dedicated support, then transition to an SLA-backed support retainer covering bugs, performance, security updates, and minor enhancements."
      }
    ]
  },
  {
    "slug": "financial-product-development",
    "name": "Financial Product Development",
    "category": "Enterprise Solutions",
    "tagline": "Secure, compliant, and high-performance financial software — from lending platforms to trading systems and payment infrastructure — built to handle money with zero tolerance for errors.",
    "description": "Financial software demands the highest standards of reliability, security, and regulatory compliance. We build NBFC platforms, payment gateways, trading apps, wealth management tools, and insurance products with the technical rigour and compliance expertise the industry demands.",
    "heroGradient": "from-[#001a0a] via-[#002814] to-[#05080f]",
    "accentFrom": "from-green-500",
    "accentTo": "to-emerald-600",
    "accentHex": "#22c55e",
    "iconName": "DollarSign",
    "heroHighlights": [
      "Payment Systems",
      "Lending Platforms",
      "Trading Apps",
      "KYC/AML",
      "RBI Compliance"
    ],
    "deliverables": [
      {
        "iconName": "CreditCard",
        "title": "Payment Gateway & Wallets",
        "desc": "UPI, NEFT, IMPS, card processing, and multi-currency wallet infrastructure with PCI-DSS compliance."
      },
      {
        "iconName": "BarChart3",
        "title": "Lending & Credit Platforms",
        "desc": "Loan origination, credit scoring, disbursement automation, and collections management."
      },
      {
        "iconName": "TrendingUp",
        "title": "Trading & Investment Apps",
        "desc": "Real-time order management, portfolio tracking, market data feeds, and algorithmic trading."
      },
      {
        "iconName": "ShieldCheck",
        "title": "KYC / AML Engine",
        "desc": "Automated identity verification, document OCR, risk scoring, and transaction monitoring."
      },
      {
        "iconName": "Globe",
        "title": "Open Banking APIs",
        "desc": "Account aggregation, consent management, and financial data APIs built on AA framework standards."
      },
      {
        "iconName": "Lock",
        "title": "Regulatory Compliance",
        "desc": "RBI, SEBI, IRDAI compliance frameworks with audit trails, reporting, and regulator-ready dashboards."
      }
    ],
    "features": [
      {
        "iconName": "Zap",
        "title": "High-Throughput Architecture",
        "desc": "Event-driven microservices handling 50,000+ TPS with 99.99% uptime SLA and zero-downtime deployments."
      },
      {
        "iconName": "Shield",
        "title": "Multi-Layer Security",
        "desc": "Encryption at rest and in transit, tokenisation, HSM integration, and real-time fraud scoring."
      },
      {
        "iconName": "Brain",
        "title": "AI Credit Scoring",
        "desc": "Alternative data ML models that extend credit to thin-file borrowers with accuracy exceeding bureau scores."
      },
      {
        "iconName": "RefreshCw",
        "title": "Reconciliation Automation",
        "desc": "Automated settlement reconciliation with banks, payment rails, and third-party partners."
      },
      {
        "iconName": "BarChart3",
        "title": "Real-time Risk Dashboard",
        "desc": "Live exposure monitoring, concentration limits, and VaR calculations for risk teams."
      },
      {
        "iconName": "Database",
        "title": "Core Banking Integration",
        "desc": "CBS APIs, SWIFT messaging, NACH mandate management, and banking correspondent frameworks."
      }
    ],
    "useCases": [
      {
        "iconName": "Landmark",
        "industry": "NBFCs & Fintech",
        "desc": "Digital lending apps, P2P platforms, and BNPL infrastructure with full RBI compliance."
      },
      {
        "iconName": "TrendingUp",
        "industry": "Wealth Management",
        "desc": "Robo-advisors, goal-based investing apps, and portfolio management platforms."
      },
      {
        "iconName": "ShieldCheck",
        "industry": "Insurance (Insurtech)",
        "desc": "Policy management, digital claims processing, and embedded insurance integration."
      },
      {
        "iconName": "Globe",
        "industry": "Payments & Remittance",
        "desc": "Cross-border payment rails, forex platforms, and domestic payment switch infrastructure."
      },
      {
        "iconName": "Building2",
        "industry": "Enterprise Treasury",
        "desc": "Cash management, FX hedging dashboards, and inter-company netting platforms."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Regulatory Scoping",
        "desc": "Map regulatory requirements, data residency rules, and compliance obligations before design begins."
      },
      {
        "step": "02",
        "iconName": "ShieldCheck",
        "title": "Security Architecture",
        "desc": "Design threat model, encryption strategy, access controls, and fraud prevention systems."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Core Development",
        "desc": "Build financial logic with 100% unit test coverage, immutable audit logs, and four-eyes validation."
      },
      {
        "step": "04",
        "iconName": "Layers",
        "title": "Compliance Testing",
        "desc": "Regulatory review, penetration testing, load testing to 10x expected peak, and DR testing."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Staged Rollout",
        "desc": "Phased launch with beta users, real-time monitoring, and a fully tested rollback procedure."
      }
    ],
    "techStack": [
      {
        "name": "Python",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
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
        "name": "PostgreSQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"
      },
      {
        "name": "Redis",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "AWS",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "How do you ensure RBI/SEBI regulatory compliance?",
        "a": "We have dedicated compliance architects who map every feature against current regulations. We build audit trail systems, data residency controls, and reporting modules to meet submission requirements. We also work with your legal counsel for final sign-off."
      },
      {
        "q": "What security standards do you follow for financial products?",
        "a": "PCI-DSS Level 1 compliance, OWASP ASVS Level 3, ISO 27001-aligned security controls, HSM for key management, and mandatory penetration testing before every major release."
      },
      {
        "q": "Can you integrate with our CBS or banking partner APIs?",
        "a": "Yes — we have integration experience with major CBS vendors (Finacle, BankWare, T24), NPCI systems (UPI, NACH, IMPS), and leading payment aggregators. We also build custom integration layers for proprietary banking APIs."
      },
      {
        "q": "How do you handle financial data disaster recovery?",
        "a": "We design multi-region active-passive or active-active architectures with RPO < 1 minute and RTO < 15 minutes. DR testing is part of our standard pre-launch checklist for all financial products."
      }
    ]
  },
  {
    "slug": "gps-tracking-software",
    "name": "GPS Tracking Software",
    "category": "Enterprise Solutions",
    "tagline": "Real-time fleet, asset, and field workforce tracking systems that cut fuel costs, improve delivery performance, and give you complete operational visibility.",
    "description": "We build custom GPS tracking platforms that ingest real-time location data from vehicles, assets, and field workers — then surface it in intuitive dashboards, automated alerts, and BI reports. From 10 vehicles to 100,000 assets, our platforms scale to your operational needs.",
    "heroGradient": "from-[#001428] via-[#001e3d] to-[#05080f]",
    "accentFrom": "from-cyan-500",
    "accentTo": "to-blue-600",
    "accentHex": "#06b6d4",
    "iconName": "Map",
    "heroHighlights": [
      "Real-time Tracking",
      "Geofencing",
      "Route Optimisation",
      "Driver Analytics",
      "Fleet Reports"
    ],
    "deliverables": [
      {
        "iconName": "Map",
        "title": "Real-time Location Dashboard",
        "desc": "Live map with vehicle/asset positions, speeds, and status updated every 5–30 seconds."
      },
      {
        "iconName": "Bell",
        "title": "Alert & Notification Engine",
        "desc": "Geofence breaches, harsh driving, ignition on/off, idle time, and maintenance due alerts."
      },
      {
        "iconName": "TrendingUp",
        "title": "Route Optimisation",
        "desc": "AI-powered route planning that minimises fuel, distance, and delivery time across your fleet."
      },
      {
        "iconName": "BarChart3",
        "title": "Fleet Analytics & Reporting",
        "desc": "Fuel consumption, driver behaviour scores, trip history, and utilisation reports on demand."
      },
      {
        "iconName": "Users",
        "title": "Driver & Field Workforce App",
        "desc": "Mobile app for drivers with job dispatch, navigation, ePOD, and communication tools."
      },
      {
        "iconName": "ShieldCheck",
        "title": "Maintenance & Compliance",
        "desc": "Service schedules, document expiry alerts (insurance, permits), and compliance checklists."
      }
    ],
    "features": [
      {
        "iconName": "Globe",
        "title": "Multi-Protocol Device Support",
        "desc": "GPRS, 4G LTE, OBD-II, and BLE device integration — works with any GPS hardware vendor."
      },
      {
        "iconName": "Brain",
        "title": "AI Predictive Maintenance",
        "desc": "Predict breakdowns before they happen using vehicle telematics and historical failure data."
      },
      {
        "iconName": "Zap",
        "title": "High-Frequency Ingestion",
        "desc": "Process millions of location pings per second with sub-10ms query response for live dashboards."
      },
      {
        "iconName": "Layers",
        "title": "Multi-Tenant White-Label",
        "desc": "White-label the platform for your customers with their own branding, users, and fleet hierarchy."
      },
      {
        "iconName": "Lock",
        "title": "Tamper Detection",
        "desc": "Hardware tamper alerts, signal jamming detection, and shadow mode tracking for high-value assets."
      },
      {
        "iconName": "RefreshCw",
        "title": "Offline Mode & Replay",
        "desc": "Buffered tracking when connectivity drops, with full trip replay and gap reporting."
      }
    ],
    "useCases": [
      {
        "iconName": "Truck",
        "industry": "Logistics & Courier",
        "desc": "Last-mile delivery tracking, ETA prediction, and real-time proof-of-delivery."
      },
      {
        "iconName": "Factory",
        "industry": "Construction & Heavy Equipment",
        "desc": "Machinery location, utilisation hours, geofence alerts, and maintenance scheduling."
      },
      {
        "iconName": "Building2",
        "industry": "Field Service Management",
        "desc": "Technician dispatch, job assignment, time-on-site tracking, and customer ETA SMS."
      },
      {
        "iconName": "ShoppingCart",
        "industry": "Retail Distribution",
        "desc": "Van sales tracking, route adherence, visit verification, and cold chain monitoring."
      },
      {
        "iconName": "Shield",
        "industry": "Security & Patrol",
        "desc": "Guard patrol tracking, checkpoint scanning, panic buttons, and incident reporting."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Fleet & Use Case Discovery",
        "desc": "Map vehicle types, device hardware, operational workflows, and reporting requirements."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "Platform Architecture",
        "desc": "Design ingestion pipeline, data model, alert engine, and frontend dashboard architecture."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Platform Development",
        "desc": "Build web dashboard, mobile apps, API layer, and device integration protocol handlers."
      },
      {
        "step": "04",
        "iconName": "ShieldCheck",
        "title": "Device Integration & Testing",
        "desc": "Test with real hardware under field conditions — accuracy, reliability, and load testing."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Rollout & Training",
        "desc": "Fleet-by-fleet onboarding with driver training, admin workshops, and 30-day hypercare."
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
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "Linux",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Do you supply GPS hardware or work with existing devices?",
        "a": "We integrate with any GPS hardware that communicates via standard protocols (TCP/IP, GPRS, HTTP). We can also recommend and source hardware from our validated device partner network if you need a complete solution."
      },
      {
        "q": "How many vehicles can your platform handle?",
        "a": "Our architecture handles from 10 to 500,000+ active devices on the same platform. Horizontal scaling is automatic — adding vehicles requires no infrastructure changes."
      },
      {
        "q": "Can we white-label the platform for our customers?",
        "a": "Yes — we build multi-tenant white-label platforms where each customer gets their own branded portal, user management, and fleet hierarchy while sharing the same underlying infrastructure."
      },
      {
        "q": "What is the tracking update frequency?",
        "a": "Configurable from 5 seconds to 5 minutes depending on your use case and data plan. Most fleet operations use 30-second intervals; high-value asset tracking typically uses 10-second intervals."
      }
    ]
  },
  {
    "slug": "inventory-management-system",
    "name": "Inventory Management System",
    "category": "Enterprise Solutions",
    "tagline": "Real-time inventory visibility across every warehouse, store, and channel — eliminating stockouts, reducing overstock, and cutting carrying costs by up to 30%.",
    "description": "We build custom inventory management systems that give operations teams a live, accurate view of stock across every location. With barcode scanning, automated reorder triggers, supplier management, and deep analytics, you always know exactly what you have and where it is.",
    "heroGradient": "from-[#0a001a] via-[#160028] to-[#05080f]",
    "accentFrom": "from-purple-500",
    "accentTo": "to-indigo-600",
    "accentHex": "#a855f7",
    "iconName": "Package",
    "heroHighlights": [
      "Real-time Stock",
      "Barcode Scanning",
      "Auto Reorder",
      "Multi-warehouse",
      "Demand Forecasting"
    ],
    "deliverables": [
      {
        "iconName": "Package",
        "title": "Real-time Stock Dashboard",
        "desc": "Live inventory levels across all locations with drill-down to SKU, batch, and serial number."
      },
      {
        "iconName": "Smartphone",
        "title": "Mobile Barcode & QR Scanning",
        "desc": "iOS/Android warehouse app for receiving, picking, packing, and stocktakes with offline support."
      },
      {
        "iconName": "Bell",
        "title": "Automated Reorder System",
        "desc": "Rule-based and AI-driven reorder triggers with auto PO generation sent directly to suppliers."
      },
      {
        "iconName": "Truck",
        "title": "Supplier & Purchase Management",
        "desc": "Vendor catalogue, price lists, PO workflow, GRN, and supplier performance analytics."
      },
      {
        "iconName": "BarChart3",
        "title": "Demand Forecasting",
        "desc": "ML models that predict future demand by SKU, reducing both stockouts and excess inventory."
      },
      {
        "iconName": "Globe",
        "title": "Multi-Channel Integration",
        "desc": "Sync stock levels in real time with Shopify, WooCommerce, Amazon, Flipkart, and your ERP."
      }
    ],
    "features": [
      {
        "iconName": "Layers",
        "title": "Multi-Warehouse Management",
        "desc": "Manage unlimited warehouses, zones, bins, and locations with inter-warehouse transfer workflows."
      },
      {
        "iconName": "RefreshCw",
        "title": "FIFO / FEFO / LIFO",
        "desc": "Configurable stock rotation methods with batch/lot tracking and expiry date management."
      },
      {
        "iconName": "Shield",
        "title": "Shrinkage & Theft Detection",
        "desc": "Variance reports, discrepancy alerts, and cycle count workflows to minimise inventory losses."
      },
      {
        "iconName": "TrendingUp",
        "title": "ABC / XYZ Analysis",
        "desc": "Automatic SKU classification for optimised storage, reorder priorities, and safety stock levels."
      },
      {
        "iconName": "Code2",
        "title": "API-First Architecture",
        "desc": "REST APIs for integration with ERP, e-commerce, logistics, and accounting platforms."
      },
      {
        "iconName": "Database",
        "title": "Comprehensive Audit Trail",
        "desc": "Every stock movement — receipt, issue, transfer, adjustment — logged with user, timestamp, and reason."
      }
    ],
    "useCases": [
      {
        "iconName": "ShoppingCart",
        "industry": "Retail & E-commerce",
        "desc": "Omnichannel stock sync, fulfilment rules, and loss prevention across physical and online stores."
      },
      {
        "iconName": "Factory",
        "industry": "Manufacturing",
        "desc": "Raw material tracking, WIP management, finished goods, and BOM-based consumption."
      },
      {
        "iconName": "HeartPulse",
        "industry": "Pharma & Healthcare",
        "desc": "Batch tracking, cold chain compliance, expiry management, and regulatory reporting."
      },
      {
        "iconName": "Truck",
        "industry": "Distribution & 3PL",
        "desc": "Multi-client warehouse management, pick-and-pack workflows, and real-time client portals."
      },
      {
        "iconName": "Landmark",
        "industry": "Hospitality & F&B",
        "desc": "Perishables tracking, recipe costing, waste analysis, and automated F&B procurement."
      }
    ],
    "process": [
      {
        "step": "01",
        "iconName": "Search",
        "title": "Operations Discovery",
        "desc": "Map warehouse layout, product catalogue, current workflows, and integration requirements."
      },
      {
        "step": "02",
        "iconName": "Layers",
        "title": "System Design",
        "desc": "Design data model, location hierarchy, barcode strategy, and integration architecture."
      },
      {
        "step": "03",
        "iconName": "Code2",
        "title": "Platform Development",
        "desc": "Build web platform, mobile warehouse app, APIs, and all third-party integrations."
      },
      {
        "step": "04",
        "iconName": "Users",
        "title": "Data Migration & Testing",
        "desc": "Migrate product master data, opening stock, and conduct full UAT with warehouse team."
      },
      {
        "step": "05",
        "iconName": "Rocket",
        "title": "Go-Live & Training",
        "desc": "Phased rollout with warehouse team training, hardware setup, and 30-day hypercare."
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
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      },
      {
        "name": "Docker",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
      },
      {
        "name": "TypeScript",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      },
      {
        "name": "MySQL",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
      }
    ],
    "faqs": [
      {
        "q": "Can this replace our Excel-based inventory tracking?",
        "a": "Absolutely — and it will be one of the best decisions you make. We migrate your existing product master data and opening stock balances, provide a parallel-run period, and train your team thoroughly before switching off Excel."
      },
      {
        "q": "Does it integrate with our accounting software?",
        "a": "Yes — we build integrations with Tally, QuickBooks, Zoho Books, Xero, and custom ERP systems. Stock movements automatically post journal entries to your accounting software in real time."
      },
      {
        "q": "How does it handle barcode scanning in the warehouse?",
        "a": "We provide a mobile-first warehouse app for iOS/Android that works with any Bluetooth or camera barcode scanner. The app works fully offline and syncs when connectivity is restored."
      },
      {
        "q": "Can we track inventory across multiple warehouse locations?",
        "a": "Yes — multi-warehouse is a core feature. You can have unlimited locations, zones, and bins, with inter-warehouse transfer workflows, location-specific stock reports, and a consolidated group view."
      }
    ]
  }
];

export const getAIServiceBySlug = (slug: string): AIServiceData | undefined =>
  aiSolutionsData.find((s) => s.slug === slug);
