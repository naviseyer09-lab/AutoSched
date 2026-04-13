import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Download, AlertCircle } from "lucide-react";
import { api } from "../../api";

export default function ServiceHistory() {
  const [history, setHistory] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadServiceHistory();
  }, []);

  const loadServiceHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view service history");
      setLoading(false);
      return;
    }
    try {
      const data = await api.getAppointments(token);
      const completed = Array.isArray(data) ? data.filter(a => a.status === "completed") : [];
      setHistory(completed);
    } catch (err) {
      setError("Failed to load service history");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = (appointmentId: string) => {
    // For now, just show a placeholder - backend can generate PDF later
    alert(`Receipt for appointment ${appointmentId} would be downloaded here`);
  };

  if (loading) {
    return (
      <DashboardLayout role="customer">
        <div className="p-8">
          <p className="text-gray-600">Loading service history...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Service History</h1>
          <p className="text-gray-600">View your completed service records</p>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No service history available yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((record) => (
              <div key={record.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl text-primary mb-1">{record.service_name || "Service"}</h3>
                    <p className="text-gray-600">{record.date} at {record.time}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadReceipt(record.id)}
                    className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    <Download size={18} />
                    Receipt
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <p className="text-gray-900 font-medium">Completed</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Appointment Details</p>
                    <p className="text-gray-900">ID: {record.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
