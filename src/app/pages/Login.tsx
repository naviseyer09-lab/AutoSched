import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Calendar } from "lucide-react";
import { api } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const { portal } = useParams<{ portal: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Get portal-specific info
  const getPortalInfo = () => {
    switch (portal) {
      case "customer":
        return {
          title: "Customer Portal",
          description: "Sign in to book appointments and view service history",
          demoEmail: "customer@demo.com",
          redirectPath: "/customer",
        };
      case "staff":
        return {
          title: "Staff Portal",
          description: "Sign in to manage appointments and customer records",
          demoEmail: "staff@demo.com",
          redirectPath: "/staff",
        };
      case "admin":
        return {
          title: "Admin Portal",
          description: "Sign in to access system administration",
          demoEmail: "admin@demo.com",
          redirectPath: "/admin",
        };
      default:
        return {
          title: "Customer Portal",
          description: "Sign in to book appointments and view service history",
          demoEmail: "customer@demo.com",
          redirectPath: "/customer",
        };
    }
  };

  const portalInfo = getPortalInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate(portalInfo.redirectPath);
      } else {
        alert(res.error || 'Login failed');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="text-white" size={28} />
            </div>
            <span className="text-3xl text-primary">AutoSched</span>
          </div>
          <h1 className="text-3xl text-primary mb-2">{portalInfo.title}</h1>
          <p className="text-gray-600">{portalInfo.description}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-blue-900">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-900 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:text-blue-900">
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <Link to="/portal-selection" className="block text-gray-600 hover:text-primary">
            ← Switch Portal
          </Link>
          <Link to="/" className="block text-gray-600 hover:text-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}