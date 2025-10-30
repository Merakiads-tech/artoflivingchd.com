"use client";

import { MapPin, Clock, Users, Info, Phone, Mail } from 'lucide-react';
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
      <div className="max-w-6xl w-full mx-auto">
        {/* Top Section with Gurudev and Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6 items-start">
          {/* Left - Gurudev Image */}
          <div className="flex items-start justify-start">
            <div className="relative w-full max-w-md">
              <img 
                src="/g_isolated.png" 
                alt="Gurudev Sri Sri Ravi Shankar" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right - Event Details */}
          <div className="flex flex-col justify-start pt-8">
            <h1 className="text-4xl font-serif text-[#2c3e50] mb-1 tracking-wide drop-shadow-md">SOAKING</h1>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-serif text-[#2c3e50] drop-shadow-md">IN</span>
              <span className="text-4xl font-script text-[#d4a5a5] italic drop-shadow-md">Bliss</span>
            </div>
            <h2 className="text-2xl font-serif text-[#2c3e50] tracking-wide drop-shadow-md">WITH</h2>
            <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Gurudev</h2>
            <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md mb-6">Sri Sri Ravi Shankar Ji</h2>
            
            {/* Date Badge */}
            <div className="inline-block bg-[#1a3a52] text-white rounded-2xl px-6 py-3 w-fit mb-4">
              <p className="text-2xl font-bold">
                22<sup className="text-sm">nd</sup> NOV 2025
              </p>
              <p className="text-xs tracking-widest mt-1">CHANDIGARH</p>
            </div>

            {/* Venue & Timing Combined - Horizontal Layout */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-bold text-[#2c3e50]">Event Details</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">When</p>
                  <p className="text-sm text-gray-700 font-semibold">Saturday, 22nd Nov 2025</p>
                  <p className="text-sm text-gray-700">5:00 PM - 8:00 PM</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Where</p>
                  <p className="text-sm text-gray-700 font-semibold">Palm Resort</p>
                  <p className="text-xs text-gray-600">Zirakpur-Ambala Road, Chandigarh</p>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gradient-to-r from-[#fff9f0] to-[#fef5e7] border-l-4 border-[#d4af37] rounded-lg p-4 shadow-md">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-[#2c3e50] mb-1">Important</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Seating is allocated on a first-come, first-served basis. Early registrations secure preferred seating closer to Gurudev.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div id="tickets" className="mb-6">
          <h3 className="text-xl font-bold text-center text-[#2c3e50] mb-4 drop-shadow-md">
            Choose Your Path to Bliss
          </h3>
          
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {ticketTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
                >
                  <h4 className="text-base font-bold text-[#1a1a1a] mb-1">{tier.name}</h4>
                  {isRegistrationOpen && (
                    <>
                      <p className="text-2xl font-bold text-[#d4af37] mb-0.5">{tier.price}</p>
                      <p className="text-xs text-gray-600 mb-2">{tier.capacity} {tier.capacity === 1 ? 'person' : 'people'}</p>
                    </>
                  )}
                  {tier.soldOut ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-1.5 rounded-full font-bold text-sm cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <a
                      href={tier.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white py-1.5 rounded-full font-bold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
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

        {/* Contact Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-center text-[#2c3e50] mb-4">Need Help?</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:9815540544" className="flex items-center gap-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Call Us</p>
                <p className="text-base font-semibold">981-5540-544</p>
              </div>
            </a>
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
            <a href="mailto:help@artoflivingchd.com" className="flex items-center gap-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Us</p>
                <p className="text-base font-semibold">help@artoflivingchd.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
