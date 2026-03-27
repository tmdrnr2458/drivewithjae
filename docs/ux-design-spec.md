# UX Design Spec: Targeted Improvements

**Date:** 2026-03-27
**Based on:** Competitive Analysis + UX Audit reports
**Principle:** Small, high-impact changes only. Every change < 5 lines of code. Mobile-first.

---

## Change 1: Sort Dropdown on Inventory Page

**File:** `/Users/carolinebridges/drivewithjae/src/components/LiveInventoryBrowser.tsx`
**Priority:** 1 (Critical -- both reports flag this as the #1 gap)

**Why:** Every competitor (Carvana, CarGurus, AutoTrader, CarMax, Cars.com, TrueCar) has sort. We defined `SORT_OPTIONS` and `sortBy` state (lines 296-326) but never render the dropdown or apply the sort. The infrastructure is already there, unused.

**Change A -- Render the sort dropdown.** In the "Results count" bar (around line 593), add the sort select:

```
Old (line 593-594):
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">

New:
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {vehicles.length} vehicles
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
```

Remove the duplicate `<p>` that currently shows the count (lines 594-596) since it's now in the new block.

**Change B -- Apply the sort.** After the `filtered` useMemo (line 427-433), add a `sorted` useMemo:

```tsx
const sorted = useMemo(() => {
  const arr = [...filtered];
  const getPrice = (v: DealerVehicle) => vehicleMeta.get(v.vin)?.price ?? 0;
  if (sortBy === "price_asc") arr.sort((a, b) => getPrice(a) - getPrice(b));
  else if (sortBy === "price_desc") arr.sort((a, b) => getPrice(b) - getPrice(a));
  else if (sortBy === "mileage_asc") arr.sort((a, b) => a.mileage - b.mileage);
  else arr.sort((a, b) => b.year - a.year || getPrice(b) - getPrice(a));
  return arr;
}, [filtered, sortBy, vehicleMeta]);
```

Then replace `filtered.map` with `sorted.map` in the grid render (line 621) and `filtered.length` with `sorted.length` where showing counts for the grid.

---

## Change 2: Hero "Browse Inventory" Button -- Better Contrast

**File:** `/Users/carolinebridges/drivewithjae/src/app/[locale]/page.tsx`
**Priority:** 1

**Why:** UX audit flagged this as "easy to miss" -- border-slate-500 text-slate-200 on dark background is too subtle. This is a primary funnel entry point.

```
Old (line 46):
                  className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-8 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-slate-700"

New:
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/10 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/20"
```

---

## Change 3: Korean Text Line Break Fix

**File:** `/Users/carolinebridges/drivewithjae/src/app/[locale]/page.tsx`
**Priority:** 1

**Why:** UX audit identified orphaned single character "da" when Korean hero headline wraps. `break-keep` prevents mid-word line breaks in CJK text.

```
Old (line 28):
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

New:
              <h1 className="mb-4 text-4xl font-bold tracking-tight break-keep sm:text-5xl lg:text-6xl">
```

---

## Change 4: Vehicle Card Hover Effect -- More Interactive Feel

**File:** `/Users/carolinebridges/drivewithjae/src/components/DealerVehicleCard.tsx`
**Priority:** 2

**Why:** Cards currently only have `hover:shadow-lg`. Competitors use translate/scale to make cards feel clickable. Small polish that signals interactivity.

```
Old (line 53):
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">

New:
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
```

---

## Change 5: Vehicle Card Image Aspect Ratio -- Better for Mobile

**File:** `/Users/carolinebridges/drivewithjae/src/components/DealerVehicleCard.tsx`
**Priority:** 2

**Why:** UX audit noted 16:10 makes cards tall on mobile. 16:9 is standard for automotive photography, saves ~6% vertical space per card, fitting more cards on screen.

```
Old (line 55):
      <Link href={`/inventory/${vehicle.vin}`} className="block relative aspect-[16/10] bg-muted">

New:
      <Link href={`/inventory/${vehicle.vin}`} className="block relative aspect-video bg-muted">
```

(`aspect-video` = 16:9 in Tailwind)

---

## Change 6: Monthly Payment -- Larger and More Prominent

**File:** `/Users/carolinebridges/drivewithjae/src/components/DealerVehicleCard.tsx`
**Priority:** 2

**Why:** Competitive analysis shows all major sites prominently display monthly payment. Ours is `text-xs text-muted-foreground` -- nearly invisible. Buyers shop by monthly payment.

```
Old (lines 119-122):
            {priceNum > 0 && (
              <span className="text-xs text-muted-foreground">
                ~${monthlyPayment.toLocaleString()}/mo
              </span>

New:
            {priceNum > 0 && (
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                ~${monthlyPayment.toLocaleString()}/mo
              </span>
```

---

## Change 7: Footer -- Translate Hardcoded English Strings

**File:** `/Users/carolinebridges/drivewithjae/src/components/Footer.tsx`
**Priority:** 1

**Why:** UX audit flagged that "Quick Links", "Inventory", "Find Your Car", "Buying Guide", "Contact" are hardcoded English in the Footer, breaking the Korean experience.

```
Old (lines 22-26):
            <h3 className="mb-2 font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/inventory" className="text-sm text-muted-foreground hover:text-foreground">Inventory</Link>
              <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground">Find Your Car</Link>
              <Link href="/guide" className="text-sm text-muted-foreground hover:text-foreground">Buying Guide</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>

New:
            <h3 className="mb-2 font-semibold">{t("quickLinks")}</h3>
            <nav className="flex flex-col gap-1">
              <Link href="/inventory" className="text-sm text-muted-foreground hover:text-foreground">{t("inventory")}</Link>
              <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground">{t("findYourCar")}</Link>
              <Link href="/guide" className="text-sm text-muted-foreground hover:text-foreground">{t("buyingGuide")}</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t("contact")}</Link>
```

Also update the "Contact" heading on line 30:
```
Old:
            <h3 className="mb-2 font-semibold">Contact</h3>
New:
            <h3 className="mb-2 font-semibold">{t("contactTitle")}</h3>
```

**File:** `/Users/carolinebridges/drivewithjae/src/messages/en.json` -- add to footer section:
```json
"quickLinks": "Quick Links",
"inventory": "Inventory",
"findYourCar": "Find Your Car",
"buyingGuide": "Buying Guide",
"contact": "Contact",
"contactTitle": "Contact"
```

**File:** `/Users/carolinebridges/drivewithjae/src/messages/ko.json` -- add to footer section:
```json
"quickLinks": "바로가기",
"inventory": "재고 차량",
"findYourCar": "내 차 찾기",
"buyingGuide": "차 구매 가이드",
"contact": "연락하기",
"contactTitle": "연락처"
```

---

## Change 8: Empty State -- Suggest Alternatives When No Results

**File:** `/Users/carolinebridges/drivewithjae/src/components/LiveInventoryBrowser.tsx`
**Priority:** 2

**Why:** Current empty state is just "No vehicles match your filters" + "Clear All Filters" button. Should guide users toward action rather than dead-ending them.

```
Old (lines 633-641):
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">{t("noResults")}</p>
              {activeFilterCount > 0 && (
                <Button variant="outline" onClick={handleClearAll}>
                  Clear All Filters
                </Button>
              )}
            </div>

New:
            <div className="py-16 text-center">
              <Car className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg text-muted-foreground mb-2">{t("noResults")}</p>
              <p className="text-sm text-muted-foreground mb-6">Try removing some filters or contact Jae for help finding your car.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {activeFilterCount > 0 && (
                  <Button variant="outline" onClick={handleClearAll}>
                    Clear All Filters
                  </Button>
                )}
                <Button asChild className="bg-sky-500 text-white hover:bg-sky-600">
                  <a href="/contact">Contact Jae</a>
                </Button>
              </div>
            </div>
```

Note: `Car` is already imported from lucide-react in this file.

---

## Change 9: Floating Contact Buttons -- Add Bottom Padding to Prevent Overlap

**File:** `/Users/carolinebridges/drivewithjae/src/app/[locale]/layout.tsx`
**Priority:** 2

**Why:** UX audit found that the fixed-position WhatsApp + Phone buttons overlap content on mobile, especially vehicle card CTAs.

```
Old (line 74):
          <main className="flex-1">{children}</main>

New:
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
```

This adds 80px bottom padding on mobile only, clearing the floating contact buttons.

---

## Change 10: Filter Chips -- More Visible Styling

**File:** `/Users/carolinebridges/drivewithjae/src/components/FilterChips.tsx`
**Priority:** 3

**Why:** Current chips use `variant="secondary"` (gray). Active filters should be more prominent -- sky-colored to match the brand and be easier to scan.

```
Old (lines 24-28):
        <Badge
          key={`${chip.category}-${chip.key}`}
          variant="secondary"
          className="cursor-pointer gap-1 pl-2.5 pr-1.5 py-1 h-auto"
        >

New:
        <Badge
          key={`${chip.category}-${chip.key}`}
          variant="secondary"
          className="cursor-pointer gap-1 pl-2.5 pr-1.5 py-1 h-auto bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-800"
        >
```

---

## Change 11: Quiz CTA -- Set Expectations

**File:** `/Users/carolinebridges/drivewithjae/src/messages/en.json`
**Priority:** 3

**Why:** "Let's Go" is vague. UX audit says users don't know what they're starting. Setting expectations increases click-through.

```
Old:
    "start": "Let's Go",

New:
    "start": "Start the 2-Minute Quiz",
```

**File:** `/Users/carolinebridges/drivewithjae/src/messages/ko.json`
```
Old:
    "start": "시작하기",

New:
    "start": "2분 퀴즈 시작하기",
```

---

## Change 12: Sticky Header -- Stronger Current Page Indicator

**File:** `/Users/carolinebridges/drivewithjae/src/components/Header.tsx`
**Priority:** 3

**Why:** Current active state is `bg-accent text-accent-foreground` which is very subtle (light gray background). Should use the brand color for clear wayfinding.

```
Old (line 49):
                pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground"

New:
                pathname.startsWith(item.href) ? "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300" : "text-muted-foreground"
```

---

## Change 13: Vehicle Grid -- Equal Height Rows

**File:** `/Users/carolinebridges/drivewithjae/src/components/LiveInventoryBrowser.tsx`
**Priority:** 3

**Why:** UX audit flagged jagged card heights as the #1 visual issue. Variable discount lines, feature badges, and CARFAX links create uneven rows.

```
Old (line 620):
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">

New:
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start">
```

And in `DealerVehicleCard.tsx`, make the card flex-stretch:

```
Old (line 53):
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">

New:
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
```

And make the card content grow to fill:
```
Old (line 90):
      <CardContent className="p-4">

New:
      <CardContent className="p-4 flex-1 flex flex-col">
```

And push the CTA to the bottom by adding `mt-auto` to the CTA link:
```
Old (line 203-205):
        <Link
          href={`/contact?vehicle=...`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"

New:
        <Link
          href={`/contact?vehicle=...`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
```

---

## Change 14: Badge Consistency -- NEW/USED Colors

**File:** `/Users/carolinebridges/drivewithjae/src/components/DealerVehicleCard.tsx`
**Priority:** 4

**Why:** The NEW badge (emerald-500) and USED badge (amber-500) are fine, but on vehicle detail page they match. Adding slight rounded-full for a more modern pill look would make them pop more.

```
Old (line 70):
          className={`absolute top-2 left-2 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${

New:
          className={`absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm ${
```

Apply the same to `VehicleDetail.tsx` line 155 for consistency.

---

## Change 15: Consistent Section Spacing

**File:** `/Users/carolinebridges/drivewithjae/src/app/[locale]/page.tsx`
**Priority:** 4

**Why:** Homepage sections use inconsistent vertical padding. Story section has `py-16 sm:py-24`, Values has `py-16 sm:py-24` (good), but final CTA also has `py-16 sm:py-24`. The CTA section should feel tighter since it's a simple call-to-action, not a content section.

```
Old (line 100):
      <section className="py-16 sm:py-24">

New:
      <section className="py-12 sm:py-16">
```

This makes the final CTA feel more compact and urgent, differentiating it from content sections.

---

## Change 16: Loading Skeleton Hint Instead of Just Spinner

**File:** `/Users/carolinebridges/drivewithjae/src/components/LiveInventoryBrowser.tsx`
**Priority:** 4

**Why:** Current loading state is just a centered spinner. Adding placeholder cards signals what's coming and reduces perceived wait time.

```
Old (lines 484-491):
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        <p className="text-muted-foreground">Loading inventory from Fred Anderson Kia...</p>
      </div>
    );
  }

New:
  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:py-12">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 h-9 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="mx-auto h-5 w-48 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
                <div className="h-6 w-1/3 rounded bg-muted animate-pulse" />
                <div className="h-9 w-full rounded-lg bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
```

---

## Implementation Priority Summary

| Priority | Change # | Description | Effort |
|----------|----------|-------------|--------|
| 1 | 1 | Sort dropdown (render + apply) | 15 min |
| 1 | 2 | Hero button contrast | 1 min |
| 1 | 3 | Korean break-keep | 1 min |
| 1 | 7 | Footer translations | 10 min |
| 2 | 4 | Card hover effect | 1 min |
| 2 | 5 | Card image aspect ratio | 1 min |
| 2 | 6 | Monthly payment prominence | 1 min |
| 2 | 8 | Empty state improvements | 5 min |
| 2 | 9 | Mobile bottom padding | 1 min |
| 3 | 10 | Filter chip colors | 2 min |
| 3 | 11 | Quiz CTA text | 1 min |
| 3 | 12 | Active nav indicator | 1 min |
| 3 | 13 | Equal height cards | 5 min |
| 4 | 14 | Badge pill shape | 1 min |
| 4 | 15 | CTA section spacing | 1 min |
| 4 | 16 | Loading skeleton | 5 min |

**Total estimated time: ~50 minutes for all 16 changes.**

---

## Changes NOT Recommended (Too Large)

These were identified in the reports but violate the "< 5 lines" and "no major rewrites" rules:

- Favorites/heart button (needs localStorage logic + new state + UI)
- Payment calculator on VDP (new interactive component)
- Photo swipe on cards (new state management per card)
- Vehicle comparison tool (entirely new feature)
- Pagination/infinite scroll (significant refactor of render logic)
- Homepage quick-filter categories (new section + URL param handling)
- Sticky mobile CTA bar on VDP (new fixed-position component)
- Deal value badges (requires external price data integration)
- New Arrival badges (requires persisting firstSeenAt in sync API)

These should be tackled in a separate sprint after the polish changes land.
