const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  register: async (name: string, email: string, password: string, role: string) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });
    return res.json();
  },

  // Profile
  getProfile: async (token: string) => {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  updateProfile: async (token: string, name: string, email: string) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });
    return res.json();
  },

  // Services
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },
  createService: async (token: string, service: { name: string; description: string; duration: number; price: number; category: string }) => {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(service),
    });
    return res.json();
  },
  updateService: async (token: string, id: number, service: { name: string; description: string; duration: number; price: number; category: string }) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(service),
    });
    return res.json();
  },
  deleteService: async (token: string, id: number) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Appointments
  getAppointments: async (token: string) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  bookAppointment: async (token: string, service_id: number, staff_id: number, date: string, time: string) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ service_id, staff_id, date, time }),
    });
    return res.json();
  },
  updateAppointment: async (token: string, id: number, status: string) => {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
  cancelAppointment: async (token: string, id: number) => {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Users
  getUsers: async (token: string) => {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  createUser: async (token: string, user: { name: string; email: string; password: string; role: string }) => {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return res.json();
  },
  updateUser: async (token: string, id: number, user: { name: string; email: string; role: string }) => {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return res.json();
  },
  deleteUser: async (token: string, id: number) => {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  // Staff
  getStaff: async () => {
    const res = await fetch(`${API_BASE}/staff`);
    return res.json();
  },
};