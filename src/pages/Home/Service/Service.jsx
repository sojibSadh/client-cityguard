import React, { use, useContext } from "react";
// import services from "../../../assets/services.json"

// console.log(services);
const Service = ({ servicePromise }) => {
    const services = use(servicePromise);

    return (
        <div className="w-full bg-secondary py-20 rounded-3xl mt-10">
            <div className="text-center mb-12 text-white">
                <h2 className="text-4xl font-bold">Our Services</h2>
                <p className="max-w-2xl mx-auto text-gray-200 mt-3">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
                {
                    services.map((item) => <div
                        key={item.id}
                        className={`card shadow-xl p-6 rounded-3xl ${item.bg}`}
                    >
                        <figure>
                            <img src={item.icon} alt="" className="w-20 h-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-xl font-semibold">{item.title}</h2>
                            <p className="text-gray-600 mt-2">{item.desc}</p>
                        </div>
                    </div>)

                }
            </div>
        </div>
    );
};

export default Service;
