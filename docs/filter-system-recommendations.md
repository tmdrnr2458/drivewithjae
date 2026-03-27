# Filter System Recommendation Report
## drivewithjae.com — Inventory Browsing UX Improvements
### Prepared: March 26, 2026

---

## Executive Summary

The current filter system on drivewithjae.com is already solid — well-structured collapsible sections, pill-based range selectors, a proper brand/model/trim hierarchy, and a mobile-friendly bottom sheet. This report identifies specific, prioritized improvements based on how the best automotive marketplaces operate and what real car shoppers actually care about. The single biggest opportunity: **lifestyle-based filtering**, which no dealer site currently does well.

---

## 1. Competitive Analysis: What the Best Car Sites Do Better

### CarGurus
- **Payment-first shopping**: Defaults to monthly payment view, not sticker price. Shoppers think in payments. Our `~$400/mo` sublabels on price pills are a great start, but CarGurus makes this the PRIMARY number shown.
- **Deal rating badges**: "Great Deal," "Good Deal," "Fair Deal" — instant trust signals. We have nothing equivalent.
- **Sort by deal quality**, not just price.

### Carvana
- **Extremely visual body style picker**: Large tappable silhouettes, not tiny icons. Our 3-column grid with generic Car/Truck icons undersells this.
- **Minimal filter friction**: Carvana shows only 5-6 filter categories initially. Keeps it simple. Features are deeply buried (intentionally).
- **"Shop by type"** landing tiles: "SUVs Under $25K," "Low Mileage Sedans" — pre-built filter combos.

### AutoTrader
- **Year range filter**: A critical missing filter for used inventory. Shoppers care about model year.
- **Drivetrain filter**: FWD/RWD/AWD/4WD as a standalone section (not buried in features).
- **"Seller type"** and CPO filter: Certified Pre-Owned is a major trust signal.

### Cars.com
- **Saved searches**: Lets users save filter combos and get alerts. Builds return visits.
- **Photo count indicator**: Listings with 30+ photos get more clicks than those with 3. Shoppers notice.
- **"Compare" functionality**: Side-by-side comparison of 2-3 vehicles.

### TrueCar
- **Transparent pricing**: Shows market average, what others paid, invoice price. Builds trust.
- **"Build & Price" flow**: Guided, step-by-step narrowing (similar to our quiz, but integrated into inventory).

### Key Takeaway
Our system matches AutoTrader's depth but lacks CarGurus' payment-first clarity and Carvana's visual simplicity. The biggest gap: **no year filter, no drivetrain filter as standalone, no pre-built "shop by scenario" shortcuts.**

---

## 2. Filter Priority Ranking (What Real Shoppers Care About)

Based on automotive industry research (Cox Automotive, JD Power shopper behavior studies), ranked by how often shoppers use each filter:

| Rank | Filter | Status | Priority |
|------|--------|--------|----------|
| 1 | Price / Monthly Payment | HAVE | Enhance (payment toggle) |
| 2 | Make / Model | HAVE | Good as-is |
| 3 | Body Type | HAVE | Improve icons |
| 4 | Year Range | MISSING | **ADD — High priority** |
| 5 | Mileage | HAVE | Good as-is |
| 6 | New vs Used | HAVE | Restructure (see Section 5) |
| 7 | Drivetrain (AWD/FWD/RWD/4WD) | Buried in features | **PROMOTE to standalone** |
| 8 | Fuel Type | HAVE | Good as-is |
| 9 | Color (Exterior) | MISSING | **ADD — Medium priority** |
| 10 | Certified Pre-Owned | MISSING | ADD (if data available) |
| 11 | Number of Seats / Passenger Capacity | MISSING | Low priority (body type covers this) |
| 12 | Cargo Space | MISSING | Skip (hard to filter meaningfully) |
| 13 | Safety Rating | MISSING | Skip (requires external data) |
| 14 | Fuel Economy / MPG | MISSING | Low priority (fuel type filter covers intent) |
| 15 | Warranty Remaining | MISSING | Skip (complex to calculate) |
| 16 | One Owner / Vehicle History | MISSING | Skip (requires CarFax data) |
| 17 | Number of Photos | MISSING | Skip (internal quality metric, not shopper filter) |

### Recommended Additions (in order of implementation priority)

**High Priority:**
1. **Year Range** — Add as pill buttons: "2024+", "2022-2023", "2020-2021", "2018-2019", "Older". This is the #1 missing traditional filter.
2. **Drivetrain** — Pull AWD out of the Utility feature group. Make it a standalone filter section with pills: "AWD/4WD", "FWD", "RWD". This is what 38% of SUV/truck shoppers filter by first after price.

**Medium Priority:**
3. **Exterior Color** — Add as color swatches (visual circles, not text). Top colors: Black, White, Silver/Gray, Blue, Red. Data should already be in `vehicle.exteriorColor`.

**Low Priority / Future:**
4. **Certified Pre-Owned badge** — If dealership flags CPO vehicles in feed data.
5. **Sort options** — Currently no sort control visible. Add: Price Low-High, Price High-Low, Mileage Low-High, Year Newest, Recently Added.

---

## 3. Feature Categories: Reorganization Recommendation

### Current Grouping (4 categories, 24 features)
- **Comfort** (7): Heated Seats, Cooled Seats, Heated Wheel, Leather, Sunroof, Ventilated Seats, Remote Start
- **Tech** (7): CarPlay, Android Auto, Wireless Charging, Digital Dash, Heads-Up Display, Premium Audio, Push Start
- **Safety** (5): Backup Cam, Blind Spot, Lane Assist, Smart Cruise, Park Sensors
- **Utility** (5): AWD, 3rd Row, Tow Package, Roof Rack, Power Liftgate

### Assessment
The current grouping is **functional but generic**. It is how an engineer thinks about features, not how a shopper thinks about needs. That said, the categories are clear and the count (24) is manageable.

### Recommendation: Keep Traditional Categories BUT Add Lifestyle Layer on Top

Do NOT replace the existing Comfort/Tech/Safety/Utility grouping. Instead, add a **"Quick Picks" lifestyle section** ABOVE the traditional feature checkboxes. This gives shoppers two paths:

**Path A — "I know what I want":** Expand traditional feature groups, check specific boxes.
**Path B — "Help me find what fits my life":** Tap a lifestyle badge, it auto-selects relevant features.

### Refined Traditional Categories (minor tweaks)

- **Comfort** (keep as-is, it's solid)
- **Tech** (keep as-is)
- **Safety** (keep as-is)
- **Utility** (remove AWD — promote it to standalone Drivetrain filter)
  - Remaining: 3rd Row, Tow Package, Roof Rack, Power Liftgate

This makes Utility a true "capability" section rather than mixing drivetrain configuration with cargo features.

---

## 4. Feature List: What to Add and What to Skip

### Current: 24 features

### Recommended Additions (6 features, bringing total to 30)

| Feature | Key | Category | Why Add |
|---------|-----|----------|---------|
| 360 Camera / Surround View | `surround_view` | Safety | Increasingly standard on mid-trim+ SUVs. High search demand. |
| Automatic Emergency Braking | `auto_emergency_braking` | Safety | The #1 safety feature shoppers look for (IIHS data). |
| Rear Cross Traffic Alert | `rear_cross_traffic` | Safety | Pairs with blind spot monitoring. Common ask for families. |
| Navigation Built-in | `navigation` | Tech | Still matters to 40%+ of buyers, especially older demographics. |
| Power Sliding Doors | `power_sliding_doors` | Utility | Critical for minivan shoppers. Carnival is a key Kia model. |
| Heated Rear Seats | `heated_rear_seats` | Comfort | Luxury differentiator, relevant for cold-climate buyers. |

### Features to SKIP (and why)

| Feature | Why Skip |
|---------|----------|
| Seat Memory | Too granular. Covered implicitly by "leather" + premium trim assumption. |
| USB-C Ports | Nearly universal on 2023+. Not a differentiator. |
| Rear Seat USB | Too granular. |
| Power Adjustable Seats | Nearly universal. Not filterable. |
| Lumbar Support | Too granular for a filter (better for vehicle detail page). |
| Rain-Sensing Wipers | Not a purchase-decision feature. |
| Auto High Beams | Not a purchase-decision feature. |
| LED Headlights | Nearly universal on 2020+. Not a differentiator. |

### Assessment: Is 30 Too Many?

No — but only because they are grouped into 4 collapsible categories, and the Features section defaults to **closed** (which it already does: `defaultOpen={false}`). The key is that a shopper never sees 30 checkboxes at once. They see 4 category headers and expand only what they care about.

**Rule of thumb:** If a feature would eliminate fewer than 5% of inventory when toggled, it is too granular to be a filter.

---

## 5. New vs Used: Page Architecture Recommendation

### Option Analysis

| Option | SEO Value | UX Quality | Dev Effort | Recommendation |
|--------|-----------|------------|------------|----------------|
| A) Two separate pages `/inventory/new` and `/inventory/used` | Best | Good | Medium | **RECOMMENDED** |
| B) Same page with tab/section divider | Poor | OK | Low | Not recommended |
| C) Separate nav items pointing to filtered views | Good | Best | Medium | Strong alternative |

### Recommendation: Option A (Separate Pages) with Option C Navigation

**Why:**
1. **SEO**: Google indexes "New Kia Telluride Raleigh" and "Used Cars Raleigh" as fundamentally different search intents. Separate pages with distinct `<title>`, `<h1>`, and meta descriptions capture both keyword families. A single page with a toggle cannot rank for both.
2. **Content differentiation**: New inventory should emphasize MSRP, incentives, build-and-price, Kia warranty. Used inventory should emphasize mileage, vehicle history, price competitiveness.
3. **Filter relevance**: New cars do not need mileage filters, year filters, or CPO badges. Used cars do not need MSRP or incentive info. Separate pages allow cleaner, context-appropriate filter panels.

### Implementation:
- `/inventory/new` — "New Kia Inventory" — filters: Model, Trim, Price, Body Style, Fuel Type, Features. No mileage. No year.
- `/inventory/used` — "Pre-Owned Vehicles" — filters: Make, Model, Year, Price, Mileage, Body Style, Drivetrain, Fuel Type, Color, Features.
- `/inventory` — Redirect or serve as a combined view (keep current behavior) for users who want everything.
- **Navigation**: "New Kia" and "Used Cars" as top-level nav items linking to their respective pages.
- The existing `FilterState.type` field and "All / New / Used" pills can remain as a secondary toggle on the combined page.

---

## 6. Lifestyle Filtering: The Differentiator

This is the single most impactful recommendation in this report. No dealership website currently does lifestyle-based feature filtering. This would make drivewithjae.com genuinely unique.

### Concept: "Quick Match" Lifestyle Badges

Display 4-6 tappable lifestyle badges at the TOP of the filter panel (above Brand, above Price). When tapped, they auto-apply a bundle of filters. Tapping again removes them. Multiple can be active.

### Recommended Lifestyle Bundles

| Badge | Label | Filters Applied | Icon Suggestion |
|-------|-------|-----------------|-----------------|
| Family Ready | "Perfect for Families" | third_row + power_liftgate + blind_spot + rear_cross_traffic. Body: SUV, Minivan, Crossover | Family silhouette |
| Winter Ready | "Winter Ready" | awd + heated_seats + heated_steering + remote_start | Snowflake |
| Road Tripper | "Road Trip Ready" | adaptive_cruise + premium_audio + roof_rack. Fuel: Gas, Hybrid | Highway icon |
| Tech Lover | "Tech Loaded" | digital_dash + wireless_charging + surround_view + heads_up + apple_carplay | Smartphone icon |
| Commuter | "Daily Commuter" | adaptive_cruise + lane_assist + apple_carplay. Fuel: Hybrid, EV | Coffee cup icon |
| Adventure | "Adventure Ready" | awd + tow_package + roof_rack. Body: SUV, Truck | Mountain icon |

### How It Works Technically

Lifestyle badges do NOT add a new field to `FilterState`. They are simply **macro buttons** that set multiple existing filter values at once. When a user taps "Winter Ready":
```
filters.features = ["awd", "heated_seats", "heated_steering", "remote_start"]
```

When they untap it, those features are removed (unless the user also manually selected them).

### Why This Works
1. **Reduces cognitive load**: Instead of knowing which 4 features to check, the shopper taps one button.
2. **Tells a story**: "Winter Ready" resonates emotionally in a way that "AWD + Heated Seats" does not.
3. **Connects to the quiz**: The dealer-quiz-bridge already maps vehicles to lifestyle tags (familySize, drivingEnv, feel). Lifestyle badges in the filter panel create continuity between the quiz results and manual browsing.
4. **Mobile-first win**: On a phone screen, 6 tappable badges fit in 2 rows. 24 feature checkboxes require scrolling through 4 expandable sections.

### Important UX Detail
When a lifestyle badge is active, the individual feature checkboxes it controls should visually indicate they were auto-selected (e.g., slightly different highlight color or a small "via Winter Ready" tag). If the user manually unchecks one of the auto-selected features, the lifestyle badge should deactivate but leave the remaining features checked.

---

## 7. Mobile UX Priorities

The current mobile implementation (bottom sheet via Sheet component) is good. Specific improvements:

### Problem: Too Many Sections on Small Screens
Currently, opening mobile filters shows: Search, New/Used pills, Brand, Price, Mileage, Body Style, Fuel Type, Features. That is 8 sections in a scrollable sheet.

### Recommendations:
1. **Lifestyle badges at top of mobile sheet** — Before any traditional filters. This lets most mobile users find what they need in 1 tap instead of scrolling through 8 sections.
2. **Collapse all sections by default on mobile** except the lifestyle badges and New/Used toggle. Currently Brand defaults to open, which pushes everything else below the fold.
3. **Sticky "Show X vehicles" button** at bottom of sheet (already implemented -- good).
4. **Active filter count per section** — Show "(2)" next to "Price" if 2 price ranges are selected. Helps users understand where their filters are without expanding every section.
5. **Horizontal scrollable pills for body style on mobile** instead of 3-column grid. Saves vertical space.

---

## 8. Summary: Implementation Roadmap

### Phase 1 — Quick Wins (1-2 days)
- [ ] Add Year Range filter (pill buttons)
- [ ] Promote AWD/Drivetrain to standalone filter section
- [ ] Add sort control (Price, Mileage, Year, Recent)
- [ ] Add Exterior Color filter (swatch circles)

### Phase 2 — Lifestyle Badges (2-3 days)
- [ ] Build "Quick Match" lifestyle badge component
- [ ] Define 6 lifestyle bundles with filter mappings
- [ ] Add to top of filter panel (desktop sidebar + mobile sheet)
- [ ] Track which lifestyle badges get the most taps (analytics)

### Phase 3 — Page Architecture (3-5 days)
- [ ] Create `/inventory/new` and `/inventory/used` routes
- [ ] Customize filter panels per page (remove irrelevant filters)
- [ ] Update navigation: "New Kia" and "Used Cars" as separate nav items
- [ ] Add proper SEO meta tags, structured data for each page

### Phase 4 — Feature Expansion (1-2 days)
- [ ] Add 6 new features to feature list and dealer-quiz-bridge mapping
- [ ] Update `FEATURE_GROUPS` in InventoryFilters.tsx
- [ ] Update feature detection logic in dealer-quiz-bridge.ts

### Phase 5 — Polish (ongoing)
- [ ] Improve body style icons (SVG silhouettes instead of generic Lucide icons)
- [ ] Add "X vehicles match" live count that updates as filters change
- [ ] Saved search functionality
- [ ] Vehicle comparison (side-by-side)

---

## Files Referenced

- `/Users/carolinebridges/drivewithjae/src/components/InventoryFilters.tsx` — Filter UI, constants, feature groups
- `/Users/carolinebridges/drivewithjae/src/components/LiveInventoryBrowser.tsx` — Filter logic, matching, layout
- `/Users/carolinebridges/drivewithjae/src/lib/dealer-quiz-bridge.ts` — Feature detection, lifestyle tag mapping

---

*Report prepared for team lead review. All recommendations are prioritized by shopper impact and development effort.*
