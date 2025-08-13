import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  FileText,
  Settings,
  Menu,
  X,
  ChefHat,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import chipaflowLogo from '@/assets/chipaflow-logo.png';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: 'PDV - Vendas',
    href: '/pdv',
    icon: ShoppingCart
  },
  {
    title: 'Estoque',
    href: '/estoque',
    icon: Package
  },
  {
    title: 'Financeiro',
    href: '/financeiro',
    icon: TrendingUp
  },
  {
    title: 'Compras',
    href: '/compras',
    icon: ShoppingBag
  },
  {
    title: 'Relatórios',
    href: '/relatorios',
    icon: FileText
  },
  {
    title: 'Configurações',
    href: '/configuracoes',
    icon: Settings
  }
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [logoSrc, setLogoSrc] = useState(() => {
    const savedLogo = localStorage.getItem('customLogo');
    return savedLogo || chipaflowLogo;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    console.log('Logo clicked, attempting to open file dialog');
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log('File input clicked');
    } else {
      console.error('File input ref is null');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File change event triggered');
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          console.log('File read successfully');
          setLogoSrc(result);
          localStorage.setItem('customLogo', result);
        };
        reader.onerror = () => {
          console.error('Error reading file');
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Selected file is not an image');
        alert('Por favor, selecione um arquivo de imagem válido.');
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-card border-r border-card-border transition-transform duration-300 lg:translate-x-0 dark:bg-background dark:border-card-border",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-card-border dark:border-card-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={logoSrc} 
                alt="Chiparia Naviraí Logo" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <button
                onClick={handleLogoClick}
                className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-1 shadow-lg transition-colors"
                title="Alterar logo"
              >
                <Upload className="w-3 h-3" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground dark:text-foreground">Chiparia Naviraí</h1>
              <p className="text-xs text-foreground-muted dark:text-foreground-muted">Sistema Financeiro</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md dark:bg-primary dark:text-primary-foreground dark:shadow-lg"
                    : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground dark:text-foreground-secondary dark:hover:bg-background-secondary/70 dark:hover:text-foreground"
                )
              }
              onClick={() => window.innerWidth < 1024 && onToggle()}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-card-border dark:border-card-border">
          <div className="text-center text-xs text-foreground-muted dark:text-foreground-muted">
            <p>Chiparia Naviraí v1.0</p>
            <p>© 2024 - Sistema Completo</p>
          </div>
        </div>
      </aside>
    </>
  );
}