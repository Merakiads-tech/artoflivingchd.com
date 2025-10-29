"use client";

import { MapPin, Phone, Mail, Clock, Info, Award, Gem, Crown, Star, Sparkles, Diamond, Trophy, Users } from 'lucide-react';
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
// Set the registration opening date and time (IST)
const REGISTRATION_OPEN_DATE = new Date('2025-10-30T00:41:00+05:30'); // Nov 2, 2025, 12:00 PM IST

// ⚙️ CONFIGURATION: Change soldOut from false to true to mark a pass as SOLD OUT
// Example: soldOut: true will show "Sold Out" badge and disable the button
const ticketTiers: TicketTier[] = [
  { name: "Bronze", price: "₹2,100", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922881", icon: Award, soldOut: false, capacity: 1 },
  { name: "Teacher Special", price: "₹7,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922887", icon: Gem, soldOut: false, capacity: 4 },
  { name: "Silver", price: "₹11,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922871", icon: Star, soldOut: false, capacity: 2 }, // SOLD OUT
  { name: "Gold", price: "₹51,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922867", icon: Sparkles, soldOut: false, capacity: 2 },
  { name: "Diamond", price: "₹1,00,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922865", icon: Diamond, soldOut: false, capacity: 2 },
  { name: "Platinum", price: "₹2,50,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922862", icon: Trophy, soldOut: false, capacity: 4 }, // SOLD OUT
  { name: "Emerald", price: "₹11,00,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922852", icon: Crown, soldOut: false, capacity: 4 },
];

export default function CompactEvent() {
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

    // Initial calculation
    const initial = calculateTimeRemaining();
    setTimeRemaining(initial);
    if (initial === null) {
      setIsRegistrationOpen(true);
    }

    // Update every second
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
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6e8] via-[#fdf5f7] to-[#fff9f0] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Full-size Gurudev Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/g.webp" 
          alt="Gurudev Sri Sri Ravi Shankar" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6e8]/30 via-[#fdf5f7]/30 to-[#fff9f0]/30"></div>
      </div>

      {/* Decorative lotus elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 z-[1]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4af37]">
          <path fill="currentColor" d="M100,180 Q80,140 60,120 Q40,100 60,80 Q80,60 100,40 Q120,60 140,80 Q160,100 140,120 Q120,140 100,180 Z" opacity="0.3"/>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10 z-[1]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4af37]">
          <path fill="currentColor" d="M100,180 Q80,140 60,120 Q40,100 60,80 Q80,60 100,40 Q120,60 140,80 Q160,100 140,120 Q120,140 100,180 Z" opacity="0.3"/>
        </svg>
      </div>

      <div className="max-w-7xl w-full bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Event Info */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            {/* Art of Living Logo */}
            <div className="mb-4">
              <div className="flex items-center justify-center mb-3">
                <img 
                  src="/aol_.webp" 
                  alt="The Art of Living" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              
              {/* Event Title */}
              <div className="text-center mb-4 bg-white/20 backdrop-blur-sm rounded-2xl py-6 px-4">
                <h1 className="text-4xl font-serif text-[#2c3e50] mb-1 tracking-wide drop-shadow-md">SOAKING</h1>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl font-serif text-[#2c3e50] drop-shadow-md">IN</span>
                  <span className="text-4xl font-script text-[#d4a5a5] italic drop-shadow-md">Bliss</span>
                </div>
                <h2 className="text-2xl font-serif text-[#2c3e50] tracking-wide drop-shadow-md">WITH</h2>
                <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Gurudev</h2>
                <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Sri Sri Ravi Shankar Ji</h2>
              </div>

              {/* Date & Venue */}
              <div className="bg-[#2c3e50] text-white rounded-2xl px-6 py-3 text-center mb-4">
                <p className="text-2xl font-bold">22<sup className="text-sm">th</sup> NOV <span className="text-[#d4af37]">2025</span></p>
                <p className="text-sm tracking-widest mt-1">CHANDIGARH</p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                  <p className="text-[#2c3e50] font-semibold text-base drop-shadow">Venue</p>
                </div>
                <p className="text-[#2c3e50] text-sm leading-relaxed ml-7 drop-shadow mb-3">Palm Resort<br/>Zirakpur-Ambala Road, Chandigarh</p>
                
                <a
                  href="https://maps.google.com/?q=Palm+Resort+Zirakpur+Ambala+Road+Chandigarh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white rounded-lg text-xs font-semibold hover:from-[#c9a961] hover:to-[#d4af37] transition-all duration-300 shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-sm">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-[#d4af37]" />
                <p className="text-[#2c3e50] font-semibold text-base">Contact Us</p>
              </div>
              <div className="space-y-2 ml-7">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#2c3e50]" />
                  <p className="text-[#2c3e50] text-sm">981-5540-544</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#2c3e50]" />
                  <p className="text-[#2c3e50] text-sm">help@artoflivingchd.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Tiers */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif text-[#2c3e50] text-center mb-4 font-bold">Choose Your Path to Bliss</h3>
            
            <div className="relative">
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 relative">
              {ticketTiers.map((tier, index) => {
                const IconComponent = tier.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg transition-all duration-300 border border-[#d4af37]/30 ${
                      tier.soldOut ? 'opacity-60' : 'hover:shadow-xl transform hover:scale-105'
                    } relative`}
                  >
                    {tier.soldOut && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Sold Out
                      </div>
                    )}
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-[#2c3e50] font-bold text-sm mb-2">{tier.name}</h4>
                      {isRegistrationOpen && <p className="text-[#d4af37] font-bold text-lg mb-1">{tier.price}</p>}
                      {isRegistrationOpen && (
                        <div className="flex items-center justify-center gap-1 mb-3">
                          <Users className="w-3 h-3 text-[#2c3e50]" />
                          <p className="text-[#2c3e50] text-xs">
                            {tier.capacity} {tier.capacity === 1 ? 'Person' : 'People'}
                          </p>
                        </div>
                      )}
                      {tier.soldOut ? (
                        <button
                          disabled
                          className="block w-full px-3 py-2 bg-gray-400 text-white rounded-lg text-xs font-semibold cursor-not-allowed"
                        >
                          Sold Out
                        </button>
                      ) : (
                        <a
                          href={tier.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full px-3 py-2 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white rounded-lg text-xs font-semibold hover:from-[#34495e] hover:to-[#2c3e50] transition-all duration-300"
                        >
                          Buy Pass
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Countdown Overlay - Only covers tickets grid */}
              {!isRegistrationOpen && timeRemaining && (
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-[#2c3e50]/80 via-[#34495e]/75 to-[#2c3e50]/80 rounded-xl flex items-center justify-center z-20">
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

            {/* Additional Info */}
            <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#d4af37]" />
                    <p className="text-[#2c3e50] font-semibold text-sm">Event Timing</p>
                  </div>
                  <div className="ml-7 space-y-1">
                    <p className="text-[#2c3e50] text-sm">5:00 PM Onwards</p>
                    <p className="text-[#2c3e50] text-sm">Saturday, 22nd Nov 2025</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-[#d4af37]" />
                    <p className="text-[#2c3e50] font-semibold text-sm">Important</p>
                  </div>
                  <div className="ml-7 space-y-1">
                    <p className="text-[#2c3e50] text-sm">Bring valid ID proof</p>
                    <p className="text-[#2c3e50] text-sm">Limited seats available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gurudev Quote */}
            <div className="mt-4 text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-[#2c3e50] text-sm italic leading-relaxed mb-2">
                "When you are grateful, fear disappears and abundance appears"
              </p>
              <p className="text-[#d4af37] text-xs font-semibold">— Sri Sri Ravi Shankar</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
