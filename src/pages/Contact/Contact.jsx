import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="bg-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FF7A00] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Have questions, feedback, or need support?
            We’re here to help you connect and get answers quickly.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Contact Form */}
          <div className="card border border-orange-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Send Us a Message
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn w-full bg-[#FF7A00] text-white hover:bg-orange-600"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card border border-orange-100 shadow-lg">
              <div className="card-body flex gap-4 items-center">
                <div className="text-3xl text-[#FF7A00]">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@cityissues.com</p>
                </div>
              </div>
            </div>

            <div className="card border border-orange-100 shadow-lg">
              <div className="card-body flex gap-4 items-center">
                <div className="text-3xl text-[#FF7A00]">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+880 1234 567 890</p>
                </div>
              </div>
            </div>

            <div className="card border border-orange-100 shadow-lg">
              <div className="card-body flex gap-4 items-center">
                <div className="text-3xl text-[#FF7A00]">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Office Address</h3>
                  <p className="text-gray-600">
                    Banani, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
