import { useState } from 'react';
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
  ChefHat
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
            <img 
              src={chipaflowLogo} 
              alt="ChipaFlow Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div>
              <h1 className="font-bold text-lg text-foreground dark:text-foreground">ChipaFlow</h1>
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
            <p>ChipaFlow v1.0</p>
            <p>© 2024 - Sistema Completo</p>
          </div>
        </div>
      </aside>
    </>
  );
}