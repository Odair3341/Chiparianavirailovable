import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  BarChart3,
  PieChart,
  Filter,
  Eye
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', receita: 15000, vendas: 890, clientes: 245 },
  { month: 'Fev', receita: 18000, vendas: 1020, clientes: 298 },
  { month: 'Mar', receita: 22000, vendas: 1180, clientes: 342 },
  { month: 'Abr', receita: 20000, vendas: 1050, clientes: 315 },
  { month: 'Mai', receita: 25000, vendas: 1350, clientes: 385 },
  { month: 'Jun', receita: 28000, vendas: 1420, clientes: 410 },
];

const reports = [
  {
    id: 1,
    title: 'Relatório Financeiro - Junho 2024',
    description: 'Análise completa das receitas e despesas',
    type: 'Financeiro',
    date: '2024-06-30',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 2,
    title: 'Análise de Vendas - Últimos 30 dias',
    description: 'Performance de vendas e produtos',
    type: 'Vendas',
    date: '2024-06-28',
    size: '1.8 MB',
    format: 'Excel'
  },
  {
    id: 3,
    title: 'Controle de Estoque - Junho',
    description: 'Movimentação e status do inventário',
    type: 'Estoque',
    date: '2024-06-25',
    size: '1.2 MB',
    format: 'PDF'
  },
  {
    id: 4,
    title: 'Análise de Clientes - Semestral',
    description: 'Comportamento e preferências dos clientes',
    type: 'Clientes',
    date: '2024-06-20',
    size: '3.1 MB',
    format: 'PDF'
  }
];

export default function Relatorios() {
  const getTypeBadge = (type: string) => {
    const variants = {
      'Financeiro': 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary-light dark:border-primary/30',
      'Vendas': 'bg-success/10 text-success border-success/20 dark:bg-success/20 dark:text-success-light dark:border-success/30',
      'Estoque': 'bg-warning/10 text-warning border-warning/20 dark:bg-warning/20 dark:text-warning-light dark:border-warning/30',
      'Clientes': 'bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive-light dark:border-destructive/30'
    };
    
    return (
      <Badge variant="secondary" className={variants[type as keyof typeof variants]}>
        {type}
      </Badge>
    );
  };

  const getFormatIcon = (format: string) => {
    return format === 'PDF' ? (
      <FileText className="w-4 h-4 text-destructive dark:text-destructive-light" />
    ) : (
      <BarChart3 className="w-4 h-4 text-success dark:text-success-light" />
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios e Analytics</h1>
            <p className="text-foreground-muted dark:text-foreground-secondary">Análises detalhadas do desempenho da chiparia</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
              <Calendar className="w-4 h-4 mr-2" />
              Período
            </Button>
            <Button className="btn-hero">
              <Download className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-primary dark:bg-primary/20 dark:border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-foreground opacity-90 dark:text-primary-light">Receita Total</p>
                  <p className="text-3xl font-bold text-primary-foreground dark:text-primary-light">R$ 28.000</p>
                  <p className="text-sm text-primary-foreground opacity-80 mt-1 dark:text-primary-light dark:opacity-90">Este mês</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary-foreground dark:text-primary-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-success dark:bg-success/20 dark:border-success/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-success-foreground opacity-90 dark:text-success-light">Vendas Realizadas</p>
                  <p className="text-3xl font-bold text-success-foreground dark:text-success-light">1.420</p>
                  <p className="text-sm text-success-foreground opacity-80 mt-1 dark:text-success-light dark:opacity-90">Este mês</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success-foreground dark:text-success-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warning/10 border-warning/20 dark:bg-warning/20 dark:border-warning/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warning dark:text-warning-light">Produtos Ativos</p>
                  <p className="text-3xl font-bold text-warning dark:text-warning-light">89</p>
                  <p className="text-sm text-warning opacity-80 mt-1 dark:text-warning-light dark:opacity-90">No estoque</p>
                </div>
                <Package className="w-8 h-8 text-warning dark:text-warning-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/10 border-destructive/20 dark:bg-destructive/20 dark:border-destructive/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive dark:text-destructive-light">Clientes Únicos</p>
                  <p className="text-3xl font-bold text-destructive dark:text-destructive-light">410</p>
                  <p className="text-sm text-destructive opacity-80 mt-1 dark:text-destructive-light dark:opacity-90">Este mês</p>
                </div>
                <Users className="w-8 h-8 text-destructive dark:text-destructive-light" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend Chart */}
        <Card className="dark:bg-card dark:border-card-border">
          <CardHeader>
            <CardTitle className="text-foreground">Evolução da Receita</CardTitle>
            <CardDescription className="dark:text-foreground-secondary">Performance dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30 dark:opacity-40" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground-muted))" />
                  <YAxis stroke="hsl(var(--foreground-muted))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="receita" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={3}
                    name="Receita (R$)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Report Generation Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dark:bg-card dark:border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground">Gerar Novo Relatório</CardTitle>
              <CardDescription className="dark:text-foreground-secondary">Crie relatórios personalizados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <DollarSign className="w-6 h-6 dark:text-primary-light" />
                  <span className="text-sm">Financeiro</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <TrendingUp className="w-6 h-6 dark:text-success-light" />
                  <span className="text-sm">Vendas</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <Package className="w-6 h-6 dark:text-warning-light" />
                  <span className="text-sm">Estoque</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <Users className="w-6 h-6 dark:text-destructive-light" />
                  <span className="text-sm">Clientes</span>
                </Button>
              </div>
              <Button className="w-full btn-hero">
                <BarChart3 className="w-4 h-4 mr-2" />
                Relatório Personalizado
              </Button>
            </CardContent>
          </Card>

          <Card className="dark:bg-card dark:border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground">Exportar Dados</CardTitle>
              <CardDescription className="dark:text-foreground-secondary">Baixe dados para análise externa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <FileText className="w-4 h-4 mr-2 dark:text-destructive-light" />
                  Exportar para PDF
                </Button>
                <Button variant="outline" className="w-full justify-start dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <BarChart3 className="w-4 h-4 mr-2 dark:text-success-light" />
                  Exportar para Excel
                </Button>
                <Button variant="outline" className="w-full justify-start dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                  <PieChart className="w-4 h-4 mr-2 dark:text-primary-light" />
                  Exportar para CSV
                </Button>
              </div>
              <Button className="w-full dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados Selecionados
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="dark:bg-card dark:border-card-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Relatórios Recentes</CardTitle>
                <CardDescription className="dark:text-foreground-secondary">Histórico de relatórios gerados</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div 
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-background/50 dark:bg-background-secondary/30 rounded-lg border border-card-border/50 dark:border-card-border hover:bg-background/80 dark:hover:bg-background-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      {getFormatIcon(report.format)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{report.title}</h4>
                      <p className="text-sm text-foreground-muted dark:text-foreground-secondary">{report.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-foreground-muted dark:text-foreground-secondary">{report.date}</span>
                        <span className="text-xs text-foreground-muted dark:text-foreground-secondary">{report.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {getTypeBadge(report.type)}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="dark:hover:bg-background-secondary/50 dark:text-foreground-secondary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="dark:hover:bg-background-secondary/50 dark:text-foreground-secondary">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
