# Guia Completo de Configuração do Supabase

## 🔧 Configuração do CORS no Supabase

### Passo a Passo:

1. **Acesse o painel do Supabase:**
   - Vá para https://supabase.com/dashboard
   - Faça login na sua conta
   - Selecione seu projeto `hdqigvjlttnomaeinywf`

2. **Navegue até as configurações de API:**
   - No menu lateral esquerdo, clique em **"Settings"** (Configurações)
   - Clique em **"API"**

3. **Configure o CORS:**
   - Role a página até encontrar a seção **"CORS"**
   - No campo **"Additional allowed origins"**, adicione:
     ```
     https://seu-site.netlify.app
     http://localhost:8080
     ```
   - Substitua `seu-site.netlify.app` pelo domínio real do seu site no Netlify
   - Clique em **"Save"** para salvar as configurações

### 📍 Localização Exata no Painel:
```
Dashboard → Settings → API → CORS → Additional allowed origins
```

---

## 🗄️ Criação de Tabelas no SQL Editor

### Sim, você precisa criar as tabelas! Aqui está como:

1. **Acesse o SQL Editor:**
   - No menu lateral esquerdo, clique em **"SQL Editor"**
   - Ou vá direto para: `https://supabase.com/dashboard/project/hdqigvjlttnomaeinywf/sql`

2. **Crie as tabelas básicas para o sistema:**

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  cost_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  barcode VARCHAR(100) UNIQUE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de fornecedores
CREATE TABLE suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  cnpj VARCHAR(18),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de vendas
CREATE TABLE sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens da venda
CREATE TABLE sale_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos de compra
CREATE TABLE purchase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID REFERENCES suppliers(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  order_date DATE NOT NULL,
  expected_delivery DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens do pedido de compra
CREATE TABLE purchase_order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. **Execute o SQL:**
   - Cole o código SQL acima no editor
   - Clique em **"Run"** para executar
   - Verifique se todas as tabelas foram criadas sem erros

---

## 🔐 Configuração de RLS (Row Level Security)

### Ative a segurança para as tabelas:

```sql
-- Ativar RLS para todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ajuste conforme necessário)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON suppliers
  FOR SELECT USING (true);

CREATE POLICY "Users can view own sales" ON sales
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 📊 Verificação Final

### Após criar as tabelas, verifique:

1. **No painel do Supabase:**
   - Vá em **"Table Editor"**
   - Confirme que todas as tabelas aparecem na lista

2. **Teste a conexão:**
   - Use o código que criamos em `src/lib/supabase.ts`
   - Faça uma consulta simples para testar

### Exemplo de teste:
```typescript
import { supabase } from '@/lib/supabase'

// Teste básico
const testConnection = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1)
  
  if (error) {
    console.error('Erro na conexão:', error)
  } else {
    console.log('Conexão OK:', data)
  }
}
```

---

## ✅ Checklist Final

- [ ] CORS configurado no Supabase
- [ ] Tabelas criadas no SQL Editor
- [ ] RLS ativado e políticas configuradas
- [ ] Variáveis de ambiente no Netlify
- [ ] Teste de conexão realizado
- [ ] Deploy no Netlify funcionando

**Agora seu sistema está pronto para usar o Supabase como banco de dados!**