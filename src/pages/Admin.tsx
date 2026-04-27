import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnquiriesPanel } from "@/components/admin/EnquiriesPanel";
import { UsersPanel } from "@/components/admin/UsersPanel";
import { AdminProfilePanel } from "@/components/admin/AdminProfilePanel";

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (!user || !user.isAdmin) {
        toast.error("Unauthorized access");
        navigate("/admin-login");
      }
    }
  }, [user, authLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
    toast.success("Logged out successfully");
  };

  if (authLoading) {
    return <div className="min-h-screen bg-[hsl(220,25%,10%)] flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  // Double check authorization to prevent flash of content
  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[hsl(220,25%,10%)] text-white p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[hsl(38,60%,50%)]/20 text-[hsl(38,60%,50%)] rounded-xl flex items-center justify-center">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1 tracking-wide">Command Center</h1>
            <p className="text-white/50 text-sm">Welcome back, {user.fullName}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors text-white/80 hover:text-white"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="enquiries" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 border border-white/10 p-1 rounded-xl h-14">
          <TabsTrigger 
            value="enquiries" 
            className="rounded-lg data-[state=active]:bg-[hsl(38,60%,50%)] data-[state=active]:text-background font-bold tracking-widest uppercase text-xs h-full"
          >
            Inquiries
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="rounded-lg data-[state=active]:bg-[hsl(38,60%,50%)] data-[state=active]:text-background font-bold tracking-widest uppercase text-xs h-full"
          >
            User Management
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="rounded-lg data-[state=active]:bg-[hsl(38,60%,50%)] data-[state=active]:text-background font-bold tracking-widest uppercase text-xs h-full"
          >
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enquiries" className="focus-visible:outline-none focus-visible:ring-0">
          <EnquiriesPanel />
        </TabsContent>

        <TabsContent value="users" className="focus-visible:outline-none focus-visible:ring-0">
          <UsersPanel />
        </TabsContent>

        <TabsContent value="profile" className="focus-visible:outline-none focus-visible:ring-0">
          <AdminProfilePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
