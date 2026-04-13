import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { api } from "../../api";

type Service = {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
};

const categories = ["Maintenance", "Repair", "Diagnostic", "Inspection"];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Maintenance":
      return "bg-blue-100 text-blue-700";
    case "Repair":
      return "bg-orange-100 text-orange-700";
    case "Diagnostic":
      return "bg-purple-100 text-purple-700";
    case "Inspection":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 30,
    price: 0,
    category: "Maintenance",
  });
  const [loading, setLoading] = useState(false);

  const loadServices = async () => {
    const data = await api.getServices();
    setServices(
      Array.isArray(data)
        ? data.map((service: any) => ({
            id: service.id,
            name: service.name,
            description: service.description,
            duration: service.duration,
            price: service.price,
            category: service.category || "Maintenance",
          }))
        : [],
    );
  };

  useEffect(() => {
    loadServices();
  }, []);

  const resetForm = () => {
    setEditService(null);
    setFormData({
      name: "",
      description: "",
      duration: 30,
      price: 0,
      category: "Maintenance",
    });
  };

  const openNewService = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEditService = (service: Service) => {
    setEditService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category,
    });
    setFormOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in as admin to manage services.");
      return;
    }

    setLoading(true);
    try {
      if (editService) {
        await api.updateService(token, editService.id, formData);
        setServices((current) =>
          current.map((service) =>
            service.id === editService.id ? { ...service, ...formData } : service,
          ),
        );
      } else {
        const response = await api.createService(token, formData);
        if (response.id) {
          setServices((current) => [...current, { id: response.id, ...formData }]);
        }
      }
      setFormOpen(false);
      resetForm();
    } catch (error) {
      alert("Unable to save service. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in as admin to delete services.");
      return;
    }

    if (!confirm("Delete this service?")) return;
    setLoading(true);
    try {
      await api.deleteService(token, id);
      setServices((current) => current.filter((service) => service.id !== id));
    } catch (error) {
      alert("Unable to delete the service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl text-primary mb-2">Service Management</h1>
            <p className="text-gray-600">Manage available services and pricing</p>
          </div>
          <button
            onClick={openNewService}
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            <Plus size={20} />
            Add New Service
          </button>
        </div>

        {formOpen && (
          <div className="mb-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <h2 className="text-2xl text-primary mb-1">
                  {editService ? "Edit Service" : "Add New Service"}
                </h2>
                <p className="text-gray-600">Fill out the service details to save.</p>
              </div>
              <button
                onClick={() => {
                  setFormOpen(false);
                  resetForm();
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <X size={16} /> Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="service-name" className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                <input
                  id="service-name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="service-category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  id="service-category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="service-duration" className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  id="service-duration"
                  name="duration"
                  type="number"
                  min={10}
                  value={formData.duration}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="service-price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  id="service-price"
                  name="price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="service-description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  id="service-description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => {
                  setFormOpen(false);
                  resetForm();
                }}
                type="button"
                className="w-full sm:w-auto rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-white hover:bg-blue-900 disabled:opacity-50"
              >
                <Check size={18} />
                {editService ? "Update Service" : "Save Service"}
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4 gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
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
                  <p className="text-gray-900">{service.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-xl text-primary">${service.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditService(service)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
                >
                  <Edit size={18} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
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
