import { Link } from "react-router";
import { Calendar, Users, Wrench, Shield } from "lucide-react";

export default function PortalSelection() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="text-white" size={36} />
            </div>
            <span className="text-4xl text-primary">AutoSched</span>
          </div>
          <h1 className="text-4xl text-primary mb-2">Select Portal</h1>
          <p className="text-gray-600">Choose your portal to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Customer Portal */}
          <Link
            to="/login/customer"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition">
              <Users className="text-accent" size={40} />
            </div>
            <h2 className="text-2xl text-center mb-3 text-primary">Customer Portal</h2>
            <p className="text-center text-gray-600 mb-4">
              Book appointments, view service history, and manage your profile
            </p>
            <div className="text-center">
              <span className="text-primary group-hover:text-accent transition">
                Access Portal →
              </span>
            </div>
          </Link>

          {/* Staff Portal */}
          <Link
            to="/login/staff"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition">
              <Wrench className="text-accent" size={40} />
            </div>
            <h2 className="text-2xl text-center mb-3 text-primary">Staff Portal</h2>
            <p className="text-center text-gray-600 mb-4">
              Manage appointments, customer records, and service operations
            </p>
            <div className="text-center text-sm text-gray-500 mb-2">
              For authorized personnel only
            </div>
            <div className="text-center">
              <span className="text-primary group-hover:text-accent transition">
                Access Portal →
              </span>
            </div>
          </Link>

          {/* Admin Portal */}
          <Link
            to="/login/admin"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition">
              <Shield className="text-accent" size={40} />
            </div>
            <h2 className="text-2xl text-center mb-3 text-primary">Admin Portal</h2>
            <p className="text-center text-gray-600 mb-4">
              Full system control, analytics, and user management
            </p>
            <div className="text-center text-sm text-gray-500 mb-2">
              For administrators only
            </div>
            <div className="text-center">
              <span className="text-primary group-hover:text-accent transition">
                Access Portal →
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center">
          <Link to="/" className="text-gray-600 hover:text-primary transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
