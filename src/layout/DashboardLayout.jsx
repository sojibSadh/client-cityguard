import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import useRole from '../hooks/useRole'
import { FaBarsStaggered } from "react-icons/fa6";
import {
    FaHome,
    FaChartBar,
    FaUsers,
    FaUserTie,
    FaMoneyBillAlt,
    FaClipboardList,
    FaUser,
    FaRegEdit,
    FaTachometerAlt
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { CgProfile } from 'react-icons/cg';


function DashboardLayout() {
    const { user, logOut } = useAuth();
    console.log(user.photoURL);
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 p-3 text-base font-medium transition duration-300 ease-in-out ${isActive
            ? 'bg-primary text-white hover:bg-primary-focus'
            : 'text-base-content hover:bg-base-300'
        }`;

    const staticLinkClasses = "flex items-center gap-3 p-3 text-base font-medium transition duration-300 ease-in-out text-base-content hover:bg-base-300";
    const { role } = useRole();
    console.log(role);
    return (
        <div>
            <div className="drawer lg:drawer-open max-w-[1400px] mx-auto">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-[#192125] shadow-md sticky top-0 z-10">
                        <div className="flex-none lg">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost hover:bg-primary border-0 text-xl">
                                <FaBarsStaggered className="w-5 h-5" />
                            </label>
                        </div>
                        <div className="flex-1 px-2 text-2xl font-bold text-gray-300">
                            Dashboard
                        </div>
                        <div className="flex-none">
                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                                        <img src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="profile" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu bg-gray-700 primary  menu-sm dropdown-content  rounded-box z-50 mt-3 w-52 p-2 shadow"
                                >
                                    <div className=" pb-3 border-b border-b-gray-200">
                                        <li className="text-sm font-bold text-[#fe8830]">{user.displayName}</li>
                                        <li className="text-xs text-info">{user.email}</li>
                                    </div>
                                    <li className="mt-3">
                                        <NavLink >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li >
                                        <NavLink >
                                           All Issues
                                        </NavLink>
                                    </li>

                                    <li>
                                        <a>
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logOut}
                                            className="btn btn-xs text-left btn-primary text-white"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>



                    {/* Page content here */}
                    <Outlet> </Outlet>
                </div>

                <div className="drawer-side  is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full bg-[#192125] flex-col items-start  is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <Link to='/' className="pt-5 is-drawer-close:tooltip is-drawer-close:tooltip-right  text-2xl font-extrabold text-orange-600" data-tip="Homepage">
                                    {/* Home icon */}
                                    <FaHome className="w-6 h-6" />
                                    <span className="is-drawer-close:hidden">Homepage</span>

                                </Link>
                            </li>
                            <div className="divider my-0"></div>
                            {/* ===================== ADMIN ROUTES ===================== */}
                            {role?.role === "admin" && (
                                <>
                                    <li>
                                        <Link to="/dashboard" className="dashboard-li" data-tip="Admin Dashboard ">
                                            {/* Settings icon */}
                                            <FaTachometerAlt className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Admin</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/adminprofile" className="dashboard-li" data-tip="Admin Dashboard ">
                                            {/* Settings icon */}
                                            <CgProfile className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden"> Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/all-issue" className="dashboard-li" data-tip="All Issues">
                                            {/* Settings icon */}
                                            <FaClipboardList className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">All Issues</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/user-management" className="dashboard-li" data-tip="Manage Users ">
                                            {/* Settings icon */}
                                            <FaUsers className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Manage Users  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-assign" className="dashboard-li" data-tip="Manage Staff ">
                                            {/* Settings icon */}
                                            <FaUserTie className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden"> Assign Staff  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-assign2" className="dashboard-li" data-tip="Manage Staff ">
                                            {/* Settings icon */}
                                            <FaUser className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden"> Manage Staff  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/admin-payment-history" className="dashboard-li" data-tip="Payments Page ">
                                            {/* Settings icon */}
                                            <FaMoneyBillAlt className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Payments History  </span>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* ===================== STAFF ROUTES ===================== */}
                            {role?.role === "staff" && (
                                <>
                                    <li>
                                        <Link to="/dashboard/staff-profile" className="dashboard-li" data-tip="Profile">
                                            {/* Settings icon */}
                                            <FaUser className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Profile  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/staff-dashboard" className="dashboard-li" data-tip="Staff Dashboard">
                                            {/* Settings icon */}
                                            <FaTachometerAlt className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Staff Dashboard </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/staff-all-issue" className="dashboard-li" data-tip="Assigned Issues">
                                            {/* Settings icon */}
                                            <FaClipboardList className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Assigned Issues</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* ===================== CITIZEN ROUTES ===================== */}
                            {role?.role === "citizen" && (
                                <>
                                    <li>
                                        <Link to="/dashboard" className="dashboard-li" data-tip="Citizen Dashboard">
                                            {/* Settings icon */}
                                            <FaTachometerAlt className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Citizen Dashboard </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/citizenprofile" className="dashboard-li" data-tip="Profile">
                                            {/* Settings icon */}
                                            <FaUser className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Profile  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/my-issue" className="dashboard-li" data-tip="My Issues">
                                            {/* Settings icon */}
                                            <FaClipboardList className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">My Issues</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/post-issue" className="dashboard-li" data-tip="Report Issue">
                                            {/* Settings icon */}
                                            <FaRegEdit className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Post Issue</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/paymentHistoryCitizen" className="dashboard-li" data-tip="User Limit">
                                            {/* Settings icon */}
                                            <FaChartBar className="w-5 h-5" />
                                            <span className="is-drawer-close:hidden">Payment History</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        {/* 2nd  */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
