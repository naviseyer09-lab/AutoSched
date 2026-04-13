import { DashboardLayout } from "../../components/DashboardLayout";
import { Check, X, Eye } from "lucide-react";

export default function AdminAppointments() {
  const appointments = [
    {
      id: "APT001",
      customer: "John Doe",
      vehicle: "Toyota Camry - ABC-1234",
      service: "Oil Change",
      date: "March 5, 2026",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: "APT002",
      customer: "Jane Smith",
      vehicle: "Honda Civic - XYZ-5678",
      service: "Brake Service",
      date: "March 6, 2026",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: "APT003",
      customer: "Mike Johnson",
      vehicle: "Ford F-150 - DEF-9012",
      service: "Tire Rotation",
      date: "March 7, 2026",
      time: "11:00 AM",
      status: "Approved",
    },
    {
      id: "APT004",
      customer: "Sarah Williams",
      vehicle: "Chevrolet Malibu - GHI-3456",
      service: "Engine Diagnostic",
      date: "March 8, 2026",
      time: "3:00 PM",
      status: "Approved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Appointment Management</h1>
          <p className="text-gray-600">Review and approve customer appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Customer Name</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Service Requested</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.vehicle}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.service}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{appointment.date}</p>
                        <p className="text-gray-600">{appointment.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {appointment.status === "Pending" && (
                          <>
                            <button
                              className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition"
                              title="Reject"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
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
