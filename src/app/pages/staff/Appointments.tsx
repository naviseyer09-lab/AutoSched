import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { api } from "../../api";

export default function StaffAppointments() {
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
      const approved = Array.isArray(data) ? data.filter(a => (a.status || "").toLowerCase() === "approved") : [];
      setAppointments(approved);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAppointment = async (appointmentId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      return;
    }

    setUpdatingId(appointmentId);
    try {
      const res = await api.updateAppointment(token, appointmentId, "completed");
      if (res.success) {
        setAppointments(appointments.filter(a => a.id !== appointmentId));
      } else {
        setError(res.error || "Failed to complete appointment");
      }
    } catch (err) {
      setError("Error completing appointment");
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="staff">
        <div className="p-8">
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="staff">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Appointments</h1>
          <p className="text-gray-600">View and manage service appointments</p>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600">No approved appointments to complete</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Service</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{appointment.service_name || "Service"}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{appointment.date}</p>
                          <p className="text-gray-600">{appointment.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleCompleteAppointment(appointment.id)}
                          disabled={updatingId === appointment.id}
                          className="p-2 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition disabled:opacity-50"
                          title="Mark as Completed"
                        >
                          {updatingId === appointment.id ? "..." : <CheckCircle2 size={18} />}
                        </button>
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
