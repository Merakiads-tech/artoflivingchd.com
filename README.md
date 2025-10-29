# Soaking in Bliss - Event Website

A beautiful, compact one-page website for the "Soaking in Bliss with Gurudev" event happening on 22nd November 2025 in Chandigarh.

## Event Details

- **Event**: Soaking in Bliss with Gurudev Sri Sri Ravi Shankar
- **Date**: 22nd November 2025
- **Venue**: Temple of Knowledge, Sector 68, Mohali, Punjab
- **Time**: Gates Open at 5:00 PM, Event Starts at 6:00 PM

## Features

- ✨ **Compact Design**: Everything fits on one screen without scrolling
- 🎫 **7 Ticket Tiers**: Bronze (₹2,100) to Royal (₹11,00,000) with unique icons
- 🎨 **Elegant Theme**: Soft pink and golden colors inspired by the official poster
- 📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Fast Loading**: Built with Next.js 15 and optimized for performance
- 🎯 **Lucide Icons**: Beautiful SVG icons for all sections and pass categories
- 🔒 **Sold-Out Management**: Easy configuration to mark passes as sold out
- 💬 **Gurudev Quote**: Inspirational quote by Sri Sri Ravi Shankar
- 🎨 **Professional Icons**: Each pass tier has a unique icon (Award, Star, Sparkles, Gem, Diamond, Trophy, Crown)

## Ticket Tiers

1. **Bronze** - ₹2,100
2. **Silver** - ₹7,000
3. **Gold** - ₹11,000
4. **Pearl** - ₹51,000
5. **Diamond** - ₹1,00,000
6. **Platinum** - ₹2,50,000
7. **Royal** - ₹11,00,000

## Contact Information

- **Phone**: 981-5540-544
- **Email**: help@artoflivingchd.com
- **Address**: Temple of Knowledge, Sector 68, Mohali, Punjab

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Customization

### Update Ticket Booking Links

Edit `/components/CompactEvent.tsx` and update the `bookingLink` property for each ticket tier:

```typescript
const ticketTiers: TicketTier[] = [
  { name: "Bronze", price: "₹2,100", bookingLink: "YOUR_BOOKING_LINK_HERE", icon: Award, soldOut: false },
  // ... update other tiers
];
```

### Mark Passes as Sold Out

To mark a pass as sold out, change `soldOut: false` to `soldOut: true`:

```typescript
const ticketTiers: TicketTier[] = [
  { name: "Bronze", price: "₹2,100", bookingLink: "#", icon: Award, soldOut: true }, // This pass is sold out
  // ... other tiers
];
```

When sold out:
- A red "Sold Out" badge appears
- The card becomes semi-transparent
- The button changes to disabled "Sold Out"
- Hover effects are disabled

See `CONFIGURATION.md` for detailed configuration instructions.

### Update Colors

The color theme is based on the official poster:
- Background: Soft pink gradient (`#f5e6e8`, `#fdf5f7`, `#fff9f0`)
- Primary: Dark teal (`#2c3e50`)
- Accent: Golden (`#d4af37`)
- Bliss text: Rose pink (`#d4a5a5`)

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Dancing Script (script)
- **Language**: TypeScript

## Deploy

Build for production:

```bash
npm run build
npm start
```

Or deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/soaking-in-bliss)

---

Organized by **The Art of Living Foundation**
