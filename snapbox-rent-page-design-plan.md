# Snapbox — Page 2 (Rent) Design Plan

Token system is inherited unchanged from [snapbox-design-plan.md](./snapbox-design-plan.md) — this page does not re-derive colors, type, spacing, or radii. Section 1 (hero) here is new copy but built on the same tokens as the homepage hero in [kepripun-landing.html](./kepripun-landing.html).

## Identity

**Subject**: the Rent track's own landing page — a premium rental catalog for event photo booths (weddings, corporate, parties), not a marketing-brochure SEO page.
**Audience**: event hosts and planners who are close to booking — they want to see the actual machines, configure one, check a real date, and pay a deposit, not read 2,000 words of copy first.
**Primary action**: *Browse → Select → Configure → Check Availability → Book*. Every section serves this funnel; nothing is decorative.
**Positioning**: "These are the booths. Which one do you want?" — commerce-catalog energy (Alibaba/Phoprint-influenced product discovery) wrapped in the same restrained, editorial visual language as the rest of the site so it still reads as one premium brand, not a marketplace bolt-on.
**SEO cluster**: primary — *photo booth rental*. Supporting — photo booth near me, photobooths for rent, photo booth rental near me, photo machine rental, event photo booth rental, photo booth rental packages, photo booth rental prices/cost/rates, party photo booth rental, selfie booth, selfie mirrors, and the booth-type terms (360/mirror/DSLR/digital/portable/AI).
**Target**: ~1,900 words total, ~70% visual / 30% text — word count comes from product metadata, spec tags, and FAQ answers, not prose blocks, so the page reads far lighter than 1,900 words looks on paper.

## Token System

*(inherited — see homepage plan for full table; restated only where this page needs a new but licensed use)*

- **Color**: `accent` (#6C4EF5) for all primary CTAs (*Check Availability*, *Book*, *Configure*). `track-rent` (#c8b8f5) is this entire page's ambient tint — reused far more heavily here than on the homepage, since this *is* the Rent track (not diluted across three tracks). `ink` (#1c1c22) for spec-tag pills. `surface-alt` (#f2f0f5) for zebra rows/backdrops.
- **Type**: Poppins, same scale as homepage. h2 32–36px/800, h3 20–22px/600, body 15–16px/400.
- **Spacing**: same 8px base; dense catalog/pricing sections use the 64–96px band, editorial sections use 96–128px.
- **Radius**: `rounded-2xl` (cards/images), `rounded-full` (buttons/pills) — no new radius introduced for product cards.
- **Motion**: same `.photo-tile`-style hover (scale + shadow lift) applied to the product catalog cards (Section 2) since they are the page's primary clickable surface — this page's equivalent of the homepage hero as "heaviest interactive moment."
- **Restraint ceiling**: unchanged — 6 core colors + 2 neutrals, 2 radii, 1 font family, 1 motion signature. No new tokens added for this page.

---

## Section-by-Section Plan

### Section 1 — Hero — *Hero, Variant B (full-bleed statement)*
- **Purpose**: state the page in one line, get to the catalog fast — no SEO paragraph.
- **Layout**: full-width cinematic event photograph, dark gradient scrim bottom-third, headline + subhead + CTA pair left-aligned over the scrim.
```
████████████████████████████████
        (event photograph)
PHOTO BOOTH RENTAL
Photo Booth Rental for
Weddings, Parties & Events
Choose your booth, customize the experience,
check your date, and book your event online.
[ Check Availability ]   Browse Booths
████████████████████████████████
```
- **Image:text ratio**: ~85% visual — this is the one section per the brief explicitly *not* carrying keyword-stuffed copy.
- **Type**: h1 48–60px/800 white; micro-label "PHOTO BOOTH RENTAL" as a small `ink`-on-white-10%-opacity pill, not tracked-out all-caps text directly on the photo (see self-critique — avoided the eyebrow-label tell by making it a pill, not bare tracked text).
- **Color**: `accent`-filled primary CTA (*Check Availability*), ghost/outline secondary (*Browse Booths*).
- **CTA**: primary drives to Section 11 (availability form) via anchor; secondary drives to Section 2.
- **SEO**: `<h1>Photo Booth Rental for Weddings, Parties & Events</h1>`, alt text "Guests using a photo booth at an evening wedding reception."
- **Spacing**: full-bleed, no side padding on the image itself; content block inset 64–96px from the left edge.

### Section 2 — Rental Product Showcase — *Feature grid, Variant C (asymmetric masonry) adapted to a filterable catalog*
- **Purpose**: the largest section on the page — the actual 15-machine catalog. This is the page's "heaviest visual moment," deliberately surpassing every other section (the hero stays a fast statement, not the peak).
- **Layout**: sticky filter bar (Booth Type / Event / Experience) above a 4-column product grid, uniform card aspect ratio (gallery-grid discipline applies even though this is a feature-grid archetype, since these are literal product photos).
```
[ All | 360 | Mirror | Digital | DSLR | Roaming | AI ]
[ All | Wedding | Corporate | Party | Other ]
[ Photo | Video | Interactive | Social ]

┌─────┬─────┬─────┬─────┐
│ 01  │ 02  │ 03  │ 04  │
├─────┼─────┼─────┼─────┤
│ 05  │ 06  │ 07  │ 08  │
├─────┼─────┼─────┼─────┤
│ ... 15 total ...       │
└─────┴─────┴─────┴─────┘
```
- **Card structure** (~30–40 words each): product photo, name + booth-type sub-label, 3 spec bullets as `ink` pills, "From $XXX / event," dual CTA (*Configure* ghost / *Check Availability* filled `accent`).
- **Image:text ratio**: ~70% image at the card level (photo dominates; text is metadata, not prose).
- **Color**: card surface white with `ring-1 ring-gray-100`; hover state uses the `.photo-tile` scale+lift (this page's designated heaviest-interaction zone). Filter chips use `track-rent` for the active state.
- **Filtering**: client-side, in-page — never routes to a separate page per machine on filter change (explicit UX requirement from brief).
- **SEO**: h2 "Which Photo Booth Can You Rent for Your Event?", intro paragraph 70–80 words (only prose block in this section), h3 or `<strong>` per product name, `<article>` per card, alt text per product photo naming the actual booth type and setting.
- **Spacing**: dense grid gap (16–24px) — catalog density is intentional here, contrasting with the airier hero above it.

### Section 3 — Booth Type Discovery — *Alternating feature rows, Variant A*
- **Purpose**: editorial, non-catalog explanation of the 6 booth categories — softens the page after the dense grid.
- **Layout**: 6 large horizontal rows, alternating image-left/image-right every row (never same side twice running), each a single booth type.
```
[ 360 photo   ] Would a 360 Photo Booth Make Your Event
[ image       ] More Dynamic?  (~45 words)  [Explore 360 Booths]

Would a Mirror Booth Create a More   [ mirror booth ]
Interactive Experience? (~45 words)   [ image        ]
[Explore Mirror Booths]

...continues alternating for DSLR / Digital / Portable / AI...
```
- **Image:text ratio**: ~45/55 per row, per alternating-row range.
- **Type**: h3 per row 20–22px/600 (question-phrased, matching brief exactly); body 15px `text-muted`, ~45 words.
- **Color**: no track tint needed (already on the Rent page) — plain white background, `ink` spec pill for the booth-type keyword under each h3.
- **Explicit decision**: no 01–06 numbering — six parallel categories, not a sequence (same rule applied on the homepage's Section 3).
- **SEO**: h2 "Which Type of Photo Booth Fits Your Event?", h3 per row exactly as briefed, alt text per image naming the booth type and a real use context, keyword-per-row as briefed (360 photo booth / mirror booth / DSLR photo booth / digital photo booth / portable photo booth / AI photo booth) — one mention each, no repetition across rows.
- **Spacing**: 96–128px section padding, generous 64–80px gap between rows so six rows don't blur into one scroll of sameness.

### Section 4 — Event Experience — *Feature grid, Variant A (image + label cards)*
- **Purpose**: shift from equipment to occasion — reuses the homepage's Section 2 card pattern but for event types, not tracks.
- **Layout**: 2×2 editorial image grid (brief specifies four-image grid, not 4-across single row — keeps it visually distinct from Section 2's 4-column catalog grid immediately above it in memory).
```
[ Wedding image   ] [ Corporate image ]
[ Party image     ] [ Other events image ]
```
- **Image:text ratio**: ~50/50 — each card is photo-top, question h3 + ~50–60 words below.
- **Type**: h3 per card, question-phrased exactly as briefed.
- **Color**: plain white cards, no track tint (event type, not track) — thin `border-b-4` in `track-rent` under each image as the one color cue, distinguishing these from Section 3's plain rows.
- **SEO**: h2 "What Kind of Event Can You Transform With a Photo Booth?", h3 per card as briefed, keywords one each (wedding photo booth, event photo booth, party photo booth rental, event photo booth rental / photography booth rental).
- **Spacing**: standard 96–128px, 24–32px grid gap.

### Section 5 — Rental Packages — *Pricing, 3-tier cards*
- **Purpose**: let visitors self-select Basic/Premium/Deluxe.
- **Layout**: standard 3-tier card row, Premium visually emphasized (larger scale + `accent` border) per the pricing archetype's rule that the recommended tier must differ in more than a badge.
```
[ BASIC        ] [  PREMIUM (raised, accent border)  ] [ DELUXE       ]
[ Booth         ] [  Enhanced experience               ] [ Full experience]
[ Standard exp. ] [  Additional features                ] [ Premium features]
[ Digital share ] [  More flexibility                   ] [ Branding/custom]
[ Std duration  ] [  Extended options                   ] [ Additional options]
[ Choose Basic  ] [  Choose Premium (accent fill)       ] [ Choose Deluxe ]
```
- **Image:text ratio**: 0–10%, per pricing guidance — icon/badge only, no photography (matches homepage Section 9's discipline).
- **Type**: tier name in `ink` pill; inclusions as a short bulleted list, 15px.
- **Color**: Basic/Deluxe cards plain white with hairline border; Premium card gets `track-rent` tinted backdrop + `accent` border + subtle scale-up, the one deliberately emphasized card on this page (contrast with Section 2 and Section 4, where all options are equal-weight).
- **Explicit constraint carried from brief**: no invented inclusions or numeric prices until the business confirms them — placeholder copy only ("Enhanced experience," "Additional features"), not fabricated dollar amounts or feature lists.
- **SEO**: h2 "Which Photo Booth Rental Package Is Right for You?", h3 per tier as briefed.
- **Spacing**: dense-section padding (64–96px).

### Section 6 — What's Included — *Feature grid, Variant A (icon + label), no card shell*
- **Purpose**: visual checklist, reusing the homepage's Section 6 icon-grid treatment (no shadow, no border) so this page doesn't invent a fourth card style.
- **Layout**: 4×3 checklist grid.
```
✓ Photo Booth   ✓ Camera        ✓ Touchscreen
✓ Lighting      ✓ Software      ✓ Digital Sharing
✓ Printing      ✓ Props         ✓ Backdrop
✓ Delivery      ✓ Setup         ✓ Pickup
```
- **Image:text ratio**: near 0% — checkmark glyph only, no photography, 10–15 words per item.
- **Color**: checkmark in `accent`, no icon badge fill (distinct from Section 6 on the homepage, which used a 10%-opacity accent badge — here the checklist itself is the visual unit, avoiding a repeated icon-badge treatment two sections after Section 4's photo cards).
- **SEO**: h2 "What Is Included With Your Photo Booth Rental?", items as a semantic `<ul>`.
- **Spacing**: dense (64–96px), tight row gaps (16px) — this section should read fast.

### Section 7 — Configuration — *Alternating feature row, Variant A (image-left)*
- **Purpose**: make the page feel like a real commerce configurator, reusing the homepage's Section 5 pattern (mockup + chip cloud) applied to booth-specific options.
- **Layout**: horizontal configurator preview strip, then 4 sub-questions below as compact rows (not full h3-per-question card sections — avoids over-fragmenting the hierarchy, same call made on the homepage's Section 5).
```
[ booth mockup ] BOOTH 360   SCREEN 27"   CAMERA DSLR
[ image        ] LIGHTING Studio   PRINTING 4×6
                 SHARING QR+SMS   BRANDING Custom
                 [ Configure This Booth ]

Can You Choose the Camera?
Can You Choose the Screen and Lighting?
Can You Add Printing and Sharing?
Can You Add Custom Branding?
```
- **Image:text ratio**: ~45/55, per alternating-row range — matches the homepage's Section 5 ratio intentionally (same section type, same rule).
- **Color**: one config chip shown in `accent`-filled "selected" state to imply live interactivity (identical device language to the homepage's configurator section, since this genuinely is the same configurator surfaced deeper in the funnel).
- **SEO**: h2 "How Can You Customize Your Photo Booth Rental?", the 4 sub-questions as `<h4>`/styled-strong (not h3 — same fragmentation rule as homepage Section 5), keyword coverage light-touch (no dedicated keyword list here per brief).
- **Spacing**: standard 96–128px.

### Section 8 — Rental Requirements — *Feature grid, Variant A (icon + label), 4-block*
- **Purpose**: illustrated venue-readiness checklist.
- **Layout**: 4 equal blocks.
```
SPACE       POWER        ACCESS        CONNECTIVITY
floor area? power?       reach?        wifi/mobile?
```
- **Image:text ratio**: 15–25% (icon per block, per feature-grid-icon range).
- **Color**: icon badge `accent` at 10% opacity — same treatment as homepage Section 6, licensed to repeat here since it's now 5 sections removed from Section 6's identical use on this page and reads as a callback, not adjacent repetition.
- **Explicit constraint carried from brief**: no exact technical specs stated until real machines are confirmed — questions framed as open ("What power access is needed?"), not fabricated numbers (e.g. no invented "requires a 15-amp circuit" claim).
- **SEO**: h2 "What Does Your Venue Need for a Photo Booth?", h3 per block.
- **Spacing**: dense (64–96px).

### Section 9 — Booking Flow — *Timeline/process, Variant A*
- **Purpose**: the genuinely sequential 5-step booking path — numbering is licensed here (same rule as homepage Section 4).
- **Layout**: horizontal 5-step spine, connecting line, stacking vertically on mobile.
```
01 ───── 02 ───── 03 ───── 04 ───── 05
Choose   Select   Configure Review   Book
         Date
```
- **Image:text ratio**: 10–15% — oversized numerals + connector line carry this section, not photography, giving a density break after the icon-heavy Section 8.
- **Type**: giant step numbers `text-6xl/800 text-accent/20` behind h3 titles (20px/600) — identical device to homepage Section 4, appropriate reuse since it's the same "sequential process" archetype used exactly once per page.
- **SEO**: h2 "How Does Photo Booth Rental Booking Work?", h3 per step exactly as briefed. `HowTo` schema is a stronger candidate here than on the homepage's routing-flow version, since these are genuinely sequential booking instructions.
- **Spacing**: dense (64–96px).

### Section 10 — Rental Cost — *Stat band / proof-by-numbers, Variant B (one dominant equation)*
- **Purpose**: explain price composition without publishing numbers — the brief's cost-breakdown "equation" graphic maps directly to the stat-band archetype (typography-led, near-zero imagery), not a pricing-card repeat of Section 5.
- **Layout**: single vertical equation, large plus signs, terminal "TOTAL."
```
BASE RENTAL
   +  DURATION
   +  BOOTH TYPE
   +  ADD-ONS
   +  DELIVERY
   +  SETUP
   =  TOTAL
[ Check Rental Availability ]
```
- **Image:text ratio**: near 0% — typography/plus-glyphs only, consistent with the stat-band archetype's discipline (matches homepage Section 8's near-zero-imagery comparison table in spirit).
- **Color**: `+`/`=` glyphs in `text-muted`, "TOTAL" in full-strength `accent`.
- **SEO**: h2 "How Much Does Photo Booth Rental Cost?", supporting keywords (rental prices/cost/rates/packages) placed once each in the one short explanatory line beneath the equation, not repeated.
- **Spacing**: dense (64–96px) — this and Sections 8–9 form a fast, low-imagery run before the page opens back up for Section 11's location form.

### Section 11 — Availability / Location — *Problem/context row adapted to a 3-field form*
- **Purpose**: handle "near me" intent through a functional tool, not repeated keyword text.
- **Layout**: 3-field inline form, single row desktop / stacked mobile.
```
WHERE IS YOUR EVENT?   WHEN IS YOUR EVENT?   HOW LONG?
[ Enter location ]     [ Select date ]       [ Select duration ]
          [ CHECK AVAILABILITY ]
```
- **Image:text ratio**: near 0% — this is a utility/form section, no photography needed.
- **Color**: `surface-alt` backdrop block behind the form (same device as homepage Section 5's chip-cloud backdrop) to separate it from the equation section above; primary CTA `accent`-filled.
- **SEO**: h2 "How Can You Find a Photo Booth Rental Near You?", explanatory copy 120–140 words total, "near me" phrase appears once in the h2/intro, not repeated across the form labels (explicit anti-stuffing rule from brief).
- **Spacing**: dense (64–96px), form fields get generous 16–24px internal padding for touch-friendliness.

### Section 12 — Rental Experience / Social Proof — *Testimonial, Variant A (single featured, with stat overlay) + short quote set*
- **Purpose**: re-open the page visually after three consecutive low-imagery sections (8, 9, 10 were text/utility-led; this is the deliberate return to photography before Section 13's text-led trust grid).
- **Layout**: one large event photograph, 3 small overlay stat/label chips, 2–3 testimonial quotes below.
```
████████████████████████████
      (large event photo)
  Easy Booking | Professional Equipment | Memorable Experiences
████████████████████████████
"quote..." — Name          "quote..." — Name
```
- **Image:text ratio**: ~60–70% image — the photo is the section's anchor, quotes are short (per brief, 120–150 words total).
- **Color**: overlay chips in `ink`-on-white-pill style (matches hero's micro-label device), tying this section back to Section 1 visually.
- **SEO**: h2 "What Does a Great Photo Booth Rental Experience Look Like?", alt text describing the actual event scene; consider `Review` schema only if quotes are genuine (same caveat as homepage).
- **Spacing**: standard 96–128px — this section is allowed to breathe after the dense utility run.

### Section 13 — Why Choose Us — *Feature grid, Variant A, 6-block, no card shell*
- **Purpose**: premium visual trust grid, second-to-last per brief.
- **Layout**: 2×3 grid of short pillars.
```
A Booth for Every Experience    Simple Online Booking
Flexible Configurations          Event-Ready Equipment
Professional Support             One Place to Rent or Buy
```
- **Image:text ratio**: 0% — no photography, deliberately quieter than Section 12 immediately before it (matches the homepage's rule that Section 10's trust grid stays calmer than the section before it).
- **Type**: h3 per pillar 16–18px/600, 20–30 word body per brief.
- **Color**: top accent rule only (`border-t-4 border-accent/30`), no shadow, no fill — same masonry/rule-only device as homepage Section 10, licensed here as this page's one comparable trust moment.
- **SEO**: h2 "Why Choose Us for Your Photo Booth Rental?", h3 per pillar.
- **Spacing**: standard-to-dense (80–112px).

### Section 14 — FAQ — *FAQ accordion*
- **Purpose**: final section per brief, primary AEO surface for this page.
- **Layout**: single column, max-width ~760px centered, native `<details>`/`<summary>`.
```
How much does it cost to rent a photo booth?        [+]
How far in advance should you book a photo booth?    [+]
What types of photo booths can you rent?              [+]
Can you customize a photo booth rental?               [+]
Does photo booth rental include delivery and setup?   [+]
How long can you rent a photo booth?                  [+]
Can you rent a photo booth near you?                  [+]
Can you rent a photo booth for a wedding or party?     [+]
Can you add printing and digital sharing?              [+]
What space and power does a photo booth require?       [+]
```
- **Image:text ratio**: 0% — text-forward by design, same license as the homepage FAQ.
- **Type/Color**: identical to homepage Section 12 (question 16px/600, answer 15px/400 `text-muted`, hairline row border, `accent` toggle glyph) — this is the one section where exact visual reuse across pages is correct, since FAQ is a recognizable, consistent UI pattern site-wide.
- **SEO**: strong `FAQPage` schema candidate; questions written exactly as briefed (search-phrased, not marketing-voice).
- **Spacing**: 96–128px section padding.

---

## Visual Flow Summary

**Layout rhythm, in order**:
1. Hero (full-bleed statement)
2. Feature grid — catalog masonry (filterable, photo-forward)
3. Alternating feature rows ×6 (editorial booth types, alternating sides)
4. Feature grid — image cards, 2×2 (event types)
5. Pricing — 3-tier cards (packages)
6. Feature grid — icon checklist, no shell (what's included)
7. Alternating feature row — image-left (configurator)
8. Feature grid — icon blocks, 4-across (venue requirements)
9. Timeline/process — numbered, horizontal (booking flow)
10. Stat band — typographic equation (cost)
11. Form/utility row (availability)
12. Testimonial — featured photo + stat overlay + quotes (experience)
13. Feature grid — rule-only pillars, no shell (why choose us)
14. FAQ accordion

No archetype repeats back-to-back. "Feature grid" recurs four times (2, 4, 6, 8, 13 — five times total) but each use is a visibly different variant (photo-catalog masonry / image-cards / icon-checklist-no-shell / icon-blocks / rule-only-pillars-no-shell), matching the homepage's rule that repeated archetypes must differ in treatment, not just content.

**Density rhythm**: heavy (1, hero) → heaviest (2, catalog — the page's actual peak, since commerce discovery is the point) → medium-editorial (3) → medium (4) → dense (5, pricing) → light (6, checklist) → medium (7, configurator) → dense (8, requirements) → dense (9, timeline) → dense (10, equation) → dense (11, form) → medium-heavy (12, photo return) → light (13, pillars) → light (14, FAQ). The 8–9–10–11 run is deliberately four consecutive dense/utility sections (matching the brief's own instinct to keep pricing/logistics fast), broken by Section 12's photography return before the page closes.

**Eye path**: Section 2 (catalog) is the actual heaviest visual moment on this page — not the hero, a deliberate departure from the homepage's hero-is-heaviest rule, because this page's job is commerce discovery, not a single statement. Every section after 2 is visibly quieter until Section 12's photo callback, then the page closes light (13, 14). Vertical single-column scroll throughout, with Sections 3 and 7 carrying the left/right alternation.

**The one heaviest moment**: Section 2, the 15-machine catalog grid — matches the brief's own explicit instruction ("the 15 rental machines are the hero of Page 2 after the actual hero").

## SEO Structure Summary

**Heading hierarchy**:
```
h1  Photo Booth Rental for Weddings, Parties & Events
 h2 Which Photo Booth Can You Rent for Your Event?
 h2 Which Type of Photo Booth Fits Your Event?
  h3 Would a 360 Photo Booth Make Your Event More Dynamic?
  h3 Would a Mirror Booth Create a More Interactive Experience?
  h3 Would a DSLR Booth Be Better for Premium Photography?
  h3 Would a Digital Booth Be the Simplest Choice?
  h3 Would a Portable or Roaming Booth Suit Your Venue?
  h3 Could an AI Booth Create a More Interactive Experience?
 h2 What Kind of Event Can You Transform With a Photo Booth?
  h3 Could a Photo Booth Become Part of Your Wedding Celebration?
  h3 Could a Photo Booth Make Your Corporate Event More Memorable?
  h3 Could a Selfie Booth Keep Your Party Guests Engaged?
  h3 Could a Photo Booth Fit Your Next Special Event?
 h2 Which Photo Booth Rental Package Is Right for You?
  h3 What Do You Get With the Basic Package?
  h3 What Makes the Premium Package Different?
  h3 What Is Included in the Deluxe Experience?
 h2 What Is Included With Your Photo Booth Rental?
 h2 How Can You Customize Your Photo Booth Rental?
 h2 What Does Your Venue Need for a Photo Booth?
 h2 How Does Photo Booth Rental Booking Work?
 h2 How Much Does Photo Booth Rental Cost?
 h2 How Can You Find a Photo Booth Rental Near You?
 h2 What Does a Great Photo Booth Rental Experience Look Like?
 h2 Why Choose Us for Your Photo Booth Rental?
 h2 What Do People Ask Before Renting a Photo Booth?
  h3 How much does it cost to rent a photo booth?
  h3 How far in advance should you book a photo booth?
  h3 What types of photo booths can you rent?
  h3 Can you customize a photo booth rental?
  h3 Does photo booth rental include delivery and setup?
  h3 How long can you rent a photo booth?
  h3 Can you rent a photo booth near you?
  h3 Can you rent a photo booth for a wedding or party?
  h3 Can you add printing and digital sharing?
  h3 What space and power does a photo booth require?
```
No skipped levels. Section 2's product names sit as `<strong>`/card titles inside `<article>` elements rather than a new h3 tier, keeping the tree from over-fragmenting under a 15-item catalog.

**Semantic HTML mapping**:
- `<header>` — shared site nav (already built)
- `<main>` wraps Sections 1–14
- `<section aria-labelledby="[section]-heading">` per section
- `<article>` per product card (Section 2), per testimonial (Section 12), per FAQ entry (Section 14)
- `<form>` for Section 11's availability check, with real `<label>` elements per field (not placeholder-only inputs)
- `<footer>` shared, closing the page

**Keyword placement**: primary phrase "photo booth rental" lives in the h1, the first 100 words of Section 2's intro paragraph, and the Section 2/5/10 h2s. Supporting terms are distributed one-per-section rather than stacked: "photo booth near me" / "photo booth rental near me" → Section 11 only; "photo booth rental packages/prices/cost/rates" → Sections 5 and 10 (packages vs. cost breakdown, not duplicated wording); booth-type terms (360/mirror/DSLR/digital/portable/AI) → Section 3 only, one per row; "party photo booth rental" / "event photo booth rental" → Section 4 only.

**Alt-text plan** (representative): Section 1 — wedding reception booth scene. Section 2 — one descriptive alt per product photo naming the actual booth type + a neutral studio or event setting. Section 3 — one alt per row naming the booth type and a real use context. Section 4 — one alt per event-type image (wedding/corporate/party/other). Section 12 — the featured event photo described by the actual scene, not by keyword stuffing.

**Schema candidates to flag for build**: `Product`/`Offer` per catalog item (Section 2, once real pricing exists), `HowTo` (Section 9, stronger candidate here than the homepage's routing version since these are literal booking instructions), `FAQPage` (Section 14), `Review`/`AggregateRating` (Section 12, only if genuine).

## Self-Critique Log

- **Checked** warm-cream+serif or near-black+acid defaults — not applicable; page inherits the homepage's Saturated-brand purple-on-white system, confirmed still clear of both defaults.
- **Caught**: an early instinct to give the Section 2 catalog cards, Section 4 event cards, and Section 5 pricing cards all the same `rounded-2xl shadow-lg` treatment purely because they're all "cards." **Changed**: Section 2 keeps shadow+hover-lift (genuinely the page's most clickable surface), Section 4 uses a plain card with only a `track-rent` bottom border (no shadow), Section 5 uses shadow only on the emphasized Premium tier (Basic/Deluxe stay flat-bordered) — no three consecutive card sections share an identical shell.
- **Caught**: a draft instinct to add 01–15 numbered badges to the Section 2 catalog for visual polish (echoing the brief's own numbered wireframe, "01 02 03..."). **Changed**: those numbers in the brief are wireframe placeholders for grid position, not a designed sequence — removed from the actual design; numbering stays reserved for Section 9 (booking flow), the one genuinely sequential process on this page.
- **Checked** tracked-out ALL-CAPS eyebrow labels — the hero's "PHOTO BOOTH RENTAL" label is rendered as a soft pill (not bare tracked text floating on the photo) specifically to avoid this tell; no other section carries an eyebrow label.
- **Checked** the `→`/`↗` arrow-glyph tell — not used anywhere on this page; all CTAs are plain text-in-pill (*Check Availability*, *Configure*, *Book*), since none of this page's actions point to an external surface the way the homepage's Software CTA did.
- **Checked** flat 50/50 image:text default — explicitly varied per section (Section 2 ~70%, Section 6 ~0%, Section 10 ~0%, Section 12 ~65%), matching the brief's own per-section visual-to-text guidance rather than defaulting evenly.
- **Checked** blanket hover-lift/entrance-animation — motion signature restricted to Section 2's catalog cards only (this page's designated heaviest interactive zone); Sections 4, 5, 6, 8, 13 have no hover or entrance animation.
- **Caught**: a draft instinct to invent specific rental prices ($150/event, etc.) and exact venue power/space specs to make Sections 5, 8, and 10 feel more finished. **Changed**: removed all fabricated numbers per the brief's explicit instruction — placeholder/structural copy only until the business supplies real figures ("Enhanced experience," "What power access is needed?" as an open question, not an invented spec).
- **Checked** same-side alternating-row repetition — Section 3 is the only 6-row alternating section on the page and strictly alternates left/right every row without repeating a side twice consecutively; Section 7 (the other alternating-row section) is far enough separated (4 sections later) that its image-left choice doesn't read as a repeat of Section 3's pattern.
