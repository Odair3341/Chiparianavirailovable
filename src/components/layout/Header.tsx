import { Bell, Search, User, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [userProfile, setUserProfile] = useState({ nome: 'João Silva', cargo: 'Administrador' });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile({ nome: profile.nome, cargo: profile.cargo });
      } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error);
      }
    }
  }, []);

  return (
    <header className="bg-background border-b border-border dark:bg-background dark:border-card-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <Input 
              placeholder="Buscar produtos, vendas..." 
              className="pl-10 w-64 dark:bg-background-secondary/50 dark:border-card-border" 
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center dark:from-primary dark:to-primary/80">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium dark:text-foreground">{userProfile.nome}</p>
                  <p className="text-xs text-foreground-muted dark:text-foreground-muted">{userProfile.cargo}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="w-4 h-4 mr-2" />
                Notificações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}