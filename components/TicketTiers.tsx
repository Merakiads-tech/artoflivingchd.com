"use client";

interface TicketTier {
  name: string;
  price: string;
  features: string[];
  bookingLink: string;
  popular?: boolean;
  color: string;
}

const ticketTiers: TicketTier[] = [
  {
    name: "Early Bird",
    price: "₹499",
    features: [
      "General Seating",
      "Access to Main Event",
      "Meditation Session",
      "Event Kit"
    ],
    bookingLink: "#",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Standard",
    price: "₹799",
    features: [
      "Reserved Seating",
      "Access to Main Event",
      "Meditation & Music Session",
      "Premium Event Kit",
      "Refreshments"
    ],
    bookingLink: "#",
    popular: true,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Premium",
    price: "₹1,299",
    features: [
      "Front Row Seating",
      "VIP Access",
      "All Sessions Included",
      "Exclusive Event Kit",
      "Refreshments & Snacks",
      "Meet & Greet"
    ],
    bookingLink: "#",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "VIP Experience",
    price: "₹2,499",
    features: [
      "Premium Front Seating",
      "Exclusive VIP Lounge",
      "All Sessions + Workshop",
      "Luxury Event Kit",
      "Full Catering",
      "Private Meet & Greet",
      "Commemorative Gift"
    ],
    bookingLink: "#",
    color: "from-yellow-500 to-orange-500"
  },
  {
    name: "Group Package",
    price: "₹3,999",
    features: [
      "5 Premium Tickets",
      "Group Seating Together",
      "All Premium Benefits",
      "Dedicated Coordinator",
      "Group Photo Session"
    ],
    bookingLink: "#",
    color: "from-green-500 to-teal-500"
  }
];

export default function TicketTiers() {
  return (
    <section id="tickets" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the ticket tier that resonates with your journey
          </p>
        </div>

        {/* Ticket cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ticketTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                tier.popular ? 'ring-4 ring-purple-500 lg:scale-105' : ''
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${tier.color}`}></div>

              <div className="p-8">
                {/* Tier name */}
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{tier.name}</h3>
                
                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500 ml-2">per person</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <a
                  href={tier.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-6 py-3 bg-gradient-to-r ${tier.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All prices are inclusive of taxes. Limited seats available.
          </p>
        </div>
      </div>
    </section>
  );
}
