import { DashboardLayout } from "../../components/DashboardLayout";
import { Users, Calendar, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const monthlyData = [
    { month: "Jan", appointments: 45 },
    { month: "Feb", appointments: 52 },
    { month: "Mar", appointments: 38 },
    { month: "Apr", appointments: 65 },
    { month: "May", appointments: 58 },
    { month: "Jun", appointments: 72 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4500 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6500 },
    { month: "May", revenue: 5800 },
    { month: "Jun", revenue: 7200 },
  ];

  const recentAppointments = [
    { id: 1, customer: "John Doe", service: "Oil Change", status: "Pending" },
    { id: 2, customer: "Jane Smith", service: "Brake Service", status: "Pending" },
    { id: 3, customer: "Mike Johnson", service: "Tire Rotation", status: "Approved" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and analytics</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Customers</span>
              <Users className="text-primary" size={24} />
            </div>
            <p className="text-3xl text-primary mb-1">156</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +12% this month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Appointments</span>
              <Calendar className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl text-blue-600 mb-1">248</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +8% this month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Pending Requests</span>
              <Clock className="text-accent" size={24} />
            </div>
            <p className="text-3xl text-accent mb-1">12</p>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Completed Services</span>
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <p className="text-3xl text-green-600 mb-1">198</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp size={14} />
              +15% this month
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-primary mb-4">Appointments Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#1E3A8A" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl text-primary mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl text-primary mb-4">Recent Appointment Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Service</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{appointment.service}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {appointment.status === "Pending" && (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
