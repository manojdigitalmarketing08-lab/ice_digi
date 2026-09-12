# Snapbox — Page 4 (Software) Design Plan

Token system is inherited unchanged from [snapbox-design-plan.md](./snapbox-design-plan.md) — this page does not re-derive colors, type, spacing, or radii. `track-software` (#b8d6f5) is this page's ambient tint, the same role `track-rent` plays on [snapbox-rent-page-design-plan.md](./snapbox-rent-page-design-plan.md).

## Identity

**Subject**: the gateway/overview page for Snapbox's photo booth software — a separate hosted platform, not a page that transacts. This page's job is to build enough confidence and clarity that a visitor leaves the marketing domain and continues onto the software platform.
**Audience**: event hosts and booth operators evaluating *capability* (what can the software actually do, will it work with the hardware they already have) before they're willing to click through to a second site.
**Primary action**: *Understand → See Capabilities → Check Compatibility → Visit Software Platform*. Every section builds toward the hand-off; nothing here should look like a checkout flow, because there isn't one on this domain.
**Positioning**: Premium SaaS/technology/editorial — the interface itself is the hero, not the booth hardware (that's Rent/Buy's job). This page should look and feel like a software product page (Stripe/Linear-adjacent restraint and confidence), wrapped in Snapbox's existing purple-on-white system so it still reads as one brand, not a third-party tool bolted on.
**Explicit design rule**: do not let this page read like Rent (products → price → availability) or Buy (products → specs → comparison → configure). This page's shape is interface → capabilities → experiences → compatibility → external platform — a distinct rhythm is what makes the three pages feel like one intentional site rather than three templates.
**SEO cluster**: primary — *photo booth software*. Supporting — photo booth program, interactive photo booth, digital photo booth, DSLR photo booth, DSLR camera photo booth, photo booth app, iPad photo booth app, photo booth for iPad app, iPhone photo booth, AI photo booth software, cloud photo booth software, green screen photo booth software, booth operator software.
**Target**: ~1,900 words total (brief's own section table sums to ~2,000; both are the same order of magnitude), ~75% visual / 25% text — driven by UI screenshots, workflow graphics, and a compatibility matrix rather than prose blocks.
**Conversion note carried from brief**: "photo booth software subscription" and "photo booth software pricing" are low-volume queries — this page treats access/pricing language as secondary conversion copy (Section 10) rather than an SEO target, and never simulates a checkout the software platform itself owns.

## Token System

*(inherited — see homepage plan for the full table; restated only where this page licenses a new-but-already-existing use)*

- **Color**: `track-software` (#b8d6f5) is this entire page's ambient tint — used far more heavily here than its one appearance on the homepage (Section 7), since this page *is* the Software track. `accent` (#6C4EF5) for every primary action. `ink` (#1c1c22) reused as the hero's dark scrim/backdrop — not a new near-black palette, the same dark-neutral token already licensed for micro-label pills, now used as a photography scrim exactly like the Rent hero's dark gradient-over-photo device (see self-critique on avoiding a near-black+accent default).
- **Type**: Poppins, same scale as homepage/Rent. h2 32–36px/800, h3 20–22px/600, body 15–16px/400.
- **Spacing**: same 8px base; interface/workflow sections get generous 96–128px padding (this page is meant to breathe, unlike Rent's dense catalog rhythm); the compatibility matrix and FAQ use the 64–96px dense band.
- **Radius**: `rounded-2xl` (UI mockup frames, cards), `rounded-full` (buttons/pills) — no new radius for hotspot markers (small filled circles, not a new shape token).
- **Motion**: `.photo-tile`-style hover reserved for Section 5's media carousel cards (this page's designated "genuinely clickable" surface) and for Section 4's UI hotspots (subtle scale on hover to read as interactive, not decorative). Not applied to the compatibility matrix, workflow diagrams, or FAQ.
- **Restraint ceiling**: unchanged — 6 core colors + 2 neutrals, 2 radii, 1 font family, 1 motion signature. No new tokens introduced for this page.
- **CTA-arrow rule (page-specific, carried from the homepage's existing precedent)**: the `↗` glyph is reserved *exclusively* for CTAs that hand off to the external software platform — "Explore Software ↗", "Check Software Compatibility ↗", "View Software Platform ↗". Every CTA that stays on this domain (e.g. "See Compatible Booths," the Buy cross-sell) is plain text, no arrow — this keeps the arrow meaningful (external hop) instead of becoming decorative on every button, the exact tell flagged in Phase 5.

---

## Section-by-Section Plan

### Section 1 — Hero — *Hero, Variant C (dark cinematic product shot)*
- **Purpose**: state the software's value in one line and put the interface itself on screen — no laptop-on-desk stock-photo default.
- **Layout**: full-width dark cinematic background (event photography treated with a heavy `ink` scrim, not a flat color field), headline block left, a real software-interface mockup floating right in a `rounded-2xl` frame with `ring-4 ring-white/10 shadow-2xl`.
```
████████████████████████████████████████
  PHOTO BOOTH SOFTWARE
  Photo Booth Software Built to Power
  Better Experiences at Every Event
  Capture, create, print and share from one
  flexible photo booth platform.
  [ Explore Software ↗ ]   See Compatible Booths
                          ┌───────────────────┐
                          │  SOFTWARE UI MOCK  │
                          └───────────────────┘
████████████████████████████████████████
```
- **Image:text ratio**: ~80% visual — the UI mockup + background photography carry the section; copy is two short lines.
- **Type**: h1 48–60px/800 white, 12 words ("...at Every Event" variant, per brief's own word-count correction); supporting line 16px/400 white/80%; micro-label "PHOTO BOOTH SOFTWARE" as an `ink`-on-white-10%-opacity pill (same device as Rent's hero label, not bare tracked-caps text).
- **Color**: `accent`-filled primary CTA, ghost/outline secondary. `track-software` used as a thin 2px accent line under the UI mockup frame — the page's first tint appearance.
- **CTA**: primary "Explore Software ↗" → external platform; secondary "See Compatible Booths" (plain text, no arrow) → Section 6.
- **SEO**: `<h1>Photo Booth Software Built to Power Better Experiences at Every Event</h1>`, alt text "Photo booth software interface showing a live event capture screen."
- **Spacing**: full-bleed background; content block inset 64–96px.

### Section 2 — What Can Photo Booth Software Help You Do? — *Feature grid, Variant A (8-block icon/screenshot grid)*
- **Purpose**: the page's primary capability overview — eight short, question-phrased features, not eight paragraphs.
- **Layout**: 4×2 grid, each cell a small screenshot/preview over a one-line question + 25–30 word answer.
```
┌──────────┬──────────┬──────────┬──────────┐
│ Capture  │Interactive│  Print   │  Share   │
├──────────┼──────────┼──────────┼──────────┤
│ Branding │   GIF    │  Green   │   AI     │
└──────────┴──────────┴──────────┴──────────┘
```
- **Image:text ratio**: ~65% — each cell is preview-dominant, ~25–30 words below.
- **Type**: h3 per cell 18–20px/600 (question-phrased exactly as briefed), body 14–15px `text-muted`.
- **Color**: cell background white, no card shell/shadow (matches the homepage Section 6 icon-grid discipline — no border, no shadow, so this doesn't compete visually with Section 5's carousel cards, which *do* get the shadow+hover treatment).
- **SEO**: h2 "What Can Photo Booth Software Help You Do?", intro 40–50 words above the grid (only prose in this section), h3 per cell as briefed, alt text per screenshot naming the actual feature shown. "AI photo booth software" keyword lands in the AI cell only.
- **Spacing**: standard 96–128px, 24px grid gap.

### Section 3 — How Does Photo Booth Software Turn a Capture Into an Experience? — *Timeline/process, Variant A*
- **Purpose**: the one genuinely sequential explanation on this page — numbering is licensed here (same rule as homepage Section 4 / Rent Section 9).
- **Layout**: horizontal 5-step spine with connecting line, large single workflow visual dominating the section.
```
01 ──── 02 ──── 03 ──── 04 ──── 05
CAPTURE CREATE  CUSTOMIZE SHARE  PRINT
```
- **Image:text ratio**: ~80% — the horizontal graphic occupies most of the section per brief; each step gets one short line, not a paragraph.
- **Type**: giant step numerals `text-6xl/800 text-accent/20` behind h3 titles (20px/600) — same device as homepage Section 4/Rent Section 9, appropriate here as the page's one sequential-process section.
- **Color**: connecting line in `track-software` at full strength (not the usual 30–40% tint) since this is the page's process spine, not a card accent.
- **SEO**: h2 "How Does Photo Booth Software Turn a Capture Into an Experience?", h3 per step exactly as briefed. `HowTo` schema candidate.
- **Spacing**: standard 96–128px (brief's ~180 words justifies more breathing room than Rent's equivalent dense timeline).

### Section 4 — Which Features Can You Control From the Booth? — *Alternating feature row adapted to an annotated UI mockup*
- **Purpose**: give the software credibility as a real, controllable product — a large annotated interface, not another icon grid (avoids repeating Section 2's grid pattern back-to-back).
- **Layout**: one large software-UI mockup, filling ~70% of the section width, with 10 numbered hotspot markers; hotspot labels and 15–20 word explanations run in a narrow column beside it.
```
┌────────────────────────────┐  Capture · Camera
│                             │  Templates · AI
│     SOFTWARE UI (large)     │  Printing · Sharing
│    ● ● ●     ●   ●         │  Gallery · Branding
│         ●  ●    ●  ●       │  Event Settings
└────────────────────────────┘  Operator Controls
```
- **Image:text ratio**: ~75% — the mockup is the section's entire reason to exist; labels are terse (15–20 words each), not full sentences.
- **Type**: hotspot labels 14px/600 `ink`-on-white pill (ties back to hero's micro-label device); explanations 14px/400 `text-muted`.
- **Color**: hotspot markers filled `accent`, expand/highlight on hover using this page's licensed hotspot-hover motion (distinct from the `.photo-tile` card treatment used in Section 5).
- **SEO**: h2 "Which Features Can You Control From the Booth?", supports "photo booth program," "booth operator software," "interactive photo booth" naturally across the ten labels — one mention each, no repetition.
- **Spacing**: standard-to-generous 96–128px — this is a slower, inspect-the-product section following the fast Section 3 spine.

### Section 5 — What Can You Create With Photo Booth Software? — *Feature grid, Variant C (horizontal media carousel)*
- **Purpose**: purely visual proof of output variety — this is this page's "heaviest visual moment," the software equivalent of Rent's product catalog (Section 2 there) or Buy's spec sheet.
- **Layout**: horizontal scrolling carousel, 5 cards, each a large preview image/animation with a one-line question title beneath.
```
[ Branded  ] [  GIF /  ] [   AI    ] [ Green  ] [ Digital ]
[ Photo    ] [Boomerang] [ Photo   ] [ Screen ] [ Gallery ]
[ image    ] [ preview ] [ example ] [before/after][ UI    ]
```
- **Image:text ratio**: ~90% — near-zero prose per card, one h3 question line each.
- **Type**: h3 per card 18px/600, no body copy beneath (title only — the visual is the content).
- **Color**: card surface white, `ring-1 ring-gray-100`; hover uses the full `.photo-tile` scale+shadow-lift (this page's one designated card-hover zone, mirroring how Rent reserved that motion for its catalog).
- **SEO**: h2 "What Can You Create With Photo Booth Software?", h3 per card exactly as briefed, `<article>` per card, alt text per preview naming the actual output type (branded template / GIF or boomerang / AI effect / green-screen composite / digital gallery screen).
- **Spacing**: dense horizontal gap (16–20px) between cards, standard 96–128px section padding — density lives in the carousel itself, not the section shell.

### Section 6 — Which Devices and Photo Booth Setups Can the Software Work With? — *Comparison, Variant A (table) + 3 supporting cards*
- **Purpose**: directly answers the iPad/DSLR/iPhone search intent the keyword research surfaces — this is the page's credibility-and-honesty section.
- **Layout**: compatibility matrix (setup × status) followed by 3 short supporting cards.
```
Setup              Compatibility
iPad Photo Booth    ✓ / status
DSLR Booth          ✓ / status
Digital Booth       ✓ / status
Interactive Booth   ✓ / status
AI Booth            ✓ / status

[ Run on iPad? ] [ Use a DSLR? ] [ Other Devices? ]
```
- **Image:text ratio**: ~20% — table is typography-led (matches homepage Section 8's near-zero-imagery comparison discipline); the 3 supporting cards get a small device icon each, not photography.
- **Color**: zebra row striping in `surface-alt`/white, the same neutral-only device used on the homepage comparison table and Rent's stat band — no new hue for the matrix.
- **Explicit constraint carried from brief**: only claim compatibility the platform actually supports — rows read "✓ / actual status" as placeholders until specs are confirmed, never a fabricated blanket "✓" across the board.
- **SEO**: h2 "Which Devices and Photo Booth Setups Can the Software Work With?", h3 per supporting card as briefed ("Can You Run It on an iPad?", "Can You Use a DSLR Camera?", "Can You Use Other Supported Devices?") — carries iPad photo booth app / photo booth for iPad app / DSLR photo booth / DSLR camera photo booth / photo booth app / iPhone photo booth, one mention each, no stacking.
- **Spacing**: dense 64–96px — a fast, scannable section between two visual-heavy sections (5 and 7).

### Section 7 — Can You Use Photo Booth Software With Equipment You Already Own? — *Problem/context row, Variant A (vertical flow diagram)*
- **Purpose**: the page's strongest conversion bridge for hosts who already own a booth — this is the section that most directly earns the external click.
- **Layout**: single centered vertical flow diagram, four stacked labeled blocks connected by a line, CTA beneath.
```
   YOUR BOOTH
       ↓
   YOUR CAMERA
       ↓
 PHOTO BOOTH SOFTWARE
       ↓
   YOUR EVENT
[ Check Software Compatibility ↗ ]
```
- **Image:text ratio**: ~60% diagram / 40% short explanatory copy (~150 words per brief).
- **Type**: block labels 16px/600 `ink`-on-`track-software`-tint pill; connecting arrows in `text-muted`.
- **Color**: the four blocks tinted `track-software` at graduating opacity (25%/50%/75%/100%) top to bottom, visually reading as "arriving at the software" — the one section on this page where the tint carries actual meaning rather than decoration.
- **CTA**: "Check Software Compatibility ↗" — external hop, arrow licensed per the page-specific CTA rule.
- **SEO**: h2 "Can You Use Photo Booth Software With Equipment You Already Own?", alt text describing the flow diagram's intent (not decorative filler).
- **Spacing**: standard 96–128px, generous vertical gaps between the four blocks (32–40px) so the flow reads as a deliberate sequence, not a cramped list.

### Section 8 — Can You Add Software When You Buy a New Photo Booth? — *Feature grid, Variant B (single equation-style row)*
- **Purpose**: cross-sell to Buy — mirrors Rent Section 10's cost-equation device but for a product bundle, not a price breakdown.
- **Layout**: single horizontal equation, terminal arrow to a CTA.
```
BOOTH  +  CAMERA  +  COMPUTER  +  SOFTWARE
[ Build Your Photo Booth ]
```
- **Image:text ratio**: ~30% — small icon per equation term, typography-led like Rent's cost section, ~140 words per brief.
- **Color**: `+` glyphs in `text-muted`, "SOFTWARE" term in `track-software`-filled pill (the one equation term that's this page's subject, distinguishing it from the other three neutral terms).
- **CTA**: "Build Your Photo Booth" — internal link to Buy, plain text per the arrow rule (no `↗`, since this stays on-domain).
- **SEO**: h2 "Can You Add Software When You Buy a New Photo Booth?", internal link anchor text matches Buy's own h1 language for consistency across pages.
- **Spacing**: dense 64–96px.

### Section 9 — How Can Photo Booth Software Help You Run More Event Experiences? — *Timeline/process, Variant B (vertical business workflow)*
- **Purpose**: practical, business-facing framing — deliberately avoids unsupported growth claims per brief's explicit instruction.
- **Layout**: vertical 6-step workflow, connecting line, each step a short label (not full sentences).
```
BOOK EVENT
   ↓
CONFIGURE EXPERIENCE
   ↓
RUN BOOTH
   ↓
CAPTURE CONTENT
   ↓
SHARE / PRINT
   ↓
DELIVER EXPERIENCE
```
- **Image:text ratio**: ~20% — small icon per step, mostly typographic (distinguishes this from Section 3's horizontal, icon-heavy process spine — same archetype, different visual treatment, same rule the homepage/Rent plans apply to repeated archetypes).
- **Type**: step labels 16px/600, no numerals here (six steps read as a cycle/workflow, not a linear 1-2-3 onboarding — numerals stay reserved for Section 3, this page's one "count these steps" moment).
- **Explicit constraint carried from brief**: benefits framed as practical (consistent workflows, branding, sharing, printing, multiple experience types, operator controls) — no invented metrics like "double your bookings."
- **SEO**: h2 "How Can Photo Booth Software Help You Run More Event Experiences?", ~180 words distributed across the six step captions, not stacked in an intro paragraph.
- **Spacing**: standard 96–128px.

### Section 10 — How Can You Get Access to the Photo Booth Software? — *CTA banner, Variant A*
- **Purpose**: the actual hand-off point — simple, low-friction, honest about staying secondary to the SEO focus per the brief's volume note.
- **Layout**: centered band, short explanatory line, access-tier mentions only if real (day/week/custom-date), single dominant CTA.
```
      Explore → Choose Access → Configure → Continue to Software
              [ View Software Platform ↗ ]
```
- **Image:text ratio**: ~15% — a small flow icon strip only, ~150 words of copy.
- **Color**: `track-software`-tinted band background (`surface-alt`-adjacent, this page's equivalent of Rent's `surface-alt` form backdrop), `accent`-filled CTA.
- **CTA**: "View Software Platform ↗" — external hop.
- **SEO**: h2 "How Can You Get Access to the Photo Booth Software?", "photo booth software subscription/pricing" mentioned at most once, framed as secondary language, never the section's keyword target (per brief).
- **Spacing**: dense 64–96px.

### Section 11 — Why Choose Our Photo Booth Software? — *Feature grid, Variant A, 6-block, no card shell*
- **Purpose**: premium trust grid, second-to-last per the page's own convention (matches homepage Section 10 / Rent Section 13's placement rule).
- **Layout**: 2×3 grid of six pillars, icon + short copy, no card shell.
```
Built for Photo Booths       Flexible Experiences
Built for Branding            Digital + Physical Sharing
Works With Your Setup         Designed for Events
```
- **Image:text ratio**: ~10% — small icon per pillar, 20–25 words each, no photography (matches the discipline both other pages use for their "why choose us" section).
- **Color**: top accent rule only (`border-t-4 border-track-software/40`) — this page's variant of the rule-only device, using its own tint instead of the generic `accent` so it reads as software-specific rather than a copy-paste of the homepage/Rent version.
- **Explicit constraint carried from brief**: qualified language throughout ("where available," "where supported") rather than absolute claims, since exact platform capabilities aren't finalized.
- **SEO**: h2 "Why Choose Our Photo Booth Software?", h3 per pillar.
- **Spacing**: standard-to-dense 80–112px.

### Section 12 — FAQ — *FAQ accordion*
- **Purpose**: final section, primary AEO surface for this page, and the natural place to close by pointing to the external platform.
- **Layout**: single column, max-width ~760px centered, native `<details>`/`<summary>`.
```
What is photo booth software?                              [+]
Can photo booth software work with an iPad?                 [+]
Can you use photo booth software with a DSLR camera?        [+]
Can photo booth software create GIFs and videos?            [+]
Can you use AI effects with photo booth software?            [+]
Can photo booth software support green screen experiences?   [+]
Can guests share their photos digitally?                     [+]
Can you use the software with a photo booth you already own? [+]
How do you get access to the software?                       [+]
Where can you view software plans and pricing?               [+]
```
- **Image:text ratio**: 0% — text-forward by design, same license as homepage/Rent FAQ sections.
- **Type/Color**: identical to homepage Section 12/Rent Section 14 (question 16px/600, answer 15px/400 `text-muted`, hairline row border, `accent` toggle glyph) — the one section where exact visual reuse across all three pages is correct, since FAQ is a recognizable, consistent UI pattern site-wide.
- **SEO**: strong `FAQPage` schema candidate; the pricing/plans answer explicitly directs to the external software website rather than attempting to answer pricing on this domain.
- **Spacing**: 96–128px section padding.

---

## Visual Flow Summary

**Layout rhythm, in order**:
1. Hero — dark cinematic product shot
2. Feature grid — 8-block icon/screenshot grid (capabilities)
3. Timeline/process — horizontal, numbered (capture-to-print workflow)
4. Annotated UI mockup with hotspots (feature control)
5. Feature grid — horizontal media carousel (outputs)
6. Comparison table + supporting cards (device compatibility)
7. Problem/context — vertical flow diagram (own-equipment bridge)
8. Feature grid — single equation row (new-booth cross-sell)
9. Timeline/process — vertical, unnumbered (business workflow)
10. CTA banner (software access)
11. Feature grid — rule-only pillars, no shell (why choose us)
12. FAQ accordion

No archetype repeats back-to-back. "Feature grid" recurs four times (2, 5, 8, 11) and "timeline/process" twice (3, 9) — each pair is a visibly different variant (icon-grid / carousel / equation-row / rule-only-pillars; horizontal-numbered / vertical-unnumbered), matching the rule the homepage and Rent plans already established for repeated archetypes.

**Density rhythm**: heavy-dark (1, hero) → medium (2, capability grid) → light-fast (3, process spine) → generous/slow (4, UI mockup — this page's genuine "inspect the product" moment) → heaviest-visual (5, carousel) → dense (6, matrix) → standard (7, flow diagram) → dense (8, equation) → standard (9, workflow) → dense (10, CTA band) → light (11, pillars) → light (12, FAQ). Unlike Rent's four-consecutive-dense utility run, this page alternates dense/standard roughly every other section — appropriate since this page's job is comprehension and trust-building, not fast commerce scanning.

**Eye path**: Section 5 (media carousel) is the page's heaviest visual moment — the software's actual creative output is the strongest proof point, ahead of the hero itself (hero states the promise; Section 5 proves it). This is the same pattern Rent used (catalog over hero) applied to a different subject, keeping the "hero isn't automatically the peak" rule consistent across pages rather than defaulting to the homepage's hero-is-heaviest convention on every page.

**The one heaviest moment**: Section 5, the media carousel — matches the brief's instruction that "what can you create" should be "almost entirely visual."

## SEO Structure Summary

**Heading hierarchy**:
```
h1  Photo Booth Software Built to Power Better Experiences at Every Event
 h2 What Can Photo Booth Software Help You Do?
  h3 Can You Capture Photos and Videos?
  h3 Can You Create More Interactive Experiences?
  h3 Can You Print Photos Instantly?
  h3 Can Guests Share Photos Digitally?
  h3 Can You Add Your Own Branding?
  h3 Can You Create GIFs and Boomerangs?
  h3 Can You Use Green Screen Effects?
  h3 Can You Add AI-Powered Effects?
 h2 How Does Photo Booth Software Turn a Capture Into an Experience?
  h3 Capture
  h3 Create
  h3 Customize
  h3 Share
  h3 Print
 h2 Which Features Can You Control From the Booth?
 h2 What Can You Create With Photo Booth Software?
  h3 Could You Create Branded Photo Experiences?
  h3 Could You Create GIFs and Boomerangs?
  h3 Could You Create AI Photo Experiences?
  h3 Could You Create Green Screen Experiences?
  h3 Could You Create Digital Galleries?
 h2 Which Devices and Photo Booth Setups Can the Software Work With?
  h3 Can You Run It on an iPad?
  h3 Can You Use a DSLR Camera?
  h3 Can You Use Other Supported Devices?
 h2 Can You Use Photo Booth Software With Equipment You Already Own?
 h2 Can You Add Software When You Buy a New Photo Booth?
 h2 How Can Photo Booth Software Help You Run More Event Experiences?
 h2 How Can You Get Access to the Photo Booth Software?
 h2 Why Choose Our Photo Booth Software?
 h2 What Do People Ask About Photo Booth Software?
  h3 What is photo booth software?
  h3 Can photo booth software work with an iPad?
  h3 Can you use photo booth software with a DSLR camera?
  h3 Can photo booth software create GIFs and videos?
  h3 Can you use AI effects with photo booth software?
  h3 Can photo booth software support green screen experiences?
  h3 Can guests share their photos digitally?
  h3 Can you use the software with a photo booth you already own?
  h3 How do you get access to the software?
  h3 Where can you view software plans and pricing?
```
No skipped levels. Section 4's ten hotspot labels sit as pill/label text inside the mockup rather than a new h3 tier, keeping the tree from over-fragmenting under a dense annotated diagram.

**Semantic HTML mapping**:
- `<header>` — shared site nav (already built)
- `<main>` wraps Sections 1–12
- `<section aria-labelledby="[section]-heading">` per section
- `<article>` per media-carousel card (Section 5), per FAQ entry (Section 12)
- `<table>` with real `<th>`/`<td>` for Section 6's compatibility matrix (not a div-grid pretending to be a table)
- `<footer>` shared, closing the page

**Keyword placement**: primary phrase "photo booth software" lives in the h1, the first 100 words of Section 2's intro, and the Section 2/6/11 h2s. Supporting terms distributed one-per-section: "photo booth program" / "booth operator software" / "interactive photo booth" → Section 4 only; "iPad photo booth app" / "photo booth for iPad app" / "DSLR photo booth" / "DSLR camera photo booth" / "photo booth app" / "iPhone photo booth" → Section 6 only, one per supporting card; "AI photo booth software" → Section 2's AI cell only; "green screen photo booth software" → Section 5's green-screen card only; "cloud photo booth software" → placed once in Section 10's access copy, since cloud-hosting is inherent to the external-platform hand-off; "photo booth software subscription" / "photo booth software pricing" → Section 10 and the FAQ's final answer only, framed as secondary per the brief's low-volume note.

**Alt-text plan** (representative): Section 1 — the software interface shown mid-capture at a live event. Section 2 — one descriptive alt per screenshot naming the actual feature. Section 5 — one alt per carousel card naming the actual output type. Section 6 — device icons get functional alt text (e.g. "iPad running the photo booth software interface"), not decorative filler. Section 7 — the flow diagram gets alt text describing its intent (equipment-to-software continuity), since it's a meaningful diagram, not decoration.

**Schema candidates to flag for build**: `SoftwareApplication` (page-level, once the external platform's real name/version/OS support is confirmed), `HowTo` (Section 3, the capture-to-print workflow), `FAQPage` (Section 12). No `Product`/`Offer` schema on this page — pricing and transactions live on the external software platform, not here.

## Self-Critique Log

- **Checked** near-black + single acid accent (one of the two AI-default palettes this skill flags). The hero's dark cinematic background could easily have drifted into this. **Resolved**: the dark background is a photography scrim using the already-licensed `ink` token (the same device Rent's hero uses over its own photo), not a new near-black *palette* — the rest of the page stays on the existing purple-on-white/`track-software`-tinted system. No new dark-mode token was introduced.
- **Caught**: a draft instinct to glue `↗` onto every CTA on the page for a consistent "premium SaaS" feel (Explore Software, See Compatible Booths, Build Your Photo Booth, Check Availability, etc. — matching the brief's own liberal use of the glyph). **Changed**: restricted `↗` to the three CTAs that actually leave this domain for the external software platform (Explore Software, Check Software Compatibility, View Software Platform); every on-domain CTA (See Compatible Booths, Build Your Photo Booth) is plain text. This is the exact "arrow glued onto every CTA" tell from Phase 5 — keeping it scoped to real external hops is what makes it meaningful rather than decorative.
- **Caught**: Sections 2, 5, 8, and 11 are all nominally "feature grid," and a draft pass gave all four the same icon-badge-plus-shadow-card treatment purely for consistency. **Changed**: Section 2 has no card shell (plain cells, matches homepage Section 6's discipline), Section 5 gets the full shadow+hover treatment (this page's one designated clickable-card zone), Section 8 is a typographic equation row with no cards at all, and Section 11 is rule-only with no shell — no two of the four share an identical visual treatment.
- **Caught**: Sections 3 and 9 are both "timeline/process," and a draft pass numbered both 01–05/01–06 for visual consistency. **Changed**: numerals stay reserved for Section 3 (the genuinely sequential capture-to-print pipeline); Section 9's business workflow is unnumbered since it reads as a repeating operational cycle, not a step count — same distinction the homepage/Rent plans draw between sequential and parallel content.
- **Checked** tracked-out ALL-CAPS eyebrow labels — the hero's "PHOTO BOOTH SOFTWARE" label uses the same soft-pill device as Rent's hero label, not bare tracked text on the photo; no other section on this page carries an eyebrow label.
- **Checked** numbered markers (01/02/03) on non-sequential content — confirmed Section 6's device list and Section 11's six pillars are explicitly unnumbered (parallel options, not a sequence), consistent with the homepage/Rent rule.
- **Caught**: a draft instinct to state hard compatibility claims ("Fully compatible with all iPad models," specific OS versions, guaranteed DSLR support) to make Section 6's matrix feel more finished, extending the brief's own placeholder instruction. **Changed**: every compatibility row and supporting card stays qualified ("✓ / actual status," "where supported") until the real platform specs are confirmed — matches the brief's explicit instruction not to fabricate a verified compatibility list.
- **Checked** unsupported growth/ROI claims in Section 9 ("double your bookings," "increase revenue by 300%") — none used; benefits are stated as practical workflow outcomes only, per brief.
- **Checked** flat 50/50 image:text default — explicitly varied per section (Section 1 ~80%, Section 5 ~90%, Section 6 ~20%, Section 9 ~20%, Section 12 0%), matching this page's own stated 75/25 overall ratio rather than defaulting evenly section-to-section.
- **Checked** blanket hover-lift/entrance-animation — motion signature restricted to Section 5's carousel cards and Section 4's UI hotspots; Sections 2, 6, 8, 9, 11 carry no hover or entrance animation, consistent with the homepage/Rent restraint rule.
