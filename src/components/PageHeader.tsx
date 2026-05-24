/**
 * PageHeader.tsx — single-source-of-truth h1 + optional subtitle.
 *
 * Used by customer-facing React pages that DO NOT wrap themselves in
 * `<ServicePageLayout>` (which already renders its own h1 from the
 * `problemHeadline` prop). Examples: ContactPage, PublicSignPage,
 * PublicUploadPage.
 *
 * The SEO audit identified these pages as rendering ZERO `<h1>` tags in
 * the live React DOM after hydration. Search engines penalize pages
 * without an h1, accessibility tools flag it as a violation, and
 * Lighthouse docks the score. Drop `<PageHeader>` at the top of any
 * such page to fix it.
 *
 * Design intentionally minimal:
 *   - One `<h1>` (semantic + a11y)
 *   - Optional subtitle paragraph for context
 *   - Inherits the site's heading font + colour tokens from Tailwind
 *   - No client-side JS, no animation, no `position: fixed` — safe to
 *     render at the top of any page including print contexts
 */
import React from 'react';

export interface PageHeaderProps {
  /** Primary heading text. Becomes the single `<h1>` for the page. */
  title: string;
  /** Optional one-sentence context line shown under the heading. */
  subtitle?: string;
  /** Optional extra className appended to the wrapper. */
  className?: string;
  /**
   * If true, renders the header with extra top spacing so it doesn't
   * collide with the site Header. Default true. Set false when the
   * page already has a hero/banner above PageHeader.
   */
  withTopSpacing?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  className = '',
  withTopSpacing = true,
}: PageHeaderProps) {
  return (
    <header
      className={`${withTopSpacing ? 'pt-24 sm:pt-28' : ''} pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto ${className}`.trim()}
    >
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="font-paragraph text-base sm:text-lg text-foreground/80 mt-3 sm:mt-4 leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}
