import React from "react";
import {
  FaUserEdit,
  FaSearchLocation,
  FaUserTie,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    step: "Step 1",
    icon: <FaUserEdit />,
    title: "Report an Issue",
    desc: "Citizens submit issues with photos, location, and description.",
  },
  {
    step: "Step 2",
    icon: <FaSearchLocation />,
    title: "Issue Review",
    desc: "Admin reviews, verifies, and prioritizes reported issues.",
  },
  {
    step: "Step 3",
    icon: <FaUserTie />,
    title: "Assign Staff",
    desc: "Admin assigns the issue to the most suitable staff member.",
  },
  {
    step: "Step 4",
    icon: <FaTools />,
    title: "Work in Progress",
    desc: "Staff works on the issue and updates progress in real-time.",
  },
  {
    step: "Step 5",
    icon: <FaCheckCircle />,
    title: "Issue Resolved",
    desc: "Issue gets resolved and citizens receive final updates.",
  },
];

export default function How() {
  return (
    <section className="bg-[#D6D6D6]/10 dark:bg-[292D33] py-20 rounded-2xl md:my-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="md:text-4xl text-[22px] font-bold text-orange-600 mb-4">
            How It Works
          </h2>
          <p className="sub-title text-gray-300 max-w-2xl mx-auto">
            Our system follows a transparent and efficient workflow to ensure
            that every reported issue is handled quickly and professionally.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5  gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="card group bg-[#D6D6D6] dark:bg-[#BBD697] hover:bg-[#D6D6D6] shadow-xl hover:-translate-y-3  shadow-orange-500/30  hover:shadow-orange-800 transition duration-300 "
            >
              <div className="card-body items-center text-center">

                {/* Icon */}
                <div className="text-5xl text-[#FF7A00] group-hover:text-[#252525] mb-4 animate-pulse group-hover:scale-125 duration-700 ">
                  {item.icon}
                </div>
                {/* Title */}
                <h3 className="card-title text-[22px] font-bold text-orange-600">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
