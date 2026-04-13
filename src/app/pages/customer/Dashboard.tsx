import { DashboardLayout } from "../../components/DashboardLayout";
import { Link } from "react-router";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function CustomerDashboard() {
  const upcomingAppointments = [
    {
      id: 1,
      service: "Oil Change",
      date: "March 5, 2026",
      time: "10:00 AM",
      status: "Approved",
    },
    {
      id: 2,
      service: "Brake Inspection",
      date: "March 12, 2026",
      time: "2:00 PM",
      status: "Pending",
    },
  ];

  const recentHistory = [
    {
      id: 1,
      service: "Tire Rotation",
      date: "February 15, 2026",
      technician: "John Smith",
    },
    {
      id: 2,
      service: "Engine Diagnostic",
      date: "January 28, 2026",
      technician: "Mike Johnson",
    },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Welcome back, Customer!</h1>
          <p className="text-gray-600">Here's an overview of your appointments and services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Appointments</span>
              <Calendar className="text-primary" size={24} />
            </div>
            <p className="text-3xl text-primary">12</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Upcoming</span>
              <Clock className="text-accent" size={24} />
            </div>
            <p className="text-3xl text-accent">2</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Completed</span>
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <p className="text-3xl text-green-600">10</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pending</span>
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
            <p className="text-3xl text-yellow-600">1</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl text-primary mb-4">Quick Actions</h2>
          <Link
            to="/customer/book"
            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            <Calendar size={20} />
            Book New Appointment
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-primary mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg text-primary">{appointment.service}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        appointment.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {appointment.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/customer/appointments"
              className="block mt-4 text-center text-primary hover:text-blue-900"
            >
              View All Appointments →
            </Link>
          </div>

          {/* Service History Preview */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-primary mb-4">Recent Service History</h2>
            <div className="space-y-4">
              {recentHistory.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg text-primary mb-2">{service.service}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Date: {service.date}</p>
                    <p>Technician: {service.technician}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/customer/history"
              className="block mt-4 text-center text-primary hover:text-blue-900"
            >
              View Full History →
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
