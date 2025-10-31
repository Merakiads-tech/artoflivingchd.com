"use client";

import { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';

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

const CORRECT_PASSWORD = 'letmetellyouoverthecall';
const ENABLE_LOGIN = false; // Set to true to enable password protection

export default function MonitorPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(!ENABLE_LOGIN);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

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
      setTicketData({ tickets: [], error: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  useEffect(() => {
    // Only fetch if authenticated
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    // Fetch immediately
    fetchTicketData();

    // Auto-refresh every 3 seconds
    const interval = setInterval(fetchTicketData, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

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

  // Login Screen (only shown if ENABLE_LOGIN is true)
  if (ENABLE_LOGIN && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 animate-gradient">
        <div className="relative max-w-md w-full">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          {/* Login Card */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Soaking in Bliss
              </span>
            </h1>
            <p className="text-white/70 text-center mb-6">Monitoring Dashboard</p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter password..."
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                Unlock Dashboard
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-white/40 text-xs">
                Powered by <span className="text-purple-400 font-semibold">Meraki Tech</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard (only shown after authentication)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 animate-gradient">
      <div className="max-w-7xl mx-auto">
        {/* HERO Header */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 mb-6 border border-white/10 shadow-2xl overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10">
            {/* Hero Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                  Soaking in Bliss
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                <p className="text-xl md:text-2xl text-white/90 font-bold tracking-wide">
                  Internal Monitoring Dashboard
                </p>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              </div>
              
              {/* Meraki Tech Credit */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-lg">
                <span className="text-sm text-white/60">Powered by</span>
                <span className="text-sm font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                  Meraki Tech Infrastructure
                </span>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold">Live • Updates every 3s</span>
              </div>
              
              {lastUpdated && (
                <div className="flex items-center gap-2 text-white/70 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <span className="text-sm">Last Updated:</span>
                  <span className="text-sm font-bold text-white">{lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
              
              <button
                onClick={fetchTicketData}
                disabled={loading}
                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                <span className="text-sm">Refresh Now</span>
              </button>
            </div>
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

        {/* Modern Ticket Grid */}
        {ticketData?.tickets && ticketData.tickets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ticketData.tickets.map((ticket, index) => {
              const percentage = getPercentage(ticket);
              
              return (
                <div
                  key={ticket.eventId}
                  className={`group relative bg-gradient-to-br ${getStatusColor(ticket)} backdrop-blur-xl rounded-2xl p-5 border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                  
                  {/* Ticket Header */}
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl leading-tight mb-1 group-hover:text-purple-300 transition-colors">
                        {ticket.name}
                      </h3>
                      <p className="text-white/80 text-sm font-semibold bg-white/10 px-2 py-1 rounded-lg inline-block">
                        {ticket.price}
                      </p>
                    </div>
                    {ticket.soldOut && (
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
                        SOLD OUT
                      </span>
                    )}
                  </div>

                  {/* Stats with Animation */}
                  {!ticket.error ? (
                    <>
                      <div className="relative grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-110 hover:bg-white/20">
                          <div className="text-white font-bold text-2xl mb-1 tabular-nums animate-count-up">
                            {ticket.ticketsBooked}
                          </div>
                          <div className="text-white/70 text-xs font-semibold">Booked</div>
                        </div>
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-110 hover:bg-white/20">
                          <div className="text-white font-bold text-2xl mb-1 tabular-nums animate-count-up">
                            {ticket.ticketsLeft}
                          </div>
                          <div className="text-white/70 text-xs font-semibold">Left</div>
                        </div>
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 text-center transform transition-all duration-300 hover:scale-110 hover:bg-white/20">
                          <div className="text-white font-bold text-2xl mb-1 tabular-nums">
                            {ticket.totalCapacity}
                          </div>
                          <div className="text-white/70 text-xs font-semibold">Total</div>
                        </div>
                      </div>

                      {/* Modern Progress Bar */}
                      <div className="relative h-8 bg-white/10 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 transition-all duration-1000 ease-out flex items-center justify-center shadow-lg"
                          style={{ width: `${percentage}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          {parseFloat(percentage) > 15 && (
                            <span className="relative text-white font-bold text-sm drop-shadow-lg">
                              {percentage}%
                            </span>
                          )}
                        </div>
                        {parseFloat(percentage) <= 15 && (
                          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm drop-shadow-lg">
                            {percentage}%
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-red-400 text-sm text-center py-6 font-semibold">
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
