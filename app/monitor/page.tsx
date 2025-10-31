"use client";

import { useEffect, useState, useRef } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Ticket {
  name: string;
  price: string;
  eventId: string;
  soldOut: boolean;
  ticketsLeft: number;
  ticketsBooked: number;
  totalCapacity: number;
  error: string | null;
}

interface TicketData {
  tickets: Ticket[];
  error?: string;
}

export default function MonitorPage() {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const initialCapacities = useRef<Record<string, number>>({});

  const fetchTicketData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tickets', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();
      
      // Store initial capacities and calculate booked tickets
      if (data.tickets) {
        data.tickets = data.tickets.map((ticket: Ticket) => {
          // Store initial capacity if not stored
          if (!initialCapacities.current[ticket.eventId] && ticket.totalCapacity > 0) {
            initialCapacities.current[ticket.eventId] = ticket.totalCapacity;
          }
          
          // Calculate booked tickets
          const capacity = initialCapacities.current[ticket.eventId] || ticket.totalCapacity;
          const booked = ticket.soldOut ? capacity : capacity - ticket.ticketsLeft;
          
          return {
            ...ticket,
            totalCapacity: capacity,
            ticketsBooked: booked,
          };
        });
      }
      
      setTicketData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      setTicketData({ tickets: [], error: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchTicketData();

    // Auto-refresh every 1 second
    const interval = setInterval(fetchTicketData, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (ticket: Ticket) => {
    if (ticket.soldOut || ticket.ticketsLeft === 0) return 'from-red-500/20 to-red-600/20 border-red-500/30';
    if (ticket.ticketsLeft < 10) return 'from-orange-500/20 to-orange-600/20 border-orange-500/30';
    if (ticket.ticketsLeft < 30) return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
    return 'from-green-500/20 to-green-600/20 border-green-500/30';
  };

  const getPercentage = (ticket: Ticket) => {
    if (ticket.totalCapacity === 0) return '0';
    return ((ticket.ticketsBooked / ticket.totalCapacity) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#1a1a2e] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Soaking in Bliss (Internal Monitoring Dashboard)
              </h1>
              <p className="text-white/60 text-sm">
                Real-time • Updates every 1s
                {lastUpdated && (
                  <span className="ml-3">
                    Last: {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={fetchTicketData}
              disabled={loading}
              className="bg-[#d4af37] hover:bg-[#c9a961] text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50 text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error State */}
        {ticketData?.error && (
          <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 border border-red-500/50 flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-red-400 font-bold">Error</h3>
              <p className="text-red-300 text-sm">{ticketData.error}</p>
            </div>
          </div>
        )}

        {/* Compact Ticket Grid */}
        {ticketData?.tickets && ticketData.tickets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {ticketData.tickets.map((ticket) => {
              const percentage = getPercentage(ticket);
              
              return (
                <div
                  key={ticket.eventId}
                  className={`bg-gradient-to-br ${getStatusColor(ticket)} backdrop-blur-md rounded-xl p-4 border transition-all hover:scale-105`}
                >
                  {/* Ticket Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {ticket.name}
                      </h3>
                      <p className="text-white/70 text-sm">{ticket.price}</p>
                    </div>
                    {ticket.soldOut && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        SOLD OUT
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  {!ticket.error ? (
                    <>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-white font-bold text-xl">
                            {ticket.ticketsBooked}
                          </div>
                          <div className="text-white/60 text-xs">Booked</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-white font-bold text-xl">
                            {ticket.ticketsLeft}
                          </div>
                          <div className="text-white/60 text-xs">Left</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <div className="text-white font-bold text-xl">
                            {ticket.totalCapacity}
                          </div>
                          <div className="text-white/60 text-xs">Total</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-[#d4af37] transition-all duration-300 flex items-center justify-center"
                          style={{ width: `${percentage}%` }}
                        >
                          {parseFloat(percentage) > 15 && (
                            <span className="text-white font-bold text-xs">
                              {percentage}%
                            </span>
                          )}
                        </div>
                        {parseFloat(percentage) <= 15 && (
                          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                            {percentage}%
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-red-400 text-sm text-center py-4">
                      {ticket.error}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {loading && !ticketData && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 text-center border border-white/20">
            <RefreshCw className="w-12 h-12 text-[#d4af37] animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading ticket data...</p>
          </div>
        )}
      </div>
    </div>
  );
}
