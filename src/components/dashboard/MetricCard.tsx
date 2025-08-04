import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'default',
  className 
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'card-primary';
      case 'success':
        return 'card-success';
      case 'warning':
        return 'bg-gradient-to-br from-warning to-warning-dark text-warning-foreground shadow-lg';
      case 'destructive':
        return 'bg-gradient-to-br from-destructive to-destructive-dark text-destructive-foreground shadow-lg';
      default:
        return '';
    }
  };

  const getChangeStyles = () => {
    if (!change) return '';
    
    switch (change.type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-foreground-muted';
    }
  };

  const isColoredVariant = variant !== 'default';

  return (
    <Card className={cn(
      'transition-all duration-300 hover:scale-105 hover:shadow-lg border-0',
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              isColoredVariant ? "text-inherit opacity-90" : "text-foreground-muted"
            )}>
              {title}
            </p>
            <p className={cn(
              "text-3xl font-bold tracking-tight",
              isColoredVariant ? "text-inherit" : "text-foreground"
            )}>
              {value}
            </p>
            {change && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isColoredVariant ? "text-inherit opacity-90" : getChangeStyles()
              )}>
                <span>{change.value}</span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
            isColoredVariant 
              ? "bg-white/20 backdrop-blur-sm" 
              : "bg-primary/10 text-primary"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              isColoredVariant ? "text-inherit" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
