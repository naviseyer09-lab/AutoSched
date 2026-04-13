import { DashboardLayout } from "../../components/DashboardLayout";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";

export default function StaffDashboard() {
  const todayAppointments = [
    {
      id: 1,
      customer: "John Doe",
      service: "Oil Change",
      time: "10:00 AM",
      vehicle: "Toyota Camry - ABC-1234",
      status: "In Progress",
    },
    {
      id: 2,
      customer: "Jane Smith",
      service: "Brake Service",
      time: "2:00 PM",
      vehicle: "Honda Civic - XYZ-5678",
      status: "Scheduled",
    },
  ];

  const assignedServices = [
    {
      id: 1,
      customer: "Mike Johnson",
      service: "Tire Rotation",
      date: "March 6, 2026",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sarah Williams",
      service: "Engine Diagnostic",
      date: "March 7, 2026",
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout role="staff">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Staff Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's today's schedule</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Today's Appointments</span>
              <Calendar className="text-primary" size={24} />
            </div>
            <p className="text-3xl text-primary">6</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">In Progress</span>
              <Clock className="text-accent" size={24} />
            </div>
            <p className="text-3xl text-accent">2</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Completed</span>
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <p className="text-3xl text-green-600">3</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Customers</span>
              <Users className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl text-blue-600">42</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-primary mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg text-primary">{appointment.customer}</h3>
                      <p className="text-sm text-gray-600">{appointment.vehicle}</p>
                    </div>
                    <span className="text-sm text-gray-600">{appointment.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm text-gray-900">{appointment.service}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        appointment.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition text-sm">
                      Update Status
                    </button>
                    <button className="flex-1 bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm">
                      Add Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Services */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-primary mb-4">Assigned Services</h2>
            <div className="space-y-4">
              {assignedServices.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg text-primary">{service.customer}</h3>
                      <p className="text-sm text-gray-600">{service.service}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700"
                    >
                      {service.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Scheduled: {service.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
