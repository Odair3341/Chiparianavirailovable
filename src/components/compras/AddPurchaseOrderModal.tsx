import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface PurchaseOrder {
  id: number;
  supplierId: number;
  supplierName: string;
  date: string;
  expectedDelivery: string;
  total: number;
  status: 'pendente' | 'aprovado' | 'entregue' | 'cancelado';
  items: number;
}

const emptyOrder: Omit<PurchaseOrder, 'id' | 'status' | 'supplierName'> = {
  supplierId: 0,
  date: '',
  expectedDelivery: '',
  total: 0,
  items: 0,
};

interface AddPurchaseOrderModalProps {
  onAddOrder: (order: Omit<PurchaseOrder, 'id' | 'status' | 'supplierName'>) => void;
}

export function AddPurchaseOrderModal({ onAddOrder }: AddPurchaseOrderModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newOrder, setNewOrder] = useState(emptyOrder);

  const handleChange = (field: keyof typeof emptyOrder, value: string | number) => {
    setNewOrder(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.supplierId || !newOrder.date) {
      toast.error("Por favor, preencha pelo menos o fornecedor e a data.");
      return;
    }
    onAddOrder(newOrder);
    setNewOrder(emptyOrder);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Novo Pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] dark:bg-card dark:border-card-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Adicionar Novo Pedido</DialogTitle>
          <DialogDescription className="dark:text-foreground-secondary">
            Preencha as informações do novo pedido de compra.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">ID do Fornecedor</label>
              <Input value={newOrder.supplierId} type="number" onChange={e => handleChange('supplierId', Number(e.target.value))} className="dark:bg-background-secondary/50 dark:border-card-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Data do Pedido</label>
              <Input value={newOrder.date} type="date" onChange={e => handleChange('date', e.target.value)} className="dark:bg-background-secondary/50 dark:border-card-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Previsão de Entrega</label>
              <Input value={newOrder.expectedDelivery} type="date" onChange={e => handleChange('expectedDelivery', e.target.value)} className="dark:bg-background-secondary/50 dark:border-card-border" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Total de Itens</label>
              <Input value={newOrder.items} type="number" onChange={e => handleChange('items', Number(e.target.value))} className="dark:bg-background-secondary/50 dark:border-card-border" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Valor Total (R$)</label>
              <Input value={newOrder.total} type="number" step="0.01" onChange={e => handleChange('total', Number(e.target.value))} className="dark:bg-background-secondary/50 dark:border-card-border" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="btn-hero">Salvar Pedido</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
