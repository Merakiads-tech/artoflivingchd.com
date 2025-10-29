# Website Configuration Guide

## How to Mark Passes as Sold Out

To mark a pass tier as sold out, edit `/components/CompactEvent.tsx` and change the `soldOut` property to `true`:

```typescript
const ticketTiers: TicketTier[] = [
MakeMake
  { name: "Silver", price: "₹7,000", bookingLink: "#", icon: Star, soldOut: true, capacity: 1 }, // This pass is sold out
  { name: "Gold", price: "₹11,000", bookingLink: "#", icon: Sparkles, soldOut: false, capacity: 1 },
  // ... other tiers
];
```

When a pass is marked as `soldOut: true`:
- A red "Sold Out" badge appears on the card
- The card becomes slightly transparent (60% opacity)
- The "Buy Pass" button is replaced with a disabled "Sold Out" button
- Hover effects are disabled

## How to Update Ticket Booking Links

Replace the `#` in the `bookingLink` property with your actual booking URL:

```typescript
const ticketTiers: TicketTier[] = [
  { 
    name: "Bronze", 
    price: "₹2,100", 
    bookingLink: "https://your-booking-site.com/bronze", 
    icon: Award, 
    soldOut: false,
    capacity: 1
  },
  // ... other tiers
];
```

## How to Update Pass Capacity

The `capacity` field shows how many people are allowed per pass. Update the number as needed:

```typescript
const ticketTiers: TicketTier[] = [
  { name: "Bronze", price: "₹2,100", bookingLink: "#", icon: Award, soldOut: false, capacity: 1 },  // 1 Person
  { name: "Pearl", price: "₹51,000", bookingLink: "#", icon: Gem, soldOut: false, capacity: 2 },    // 2 People
  { name: "Platinum", price: "₹2,50,000", bookingLink: "#", icon: Trophy, soldOut: false, capacity: 4 }, // 4 People
  { name: "Royal", price: "₹11,00,000", bookingLink: "#", icon: Crown, soldOut: false, capacity: 10 },  // 10 People
];
```

The display will automatically show "1 Person" or "X People" based on the capacity value.

## Pass Icons

Each pass tier uses a unique Lucide React icon:
- **Bronze**: Award (🏆)
- **Silver**: Star (⭐)
- **Gold**: Sparkles (✨)
- **Pearl**: Gem (💎)
- **Diamond**: Diamond (💎)
- **Platinum**: Trophy (🏆)
- **Royal**: Crown (👑)

To change an icon, import a different icon from `lucide-react` and update the `icon` property.

## Customizing the Gurudev Quote

Edit the quote section in `/components/CompactEvent.tsx`:

```typescript
{/* Gurudev Quote */}
<div className="mt-4 text-center bg-white/40 rounded-xl p-4">
  <p className="text-[#2c3e50] text-sm italic leading-relaxed mb-2">
    "Your custom quote here"
  </p>
  <p className="text-[#d4af37] text-xs font-semibold">— Sri Sri Ravi Shankar</p>
</div>
```

## Contact Information

To update contact details, modify these sections in `/components/CompactEvent.tsx`:

```typescript
// Phone number
<p className="text-[#2c3e50] text-sm">981-5540-544</p>

// Email
<p className="text-[#2c3e50] text-sm">help@artoflivingchd.com</p>

// Venue
<p className="text-[#2c3e50] text-sm leading-relaxed ml-7">
  Temple of Knowledge<br/>Sector 68, Mohali, Punjab
</p>
```

## Event Timing

To update event timing:

```typescript
<p className="text-[#2c3e50] text-sm">Gates Open: 5:00 PM</p>
<p className="text-[#2c3e50] text-sm">Event Starts: 6:00 PM</p>
```

## Available Lucide Icons

You can use any icon from [Lucide React](https://lucide.dev/icons/). Currently imported:
- MapPin, Phone, Mail, Clock, Info (for sections)
- Award, Gem, Crown, Star, Sparkles, Diamond, Trophy (for passes)

To add more icons:
```typescript
import { YourIconName } from 'lucide-react';
```
