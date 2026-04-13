import { Link } from "react-router";
import { Calendar, Clock, CheckCircle, Users, ImageWithFallback } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={24} />
              </div>
              <span className="text-2xl text-primary">AutoSched</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-primary transition">Home</a>
              <a href="#services" className="text-gray-700 hover:text-primary transition">Services</a>
              <a href="#about" className="text-gray-700 hover:text-primary transition">About</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition">Contact</a>
              <Link to="/portal-selection" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-primary to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">Schedule Your Vehicle Service with Ease</h1>
              <p className="text-xl mb-8 text-blue-100">
                AutoSched makes booking vehicle maintenance and repairs simple, fast, and convenient. 
                Say goodbye to phone calls and waiting times.
              </p>
              <div className="flex gap-4">
                <Link to="/register" className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition">
                  Book Appointment
                </Link>
                <a href="#about" className="bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition">
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1613214150333-53afb7561e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMHNlcnZpY2UlMjBnYXJhZ2V8ZW58MXx8fHwxNzcyMjExNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Vehicle Service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-4 text-primary">Why Choose AutoSched?</h2>
          <p className="text-center text-gray-600 mb-12">Experience the future of vehicle service scheduling</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl mb-3 text-primary">Easy Booking</h3>
              <p className="text-gray-600">
                Schedule your appointments online in minutes. Choose your preferred date and time slot.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl mb-3 text-primary">Real-Time Updates</h3>
              <p className="text-gray-600">
                Track your appointment status and receive instant notifications about your service.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl mb-3 text-primary">Service History</h3>
              <p className="text-gray-600">
                Access your complete service history and download receipts anytime you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-4 text-primary">How AutoSched Works</h2>
          <p className="text-center text-gray-600 mb-12">Get started in three simple steps</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                1
              </div>
              <h3 className="text-2xl mb-3 text-primary">Create Account</h3>
              <p className="text-gray-600">
                Sign up with your details and add your vehicle information to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                2
              </div>
              <h3 className="text-2xl mb-3 text-primary">Choose Service</h3>
              <p className="text-gray-600">
                Select the service you need and pick your preferred date and time slot.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                3
              </div>
              <h3 className="text-2xl mb-3 text-primary">Get Serviced</h3>
              <p className="text-gray-600">
                Bring your vehicle at the scheduled time and enjoy professional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1770656506122-99bc73ac9d66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwcmVwYWlyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjE2MTE4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional Service"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl mb-6 text-primary">About AutoSched</h2>
              <p className="text-gray-700 mb-4">
                AutoSched revolutionizes the way vehicle service centers manage appointments and customer relationships. 
                Our platform eliminates the hassle of manual booking systems, reducing delays and conflicts.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're a customer looking for convenient service booking or a service center aiming to 
                streamline operations, AutoSched provides the tools you need for success.
              </p>
              <div className="flex items-center gap-4">
                <Users className="text-accent" size={40} />
                <div>
                  <p className="text-2xl text-primary">1000+</p>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center mb-4 text-primary">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-12">Have questions? We're here to help!</p>

          <div className="max-w-2xl mx-auto bg-secondary p-8 rounded-xl shadow-lg">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none bg-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none bg-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none bg-white"
                  placeholder="How can we help you?"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-accent text-white py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl mb-4">AutoSched</h3>
              <p className="text-blue-100">
                Professional vehicle service appointment system for modern service centers.
              </p>
            </div>
            <div>
              <h4 className="text-xl mb-4">Quick Links</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl mb-4">Contact Info</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Email: info@autosched.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Service St, City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-100">
            <p>© 2026 AutoSched. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}