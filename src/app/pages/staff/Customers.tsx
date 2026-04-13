import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Eye, AlertCircle } from "lucide-react";
import { api } from "../../api";

export default function StaffCustomers() {
  const [customers, setCustomers] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      setLoading(false);
      return;
    }
    try {
      const users = await api.getUsers(token);
      const customersOnly = Array.isArray(users) ? users.filter(u => (u.role || "").toLowerCase() === "customer") : [];
      setCustomers(customersOnly);
    } catch (err) {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="staff">
        <div className="p-8">
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="staff">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Customers</h1>
          <p className="text-gray-600">View customer information and service history</p>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {customers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600">No customers found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {customers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl text-primary mb-1">{customer.name}</h3>
                    <p className="text-gray-600">Customer ID: {customer.id}</p>
                  </div>
                  <button className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition" title="View Customer Details">
                    <Eye size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-gray-900">{customer.email}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg text-green-600 font-medium">Active</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
