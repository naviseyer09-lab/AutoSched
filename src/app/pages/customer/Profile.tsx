import { useState } from "react";
import { DashboardLayout } from "../../components/DashboardLayout";
import { User, Car, Lock } from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"personal" | "vehicle" | "password">("personal");

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    contactNumber: "(555) 123-4567",
  });

  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleType: "Sedan",
    plateNumber: "ABC-1234",
    model: "Toyota Camry",
    year: "2020",
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVehicleInfo({ ...vehicleInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({ ...passwordInfo, [e.target.name]: e.target.value });
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Personal information updated!");
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Vehicle information updated!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordInfo({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <DashboardLayout role="customer">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl text-primary mb-2">Profile Management</h1>
          <p className="text-gray-600">Update your personal information and settings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
              activeTab === "personal"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User size={20} />
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("vehicle")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
              activeTab === "vehicle"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Car size={20} />
            Vehicle Details
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
              activeTab === "password"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Lock size={20} />
            Change Password
          </button>
        </div>

        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl text-primary mb-6">Personal Information</h2>
            <form onSubmit={handlePersonalSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-gray-700">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={personalInfo.fullName}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block mb-2 text-gray-700">Contact Number</label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={personalInfo.contactNumber}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Update Information
              </button>
            </form>
          </div>
        )}

        {/* Vehicle Info Tab */}
        {activeTab === "vehicle" && (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl text-primary mb-6">Vehicle Details</h2>
            <form onSubmit={handleVehicleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vehicleType" className="block mb-2 text-gray-700">Vehicle Type</label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={vehicleInfo.vehicleType}
                    onChange={handleVehicleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none bg-white"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Motorcycle">Motorcycle</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="plateNumber" className="block mb-2 text-gray-700">Plate Number</label>
                  <input
                    id="plateNumber"
                    name="plateNumber"
                    type="text"
                    value={vehicleInfo.plateNumber}
                    onChange={handleVehicleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="model" className="block mb-2 text-gray-700">Model</label>
                  <input
                    id="model"
                    name="model"
                    type="text"
                    value={vehicleInfo.model}
                    onChange={handleVehicleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block mb-2 text-gray-700">Year</label>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    value={vehicleInfo.year}
                    onChange={handleVehicleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Update Vehicle Details
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
            <h2 className="text-2xl text-primary mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block mb-2 text-gray-700">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordInfo.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-gray-700">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordInfo.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordInfo.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
