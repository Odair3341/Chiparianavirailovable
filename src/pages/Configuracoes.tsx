import { useState, useCallback } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Store,
  Bell,
  Shield,
  Palette,
  Database,
  Wifi,
  Printer,
  CreditCard,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useThemeContext } from "@/providers/ThemeProvider"; // Importando o contexto do tema
import { useTheme } from "@/hooks/use-theme"; // Importando o hook de tema
import { Toaster, toast } from 'sonner';

// --- Tipos de Dados ---
type ActiveTab = 'perfil' | 'estabelecimento' | 'notificacoes' | 'seguranca' | 'aparencia' | 'dados' | 'integracoes' | 'impressao' | 'pagamento';

interface UserProfileState {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  permissoes: {
    pdv: boolean;
    estoque: boolean;
    relatorios: boolean;
  };
}

// --- Dados Iniciais (Mock) ---
// Tenta recuperar o perfil do usuário do localStorage ou usa o valor padrão
const getSavedUserProfile = (): UserProfileState => {
  const savedProfile = localStorage.getItem('userProfile');
  if (savedProfile) {
    try {
      return JSON.parse(savedProfile);
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  }
  return {
    nome: 'João Silva',
    email: 'joao@chiparia.com',
    telefone: '(11) 99999-9999',
    cargo: 'Administrador',
    permissoes: {
      pdv: true,
      estoque: true,
      relatorios: true,
    },
  };
};

const initialUserProfile = getSavedUserProfile();

// --- Componente Principal ---
export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('perfil');
  const [userProfile, setUserProfile] = useState<UserProfileState>(initialUserProfile);

  const handleSave = useCallback(() => {
    // Salva os dados do perfil no localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    console.log("Salvando dados:", { userProfile });
    toast.success('Alterações salvas com sucesso!');
  }, [userProfile]);

  const handleReset = useCallback(() => {
    setUserProfile(initialUserProfile);
    toast.info('As alterações foram restauradas para os padrões.');
  }, []);

  const { theme, setTheme } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <UserProfileCard state={userProfile} setState={setUserProfile} />;
      case 'aparencia':
        return <AppearanceCard theme={theme} setTheme={setTheme} />;
      // Adicione outros casos aqui quando refatorá-los
      default:
        return (
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Em Breve</CardTitle>
              <CardDescription>Esta seção estará disponível em breve.</CardDescription>
            </CardHeader>
          </Card>
        );
    }
  };

  return (
    <Layout>
      <Toaster richColors position="top-right" />
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-foreground-muted">Gerencie as configurações do sistema</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Restaurar Padrões
            </Button>
            <Button className="btn-hero" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SettingsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="lg:col-span-2 space-y-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// --- Componentes de Navegação e Conteúdo ---

interface SettingsNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const SettingsNavigation = ({ activeTab, setActiveTab }: SettingsNavigationProps) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'estabelecimento', label: 'Estabelecimento', icon: Store },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'dados', label: 'Dados', icon: Database },
    { id: 'integracoes', label: 'Integrações', icon: Wifi },
    { id: 'impressao', label: 'Impressão', icon: Printer },
    { id: 'pagamento', label: 'Pagamento', icon: CreditCard },
  ];

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-lg">Categorias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {navItems.map(item => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

interface UserProfileCardProps {
  state: UserProfileState;
  setState: React.Dispatch<React.SetStateAction<UserProfileState>>;
}

const UserProfileCard = ({ state, setState }: UserProfileCardProps) => {
  const handleChange = (field: keyof Omit<UserProfileState, 'permissoes'>, value: string) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const handlePermissionChange = (permission: keyof UserProfileState['permissoes'], value: boolean) => {
    setState(prevState => ({
      ...prevState,
      permissoes: { ...prevState.permissoes, [permission]: value },
    }));
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Perfil do Usuário</CardTitle>
        <CardDescription>Informações pessoais e credenciais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome Completo</label>
            <Input value={state.nome} onChange={e => handleChange('nome', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={state.email} type="email" onChange={e => handleChange('email', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Telefone</label>
            <Input value={state.telefone} onChange={e => handleChange('telefone', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cargo</label>
            <Input value={state.cargo} onChange={e => handleChange('cargo', e.target.value)} />
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="font-medium">Permissões</h4>
          <div className="space-y-3">
            <PermissionSwitch
              label="Acesso ao PDV"
              description="Permite realizar vendas"
              checked={state.permissoes.pdv}
              onCheckedChange={value => handlePermissionChange('pdv', value)}
            />
            <PermissionSwitch
              label="Gerenciar Estoque"
              description="Adicionar e editar produtos"
              checked={state.permissoes.estoque}
              onCheckedChange={value => handlePermissionChange('estoque', value)}
            />
            <PermissionSwitch
              label="Relatórios Financeiros"
              description="Visualizar dados financeiros"
              checked={state.permissoes.relatorios}
              onCheckedChange={value => handlePermissionChange('relatorios', value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PermissionSwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const PermissionSwitch = ({ label, description, checked, onCheckedChange }: PermissionSwitchProps) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-foreground-muted">{description}</p>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

interface AppearanceCardProps {
  theme: 'dark' | 'light' | 'system';
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

const AppearanceCard = ({ theme, setTheme }: AppearanceCardProps) => {
  const handleThemeChange = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
    // Salvar no localStorage para persistir a preferência
    localStorage.setItem('theme', newTheme);
    toast.success(`Tema ${newTheme === 'dark' ? 'escuro' : newTheme === 'light' ? 'claro' : 'do sistema'} aplicado com sucesso!`);
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5" />Aparência</CardTitle>
        <CardDescription>Personalize a aparência do sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Tema</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ThemeButton 
              title="Claro" 
              description="Tema com fundo claro" 
              isActive={theme === 'light'} 
              onClick={() => handleThemeChange('light')} 
              icon={<Sun className="w-5 h-5" />} 
            />
            <ThemeButton 
              title="Escuro" 
              description="Tema com fundo escuro" 
              isActive={theme === 'dark'} 
              onClick={() => handleThemeChange('dark')} 
              icon={<Moon className="w-5 h-5" />} 
            />
            <ThemeButton 
              title="Sistema" 
              description="Segue o tema do sistema" 
              isActive={theme === 'system'} 
              onClick={() => handleThemeChange('system')} 
              icon={<Laptop className="w-5 h-5" />} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ThemeButtonProps {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const ThemeButton = ({ title, description, isActive, onClick, icon }: ThemeButtonProps) => (
  <button
    onClick={onClick}
    className={`p-4 rounded-lg border transition-all flex flex-col items-center text-center space-y-2 ${isActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
  >
    <div className={`p-2 rounded-full ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
      {icon}
    </div>
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-xs text-foreground-muted">{description}</p>
    </div>
  </button>
);