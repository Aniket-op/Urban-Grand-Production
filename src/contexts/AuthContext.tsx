import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type ApiUser,
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────

interface AuthContextType {
  /** Current authenticated user, or null */
  user: ApiUser | null;
  /** JWT token string, or null */
  token: string | null;
  /** Whether a user is currently logged in */
  isAuthenticated: boolean;
  /** True while checking stored token on initial load */
  isLoading: boolean;
  /** Register a new account (auto-login on success) */
  register: (data: {
    fullName: string;
    companyName?: string;
    emailAddress: string;
    contactNumber: string;
    password: string;
  }) => Promise<void>;
  /** Login with email and password */
  login: (emailAddress: string, password: string) => Promise<void>;
  /** Clear session and remove stored token */
  logout: () => void;
  /** Update profile fields and refresh local user state */
  updateUser: (data: {
    fullName?: string;
    companyName?: string;
    contactNumber?: string;
  }) => Promise<void>;
  /** Refresh user data from server */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Storage keys ──────────────────────────────────────────────────────
const TOKEN_KEY = "ug_token";
const USER_KEY = "ug_user";

// ── Provider ──────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY) || null
  );

  const [isLoading, setIsLoading] = useState(true);

  /** Persist token + user to localStorage */
  const persistSession = useCallback((newToken: string, newUser: ApiUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  /** Clear everything */
  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  /**
   * On mount: if we have a stored token, verify it by hitting
   * the /auth/profile endpoint. If it fails, the token is expired.
   */
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await getProfile();
        if (res.success && res.user) {
          setUser(res.user as ApiUser);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        } else {
          clearSession();
        }
      } catch {
        // Token is invalid or expired
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auth actions ───────────────────────────────────────────────────

  const register = async (data: {
    fullName: string;
    companyName?: string;
    emailAddress: string;
    contactNumber: string;
    password: string;
  }) => {
    const res = await registerUser(data);
    if (res.success && res.token && res.user) {
      persistSession(res.token, res.user as ApiUser);
    }
  };

  const login = async (emailAddress: string, password: string) => {
    const res = await loginUser({ emailAddress, password });
    if (res.success && res.token && res.user) {
      persistSession(res.token, res.user as ApiUser);
    }
  };

  const logout = () => {
    clearSession();
  };

  const updateUser = async (data: {
    fullName?: string;
    companyName?: string;
    contactNumber?: string;
  }) => {
    const res = await updateProfile(data);
    if (res.success && res.user) {
      const updatedUser = res.user as ApiUser;
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }
  };

  const refreshUser = async () => {
    try {
      const res = await getProfile();
      if (res.success && res.user) {
        const freshUser = res.user as ApiUser;
        setUser(freshUser);
        localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
      }
    } catch {
      // Silently fail — user data just won't update
    }
  };

  // ── Context value ──────────────────────────────────────────────────

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    register,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────

/**
 * Access the auth context. Must be used inside <AuthProvider>.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
}
