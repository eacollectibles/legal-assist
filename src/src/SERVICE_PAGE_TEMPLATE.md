# Service Page Template Structure

All service pages should follow this consistent structure and order:

## Section Order (Required)

1. **Problem** - Hero section with headline, description, and CTA
2. **Outcome** - Conversion strip highlighting key benefits
3. **Authority** - Why Choose Our Services (3 items)
4. **Process** - Our Process (3 steps)
5. **Reassurance** - What You Can Expect (3 items)
6. **Pricing/Next Step** - Custom content section (passed as `children`)
7. **FAQ** - Frequently Asked Questions section
8. **CTA** - Final call-to-action

## Implementation Pattern

### Step 1: Define Data Arrays

```typescript
const authorityItems = [
  {
    title: 'Item Title',
    description: 'Item description'
  },
  // ... 3 items total
];

const processSteps = [
  {
    step: '1',
    title: 'Step Title',
    description: 'Step description'
  },
  // ... 3 steps total
];

const reassuranceItems = [
  {
    icon: <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />,
    title: 'Item Title',
    description: 'Item description'
  },
  // ... 3 items total
];
```

### Step 2: Create Pricing/Next Step Section

```typescript
const pricingAndNextStepSection = (
  <div className="w-full py-16 md:py-24 bg-white">
    <div className="max-w-[100rem] mx-auto px-4 md:px-8">
      {/* Your custom content here */}
    </div>
  </div>
);
```

### Step 3: Create FAQ Section

```typescript
const faqAndRelatedSection = (
  <>
    <FAQSection />
    <RelatedServices services={relatedServicesConfig.yourService} />
  </>
);
```

### Step 4: Render ServicePageLayout

```typescript
return (
  <>
    <SEO 
      title="Your Page Title"
      description="Your meta description"
      canonical="https://www.legalassist.london/services/your-service"
    />
    <ServicePageLayout
      seoTitle="Your Page Title"
      seoDescription="Your meta description"
      canonical="https://www.legalassist.london/services/your-service"
      problemHeadline="Your Headline"
      problemDescription="Your description"
      heroImage={{
        src: "https://static.wixstatic.com/media/...",
        alt: "Descriptive alt text"
      }}
      authorityItems={authorityItems}
      processSteps={processSteps}
      reassuranceItems={reassuranceItems}
      faqSection={faqAndRelatedSection}
    >
      {pricingAndNextStepSection}
    </ServicePageLayout>
  </>
);
```

## Key Points

- **Consistent Structure**: All sections render in the same order across all service pages
- **Flexible Content**: Each section can have custom content while maintaining the structure
- **SEO Optimized**: Proper heading hierarchy and meta tags
- **Responsive Design**: All sections are mobile-friendly
- **Accessibility**: Proper semantic HTML and ARIA labels

## Section Details

### Problem (Automatic)
- Headline + Description
- Hero image
- Primary CTA buttons
- Handled by ServicePageLayout

### Outcome (Automatic)
- ConversionStrip component
- 3 key benefits highlighted
- Handled by ServicePageLayout

### Authority (Automatic)
- "Why Choose Our Services" heading
- 3 items with icons and descriptions
- Handled by ServicePageLayout

### Process (Automatic)
- "Our Process" heading
- 3 numbered steps
- Handled by ServicePageLayout

### Reassurance (Automatic)
- "What You Can Expect" heading
- 3 items with icons and descriptions
- Handled by ServicePageLayout

### Pricing/Next Step (Custom)
- Pass as `children` prop
- Typically includes pricing info, timeline, key stats
- Custom styling and layout per service

### FAQ (Custom)
- Pass as `faqSection` prop
- Include FAQSection component
- Can include RelatedServices component

### CTA (Automatic)
- "Find Out Where You Stand" heading
- Contact and Services buttons
- Handled by ServicePageLayout

## Example: SmallClaimsPage.tsx

See `/src/components/pages/SmallClaimsPage.tsx` for a complete working example.
