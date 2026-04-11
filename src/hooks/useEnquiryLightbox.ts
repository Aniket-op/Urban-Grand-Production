import { useState, useCallback } from "react";
import type { Product } from "@/components/ImageLightbox";

/**
 * useEnquiryLightbox
 *
 * Encapsulates open/close state and the products list for the ImageLightbox.
 * Designed to be used by any page that needs to trigger the enquiry lightbox
 * with a pre-filtered set of products (e.g. only Coats, only Jackets).
 *
 * Usage:
 *   const { products, lightboxIndex, openLightbox, closeLightbox, setLightboxIndex }
 *     = useEnquiryLightbox();
 */
export function useEnquiryLightbox() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /** Open the lightbox with a specific product list, starting at `startIndex`. */
  const openLightbox = useCallback(
    (newProducts: Product[], startIndex = 0) => {
      setProducts(newProducts);
      setLightboxIndex(startIndex);
    },
    []
  );

  /** Close the lightbox and clear the product list. */
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return { products, lightboxIndex, openLightbox, closeLightbox, setLightboxIndex };
}
