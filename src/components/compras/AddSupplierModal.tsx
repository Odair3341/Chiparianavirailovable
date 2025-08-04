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
import { Package } from 'lucide-react';
import { toast } from 'sonner';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: 'ativo' | 'inativo';
}

const emptySupplier: Omit<Supplier, 'id' | 'status'> = {
  name: '',
  contact: '',
  phone: '',
  email: '',
};

interface AddSupplierModalProps {
  onAddSupplier: (supplier: Omit<Supplier, 'id' | 'status'>) => void;
}

export function AddSupplierModal({ onAddSupplier }: AddSupplierModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState(emptySupplier);

  const handleChange = (field: keyof typeof emptySupplier, value: string) => {
    setNewSupplier(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.contact) {
      toast.error("Por favor, preencha pelo menos o nome e o contato.");
      return;
    }
    onAddSupplier(newSupplier);
    setNewSupplier(emptySupplier);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Package className="w-4 h-4 mr-2" />
          Novo Fornecedor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] dark:bg-card dark:border-card-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Adicionar Novo Fornecedor</DialogTitle>
          <DialogDescription className="dark:text-foreground-secondary">
            Preencha as informações do novo fornecedor para adicioná-lo à sua lista.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome do Fornecedor</label>
              <Input value={newSupplier.name} onChange={e => handleChange('name', e.target.value)} placeholder="Ex: Distribuidora de Frios" className="dark:bg-background-secondary/50 dark:border-card-border dark:placeholder:text-foreground-muted" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome do Contato</label>
              <Input value={newSupplier.contact} onChange={e => handleChange('contact', e.target.value)} placeholder="Ex: Carlos Pereira" className="dark:bg-background-secondary/50 dark:border-card-border dark:placeholder:text-foreground-muted" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Telefone</label>
              <Input value={newSupplier.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="(XX) XXXXX-XXXX" className="dark:bg-background-secondary/50 dark:border-card-border dark:placeholder:text-foreground-muted" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input value={newSupplier.email} type="email" onChange={e => handleChange('email', e.target.value)} placeholder="contato@fornecedor.com" className="dark:bg-background-secondary/50 dark:border-card-border dark:placeholder:text-foreground-muted" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="dark:border-card-border dark:text-foreground-secondary dark:hover:bg-background-secondary/50">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="btn-hero">Salvar Fornecedor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}