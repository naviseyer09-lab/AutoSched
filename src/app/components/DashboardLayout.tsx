import { useNavigate } from "react-router";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  role: "customer" | "staff" | "admin";
  children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <Sidebar role={role} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto bg-secondary">
        {children}
      </main>
    </div>
  );
}
