# Snapbox — Homepage Design Plan

Hero (Section 1) is out of scope here — it is already built in [kepripun-landing.html](./kepripun-landing.html) and its tokens are the hard constraints for everything below. This plan covers Sections 2–12 of the homepage content brief.

## Identity

**Subject**: Snapbox is a photo booth company operating three parallel tracks — Rent (event booths for weddings/parties/corporate), Buy (own hardware for individuals/entrepreneurs starting a booth business), and Software (power booth hardware you already own).
**Audience**: three distinct buyers on one page — event hosts booking a one-off (Rent), aspiring/existing booth operators buying equipment (Buy), and technical/business owners who already have hardware and need the software layer (Software).
**Primary action**: route each visitor into their track fast, then convert on that track's CTA — *Explore Rentals* / *Shop Booths* / *Explore Software*.
**Positioning**: "The single source for the photo booth experience — rent it, own it, or power it."
**Color approach**: Saturated-brand (per `color-systems.md`) — one bold purple accent on a white/near-white ground, with three tinted sub-accents distinguishing the three tracks. This is deliberately not Desaturated-deep or Warm-paper — the brand is playful/consumer/event-facing, and a bold single hue on white reads energetic rather than corporate.

## Token System
*(inherited from the built hero — treated as fixed, not re-derived)*

**Color** — 6 core + 2 supporting neutrals:
| Token | Hex | Role |
|---|---|---|
| `accent` (Snap Purple) | `#6C4EF5` | Primary buttons, links, active states, icon fills |
| `accent-hover` | `#5b3fe0` | Hover state for primary actions |
| `track-rent` | `#c8b8f5` | Rent-track tint (badges, card backgrounds, decision-matrix pill) |
| `track-buy` | `#f5d9b8` | Buy-track tint |
| `track-software` | `#b8d6f5` | Software-track tint |
| `ink` | `#1c1c22` | Dark micro-label pills / spec tags (never full buttons) |
| `text` | `#211f2e` | Headings |
| `text-secondary` | `#3a3550` / `#4a4560` | Card titles, nav-weight text |
| `text-muted` | `#8b87a0` | Body copy, supporting lines |
| `surface-alt` | `#f2f0f5` | Occasional zebra/alt-surface tone (decision matrix rows, stat callouts) — used to break up all-white monotony without adding a new hue |

**Type**: single family — Poppins — at weights 400/500/600/700/800 (one-family-two-weight-class pairing, not a display+body split). Scale: base 16px.
- h1 (hero only): 48–60px / 800
- h2: 32–36px / 800, `text-[#211f2e]`
- h3: 20–22px / 600, `text-[#3a3550]`
- body: 15–16px / 400, `text-[#8b87a0]`
- small/micro-label: 12–13px / 600, uppercase not used (see self-critique)

**Spacing**: base unit 8px. Section vertical padding: 96–128px desktop / 64–80px mobile (dense sections — pricing, decision matrix — 64–96px / 48–64px). Card/grid gaps 24–32px desktop, 16–24px mobile. Headline→subhead gap 8–16px; subhead→content gap 24–32px.

**Radius**: 2 values only — `rounded-2xl` (cards, images) and `rounded-full` (buttons, pills, badges).

**Motion signature**: one hover pattern, reused only where a card is genuinely clickable — `.photo-tile` style scale-up (1.1×) + shadow lift. Not applied to static/informational sections (icon grid, stat band, testimonial wall, FAQ rows).

**Restraint ceiling confirmed**: 6 core colors + 2 neutrals, 2 radii, 1 font family, 1 motion signature.

---

## Section-by-Section Plan

### Section 2 — What Are You Looking for Today? — *Feature grid (Variant A: image + label cards)*
- **Purpose**: split the visitor into one of the three tracks immediately after the hero.
- **Layout**: 3-column grid, equal weight (no card is emphasized over another — all three tracks are equally valid entry points, unlike a pricing "recommended tier").
```
[ image        ] [ image        ] [ image        ]
[ Event?       ] [ Own a booth? ] [ Software?    ]
[ 40-50 words  ] [ 40-50 words  ] [ 40-50 words  ]
[ Rent a Booth ] [ Shop Booths  ] [ Software ↗   ]
```
- **Image:text ratio**: ~40% image / 60% text (feature-grid range, upper end since imagery is doing identity work here).
- **Type**: h2 centered 32px/800; h3 card titles 20px/600 `text-secondary`; body 15px `text-muted`.
- **Color**: card 1 tinted `track-rent`, card 2 `track-buy`, card 3 `track-software` — first appearance of the track color-coding that recurs through the page.
- **CTA**: Rent/Buy = filled `accent` pill; Software = ghost text link with `↗` (the *only* place the arrow glyph appears outside this one semantically-external-link pattern).
- **SEO**: `<section aria-labelledby="looking-for-h2">`, h2 "What Are You Looking for Today?", h3 per card. Alt text: "Photographer capturing guests at a wedding photo booth" / "Compact photo booth machine set up for purchase" / "Photo booth software touchscreen interface preview". Keywords land in card body copy only (photo booth rental, event photo booth, photo booth near me, selfie booth / photo booth for sale, photo booth machine, buy photo booth machine / photo booth software, photo booth program, photo booth app) — one mention each, no stuffing.
- **Spacing**: 96–128px section padding; 32px card gap desktop.

### Section 3 — Which Photo Booth Experience Fits Your Event or Business? — *Gallery/portfolio*
- **Purpose**: let visitors self-identify by booth type across 6 parallel (non-sequential) options.
- **Layout**: 3×2 image-forward grid, consistent aspect ratio across all 6 (hard requirement per gallery archetype).
```
[ 360 ][ Mirror ][ DSLR ]
[ Digital ][ Portable ][ AI ]
```
- **Image:text ratio**: 80–90% image. Each card: full-bleed photo, bottom gradient scrim, h3 in white sitting on the scrim (not a separate text block below), ~35-word blurb collapses to a small `ink`-badge spec tag on the image corner rather than body copy under the card — keeps this section visual, matching the 80-100% target.
- **Type**: h3 (white, 20px/600) over scrim.
- **Color**: no track tint here (these are product types, not tracks) — spec tags use `ink` (#1c1c22) pills, identical to the hero's floating-icon-bubble treatment, tying this section back to the hero visually.
- **Interaction**: subtle alternating rotation (±3°) straightening on hover, reduced version of the hero's `.photo-tile` pop — present but visibly quieter than the hero (hero remains the heaviest moment on the page).
- **Explicit decision**: no 01–06 numbered badges — these six types are parallel alternatives, not a sequence, so numbering them would be the generic non-sequential-numbering tell (see self-critique log).
- **SEO**: h2 "Which Photo Booth Experience Fits Your Event or Business?", h3 per card ("Would a 360 Photo Booth Create More Shareable Moments?" etc.). Alt text describes the actual booth type and setting per image (e.g. "360-degree platform photo booth spinning camera arm at an event").
- **Spacing**: tighter grid gap (16–24px) since imagery is dense and continuous here.

### Section 4 — How Can You Get Started With a Photo Booth? — *Timeline/process, Variant A*
- **Purpose**: show the (genuinely sequential) path from choice to completion.
- **Layout**: horizontal 3-step spine on desktop, connecting line (reusing the hero's original SVG line-connector concept, redrawn horizontal), stacking vertically on mobile.
```
 01 ————— 02 ————— 03
Choose   Configure  Complete
```
Below the spine, three short horizontal mini-flow chip-trails, one per track:
```
Rent:     Check date → Configure → Book
Buy:      Compare → Configure → Purchase
Software: Explore → Configure → External checkout
```
- **Image:text ratio**: low (10–15%) — this section is carried by oversized numerals and the connecting line, not photography, giving the page a density break after two image-heavy sections.
- **Type**: giant step numbers `text-6xl/800 text-accent/20` behind h3 step titles (20px/600).
- **Color**: mini-flow chips get a small leading dot colored by track (`track-rent`/`track-buy`/`track-software`), reinforcing the color-coding without new hues.
- **Explicit decision**: numbers are legitimate here — steps are truly sequential — this is the one section licensed to use 01/02/03 per the timeline archetype rule.
- **SEO**: h2 "How Can You Get Started With a Photo Booth?", h3 per step ("Can You Choose a Booth First?" / "Can You Configure It Around Your Needs?" / "Can You Book or Buy It Online?"). Consider `HowTo` schema (flagged, not required — content is closer to a routing flow than strict instructions).
- **Spacing**: dense-section padding (64–96px) — this is a lighter, faster-reading section.

### Section 5 — What Can You Customize in Your Photo Booth Setup? — *Alternating feature row, Variant A (image-left)*
- **Purpose**: read as a live configurator preview, not an article.
- **Layout**: single row, image/mockup left (~45%), chip cloud right (~55%).
```
[ booth/device        ] [ Model ][ Size ][ Screen ]
[ mockup illustration ] [ Finish ][ Branding ][ Camera ]
[                      ] [ Computer ][ Printer ][ Lighting ]
[                      ] [ Connectivity ][ Accessories ]
[                      ] [ Power ][ Support ]
```
- **Image:text ratio**: ~45/55, per alternating-row range.
- **Type**: each chip = h3-weight label (16px/600) + 15–20 word `text-muted` line. One chip shown in the `accent`-filled "selected" state to imply live interactivity.
- **Color**: no track tint (this is cross-track, hardware-agnostic) — neutral `surface-alt` background block behind the chip cloud to separate it from the white page background.
- **SEO**: h2 "What Can You Customize in Your Photo Booth Setup?", each chip label as a `<h4>`-or-styled-strong term (not a new h3 level per chip — 13 chips as h3 would over-fragment the hierarchy; treat the section h2 as the anchor and chips as a definition-list-style semantic group).
- **Spacing**: standard 96–128px.

### Section 6 — Which Photo Booth Features Matter Most for Your Setup? — *Feature grid, Variant A (icon + label)*
- **Purpose**: quick-scan feature list.
- **Layout**: 3-column icon grid, 9 items wrapping to 3 rows.
```
(icon) High-quality capture    (icon) Touchscreen        (icon) Instant printing
(icon) Digital sharing         (icon) AI effects          (icon) GIF/Boomerang
(icon) Branding                (icon) Cloud gallery       (icon) Event connectivity
```
- **Image:text ratio**: 15–25% (icons only, per feature-grid-icon range) — deliberately airier than Sections 2/3.
- **Type**: h3 16px/600 per feature, 15–20 word `text-muted` description.
- **Color**: icon badge = `accent` at 10% opacity fill with `accent` icon glyph — no card border, no shadow (explicit contrast with Sections 2/9/10's card treatments — see self-critique).
- **SEO**: h2 "Which Photo Booth Features Matter Most for Your Setup?", h3 per feature.
- **Spacing**: standard padding, but no card gap needed since there's no card shell — generous 32–48px row/column gap instead.

### Section 7 — What Can Photo Booth Software Add to Your Experience? — *Alternating feature row, Variant A (flipped: image-right)*
- **Purpose**: sell the Software track specifically.
- **Layout**: single row, chip list left (~50%), software screenshot/mockup right (~50%) — deliberately the mirror of Section 5's image-left arrangement, satisfying the alternation rule (same archetype, opposite side, not repeated verbatim).
```
[ Capture ][ AI ][ Printing ]     [                    ]
[ Sharing ][ Branding ]           [   screenshot in     ]
[ Green Screen ][ GIF ][ Gallery] [   ring-4 frame       ]
[ Explore Software ↗ ]            [                    ]
```
- **Image:text ratio**: ~50/50.
- **Color**: screenshot sits on a `track-software` (#b8d6f5) tinted backdrop, framed with the same `ring-4 ring-white shadow-lg rounded-2xl` treatment as the hero photos — visually ties the software track back to the hero collage.
- **CTA**: `Explore Software ↗` — second and last legitimate use of the arrow glyph.
- **SEO**: h2 "What Can Photo Booth Software Add to Your Experience?". Alt text: "Photo booth software touchscreen showing AI filter and instant print options."
- **Spacing**: standard 96–128px.

### Section 8 — Which Photo Booth Solution Is Right for Your Goal? — *Comparison, Variant A (table)*
- **Purpose**: let visitors map their situation directly to a track with almost no prose.
- **Layout**: row-labeled comparison, "Best Option" rendered as a colored track pill rather than plain text.
```
Your Goal                    Best Option
One event                    [ Rent ]  (purple pill)
Wedding                      [ Rent ]
Corporate event               [ Rent ]
Start a booth business        [ Buy ]  (peach pill)
Own equipment                 [ Buy ]
Already own hardware          [ Software ] (blue pill)
Need flexible software        [ Software ]
```
- **Image:text ratio**: near 0% — typography/pills carry this section (matches comparison + stat-band guidance of minimal imagery).
- **Color**: alternating row background `surface-alt`/white (zebra) using the one neutral token already in the system — no new color introduced.
- **SEO**: h2 "Which Photo Booth Solution Is Right for Your Goal?"; if marked up as a literal `<table>`, include a `<caption>`.
- **Spacing**: dense-section padding (64–96px) — a fast, light-reading section following the denser Section 7.

### Section 9 — What Do Photo Booths Cost? — *Pricing, 3-track cards*
- **Purpose**: give each track a cost anchor without publishing literal numbers.
- **Layout**: 3 equal-weight blocks (no "recommended tier" emphasis — unlike typical pricing, all three tracks are equally valid, consistent with Section 2's equal treatment).
```
[ Rental          ] [ Purchase         ] [ Software         ]
[ Event-based      ] [ Equipment +      ] [ External          ]
[ pricing          ] [ configuration    ] [ software plans    ]
```
- **Image:text ratio**: 0–10% (icon/badge only, per pricing guidance — no photography).
- **Type**: track label in `ink` pill; framing text 24px/800 `text-[#211f2e]`; one supporting `text-muted` line.
- **Color**: each block tinted by track color, same three tints as Section 2 — this is the third and final appearance of the full three-tint set, closing the loop the page opened in Section 2.
- **Supporting keywords**: photo booth prices / photo booth rental cost / photo booth machine price rendered as small `text-xs text-gray-400` under each block — SEO-supporting, not primary visual text.
- **SEO**: h2 "What Do Photo Booths Cost?"; consider `Product`/`Offer` schema per block if real pricing data exists later.
- **Spacing**: dense-section padding (64–96px).

### Section 10 — Why Choose Our Photo Booth Solutions? — *Feature grid, Variant C (asymmetric masonry) + one stat callout*
- **Purpose**: build trust just before testimonials, deliberately calmer than the hero.
- **Layout**: masonry of varying block sizes (not a uniform 3-col grid, to avoid repeating Section 2/6's grid rhythm a third time) — one large block reserved for a genuine stat if available, five smaller trust blocks around it.
```
[ Built for Events        ] [ stat/number     ]
[ Configurable Equipment  ] [ callout, larger ]
[ Professional Support ][ Flexible Solutions ]
[ Rental + Purchase ][ Software Compatibility ]
```
- **Image:text ratio**: 0% — no photography, just typography and a single top accent rule per block (`border-t-4 border-accent/30`), no shadow, no full card shell — deliberately distinct from every other card treatment on the page (see self-critique).
- **Color**: `accent` at 30% for the top rule only; stat number itself in full-strength `accent`.
- **SEO**: h2 "Why Choose Our Photo Booth Solutions?", h3 per trust point.
- **Spacing**: standard-to-dense (80–112px) — slightly denser than Section 8/9 to signal "this matters," lighter than Section 3's gallery.

### Section 11 — What Do Customers Say About Their Experience? — *Testimonial, Variant B (wall/grid)*
- **Purpose**: third-party credibility across all three tracks.
- **Layout**: 3 cards (Rent / Buy / Software), hairline border instead of shadow — explicit density/visual-weight break after Section 10's denser masonry.
```
[ "quote..."      ] [ "quote..."      ] [ "quote..."      ]
[ (avatar) Name   ] [ (avatar) Name   ] [ (avatar) Name   ]
[ Rent            ] [ Buy             ] [ Software        ]
```
- **Image:text ratio**: 5–10% (avatar-scale only).
- **Color**: a thin left accent bar per card colored by track — the only color cue, no tinted background (keeps this section visually quiet).
- **SEO**: mark each testimonial as its own `<article>`; consider `Review`/`AggregateRating` schema only if these are genuine, attributable quotes.
- **Spacing**: standard 96px, generous whitespace around the light card treatment.

### Section 12 — What Questions Do Customers Ask Before Choosing a Photo Booth? — *FAQ accordion*
- **Purpose**: pre-handle objections; primary AEO/answer-engine surface on the page.
- **Layout**: single column, max-width ~760px, centered — native `<details>`/`<summary>` accordion rows.
```
Should you rent or buy a photo booth?              [+]
What types of photo booths are available?           [+]
How much does a photo booth cost?                   [+]
Can you customize a photo booth?                    [+]
Can you use your own camera or computer?             [+]
Can you use separate photo booth software?          [+]
Do you offer photo booth rentals near me?            [+]
Can you purchase a portable photo booth?             [+]
```
- **Image:text ratio**: 0% — this is the one section deliberately licensed to be text-forward, per the brief.
- **Type**: question 16px/600 `text-[#211f2e]`; answer 15px/400 `text-muted`; toggle glyph in `accent`.
- **Color**: hairline `border-b border-gray-100` per row, no fill/shadow.
- **SEO**: strong `FAQPage` schema candidate — questions written in real search-phrased form, matching the brief's H3 list verbatim.
- **Spacing**: 96–128px section padding, 40–48px row height including padding.

---

## Visual Flow Summary

**Layout rhythm, in order** (Section 1 hero excluded, already built):
1. Feature grid (image cards, 3-col, equal weight)
2. Gallery (image-forward, 6-card, no numbering)
3. Timeline/process (horizontal, numbered — legitimate use)
4. Alternating feature row (image-left)
5. Feature grid (icon-only, no shell)
6. Alternating feature row (image-right — flips #4)
7. Comparison table
8. Pricing (3 equal blocks)
9. Feature grid (asymmetric masonry — differs from #1/#5's uniform grids)
10. Testimonial wall (light, hairline)
11. FAQ accordion (text-forward)

No archetype repeats back-to-back, and the two "feature grid" reappearances (#5, #9) are separated by at least two other archetypes each time and use visibly different variants (image-card / icon-only / masonry), so the page never reads as the same card-grid recycled.

**Density rhythm**: heavy (hero) → medium (2) → dense (3, gallery) → light (4, process) → medium (5) → light (6, icon grid) → medium (7) → light (8, table) → medium (9, pricing) → denser (10, masonry+stat) → light (11, testimonial) → light (12, FAQ). Alternates enough that no 3 consecutive sections carry the same visual load.

**Eye path**: dominant pattern is Center-anchored/vertical (long single-column scroll, appropriate for a story-like "figure out your track → get started → trust → act" narrative), combined with an alternating left/right rhythm for the two feature-row sections (4 and 6) so supporting imagery doesn't default to one side. Within Section 2 and Section 9, weight is evenly distributed across three equal columns (no single dominant quadrant) since all three tracks are deliberately equal entry points.

**The one heaviest moment**: the hero (Section 1) — its full-bleed, hover-interactive scattered photo collage. Every subsequent section is designed to be visibly quieter: Section 3's gallery reuses the same rotation/hover language at reduced intensity specifically so it doesn't compete with the hero, and Sections 6/8/11 are close to zero-imagery by design.

**Recommendation (flagged, not in original brief)**: the brief ends at the FAQ with no explicit closing CTA banner. Recommend folding a compact repeat of the hero's three CTAs (Explore Rentals / Shop Booths / Explore Software) into the top of the footer as the page's terminal action, landing in the Gutenberg diagram's terminal (bottom-right-equivalent) zone, rather than inventing an unbriefed new section.

## SEO Structure Summary

**Heading hierarchy**:
```
h1  Photo Booths to Rent, Buy, or Power Your Next Experience   (hero, built separately)
 h2 What Are You Looking for Today?
  h3 Do You Need a Photo Booth for an Event?
  h3 Do You Want to Own a Photo Booth?
  h3 Do You Need Software for Your Booth?
 h2 Which Photo Booth Experience Fits Your Event or Business?
  h3 Would a 360 Photo Booth Create More Shareable Moments?
  h3 Would a Mirror Booth Make Your Event More Interactive?
  h3 Would a DSLR Booth Deliver Premium Photos?
  h3 Would a Digital Booth Keep Things Simple and Fast?
  h3 Would a Portable Booth Make Setup Easier?
  h3 Would an AI Booth Create Something More Interactive?
 h2 How Can You Get Started With a Photo Booth?
  h3 Can You Choose a Booth First?
  h3 Can You Configure It Around Your Needs?
  h3 Can You Book or Buy It Online?
 h2 What Can You Customize in Your Photo Booth Setup?
 h2 Which Photo Booth Features Matter Most for Your Setup?
 h2 What Can Photo Booth Software Add to Your Experience?
 h2 Which Photo Booth Solution Is Right for Your Goal?
 h2 What Do Photo Booths Cost?
 h2 Why Choose Our Photo Booth Solutions?
 h2 What Do Customers Say About Their Experience?
 h2 What Questions Do Customers Ask Before Choosing a Photo Booth?
  h3 Should you rent or buy a photo booth?
  h3 What types of photo booths are available?
  h3 How much does a photo booth cost?
  h3 Can you customize a photo booth?
  h3 Can you use your own camera or computer?
  h3 Can you use separate photo booth software?
  h3 Do you offer photo booth rentals near me?
  h3 Can you purchase a portable photo booth?
```
No skipped levels; every h3 sits under a clearly matching h2.

**Semantic HTML mapping**:
- `<header>` — once, nav + logo (already built)
- `<main>` wraps Sections 2–12
- `<section aria-labelledby="[section]-heading">` per section above
- `<article>` for each Section 11 testimonial and each Section 12 FAQ entry
- `<nav>` in header and footer
- `<footer>` once, closing the page, hosting the recommended terminal CTA repeat

**Keyword placement**: primary phrase "photo booth" (and "photo booth rental" as the leading commercial variant) already lives in the hero h1/first-100-words (built separately) and recurs naturally in the Section 2 and Section 3 h2s. Secondary phrases (photo booth for sale, photo booth machine, photo booth software, photo booth app, photo booth near me, selfie booth) are placed once each inside their relevant Section 2 card body copy — no repetition of the exact same phrase across multiple sections.

**Alt text plan** (representative, one per image-bearing section): Section 2 — three descriptive shots per track (event booth in use / boxed booth hardware / software UI). Section 3 — one descriptive alt per booth type naming the type and a real setting. Section 7 — software screenshot described by what's on screen (AI filter + print option), not by keyword.

**Schema candidates to flag for build**: `Organization` (site-wide), `Product`/`Offer` (Section 9, if real pricing exists), `FAQPage` (Section 12), `Review`/`AggregateRating` (Section 11, only if genuine), `HowTo` (Section 4, optional/borderline).

## Self-Critique Log

- **Checked** near-black+acid or warm-cream+terracotta defaults — not present; palette is Saturated-brand (purple accent on white), which is the deliberate approach and stays clear of both defaults. No change needed.
- **Caught**: an early instinct to give Sections 2, 3, 6, 9, and 10 the identical `rounded-2xl` + `shadow-lg` card treatment. **Changed**: varied surface treatment by section — Section 2 keeps shadow+ring (its cards are genuinely clickable choice cards), Section 3 uses gradient-scrim-on-image with no card shell, Section 6 uses no shell at all (icon + text only), Section 9 keeps the tinted card shell (consistent with Section 2 since both are track-equal choice moments), and Section 10 uses a top-rule-only masonry with no shadow. No two consecutive card-bearing sections now share the same shell.
- **Caught**: a draft instinct to add 01–06 numbered badges to Section 3's six booth types for visual polish. **Changed**: removed — those six options are parallel alternatives, not a sequence, so numbering them would misuse the sequential-numbering convention. Numbers are reserved for Section 4, where the steps are genuinely ordered.
- **Checked** tracked-out ALL-CAPS eyebrow labels above section h2s — decided against adding any; each section leads with its h2 directly (optionally a one-line muted subhead), no eyebrow micro-label anywhere on the page.
- **Checked** the `↗` arrow glyph — restricted to exactly two CTAs (Section 2's Software card, Section 7's Software CTA), both genuinely pointing to an external/different product surface — not glued onto every button as decoration.
- **Checked** alternating-row side repetition — Sections 5 and 7 are the only two alternating-feature-row sections on the page and are deliberately mirrored (image-left then image-right), satisfying the never-same-side-twice rule since they're the only pair.
- **Checked** flat 50/50 image:text default — explicitly varied per section per the image:text ratio table (Section 3 ~85%, Section 6 ~20%, Section 8 ~0%, Section 9 ~5%), not defaulted to even splits throughout.
- **Checked** blanket hover-lift/entrance-animation — motion signature limited to genuinely clickable cards (Sections 2, 3 reduced-intensity, 9); Sections 6, 10, 11, 12 have no card-hover or entrance animation at all.
