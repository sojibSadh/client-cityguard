import React from "react";
import Booster from '../../../assets/booster.gif';
import Dash from '../../../assets/dash.gif';
import Emergency from '../../../assets/emergency.gif';
import Online from '../../../assets/online.gif';
import Pin from '../../../assets/pin.gif';
import Time from '../../../assets/time3.gif';


const features = [
    {
        icon: <img src={Pin} alt="dash" />,
        title: "Secure Authentication",
        desc: "Firebase-based authentication ensures data safety and role control.",
    },
    {
        // Lottie animation data is used here
        icon: <img src={Time} alt="booster" />,
        title: "Real-time Issue Tracking",
        desc: "Track your reported issues with live updates and detailed timelines.",
    },
    {
        icon: <img src={Emergency} alt="emergency" />,
        title: "Fast Response Time",
        desc: "Authorities and staff get instant notifications for faster action.",
    },
    {
        icon: <img src={Booster} alt="Online" />,
        title: "Priority Boost System",
        desc: "Boost critical issues instantly to get faster resolution.",
    },
    {
        icon: <img src={Online} alt="pin" />,
        title: "Online Payment Support",
        desc: "Secure payment system for boosting priority using Stripe.",
    },
    {
        icon: <img src={Dash} alt="time" />,
        title: "Admin Analytics",
        desc: "Admins can monitor issue trends and staff performance easily.",
    },
];

export default function Feature() {
    return (
        <section className="bg-orange-600/10 rounded-2xl md:py-20 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="md:text-4xl text-[22px] font-bold text-orange-600 mb-4">
                        Powerful Platform Features
                    </h2>
                    <p className="sub-title text-gray-300 max-w-2xl mx-auto">
                        Our smart city issue management system is designed to ensure faster
                        response, transparency, and better communication between citizens,
                        staff, and administrators.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="card group bg-gray-800 hover:bg-[#D6D6D6]  shadow-xl shadow-gray-700  hover:shadow-black transition duration-300"
                        >
                            <div className="card-body items-center text-center">
                                {/* Icon (Now Lottie Animation) */}
                                {/* Removed animate-bounce as Lottie provides its own animation */}
                                <div className="w-30 h-30 flex justify-center items-center  mx-auto mb-4">
                                  <span className="rounded-full group-hover:scale-125 duration-700">  {item.icon} </span>
                                </div>

                                {/* Title */}
                                <h3 className="card-title text-[22px] font-bold text-orange-600">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-300 group-hover:text-black">
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


















// import React from "react";
// import {
//   FaMapMarkedAlt,
//   FaUserShield,
//   FaClock,
//   FaBolt,
//   FaMoneyBillWave,
//   FaChartLine,
// } from "react-icons/fa";

// const features = [
//   {
//     icon: <FaMapMarkedAlt />,
//     title: "Real-time Issue Tracking",
//     desc: "Track your reported issues with live updates and detailed timelines.",
//   },
//   {
//     icon: <FaUserShield />,
//     title: "Secure Authentication",
//     desc: "Firebase-based authentication ensures data safety and role control.",
//   },
//   {
//     icon: <FaClock />,
//     title: "Fast Response Time",
//     desc: "Authorities and staff get instant notifications for faster action.",
//   },
//   {
//     icon: <FaBolt />,
//     title: "Priority Boost System",
//     desc: "Boost critical issues instantly to get faster resolution.",
//   },
//   {
//     icon: <FaMoneyBillWave />,
//     title: "Online Payment Support",
//     desc: "Secure payment system for boosting priority using Stripe.",
//   },
//   {
//     icon: <FaChartLine />,
//     title: "Admin Analytics",
//     desc: "Admins can monitor issue trends and staff performance easily.",
//   },
// ];

// export default function Feature() {
//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-14">
//           <h2 className="text-4xl font-bold text-[#FF7A00] mb-4">
//             Powerful Platform Features
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Our smart city issue management system is designed to ensure faster
//             response, transparency, and better communication between citizens,
//             staff, and administrators.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((item, index) => (
//             <div
//               key={index}
//               className="card bg-white border border-orange-100 shadow-md hover:shadow-xl transition duration-300"
//             >
//               <div className="card-body items-center text-center">
//                 {/* Icon */}
//                 <div className="text-5xl text-[#FF7A00] mb-4 animate-bounce">
//                   {item.icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className="card-title text-xl font-semibold text-gray-800">
//                   {item.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-600">
//                   {item.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
