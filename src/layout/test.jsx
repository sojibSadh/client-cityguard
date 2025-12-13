
// import React from 'react';
// import { Link, NavLink, Outlet } from 'react-router'; // Changed to react-router-dom for standard usage
// import useRole from '../hooks/useRole'; // Assuming this hook works
// import {
//     FaHome,
//     FaChartBar,
//     FaUsers,
//     FaUserTie,
//     FaMoneyBillAlt,
//     FaClipboardList,
//     FaUser,
//     FaRegEdit,
//     FaTachometerAlt
// } from 'react-icons/fa';


// function DashboardLayout() {
//     // DaisyUI/Tailwind class for NavLink active state
//     const linkClasses = ({ isActive }) =>
//         `flex items-center gap-3 p-3 rounded-lg text-base font-medium transition duration-300 ${isActive
//             ? 'bg-primary text-primary-content shadow-lg' // Primary color for active link
//             : 'text-base-content hover:bg-base-300' // Default text and hover background
//         }`;

//     const { role } = useRole(); // Assuming this hook works
//     console.log(role);

//     return (
//         <div>
//             {/* Using daisyui drawer for responsive sidebar. max-w-7xl mx-auto for content centering */}
//             <div className="drawer lg:drawer-open max-w-7xl mx-auto">
//                 <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

//                 {/* ----------------- DRAWER CONTENT (MAIN AREA) ----------------- */}
//                 <div className="drawer-content flex flex-col">
//                     {/* Navbar */}
//                     <nav className="navbar w-full bg-base-100 shadow-md sticky top-0 z-20 px-4">
//                         <div className="flex-none lg:hidden">
//                             <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost text-xl">
//                                 <FaChartBar className="w-5 h-5" />
//                             </label>
//                         </div>
//                         <div className="flex-1 px-2 text-2xl font-bold text-primary">
//                             Dashboard
//                         </div>
//                         <div className="flex-none">
//                             {/* Profile Dropdown */}
//                             <div className="dropdown dropdown-end">
//                                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                                     <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
//                                         <FaUser className="w-5 h-5 text-base-content" />
//                                     </div>
//                                 </div>
//                                 <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow-xl bg-base-100 rounded-box w-42">
//                                     <li><Link to="/dashboard/profile">Profile</Link></li>
//                                     <li><a>Settings</a></li>
//                                     <li><a>Logout</a></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </nav>

//                     {/* Page content here */}
//                     <main className="p-4 flex-grow bg-base-100">
//                         <Outlet />
//                     </main>
//                 </div>

//                 {/* -------------------- DRAWER SIDE (SIDEBAR) ------------------- */}
//                 <div className="drawer-side z-10">
//                     <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//                     {/* Sidebar container with a fixed DaisyUI width class */}
//                     <aside className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">

//                         {/* Application/Site Logo/Title Link */}
//                         <div className="flex justify-center items-center py-4 px-2 mb-4">
//                             <Link to='/' className="text-2xl font-extrabold text-primary">
//                                 App Name
//                             </Link>
//                         </div>

//                         {/* Home Link (Non-Dashboard) */}
//                         <ul className="menu w-full mb-4">
//                             <li>
//                                 <Link to='/' className="flex items-center gap-3 p-3 rounded-lg text-base-content hover:bg-base-300">
//                                     <FaHome className="w-5 h-5" />
//                                     <span>Homepage</span>
//                                 </Link>
//                             </li>
//                         </ul>

//                         <div className="divider my-0"></div>
//                         <h2 className="menu-title mt-4">Dashboard Navigation</h2>

//                         <ul className="menu w-full grow">

//                             {/* ===================== ADMIN ROUTES ===================== */}
//                             {role?.role === "admin" && (
//                                 <>
//                                     <li><NavLink to="/dashboard" className={linkClasses}><FaTachometerAlt /><span>Admin Dashboard</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/all-issue" className={linkClasses}><FaClipboardList /><span>All Issues</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/user-management" className={linkClasses}><FaUsers /><span>Manage Users</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/manage-assign" className={linkClasses}><FaUserTie /><span>Assign Staff</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/manage-assign2" className={linkClasses}><FaUser /><span>Manage Staff</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/admin-payment-history" className={linkClasses}><FaMoneyBillAlt /><span>Payments History</span></NavLink></li>
//                                 </>
//                             )}

//                             {/* ===================== STAFF ROUTES ===================== */}
//                             {role?.role === "staff" && (
//                                 <>
//                                     <li><NavLink to="/dashboard/staff-dashboard" className={linkClasses}><FaTachometerAlt /><span>Staff Dashboard</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/staff-all-issue" className={linkClasses}><FaClipboardList /><span>Assigned Issues</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/staff-profile" className={linkClasses}><FaUser /><span>Profile</span></NavLink></li>
//                                 </>
//                             )}

//                             {/* ===================== CITIZEN ROUTES ===================== */}
//                             {role?.role === "citizen" && (
//                                 <>
//                                     <li><NavLink to="/dashboard" className={linkClasses}><FaTachometerAlt /><span>Citizen Dashboard</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/profile" className={linkClasses}><FaUser /><span>Profile</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/my-issue" className={linkClasses}><FaClipboardList /><span>My Issues</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/post-issue" className={linkClasses}><FaRegEdit /><span>Post Issue</span></NavLink></li>
//                                     <li><NavLink to="/dashboard/paymentHistoryCitizen" className={linkClasses}><FaChartBar /><span>Payment History</span></NavLink></li>
//                                 </>
//                             )}
//                         </ul>
//                     </aside>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DashboardLayout;