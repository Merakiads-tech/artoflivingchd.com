"use client";

import { useEffect, useState } from 'react';
import { RefreshCw, Users, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface SubCampaign {
  sub_camp_name: string;
  amount: string;
  upper_limit: number;
  sub_camp_id: string;
  is_for_teacher: string;
}

interface TicketData {
  sub_campaigns: SubCampaign[];
  error?: string;
}

export default function MonitorPage() {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

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
      setTicketData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching ticket data:', error);
      setTicketData({ sub_campaigns: [], error: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchTicketData();

    // Set up auto-refresh every 30 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchTicketData, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const teacherTicket = ticketData?.sub_campaigns?.find(
    (camp) => camp.is_for_teacher === "1"
  );

  const totalCapacity = 104; // Total teacher tickets
  const ticketsLeft = teacherTicket?.upper_limit || 0;
  const ticketsBooked = totalCapacity - ticketsLeft;
  const percentageBooked = ((ticketsBooked / totalCapacity) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#1a1a2e] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Ticket Monitoring Dashboard
              </h1>
              <p className="text-white/70">
                Real-time ticket booking status for Teacher Special Pass
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  autoRefresh
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-white/70'
                }`}
              >
                Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={fetchTicketData}
                disabled={loading}
                className="bg-[#d4af37] hover:bg-[#c9a961] text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-white/50 text-sm mt-4">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && !ticketData && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
            <RefreshCw className="w-12 h-12 text-[#d4af37] animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading ticket data...</p>
          </div>
        )}

        {/* Error State */}
        {ticketData?.error && (
          <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/50 flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="text-red-400 font-bold text-lg">Error</h3>
              <p className="text-red-300">{ticketData.error}</p>
            </div>
          </div>
        )}

        {/* Main Stats */}
        {teacherTicket && !ticketData?.error && (
          <>
            {/* Big Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Tickets Booked */}
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                  <span className="text-green-400 text-sm font-semibold">BOOKED</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {ticketsBooked}
                </div>
                <p className="text-white/70">Tickets Sold</p>
              </div>

              {/* Tickets Available */}
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-10 h-10 text-blue-400" />
                  <span className="text-blue-400 text-sm font-semibold">AVAILABLE</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {ticketsLeft}
                </div>
                <p className="text-white/70">Tickets Left</p>
              </div>

              {/* Percentage */}
              <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#c9a961]/20 backdrop-blur-md rounded-2xl p-6 border border-[#d4af37]/30">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-10 h-10 text-[#d4af37]" />
                  <span className="text-[#d4af37] text-sm font-semibold">PROGRESS</span>
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {percentageBooked}%
                </div>
                <p className="text-white/70">Capacity Filled</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Booking Progress</h3>
                <span className="text-white/70 text-sm">
                  {ticketsBooked} / {totalCapacity} tickets
                </span>
              </div>
              <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-[#d4af37] transition-all duration-500 flex items-center justify-center"
                  style={{ width: `${percentageBooked}%` }}
                >
                  {parseFloat(percentageBooked) > 10 && (
                    <span className="text-white font-bold text-sm">
                      {percentageBooked}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Ticket Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-1">Ticket Name</p>
                  <p className="text-white font-semibold text-lg">
                    {teacherTicket.sub_camp_name}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-1">Price</p>
                  <p className="text-white font-semibold text-lg">
                    ₹{parseInt(teacherTicket.amount).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-1">Campaign ID</p>
                  <p className="text-white font-semibold text-lg">
                    {teacherTicket.sub_camp_id}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white/70 text-sm mb-1">Total Capacity</p>
                  <p className="text-white font-semibold text-lg">
                    {totalCapacity} tickets
                  </p>
                </div>
              </div>
            </div>

            {/* Status Alert */}
            {ticketsLeft < 20 && ticketsLeft > 0 && (
              <div className="mt-6 bg-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-500/50 flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-orange-400" />
                <div>
                  <h3 className="text-orange-400 font-bold text-lg">Low Availability!</h3>
                  <p className="text-orange-300">
                    Only {ticketsLeft} tickets remaining. Selling fast!
                  </p>
                </div>
              </div>
            )}

            {ticketsLeft === 0 && (
              <div className="mt-6 bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/50 flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <div>
                  <h3 className="text-red-400 font-bold text-lg">SOLD OUT!</h3>
                  <p className="text-red-300">
                    All {totalCapacity} tickets have been sold.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
