# Example: Testing Sold-Out Feature

## Quick Test

To see how the sold-out feature looks, temporarily mark the Silver pass as sold out:

### Before (Available):
```typescript
{ name: "Silver", price: "₹7,000", bookingLink: "#", icon: Star, soldOut: false },
```

### After (Sold Out):
```typescript
{ name: "Silver", price: "₹7,000", bookingLink: "#", icon: Star, soldOut: true },
```

## Visual Changes When Sold Out

1. **Red Badge**: A "Sold Out" badge appears in the top-right corner
2. **Reduced Opacity**: The card becomes 60% transparent
3. **Disabled Button**: "Buy Pass" changes to a gray "Sold Out" button
4. **No Hover Effects**: The card no longer scales or shows enhanced shadow on hover

## Real-World Usage

When a pass tier is fully booked:

1. Open `/components/CompactEvent.tsx`
2. Find the pass tier in the `ticketTiers` array
3. Change `soldOut: false` to `soldOut: true`
4. Save the file
5. The website will automatically update (hot reload)

## Multiple Sold-Out Passes

You can mark multiple passes as sold out:

```typescript
const ticketTiers: TicketTier[] = [
  { name: "Bronze", price: "₹2,100", bookingLink: "#", icon: Award, soldOut: true },
  { name: "Silver", price: "₹7,000", bookingLink: "#", icon: Star, soldOut: true },
  { name: "Gold", price: "₹11,000", bookingLink: "#", icon: Sparkles, soldOut: false },
  { name: "Pearl", price: "₹51,000", bookingLink: "#", icon: Gem, soldOut: false },
  { name: "Diamond", price: "₹1,00,000", bookingLink: "#", icon: Diamond, soldOut: false },
  { name: "Platinum", price: "₹2,50,000", bookingLink: "#", icon: Trophy, soldOut: true },
  { name: "Royal", price: "₹11,00,000", bookingLink: "#", icon: Crown, soldOut: false },
];
```

In this example, Bronze, Silver, and Platinum passes are sold out.

## Reverting Sold-Out Status

If more passes become available, simply change back to `soldOut: false`:

```typescript
{ name: "Silver", price: "₹7,000", bookingLink: "#", icon: Star, soldOut: false },
```

## Best Practices

1. **Update Immediately**: Mark passes as sold out as soon as they're fully booked
2. **Clear Communication**: The visual indicators make it obvious which passes are unavailable
3. **Keep Links**: Even for sold-out passes, keep the booking links in case you need to revert
4. **Test First**: Before going live, test the sold-out feature to ensure it displays correctly
