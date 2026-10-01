import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'
const Services = lazy(() => import('./pages/SolutionsPage.jsx'))
const Service = lazy(() => import('./pages/ServicePage.jsx'))
const Work = lazy(() => import('./pages/WorkPage.jsx'))
const About = lazy(() => import('./pages/AboutPage.jsx'))
const Call = lazy(() => import('./pages/CallPage.jsx'))
const Privacy = lazy(() => import('./pages/PrivacyPage.jsx'))
const Blog = lazy(() => import('./pages/blog/BlogListPage.jsx'))
const Post = lazy(() => import('./pages/blog/BlogPostPage.jsx'))
const NotFound = lazy(() => import('./pages/NotFoundPage.jsx'))
export default function App() { return <Layout><ScrollToTop/><Suspense fallback={<div className="container route-loading" role="status">Loading page…</div>}><Routes><Route path="/" element={<HomePage/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<Service/>}/><Route path="/solutions" element={<Navigate to="/services" replace/>}/><Route path="/industries" element={<Navigate to="/services" replace/>}/><Route path="/work" element={<Work/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Navigate to="/call" replace/>}/><Route path="/call" element={<Call/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="/blog" element={<Blog/>}/><Route path="/blog/:slug" element={<Post/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></Layout> }
