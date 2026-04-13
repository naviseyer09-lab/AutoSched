import { DashboardLayout } from "../../components/DashboardLayout";
import { Eye, FileText } from "lucide-react";

export default function StaffServiceRecords() {
  const serviceRecords = [
    {
      id: "SRV001",
      customer: "John Doe",
      vehicle: "Toyota Camry - ABC-1234",
      service: "Oil Change",
      date: "February 15, 2026",
      technician: "You",
      cost: "$45.00",
      status: "Completed",
    },
    {
      id: "SRV002",
      customer: "Jane Smith",
      vehicle: "Honda Civic - XYZ-5678",
      service: "Brake Service",
      date: "February 20, 2026",
      technician: "You",
      cost: "$120.00",
      status: "Completed",
    },
    {
      id: "SRV003",
      customer: "Mike Johnson",
      vehicle: "Ford F-150 - DEF-9012",
      service: "Tire Rotation",
      date: "February 25, 2026",
      technician: "You",
      cost: "$35.00",
      status: "Completed",
    },
  ];

  return (
    <DashboardLayout role="staff">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Service Records</h1>
          <p className="text-gray-600">View completed service records</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Record ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Service</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Cost</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {serviceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{record.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.vehicle}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-primary">{record.cost}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
                          title="View Report"
                        >
                          <FileText size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
