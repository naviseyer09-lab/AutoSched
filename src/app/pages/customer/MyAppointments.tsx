import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Edit, Trash2, Eye } from "lucide-react";

export default function MyAppointments() {
  const [appointments] = useState([
    {
      id: "APT001",
      service: "Oil Change",
      date: "March 5, 2026",
      time: "10:00 AM",
      status: "Approved",
    },
    {
      id: "APT002",
      service: "Brake Inspection",
      date: "March 12, 2026",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: "APT003",
      service: "Tire Rotation",
      date: "February 15, 2026",
      time: "11:00 AM",
      status: "Completed",
    },
    {
      id: "APT004",
      service: "Engine Diagnostic",
      date: "February 28, 2026",
      time: "3:00 PM",
      status: "Cancelled",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your service appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Appointment ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Service Type</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-primary hover:bg-primary hover:text-white rounded-lg transition"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        {appointment.status === "Pending" && (
                          <>
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition"
                              title="Cancel"
                            >
                              <Trash2 size={18} />
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
