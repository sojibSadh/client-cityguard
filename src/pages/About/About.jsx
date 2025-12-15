import React from "react";

export default function About() {
  return (
    <section className="bg-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FF7A00] mb-4">
            About Our Platform
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            A smart, transparent, and citizen-driven solution to report,
            manage, and resolve city issues efficiently.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Text */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Why We Built This Platform
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cities face countless daily issues such as damaged roads,
              garbage overflow, drainage problems, and electricity failures.
              Unfortunately, many of these problems go unnoticed or take too
              long to resolve due to lack of proper communication.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our platform bridges the gap between citizens, administrators,
              and staff by providing a single, transparent system where
              issues can be reported, tracked, prioritized, and resolved
              efficiently.
            </p>
          </div>

          {/* Right Card */}
          <div className="card border border-orange-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold text-[#FF7A00] mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-4">
                To empower citizens and authorities with a modern digital
                platform that ensures faster issue resolution and a better
                urban living experience.
              </p>

              <h3 className="text-xl font-semibold text-[#FF7A00] mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                Building smarter cities through transparency, accountability,
                and technology-driven governance.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="stats shadow border border-orange-100">
            <div className="stat">
              <div className="stat-title">Reported Issues</div>
              <div className="stat-value text-[#FF7A00]">5K+</div>
            </div>

            <div className="stat">
              <div className="stat-title">Resolved Issues</div>
              <div className="stat-value text-[#FF7A00]">4.5K+</div>
            </div>

            <div className="stat">
              <div className="stat-title">Active Staff</div>
              <div className="stat-value text-[#FF7A00]">300+</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
