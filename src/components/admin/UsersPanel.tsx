import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Users, Trash2, Edit, Shield, ShieldAlert, Mail, Phone, Building } from "lucide-react";
import { getAllUsers, updateUserAdmin, deleteUserAdmin, ApiUser } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const UsersPanel = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Edit State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    emailAddress: "",
    contactNumber: "",
    companyName: "",
    isAdmin: false,
  });

  const fetchUsers = async (pageNum: number, append: boolean = false) => {
    try {
      append ? setIsFetchingMore(true) : setIsLoading(true);
      const res = await getAllUsers(pageNum, 50);
      if (res.success) {
        setUsers((prev) => (append ? [...prev, ...res.users] : res.users));
        setTotal(res.total);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("CRITICAL WARNING: This will permanently delete the user account entirely. Are you sure?")) return;
    try {
      const res = await deleteUserAdmin(id);
      if (res.success) {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setTotal((prev) => prev - 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  const openEditDialog = (user: ApiUser) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      contactNumber: user.contactNumber,
      companyName: user.companyName || "",
      isAdmin: user.isAdmin || false,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    try {
      const res = await updateUserAdmin(editingUser._id, editForm);
      if (res.success) {
        toast.success("User details updated");
        setUsers((prev) => prev.map((u) => u._id === editingUser._id ? { ...u, ...editForm } : u));
        setIsEditDialogOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    }
  };

  if (isLoading && page === 1) {
    return <div className="p-12 text-center text-white/50">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold flex items-center gap-2 text-white">
          <Users className="text-[hsl(38,60%,50%)]" size={20} />
          User Management ({total} Total)
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs py-4">User</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs">Contact Methods</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs">Joined Date</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs">Role</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow className="border-white/10">
                  <TableCell colSpan={5} className="py-12 text-center text-white/50">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} className="border-white/10 hover:bg-white/5 group">
                    <TableCell className="text-white">
                      <div className="font-bold">{user.fullName}</div>
                      {user.companyName && (
                        <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
                          <Building size={12} /> {user.companyName}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-white/80 whitespace-nowrap space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[hsl(38,60%,50%)]/50" />
                        <span className="text-sm">{user.emailAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[hsl(38,60%,50%)]/50" />
                        <span className="text-sm">{user.contactNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80 whitespace-nowrap text-sm">
                       {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[hsl(38,60%,50%)]/10 text-[hsl(38,60%,50%)] text-[10px] uppercase font-bold tracking-widest border border-[hsl(38,60%,50%)]/20">
                          <Shield size={12} /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-[10px] uppercase font-bold tracking-widest border border-white/5">
                          User
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditDialog(user)}
                          className="p-2 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                          title="Edit User"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {users.length < total && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchUsers(nextPage, true);
            }}
            disabled={isFetchingMore}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors text-white disabled:opacity-50"
          >
            {isFetchingMore ? "Loading..." : "Load More Users"}
          </button>
        </div>
      )}

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[hsl(220,25%,10%)] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-bold">Edit User Details</DialogTitle>
            <DialogDescription className="text-white/50">
              Make changes to the user's profile and roles.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Full Name</Label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[hsl(38,60%,50%)] text-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Email Address</Label>
              <input
                type="email"
                value={editForm.emailAddress}
                onChange={(e) => setEditForm(prev => ({ ...prev, emailAddress: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[hsl(38,60%,50%)] text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Contact Number</Label>
                <input
                  type="text"
                  value={editForm.contactNumber}
                  onChange={(e) => setEditForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[hsl(38,60%,50%)] text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Company</Label>
                <input
                  type="text"
                  value={editForm.companyName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[hsl(38,60%,50%)] text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg mt-6">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert size={14} className="text-[hsl(38,60%,50%)]" />
                  Administrator Privileges
                </Label>
                <p className="text-xs text-white/40">Grant this user full access to the admin dashboard.</p>
              </div>
              <Switch
                checked={editForm.isAdmin}
                onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, isAdmin: checked }))}
              />
            </div>

            <DialogFooter className="mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsEditDialogOpen(false)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[hsl(38,60%,50%)] hover:bg-[hsl(38,60%,40%)] text-background rounded-lg text-sm font-bold tracking-widest uppercase transition-colors"
              >
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
