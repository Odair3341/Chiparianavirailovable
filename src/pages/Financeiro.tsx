import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Plus,
  Download,
  Filter,
  CreditCard,
  PiggyBank
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Line, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jan', receita: 15000, despesa: 8000, lucro: 7000 },
  { month: 'Fev', receita: 18000, despesa: 9500, lucro: 8500 },
  { month: 'Mar', receita: 22000, despesa: 11000, lucro: 11000 },
  { month: 'Abr', receita: 20000, despesa: 10500, lucro: 9500 },
  { month: 'Mai', receita: 25000, despesa: 12000, lucro: 13000 },
  { month: 'Jun', receita: 28000, despesa: 13500, lucro: 14500 },
];

const expenseData = [
  { name: 'Produtos', value: 8500, color: '#3B82F6' },
  { name: 'Funcionários', value: 3200, color: '#10B981' },
  { name: 'Aluguel', value: 2000, color: '#F59E0B' },
  { name: 'Energia', value: 800, color: '#EF4444' },
  { name: 'Outros', value: 1500, color: '#8B5CF6' },
];

const transactions = [
  {
    id: 1,
    type: 'receita',
    description: 'Vendas do dia',
    amount: 3247.50,
    date: '2024-01-05',
    category: 'Vendas',
    status: 'concluído'
  },
  {
    id: 2,
    type: 'despesa',
    description: 'Compra de ingredientes',
    amount: -1200.00,
    date: '2024-01-05',
    category: 'Fornecedores',
    status: 'concluído'
  },
  {
    id: 3,
    type: 'despesa',
    description: 'Conta de energia',
    amount: -450.00,
    date: '2024-01-04',
    category: 'Utilidades',
    status: 'pendente'
  },
  {
    id: 4,
    type: 'receita',
    description: 'Vendas do dia anterior',
    amount: 2890.00,
    date: '2024-01-04',
    category: 'Vendas',
    status: 'concluído'
  },
  {
    id: 5,
    type: 'despesa',
    description: 'Aluguel',
    amount: -2000.00,
    date: '2024-01-01',
    category: 'Fixos',
    status: 'concluído'
  }
];

export default function Financeiro() {
  const totalReceita = monthlyData[monthlyData.length - 1].receita;
  const totalDespesa = monthlyData[monthlyData.length - 1].despesa;
  const lucroLiquido = totalReceita - totalDespesa;
  const margemLucro = ((lucroLiquido / totalReceita) * 100).toFixed(1);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
            <p className="text-foreground-muted dark:text-foreground-secondary">Controle completo das finanças da chiparia</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50"
              onClick={() => console.log("Exportar clicked")}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button 
              className="btn-hero"
              onClick={() => console.log("Nova Transação clicked")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-success dark:bg-success/30 dark:border-success/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-success-foreground opacity-90 dark:text-success-light">Receita Mensal</p>
                  <p className="text-3xl font-bold text-success-foreground dark:text-success-light">R$ {totalReceita.toLocaleString()}</p>
                  <p className="text-sm text-success-foreground opacity-80 mt-1 dark:text-success-light dark:opacity-90">+12.5% vs mês anterior</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success-foreground dark:text-success-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/10 border-destructive/20 dark:bg-destructive/30 dark:border-destructive/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-destructive dark:text-destructive-light">Despesas Mensais</p>
                  <p className="text-3xl font-bold text-destructive dark:text-destructive-light">R$ {totalDespesa.toLocaleString()}</p>
                  <p className="text-sm text-destructive opacity-80 mt-1 dark:text-destructive-light dark:opacity-90">+5.2% vs mês anterior</p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive dark:text-destructive-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-primary dark:bg-primary/30 dark:border-primary/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-foreground opacity-90 dark:text-primary-light">Lucro Líquido</p>
                  <p className="text-3xl font-bold text-primary-foreground dark:text-primary-light">R$ {lucroLiquido.toLocaleString()}</p>
                  <p className="text-sm text-primary-foreground opacity-80 mt-1 dark:text-primary-light dark:opacity-90">Margem: {margemLucro}%</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary-foreground dark:text-primary-light" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warning/10 border-warning/20 dark:bg-warning/30 dark:border-warning/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warning dark:text-warning-light">Fluxo de Caixa</p>
                  <p className="text-3xl font-bold text-warning dark:text-warning-light">R$ 8.450</p>
                  <p className="text-sm text-warning opacity-80 mt-1 dark:text-warning-light dark:opacity-90">Saldo atual</p>
                </div>
                <PiggyBank className="w-8 h-8 text-warning dark:text-warning-light" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Expenses Chart */}
          <Card className="card-gradient dark:bg-background dark:border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground">Receitas vs Despesas</CardTitle>
              <CardDescription className="dark:text-foreground-secondary">Comparativo mensal dos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30 dark:opacity-50" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground-secondary))" className="dark:stroke-foreground" />
                    <YAxis stroke="hsl(var(--foreground-secondary))" className="dark:stroke-foreground" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Legend wrapperStyle={{ color: 'hsl(var(--foreground-secondary))' }} className="dark:text-foreground" />
                    <Bar dataKey="receita" fill="hsl(var(--success))" name="Receita" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="despesa" fill="hsl(var(--destructive))" name="Despesa" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="lucro" name="Lucro" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--primary))' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Distribution */}
          <Card className="card-gradient dark:bg-background dark:border-card-border">
            <CardHeader>
              <CardTitle className="text-foreground">Distribuição de Despesas</CardTitle>
              <CardDescription className="dark:text-foreground-secondary">Categorias de gastos do mês atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      labelStyle={{ fill: 'hsl(var(--foreground))', fontSize: '12px', fontWeight: '500' }}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`R$ ${value}`, 'Valor']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="card-gradient dark:bg-background dark:border-card-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Transações Recentes</CardTitle>
                <CardDescription className="dark:text-foreground-secondary">Últimas movimentações financeiras</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50"
                  onClick={() => console.log("Filtrar clicked")}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50"
                  onClick={() => console.log("Período clicked")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Período
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-card dark:bg-background-tertiary rounded-lg border border-card-border dark:border-card-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'receita' 
                        ? 'bg-success/20 dark:bg-success/30' 
                        : 'bg-destructive/20 dark:bg-destructive/30'
                    }`}>
                      {transaction.type === 'receita' ? (
                        <TrendingUp className="w-5 h-5 text-success dark:text-success-light" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-destructive dark:text-destructive-light" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{transaction.description}</h4>
                      <p className="text-sm text-foreground-muted dark:text-foreground-secondary">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'receita' 
                          ? 'text-success dark:text-success-light' 
                          : 'text-destructive dark:text-destructive-light'
                      }`}>
                        {transaction.type === 'receita' ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                    
                    <Badge 
                      variant={transaction.status === 'concluído' ? 'secondary' : 'destructive'}
                      className={transaction.status === 'concluído' 
                        ? 'dark:bg-success/30 dark:text-success-light dark:border-success/50' 
                        : 'dark:bg-destructive/30 dark:text-destructive-light dark:border-destructive/50'}
                    >
                      {transaction.status}
                    </Badge>
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