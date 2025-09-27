const API_BASE_URL = "http://localhost:5000/api";

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Create headers with optional auth
const createHeaders = (includeAuth = true) => {
  const headers = { "Content-Type": "application/json" };
  if (includeAuth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const { method = "GET", body, auth = true } = options;

  const config = {
    method,
    headers: createHeaders(auth),
  };

  if (body && method !== "GET") {
    config.body = body;
  }

  try {
    const response = await fetch(url, config);

    // Check for network errors
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ---------------- Auth API ----------------
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials), auth: false }),

  register: (userData) =>
    apiRequest("/auth/register", { method: "POST", body: JSON.stringify(userData), auth: false }),

  verifyOTP: (otpData) =>
    apiRequest("/auth/verify-otp", { method: "POST", body: JSON.stringify(otpData), auth: false }),
};

// ---------------- Pandals API ----------------
export const pandalsAPI = {
  getAll: (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/pandals${queryParams ? `?${queryParams}` : ""}`, { method: "GET" });
  },

  getById: (id) => apiRequest(`/pandals/${id}`, { method: "GET" }),

  create: (pandalData) => apiRequest("/pandals", { method: "POST", body: JSON.stringify(pandalData) }),

  update: (id, pandalData) => apiRequest(`/pandals/${id}`, { method: "PUT", body: JSON.stringify(pandalData) }),

  delete: (id) => apiRequest(`/pandals/${id}`, { method: "DELETE" }),
};

// ---------------- Users API ----------------
export const usersAPI = {
  getProfile: (userId) => apiRequest(`/users/${userId}`, { method: "GET" }),

  updateProfile: (userId, profileData) =>
    apiRequest(`/users/${userId}`, { method: "PUT", body: JSON.stringify(profileData) }),

  getServiceProviders: (type, filters = {}) => {
    const queryParams = new URLSearchParams({ type, ...filters }).toString();
    return apiRequest(`/users/service-providers?${queryParams}`, { method: "GET", auth: false });
  },
};

// ---------------- Ratings API ----------------
export const ratingsAPI = {
  create: (ratingData) => apiRequest("/ratings", { method: "POST", body: JSON.stringify(ratingData) }),

  getByTarget: (targetId, targetType) =>
    apiRequest(`/ratings/${targetType}/${targetId}`, { method: "GET", auth: false }),
};

// ---------------- Bookings API ----------------
export const bookingsAPI = {
  create: (bookingData) => apiRequest("/bookings", { method: "POST", body: JSON.stringify(bookingData) }),

  getMyBookings: () => apiRequest("/bookings/my-bookings", { method: "GET" }),

  updateStatus: (bookingId, status) =>
    apiRequest(`/bookings/${bookingId}/status`, { method: "PUT", body: JSON.stringify({ status }) }),

  addMessage: (bookingId, message) =>
    apiRequest(`/bookings/${bookingId}/messages`, { method: "POST", body: JSON.stringify({ message }) }),
};

// ---------------- Default export ----------------
export default {
  authAPI,
  pandalsAPI,
  usersAPI,
  ratingsAPI,
  bookingsAPI,
};
