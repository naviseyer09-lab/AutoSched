import { DashboardLayout } from "../../components/DashboardLayout";
import { Eye, Mail, Phone } from "lucide-react";

export default function StaffCustomers() {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      vehicle: "Toyota Camry",
      plate: "ABC-1234",
      totalServices: 5,
      lastService: "February 15, 2026",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "(555) 234-5678",
      vehicle: "Honda Civic",
      plate: "XYZ-5678",
      totalServices: 3,
      lastService: "February 20, 2026",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "(555) 345-6789",
      vehicle: "Ford F-150",
      plate: "DEF-9012",
      totalServices: 8,
      lastService: "February 25, 2026",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "(555) 456-7890",
      vehicle: "Chevrolet Malibu",
      plate: "GHI-3456",
      totalServices: 4,
      lastService: "February 28, 2026",
    },
  ];

  return (
    <DashboardLayout role="staff">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Customers</h1>
          <p className="text-gray-600">View customer information and service history</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {customers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl text-primary mb-1">{customer.name}</h3>
                  <p className="text-gray-600">
                    {customer.vehicle} - {customer.plate}
                  </p>
                </div>
                <button className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition">
                  <Eye size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={16} className="text-gray-600" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={16} className="text-gray-600" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Services</p>
                  <p className="text-xl text-primary">{customer.totalServices}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Service</p>
                  <p className="text-sm text-gray-900">{customer.lastService}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
