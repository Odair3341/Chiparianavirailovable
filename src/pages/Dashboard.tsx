import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Package, 
  AlertTriangle,
  Calendar,
  Clock
} from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { ProductsTable } from '@/components/dashboard/ProductsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-foreground-muted mt-1">
            {today} • {currentTime}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="btn-hero" onClick={() => navigate('/pdv')}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Abrir PDV
          </Button>
          <Button variant="outline" onClick={() => navigate('/relatorios')}>
            <Calendar className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Faturamento Hoje"
          value="R$ 3.247"
          change={{ value: "+12.5%", type: "positive" }}
          icon={DollarSign}
          variant="primary"
        />
        
        <MetricCard
          title="Vendas Hoje"
          value="127"
          change={{ value: "+8.2%", type: "positive" }}
          icon={ShoppingCart}
          variant="success"
        />
        
        <MetricCard
          title="Ticket Médio"
          value="R$ 25,60"
          change={{ value: "+3.1%", type: "positive" }}
          icon={TrendingUp}
        />
        
        <MetricCard
          title="Clientes Atendidos"
          value="89"
          change={{ value: "+15.7%", type: "positive" }}
          icon={Users}
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Alertas e Status</CardTitle>
            <CardDescription>
              Informações importantes para atenção
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stock Alerts */}
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Estoque Baixo</h4>
                  <p className="text-sm text-foreground-muted">3 produtos precisam de reposição</p>
                </div>
                <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                  3 itens
                </Badge>
              </div>
            </div>

            {/* Sales Goal */}
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Meta do Dia</h4>
                  <p className="text-sm text-foreground-muted">81% da meta alcançada</p>
                  <div className="w-full bg-success/20 rounded-full h-2 mt-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Sistema Atualizado</h4>
                  <p className="text-sm text-foreground-muted">Última sincronização: agora há pouco</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}
