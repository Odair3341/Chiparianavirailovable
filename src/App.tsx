import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Index from "./pages/Index";
import PDV from "./pages/PDV";
import Estoque from "./pages/Estoque";
import Financeiro from "./pages/Financeiro";
import Compras from "./pages/Compras";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// Inicializa o tema baseado no localStorage ao carregar a aplicação
const initializeTheme = () => {
  const root = window.document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme) {
    if (storedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(storedTheme);
    }
  } else {
    // Se não há tema salvo, define o modo escuro como padrão
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

// Executa a inicialização do tema
initializeTheme();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pdv" element={<PDV />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
