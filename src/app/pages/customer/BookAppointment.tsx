import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { api } from "../../api";

export default function BookAppointment() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: "",
    date: "",
    timeSlot: "",
    description: "",
  });

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }
    try {
      const res = await api.bookAppointment(token, parseInt(formData.serviceId), 2, formData.date, formData.timeSlot); // staff_id hardcoded
      if (res.id) {
        setShowConfirmation(true);
      } else {
        alert(res.error || 'Booking failed');
      }
    } catch (err) {
      alert('Booking failed');
    }
  };

  const closeModal = () => {
    setShowConfirmation(false);
    setFormData({ serviceType: "", date: "", timeSlot: "", description: "" });
  };

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your vehicle service</p>
        </div>

        <div className="max-w-3xl bg-white rounded-xl shadow-md p-8">
          {/* Vehicle Info */}
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <h3 className="text-lg text-primary mb-2">Vehicle Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="text-gray-600">Type:</span> Sedan
              </div>
              <div>
                <span className="text-gray-600">Plate:</span> ABC-1234
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="serviceId" className="block mb-2 text-gray-700">
                Service Type
              </label>
              <select
                id="serviceId"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none bg-white"
                required
              >
                <option value="">Select service type</option>
                {services.map((service: any) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block mb-2 text-gray-700">
                  <Calendar className="inline mr-2" size={16} />
                  Preferred Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="timeSlot" className="block mb-2 text-gray-700">
                  <Clock className="inline mr-2" size={16} />
                  Available Time Slot
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none bg-white"
                  required
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-gray-700">
                Service Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                placeholder="Any specific issues or requests..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Submit Appointment
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl text-primary mb-2">Appointment Booked!</h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully submitted and is pending approval.
              </p>
              <div className="bg-secondary rounded-lg p-4 mb-6 text-left">
                <h3 className="text-primary mb-2">Appointment Details:</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Service:</strong> {formData.serviceType}</p>
                  <p><strong>Date:</strong> {formData.date}</p>
                  <p><strong>Time:</strong> {formData.timeSlot}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-900 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
