import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, TrendingUp, TrendingDown } from 'lucide-react';

const topProducts = [
  {
    id: 1,
    name: 'Batata Frita Grande',
    category: 'Porções',
    sales: 145,
    revenue: 2175,
    trend: 'up',
    trendValue: '+12%',
    stock: 'Disponível'
  },
  {
    id: 2,
    name: 'Pastel de Carne',
    category: 'Pastéis',
    sales: 89,
    revenue: 1335,
    trend: 'up',
    trendValue: '+8%',
    stock: 'Disponível'
  },
  {
    id: 3,
    name: 'Refrigerante Lata',
    category: 'Bebidas',
    sales: 67,
    revenue: 335,
    trend: 'down',
    trendValue: '-3%',
    stock: 'Baixo'
  },
  {
    id: 4,
    name: 'Mandioca Frita',
    category: 'Porções',
    sales: 52,
    revenue: 780,
    trend: 'up',
    trendValue: '+15%',
    stock: 'Disponível'
  },
  {
    id: 5,
    name: 'Pastel de Queijo',
    category: 'Pastéis',
    sales: 43,
    revenue: 645,
    trend: 'up',
    trendValue: '+5%',
    stock: 'Disponível'
  }
];

export function ProductsTable() {
  const getStockBadge = (stock: string) => {
    switch (stock) {
      case 'Disponível':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Disponível</Badge>;
      case 'Baixo':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Baixo</Badge>;
      case 'Indisponível':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Indisponível</Badge>;
      default:
        return <Badge variant="secondary">{stock}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-foreground">Top Produtos</CardTitle>
        <CardDescription>
          Produtos mais vendidos hoje
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div 
              key={product.id}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-card-border/50 hover:bg-background/80 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-medium text-foreground">{product.name}</h4>
                    <p className="text-sm text-foreground-muted">{product.category}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-foreground-muted">Vendas</p>
                  <p className="font-semibold text-foreground">{product.sales}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-foreground-muted">Receita</p>
                  <p className="font-semibold text-foreground">R$ {product.revenue}</p>
                </div>
                
                <div className="flex items-center gap-1">
                  {getTrendIcon(product.trend)}
                  <span className={`text-sm font-medium ${
                    product.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {product.trendValue}
                  </span>
                </div>
                
                {getStockBadge(product.stock)}
                
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}