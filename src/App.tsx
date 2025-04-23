
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Wallet from "./pages/Wallet";
import MyEnergy from "./pages/MyEnergy";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./store";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/marketplace" 
              element={
                <Layout>
                  <Marketplace />
                </Layout>
              } 
            />
            <Route 
              path="/wallet" 
              element={
                <Layout>
                  <Wallet />
                </Layout>
              } 
            />
            <Route 
              path="/my-energy" 
              element={
                <Layout>
                  <MyEnergy />
                </Layout>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <Layout>
                  <Analytics />
                </Layout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

export default App;
