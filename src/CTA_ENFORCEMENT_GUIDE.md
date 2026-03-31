# Primary CTA Enforcement Guide

## Overview
This document outlines the enforcement of a single, dominant Call-to-Action (CTA) across the LegalAssist website.

## Primary CTA Specification
- **Text (EXACT):** "Call Now for a Free Case Review"
- **Phone Number:** 365-882-9515
- **Color:** Primary brand color (#B94A1F)
- **Behavior:**
  - Desktop: Button + phone number displayed beside it
  - Mobile: Triggers tel:3658829515 click-to-call action

## Implementation

### 1. PrimaryCTA Component
**Location:** `/src/components/PrimaryCTA.tsx`

This is the single source of truth for the dominant CTA. It provides multiple variants:

```typescript
// Desktop variant - button + phone number
<PrimaryCTA variant="desktop" size="md" />

// Mobile variant - tel link button
<PrimaryCTA variant="mobile" size="md" />

// Standard button variant - links to contact page
<PrimaryCTA variant="button" size="lg" />

// Link variant - text link with phone icon
<PrimaryCTA variant="link" />
```

**Sizes:** `sm`, `md`, `lg`

### 2. Where the CTA is Applied

#### Header (`/src/components/Header.tsx`)
- **Desktop Navigation:** Uses `variant="desktop"` to show button + phone number
- **Mobile Navigation:** Uses `variant="mobile"` for tel link
- **Location:** Right side of navigation, after "Client Portal" link
- **Visibility:** Only shown when user is NOT authenticated

#### Footer (`/src/components/Footer.tsx`)
- **Location:** Top section, above the main footer grid
- **Variant:** `variant="button"` with size `lg`
- **Context:** "Ready to Get Started?" section with supporting text
- **Visual Hierarchy:** Largest button on the page

#### Homepage (`/src/components/pages/HomePage.tsx`)
- **Hero Section:** Uses `variant="button"` with size `lg`
- **CTA Section:** Uses `variant="button"` with size `lg`
- **Supporting Text:** "Get a clear explanation of your rights and options under Ontario law."

#### Service Pages (e.g., SpeedingTicketDefencePage)
- **Location:** Hero/intro section
- **Variant:** `variant="button"` with size `lg`
- **Secondary Action:** Phone number link (secondary visual hierarchy)

#### Sticky Contact Bar (`/src/components/StickyContactBar.tsx`)
- **Mobile Only:** Uses `variant="mobile"`
- **Location:** Fixed bottom bar on mobile devices
- **Visibility:** Hides when CTA section is in view

#### Contact Page (`/src/components/pages/ContactPage.tsx`)
- **Heading:** "Find Out Where You Stand" (this is the page title, not the CTA text)
- **Note:** Contact page contains forms and other contact methods as secondary options

### 3. Contact Information Source
**Location:** `/src/lib/contact.ts`

Single source of truth for all contact information:
```typescript
export const PHONE_DISPLAY = "365-882-9515";
export const PHONE_TEL = "+13658829515";
export const PHONE_HREF = `tel:${PHONE_TEL}`;
```

## Design Rules

### Visual Hierarchy
1. **Primary CTA** (Largest, most prominent)
   - Text: "Call Now for a Free Case Review"
   - Color: Primary brand color
   - Size: `lg` on hero/footer sections
   - Button styling with hover effects

2. **Secondary Actions** (Visually muted)
   - "View Services" link
   - "Contact" form links
   - Phone number display (on desktop)
   - Other navigation links

### Color Consistency
- All primary CTAs use the same brand color: `bg-primary` (#B94A1F)
- Text color: `text-primary-foreground` (white)
- Hover state: `hover:bg-primary/90`

### Button Styling
- All buttons use: `btn-shine btn-lift` classes for consistent animation
- Border radius: `rounded-lg`
- Font: `font-paragraph font-semibold`
- Padding: Varies by size (sm/md/lg)

## Enforcement Rules

### ✅ DO
- Use the `PrimaryCTA` component everywhere
- Keep the exact text: "Call Now for a Free Case Review"
- Use the phone number: 365-882-9515
- Make this the largest button on every page
- Use consistent colors across all CTAs
- Import from `@/lib/contact.ts` for phone information

### ❌ DON'T
- Use alternate CTA text like "Free Consultation", "Find Out Where You Stand", "Book Now", etc.
- Use different phone numbers
- Create multiple equal-sized CTAs
- Use different colors for the primary CTA
- Hardcode phone numbers (use `PHONE_DISPLAY` and `PHONE_HREF`)
- Make other actions visually equal to the primary CTA

## Testing Checklist

- [ ] Header shows correct CTA on desktop (button + phone)
- [ ] Header shows correct CTA on mobile (tel link)
- [ ] Footer displays prominent CTA section
- [ ] Homepage hero uses primary CTA
- [ ] Homepage CTA section uses primary CTA
- [ ] Service pages use primary CTA
- [ ] Sticky contact bar shows primary CTA on mobile
- [ ] All CTAs use exact text: "Call Now for a Free Case Review"
- [ ] All CTAs use phone: 365-882-9515
- [ ] All CTAs are visually dominant on their pages
- [ ] Secondary actions are visually muted
- [ ] Desktop shows button + phone number together
- [ ] Mobile shows tel link button

## Future Maintenance

When adding new pages or sections:
1. Import `PrimaryCTA` component
2. Use appropriate variant based on context
3. Place it as the most prominent action
4. Never hardcode CTA text or phone numbers
5. Reference this guide for consistency

## Component API Reference

```typescript
interface PrimaryCTAProps {
  variant?: 'button' | 'link' | 'desktop' | 'mobile';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Examples:
<PrimaryCTA /> // Default: button variant, md size
<PrimaryCTA variant="desktop" size="lg" />
<PrimaryCTA variant="mobile" size="md" />
<PrimaryCTA variant="link" className="custom-class" />
```
