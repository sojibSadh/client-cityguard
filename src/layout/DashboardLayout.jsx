import React from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import useRole from '../hooks/useRole'
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


function DashboardLayout() {
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
            <div className="drawer lg:drawer-open max-w-7xl mx-auto">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-100 shadow-md sticky top-0 z-10">
                        <div className="flex-none lg">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost text-xl">
                                <FaChartBar className="w-5 h-5" />
                            </label>
                        </div>
                        <div className="flex-1 px-2 text-2xl font-bold text-primary">
                            Dashboard
                        </div>
                        <div className="flex-none">
                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                                        <FaUser className="w-5 h-5" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-42">
                                    <li><Link to="/dashboard/profile">Profile</Link></li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>



                    {/* Page content here */}
                    <Outlet> </Outlet>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <Link to='/' className="pt-5 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <FaHome className="w-5 h-5" />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </Link>
                            </li>
                            <div className="divider my-0"></div>
                            {/* ===================== ADMIN ROUTES ===================== */}
                            {role?.role === "admin" && (
                                <>
                                    <li>
                                        <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Admin Dashboard">
                                            {/* Settings icon */}
                                            <FaTachometerAlt />
                                            <span className="is-drawer-close:hidden">Admin Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/all-issue" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Issues">
                                            {/* Settings icon */}
                                            <FaClipboardList />
                                            <span className="is-drawer-close:hidden">All Issues</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/user-management" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users ">
                                            {/* Settings icon */}
                                            <FaUsers />
                                            <span className="is-drawer-close:hidden">Manage Users  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-assign" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Staff ">
                                            {/* Settings icon */}
                                            <FaUserTie />
                                            <span className="is-drawer-close:hidden"> Assign Staff  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-assign2" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Staff ">
                                            {/* Settings icon */}
                                            <FaUser />
                                            <span className="is-drawer-close:hidden"> Manage Staff  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/admin-payment-history" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payments Page ">
                                            {/* Settings icon */}
                                            <FaMoneyBillAlt />
                                            <span className="is-drawer-close:hidden">Payments History  </span>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* ===================== STAFF ROUTES ===================== */}
                            {role?.role === "staff" && (
                                <>
                                    <li>
                                        <Link to="/dashboard/staff-dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Staff Dashboard">
                                            {/* Settings icon */}
                                            <FaTachometerAlt />
                                            <span className="is-drawer-close:hidden">Staff Dashboard </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/staff-all-issue" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assigned Issues">
                                            {/* Settings icon */}
                                            <FaClipboardList />
                                            <span className="is-drawer-close:hidden">Assigned Issues</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/staff-profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                                            {/* Settings icon */}
                                            <FaUser />
                                            <span className="is-drawer-close:hidden">Profile  </span>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* ===================== CITIZEN ROUTES ===================== */}
                            {role?.role === "citizen" && (
                                <>

                                    <li>
                                        <Link to="/dashboard" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Citizen Dashboard">
                                            {/* Settings icon */}
                                            <FaTachometerAlt />
                                            <span className="is-drawer-close:hidden">Citizen Dashboard </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                                            {/* Settings icon */}
                                            <FaUser />
                                            <span className="is-drawer-close:hidden">Profile  </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/my-issue" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Issues">
                                            {/* Settings icon */}
                                            <FaClipboardList />
                                            <span className="is-drawer-close:hidden">My Issues</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/post-issue" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report Issue">
                                            {/* Settings icon */}
                                            <FaRegEdit />
                                            <span className="is-drawer-close:hidden">Post Issue</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/paymentHistoryCitizen" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="User Limit">
                                            {/* Settings icon */}
                                            <FaChartBar />
                                            <span className="is-drawer-close:hidden">Payment History</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
