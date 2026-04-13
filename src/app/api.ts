const API_BASE = 'http://localhost:5000/api';

export const api = {
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
  // Add more as needed
};