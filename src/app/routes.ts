import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import PortalSelection from "./pages/PortalSelection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerBooking from "./pages/customer/BookAppointment";
import CustomerAppointments from "./pages/customer/MyAppointments";
import CustomerHistory from "./pages/customer/ServiceHistory";
import CustomerProfile from "./pages/customer/Profile";
import StaffDashboard from "./pages/staff/Dashboard";
import StaffAppointments from "./pages/staff/Appointments";
import StaffCustomers from "./pages/staff/Customers";
import StaffRecords from "./pages/staff/ServiceRecords";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAppointments from "./pages/admin/Appointments";
import AdminUsers from "./pages/admin/Users";
import AdminServices from "./pages/admin/Services";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/portal-selection",
    Component: PortalSelection,
  },
  {
    path: "/login/:portal",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/customer",
    children: [
      { index: true, Component: CustomerDashboard },
      { path: "book", Component: CustomerBooking },
      { path: "appointments", Component: CustomerAppointments },
      { path: "history", Component: CustomerHistory },
      { path: "profile", Component: CustomerProfile },
    ],
  },
  {
    path: "/staff",
    children: [
      { index: true, Component: StaffDashboard },
      { path: "appointments", Component: StaffAppointments },
      { path: "customers", Component: StaffCustomers },
      { path: "records", Component: StaffRecords },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, Component: AdminDashboard },
      { path: "appointments", Component: AdminAppointments },
      { path: "users", Component: AdminUsers },
      { path: "services", Component: AdminServices },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);