"use client";

import { MapPin, Phone, Mail, Clock, Info, Award, Gem, Crown, Star, Sparkles, Diamond, Trophy, Users, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TicketTier {
  name: string;
  price: string;
  bookingLink: string;
  icon: React.ComponentType<{ className?: string }>;
  soldOut?: boolean;
  capacity: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ⚙️ REGISTRATION LAUNCH CONFIGURATION
const REGISTRATION_OPEN_DATE = new Date('2025-10-30T00:38:00+05:30');

const ticketTiers: TicketTier[] = [
  { name: "Bronze", price: "₹2,100", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922881", icon: Award, soldOut: false, capacity: 1 },
  { name: "Teacher Special", price: "₹7,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922887", icon: Gem, soldOut: false, capacity: 4 },
  { name: "Silver", price: "₹11,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922871", icon: Star, soldOut: false, capacity: 2 },
  { name: "Gold", price: "₹51,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922867", icon: Sparkles, soldOut: false, capacity: 2 },
  { name: "Diamond", price: "₹1,00,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922865", icon: Diamond, soldOut: false, capacity: 2 },
  { name: "Platinum", price: "₹2,50,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922862", icon: Trophy, soldOut: false, capacity: 4 },
  { name: "Emerald", price: "₹11,00,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922852", icon: Crown, soldOut: false, capacity: 4 },
];

export default function ModernEvent() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const targetTime = REGISTRATION_OPEN_DATE.getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsRegistrationOpen(true);
        return null;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    const initial = calculateTimeRemaining();
    setTimeRemaining(initial);
    if (initial === null) {
      setIsRegistrationOpen(true);
    }

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      if (remaining === null) {
        setIsRegistrationOpen(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#1a1a2e] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4a5a5]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Gurudev Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/g.webp" 
          alt="Gurudev Sri Sri Ravi Shankar" 
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[90vh]">
          
          {/* Left Panel - Hero Section */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/aol_.webp" 
                alt="The Art of Living" 
                className="h-14 w-auto object-contain opacity-90"
              />
            </div>

            {/* Event Title */}
            <div className="flex-1 flex flex-col justify-center text-center">
              <div className="mb-8">
                <h1 className="text-6xl font-serif text-white mb-3 tracking-tight leading-tight">
                  SOAKING
                </h1>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl font-serif text-white/90">IN</span>
                  <span className="text-6xl font-script text-[#d4af37] italic">Bliss</span>
                </div>
                <h2 className="text-2xl font-serif text-white/80 tracking-wide mb-2">WITH</h2>
                <h2 className="text-4xl font-serif text-[#d4af37] tracking-wider font-bold">Gurudev</h2>
                <h3 className="text-2xl font-serif text-white/70 mt-2">Sri Sri Ravi Shankar Ji</h3>
              </div>

              {/* Event Details Card */}
              <div className="bg-gradient-to-r from-[#d4af37] to-[#c9a961] rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <p className="text-3xl font-bold text-white">22<sup className="text-lg">nd</sup> NOV 2025</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Clock className="w-4 h-4" />
                  <p className="text-sm">5:00 PM Onwards</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">Palm Resort, Chandigarh</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm italic leading-relaxed">
                "When you are grateful, fear disappears<br/>and abundance appears"
              </p>
              <p className="text-[#d4af37] text-xs font-semibold mt-2">— Sri Sri Ravi Shankar</p>
            </div>

            {/* Contact Info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-white/60 text-xs">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>981-5540-544</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>help@artoflivingchd.com</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Tickets */}
          <div className="lg:col-span-7 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
            <h3 className="text-3xl font-serif text-white text-center mb-6 font-bold">
              Choose Your Experience
            </h3>

            {/* Tickets Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[calc(100%-80px)] overflow-y-auto pr-2 custom-scrollbar relative">
              {ticketTiers.map((tier, index) => {
                const IconComponent = tier.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:border-[#d4af37]/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
                  >
                    {tier.soldOut && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
                        Sold Out
                      </div>
                    )}
                    
                    <div>
                      <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-white font-bold text-base mb-2 text-center">{tier.name}</h4>
                      {isRegistrationOpen && (
                        <>
                          <p className="text-[#d4af37] font-bold text-xl mb-2 text-center">{tier.price}</p>
                          <div className="flex items-center justify-center gap-1 mb-3 text-white/60 text-xs">
                            <Users className="w-3 h-3" />
                            <span>{tier.capacity} {tier.capacity === 1 ? 'Person' : 'People'}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {tier.soldOut ? (
                      <button
                        disabled
                        className="w-full px-4 py-2.5 bg-gray-500/50 text-white/50 rounded-xl text-xs font-semibold cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    ) : (
                      <a
                        href={tier.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn w-full px-4 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white rounded-xl text-xs font-semibold hover:from-[#c9a961] hover:to-[#d4af37] transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>Register Now</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                );
              })}

              {/* Countdown Overlay */}
              {!isRegistrationOpen && timeRemaining && (
                <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-[#1a1a2e]/95 via-[#2d2d44]/95 to-[#1a1a2e]/95 rounded-2xl flex items-center justify-center z-20">
                  <div className="text-center p-8">
                    <h3 className="text-4xl font-serif text-white font-bold mb-8 animate-pulse">
                      Registrations Opening Soon!
                    </h3>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-2xl">
                        <div className="text-5xl font-bold text-white mb-2">{timeRemaining.days}</div>
                        <div className="text-xs text-white/80 font-semibold tracking-widest">DAYS</div>
                      </div>
                      <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-2xl">
                        <div className="text-5xl font-bold text-white mb-2">{timeRemaining.hours}</div>
                        <div className="text-xs text-white/80 font-semibold tracking-widest">HOURS</div>
                      </div>
                      <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-2xl">
                        <div className="text-5xl font-bold text-white mb-2">{timeRemaining.minutes}</div>
                        <div className="text-xs text-white/80 font-semibold tracking-widest">MINS</div>
                      </div>
                      <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-2xl">
                        <div className="text-5xl font-bold text-white mb-2">{timeRemaining.seconds}</div>
                        <div className="text-xs text-white/80 font-semibold tracking-widest">SECS</div>
                      </div>
                    </div>
                    <p className="text-xl text-white font-semibold">
                      November 2, 2025 at 12:00 PM IST
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="mt-4 flex items-center justify-center gap-4 text-white/50 text-xs">
              <div className="flex items-center gap-1">
                <Info className="w-3 h-3" />
                <span>Bring valid ID proof</span>
              </div>
              <span>•</span>
              <span>Limited seats available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.7);
        }
      `}</style>
    </div>
  );
}
