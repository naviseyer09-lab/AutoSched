import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Edit, Trash2, Plus } from "lucide-react";

export default function AdminServices() {
  const [services] = useState([
    {
      id: 1,
      name: "Oil Change",
      description: "Complete oil and filter replacement",
      duration: "30 minutes",
      price: "$45.00",
      category: "Maintenance",
    },
    {
      id: 2,
      name: "Brake Service",
      description: "Brake inspection and pad replacement",
      duration: "60 minutes",
      price: "$120.00",
      category: "Repair",
    },
    {
      id: 3,
      name: "Tire Rotation",
      description: "Rotate all four tires and check pressure",
      duration: "30 minutes",
      price: "$35.00",
      category: "Maintenance",
    },
    {
      id: 4,
      name: "Engine Diagnostic",
      description: "Comprehensive engine system check",
      duration: "45 minutes",
      price: "$85.00",
      category: "Diagnostic",
    },
    {
      id: 5,
      name: "Transmission Service",
      description: "Transmission fluid and filter change",
      duration: "90 minutes",
      price: "$150.00",
      category: "Maintenance",
    },
    {
      id: 6,
      name: "Air Conditioning Service",
      description: "AC inspection and recharge",
      duration: "60 minutes",
      price: "$95.00",
      category: "Repair",
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Maintenance":
        return "bg-blue-100 text-blue-700";
      case "Repair":
        return "bg-orange-100 text-orange-700";
      case "Diagnostic":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-primary mb-2">Service Management</h1>
            <p className="text-gray-600">Manage available services and pricing</p>
          </div>
          <button className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            <Plus size={20} />
            Add New Service
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl text-primary">{service.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(service.category)}`}>
                      {service.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-gray-900">{service.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-xl text-primary">{service.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
                  <Edit size={18} />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
