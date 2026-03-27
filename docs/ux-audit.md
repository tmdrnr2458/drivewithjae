# UX Audit Report: drivewithjae.com

**Date:** 2026-03-27
**Auditor:** Automated UX Review (Claude)
**Pages reviewed:** Homepage (EN), New Inventory, Used Inventory, Quiz, Guide, Financing/Promise, Contact, Homepage (KO)
**Viewports tested:** Desktop (1440x900), Mobile (375x812)

---

## Page-by-Page Analysis

### 1. Homepage (`/en`)

**Desktop:** Strong hero section with Jae's photo, clear value proposition, and two CTAs. The "A Life Between Two Worlds" story section is well-centered. "Why Work With Me" values section has good card layout.

**Mobile:** Hero stacks well. CTAs are full-width and tappable. Photo scales down nicely. Footer is a bit cramped on mobile with the 3-column grid collapsing.

**Issues found:**
- The "Browse Inventory" secondary CTA button in the hero has low contrast (border-slate-500 on dark bg) -- could be missed
- "Find Your Perfect Car" section at bottom is thin -- only a heading, subtitle, and button. Feels like an afterthought rather than a compelling CTA section
- No social proof or trust signals on homepage (no review count, no Google rating)

### 2. New Inventory (`/en/inventory/new`)

**Desktop:** Shows a raw translation key `inventory.titleNew` as the page heading in the initial screenshot render. This appears to be a hydration timing issue where the translation loads after the initial render. On subsequent loads it shows "New Kia Inventory" correctly.

**Mobile:** Filters collapse into a bottom sheet (good pattern). Vehicle cards stack single-column. The floating contact buttons (WhatsApp + Phone) overlap the first vehicle card's content area.

**Issues found:**
- Vehicle card images have a 16:10 aspect ratio which makes cards quite tall when stacked vertically on mobile
- Feature badges on vehicle cards (CarPlay, Android Auto, etc.) can wrap to 2-3 lines, making card heights inconsistent across the grid
- The "Contact About This Car" CTA is sky-500 blue, same as every other link/button on the site -- no visual distinction for the most important action
- Price display: MSRP strikethrough + sale price + savings + discounts + incentives creates visual clutter on cards
- Stock # and VIN shown on every card adds noise most buyers don't need at browse stage
- No pagination or infinite scroll indicator -- users see 363 cards with no lazy loading feedback

### 3. Used Inventory (`/en/inventory/used`)

**Desktop:** Same layout as new inventory. "Certified Pre-Owned" toggle is a nice touch. Used badge is amber-500 (good differentiation from green "NEW" badge).

**Issues found:**
- Same card height inconsistency as new inventory
- CARFAX link on some cards adds yet another element to already-tall cards
- Military discount note ("Military discount available -- ask Jae!") appears on new cars but shows within used inventory view if type filter is cleared

### 4. Quiz (`/en/quiz`)

**Desktop:** Very sparse landing page -- just a title, subtitle, and "Let's Go" button with a huge amount of whitespace. The page feels empty and doesn't build confidence about what the quiz will do.

**Issues found:**
- No preview of what the quiz involves (how many questions, what kind)
- No social proof ("500 people found their car with this quiz")
- The sparkle icon above the title is tiny and adds little value
- CTA button "Let's Go" is generic -- something like "Start the 2-Minute Quiz" would set expectations
- Massive empty space between the quiz CTA and the footer makes the page feel unfinished

### 5. Guide (`/en/guide`)

**Desktop:** Excellent content page. Dark hero with quote, step-by-step cards, trap warnings in amber, checklist cards, and FAQ accordion. Very thorough.

**Issues found:**
- Step cards in "7 Steps" section have a connector line (sky-100 vertical line) but it's subtle and doesn't clearly connect the steps visually
- FAQ items use click-to-expand but have no visual affordance (no "click to expand" text or animation hint)
- The page is very long -- no table of contents or sticky section navigation
- The CTA section at the bottom repeats 3 buttons (Call, Text, Contact Page) which is good but the dark bg section feels disconnected from the rest of the page

### 6. Financing / My Promise (`/en/financing`)

**Desktop:** Clean, well-structured content. Timeline with icons, fee breakdown, reviews grouped by fear, personal promises, FAQ. Strong content.

**Issues found:**
- The page title in the nav says "My Promise" but the page heading says "The No-Surprises Promise" -- slight inconsistency
- Promise section (#4) always shows both English AND Korean text (promise.en and promise.ko) regardless of locale -- this seems intentional for bilingual trust but looks odd on the English page
- Timeline vertical line is offset slightly from the icon centers on some viewport sizes
- Too many Separator dividers between sections create visual monotony

### 7. Contact (`/en/contact`)

**Desktop:** Four contact method cards at top, form below. Clean and functional.

**Mobile:** Contact method cards become 2x2 grid which works well. Form fields stack properly.

**Issues found:**
- The language dropdown uses a raw `<select>` element that doesn't match the shadcn/ui styling of other form elements
- No indication of expected response time ("I'll get back to you within 2 hours")
- The checkbox for "I'd like to schedule a visit" is a raw HTML checkbox, not styled consistently with the rest of the UI
- Submit button text "Send Message" doesn't change contextually when a vehicle is pre-filled

### 8. Korean Homepage (`/ko`)

**Desktop:** Same structure as English. Korean text renders well. The name "제승국입니다" wraps awkwardly on some viewport widths, breaking to "다" on a new line.

**Issues found:**
- Korean text in the hero headline wraps to an awkward line break on desktop at 1440px
- Footer "Quick Links" header is still in English on the Korean page
- The nav items in Korean are longer text strings, causing the desktop nav to be tighter/more cramped

---

## Top 10 Specific UX Issues (Ranked by Impact)

### 1. CRITICAL: Vehicle Card Height Inconsistency on Inventory Pages

**Page:** `/en/inventory/new`, `/en/inventory/used`
**What's wrong:** Cards have variable heights due to: different numbers of feature badges (0-6+), presence/absence of discounts/incentives, CARFAX links, and military discount notes. This creates a jagged grid that looks unpolished.
**Fix:** Add `min-h` to card content or use CSS `grid-auto-rows: 1fr` to equalize row heights. Alternatively, cap the visible information and move details to a hover/expand state.
**Priority:** HIGH
**File:** `/Users/carolinebridges/drivewithjae/src/components/DealerVehicleCard.tsx`

### 2. HIGH: Quiz Landing Page Feels Empty and Unconvincing

**Page:** `/en/quiz`
**What's wrong:** The page is just a heading, one sentence, and a button floating in a sea of whitespace. It doesn't tell users what to expect, how long it takes, or why it's worth doing.
**Fix:** Add: (1) "7 quick questions, 2 minutes" expectation-setting, (2) a preview of question types or illustration, (3) a brief testimonial or match count. Fill the vertical space with value.
**Priority:** HIGH
**File:** `/Users/carolinebridges/drivewithjae/src/components/LifestyleQuiz.tsx` (the step=-1 intro state)

### 3. HIGH: Footer "Quick Links" Not Translated in Korean

**Page:** `/ko` (all Korean pages)
**What's wrong:** The Footer component has hardcoded English strings: "Quick Links", "Contact", "Inventory", "Find Your Car", "Buying Guide". These don't use the translation system.
**Fix:** Replace hardcoded strings in Footer.tsx with `t()` calls using the translation keys from the messages files.
**Priority:** HIGH
**File:** `/Users/carolinebridges/drivewithjae/src/components/Footer.tsx` lines 22-26

### 4. HIGH: Floating Contact Buttons Overlap Content on Mobile

**Page:** All pages (via ContactButtons.tsx)
**What's wrong:** The fixed-position WhatsApp and Phone buttons in the bottom-right corner overlap vehicle card content, especially the "Contact About This Car" CTA button on inventory pages. On mobile, the buttons stack 2-3 high (KakaoTalk + WhatsApp + Phone on Korean pages) taking significant screen real estate.
**Fix:** Add `pb-20` (bottom padding) to the main content area on mobile, or reduce floating buttons to a single expandable FAB (floating action button) that opens to show options.
**Priority:** HIGH
**File:** `/Users/carolinebridges/drivewithjae/src/components/ContactButtons.tsx`

### 5. MEDIUM: Vehicle Cards Show Too Much Information at Browse Stage

**Page:** `/en/inventory/new`, `/en/inventory/used`
**What's wrong:** Each card shows: image, badge, title, color/mileage/engine, sale price, MSRP strikethrough, savings amount, discounts (multiple lines), incentives (multiple lines), military discount note, CARFAX link, feature badges (up to 6), stock number, VIN, and CTA button. This is information overload for browsing.
**Fix:** Show only: image, title, price (with savings if applicable), top 3 features, and CTA. Move detailed breakdown to the vehicle detail page or a card hover/expand state.
**Priority:** MEDIUM
**File:** `/Users/carolinebridges/drivewithjae/src/components/DealerVehicleCard.tsx`

### 6. MEDIUM: Inconsistent Form Styling on Contact Page

**Page:** `/en/contact`
**What's wrong:** The language `<select>` dropdown and the "schedule a visit" checkbox use raw HTML elements that don't match the shadcn/ui design system used elsewhere. The select has manually applied classes that approximate but don't match the Input component styling.
**Fix:** Replace the raw `<select>` with the shadcn/ui Select component. Replace the raw checkbox with the shadcn/ui Checkbox component.
**Priority:** MEDIUM
**File:** `/Users/carolinebridges/drivewithjae/src/components/ContactForm.tsx` lines 130-137, 150

### 7. MEDIUM: "Browse Inventory" Hero Button Has Low Contrast

**Page:** `/en` (homepage)
**What's wrong:** The secondary CTA "Browse Inventory" uses `border-slate-500` and `text-slate-200` on the dark hero background. It's visually recessive and easy to miss next to the bright sky-500 primary CTA.
**Fix:** Increase border opacity to `border-slate-300` and text to `text-white`, or use a semi-transparent white background (`bg-white/10`) to make it more visible while still secondary.
**Priority:** MEDIUM
**File:** `/Users/carolinebridges/drivewithjae/src/app/[locale]/page.tsx` line 46

### 8. MEDIUM: Korean Homepage Name Line Break

**Page:** `/ko`
**What's wrong:** The Korean greeting "안녕하세요, 제승국입니다" breaks to a new line at "다" on certain viewport widths, creating an orphaned single character that looks broken.
**Fix:** Add `word-break: keep-all` (Tailwind: `break-keep`) to the Korean h1 element to prevent mid-word line breaks, or use `whitespace-nowrap` if the string should stay on one line.
**Priority:** MEDIUM
**File:** `/Users/carolinebridges/drivewithjae/src/app/[locale]/page.tsx` line 28-30

### 9. LOW: No Pagination or Load-More on Inventory

**Page:** `/en/inventory/new` (363 vehicles), `/en/inventory/used` (204 vehicles)
**What's wrong:** All vehicles render at once with no pagination, virtual scrolling, or "load more" pattern. With 363 new vehicles, this creates a very long page and likely impacts initial render performance.
**Fix:** Implement pagination (show 24 per page) or virtualized scrolling. Add a "Showing 1-24 of 363" indicator with page controls.
**Priority:** LOW (functional but impacts performance)
**File:** `/Users/carolinebridges/drivewithjae/src/components/LiveInventoryBrowser.tsx`

### 10. LOW: Quiz CTA Button Text is Generic

**Page:** `/en/quiz`, `/en` (homepage bottom section)
**What's wrong:** "Let's Go" as a CTA button label doesn't communicate what happens next. It's used both on the quiz landing page and the homepage CTA section.
**Fix:** Change to "Start the 2-Minute Quiz" or "Find My Perfect Car" to set expectations and increase click-through.
**Priority:** LOW
**File:** Translation files at `/Users/carolinebridges/drivewithjae/src/messages/en.json` and `ko.json` (key: `quiz.start`)

---

## Quick Wins Summary (CSS/text changes only)

| # | Fix | Effort | Impact |
|---|-----|--------|--------|
| 1 | Add `break-keep` to Korean h1 | 1 min | Fixes orphaned character |
| 2 | Translate Footer hardcoded strings | 10 min | Fixes Korean UX |
| 3 | Increase "Browse Inventory" button contrast | 2 min | Better CTA visibility |
| 4 | Add `grid-auto-rows: 1fr` to vehicle grid | 2 min | Even card heights |
| 5 | Add bottom padding for floating buttons | 2 min | No content overlap |
| 6 | Change "Let's Go" to "Start the 2-Minute Quiz" | 2 min | Better CTA clarity |
| 7 | Replace raw select/checkbox with shadcn components | 15 min | Consistent styling |
| 8 | Reduce vehicle card info density | 30 min | Cleaner browse experience |
| 9 | Add quiz page intro content | 20 min | Better conversion |
| 10 | Add pagination to inventory | 1-2 hrs | Better performance |

---

## Screenshots

All screenshots saved to `/Users/carolinebridges/drivewithjae/docs/screenshots/`:
- `homepage-desktop.png` / `homepage-mobile.png`
- `inventory-new-desktop.png` / `inventory-new-mobile.png`
- `inventory-used-desktop.png`
- `quiz-desktop.png`
- `guide-desktop2.png`
- `financing-desktop.png`
- `contact-desktop.png` / `contact-mobile.png`
- `ko-homepage-desktop.png`
