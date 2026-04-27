import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UserCog, Mail, KeyRound, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { updateAdminProfile } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";

export const AdminProfilePanel = () => {
  const { user, getProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showProfilePassword, setShowProfilePassword] = useState(false);

  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
    profilePassword: "",
    confirmProfilePassword: ""
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, emailAddress: user.emailAddress }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate matching passwords if changing profile password
    if (form.profilePassword && form.profilePassword !== form.confirmProfilePassword) {
      toast.error("Profile passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await updateAdminProfile({
        emailAddress: form.emailAddress,
        password: form.password || undefined,
        profilePassword: form.profilePassword || undefined
      });

      if (res.success) {
        toast.success("Profile updated successfully");
        // Clear passwords from form
        setForm(prev => ({
          ...prev,
          password: "",
          profilePassword: "",
          confirmProfilePassword: ""
        }));
        // Refresh auth user context if email changed
        if (form.emailAddress !== user?.emailAddress) {
          getProfile();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[hsl(38,60%,50%)]/20 text-[hsl(38,60%,50%)] rounded-xl flex items-center justify-center">
          <UserCog size={24} />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-white">Administrator Profile</h2>
          <p className="text-white/50 text-sm">Update your login credentials and security settings.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(38,60%,50%)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Account Details Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[hsl(38,60%,50%)] font-bold text-sm tracking-widest uppercase mb-4">
            <Mail size={16} /> Login Email
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Email Address</Label>
            <input
              type="email"
              name="emailAddress"
              value={form.emailAddress}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[hsl(38,60%,50%)] transition-colors"
              required
            />
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Change Password Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[hsl(38,60%,50%)] font-bold text-sm tracking-widest uppercase mb-4">
            <KeyRound size={16} /> Login Password
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-white/60 font-bold flex justify-between">
              <span>New Login Password</span>
              <span className="text-white/30 text-[10px]">Leave blank to keep current</span>
            </Label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[hsl(38,60%,50%)] transition-colors pr-10"
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Profile Password Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm tracking-widest uppercase">
              <ShieldCheck size={16} /> Profile Password
            </div>
          </div>
          <p className="text-xs text-white/50 mb-4 leading-relaxed">
            The <strong className="text-white/80">Profile Password</strong> is required to authorize sensitive actions on the admin dashboard, such as deleting inquiries or updating user accounts. By default, it is the same as your login password.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">New Profile Password</Label>
              <div className="relative">
                <input
                  type={showProfilePassword ? "text" : "password"}
                  name="profilePassword"
                  value={form.profilePassword}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400/50 transition-colors pr-10"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowProfilePassword(!showProfilePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showProfilePassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Confirm Profile Password</Label>
              <input
                type={showProfilePassword ? "text" : "password"}
                name="confirmProfilePassword"
                value={form.confirmProfilePassword}
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-400/50 transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-[hsl(38,60%,50%)] hover:bg-[hsl(38,60%,40%)] text-background rounded-lg text-sm font-bold tracking-widest uppercase transition-all shadow-lg shadow-[hsl(38,60%,50%)]/20 disabled:opacity-50"
          >
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
