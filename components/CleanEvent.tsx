"use client";

import { MapPin, Clock, Users, Info, Phone, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  MAIN_REGISTRATION_OPEN_DATE,
  MAIN_REGISTRATION_OPENING_TEXT,
  VENUE_NAME,
  VENUE_ADDRESS,
  VENUE_MAPS_LINK,
  getSortedMainTickets
} from '@/config/event-config';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Get tickets from config
const sortedTicketTiers = getSortedMainTickets();

export default function CleanEvent() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const previousTimeRef = useRef<TimeRemaining | null>(null);

  // Enhanced confetti and fireworks animation function
  const triggerConfetti = () => {
    const duration = 6000; // Extended to 6 seconds
    const animationEnd = Date.now() + duration;
    const colors = ['#d4af37', '#c9a961', '#d4a5a5', '#2c3e50', '#ffffff', '#ffd700', '#ff69b4', '#87ceeb'];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // Fireworks function - creates starburst effect
    const fireWorks = (x: number, y: number, delay: number = 0) => {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 360,
          origin: { x, y },
          startVelocity: 50,
          decay: 0.9,
          scalar: 2.5, // BIGGER particles for fireworks
          ticks: 150,
          zIndex: 9999,
          colors: colors,
          shapes: ['circle', 'square'],
          gravity: 0.8
        });
      }, delay);
    };

    // Initial burst - BIGGER explosion
    const burstCount = 250;
    confetti({
      particleCount: burstCount,
      spread: 180,
      origin: { x: 0.5, y: 0.5 },
      startVelocity: 60,
      ticks: 100,
      zIndex: 9999,
      colors: colors,
      scalar: 2.0, // BIGGER confetti (was 1.0)
      shapes: ['circle', 'square']
    });

    // Fireworks sequence - multiple explosions
    fireWorks(0.2, 0.3, 300);
    fireWorks(0.8, 0.3, 500);
    fireWorks(0.5, 0.2, 700);
    fireWorks(0.3, 0.4, 1200);
    fireWorks(0.7, 0.4, 1400);
    fireWorks(0.5, 0.3, 1800);
    fireWorks(0.15, 0.35, 2200);
    fireWorks(0.85, 0.35, 2400);
    fireWorks(0.5, 0.25, 2800);

    // Side bursts - BIGGER
    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 60,
        spread: 100,
        origin: { x: 0, y: 0.6 },
        startVelocity: 55,
        colors: colors,
        zIndex: 9999,
        scalar: 2.0, // BIGGER
        shapes: ['circle', 'square']
      });
      confetti({
        particleCount: 120,
        angle: 120,
        spread: 100,
        origin: { x: 1, y: 0.6 },
        startVelocity: 55,
        colors: colors,
        zIndex: 9999,
        scalar: 2.0, // BIGGER
        shapes: ['circle', 'square']
      });
    }, 200);

    // Continuous rain effect - BIGGER confetti
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 80 * (timeLeft / duration);

      // Multiple launch points for fuller effect
      confetti({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        startVelocity: 45,
        ticks: 80,
        zIndex: 9999,
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(1.5, 2.5) // BIGGER (was 0.8-1.2)
      });
      
      confetti({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 },
        startVelocity: 45,
        ticks: 80,
        zIndex: 9999,
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(1.5, 2.5) // BIGGER
      });
      
      confetti({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        startVelocity: 45,
        ticks: 80,
        zIndex: 9999,
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(1.5, 2.5) // BIGGER
      });
    }, 200);

    // Final grand fireworks finale
    setTimeout(() => {
      // Triple fireworks burst
      fireWorks(0.3, 0.3, 0);
      fireWorks(0.5, 0.2, 100);
      fireWorks(0.7, 0.3, 200);
      
      // Final confetti shower
      confetti({
        particleCount: 200,
        spread: 360,
        origin: { x: 0.5, y: 0.4 },
        startVelocity: 70,
        ticks: 120,
        zIndex: 9999,
        colors: colors,
        scalar: 2.5, // BIGGER
        shapes: ['circle', 'square']
      });
    }, duration - 800);
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const targetTime = MAIN_REGISTRATION_OPEN_DATE.getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
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
    previousTimeRef.current = initial;
    
    // Only set registration open, don't trigger confetti on initial load if already expired
    if (initial === null) {
      setIsRegistrationOpen(true);
    }

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      
      // Check if countdown just finished (was not null, now is null)
      if (remaining === null && previousTimeRef.current !== null && !hasTriggeredConfetti) {
        setIsRegistrationOpen(true);
        setTimeRemaining(null);
        setHasTriggeredConfetti(true);
        triggerConfetti();
        clearInterval(interval);
      } else if (remaining === null) {
        setIsRegistrationOpen(true);
        setTimeRemaining(null);
        clearInterval(interval);
      } else {
        setTimeRemaining(remaining);
        previousTimeRef.current = remaining;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5ebe5] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full mx-auto">
        {/* Top Section with Gurudev and Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 mb-6 items-start">
          {/* Left - Gurudev Image */}
          <div className="flex items-start justify-center lg:justify-start">
            <div className="relative w-3/5 lg:w-full max-w-md">
              <img 
                src="/g_isolated.png" 
                alt="Gurudev Sri Sri Ravi Shankar" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right - Event Details */}
          <div className="flex flex-col justify-start lg:pt-8">
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
                  <p className="text-sm text-gray-700 font-semibold">{VENUE_NAME}</p>
                  <p className="text-xs text-gray-600 mb-2">{VENUE_ADDRESS}</p>
                  <a
                    href={VENUE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#d4af37] hover:text-[#c9a961] font-semibold transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gradient-to-r from-[#fff9f0] to-[#fef5e7] border-l-4 border-[#d4af37] rounded-lg p-4 shadow-md">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-[#2c3e50] mb-2">Important</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4af37] mt-1">•</span>
                      <span>Early registrations secure preferred seating closer to Gurudev.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#d4af37] mt-1">•</span>
                      <span>Bring valid ID proof for entry.</span>
                    </li>
                  </ul>
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
              {sortedTicketTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-3 shadow-md transition-all duration-300 ${
                    tier.soldOut ? 'opacity-60' : 'hover:shadow-lg hover:scale-105'
                  } relative flex flex-col items-center text-center`}
                >
                  {tier.soldOut && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold z-10">
                      Sold Out
                    </div>
                  )}
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
                      className="w-full bg-gray-400 text-white py-1.5 rounded-full text-sm font-semibold cursor-not-allowed mt-auto"
                    >
                      Sold Out
                    </button>
                  ) : isRegistrationOpen ? (
                    <a
                      href={tier.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white py-1.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 mt-auto"
                    >
                      Secure Your Spot
                    </a>
                  ) : (
                    <div className="w-full py-1.5"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Countdown Overlay */}
            {!isRegistrationOpen && timeRemaining && (
              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-[#2c3e50]/80 via-[#34495e]/75 to-[#2c3e50]/80 rounded-2xl flex items-center justify-center z-20 p-4">
                <div className="text-center w-full max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-bold mb-4 md:mb-6 drop-shadow-lg px-2">
                    Registrations Opening Soon!
                  </h3>
                  <div className="grid grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 shadow-xl">
                      <div className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-0.5 md:mb-1">{timeRemaining.days}</div>
                      <div className="text-[0.6rem] md:text-xs text-[#2c3e50] font-semibold tracking-tight md:tracking-wider">DAYS</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 shadow-xl">
                      <div className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-0.5 md:mb-1">{timeRemaining.hours}</div>
                      <div className="text-[0.6rem] md:text-xs text-[#2c3e50] font-semibold tracking-tight md:tracking-wider">HOURS</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 shadow-xl">
                      <div className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-0.5 md:mb-1">{timeRemaining.minutes}</div>
                      <div className="text-[0.6rem] md:text-xs text-[#2c3e50] font-semibold tracking-tight md:tracking-wider">MINUTES</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 shadow-xl">
                      <div className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-0.5 md:mb-1">{timeRemaining.seconds}</div>
                      <div className="text-[0.6rem] md:text-xs text-[#2c3e50] font-semibold tracking-tight md:tracking-wider">SECONDS</div>
                    </div>
                  </div>
                  <p className="text-sm md:text-lg text-white font-semibold drop-shadow-md px-2">
                    {MAIN_REGISTRATION_OPENING_TEXT}
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
                <p className="text-base font-semibold">+91-90410 98963</p>
                <p className="text-base font-semibold">+91 90411 26458</p>
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
