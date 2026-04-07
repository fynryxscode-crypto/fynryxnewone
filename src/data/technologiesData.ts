export interface TechFAQ {
  q: string;
  a: string;
}

export interface TechRelated {
  name: string;
  logo: string;
}

export interface TechData {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  about: string;
  importance: string;
  heroGradient: string;
  accentFrom: string;
  accentTo: string;
  logoUrl: string;
  floatingBadges: string[];
  expertise: string[];
  relatedTech: TechRelated[];
  faqs: TechFAQ[];
}

const DEVICONS = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const technologiesData: TechData[] = [
  {
    slug: "adobe-xd",
    name: "Adobe XD",
    category: "UI/UX Design",
    tagline: "Craft stunning interactive prototypes and wireframes with the industry-leading UX design platform.",
    about:
      "Adobe XD is a powerful vector-based design and prototyping tool built specifically for UX/UI designers. It enables teams to create high-fidelity interactive prototypes, design systems, and detailed wireframes for web and mobile products.",
    importance:
      "In a competitive digital landscape, exceptional UX is a differentiator. Adobe XD bridges the gap between design and development — enabling rapid iteration, user testing, and seamless handoff to engineering teams.",
    heroGradient: "from-[#FF2BC2] via-[#7B2FFF] to-[#0a0f1e]",
    accentFrom: "from-pink-500",
    accentTo: "to-purple-600",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
    floatingBadges: ["Prototyping", "Design Systems", "Wireframing", "Auto-Animate"],
    expertise: [
      "Interactive prototype creation with advanced auto-animate transitions",
      "Scalable design systems and reusable component libraries",
      "Responsive layout design for mobile, tablet, and desktop breakpoints",
      "Developer handoff with precise CSS specs and asset export",
      "Collaborative design workflows with real-time co-editing",
      "Accessibility-first design with contrast and UX audit reviews",
    ],
    relatedTech: [
      { name: "Figma", logo: `${DEVICONS}/figma/figma-original.svg` },
      { name: "Photoshop", logo: `${DEVICONS}/photoshop/photoshop-plain.svg` },
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "CSS3", logo: `${DEVICONS}/css3/css3-original.svg` },
    ],
    faqs: [
      { q: "What types of projects do you design using Adobe XD?", a: "We design mobile apps, web platforms, SaaS dashboards, e-commerce interfaces, and enterprise portals — all tailored to your brand guidelines and user journey." },
      { q: "Do you deliver clickable prototypes?", a: "Yes. We deliver fully interactive, high-fidelity prototypes in Adobe XD that simulate real user flows for stakeholder reviews and user testing sessions." },
      { q: "Can you hand off XD designs directly to developers?", a: "Absolutely. We provide developer-ready XD files with annotated specs, asset exports (SVG/PNG/WebP), and CSS properties for pixel-perfect implementation." },
      { q: "How long does a typical UI/UX design project take?", a: "A standard mobile app design takes 2–4 weeks. Complex enterprise platforms can take 6–10 weeks depending on the number of screens and revisions required." },
    ],
  },
  {
    slug: "angular-js",
    name: "Angular JS",
    category: "Frontend Framework",
    tagline: "Build high-performance, maintainable single-page applications with Google's robust component-based framework.",
    about:
      "Angular is a TypeScript-based open-source web framework developed and maintained by Google. It provides a complete solution for building scalable enterprise SPAs with a strong opinionated structure, powerful CLI, and built-in tools for routing, forms, and HTTP.",
    importance:
      "Angular's dependency injection, reactive programming with RxJS, and strict TypeScript typing make it ideal for large enterprise teams where code maintainability, testability, and scalability are non-negotiable.",
    heroGradient: "from-[#DD0031] via-[#9c0022] to-[#0a0f1e]",
    accentFrom: "from-red-500",
    accentTo: "to-rose-700",
    logoUrl: `${DEVICONS}/angularjs/angularjs-original.svg`,
    floatingBadges: ["TypeScript", "RxJS", "SPA", "CLI"],
    expertise: [
      "Enterprise-grade SPA development with modular NgModule architecture",
      "Reactive state management using RxJS observables and NgRx store",
      "Lazy-loaded routing and code splitting for optimal performance",
      "Custom Angular directives, pipes, and reusable component libraries",
      "RESTful API and GraphQL integration with Angular HttpClient",
      "Unit testing with Jasmine/Karma and e2e testing with Playwright",
    ],
    relatedTech: [
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: "MongoDB", logo: `${DEVICONS}/mongodb/mongodb-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    faqs: [
      { q: "Is Angular suitable for large enterprise applications?", a: "Yes — Angular was built specifically for enterprise scale. Its strict architecture, TypeScript foundation, and CLI tooling make it the preferred choice for large teams building complex applications." },
      { q: "How does Angular compare to React or Vue?", a: "Angular is a full framework vs React/Vue which are libraries. Angular provides routing, forms, HTTP, testing — everything out of the box, reducing decisions for large teams." },
      { q: "Do you support upgrading from AngularJS (v1) to modern Angular?", a: "Yes. We have experience migrating legacy AngularJS applications to Angular 17+ using the hybrid bootstrapping approach with ngUpgrade." },
      { q: "What backend do you pair with Angular?", a: "We typically pair Angular with Node.js/Express, .NET Core, or Spring Boot APIs — with PostgreSQL or MongoDB as the database layer." },
    ],
  },
  {
    slug: "aws",
    name: "AWS",
    category: "Cloud Infrastructure",
    tagline: "Architect scalable, resilient, and cost-efficient cloud infrastructure with Amazon Web Services.",
    about:
      "Amazon Web Services (AWS) is the world's most comprehensive cloud platform, offering 200+ fully featured services from data centers globally. From compute (EC2, Lambda) to storage (S3), databases (RDS, DynamoDB), AI/ML, and DevOps — AWS powers millions of businesses.",
    importance:
      "AWS provides unmatched global reach, reliability, and depth of services. Its pay-as-you-go model, auto-scaling capabilities, and extensive managed services dramatically reduce operational overhead and time-to-market.",
    heroGradient: "from-[#FF9900] via-[#d97706] to-[#0a0f1e]",
    accentFrom: "from-orange-500",
    accentTo: "to-amber-600",
    logoUrl: `${DEVICONS}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    floatingBadges: ["EC2", "Lambda", "S3", "RDS", "CloudFront"],
    expertise: [
      "Cloud architecture design: VPC, subnets, IAM, security groups",
      "Serverless application development with AWS Lambda and API Gateway",
      "Container orchestration with ECS, EKS (Kubernetes), and Fargate",
      "CI/CD pipelines using CodePipeline, CodeBuild, and GitHub Actions",
      "Database management: RDS (PostgreSQL/MySQL), DynamoDB, ElastiCache",
      "Cost optimization, Reserved Instances planning, and AWS Well-Architected reviews",
    ],
    relatedTech: [
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
      { name: "Kubernetes", logo: `${DEVICONS}/kubernetes/kubernetes-plain.svg` },
      { name: "Terraform", logo: `${DEVICONS}/terraform/terraform-original.svg` },
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
    ],
    faqs: [
      { q: "Which AWS services do you specialise in?", a: "We specialise in EC2, Lambda, S3, RDS, ECS/EKS, CloudFront, API Gateway, DynamoDB, SQS/SNS, and Cognito — covering the full spectrum from compute to security." },
      { q: "Can you migrate our existing infrastructure to AWS?", a: "Yes. We perform lift-and-shift migrations, re-platforming to managed services, and full re-architecture to cloud-native serverless patterns." },
      { q: "How do you ensure our AWS infrastructure is secure?", a: "We implement IAM least-privilege policies, VPC isolation, WAF, GuardDuty, CloudTrail logging, encryption at rest/in-transit, and regular security audits." },
      { q: "Do you provide ongoing AWS management and support?", a: "Yes — we offer monthly retainer plans covering monitoring (CloudWatch), cost optimization, patching, incident response, and architecture reviews." },
    ],
  },
  {
    slug: "azure",
    name: "Azure",
    category: "Cloud Infrastructure",
    tagline: "Deploy intelligent hybrid cloud solutions with Microsoft Azure for enterprise-grade security and DevOps.",
    about:
      "Microsoft Azure is a leading cloud computing platform offering 200+ products including virtual machines, Azure Functions, Cosmos DB, Azure DevOps, Active Directory, and AI/Cognitive Services — tightly integrated with Microsoft's enterprise ecosystem.",
    importance:
      "Azure is the preferred cloud for enterprises already in the Microsoft ecosystem (Office 365, Teams, Active Directory). Its hybrid cloud capabilities, compliance certifications, and deep AI integrations make it essential for regulated industries.",
    heroGradient: "from-[#0078D4] via-[#005a9e] to-[#0a0f1e]",
    accentFrom: "from-blue-500",
    accentTo: "to-blue-700",
    logoUrl: `${DEVICONS}/azure/azure-original.svg`,
    floatingBadges: ["Azure DevOps", "AKS", "Cosmos DB", "AD B2C"],
    expertise: [
      "Azure Virtual Machines, App Services, and Azure Functions deployment",
      "Azure DevOps CI/CD pipelines, Boards, and Repos configuration",
      "Azure Kubernetes Service (AKS) cluster management and scaling",
      "Identity and access with Azure Active Directory and B2C",
      "Cosmos DB, Azure SQL, and Blob Storage architecture",
      "Azure Monitor, Application Insights, and Log Analytics setup",
    ],
    relatedTech: [
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
      { name: "Kubernetes", logo: `${DEVICONS}/kubernetes/kubernetes-plain.svg` },
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "Terraform", logo: `${DEVICONS}/terraform/terraform-original.svg` },
    ],
    faqs: [
      { q: "Is Azure better than AWS for enterprise workloads?", a: "Azure excels for enterprises using Microsoft technologies (Windows Server, SQL Server, Office 365, Active Directory) due to native integrations, hybrid connectivity, and unified licensing." },
      { q: "Can you set up Azure DevOps pipelines for our team?", a: "Yes. We design and implement full CI/CD pipelines covering build, test, staging, and production deployments with branch strategies and approval gates." },
      { q: "Do you support Azure hybrid cloud configurations?", a: "Absolutely — Azure Arc and Azure Stack are our specialty for organisations that need to extend Azure management to on-premises or multi-cloud environments." },
      { q: "How do you handle Azure cost management?", a: "We implement Azure Cost Management + Billing dashboards, set budgets and alerts, right-size VMs, and use Reserved Instances to reduce your monthly cloud spend by 30–50%." },
    ],
  },
  {
    slug: "database",
    name: "Database",
    category: "Data Engineering",
    tagline: "Design and manage robust relational and NoSQL databases that power high-throughput applications at scale.",
    about:
      "Database engineering encompasses the design, optimisation, and management of both relational (PostgreSQL, MySQL, SQL Server) and non-relational (MongoDB, Redis, Cassandra) data stores — ensuring your application's data layer is fast, consistent, and highly available.",
    importance:
      "Every digital product is fundamentally a data problem. Poorly designed schemas cause slow queries, data corruption, and scaling bottlenecks. Expert database architecture is the difference between an app that handles 100 users and one that handles 10 million.",
    heroGradient: "from-[#00b09b] via-[#00796b] to-[#0a0f1e]",
    accentFrom: "from-teal-500",
    accentTo: "to-emerald-600",
    logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg`,
    floatingBadges: ["PostgreSQL", "MySQL", "Redis", "Indexing"],
    expertise: [
      "Relational schema design: normalisation, foreign keys, indexing strategies",
      "NoSQL data modelling for MongoDB, DynamoDB, and Cassandra",
      "Query optimisation: execution plans, EXPLAIN analysis, index tuning",
      "Database replication, sharding, and high-availability cluster setup",
      "Automated backups, point-in-time recovery, and disaster recovery planning",
      "Database migration and zero-downtime schema change management",
    ],
    relatedTech: [
      { name: "PostgreSQL", logo: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", logo: `${DEVICONS}/mongodb/mongodb-original.svg` },
      { name: "Redis", logo: `${DEVICONS}/redis/redis-original.svg` },
      { name: "MySQL", logo: `${DEVICONS}/mysql/mysql-original.svg` },
    ],
    faqs: [
      { q: "Should I use a SQL or NoSQL database for my project?", a: "SQL (PostgreSQL, MySQL) is best for complex relational data, transactions, and strict consistency. NoSQL (MongoDB, DynamoDB) excels for flexible schemas, high write throughput, and horizontal scaling." },
      { q: "How do you handle database migrations without downtime?", a: "We use expand-contract migration patterns, feature flags, and blue-green deployments to apply schema changes safely without taking your application offline." },
      { q: "Can you optimise our slow database queries?", a: "Yes. We analyse query execution plans, add targeted indexes, rewrite inefficient queries, implement caching with Redis, and where necessary denormalise for read performance." },
      { q: "Do you set up database monitoring and alerting?", a: "Absolutely. We configure metrics for query latency, connection pool saturation, replication lag, and disk I/O — with PagerDuty or Slack alerts for threshold breaches." },
    ],
  },
  {
    slug: "figma",
    name: "Figma",
    category: "UI/UX Design",
    tagline: "Collaborate and ship pixel-perfect designs faster with the cloud-based platform that unifies design and dev handoff.",
    about:
      "Figma is the industry-standard collaborative design platform that allows designers and developers to work simultaneously on UI/UX designs, design systems, and interactive prototypes — all in a browser-based environment with real-time multiplayer collaboration.",
    importance:
      "Figma eliminates the traditional design-to-development gap. With shared design tokens, component libraries, and direct developer inspect mode, teams ship consistent, production-ready designs significantly faster than with traditional tools.",
    heroGradient: "from-[#A259FF] via-[#7B2FFF] to-[#0a0f1e]",
    accentFrom: "from-violet-500",
    accentTo: "to-purple-700",
    logoUrl: `${DEVICONS}/figma/figma-original.svg`,
    floatingBadges: ["Components", "Auto Layout", "Variables", "Dev Mode"],
    expertise: [
      "Comprehensive design systems with tokens, styles, and reusable components",
      "Responsive auto-layout frames for mobile, tablet, and desktop viewports",
      "Advanced prototyping: conditional flows, smart animations, overlay modals",
      "Figma Variables and Modes for light/dark theme switching",
      "Developer handoff with inspect mode, code snippets, and asset export",
      "Collaborative design sprints: FigJam brainstorming to high-fidelity delivery",
    ],
    relatedTech: [
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "CSS3", logo: `${DEVICONS}/css3/css3-original.svg` },
      { name: "HTML5", logo: `${DEVICONS}/html5/html5-original.svg` },
    ],
    faqs: [
      { q: "Do you create design systems in Figma that scale across products?", a: "Yes — we build enterprise design systems with atomic components, design tokens, responsive variants, and documentation that scales across multiple products and teams." },
      { q: "Can you convert existing designs from Sketch or Adobe XD to Figma?", a: "Absolutely. We migrate design files, rebuild component libraries in Figma's native format, and ensure full fidelity across all screens and interactions." },
      { q: "How do you ensure designs translate accurately to code?", a: "We use Figma's Dev Mode, structured naming conventions, design tokens that map to CSS variables, and coordinate directly with developers during the handoff phase." },
      { q: "How many revisions are included in a Figma design project?", a: "Our standard projects include 3 rounds of revisions per milestone. We follow a structured review process — wireframe approval → visual design → interactive prototype — to minimise rework." },
    ],
  },
  {
    slug: "flutter",
    name: "Flutter",
    category: "Mobile Development",
    tagline: "Build natively compiled, beautiful apps for mobile, web, and desktop from a single Dart codebase.",
    about:
      "Flutter is Google's open-source UI toolkit that enables developers to build natively compiled applications for mobile (iOS & Android), web, and desktop from a single codebase using the Dart programming language and a rich set of pre-built material widgets.",
    importance:
      "Flutter dramatically reduces development time and cost by eliminating the need for separate iOS and Android codebases. Its widget-based rendering engine delivers native 60fps performance and pixel-perfect UI across all platforms.",
    heroGradient: "from-[#54C5F8] via-[#01579B] to-[#0a0f1e]",
    accentFrom: "from-sky-400",
    accentTo: "to-blue-700",
    logoUrl: `${DEVICONS}/flutter/flutter-original.svg`,
    floatingBadges: ["Dart", "BLoC", "GetX", "Riverpod"],
    expertise: [
      "Cross-platform Flutter development for iOS, Android, Web, and Desktop",
      "State management with BLoC, Riverpod, GetX, and Provider patterns",
      "Custom widget development and advanced animation (Rive, Lottie)",
      "Firebase integration: Auth, Firestore, Cloud Messaging, Analytics",
      "Native platform channel integration for device-specific APIs",
      "App Store and Google Play deployment with CI/CD via Codemagic",
    ],
    relatedTech: [
      { name: "Dart", logo: `${DEVICONS}/dart/dart-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "Android", logo: `${DEVICONS}/android/android-original.svg` },
      { name: "Google Cloud", logo: `${DEVICONS}/googlecloud/googlecloud-original.svg` },
    ],
    faqs: [
      { q: "Does a Flutter app look and feel native on both iOS and Android?", a: "Yes. Flutter renders directly to the canvas using its own Skia/Impeller engine, delivering pixel-perfect native-feeling animations at 60fps on both platforms." },
      { q: "How does Flutter compare to React Native?", a: "Flutter uses its own rendering engine (no JavaScript bridge), giving it superior performance and consistent UI. React Native relies on native components which can behave differently per platform." },
      { q: "Can Flutter apps access native device features like camera, GPS, and BLE?", a: "Absolutely — via platform channels and a rich ecosystem of pub.dev packages for camera, location, Bluetooth, biometrics, payments, and more." },
      { q: "What is the typical Flutter app development timeline?", a: "An MVP Flutter app with 8–12 screens typically takes 6–10 weeks. Complex apps with real-time features, payments, and custom UI can take 3–6 months." },
    ],
  },
  {
    slug: "google-cloud",
    name: "Google Cloud",
    category: "Cloud Infrastructure",
    tagline: "Harness Google's global infrastructure, BigQuery analytics, and AI APIs to build next-generation applications.",
    about:
      "Google Cloud Platform (GCP) provides a suite of cloud computing services that run on the same infrastructure Google uses internally. Key offerings include Compute Engine, GKE (Kubernetes), BigQuery, Cloud Run, Firestore, and Vertex AI.",
    importance:
      "GCP excels in data analytics (BigQuery), machine learning (Vertex AI, TensorFlow), and container orchestration (GKE — the original Kubernetes). It's the preferred choice for data-heavy and AI-first applications.",
    heroGradient: "from-[#4285F4] via-[#34A853] to-[#0a0f1e]",
    accentFrom: "from-blue-500",
    accentTo: "to-green-600",
    logoUrl: `${DEVICONS}/googlecloud/googlecloud-original.svg`,
    floatingBadges: ["BigQuery", "GKE", "Cloud Run", "Vertex AI"],
    expertise: [
      "GCP infrastructure setup: VPC, Cloud NAT, Load Balancers, Cloud DNS",
      "Managed Kubernetes with GKE Autopilot and standard clusters",
      "Serverless deployment using Cloud Run, Cloud Functions, and App Engine",
      "BigQuery data warehousing, partitioned tables, and BI dashboards",
      "Vertex AI model training, deployment, and MLOps pipelines",
      "Cloud Armor WAF, IAM, Secret Manager, and VPC Service Controls",
    ],
    relatedTech: [
      { name: "Kubernetes", logo: `${DEVICONS}/kubernetes/kubernetes-plain.svg` },
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
      { name: "Terraform", logo: `${DEVICONS}/terraform/terraform-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    faqs: [
      { q: "When should I choose GCP over AWS or Azure?", a: "GCP is the best choice when your workload involves large-scale data analytics (BigQuery), machine learning (Vertex AI), or Kubernetes (GKE — the original K8s platform)." },
      { q: "Can you migrate our data warehouse to BigQuery?", a: "Yes. We migrate from Redshift, Snowflake, or on-premises warehouses to BigQuery, including ETL pipeline rebuilding, schema mapping, and dashboard migration." },
      { q: "Do you offer GCP cost optimisation services?", a: "Yes — we analyse your billing reports, implement committed use discounts, right-size instances, use Cloud Run for event-driven workloads, and eliminate idle resources." },
      { q: "Can you integrate GCP AI services into our existing application?", a: "Absolutely. We integrate Vision AI, Natural Language API, Speech-to-Text, Translation API, and custom Vertex AI models into web and mobile applications via REST or gRPC." },
    ],
  },
  {
    slug: "java",
    name: "Java",
    category: "Backend Development",
    tagline: "Build enterprise-grade backends and microservices with the world's most proven programming language.",
    about:
      "Java is a class-based, object-oriented programming language designed for portability (write once, run anywhere). It powers everything from enterprise backends (Spring Boot) and Android apps to large-scale distributed systems at companies like LinkedIn, Netflix, and Amazon.",
    importance:
      "Java's mature ecosystem, strong typing, JVM performance, and vast library support make it the backbone of enterprise software. Spring Boot has made Java the gold standard for microservices and REST API development.",
    heroGradient: "from-[#f89820] via-[#e65100] to-[#0a0f1e]",
    accentFrom: "from-orange-400",
    accentTo: "to-red-600",
    logoUrl: `${DEVICONS}/java/java-original.svg`,
    floatingBadges: ["Spring Boot", "Hibernate", "Maven", "JPA"],
    expertise: [
      "Spring Boot microservices with REST APIs and Spring Security",
      "Hibernate ORM and Spring Data JPA for relational database mapping",
      "Event-driven architecture with Apache Kafka and Spring Events",
      "Reactive programming with Spring WebFlux and Project Reactor",
      "Unit and integration testing with JUnit 5, Mockito, and Testcontainers",
      "Dockerized Java deployments and Kubernetes-native configurations",
    ],
    relatedTech: [
      { name: "Spring", logo: `${DEVICONS}/spring/spring-original.svg` },
      { name: "PostgreSQL", logo: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
      { name: "Kafka", logo: `${DEVICONS}/apachekafka/apachekafka-original.svg` },
    ],
    faqs: [
      { q: "Is Java still relevant in 2024 for new projects?", a: "Absolutely. Java remains the #1 enterprise backend language. Spring Boot, combined with Java 21 virtual threads (Project Loom), makes it more performant than ever for microservices." },
      { q: "Do you build Android apps with Java or Kotlin?", a: "For new Android projects we recommend Kotlin (Google's preferred language), but we fully support Java Android development for teams with existing Java codebases." },
      { q: "Can you modernise a legacy Java monolith into microservices?", a: "Yes — we apply the strangler fig pattern to incrementally extract microservices from monoliths, using Spring Cloud for service discovery, API gateway, and distributed tracing." },
      { q: "What databases do you use with Java applications?", a: "We typically use PostgreSQL or MySQL with Spring Data JPA/Hibernate, MongoDB with Spring Data MongoDB, and Redis for caching — all managed via Docker Compose or Kubernetes." },
    ],
  },
  {
    slug: "kotlin",
    name: "Kotlin",
    category: "Mobile Development",
    tagline: "Build expressive, concise, and safety-first Android and server-side applications with JetBrains' modern language.",
    about:
      "Kotlin is a modern, statically typed programming language developed by JetBrains, fully interoperable with Java. It is Google's preferred language for Android development and also supports server-side (Ktor, Spring), multiplatform (KMP), and scripting use cases.",
    importance:
      "Kotlin eliminates Java's verbosity and null-pointer exceptions. Its coroutines model simplifies async programming, while Kotlin Multiplatform enables sharing business logic between Android and iOS — dramatically reducing duplication.",
    heroGradient: "from-[#7F52FF] via-[#5C2D91] to-[#0a0f1e]",
    accentFrom: "from-violet-500",
    accentTo: "to-indigo-700",
    logoUrl: `${DEVICONS}/kotlin/kotlin-original.svg`,
    floatingBadges: ["Coroutines", "Jetpack Compose", "KMP", "Ktor"],
    expertise: [
      "Native Android development with Kotlin and Jetpack Compose",
      "Kotlin Coroutines and Flow for structured async/reactive programming",
      "Kotlin Multiplatform (KMP) for shared business logic on iOS and Android",
      "Ktor framework for lightweight Kotlin backend API development",
      "Room database, DataStore, and WorkManager Jetpack integrations",
      "MVVM and MVI architectural patterns with Clean Architecture",
    ],
    relatedTech: [
      { name: "Android", logo: `${DEVICONS}/android/android-original.svg` },
      { name: "Java", logo: `${DEVICONS}/java/java-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "Gradle", logo: `${DEVICONS}/gradle/gradle-plain.svg` },
    ],
    faqs: [
      { q: "Should I use Kotlin or Java for a new Android app?", a: "Kotlin is Google's official preferred language for Android. It offers null-safety, extension functions, coroutines, and Compose — making it significantly more productive than Java for modern Android." },
      { q: "What is Kotlin Multiplatform and should I use it?", a: "KMP lets you write shared business logic (models, repositories, use cases) once in Kotlin and use it from both Android and iOS — reducing code duplication without sacrificing native UI on each platform." },
      { q: "Do you use Jetpack Compose or XML for UI?", a: "For new projects we use Jetpack Compose exclusively. It's Google's modern declarative UI toolkit that dramatically simplifies UI development and eliminates XML boilerplate." },
      { q: "Can Kotlin be used for backend development?", a: "Yes — Ktor and Spring Boot both work excellently with Kotlin. Ktor is a lightweight Kotlin-native framework ideal for microservices, while Spring Boot benefits from Kotlin's conciseness." },
    ],
  },
  {
    slug: "next-js",
    name: "Next.js",
    category: "Frontend Framework",
    tagline: "Ship production-ready, SEO-optimised React applications with SSR, static generation, and edge-ready APIs.",
    about:
      "Next.js is a React meta-framework developed by Vercel that provides server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), App Router, Server Components, and built-in API routes — making it the leading choice for production React applications.",
    importance:
      "Next.js solves React's fundamental limitations of poor SEO and slow initial load. Its hybrid rendering model (SSR/SSG/ISR), automatic code splitting, and edge runtime make it the framework of choice for performance-critical web applications.",
    heroGradient: "from-[#333333] via-[#111111] to-[#0a0f1e]",
    accentFrom: "from-slate-400",
    accentTo: "to-slate-600",
    logoUrl: `${DEVICONS}/nextjs/nextjs-original.svg`,
    floatingBadges: ["App Router", "Server Components", "ISR", "Edge Runtime"],
    expertise: [
      "App Router architecture with Server and Client Component patterns",
      "Hybrid rendering: SSR, SSG, ISR, and partial pre-rendering strategies",
      "Next.js API Routes and Server Actions for full-stack development",
      "Image optimisation, font optimisation, and Core Web Vitals tuning",
      "Middleware for auth, A/B testing, localisation, and edge rewrites",
      "Deployment to Vercel, AWS (Amplify/ECS), and self-hosted Node.js",
    ],
    relatedTech: [
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "Tailwind CSS", logo: `${DEVICONS}/tailwindcss/tailwindcss-plain.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
    ],
    faqs: [
      { q: "Should I use Next.js App Router or Pages Router?", a: "For new projects, always use App Router (Next.js 13+). It enables React Server Components, nested layouts, and streaming — offering significant performance and DX improvements." },
      { q: "Can Next.js replace a separate backend API?", a: "For many use cases, yes. Server Actions and API Routes handle form submissions, database queries, and third-party API calls — reducing infrastructure complexity significantly." },
      { q: "How do you handle authentication in Next.js?", a: "We implement Auth.js (NextAuth), Clerk, or Supabase Auth depending on project requirements — with session management via server-side cookies and middleware-based route protection." },
      { q: "How does Next.js improve SEO?", a: "Next.js generates fully-rendered HTML for search engine crawlers via SSR/SSG, enables metadata API for dynamic OG tags, and optimises Core Web Vitals — resulting in significantly better search rankings vs client-only React." },
    ],
  },
  {
    slug: "node-js",
    name: "Node.js",
    category: "Backend Development",
    tagline: "Power real-time APIs, microservices, and scalable backends with the event-driven JavaScript runtime.",
    about:
      "Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. Its non-blocking I/O and event-driven architecture make it exceptionally suited for building fast, scalable API servers, real-time applications (WebSockets), and microservices.",
    importance:
      "Node.js enables JavaScript full-stack development, allowing teams to share code and skills between frontend and backend. Its npm ecosystem (2M+ packages) and async-first model make it the fastest way to build production-grade APIs.",
    heroGradient: "from-[#68A063] via-[#3c7a3c] to-[#0a0f1e]",
    accentFrom: "from-green-500",
    accentTo: "to-emerald-700",
    logoUrl: `${DEVICONS}/nodejs/nodejs-original.svg`,
    floatingBadges: ["Express", "Fastify", "WebSockets", "REST/GraphQL"],
    expertise: [
      "RESTful API development with Express.js and Fastify frameworks",
      "GraphQL API design with Apollo Server and schema-first approach",
      "Real-time applications using Socket.IO and WebSocket protocol",
      "Authentication with JWT, OAuth2.0, Passport.js, and session management",
      "Microservices with message queues (RabbitMQ, Kafka) and gRPC",
      "Performance profiling, clustering, PM2, and Node.js memory optimisation",
    ],
    relatedTech: [
      { name: "MongoDB", logo: `${DEVICONS}/mongodb/mongodb-original.svg` },
      { name: "Redis", logo: `${DEVICONS}/redis/redis-original.svg` },
      { name: "PostgreSQL", logo: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    faqs: [
      { q: "Is Node.js suitable for CPU-intensive applications?", a: "Node.js excels at I/O-bound tasks. For CPU-intensive work, we use Worker Threads, offload processing to background services, or delegate to Python/Go microservices." },
      { q: "Express.js vs Fastify — which do you use?", a: "We use Fastify for performance-critical APIs (2-3x faster than Express) and Express for projects requiring maximum community plugin support. Both are excellent choices." },
      { q: "How do you scale Node.js applications?", a: "We use horizontal scaling with PM2 clustering, containerise with Docker, deploy to Kubernetes or AWS ECS, and use Redis for shared session and cache storage across instances." },
      { q: "Can you build real-time chat or notification features with Node.js?", a: "Yes — Socket.IO on Node.js is our go-to for real-time bidirectional communication, used for chat, live dashboards, collaborative editing, and push notifications." },
    ],
  },
  {
    slug: "nosql-mongo-db-",
    name: "MongoDB",
    category: "Database",
    tagline: "Store and query flexible, schema-less documents at massive scale with the world's leading NoSQL database.",
    about:
      "MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents. Its dynamic schema, horizontal scaling via sharding, and rich aggregation pipeline make it ideal for applications with evolving data models and high write throughput.",
    importance:
      "MongoDB's document model maps naturally to application objects, eliminating the object-relational impedance mismatch. Atlas, its managed cloud offering, provides global clusters, search, vector search, and real-time analytics in a single platform.",
    heroGradient: "from-[#00ED64] via-[#00684A] to-[#0a0f1e]",
    accentFrom: "from-emerald-400",
    accentTo: "to-green-700",
    logoUrl: `${DEVICONS}/mongodb/mongodb-original.svg`,
    floatingBadges: ["Atlas", "Aggregation", "Sharding", "Vector Search"],
    expertise: [
      "Document schema design, embedding vs referencing patterns, and indexing",
      "Aggregation pipeline for complex analytics, transformations, and reporting",
      "MongoDB Atlas setup: clusters, Atlas Search, and Vector Search",
      "Replica set configuration for high availability and automatic failover",
      "Horizontal scaling via range-based and hashed sharding strategies",
      "Mongoose ODM integration for Node.js with schema validation and middleware",
    ],
    relatedTech: [
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: "Redis", logo: `${DEVICONS}/redis/redis-original.svg` },
      { name: "Express", logo: `${DEVICONS}/express/express-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    faqs: [
      { q: "When should I choose MongoDB over PostgreSQL?", a: "Choose MongoDB when your data is hierarchical/document-oriented, your schema will evolve rapidly, you need horizontal sharding, or you're building content, catalogue, or event-driven applications." },
      { q: "Is MongoDB suitable for financial or transactional applications?", a: "Yes — MongoDB supports ACID multi-document transactions since v4.0. It is used in production at major financial institutions for specific use cases." },
      { q: "What is MongoDB Atlas and do I need it?", a: "Atlas is MongoDB's fully managed cloud offering on AWS/Azure/GCP. It handles backups, scaling, security, and monitoring — we strongly recommend it over self-hosted MongoDB for most production applications." },
      { q: "How do you optimise MongoDB performance?", a: "We analyse slow query logs, create compound indexes aligned with query patterns, use the aggregation pipeline efficiently, enable Atlas Search for text queries, and implement application-level caching with Redis." },
    ],
  },
  {
    slug: "photoshop",
    name: "Photoshop",
    category: "Creative Design",
    tagline: "Craft stunning visual assets, UI mockups, and marketing creatives with the gold standard in image editing.",
    about:
      "Adobe Photoshop is the world's leading raster graphics editor and digital image manipulation software. Used by designers, photographers, and marketers globally, it enables pixel-level editing, compositing, retouching, and the creation of professional-grade visual assets.",
    importance:
      "Photoshop is essential for creating compelling marketing visuals, photo-realistic UI mockups, and rich digital assets that elevate brand perception. High-quality visuals are directly correlated with user trust and conversion rates.",
    heroGradient: "from-[#001D34] via-[#00355F] to-[#0a0f1e]",
    accentFrom: "from-blue-700",
    accentTo: "to-cyan-500",
    logoUrl: `${DEVICONS}/photoshop/photoshop-plain.svg`,
    floatingBadges: ["Retouching", "Compositing", "Smart Objects", "Actions"],
    expertise: [
      "Professional photo editing, retouching, and colour grading",
      "Marketing banner creation: social media, Google Ads, print, and email",
      "UI mockup creation with smart objects and responsive artboards",
      "Background removal, compositing, and multi-layer manipulation",
      "Brand asset creation: icons, illustrations, textures, and patterns",
      "Batch processing with Actions and droplets for large asset libraries",
    ],
    relatedTech: [
      { name: "Figma", logo: `${DEVICONS}/figma/figma-original.svg` },
      { name: "Illustrator", logo: `${DEVICONS}/illustrator/illustrator-plain.svg` },
      { name: "HTML5", logo: `${DEVICONS}/html5/html5-original.svg` },
      { name: "CSS3", logo: `${DEVICONS}/css3/css3-original.svg` },
    ],
    faqs: [
      { q: "What types of assets do you create in Photoshop?", a: "We create social media graphics, email banners, app screenshots, hero images, product renders, UI mockups, digital illustrations, and print-ready marketing collateral." },
      { q: "Can you retouch and edit existing brand photography?", a: "Yes — we offer professional photo retouching including skin retouching, background replacement, colour correction, product photo optimisation, and creative compositing." },
      { q: "What file formats do you deliver?", a: "We deliver web-optimised PNG/WebP/JPEG, print-ready TIFF/PDF (300dpi+), layered PSD source files, and vector-ready assets depending on your usage requirements." },
      { q: "Do you create animated visuals and GIF banners?", a: "Yes — we create animated GIF and APNG banners using Photoshop's Timeline, as well as export-ready HTML5 banner assets for Google Display Network campaigns." },
    ],
  },
  {
    slug: "php",
    name: "PHP",
    category: "Backend Development",
    tagline: "Build dynamic, data-driven web applications and RESTful APIs with the language powering 79% of the web.",
    about:
      "PHP is a widely-used general-purpose server-side scripting language especially suited for web development. Modern PHP (8.x) with frameworks like Laravel and Symfony powers enterprise-grade web applications, CMS platforms (WordPress, Drupal), and high-traffic APIs.",
    importance:
      "PHP's massive hosting ecosystem, WordPress dominance (43% of the web), and Laravel's elegant developer experience make it the most pragmatic choice for content-driven platforms, e-commerce (WooCommerce, Magento), and rapid API development.",
    heroGradient: "from-[#8892BF] via-[#4F5B93] to-[#0a0f1e]",
    accentFrom: "from-indigo-400",
    accentTo: "to-blue-700",
    logoUrl: `${DEVICONS}/php/php-original.svg`,
    floatingBadges: ["Laravel", "Symfony", "WordPress", "Composer"],
    expertise: [
      "Laravel application development with Eloquent ORM and Blade templates",
      "RESTful API development with Laravel Sanctum/Passport authentication",
      "WordPress custom theme and plugin development",
      "E-commerce development with WooCommerce and Magento",
      "Symfony component-based architecture for modular applications",
      "PHP 8.x features: fibers, named args, match expressions, enums",
    ],
    relatedTech: [
      { name: "MySQL", logo: `${DEVICONS}/mysql/mysql-original.svg` },
      { name: "Redis", logo: `${DEVICONS}/redis/redis-original.svg` },
      { name: "Nginx", logo: `${DEVICONS}/nginx/nginx-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    faqs: [
      { q: "Is PHP still a good choice for new projects in 2024?", a: "Absolutely. PHP 8.3 with Laravel 11 rivals Node.js in DX and performance. Laravel's ecosystem (Livewire, Filament, Octane) enables rapid development of modern web applications." },
      { q: "Do you develop WordPress sites from scratch?", a: "Yes — we build custom WordPress themes, WooCommerce stores, and plugins. We also develop headless WordPress backends with Next.js or Nuxt.js frontends consuming the WP REST API." },
      { q: "Can you migrate a legacy PHP application to Laravel?", a: "Yes. We incrementally migrate legacy PHP codebases to Laravel using routing wrappers, service containers, and Eloquent models — maintaining functionality throughout the migration." },
      { q: "How do you handle performance in PHP applications?", a: "We use OPcache for bytecode caching, Redis/Memcached for application caching, queue workers for async jobs, CDN for static assets, and Laravel Octane (Swoole/RoadRunner) for high-concurrency scenarios." },
    ],
  },
  {
    slug: "python",
    name: "Python",
    category: "Backend & AI/ML",
    tagline: "From AI/ML pipelines to web backends and data engineering — leverage Python's rich ecosystem for intelligent solutions.",
    about:
      "Python is a high-level, general-purpose programming language celebrated for its readability and versatility. It dominates AI/ML (TensorFlow, PyTorch, scikit-learn), data engineering (Pandas, Spark), web backends (Django, FastAPI), and automation scripting.",
    importance:
      "Python's dominance in AI/ML is unrivalled, making it the essential language for any company building intelligent products. Its extensive scientific computing libraries and fast prototyping capabilities accelerate innovation across every industry.",
    heroGradient: "from-[#3776AB] via-[#FFD43B] to-[#0a0f1e]",
    accentFrom: "from-blue-500",
    accentTo: "to-yellow-500",
    logoUrl: `${DEVICONS}/python/python-original.svg`,
    floatingBadges: ["FastAPI", "Django", "PyTorch", "Pandas"],
    expertise: [
      "FastAPI and Django REST Framework API development with OpenAPI docs",
      "Machine learning model development with scikit-learn, XGBoost, and LightGBM",
      "Deep learning with PyTorch and TensorFlow for CV, NLP, and generative AI",
      "Data pipelines with Apache Airflow, Prefect, and pandas/polars ETL",
      "LLM integration with LangChain, LlamaIndex, and OpenAI/Anthropic APIs",
      "Web scraping and automation with Playwright, Scrapy, and BeautifulSoup",
    ],
    relatedTech: [
      { name: "PostgreSQL", logo: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: "Redis", logo: `${DEVICONS}/redis/redis-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
      { name: "Jupyter", logo: `${DEVICONS}/jupyter/jupyter-original.svg` },
    ],
    faqs: [
      { q: "Do you use Python for AI chatbot development?", a: "Yes — we build AI chatbots using LangChain, LlamaIndex, and vector databases (Pinecone, Weaviate) with Python backends exposed via FastAPI, integrated into any web or mobile frontend." },
      { q: "Can you build data pipelines and ETL processes in Python?", a: "Absolutely. We design and deploy production data pipelines using Apache Airflow or Prefect for orchestration, with pandas/polars for transformation and SQLAlchemy for database connectivity." },
      { q: "What is FastAPI and why do you prefer it over Django?", a: "FastAPI is a modern, async Python web framework with automatic OpenAPI documentation and Pydantic validation — 2-3x faster than Flask/Django. We use Django for full-featured web apps and FastAPI for high-performance APIs." },
      { q: "Can you train and deploy custom machine learning models?", a: "Yes — from data cleaning and feature engineering to model training, evaluation, and deployment (REST API or batch inference) using MLflow, BentoML, or cloud ML platforms." },
    ],
  },
  {
    slug: "react-native",
    name: "React Native",
    category: "Mobile Development",
    tagline: "Ship truly native iOS and Android experiences from a single React codebase with deep platform integration.",
    about:
      "React Native is Facebook's open-source mobile application framework that lets developers build native mobile apps using JavaScript and React. With the new Architecture (JSI, Fabric, TurboModules), React Native delivers near-native performance with a shared codebase.",
    importance:
      "React Native enables web development teams to build mobile apps without learning native languages — dramatically reducing cost. Its large ecosystem, Expo toolkit, and new Architecture improvements make it a viable choice for most consumer mobile applications.",
    heroGradient: "from-[#61DAFB] via-[#0284c7] to-[#0a0f1e]",
    accentFrom: "from-cyan-400",
    accentTo: "to-blue-600",
    logoUrl: `${DEVICONS}/react/react-original.svg`,
    floatingBadges: ["Expo", "New Architecture", "JSI", "Navigation"],
    expertise: [
      "React Native development for iOS and Android with Expo and bare workflow",
      "React Navigation v6 with stack, tab, and drawer navigators",
      "State management with Redux Toolkit, Zustand, and React Query",
      "Native module integration (Camera, Bluetooth, Biometrics, Maps)",
      "Animated API and Reanimated 3 for 60fps gesture-driven animations",
      "OTA updates with Expo EAS and CI/CD with GitHub Actions",
    ],
    relatedTech: [
      { name: "React", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
    ],
    faqs: [
      { q: "React Native vs Flutter — which should I choose?", a: "React Native is better if your team has existing React/JavaScript expertise and you need tight native module integration. Flutter offers superior performance and pixel-perfect UI consistency. Both are excellent for most apps." },
      { q: "What is Expo and should I use it?", a: "Expo is a framework built on React Native that dramatically accelerates development. We recommend Expo EAS (Expo Application Services) for most new projects — it handles builds, submissions, and OTA updates." },
      { q: "Can a React Native app access native device APIs?", a: "Yes — via community packages and custom native modules for camera, GPS, Bluetooth, notifications, biometrics, payments (Stripe), and any native SDK." },
      { q: "How is the new React Native Architecture different?", a: "The new Architecture (JSI, Fabric, TurboModules) eliminates the JavaScript bridge bottleneck, enabling synchronous native calls and shared memory between JS and native threads — significantly improving performance." },
    ],
  },
  {
    slug: "swift-ios",
    name: "Swift iOS",
    category: "Mobile Development",
    tagline: "Deliver blazing-fast, expressive iOS and macOS applications using Apple's modern first-class programming language.",
    about:
      "Swift is Apple's open-source, type-safe programming language for iOS, macOS, watchOS, and tvOS development. Combined with SwiftUI's declarative UI framework and Xcode's complete toolchain, Swift is the fastest path to native Apple platform applications.",
    importance:
      "Native iOS development with Swift ensures maximum performance, full access to Apple platform APIs (ARKit, HealthKit, CoreML, StoreKit), and the highest-quality app experience on Apple's tightly optimised hardware.",
    heroGradient: "from-[#FA7343] via-[#d14d1e] to-[#0a0f1e]",
    accentFrom: "from-orange-400",
    accentTo: "to-red-600",
    logoUrl: `${DEVICONS}/swift/swift-original.svg`,
    floatingBadges: ["SwiftUI", "Combine", "CoreData", "ARKit"],
    expertise: [
      "SwiftUI declarative UI development with animations and custom components",
      "UIKit for complex custom UI requiring fine-grained control",
      "Combine framework for reactive data flow and async/await concurrency",
      "Core Data and SwiftData for local persistence and sync",
      "Apple platform integrations: Sign in with Apple, HealthKit, ARKit, CoreML",
      "App Store submission, TestFlight beta distribution, and CI/CD with Xcode Cloud",
    ],
    relatedTech: [
      { name: "Xcode", logo: `${DEVICONS}/xcode/xcode-original.svg` },
      { name: "Firebase", logo: `${DEVICONS}/firebase/firebase-plain.svg` },
      { name: "React Native", logo: `${DEVICONS}/react/react-original.svg` },
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
    ],
    faqs: [
      { q: "SwiftUI vs UIKit — which do you use?", a: "For new iOS 16+ projects we use SwiftUI for its productivity and modern animations. For complex custom UI (fully custom gestures, custom rendering) we use UIKit or a hybrid approach." },
      { q: "Can you integrate CoreML and AI features into an iOS app?", a: "Yes — we integrate on-device CoreML models, Apple's Vision framework for image analysis, Natural Language framework for NLP, and cloud AI APIs directly into iOS apps." },
      { q: "How do you ensure App Store approval?", a: "We follow Apple's Human Interface Guidelines, implement required privacy disclosures (Privacy Manifest), handle all App Store Review Guidelines, and have a >98% first-submission approval rate." },
      { q: "Do you support tvOS, macOS, and watchOS alongside iOS?", a: "Yes — Swift and SwiftUI support all Apple platforms. We build multi-platform apps from a single Swift codebase targeting iPhone, iPad, Mac (Catalyst or native), Apple Watch, and Apple TV." },
    ],
  },
  {
    slug: "vuejs",
    name: "VueJS",
    category: "Frontend Framework",
    tagline: "Build reactive, component-driven web interfaces with the progressive JavaScript framework loved for power and simplicity.",
    about:
      "Vue.js is a progressive JavaScript framework for building user interfaces. Vue 3's Composition API, built-in reactivity system, and ecosystem (Pinia, Vue Router, Nuxt.js) make it equally suited for embedded interactive widgets and full-scale single-page applications.",
    importance:
      "Vue.js offers the gentlest learning curve of any major framework while remaining production-capable. Its single-file component (SFC) model, Composition API, and Nuxt.js SSR meta-framework make it a pragmatic choice for teams prioritising velocity.",
    heroGradient: "from-[#42b883] via-[#2e7d60] to-[#0a0f1e]",
    accentFrom: "from-emerald-400",
    accentTo: "to-teal-600",
    logoUrl: `${DEVICONS}/vuejs/vuejs-original.svg`,
    floatingBadges: ["Composition API", "Pinia", "Nuxt 3", "Vite"],
    expertise: [
      "Vue 3 SPA development with Composition API and script setup syntax",
      "State management with Pinia (Vue 3's official Vuex replacement)",
      "SSR and SSG with Nuxt 3 for SEO-optimised Vue applications",
      "Vite-powered build tooling for lightning-fast HMR development",
      "Vue Router 4 with lazy loading, navigation guards, and dynamic routes",
      "Component library integration: PrimeVue, Vuetify 3, and custom design systems",
    ],
    relatedTech: [
      { name: "TypeScript", logo: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
      { name: "MongoDB", logo: `${DEVICONS}/mongodb/mongodb-original.svg` },
      { name: "Docker", logo: `${DEVICONS}/docker/docker-original.svg` },
    ],
    faqs: [
      { q: "Vue 3 vs Vue 2 — are you up to date?", a: "We exclusively use Vue 3 with the Composition API for new projects. We also offer Vue 2 to Vue 3 migration services including Options API to Composition API refactoring." },
      { q: "What is Nuxt.js and when should I use it?", a: "Nuxt 3 is Vue's SSR/SSG meta-framework (equivalent to Next.js for React). Use it when you need SEO, server-side rendering, or a full-stack Vue application with file-based routing." },
      { q: "How does Vue handle large-scale state management?", a: "Pinia (Vue's official state manager) provides type-safe, modular stores with DevTools integration. For very complex apps we combine it with composables and reactive refs for local state." },
      { q: "Can Vue.js be used as a micro-frontend?", a: "Yes — Vue's isolated component system and custom elements support make it excellent for micro-frontend architectures, including embedding Vue 3 components into non-Vue host applications." },
    ],
  },
  {
    slug: "web-framework",
    name: "Web Frameworks",
    category: "Full-Stack Development",
    tagline: "Accelerate development with battle-tested frameworks — Django, Laravel, Spring Boot — delivering structure and speed.",
    about:
      "Web frameworks provide pre-built scaffolding, security features, ORM layers, and conventions that dramatically accelerate application development. Leading frameworks include Django (Python), Laravel (PHP), Spring Boot (Java), Rails (Ruby), and Express.js (Node.js).",
    importance:
      "Choosing the right framework for your tech stack eliminates months of boilerplate development, provides proven security patterns, and establishes team-wide conventions — resulting in faster delivery and more maintainable code.",
    heroGradient: "from-[#6366f1] via-[#4338ca] to-[#0a0f1e]",
    accentFrom: "from-indigo-500",
    accentTo: "to-violet-700",
    logoUrl: `${DEVICONS}/django/django-plain.svg`,
    floatingBadges: ["Django", "Laravel", "Spring Boot", "Express"],
    expertise: [
      "Django (Python): ORM, admin, DRF APIs, Channels for WebSockets",
      "Laravel (PHP): Eloquent, Artisan, Horizon, Sanctum, Livewire",
      "Spring Boot (Java): JPA, Spring Security, WebFlux, Actuator",
      "Express.js (Node.js): middleware, REST APIs, WebSocket servers",
      "Framework migration and modernisation from legacy stacks",
      "Microservices decomposition from framework-based monoliths",
    ],
    relatedTech: [
      { name: "Python", logo: `${DEVICONS}/python/python-original.svg` },
      { name: "PHP", logo: `${DEVICONS}/php/php-original.svg` },
      { name: "Java", logo: `${DEVICONS}/java/java-original.svg` },
      { name: "Node.js", logo: `${DEVICONS}/nodejs/nodejs-original.svg` },
    ],
    faqs: [
      { q: "Which web framework should I choose for my project?", a: "It depends on your team's language expertise. We recommend Django or FastAPI for AI-heavy apps, Laravel for content platforms and e-commerce, Spring Boot for enterprise Java, and Express/Fastify for real-time Node.js APIs." },
      { q: "Can you build a full-stack application with a single framework?", a: "Yes — Django (with templates or DRF+React), Laravel (with Blade+Livewire or Inertia.js), and Rails handle full-stack applications elegantly without requiring separate frontend frameworks." },
      { q: "Do you offer framework modernisation services?", a: "Yes — we migrate legacy CodeIgniter, CakePHP, or Struts applications to modern Laravel, Django, or Spring Boot — incrementally, preserving functionality throughout." },
      { q: "How do frameworks handle API versioning and documentation?", a: "We implement API versioning via URL namespaces (/api/v1/) or headers, and auto-generate OpenAPI/Swagger docs using DRF Spectacular (Django), Scramble (Laravel), or SpringDoc (Spring Boot)." },
    ],
  },
];

export const getTechBySlug = (slug: string): TechData | undefined =>
  technologiesData.find((t) => t.slug === slug);
