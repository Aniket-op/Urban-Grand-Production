import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MessageSquareText, Trash2, Mail, Phone, Calendar, Package } from "lucide-react";
import { getAllEnquiries, deleteEnquiry, ApiEnquiry } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const EnquiriesPanel = () => {
  const [enquiries, setEnquiries] = useState<ApiEnquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchEnquiries = async (pageNum: number, append: boolean = false) => {
    try {
      append ? setIsFetchingMore(true) : setIsLoading(true);
      const res = await getAllEnquiries(pageNum, 20);
      if (res.success) {
        setEnquiries((prev) => (append ? [...prev, ...res.enquiries] : res.enquiries));
        setTotal(res.total);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch enquiries");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(1);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await deleteEnquiry(id);
      if (res.success) {
        toast.success("Enquiry deleted successfully");
        setEnquiries((prev) => prev.filter((enq) => enq._id !== id));
        setTotal((prev) => prev - 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete enquiry");
    }
  };

  if (isLoading && page === 1) {
    return <div className="p-12 text-center text-white/50">Loading enquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold flex items-center gap-2 text-white">
          <MessageSquareText className="text-[hsl(38,60%,50%)]" size={20} />
          Recent Inquiries ({total} total)
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs py-4">Date</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs">Sender</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs">Contact</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs">Product</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs w-1/3">Message</TableHead>
                <TableHead className="text-white/60 font-bold uppercase tracking-wider text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.length === 0 ? (
                <TableRow className="border-white/10">
                  <TableCell colSpan={6} className="py-12 text-center text-white/50">
                    No enquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                enquiries.map((enq) => (
                  <TableRow key={enq._id} className="border-white/10 hover:bg-white/5 group">
                    <TableCell className="text-white/80 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-white/40" />
                        {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      <div className="font-bold">{enq.fullName}</div>
                      {enq.companyName && <div className="text-xs text-white/50">{enq.companyName}</div>}
                    </TableCell>
                    <TableCell className="text-white/80 whitespace-nowrap space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-white/40" />
                        <a href={`mailto:${enq.emailAddress}`} className="hover:text-[hsl(38,60%,50%)]"> {enq.emailAddress}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-white/40" />
                        <a href={`tel:${enq.contactNumber}`} className="hover:text-[hsl(38,60%,50%)]"> {enq.contactNumber}</a>
                      </div>
                    </TableCell>
                    {/* Product context column */}
                    <TableCell className="text-white/80 whitespace-nowrap">
                      {(enq.productName || enq.category || enq.subcategory) ? (
                        <div className="space-y-1.5 min-w-[140px]">
                          {enq.productName && (
                            <div className="flex items-center gap-1.5">
                              <Package size={13} className="text-[hsl(38,60%,50%)] shrink-0" />
                              <span className="text-xs font-semibold text-white/90 truncate max-w-[160px]">{enq.productName}</span>
                            </div>
                          )}
                          {enq.category && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[hsl(38,60%,50%)]/20 text-[hsl(38,60%,70%)] border border-[hsl(38,60%,50%)]/30">
                              {enq.category}
                            </span>
                          )}
                          {enq.subcategory && (
                            <span className="ml-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/60 border border-white/20">
                              {enq.subcategory}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-white/25 text-xs italic">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="bg-black/20 p-3 rounded-lg text-sm text-white/80 line-clamp-2 min-w-[200px] group-hover:line-clamp-none transition-all">
                        {enq.enquiry}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-2 text-white/40 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {enquiries.length < total && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchEnquiries(nextPage, true);
            }}
            disabled={isFetchingMore}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors text-white disabled:opacity-50"
          >
            {isFetchingMore ? "Loading..." : "Load More Inquiries"}
          </button>
        </div>
      )}
    </div>
  );
};
