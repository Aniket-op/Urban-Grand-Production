import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Eye, EyeOff } from "lucide-react";

interface ProfilePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
  title: string;
  description: string;
  actionText?: string;
  actionClass?: string;
}

export const ProfilePasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  actionText = "Confirm Action",
  actionClass = "bg-[hsl(38,60%,50%)] hover:bg-[hsl(38,60%,40%)] text-background"
}: ProfilePasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    try {
      setIsSubmitting(true);
      await onConfirm(password);
      setPassword(""); // Reset on success
      onClose(); // Close modal
    } catch (error) {
      // The parent will handle toast notifications, but we still catch here
      // to avoid unhandled promise rejections and to reset submitting state
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-[hsl(220,25%,10%)] border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display font-bold flex items-center gap-2 text-red-400">
            <ShieldAlert size={20} />
            {title}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2 relative">
            <Label className="text-xs uppercase tracking-widest text-white/60 font-bold">Profile Password</Label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-400/50 transition-colors"
                placeholder="Enter your profile password..."
                required
                autoFocus
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-[10px] text-white/40 mt-1">This is required to authorize sensitive actions.</p>
          </div>

          <DialogFooter className="pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password || isSubmitting}
              className={`px-6 py-2 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors disabled:opacity-50 ${actionClass}`}
            >
              {isSubmitting ? "Verifying..." : actionText}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
