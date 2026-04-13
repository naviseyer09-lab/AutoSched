import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { Save, AlertCircle, Check } from "lucide-react";
import { api } from "../../api";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your profile");
      setLoading(false);
      return;
    }
    try {
      const data = await api.getProfile(token);
      if (data.id) {
        setProfile({ name: data.name || "", email: data.email || "" });
      } else {
        setError("Unable to load profile");
      }
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.email.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to update your profile");
      setSaving(false);
      return;
    }

    try {
      const res = await api.updateProfile(token, profile.name, profile.email);
      if (res.success) {
        setSuccess("Profile updated successfully!");
      } else {
        setError(res.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="customer">
        <div className="p-8">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Profile Management</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>

        <div className="max-w-2xl bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <AlertCircle size={20} className="flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="flex gap-3 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                <Check size={20} className="flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="profile-email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-900 disabled:opacity-50 transition"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={loadProfile}
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

