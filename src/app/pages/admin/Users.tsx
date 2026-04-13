import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Edit, Trash2, UserPlus } from "lucide-react";

export default function AdminUsers() {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Customer",
      status: "Active",
      joinDate: "January 15, 2026",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Customer",
      status: "Active",
      joinDate: "January 20, 2026",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      role: "Staff",
      status: "Active",
      joinDate: "December 10, 2025",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      role: "Staff",
      status: "Active",
      joinDate: "November 5, 2025",
    },
    {
      id: 5,
      name: "Admin User",
      email: "admin@autosched.com",
      role: "Admin",
      status: "Active",
      joinDate: "October 1, 2025",
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700";
      case "Staff":
        return "bg-blue-100 text-blue-700";
      case "Customer":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-primary mb-2">User Management</h1>
            <p className="text-gray-600">Manage system users and roles</p>
          </div>
          <button className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            <UserPlus size={20} />
            Add New User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
