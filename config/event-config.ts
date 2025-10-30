// ============================================
// EVENT CONFIGURATION
// ============================================
// This file contains all configurable settings for the event registration pages.
// Update these values to control registration dates, ticket availability, and event details.

// ============================================
// REGISTRATION DATES
// ============================================

// Main Page Registration Opening Date & Time
// Format: 'YYYY-MM-DDTHH:mm:ss+05:30' (IST timezone)
export const MAIN_REGISTRATION_OPEN_DATE = new Date('2025-10-31T13:00:00+05:30');

// Teachers Page Registration Opening Date & Time
// Format: 'YYYY-MM-DDTHH:mm:ss+05:30' (IST timezone)
export const TEACHER_REGISTRATION_OPEN_DATE = new Date('2025-10-31T09:00:00+05:30');

// ============================================
// EVENT DETAILS (Displayed on Pages)
// ============================================

// Venue Name
export const VENUE_NAME = 'Palms Banquet';

// Venue Address
export const VENUE_ADDRESS = 'Zirakpur-Ambala Road, Zirakpur, Punjab';

// Google Maps Link
export const VENUE_MAPS_LINK = 'https://www.google.com/maps/place/Palms+Banquet+Zirakpur/@30.623972,76.8226322,17z/data=!4m15!1m8!3m7!1s0x390fead26761ae13:0x981d27f033178578!2sPALMS+BANQUET,+Punjab+140603!3b1!8m2!3d30.6242406!4d76.822!16s%2Fg%2F11n6spmm_w!3m5!1s0x390fead2ed89e489:0x888c03303efadaf3!8m2!3d30.6244916!4d76.8236738!16s%2Fg%2F11b6cq3jgp?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D';

// Registration Opening Text (for countdown display on main page)
export const MAIN_REGISTRATION_OPENING_TEXT = 'October 31, 2025 at 1:00 PM IST';

// Registration Opening Text (for teachers page heading)
export const TEACHER_REGISTRATION_OPENING_TEXT = 'October 31, 2025 at 9:00 AM IST';

// ============================================
// TICKET CONFIGURATION
// ============================================

export interface TicketConfig {
  name: string;
  price: string;
  bookingLink: string;
  soldOut: boolean;      // Set to true to mark as sold out
  enabled: boolean;      // Set to false to hide this ticket completely
  capacity: number;      // Number of people allowed per ticket
}

// Main Page Tickets
export const MAIN_PAGE_TICKETS: TicketConfig[] = [
  {
    name: "Bronze",
    price: "₹2,100",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922881",
    soldOut: false,       // Change to true to mark as sold out
    enabled: true,        // Change to false to hide this ticket
    capacity: 1
  },
  {
    name: "Teacher Special",
    price: "₹7,000",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922887",
    soldOut: false,        // Currently marked as sold out
    enabled: true,
    capacity: 4
  },
  {
    name: "Silver",
    price: "₹11,000",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922871",
    soldOut: false,
    enabled: true,
    capacity: 2
  },
  {
    name: "Gold",
    price: "₹51,000",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922867",
    soldOut: false,
    enabled: true,
    capacity: 2
  },
  {
    name: "Diamond",
    price: "₹1,00,000",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922865",
    soldOut: false,
    enabled: true,
    capacity: 2
  },
  {
    name: "Platinum",
    price: "₹2,50,000",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922862",
    soldOut: false,
    enabled: true,
    capacity: 4
  },
  {
    name: "Emerald",
    price: "₹11,00,000",
    bookingLink: "https://www.artofliving.online/donate.php?nca_id=922852",
    soldOut: false,
    enabled: true,
    capacity: 4
  }
];

// Teachers Page Ticket
export const TEACHER_PAGE_TICKET: TicketConfig = {
  name: "Teacher Special",
  price: "₹7,000",
  bookingLink: "https://www.artofliving.online/donate.php?nca_id=922887",
  soldOut: false,         // Change to true to mark as sold out
  enabled: true,          // Change to false to hide this ticket
  capacity: 4
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get only enabled tickets (filters out disabled tickets)
export const getEnabledMainTickets = (): TicketConfig[] => {
  return MAIN_PAGE_TICKETS.filter(ticket => ticket.enabled);
};

// Get enabled tickets sorted by price (ascending)
export const getSortedMainTickets = (): TicketConfig[] => {
  return getEnabledMainTickets().sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
    const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
    return priceA - priceB;
  });
};

// Check if teacher ticket is enabled
export const isTeacherTicketEnabled = (): boolean => {
  return TEACHER_PAGE_TICKET.enabled;
};
