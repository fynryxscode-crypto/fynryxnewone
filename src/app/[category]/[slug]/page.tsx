// Server Component — ISR + dynamic OG metadata
import type { Metadata } from 'next';
import DynamicPageContent from './DynamicPageContent';

// Revalidate every 24 hours (ISR)
export const revalidate = 86400;

const serviceDetails: Record<string, { title: string; desc: string; image: string }> = {
  // ── Services ──────────────────────────────────────────────────────────────
  'ai-ml-development': { title: 'AI & ML Development', desc: 'Empower your business with predictive analytics, machine learning models, and intelligent automation systems tailored for enterprise growth.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000' },
  'chrome-extension-development': { title: 'Chrome Extension Development', desc: 'Build powerful custom browser extensions to streamline workflows, enhance productivity, and deliver unique tools directly to your users.', image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80&w=2000' },
  'flutter-app-development': { title: 'Flutter App Development', desc: 'Deliver stunning, natively compiled applications for multi-platform mobile deployment from a single unified codebase.', image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=2000' },
  'ios-app-development': { title: 'iOS App Development', desc: 'Craft intuitive, high-performance applications designed specifically to leverage the power of the Apple ecosystem.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000' },
  'ui-ux-development': { title: 'UI/UX Development', desc: 'Design beautiful, user-centered digital interfaces that significantly drive user engagement and high retention rates.', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=2000' },
  'android-app-development': { title: 'Android App Development', desc: 'Develop robust, scalable Android applications utilized by millions of users across a diverse range of mobile devices.', image: 'https://images.unsplash.com/photo-1607252654015-f84469248238?auto=format&fit=crop&q=80&w=2000' },
  'digital-marketing': { title: 'Digital Marketing', desc: 'Strategize and execute data-driven marketing campaigns to guarantee exponential growth and visibility.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000' },
  'gps-vehicle-tracking': { title: 'GPS Vehicle Tracking', desc: 'Implement highly accurate, real-time fleet management software providing advanced location and velocity insights.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=2000' },
  'it-staffing': { title: 'IT Staffing', desc: 'Rapidly scale your technical capability with globally sourced, elite engineering talent and specialized IT professionals.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000' },
  'web-development': { title: 'Web Development', desc: 'Build lightning-fast, scalable, and secure web applications using cutting-edge enterprise architecture.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000' },
  // ── Technologies ──────────────────────────────────────────────────────────
  'adobe-xd': { title: 'Adobe XD', desc: 'Create stunning interactive prototypes and wireframes for web and mobile with Adobe XD.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000' },
  'angular-js': { title: 'Angular JS', desc: 'Build high-performance, maintainable single-page web applications using Angular.', image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=2000' },
  'aws': { title: 'AWS', desc: "Leverage the full power of Amazon Web Services to architect scalable, resilient cloud infrastructure.", image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000' },
  'azure': { title: 'Azure', desc: 'Deploy intelligent cloud solutions with Microsoft Azure for hybrid cloud and enterprise-grade security.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000' },
  'database': { title: 'Database', desc: 'Design and manage robust relational and non-relational databases that power high-throughput applications.', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=2000' },
  'figma': { title: 'Figma', desc: 'Collaborate and ship pixel-perfect designs faster with Figma — the cloud-based design platform.', image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&q=80&w=2000' },
  'flutter': { title: 'Flutter', desc: "Build natively compiled, beautiful multi-platform applications from a single Dart codebase.", image: 'https://images.unsplash.com/photo-1612831199519-571b8174b3ef?auto=format&fit=crop&q=80&w=2000' },
  'google-cloud': { title: 'Google Cloud', desc: "Harness Google Cloud's global infrastructure, BigQuery, and AI APIs to build next-generation applications.", image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=2000' },
  'java': { title: 'Java', desc: "Build enterprise-grade backends, microservices, and Android applications with Java.", image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2000' },
  'kotlin': { title: 'Kotlin', desc: "Develop expressive, safety-first Android and server-side applications with Kotlin.", image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2000' },
  'next-js': { title: 'Next JS', desc: 'Ship production-ready, SEO-optimised React applications with SSR, SSG, and edge-ready API routes.', image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=2000' },
  'node-js': { title: 'Node JS', desc: 'Power real-time APIs, microservices, and scalable back-end systems with Node.js.', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=2000' },
  'nosql-mongo-db-': { title: 'NoSQL (Mongo DB)', desc: "Store and query flexible, schema-less documents at massive scale with MongoDB.", image: 'https://images.unsplash.com/photo-1603311116688-578f5c69f6b5?auto=format&fit=crop&q=80&w=2000' },
  'photoshop': { title: 'Photoshop', desc: 'Craft stunning visual assets, UI mockups, and marketing creatives with Adobe Photoshop.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000' },
  'php': { title: 'PHP', desc: 'Build dynamic, data-driven web applications and RESTful APIs at scale with PHP.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000' },
  'python': { title: 'Python', desc: "From AI/ML pipelines to web backends, leverage Python's rich ecosystem for intelligent solutions.", image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&q=80&w=2000' },
  'react-native': { title: 'React Native', desc: 'Ship truly native iOS and Android mobile experiences from a single React codebase.', image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?auto=format&fit=crop&q=80&w=2000' },
  'swift-ios': { title: 'Swift iOS', desc: "Deliver blazing-fast, safe iOS and macOS applications using Swift — Apple's modern language.", image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=2000' },
  'vuejs': { title: 'VueJS', desc: "Build reactive, component-driven web interfaces with Vue.js.", image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=2000' },
  'web-framework': { title: 'Web Framework', desc: 'Accelerate development with battle-tested web frameworks — from Django and Laravel to Spring Boot.', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=2000' },
};

function toTitleCase(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; slug: string }> }
): Promise<Metadata> {
  const { category, slug } = await params;
  const detail = serviceDetails[slug];
  const title = detail?.title ?? toTitleCase(slug);
  const description = detail?.desc ?? `World-class ${title} solutions for modern businesses — delivered by Fynryx Technologies.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://fynryx.com/${category}/${slug}`,
    },
    openGraph: {
      title: `${title} | Fynryx`,
      description,
      images: detail?.image ? [{ url: detail.image, width: 2000, height: 1333 }] : undefined,
    },
  };
}

export default async function GenericPage(
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;

  const detail = serviceDetails[slug];
  const title = detail?.title ?? toTitleCase(slug);
  const categoryTitle = toTitleCase(category);
  const description = detail?.desc ?? `Elevate your operations with our world-class ${title} solutions designed for modern enterprises.`;
  const backgroundImage = detail?.image ?? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000';

  return (
    <DynamicPageContent
      title={title}
      categoryTitle={categoryTitle}
      description={description}
      backgroundImage={backgroundImage}
      category={category}
    />
  );
}
