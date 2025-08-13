import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Calculator,
  CreditCard,
  Banknote,
  Smartphone
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Batata Frita Grande', price: 15.00, category: 'Porções', stock: 50 },
  { id: 2, name: 'Batata Frita Média', price: 12.00, category: 'Porções', stock: 45 },
  { id: 3, name: 'Batata Frita Pequena', price: 8.00, category: 'Porções', stock: 60 },
  { id: 4, name: 'Mandioca Frita', price: 10.00, category: 'Porções', stock: 30 },
  { id: 5, name: 'Polenta Frita', price: 9.00, category: 'Porções', stock: 25 },
  { id: 6, name: 'Pastel de Carne', price: 7.50, category: 'Pastéis', stock: 40 },
  { id: 7, name: 'Pastel de Queijo', price: 6.50, category: 'Pastéis', stock: 35 },
  { id: 8, name: 'Pastel de Frango', price: 7.00, category: 'Pastéis', stock: 30 },
  { id: 9, name: 'Refrigerante Lata', price: 5.00, category: 'Bebidas', stock: 80 },
  { id: 10, name: 'Suco Natural', price: 8.00, category: 'Bebidas', stock: 20 },
  { id: 11, name: 'Água Mineral', price: 3.00, category: 'Bebidas', stock: 100 },
  { id: 12, name: 'Molho Especial', price: 2.00, category: 'Acompanhamentos', stock: 50 }
];

export default function PDV() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentReceived, setPaymentReceived] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setPaymentReceived('');
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const change = parseFloat(paymentReceived) - totalAmount;

  const finalizeSale = () => {
    if (cart.length === 0) return;
    
    // Aqui seria a lógica para finalizar a venda
    alert(`Venda finalizada!\nTotal: R$ ${totalAmount.toFixed(2)}\nTroco: R$ ${change > 0 ? change.toFixed(2) : '0,00'}`);
    clearCart();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">PDV - Ponto de Vendas</h1>
            <p className="text-foreground-muted">Sistema de vendas em tempo real</p>
          </div>
          <Button onClick={clearCart} variant="outline" className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Carrinho
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Grid */}
          <div className="lg:col-span-2 space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-md transition-all hover:scale-105"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-background-secondary rounded-lg mb-3 flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-foreground-muted" />
                    </div>
                    <h3 className="font-medium text-foreground text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-foreground-muted mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                      <Badge variant={product.stock > 10 ? "secondary" : "destructive"} className="text-xs">
                        {product.stock}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="space-y-4">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Carrinho ({totalItems} itens)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-foreground-muted py-8">
                    Carrinho vazio
                  </p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-foreground-muted">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Payment */}
            {cart.length > 0 && (
              <Card className="card-primary">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-primary-foreground">
                      <span>Subtotal:</span>
                      <span>R$ {totalAmount.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-primary-foreground/20" />
                    <div className="flex justify-between text-lg font-bold text-primary-foreground">
                      <span>Total:</span>
                      <span>R$ {totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-primary-foreground">Valor Recebido:</label>
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={paymentReceived}
                      onChange={(e) => setPaymentReceived(e.target.value)}
                      className="bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
                    />
                    {change > 0 && (
                      <p className="text-sm text-primary-foreground">
                        Troco: <span className="font-bold">R$ {change.toFixed(2)}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-primary-foreground">Forma de Pagamento:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => console.log("Dinheiro payment selected")}
                      >
                        <Banknote className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => console.log("Cartão payment selected")}
                      >
                        <CreditCard className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => console.log("PIX payment selected")}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={finalizeSale}
                    className="w-full bg-white text-primary hover:bg-white/90"
                    disabled={cart.length === 0}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Finalizar Venda
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
