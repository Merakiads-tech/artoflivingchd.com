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
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6e8] via-[#fdf5f7] to-[#fff9f0] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Gurudev Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/g.webp" 
          alt="Gurudev Sri Sri Ravi Shankar" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6e8]/30 via-[#fdf5f7]/30 to-[#fff9f0]/30"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[90vh]">
          
          {/* Left Panel - Hero Section */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/aol_.webp" 
                alt="The Art of Living" 
                className="h-14 w-auto object-contain"
              />
            </div>

            {/* Event Title */}
            <div className="flex-1 flex flex-col justify-center text-center">
              <div className="mb-8">
                <h1 className="text-6xl font-serif text-[#2c3e50] mb-3 tracking-tight leading-tight drop-shadow-md">
                  SOAKING
                </h1>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl font-serif text-[#2c3e50] drop-shadow-md">IN</span>
                  <span className="text-6xl font-script text-[#d4a5a5] italic drop-shadow-md">Bliss</span>
                </div>
                <h2 className="text-2xl font-serif text-[#2c3e50] tracking-wide mb-2 drop-shadow-md">WITH</h2>
                <h2 className="text-4xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Gurudev</h2>
                <h3 className="text-2xl font-serif text-[#2c3e50] mt-2 drop-shadow-md">Sri Sri Ravi Shankar Ji</h3>
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
              <p className="text-[#2c3e50] text-sm italic leading-relaxed">
                "When you are grateful, fear disappears<br/>and abundance appears"
              </p>
              <p className="text-[#d4af37] text-xs font-semibold mt-2">— Sri Sri Ravi Shankar</p>
            </div>

            {/* Contact Info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-[#2c3e50] text-xs">
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
          <div className="lg:col-span-7 bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl relative overflow-hidden">
            <h3 className="text-3xl font-serif text-[#2c3e50] text-center mb-6 font-bold drop-shadow-md">
              Choose Your Experience
            </h3>

            {/* Tickets Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 h-[calc(100%-80px)] overflow-y-auto pr-2 custom-scrollbar relative">
              {ticketTiers.map((tier, index) => {
                return (
                  <div
                    key={index}
                    className="group relative bg-white/30 backdrop-blur-sm rounded-xl p-3 border border-white/40 hover:border-[#d4af37]/60 transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between"
                  >
                    {tier.soldOut && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold z-10">
                        Sold Out
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-[#2c3e50] font-bold text-sm mb-1 text-center">{tier.name}</h4>
                      {isRegistrationOpen && (
                        <>
                          <p className="text-[#d4af37] font-bold text-base mb-1 text-center">{tier.price}</p>
                          <div className="flex items-center justify-center gap-1 mb-2 text-[#2c3e50]/60 text-xs">
                            <Users className="w-3 h-3" />
                            <span>{tier.capacity} {tier.capacity === 1 ? 'Person' : 'People'}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {tier.soldOut ? (
                      <button
                        disabled
                        className="w-full px-3 py-1.5 bg-gray-400 text-white rounded-lg text-xs font-semibold cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    ) : (
                      <a
                        href={tier.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn w-full px-3 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white rounded-lg text-xs font-semibold hover:from-[#c9a961] hover:to-[#d4af37] transition-all duration-300 shadow-md flex items-center justify-center gap-1"
                      >
                        <span>Register</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                );
              })}

              {/* Countdown Overlay */}
              {!isRegistrationOpen && timeRemaining && (
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-[#2c3e50]/80 via-[#34495e]/75 to-[#2c3e50]/80 rounded-2xl flex items-center justify-center z-20">
                  <div className="text-center p-8 max-w-2xl">
                    <h3 className="text-4xl font-serif text-white font-bold mb-6 drop-shadow-lg">
                      Registrations Opening Soon!
                    </h3>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <div className="text-4xl font-bold text-[#d4af37] mb-1">{timeRemaining.days}</div>
                        <div className="text-xs text-[#2c3e50] font-semibold tracking-wider">DAYS</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <div className="text-4xl font-bold text-[#d4af37] mb-1">{timeRemaining.hours}</div>
                        <div className="text-xs text-[#2c3e50] font-semibold tracking-wider">HOURS</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <div className="text-4xl font-bold text-[#d4af37] mb-1">{timeRemaining.minutes}</div>
                        <div className="text-xs text-[#2c3e50] font-semibold tracking-wider">MINUTES</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <div className="text-4xl font-bold text-[#d4af37] mb-1">{timeRemaining.seconds}</div>
                        <div className="text-xs text-[#2c3e50] font-semibold tracking-wider">SECONDS</div>
                      </div>
                    </div>
                    <p className="text-lg text-white font-semibold drop-shadow-md">
                      November 2, 2025 at 12:00 PM IST
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="mt-4 flex items-center justify-center gap-4 text-[#2c3e50]/60 text-xs">
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
          background: rgba(212, 175, 55, 0.1);
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
