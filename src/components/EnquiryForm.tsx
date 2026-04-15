import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { categories, WHATSAPP_NUMBER, type Product } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { submitEnquiry as submitEnquiryApi } from "@/lib/api";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import type { ApiResponse } from "@/lib/api";

export interface UserData {
    fullName: string;
    companyName?: string;
    emailAddress: string;
    contactNumber: string;
}

interface EnquiryFormProps {
    prefilledProduct?: Product;
    userData?: UserData;
    disabled?: boolean;
}

const EnquiryForm = ({ prefilledProduct, userData, disabled = false }: EnquiryFormProps) => {
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get("category") ?? "";
    const urlSubcategory = searchParams.get("subcategory") ?? "";

    // Auth context — auto-fill when logged in
    const { user, isAuthenticated } = useAuth();

    // Determine effective user data: logged-in user takes priority, then prop
    const effectiveUser: UserData | undefined = isAuthenticated && user
        ? {
            fullName: user.fullName,
            companyName: user.companyName || undefined,
            emailAddress: user.emailAddress,
            contactNumber: user.contactNumber,
        }
        : userData;

    const [formData, setFormData] = useState({
        fullName: effectiveUser?.fullName ?? "",
        companyName: effectiveUser?.companyName ?? "",
        category: prefilledProduct
            ? prefilledProduct.category === "sale" || prefilledProduct.category === "new-arrivals"
                ? "other"
                : prefilledProduct.category
            : urlCategory,
        contactNumber: effectiveUser?.contactNumber ?? "",
        emailAddress: effectiveUser?.emailAddress ?? "",
        details: prefilledProduct
            ? `I am interested in the following product:\n\nName: ${prefilledProduct.name}\nPrice: ₹${prefilledProduct.price.toLocaleString("en-IN")}\n\nAdditional Details:\n`
            : "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync form data when auth user changes (login/logout)
    useEffect(() => {
        const source = effectiveUser;
        setFormData((prev) => ({
            ...prev,
            fullName: source?.fullName ?? "",
            companyName: source?.companyName ?? "",
            contactNumber: source?.contactNumber ?? "",
            emailAddress: source?.emailAddress ?? "",
        }));
    }, [user, userData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (prefilledProduct) {
            setFormData((prev) => ({
                ...prev,
                category:
                    prefilledProduct.category === "sale" || prefilledProduct.category === "new-arrivals"
                        ? "other"
                        : prefilledProduct.category,
                details: `I am interested in the following product:\n\nName: ${prefilledProduct.name}\nPrice: ₹${prefilledProduct.price.toLocaleString("en-IN")}\n\nAdditional Details:`,
            }));
        }
    }, [prefilledProduct]);

    // Sync URL ?category= and ?subcategory= params whenever they change
    useEffect(() => {
        if (!prefilledProduct && (urlCategory || urlSubcategory)) {
            let prefilledDetails = "";
            const catName = urlCategory ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1) : "";

            if (urlCategory && urlSubcategory) {
                prefilledDetails = `I am interested in bulk ordering from the ${catName} category, specifically the ${urlSubcategory} collection.\n\nPlease provide more information regarding pricing, MOQs, and available materials.\n\nAdditional Requirements:\n`;
            } else if (urlCategory) {
                prefilledDetails = `I am interested in bulk ordering from the ${catName} category.\n\nPlease provide more information regarding pricing, MOQs, and available materials.\n\nAdditional Requirements:\n`;
            }

            setFormData((prev) => ({
                ...prev,
                category: urlCategory || prev.category,
                details: prefilledDetails || prev.details
            }));
        }
    }, [urlCategory, urlSubcategory, prefilledProduct]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.emailAddress) newErrors.emailAddress = "Email Address is required";
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) newErrors.emailAddress = "Email Address is invalid";
        if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
        if (!formData.details) newErrors.details = "Please provide details of your enquiry";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Please fill in all required fields correctly.");
            return;
        }

        // If user is authenticated, submit via API
        if (isAuthenticated) {
            setIsSubmitting(true);
            try {
                // Build the full enquiry text with category context
                const enquiryText = formData.category
                    ? `[Category: ${formData.category}]\n\n${formData.details}`
                    : formData.details;

                await submitEnquiryApi(enquiryText);
                toast.success("Enquiry submitted successfully! We will get back to you soon.");
                setFormData((prev) => ({ ...prev, details: "", category: "" }));
            } catch (err) {
                const error = err as ApiResponse;
                toast.error(error.message || "Failed to submit enquiry. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // Guest mode — log and show success (WhatsApp is the primary guest channel)
            console.log("Enquiry Form Submitted (Guest):", formData);
            toast.success("Enquiry submitted successfully. We will get back to you soon!");
            setFormData({ fullName: "", companyName: "", category: "", contactNumber: "", emailAddress: "", details: "" });
        }
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        const message = `*New Enquiry*\n\n*Name:* ${formData.fullName}\n*Company:* ${formData.companyName || "N/A"}\n*Category:* ${formData.category}\n*Phone:* ${formData.contactNumber}\n*Email:* ${formData.emailAddress}\n\n*Details:*\n${formData.details}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
        toast.success("Redirecting to WhatsApp...");
    };

    // Fields are disabled when user is logged in (auto-filled from profile) or explicitly disabled via prop
    const isUserFieldDisabled = disabled || (isAuthenticated && !!user);

    const inputClass = (field: string, isDisabled: boolean = isUserFieldDisabled) =>
        `w-full bg-transparent border-0 border-b-2 ${errors[field] ? "border-red-500" : "border-border"} px-1 py-3 text-sm focus:outline-none focus:ring-0 focus:border-[hsl(38,60%,50%)] hover:border-foreground/30 transition-colors rounded-none placeholder:text-muted-foreground/50 ${isDisabled ? "opacity-60 cursor-not-allowed text-muted-foreground" : ""}`;

    return (
        <div className="w-full h-full overflow-y-auto px-6 sm:px-12 lg:px-16 py-10 sm:py-16">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-[2px] w-10 bg-[hsl(38,60%,50%)]" />
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[hsl(38,60%,50%)] font-bold">
                        Get In Touch
                    </p>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
                    Bulk & Custom
                </h2>
                <p className="text-sm text-muted-medium leading-relaxed max-w-md">
                    Corporate gifting, wedding trousseau, or wholesale orders? Fill in the details below and our concierge team will reach out to you.
                </p>

                {/* Auth status indicator */}
                {isAuthenticated && user && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(38,60%,50%,0.1)] border border-[hsl(38,60%,50%,0.2)]">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-[hsl(38,60%,50%)]">
                            Logged in as {user.fullName.split(" ")[0]}
                        </span>
                    </div>
                )}
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass("fullName")} placeholder="John Doe" disabled={isUserFieldDisabled} />
                        {errors.fullName && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.fullName}</p>}
                    </div>
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Company / Firm Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass("companyName")} placeholder="Optional" disabled={isUserFieldDisabled} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Email Address *</label>
                        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className={inputClass("emailAddress")} placeholder="you@example.com" disabled={isUserFieldDisabled} />
                        {errors.emailAddress && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.emailAddress}</p>}
                    </div>
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Contact Number *</label>
                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className={inputClass("contactNumber")} placeholder="+91 98765 43210" disabled={isUserFieldDisabled} />
                        {errors.contactNumber && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.contactNumber}</p>}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Details of your Enquiry *</label>
                    <textarea rows={3} name="details" value={formData.details} onChange={handleChange} className={`${inputClass("details", false)} resize-none pt-2`} placeholder="Describe your requirements, timeline, quantity, etc." />
                    {errors.details && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.details}</p>}
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group relative w-full overflow-hidden bg-foreground text-background hover:text-white px-8 py-5 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            )}
                            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                        </span>
                        <div className="absolute inset-0 bg-[hsl(38,60%,50%)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                </div>

                <p className="text-center text-[9px] text-muted-foreground tracking-[0.1em] uppercase pt-4 opacity-70">
                    {isAuthenticated
                        ? "Your contact details are auto-filled from your profile."
                        : "All fields marked * are required. We respect your privacy."}
                </p>
            </form>
        </div>
    );
};

export default EnquiryForm;
