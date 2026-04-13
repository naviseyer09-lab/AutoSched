import { DashboardLayout } from "../../components/DashboardLayout";
import { Eye, Edit } from "lucide-react";

export default function StaffAppointments() {
  const appointments = [
    {
      id: "APT001",
      customer: "John Doe",
      vehicle: "Toyota Camry",
      plate: "ABC-1234",
      service: "Oil Change",
      date: "March 5, 2026",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: "APT002",
      customer: "Jane Smith",
      vehicle: "Honda Civic",
      plate: "XYZ-5678",
      service: "Brake Service",
      date: "March 5, 2026",
      time: "2:00 PM",
      status: "In Progress",
    },
    {
      id: "APT003",
      customer: "Mike Johnson",
      vehicle: "Ford F-150",
      plate: "DEF-9012",
      service: "Tire Rotation",
      date: "March 6, 2026",
      time: "11:00 AM",
      status: "Scheduled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout role="staff">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Appointments</h1>
          <p className="text-gray-600">View and manage service appointments</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Service</th>
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
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900">{appointment.vehicle}</p>
                        <p className="text-gray-600">{appointment.plate}</p>
                      </div>
                    </td>
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
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
                          title="Update Status"
                        >
                          <Edit size={18} />
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
