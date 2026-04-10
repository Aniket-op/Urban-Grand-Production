import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { categories, WHATSAPP_NUMBER, type Product } from "@/data/products";
import { MessageCircle, Send } from "lucide-react";

interface EnquiryFormProps {
    prefilledProduct?: Product;
}

const EnquiryForm = ({ prefilledProduct }: EnquiryFormProps) => {
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get("category") ?? "";
    const urlSubcategory = searchParams.get("subcategory") ?? "";

    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        category: prefilledProduct
            ? prefilledProduct.category === "sale" || prefilledProduct.category === "new-arrivals"
                ? "other"
                : prefilledProduct.category
            : urlCategory,
        contactNumber: "",
        emailAddress: "",
        details: prefilledProduct
            ? `I am interested in the following product:\n\nName: ${prefilledProduct.name}\nPrice: ₹${prefilledProduct.price.toLocaleString("en-IN")}\n\nAdditional Details:\n`
            : "",
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        console.log("Enquiry Form Submitted:", formData);
        toast.success("Enquiry submitted successfully. We will get back to you soon!");
        setFormData({ fullName: "", companyName: "", category: "", contactNumber: "", emailAddress: "", details: "" });
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

    const inputClass = (field: string) =>
        `w-full bg-transparent border-0 border-b-2 ${errors[field] ? "border-red-500" : "border-border"} px-1 py-3 text-sm focus:outline-none focus:ring-0 focus:border-[hsl(38,60%,50%)] hover:border-foreground/30 transition-colors rounded-none placeholder:text-muted-foreground/50`;

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
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass("fullName")} placeholder="John Doe" />
                        {errors.fullName && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.fullName}</p>}
                    </div>
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Company / Firm Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass("companyName")} placeholder="Optional" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Email Address *</label>
                        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className={inputClass("emailAddress")} placeholder="you@example.com" />
                        {errors.emailAddress && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.emailAddress}</p>}
                    </div>
                    <div className="relative">
                        <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Contact Number *</label>
                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className={inputClass("contactNumber")} placeholder="+91 98765 43210" />
                        {errors.contactNumber && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.contactNumber}</p>}
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-foreground mb-1 font-bold">Details of your Enquiry *</label>
                    <textarea rows={3} name="details" value={formData.details} onChange={handleChange} className={`${inputClass("details")} resize-none pt-2`} placeholder="Describe your requirements, timeline, quantity, etc." />
                    {errors.details && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.details}</p>}
                </div>

                <div className="pt-6">
                    <button type="submit" onClick={handleSubmit} className="group relative w-full overflow-hidden bg-foreground text-background hover:text-white px-8 py-5 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            Submit Enquiry
                        </span>
                        <div className="absolute inset-0 bg-[hsl(38,60%,50%)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                </div>

                <p className="text-center text-[9px] text-muted-foreground tracking-[0.1em] uppercase pt-4 opacity-70">
                    All fields marked * are required. We respect your privacy.
                </p>
            </form>
        </div>
    );
};

export default EnquiryForm;
