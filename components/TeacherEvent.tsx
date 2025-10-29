"use client";

import { MapPin, Phone, Mail, Clock, Info, Gem, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ⚙️ TEACHER REGISTRATION LAUNCH CONFIGURATION
// Opens 2 hours before main registration (Nov 2, 10:00 AM IST)
const TEACHER_REGISTRATION_OPEN_DATE = new Date('2024-11-02T10:00:00+05:30');

const teacherTier = {
  name: "Teacher Family Special",
  price: "₹7,000",
  bookingLink: "https://www.artofliving.online/donate.php?nca_id=922887",
  icon: Gem,
  soldOut: false,
  capacity: 4
};

export default function TeacherEvent() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const targetTime = TEACHER_REGISTRATION_OPEN_DATE.getTime();
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

  const IconComponent = teacherTier.icon;

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

      <div className="max-w-4xl w-full bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          {/* Art of Living Logo */}
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/aol_.webp" 
              alt="The Art of Living" 
              className="h-16 w-auto object-contain"
            />
          </div>
          
          {/* Event Title */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl py-6 px-4 mb-6">
            <h1 className="text-4xl font-serif text-[#2c3e50] mb-1 tracking-wide drop-shadow-md">SOAKING</h1>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl font-serif text-[#2c3e50] drop-shadow-md">IN</span>
              <span className="text-4xl font-script text-[#d4a5a5] italic drop-shadow-md">Bliss</span>
            </div>
            <h2 className="text-2xl font-serif text-[#2c3e50] tracking-wide drop-shadow-md">WITH</h2>
            <h2 className="text-3xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Gurudev</h2>
            <h2 className="text-2xl font-serif text-[#2c3e50] tracking-wider font-bold drop-shadow-md">Sri Sri Ravi Shankar Ji</h2>
          </div>

          {/* Teacher Special Badge */}
          <div className="inline-block bg-gradient-to-r from-[#d4af37] to-[#c9a961] text-white px-6 py-2 rounded-full mb-6">
            <p className="text-lg font-bold">🎓 Teacher Family Special Registration</p>
          </div>

          {/* Date & Venue */}
          <div className="bg-[#2c3e50] text-white rounded-2xl px-6 py-3 text-center mb-6">
            <p className="text-2xl font-bold">22<sup className="text-sm">th</sup> NOV <span className="text-[#d4af37]">2025</span></p>
            <p className="text-sm tracking-widest mt-1">CHANDIGARH</p>
          </div>
        </div>

        {/* Teacher Pass Card */}
        <div className="relative">
          <div className="max-w-md mx-auto">
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-xl border-2 border-[#d4af37]/50 relative">
              {teacherTier.soldOut && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                  Sold Out
                </div>
              )}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#d4af37] to-[#c9a961] rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-[#2c3e50] font-bold text-xl mb-3">{teacherTier.name}</h4>
                {isRegistrationOpen && <p className="text-[#d4af37] font-bold text-2xl mb-2">{teacherTier.price}</p>}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#2c3e50]" />
                  <p className="text-[#2c3e50] text-sm">
                    {teacherTier.capacity} People
                  </p>
                </div>
                {teacherTier.soldOut ? (
                  <button
                    disabled
                    className="block w-full px-4 py-3 bg-gray-400 text-white rounded-lg text-sm font-semibold cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                ) : (
                  <a
                    href={teacherTier.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white rounded-lg text-sm font-semibold hover:from-[#34495e] hover:to-[#2c3e50] transition-all duration-300 shadow-lg"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Countdown Overlay for Teachers */}
          {!isRegistrationOpen && timeRemaining && (
            <div className="absolute inset-0 backdrop-blur-md bg-white/40 rounded-xl flex items-center justify-center z-20">
              <div className="text-center p-6">
                <h3 className="text-2xl font-serif text-[#2c3e50] font-bold mb-4">
                  Teacher Registration Opening Soon!
                </h3>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold text-[#d4af37]">{timeRemaining.days}</div>
                    <div className="text-xs text-[#2c3e50] font-semibold">DAYS</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold text-[#d4af37]">{timeRemaining.hours}</div>
                    <div className="text-xs text-[#2c3e50] font-semibold">HOURS</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold text-[#d4af37]">{timeRemaining.minutes}</div>
                    <div className="text-xs text-[#2c3e50] font-semibold">MINUTES</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold text-[#d4af37]">{timeRemaining.seconds}</div>
                    <div className="text-xs text-[#2c3e50] font-semibold">SECONDS</div>
                  </div>
                </div>
                <p className="text-sm text-[#2c3e50] italic">
                  November 2, 2024 at 10:00 AM IST
                </p>
                <p className="text-xs text-[#2c3e50] mt-2">
                  (2 hours before general registration)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Phone className="w-5 h-5 text-[#d4af37]" />
            <p className="text-[#2c3e50] font-semibold">Contact Us</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-[#2c3e50]">
            <span>📱 981-5540-544</span>
            <span>✉️ help@artoflivingchd.com</span>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-6 text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <p className="text-[#2c3e50] text-sm italic leading-relaxed mb-2">
            "When you are grateful, fear disappears and abundance appears"
          </p>
          <p className="text-[#d4af37] text-xs font-semibold">— Sri Sri Ravi Shankar</p>
        </div>
      </div>
    </div>
  );
}
