import { NextResponse } from 'next/server';

// Ticket configuration with event IDs
const TICKETS = [
  { name: 'Bronze', eventId: '922881', price: '₹2,100' },
  { name: 'Teacher Special', eventId: '922887', price: '₹7,000' },
  { name: 'Silver', eventId: '922871', price: '₹11,000' },
  { name: 'Gold', eventId: '922867', price: '₹51,000' },
  { name: 'Diamond', eventId: '922865', price: '₹1,00,000' },
  { name: 'Platinum', eventId: '922862', price: '₹2,50,000' },
  { name: 'Emerald', eventId: '922852', price: '₹11,00,000' },
];

async function fetchTicketData(eventId: string) {
  const response = await fetch(
    `https://www.artofliving.online/api.php?action=getSubCmp&api_key=9332af4dd1fce4efda207e82a14570cf783c85c1&event_id=${eventId}&fcpid=`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data for event ${eventId}`);
  }

  return response.json();
}

export async function GET() {
  try {
    // Fetch all tickets in parallel
    const results = await Promise.all(
      TICKETS.map(async (ticket) => {
        try {
          const data = await fetchTicketData(ticket.eventId);
          
          // Check if sold out (validity_ends: 1)
          if (data.validity_ends === 1) {
            return {
              name: ticket.name,
              price: ticket.price,
              eventId: ticket.eventId,
              soldOut: true,
              ticketsLeft: 0,
              ticketsBooked: 0,
              totalCapacity: 0,
              error: null,
            };
          }

          // Parse normal response
          const subCampaign = data.sub_campaigns?.[0];
          if (subCampaign) {
            const ticketsLeft = subCampaign.upper_limit;
            const totalCapacity = ticketsLeft; // Use current upper_limit as total capacity
            
            return {
              name: ticket.name,
              price: ticket.price,
              eventId: ticket.eventId,
              soldOut: false,
              ticketsLeft,
              ticketsBooked: 0, // Will be calculated on first load
              totalCapacity,
              error: null,
            };
          }

          return {
            name: ticket.name,
            price: ticket.price,
            eventId: ticket.eventId,
            soldOut: false,
            ticketsLeft: 0,
            ticketsBooked: 0,
            totalCapacity: 0,
            error: 'No data available',
          };
        } catch (error) {
          console.error(`Error fetching ${ticket.name}:`, error);
          return {
            name: ticket.name,
            price: ticket.price,
            eventId: ticket.eventId,
            soldOut: false,
            ticketsLeft: 0,
            ticketsBooked: 0,
            totalCapacity: 0,
            error: 'Failed to fetch',
          };
        }
      })
    );

    return NextResponse.json({ tickets: results });
  } catch (error) {
    console.error('Error fetching ticket data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ticket data' },
      { status: 500 }
    );
  }
}
