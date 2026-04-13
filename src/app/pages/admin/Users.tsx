import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Edit, Trash2, UserPlus, AlertCircle } from "lucide-react";
import { api } from "../../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteingId, setDeletingId] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      setLoading(false);
      return;
    }
    try {
      const data = await api.getUsers(token);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      return;
    }

    setDeletingId(userId);
    try {
      const res = await api.deleteUser(token, userId);
      if (res.success) {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        setError(res.error || "Failed to delete user");
      }
    } catch (err) {
      setError("Error deleting user");
    } finally {
      setDeletingId("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in");
      setSubmitting(false);
      return;
    }

    try {
      const res = await api.createUser(token, formData.name, formData.email, formData.password, formData.role);
      if (res.success) {
        setUsers([...users, res.user]);
        setFormData({ name: "", email: "", password: "", role: "customer" });
        setShowModal(false);
      } else {
        setError(res.error || "Failed to create user");
      }
    } catch (err) {
      setError("Error creating user");
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch ((role || "").toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "staff":
        return "bg-blue-100 text-blue-700";
      case "customer":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="p-8">
          <p className="text-gray-600">Loading users...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-primary mb-2">User Management</h1>
            <p className="text-gray-600">Manage system users and roles</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            <UserPlus size={20} />
            Add New User
          </button>
        </div>

        {error && (
          <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600">No users found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                          {(user.role || "").charAt(0).toUpperCase() + (user.role || "").slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={deleteingId === user.id}
                            className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition disabled:opacity-50"
                            title="Delete"
                          >
                            {deleteingId === user.id ? "..." : <Trash2 size={18} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h2 className="text-2xl text-primary mb-6">Add New User</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="add-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="add-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="add-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="add-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="add-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="add-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="add-role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    id="add-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-900 disabled:opacity-50 transition"
                  >
                    {submitting ? "Adding..." : "Add User"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
