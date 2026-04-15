/**
 * API Helper — Centralized HTTP client for the Urban Grand backend.
 * ═══════════════════════════════════════════════════════════════════
 * Automatically attaches JWT Authorization header when a token exists.
 */

// Base URL — reads from Vite env, falls back to localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/** Shape of every API response */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
  token?: string;
  user?: T;
}

/** User object returned from the backend */
export interface ApiUser {
  _id: string;
  fullName: string;
  companyName: string;
  emailAddress: string;
  contactNumber: string;
  enquiry: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Make an authenticated API request.
 * Automatically injects the stored JWT token into the Authorization header.
 *
 * @param endpoint - API path (e.g., "/auth/login")
 * @param options  - Standard fetch options (method, body, etc.)
 * @returns Parsed JSON response
 */
export async function apiRequest<T = ApiUser>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem("ug_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Attach JWT if available
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json();

    // If the server returned a non-OK status, throw so callers can catch
    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    // If it's already our shaped error, re-throw
    if (error && typeof error === "object" && "success" in error) {
      throw error;
    }
    // Network or unexpected error
    throw {
      success: false,
      message: "Network error — please check your connection and try again",
    } as ApiResponse<T>;
  }
}

// ── Convenience wrappers ──────────────────────────────────────────────

/** Register a new user */
export const registerUser = (data: {
  fullName: string;
  companyName?: string;
  emailAddress: string;
  contactNumber: string;
  password: string;
}) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

/** Login an existing user */
export const loginUser = (data: { emailAddress: string; password: string }) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

/** Fetch the current user's profile (requires JWT) */
export const getProfile = () => apiRequest("/auth/profile");

/** Update the current user's profile */
export const updateProfile = (data: {
  fullName?: string;
  companyName?: string;
  contactNumber?: string;
}) =>
  apiRequest("/user/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

/** Submit or update an enquiry (requires JWT) */
export const submitEnquiry = (enquiry: string) =>
  apiRequest("/enquiry", {
    method: "POST",
    body: JSON.stringify({ enquiry }),
  });
