import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Save, Loader2, LogOut, Mail, Phone, Building2, Calendar } from "lucide-react";
import type { ApiResponse } from "@/lib/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading, updateUser, logout } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    contactNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        companyName: user.companyName || "",
        contactNumber: user.contactNumber || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSaving(true);
    try {
      await updateUser({
        fullName: formData.fullName,
        companyName: formData.companyName,
        contactNumber: formData.contactNumber,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      const error = err as ApiResponse;
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[hsl(38,60%,50%)]" />
      </div>
    );
  }

  if (!user) return null;

  const inputClass = (field: string) =>
    `w-full bg-transparent border ${
      errors[field] ? "border-red-400" : "border-border"
    } px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(38,60%,50%)]/50 focus:border-[hsl(38,60%,50%)] hover:border-foreground/30 transition-all duration-300 rounded-md placeholder:text-muted-foreground/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-muted/20`;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />

      <div className="flex-1 px-4 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(38,60%,50%,0.03)] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[hsl(38,60%,50%,0.1)] mb-5 border-2 border-[hsl(38,60%,50%,0.2)]">
              <span className="font-display text-2xl font-bold text-[hsl(38,60%,50%)]">
                {user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              {user.fullName}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1.5">
              <Mail size={13} />
              {user.emailAddress}
            </p>
            {user.createdAt && (
              <p className="text-xs text-muted-foreground/70 mt-2 flex items-center justify-center gap-1.5">
                <Calendar size={12} />
                Member since {formatDate(user.createdAt)}
              </p>
            )}
          </div>

          {/* Profile Card */}
          <div className="bg-background border border-border/60 rounded-xl p-8 sm:p-10 shadow-lg shadow-black/[0.03]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[hsl(38,60%,50%)] font-bold mb-1">
                  Account Details
                </p>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {isEditing ? "Edit Profile" : "Your Profile"}
                </h2>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase border border-foreground/20 rounded-md hover:bg-muted/30 hover:border-foreground/40 transition-all duration-300"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                  <User size={12} className="text-[hsl(38,60%,50%)]" />
                  Full Name
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-foreground/80 px-1 py-2">{user.fullName}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                  <Building2 size={12} className="text-[hsl(38,60%,50%)]" />
                  Company / Firm
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={inputClass("companyName")}
                    placeholder="Optional"
                  />
                ) : (
                  <p className="text-sm text-foreground/80 px-1 py-2">
                    {user.companyName || "—"}
                  </p>
                )}
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                  <Mail size={12} className="text-[hsl(38,60%,50%)]" />
                  Email Address
                  <span className="text-[9px] text-muted-foreground tracking-normal normal-case font-normal">(cannot be changed)</span>
                </label>
                <p className="text-sm text-foreground/80 px-1 py-2">{user.emailAddress}</p>
              </div>

              {/* Contact Number */}
              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-foreground mb-2 font-bold">
                  <Phone size={12} className="text-[hsl(38,60%,50%)]" />
                  Contact Number
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className={inputClass("contactNumber")}
                    />
                    {errors.contactNumber && (
                      <p className="text-red-500 text-[10px] mt-1">{errors.contactNumber}</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-foreground/80 px-1 py-2">{user.contactNumber}</p>
                )}
              </div>

              {/* Edit actions */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="group relative flex-1 overflow-hidden bg-foreground text-background hover:text-white px-6 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-md disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSaving ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      {isSaving ? "Saving..." : "Save Changes"}
                    </span>
                    <div className="absolute inset-0 bg-[hsl(38,60%,50%)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                      if (user) {
                        setFormData({
                          fullName: user.fullName,
                          companyName: user.companyName || "",
                          contactNumber: user.contactNumber,
                        });
                      }
                    }}
                    className="px-6 py-4 text-[11px] font-bold tracking-[0.2em] uppercase border border-border rounded-md hover:bg-muted/30 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Logout button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-red-500/80 hover:text-red-500 border border-red-300/30 hover:border-red-400/50 rounded-md hover:bg-red-50/50 transition-all duration-300"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>

          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[hsl(38,60%,50%)] to-transparent mt-8" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
