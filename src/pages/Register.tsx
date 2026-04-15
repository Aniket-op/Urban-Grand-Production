import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, Eye, EyeOff, Loader2 } from "lucide-react";
import type { ApiResponse } from "@/lib/api";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    emailAddress: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.emailAddress.trim()) newErrors.emailAddress = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      newErrors.emailAddress = "Enter a valid email";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    else if (formData.contactNumber.replace(/\D/g, "").length < 10)
      newErrors.contactNumber = "Enter at least 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fix the errors below.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        companyName: formData.companyName || undefined,
        emailAddress: formData.emailAddress,
        contactNumber: formData.contactNumber,
        password: formData.password,
      });
      toast.success("Account created successfully! Welcome aboard.");
      navigate("/");
    } catch (err) {
      const error = err as ApiResponse;
      toast.error(error.message || "Registration failed. Please try again.");
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
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(38,60%,50%,0.03)] pointer-events-none" />

        <div className="relative w-full max-w-lg">
          <div className="bg-background border border-border/60 rounded-xl p-8 sm:p-10 shadow-lg shadow-black/[0.03]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(38,60%,50%,0.1)] mb-5">
                <UserPlus size={22} className="text-[hsl(38,60%,50%)]" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[hsl(38,60%,50%)] font-bold mb-2">
                Join Us
              </p>
              <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
                Create Account
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Register to manage your enquiries and profile
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass("fullName")}
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                    Company / Firm
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={inputClass("companyName")}
                    placeholder="Optional"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={inputClass("contactNumber")}
                    placeholder="+91 98765 43210"
                    disabled={isLoading}
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-[10px] mt-1">{errors.contactNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      placeholder="Min 6 characters"
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
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={inputClass("confirmPassword")}
                    placeholder="Re-enter password"
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-[10px] mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
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
                      <UserPlus size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    )}
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </span>
                  <div className="absolute inset-0 bg-[hsl(38,60%,50%)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </form>

            {/* Footer link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[hsl(38,60%,50%)] font-semibold hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[hsl(38,60%,50%)] to-transparent" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
