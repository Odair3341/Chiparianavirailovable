import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { date: '01/12', vendas: 850, receita: 2400 },
  { date: '02/12', vendas: 920, receita: 2800 },
  { date: '03/12', vendas: 780, receita: 2200 },
  { date: '04/12', vendas: 1100, receita: 3200 },
  { date: '05/12', vendas: 950, receita: 2900 },
  { date: '06/12', vendas: 1250, receita: 3600 },
  { date: '07/12', vendas: 1180, receita: 3400 },
];

export function SalesChart() {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="text-foreground">Vendas dos Últimos 7 Dias</CardTitle>
        <CardDescription>
          Acompanhamento diário de vendas e receita
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-foreground-muted"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-foreground-muted"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line 
                type="monotone" 
                dataKey="receita" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                name="Receita (R$)"
              />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--success))', strokeWidth: 2 }}
                name="Vendas (qtd)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}