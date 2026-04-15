import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogIn, Eye, EyeOff, Loader2 } from "lucide-react";
import type { ApiResponse } from "@/lib/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.emailAddress) newErrors.emailAddress = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      newErrors.emailAddress = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.emailAddress, formData.password);
      toast.success("Welcome back! Login successful.");
      navigate("/");
    } catch (err) {
      const error = err as ApiResponse;
      toast.error(error.message || "Login failed. Please try again.");
      // Map server-side field errors
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((e) => {
          fieldErrors[e.field] = e.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border ${
      errors[field] ? "border-red-400" : "border-border"
    } px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(38,60%,50%)]/50 focus:border-[hsl(38,60%,50%)] hover:border-foreground/30 transition-all duration-300 rounded-md placeholder:text-muted-foreground/50`;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(38,60%,50%,0.03)] pointer-events-none" />

        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-background border border-border/60 rounded-xl p-8 sm:p-10 shadow-lg shadow-black/[0.03]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(38,60%,50%,0.1)] mb-5">
                <LogIn size={22} className="text-[hsl(38,60%,50%)]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[hsl(38,60%,50%)] font-bold mb-2">
                Welcome Back
              </p>
              <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
                Sign In
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={inputClass("emailAddress")}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.emailAddress}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClass("password")}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden bg-foreground text-background hover:text-white px-8 py-4 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogIn size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                    {isLoading ? "Signing In..." : "Sign In"}
                  </span>
                  <div className="absolute inset-0 bg-[hsl(38,60%,50%)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </form>

            {/* Footer link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[hsl(38,60%,50%)] font-semibold hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Decorative accent */}
          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[hsl(38,60%,50%)] to-transparent" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
