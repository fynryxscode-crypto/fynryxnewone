import React, { Suspense, lazy } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Providers from './app/providers';
import LayoutClientWrapper from './components/layout/LayoutClientWrapper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DynamicWidgets from './components/layout/DynamicWidgets';

// Lazy load pages to keep the initial bundle small
const Home = lazy(() => import('./app/page'));
const About = lazy(() => import('./app/about/page'));
const Contact = lazy(() => import('./app/contact/page'));
const Trainings = lazy(() => import('./app/trainings/page'));
const ServicePageTemplate = lazy(() => import('./components/ServicePageTemplate'));
const TechnologyDetailsPage = lazy(() => import('./app/technologies/[slug]/page'));
const IndustryDetailsPage = lazy(() => import('./app/industries/[slug]/page'));
const AISolutionDetailsPage = lazy(() => import('./app/ai-solutions/[slug]/page'));

// Admin Pages
const AdminLayout = lazy(() => import('./app/admin/layout'));
const AdminLogin = lazy(() => import('./app/admin/login/page'));
const AdminDashboard = lazy(() => import('./app/admin/dashboard/page'));
const AdminLeads = lazy(() => import('./app/admin/leads/page'));
const AdminProjects = lazy(() => import('./app/admin/projects/page'));
const AdminTasks = lazy(() => import('./app/admin/tasks/page'));
const AdminEmployees = lazy(() => import('./app/admin/employees/page'));
const AdminPayments = lazy(() => import('./app/admin/payments/page'));
const AdminServices = lazy(() => import('./app/admin/services/page'));
const AdminBlogs = lazy(() => import('./app/admin/blogs/page'));
const AdminChatbot = lazy(() => import('./app/admin/chatbot/page'));
// Note: chat, reports, settings, daily-updates should also be imported if they exist.
// Let's stick to the core ones I've verified for now or the most important ones.
const AdminNotifications = lazy(() => import('./app/admin/notifications/page'));
const AdminSettings = lazy(() => import('./app/admin/settings/page'));
const AdminTrainingLeads = lazy(() => import('./app/admin/training-leads/page'));

// Dynamic Route Wrappers
// Note: For services, they are currently static routes in folders. 
// For a true SPA, we might want a single [slug] handler for services too if they all use the same template.
// But based on the file structure, they are separate. 
// However, the links in the app use /services/:slug. 

const DynamicServiceWrapper = () => {
  const { slug } = useParams();
  if (!slug) return null;
  return <ServicePageTemplate slug={slug} />; 
};

// Skeleton or Loader
const PageSkeleton = () => (
  <div className="w-full h-screen animate-pulse bg-slate-50 flex items-center justify-center">
    <div className="text-slate-300 font-bold tracking-widest uppercase">Loading Fynryx...</div>
  </div>
);

export default function App() {
  return (
    <Providers>
      <LayoutClientWrapper
        navbar={<Navbar />}
        footer={<Footer />}
        widgets={<DynamicWidgets />}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/services/:slug" element={<DynamicServiceWrapper />} />
            <Route path="/technologies/:slug" element={<TechnologyDetailsPage />} />
            <Route path="/industries/:slug" element={<IndustryDetailsPage />} />
            <Route path="/ai-solutions/:slug" element={<AISolutionDetailsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="employees" element={<AdminEmployees />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="chatbot" element={<AdminChatbot />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="training-leads" element={<AdminTrainingLeads />} />
            </Route>

            {/* Catch-all or 404 could be added here */}
          </Routes>
        </Suspense>
      </LayoutClientWrapper>
    </Providers>
  );
}
