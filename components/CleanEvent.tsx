"use client";

import { MapPin, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TicketTier {
  name: string;
  price: string;
  bookingLink: string;
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
  { name: "Bronze", price: "₹2,100", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922881", soldOut: false, capacity: 1 },
  { name: "Silver", price: "₹11,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922871", soldOut: false, capacity: 2 },
  { name: "Gold", price: "₹7,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922867", soldOut: false, capacity: 2 },
  { name: "Diamond", price: "₹1,00,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922865", soldOut: false, capacity: 2 },
  { name: "Platinum", price: "₹2,50,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922862", soldOut: false, capacity: 4 },
  { name: "Teacher Special", price: "₹7,000", bookingLink: "https://www.artofliving.online/donate.php?nca_id=922887", soldOut: false, capacity: 4 },
];

export default function CleanEvent() {
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
    <div className="min-h-screen bg-[#f5ebe5] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full mx-auto">
        {/* Top Section with Gurudev and Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
          {/* Left - Gurudev Image */}
          <div className="flex items-start justify-center lg:justify-start">
            <div className="relative w-full max-w-xs">
              <img 
                src="/g_isolated.png" 
                alt="Gurudev Sri Sri Ravi Shankar" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right - Event Details */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            {/* Buy Pass Button - Top Right */}
            <div className="flex justify-center lg:justify-end mb-4">
              <a
                href="#tickets"
                className="bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white px-6 py-2.5 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Buy Pass
              </a>
            </div>
            
            <h1 className="text-4xl font-serif text-[#2c3e50] mb-1 tracking-wide drop-shadow-md">SOAKING</h1>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              <span className="text-2xl font-serif text-[#2c3e50] drop-shadow-md">IN</span>
              <span className="text-4xl font-script text-[#d4a5a5] italic drop-shadow-md">Bliss</span>
            </div>
            <h2 className="text-2xl font-serif text-[#2c3e50] tracking-wide drop-shadow-md">WITH</h2>
            <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Gurudev</h2>
            <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md mb-6">Sri Sri Ravi Shankar Ji</h2>
            
            {/* Date Badge */}
            <div className="inline-block bg-[#1a3a52] text-white rounded-2xl px-6 py-3 w-fit mx-auto lg:mx-0">
              <p className="text-2xl font-bold">
                22<sup className="text-sm">nd</sup> NOV 2025
              </p>
              <p className="text-xs tracking-widest mt-1">CHANDIGARH</p>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div id="tickets" className="mb-8">
          <h3 className="text-2xl font-bold text-center text-[#2c3e50] mb-6 drop-shadow-md">
            Choose Your Path to Bliss
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ticketTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center max-w-xs mx-auto w-full"
                >
                  <h4 className="text-xl font-bold text-[#1a1a1a] mb-2">{tier.name}</h4>
                  {isRegistrationOpen && (
                    <>
                      <p className="text-3xl font-bold text-[#d4af37] mb-1">{tier.price}</p>
                      <p className="text-sm text-gray-600 mb-3">{tier.capacity} {tier.capacity === 1 ? 'person' : 'people'}</p>
                    </>
                  )}
                  {tier.soldOut ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-2.5 rounded-full font-bold text-base cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <a
                      href={tier.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white py-2.5 rounded-full font-bold text-base hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Secure Your Spot
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Countdown Overlay */}
            {!isRegistrationOpen && timeRemaining && (
              <div className="absolute inset-0 backdrop-blur-xl bg-white/80 rounded-2xl flex items-center justify-center z-20">
                <div className="text-center p-6">
                  <h3 className="text-3xl font-serif text-[#1a1a1a] font-bold mb-6">
                    Registrations Opening Soon!
                  </h3>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-xl">
                      <div className="text-4xl font-bold text-white mb-1">{timeRemaining.days}</div>
                      <div className="text-xs text-white/90 font-semibold tracking-wider">DAYS</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-xl">
                      <div className="text-4xl font-bold text-white mb-1">{timeRemaining.hours}</div>
                      <div className="text-xs text-white/90 font-semibold tracking-wider">HOURS</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-xl">
                      <div className="text-4xl font-bold text-white mb-1">{timeRemaining.minutes}</div>
                      <div className="text-xs text-white/90 font-semibold tracking-wider">MINS</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-2xl p-4 shadow-xl">
                      <div className="text-4xl font-bold text-white mb-1">{timeRemaining.seconds}</div>
                      <div className="text-xs text-white/90 font-semibold tracking-wider">SECS</div>
                    </div>
                  </div>
                  <p className="text-lg text-[#1a1a1a] font-semibold">
                    November 2, 2025 at 12:00 PM IST
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {/* Event Timing */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#2c3e50]">Event Timing</h4>
            </div>
            <p className="text-base text-gray-700 ml-11">5:00 PM - 8:00 PM</p>
            <p className="text-sm text-gray-600 ml-11">Saturday, 22nd Nov 2025</p>
          </div>

          {/* Venue */}
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-lg font-bold text-[#2c3e50]">Venue</h4>
            </div>
            <p className="text-base text-gray-700 ml-11 font-semibold">Palm Resort</p>
            <p className="text-sm text-gray-600 ml-11">Zirakpur-Ambala Road,<br/>Chandigarh</p>
          </div>
        </div>
      </div>
    </div>
  );
}
