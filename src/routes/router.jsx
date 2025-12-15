import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import PaymentSuccess from "../pages/DashBoard/Payment/paymentSuccess";
import PaymentCancell from "../pages/DashBoard/Payment/PaymentCancell";
import PaymentHistory from "../pages/DashBoard/Payment/PaymentHistory";
import UserManegement from "../pages/DashBoard/User/UserManegement";
import AdminRoute from "./AdminRoute";
import DashBoardHome from "../pages/DashBoard/DashBoardHome";
import Issues from "../pages/Issues/Issues";
import IssuesDetails from "../pages/Issues/IssuesDetails";
import CitizenRoute from "./citizenRoute";
import PostIssue from "../pages/DashBoard/Citizen/PostIssue";
import Profile from "../pages/DashBoard/Citizen/CitizenProfile";
import PaymentSuccessSub from "../pages/DashBoard/Payment/PaymentSuccessSub";
import MyIssue from "../pages/DashBoard/Citizen/MyIssue";
import IssuesDetailsDashboard from "../pages/Issues/IssuesDetailsDashboard";
import AdminAllIssues from "../pages/DashBoard/Admin/AdminAllIssues ";
import Manageassign from "../pages/DashBoard/User/Manageassign";
import ManageStaff from "../pages/DashBoard/User/ManageStaff";
import PaymentHistoryCitizen from "../pages/DashBoard/Payment/PaymentHistoryCitizen";
import StaffAllIssues from "../pages/DashBoard/Staff/StaffAllIssues";
import StaffRoute from "./StaffRoute";
import StaffProfile from "../pages/DashBoard/Staff/StaffProfile";
import StaffDashboardHome from "../pages/DashBoard/StaffDashboardHome ";
import AdminProfile from "../pages/DashBoard/Admin/AdminProfile";
import CitizenProfile from "../pages/DashBoard/Citizen/CitizenProfile";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/all-issues',
        Component: Issues,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/contact',
        Component: Contact,
      },
      {
        path: '/issues/:id',
        element: <PrivateRoute> <IssuesDetails /> </PrivateRoute>,
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashBoardHome
      },
      {
        path: 'post-issue',
        element: <CitizenRoute> <PostIssue /> </CitizenRoute>,
        loader: () => fetch('/map.json').then(res => res.json())
      },

      {
        path: 'citizenprofile',
        element: <CitizenRoute> <CitizenProfile/> </CitizenRoute>,
      },
      {
        path: 'my-issue',
        element: <CitizenRoute> <MyIssue /> </CitizenRoute>,
      },
      {
        path: 'my-issue/:id',
        element: <CitizenRoute> <IssuesDetailsDashboard /> </CitizenRoute>,
      },
      {
        path: 'paymentHistoryCitizen',
        element: <CitizenRoute> <PaymentHistoryCitizen /> </CitizenRoute>,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-success-sub',
        Component: PaymentSuccessSub
      },
      {
        path: 'payment-cencelled',
        Component: PaymentCancell
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'staff-dashboard',
        element: <StaffRoute>  <StaffDashboardHome/> </StaffRoute>
      },
      {
        path: 'staff-all-issue',
        element: <StaffRoute> <StaffAllIssues/> </StaffRoute>
      },
      {
        path: 'staff-profile',
        element: <StaffRoute> <StaffProfile/> </StaffRoute>
      },
      // admin api
      {
        path: 'all-issue',
        element: <AdminRoute>  <AdminAllIssues /> </AdminRoute>
      },
      {
        path: 'adminprofile',
        element: <AdminRoute>  <AdminProfile/> </AdminRoute>
      },
      {
        path: 'user-management',
        element: <AdminRoute>  <UserManegement /> </AdminRoute>
      },
      {
        path: 'manage-assign',
        element: <AdminRoute>  <Manageassign /> </AdminRoute>
      },
      {
        path: 'manage-assign2',
        element: <AdminRoute>  <ManageStaff /> </AdminRoute>
      },
      {
        path: 'admin-payment-history',
        element: <AdminRoute>  <PaymentHistory /> </AdminRoute>
      },
    ]
  }
]);