# 🔍 **Como Encontrar CORS no Supabase - Guia Visual**

## 📍 **Passo a Passo Detalhado:**

### 1️⃣ **Acesse seu Dashboard do Supabase**
- Vá para: https://supabase.com/dashboard
- Faça login na sua conta
- Selecione seu projeto

### 2️⃣ **Navegue até Settings (Configurações)**
- No menu lateral esquerdo, procure por **"Settings"** ou **"Configurações"**
- Clique nesta opção

### 3️⃣ **Encontre a seção API**
- Dentro de Settings, procure por **"API"**
- Clique em **"API"**

### 4️⃣ **Role a página para baixo**
- ⚠️ **IMPORTANTE**: A seção CORS NÃO fica no topo da página
- Role para baixo até encontrar a seção **"CORS"**
- Pode estar com o título:
  - **"CORS"** (em inglês)
  - **"Cross-Origin Resource Sharing"**
  - **"Origens Permitidas"** (se estiver em português)

### 5️⃣ **Localize o campo correto**
Procure por um campo com um dos seguintes nomes:
- **"Additional allowed origins"**
- **"Origens adicionais permitidas"**
- **"Allowed Origins"**
- **"URLs permitidas"**

### 6️⃣ **Adicione os domínios**
No campo encontrado, adicione estas duas URLs (uma por linha):
```
https://chiparianavirai.netlify.app
http://localhost:8080
```

### 7️⃣ **Salve as alterações**
- Clique em **"Save"** ou **"Salvar"**
- Aguarde a confirmação

---

## 🆘 **Se ainda não conseguir encontrar:**

### **Opção 1: Mude o idioma**
1. No canto superior direito, procure por configurações de idioma
2. Mude para inglês temporariamente
3. Procure por "Settings" → "API" → role para baixo → "CORS"

### **Opção 2: Use a busca**
1. Pressione `Ctrl + F` (Windows) ou `Cmd + F` (Mac)
2. Procure por: **"CORS"** ou **"origins"**

### **Opção 3: URL direta**
Tente acessar diretamente:
```
https://supabase.com/dashboard/project/[SEU_PROJECT_ID]/settings/api
```

### **Opção 4: Verifique se está na aba correta**
- Certifique-se de estar em **"Settings"** (não "Database" ou "Auth")
- Dentro de Settings, certifique-se de estar em **"API"** (não "General" ou "Billing")

---

## ✅ **Como saber se deu certo:**
- Você deve ver os dois domínios listados no campo CORS
- Deve aparecer uma mensagem de confirmação após salvar
- O status deve mostrar "Saved" ou "Salvo"

---

## 🔧 **Configuração alternativa via código:**
Se ainda assim não conseguir, você pode configurar CORS diretamente no seu código React:

```typescript
// No arquivo src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
```

**Mas é melhor configurar no painel do Supabase!** 🎯