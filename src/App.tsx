import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import AboutCategory from "./pages/AboutCategory.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import Contact from "./pages/Contact.tsx";
import OurVision from "./pages/OurVision.tsx";
import OurStory from "./pages/OurStory.tsx";
import NotFound from "./pages/NotFound.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";

import FAQ from "./pages/FAQ.tsx";
import MapPage from "./pages/MapPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about/category/:section" element={<AboutCategory />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            {/* remove contact page */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/vision" element={<OurVision />} />
            <Route path="/story" element={<OurStory />} />
            <Route path="/category/:gender" element={<CategoryPage />} />
            <Route path="/category/:gender/:subcategory" element={<CategoryPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:gender" element={<ExplorePage />} />
            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
