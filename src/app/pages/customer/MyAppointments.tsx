import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Calendar, Clock, AlertCircle, Trash2 } from "lucide-react";
import { api } from "../../api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view appointments");
      setLoading(false);
      return;
    }
    try {
      const data = await api.getAppointments(token);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId: string) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      return;
    }

    setCancellingId(appointmentId);
    try {
      const res = await api.cancelAppointment(token, appointmentId);
      if (res.success) {
        setAppointments(appointments.filter(a => a.id !== appointmentId));
      } else {
        setError(res.error || "Failed to cancel appointment");
      }
    } catch (err) {
      setError("Error cancelling appointment");
    } finally {
      setCancellingId("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="customer">
        <div className="p-8">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your service appointments</p>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No appointments yet. Book your first appointment today!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Service</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Time</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{appointment.service_name || "Service"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{appointment.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{appointment.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {appointment.status === "pending" && (
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            disabled={cancellingId === appointment.id}
                            className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition disabled:opacity-50"
                            title="Cancel Appointment"
                          >
                            {cancellingId === appointment.id ? "Cancelling..." : <Trash2 size={18} />}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
