export interface Project {
  id: number;
  title: string;
  category: string;
  type: 'mobile' | 'web';
  image: string;
  description: string;
  techStack: string[];
  features: string[];
  liveDemo?: string;
}

export const PROJECTS: Project[] = [
  // Mobile Applications
  {
    id: 1,
    title: 'Fintech Pulse',
    category: 'Banking & Finance',
    type: 'mobile',
    image: 'https://images.unsplash.com/photo-1616077168079-7e09ad6bb32e?auto=format&fit=crop&q=80&w=800',
    description: 'A revolutionary mobile banking app that provides real-time transaction tracking and high-yield savings management.',
    techStack: ['Flutter', 'Firebase', 'Cloud Functions'],
    features: ['Biometric Login', 'Real-time Alerts', 'Multi-currency Support', 'Spending Analytics'],
    liveDemo: 'https://example.com/pulse'
  },
  {
    id: 2,
    title: 'HealthFlow AI',
    category: 'Healthcare',
    type: 'mobile',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    description: 'Predictive health tracking app using localized AI to monitor chronic conditions and provide early warnings.',
    techStack: ['React Native', 'TensorFlow Lite', 'Node.js'],
    features: ['Disease Prediction', 'Doctor Consultation', 'Vitals Tracking', 'Medication Reminders'],
    liveDemo: 'https://example.com/healthflow'
  },
  {
    id: 3,
    title: 'Fynryx Logistics',
    category: 'Fleet Management',
    type: 'mobile',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Complete logistics solution with live GPS tracking, route optimization, and driver performance metrics.',
    techStack: ['React Native', 'AWS IoT', 'Googles Maps API'],
    features: ['GPS Live Tracking', 'Route Optimization', 'Digital Signature', 'Automated Invoicing'],
  },
  {
    id: 4,
    title: 'EcoMarket Mobile',
    category: 'E-Commerce',
    type: 'mobile',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    description: 'A mobile-first sustainable marketplace app connecting eco-conscious consumers with local artisans.',
    techStack: ['Flutter', 'Node.js', 'PostgreSQL'],
    features: ['Secure Payments', 'Social Sharing', 'Carbon Footprint Tracker', 'Wishlist'],
  },
  // Web Applications
  {
    id: 101,
    title: 'Enterprise Nexus',
    category: 'SaaS Platform',
    type: 'web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'Comprehensive ERP system for large-scale enterprise resource management with real-time analytics.',
    techStack: ['Next.js', 'Tailwind', 'Supabase', 'Redis'],
    features: ['Global Dashboard', 'Resource Planning', 'Real-time AI Analysis', 'Role-based Access'],
  },
  {
    id: 102,
    title: 'AI Analytics Port',
    category: 'Data Intelligence',
    type: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    description: 'Next-gen analytics platform that provides sentient data insights through machine learning models.',
    techStack: ['React', 'Python', 'D3.js', 'Django'],
    features: ['Interactive Charts', 'Predictive Modeling', 'Export Reports', 'Custom Alerts'],
  },
  {
    id: 103,
    title: 'Streamify Web',
    category: 'Media & Entertainment',
    type: 'web',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance video streaming platform optimized for low-latency delivery across all devices.',
    techStack: ['Next.js', 'Mux', 'Clerk', 'PostgreSQL'],
    features: ['4K Streaming', 'Community Chat', 'Subscription Management', 'Personalized Feed'],
  },
  {
    id: 104,
    title: 'CyberDefend Panel',
    category: 'Cybersecurity',
    type: 'web',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced cybersecurity dashboard for monitoring threat levels and managing firewall policies.',
    techStack: ['React', 'Rust', 'Echarts', 'Kubernetes'],
    features: ['Threat Detection', 'Live Firewall Logs', 'Packet Analysis', 'Vulnerability Scanner'],
  },
];
