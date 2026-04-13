import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Check, X, AlertCircle } from "lucide-react";
import { api } from "../../api";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
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

  const handleUpdateStatus = async (appointmentId: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      return;
    }

    setUpdatingId(appointmentId);
    try {
      const res = await api.updateAppointment(token, appointmentId, newStatus);
      if (res.success) {
        setAppointments(appointments.map(a =>
          a.id === appointmentId ? { ...a, status: newStatus } : a
        ));
      } else {
        setError(res.error || "Failed to update appointment");
      }
    } catch (err) {
      setError("Error updating appointment");
    } finally {
      setUpdatingId("");
    }
  };

  const getStatusColor = (status: string) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="p-8">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Appointment Management</h1>
          <p className="text-gray-600">Review and approve customer appointments</p>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600">No appointments found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Customer</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Service</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">ID: {appointment.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{appointment.service_name || "Service"}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{appointment.date}</p>
                          <p className="text-gray-600">{appointment.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                          {(appointment.status || "").charAt(0).toUpperCase() + (appointment.status || "").slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {appointment.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(appointment.id, "approved")}
                                disabled={updatingId === appointment.id}
                                className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition disabled:opacity-50"
                                title="Approve"
                              >
                                {updatingId === appointment.id ? "..." : <Check size={18} />}
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(appointment.id, "rejected")}
                                disabled={updatingId === appointment.id}
                                className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition disabled:opacity-50"
                                title="Reject"
                              >
                                {updatingId === appointment.id ? "..." : <X size={18} />}
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
        )}
      </div>
    </DashboardLayout>
  );
}
