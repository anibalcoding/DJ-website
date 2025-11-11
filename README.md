# DJ Shutitdown — Static Site

Modern, glossy hip‑hop themed website focused on bookings, TikTok Live, music, and reels. Plain HTML/CSS/JS, deploy anywhere (Hostinger ready).

## Features
- Sticky header + mobile menu
- High‑impact hero with glossy gradient and CTA
- **TikTok Live** block with profile feed embed and a simulated "Live Now" badge (swap with real logic later)
- **Music** section with Spotify embeds (replace with your own links)
- **IG Reels** embeds (replace URLs with your posts)
- **Gallery** grid (Unsplash placeholders)
- **Upcoming Shows** from a simple JS array
- **Press** quotes + EPK download placeholder
- **Blog** teaser cards (edit in `script.js`)
- **Booking Request** form (validated; mailto fallback)
- **Mailchimp** subscribe form placeholder
- SEO: OpenGraph/Twitter tags + schema
- Analytics placeholders: GA4, Meta Pixel, TikTok Pixel
- Accessible patterns (labels, focus, color contrast)

## Setup
1. Replace placeholder assets in `/assets`:
   - `hero.jpg`, `live-placeholder.jpg`, `og-cover.jpg`, and `DJ-Shutitdown-EPK.pdf`.
2. Update social handles in HTML:
   - TikTok: `@djshutitdown` (temporary)
   - Instagram: `@djshutitdown`
3. Replace Spotify embed URLs in the **Music** section.
4. Edit shows in `script.js` (`shows` array).

## Booking Form → Options
Current: opens your email client via `mailto:`. For production, switch to one of:
- **Formspark** / **Getform** / **Netlify Forms** / **Formspree**
- Your own backend endpoint (POST JSON) and show success state.
- **Calendly**: swap CTA to a calendly popup script if you want time-slot booking.

## Mailchimp
Replace the `action` URL with your Mailchimp form POST endpoint (Audience → Embed form).

## Embeds
- TikTok: we use creator embed via `<script src="https://www.tiktok.com/embed.js">`. For live-status automation, consider TikTok APIs/3rd-party notifiers, or manual toggle.
- Instagram: ensure `<script src="//www.instagram.com/embed.js">` stays loaded, call `instgrm.Embeds.process()` after dynamic loads.

## Analytics
Uncomment snippets and add your IDs:
- GA4: `G-XXXXXXX`
- Meta Pixel: `YOUR_META_PIXEL_ID`
- TikTok Pixel: `YOUR_TIKTOK_PIXEL_ID`

## Colors & Fonts
- Base: #0f1015
- Surface: #141622
- Accents: Electric Cyan `#22d3ee`, Neon Purple `#a855f7`
- Fonts: Russo One (display), Inter (body)

## Deploy (Hostinger)
1. Zip these files and upload to your domain’s `public_html` (or use File Manager).
2. Ensure permissions allow static files and external scripts.
3. Set your domain to point to this folder (or use a subdomain).

---

© 2025 DJ Shutitdown
# DJ-website
