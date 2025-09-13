import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "./pages/NotFound";
import PageTransition from "@/components/PageTransition";
import StairsAnimation from "@/components/StairsAnimation";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [pageOpacity, setPageOpacity] = useState(1);
  const [showRoutes, setShowRoutes] = useState(true);
  const location = useLocation();

  // ✅ Only these routes should get the full page transition
  const animatedRoutes = [
    "/CoffeeNess/",
    "/CoffeeNess/shop",
    "/CoffeeNess/about",
    "/CoffeeNess/contact",
  ];

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    // Skip if flagged or not in animated list
    const skip = (location.state as any)?.skipAnim;
    const shouldAnimate = animatedRoutes.includes(location.pathname);

    if (skip || !shouldAnimate) {
      setPageOpacity(1);
      setShowRoutes(true);
      setIsAnimating(false);
      return;
    }

    // Start transition
    setShowRoutes(false);
    setPageOpacity(0);
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
      setShowRoutes(true);
      setPageOpacity(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state, isFirstLoad]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Navigation />
          <PageTransition>
            <div
              style={{
                opacity: pageOpacity,
                transition: "opacity 0.7s ease-in-out",
              }}
            >
              {showRoutes && (
                <Routes>
                  <Route path="/CoffeeNess/" element={<Home />} />
                  <Route path="/CoffeeNess/shop" element={<Shop />} />
                  <Route path="/CoffeeNess/about" element={<About />} />
                  <Route path="/CoffeeNess/contact" element={<Contact />} />
                  <Route
                    path="/CoffeeNess/product/:id"
                    element={<ProductDetail />}
                  />
                  <Route path="/CoffeeNess/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
            </div>
          </PageTransition>
          <StairsAnimation
            isAnimating={isAnimating}
            onComplete={() => setIsAnimating(false)}
            columnCount={6}
          />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
