import { 
  Brush, Code, Smartphone, Megaphone, Snowflake, ShieldCheck, Terminal, Layout
} from 'lucide-react';

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  color: string;
  slug: string;
}

export const trainingsData: TrainingCourse[] = [
  {
    id: '1',
    title: 'UX/UI Design Mastery',
    description: 'Master the art of creating pixel-perfect, user-centric interfaces. From wireframing in Figma to advanced prototyping and design systems.',
    icon: Brush,
    duration: '12 Weeks',
    level: 'Beginner',
    category: 'Design',
    color: '#FF4D8D',
    slug: 'ux-ui-design'
  },
  {
    id: '2',
    title: 'Full-Stack Web Development',
    description: 'Become a pro in modern web tech. Master Next.js, React, Node.js, and Supabase to build scalable, high-performance applications.',
    icon: Code,
    duration: '16 Weeks',
    level: 'Intermediate',
    category: 'Development',
    color: '#2F55FF',
    slug: 'web-development'
  },
  {
    id: '3',
    title: 'Mobile App Development (Flutter)',
    description: 'Build native-grade mobile apps for iOS and Android using a single codebase with Flutter and Dart. Focus on UI and performance.',
    icon: Smartphone,
    duration: '14 Weeks',
    level: 'Intermediate',
    category: 'Development',
    color: '#0ACF83',
    slug: 'mobile-apps-development'
  },
  {
    id: '4',
    title: 'Advanced Digital Marketing',
    description: 'Accelerate business growth with SEO, SEM, social media strategy, and data-driven marketing analytics for the modern web.',
    icon: Megaphone,
    duration: '8 Weeks',
    level: 'Beginner',
    category: 'Marketing',
    color: '#FFBD2E',
    slug: 'digital-marketing'
  },
  {
    id: '5',
    title: 'Snowflake Data Engineering',
    description: 'Master cloud data warehousing with Snowflake. Learn architecture, data modeling, and performance optimization for big data.',
    icon: Snowflake,
    duration: '10 Weeks',
    level: 'Advanced',
    category: 'Cloud',
    color: '#29B5E8',
    slug: 'snowflake'
  },
  {
    id: '6',
    title: 'Cyber Security Essentials',
    description: 'Learn to protect networks and digital assets. This course covers risk management, network security, and defense strategies.',
    icon: ShieldCheck,
    duration: '14 Weeks',
    level: 'Intermediate',
    category: 'Security',
    color: '#6366F1',
    slug: 'cyber-security'
  },
  {
    id: '7',
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Think like a hacker to build better defenses. Master vulnerability assessment, social engineering, and security auditing.',
    icon: Terminal,
    duration: '16 Weeks',
    level: 'Advanced',
    category: 'Security',
    color: '#EF4444',
    slug: 'ethical-hacking'
  },
  {
    id: '8',
    title: 'Professional Page Design',
    description: 'Deep dive into landing page optimization, conversion rate optimization (CRO), and high-end visual storytelling for brands.',
    icon: Layout,
    duration: '6 Weeks',
    level: 'Intermediate',
    category: 'Design',
    color: '#9333EA',
    slug: 'professional-page-design'
  }
];
