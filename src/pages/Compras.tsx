import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddSupplierModal } from '@/components/compras/AddSupplierModal';
import { AddPurchaseOrderModal } from '@/components/compras/AddPurchaseOrderModal';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Package,
  Truck,
  Calendar,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: 'ativo' | 'inativo';
}

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

const suppliers: Supplier[] = [
  {
    id: 1,
    name: 'Distribuidora ABC',
    contact: 'João Silva',
    phone: '(11) 9999-9999',
    email: 'joao@distribuidoraabc.com',
    status: 'ativo'
  },
  {
    id: 2,
    name: 'Frigorífico Local',
    contact: 'Maria Santos',
    phone: '(11) 8888-8888',
    email: 'maria@frigorifico.com',
    status: 'ativo'
  },
  {
    id: 3,
    name: 'Bebidas XYZ',
    contact: 'Pedro Costa',
    phone: '(11) 7777-7777',
    email: 'pedro@bebidasxyz.com',
    status: 'ativo'
  }
];

const purchaseOrders: PurchaseOrder[] = [
  {
    id: 1,
    supplierId: 1,
    supplierName: 'Distribuidora ABC',
    date: '2024-01-05',
    expectedDelivery: '2024-01-08',
    total: 1500.00,
    status: 'pendente',
    items: 5
  },
  {
    id: 2,
    supplierId: 2,
    supplierName: 'Frigorífico Local',
    date: '2024-01-04',
    expectedDelivery: '2024-01-07',
    total: 850.00,
    status: 'aprovado',
    items: 3
  },
  {
    id: 3,
    supplierId: 3,
    supplierName: 'Bebidas XYZ',
    date: '2024-01-03',
    expectedDelivery: '2024-01-06',
    total: 450.00,
    status: 'entregue',
    items: 2
  }
];

export default function Compras() {
  const getStatusBadge = (status: string) => {
    const variants = {
      'pendente': 'bg-warning/10 text-warning border-warning/20',
      'aprovado': 'bg-primary/10 text-primary border-primary/20',
      'entregue': 'bg-success/10 text-success border-success/20',
      'cancelado': 'bg-destructive/10 text-destructive border-destructive/20',
      'ativo': 'bg-success/10 text-success border-success/20',
      'inativo': 'bg-destructive/10 text-destructive border-destructive/20'
    };
    
    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const [purchaseOrdersState, setPurchaseOrdersState] = useState<PurchaseOrder[]>(purchaseOrders);
  const totalPedidos = purchaseOrdersState.length;
  const pedidosPendentes = purchaseOrdersState.filter(p => p.status === 'pendente').length;
  const valorTotal = purchaseOrdersState.reduce((sum, p) => sum + p.total, 0);
  const [suppliersState, setSuppliersState] = useState<Supplier[]>(suppliers);

  const handleAddSupplier = (newSupplierData: Omit<Supplier, 'id' | 'status'>) => {
    setSuppliersState(prevData => [
      ...prevData,
      { ...newSupplierData, id: Date.now(), status: 'ativo' }
    ]);
  };

  const handleAddOrder = (newOrderData: Omit<PurchaseOrder, 'id' | 'status' | 'supplierName'>) => {
    const supplier = suppliersState.find(s => s.id === newOrderData.supplierId);
    if (supplier) {
      setPurchaseOrdersState(prevData => [
        ...prevData,
        { ...newOrderData, id: Date.now(), status: 'pendente', supplierName: supplier.name }
      ]);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Módulo de Compras</h1>
            <p className="text-foreground-muted">Gerencie fornecedores e pedidos de compra</p>
          </div>
          <div className="flex gap-3">
            <AddSupplierModal onAddSupplier={handleAddSupplier} />
            <AddPurchaseOrderModal onAddOrder={handleAddOrder} />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground-muted">Total de Pedidos</p>
                  <p className="text-3xl font-bold text-foreground">{totalPedidos}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warning">Pedidos Pendentes</p>
                  <p className="text-3xl font-bold text-warning">{pedidosPendentes}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-foreground opacity-90">Valor Total</p>
                  <p className="text-3xl font-bold text-primary-foreground">R$ {valorTotal.toFixed(2)}</p>
                </div>
                <Truck className="w-8 h-8 text-primary-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pedidos de Compra</CardTitle>
                <CardDescription>Histórico e status dos pedidos</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Período
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                <Input
                  placeholder="Buscar pedidos..."
                  className="pl-10"
                />
              </div>

              <div className="rounded-lg border border-card-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-background-secondary">
                      <TableHead>Pedido #</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Data Pedido</TableHead>
                      <TableHead>Entrega Prevista</TableHead>
                      <TableHead>Itens</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrdersState.map((order) => (
                      <TableRow key={order.id} className="hover:bg-background-secondary/50">
                        <TableCell className="font-medium">#{order.id.toString().padStart(4, '0')}</TableCell>
                        <TableCell>{order.supplierName}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(order.expectedDelivery).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{order.items} itens</TableCell>
                        <TableCell className="font-mono">R$ {order.total.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {order.status === 'aprovado' && (
                              <Button size="sm" variant="ghost" className="text-success">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle>Fornecedores Cadastrados</CardTitle>
            <CardDescription>Lista de fornecedores ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliersState.map((supplier) => (
                <div 
                  key={supplier.id}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-card-border/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{supplier.name}</h4>
                        <p className="text-sm text-foreground-muted">{supplier.contact} • {supplier.phone}</p>
                        <p className="text-xs text-foreground-muted">{supplier.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {getStatusBadge(supplier.status)}
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
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
