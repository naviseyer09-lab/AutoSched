import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  History, 
  User, 
  LogOut,
  Users,
  FileText,
  Settings
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  role: "customer" | "staff" | "admin";
  onLogout: () => void;
}

export function Sidebar({ role, onLogout }: SidebarProps) {
  const location = useLocation();

  const customerNav: NavItem[] = [
    { label: "Dashboard", path: "/customer", icon: <LayoutDashboard size={20} /> },
    { label: "Book Appointment", path: "/customer/book", icon: <Calendar size={20} /> },
    { label: "My Appointments", path: "/customer/appointments", icon: <ClipboardList size={20} /> },
    { label: "Service History", path: "/customer/history", icon: <History size={20} /> },
    { label: "Profile", path: "/customer/profile", icon: <User size={20} /> },
  ];

  const staffNav: NavItem[] = [
    { label: "Dashboard", path: "/staff", icon: <LayoutDashboard size={20} /> },
    { label: "Appointments", path: "/staff/appointments", icon: <Calendar size={20} /> },
    { label: "Customers", path: "/staff/customers", icon: <Users size={20} /> },
    { label: "Service Records", path: "/staff/records", icon: <FileText size={20} /> },
  ];

  const adminNav: NavItem[] = [
    { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { label: "Appointments", path: "/admin/appointments", icon: <Calendar size={20} /> },
    { label: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { label: "Services", path: "/admin/services", icon: <Settings size={20} /> },
  ];

  const navItems = role === "customer" ? customerNav : role === "staff" ? staffNav : adminNav;

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-2xl">AutoSched</h2>
        <p className="text-sm opacity-80 mt-1">
          {role === "customer" ? "Customer Portal" : role === "staff" ? "Staff Portal" : "Admin Portal"}
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
