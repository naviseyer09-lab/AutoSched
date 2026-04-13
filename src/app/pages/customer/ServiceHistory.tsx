import { DashboardLayout } from "../../components/DashboardLayout";
import { Download } from "lucide-react";

export default function ServiceHistory() {
  const serviceHistory = [
    {
      id: 1,
      service: "Oil Change",
      technician: "John Smith",
      date: "February 15, 2026",
      notes: "Replaced oil filter. Used synthetic 5W-30 oil.",
      cost: "$45.00",
    },
    {
      id: 2,
      service: "Brake Inspection",
      technician: "Mike Johnson",
      date: "January 28, 2026",
      notes: "All brake pads in good condition. No issues found.",
      cost: "$30.00",
    },
    {
      id: 3,
      service: "Tire Rotation",
      technician: "Sarah Williams",
      date: "January 10, 2026",
      notes: "Rotated all four tires. Checked tire pressure.",
      cost: "$35.00",
    },
    {
      id: 4,
      service: "Engine Diagnostic",
      technician: "David Brown",
      date: "December 20, 2025",
      notes: "Ran full diagnostic. All systems functioning normally.",
      cost: "$85.00",
    },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Service History</h1>
          <p className="text-gray-600">View your completed service records</p>
        </div>

        <div className="space-y-6">
          {serviceHistory.map((record) => (
            <div key={record.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl text-primary mb-1">{record.service}</h3>
                  <p className="text-gray-600">{record.date}</p>
                </div>
                <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                  <Download size={18} />
                  Receipt
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Technician</p>
                    <p className="text-gray-900">{record.technician}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cost</p>
                    <p className="text-xl text-primary">{record.cost}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Service Notes</p>
                  <p className="text-gray-900">{record.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {serviceHistory.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No service history available</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
