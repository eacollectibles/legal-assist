import { lazy } from 'react';

// Only 2 components - all content comes from data file
const BlogListPage = lazy(() => import('@/components/pages/BlogListPage'));
const BlogPostPage = lazy(() => import('@/components/pages/BlogPostPage'));

export const blogRoutes = [
  { path: '/blog', element: BlogListPage },
  { path: '/blog/:slug', element: BlogPostPage },
];
