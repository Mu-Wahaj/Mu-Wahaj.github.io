import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from '../components/Layout'
import { PageTransition } from '../components/PageTransition'
import { useLenis } from '../hooks/useLenis'

const HomePage = lazy(() => import('../pages/HomePage').then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import('../pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })))
const ProjectDetailPage = lazy(() => import('../pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })))
const ResumePage = lazy(() => import('../pages/ResumePage').then((module) => ({ default: module.ResumePage })))
const ContactPage = lazy(() => import('../pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))

const AppShell = () => {
  useLenis()

  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#050505] text-white">Loading...</div>}>
      <PageTransition>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </PageTransition>
    </Suspense>
  )
}

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  </HelmetProvider>
)

export default App
