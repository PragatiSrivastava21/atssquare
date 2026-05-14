import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "./ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import OurWork from "./pages/OurWork";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Faqs from "./pages/Faqs";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
 import CorrosionService from "@/components/site/corrosionservice";
 import FeaService from "@/components/site/feaservice";
import ThermalService from "@/components/site/thermalservice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
         

<Route path="/services/corrosion-analysis" element={<CorrosionService />} />
<Route path="/services/fea" element={<FeaService />} />
<Route path="/services/thermal" element={<ThermalService />} />
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<OurWork />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
