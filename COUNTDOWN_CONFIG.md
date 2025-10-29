# Countdown Timer & Registration Configuration

## Overview
The website features a countdown timer that creates hype before registration opens. Prices are hidden until the countdown completes.

## Configuration Files

### Main Page (`/components/CompactEvent.tsx`)
- **Registration Opens**: November 2, 2024 at 12:00 PM IST
- **Configuration Line**: `const REGISTRATION_OPEN_DATE = new Date('2024-11-02T12:00:00+05:30');`
- **Displays**: All passes EXCEPT "Teacher Special"

### Teacher Page (`/components/TeacherEvent.tsx`)
- **Registration Opens**: November 2, 2024 at 10:00 AM IST (2 hours before main)
- **Configuration Line**: `const TEACHER_REGISTRATION_OPEN_DATE = new Date('2024-11-02T10:00:00+05:30');`
- **Displays**: Only "Teacher Family Special" pass
- **URL**: `/teachers` (not indexed by search engines)

## Features

### 1. Countdown Timer
- **Display**: Days, Hours, Minutes, Seconds
- **Location**: Overlays the ticket selection area
- **Effect**: Blurred background with countdown in the center
- **Auto-removes**: When countdown reaches zero

### 2. Price Security
- **Before Launch**: Prices are NOT rendered in HTML (secure from inspect element)
- **After Launch**: Prices appear automatically
- **Implementation**: Conditional rendering based on `isRegistrationOpen` state

### 3. Blur Overlay
- **Effect**: `backdrop-blur-md` with semi-transparent white background
- **Message**: "Registrations Opening Soon!"
- **Countdown Display**: 4-column grid showing time remaining
- **Target Date**: Displayed below countdown

### 4. Teacher-Only Page
- **URL**: `https://yourdomain.com/teachers`
- **Access**: Direct link only (not listed on main page)
- **SEO**: `noindex, nofollow` meta tags prevent search engine indexing
- **Opens**: 2 hours before general registration
- **Pass**: Teacher Family Special (₹7,000 for 4 people)

## How to Change Dates

### Update Main Registration Date
Edit `/components/CompactEvent.tsx`:
```typescript
const REGISTRATION_OPEN_DATE = new Date('2024-11-02T12:00:00+05:30');
```

### Update Teacher Registration Date
Edit `/components/TeacherEvent.tsx`:
```typescript
const TEACHER_REGISTRATION_OPEN_DATE = new Date('2024-11-02T10:00:00+05:30');
```

### Date Format
- Format: `YYYY-MM-DDTHH:MM:SS+05:30`
- Timezone: `+05:30` for IST (Indian Standard Time)
- Example: `2024-11-02T12:00:00+05:30` = Nov 2, 2024, 12:00 PM IST

## Testing

### Test Countdown (Set to Future Date)
```typescript
const REGISTRATION_OPEN_DATE = new Date('2024-12-31T23:59:59+05:30');
```

### Test Open Registration (Set to Past Date)
```typescript
const REGISTRATION_OPEN_DATE = new Date('2024-01-01T00:00:00+05:30');
```

## Security Features

1. **No Price Leakage**: Prices are not rendered in HTML until registration opens
2. **Conditional Rendering**: Uses React state to control visibility
3. **Teacher Page Hidden**: Not indexed by search engines
4. **Direct Link Only**: Teacher page requires knowing the exact URL

## User Experience

### Before Launch
- Countdown timer visible
- Ticket area blurred
- Prices hidden from HTML
- "Buy Pass" buttons not accessible

### After Launch
- Countdown disappears
- Ticket area clear
- Prices visible
- "Buy Pass" buttons active

## Pages

1. **Main Page**: `/` - Shows all passes except Teacher Special
2. **Teacher Page**: `/teachers` - Shows only Teacher Special pass
3. **Both pages**: Have independent countdown timers

## Notes

- Countdown updates every second
- Timer automatically clears when registration opens
- No manual intervention needed after setup
- Teacher page opens 2 hours before main registration
- All times are in IST (Indian Standard Time)
