import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-tertiary">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        
        <div>
          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Página não encontrada</h2>
          <p className="text-foreground-muted">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <Link to="/">
          <Button className="btn-hero">
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
