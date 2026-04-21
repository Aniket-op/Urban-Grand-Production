import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Shield, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, login, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.isAdmin) {
        toast.success("Welcome back, Admin");
        navigate("/admin");
      } else {
        toast.error("Access denied. Admin privileges required.");
        logout();
        setIsSubmitting(false);
      }
    }
  }, [user, isLoading, navigate, logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      // navigation handled by useEffect
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[hsl(220,25%,10%)] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[hsl(220,25%,10%)] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[hsl(38,60%,50%)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[hsl(220,30%,20%)]/20 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-[hsl(38,60%,50%)]/20 text-[hsl(38,60%,50%)] rounded-full flex items-center justify-center mb-6">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/50 text-sm tracking-wide">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[hsl(38,60%,50%)] focus:ring-1 focus:ring-[hsl(38,60%,50%)] transition-colors"
                  placeholder="admin@urbangrand.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[hsl(38,60%,50%)] focus:ring-1 focus:ring-[hsl(38,60%,50%)] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden bg-[hsl(38,60%,50%)] text-background hover:text-background px-8 py-4 rounded-lg text-sm font-bold tracking-[0.2em] uppercase transition-all mt-4 disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? "Authenticating..." : "Secure Login"}
                {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </form>
          
          <div className="mt-8 text-center sm:text-left cursor-pointer">
            <span className="text-[10px] text-white/30 uppercase tracking-widest hover:text-white/60 transition-colors" onClick={() => navigate("/")}>&larr; Return to Main Site</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
