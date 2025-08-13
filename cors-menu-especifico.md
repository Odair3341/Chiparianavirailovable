# 🎯 **CORS no Supabase - Baseado no seu Menu**

Vejo que você está em **Settings** mas não encontrou CORS. Pelo menu que você mostrou, siga estes passos:

## 📍 **Caminho Correto:**

### 1️⃣ **Saia de "General"**
- Você está em: `Settings > Project Settings > General`
- Você precisa ir para: `Settings > Project Settings > API`

### 2️⃣ **Clique em "Data API"**
No menu lateral que você mostrou, procure por:
- **"Data API"** (essa é a seção correta!)
- OU **"API Keys"**

### 3️⃣ **Dentro de Data API:**
- Role a página para baixo
- Procure por uma seção chamada **"CORS"**
- Ou procure por **"Cross-Origin Resource Sharing"**

---

## 🔍 **Se não encontrar em Data API:**

### **Tente estas outras seções do menu:**
1. **"Configuration"** (role para baixo)
2. **"Database"** (procure por configurações avançadas)
3. **"Authentication"** (às vezes CORS fica aqui)

---

## 🆘 **Solução Alternativa - Via URL Direta:**

Tente acessar diretamente:
```
https://supabase.com/dashboard/project/hdqigvjlttnomaeinywf/settings/api
```

---

## 🛠️ **Configuração via Supabase CLI (Mais Fácil):**

Se continuar sem encontrar, use o terminal:

```bash
# 1. Instale o Supabase CLI
npm install -g supabase

# 2. Faça login
supabase login

# 3. Configure CORS diretamente
supabase projects api-settings --project-ref hdqigvjlttnomaeinywf --cors-origins "https://chiparianavirai.netlify.app,http://localhost:8080"
```

---

## 🎯 **Teste Rápido (Mais Importante):**

Antes de continuar procurando, vamos testar se já está funcionando:

### **Abra o console do navegador (F12) e cole:**
```javascript
fetch('https://hdqigvjlttnomaeinywf.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWlndmpsdHRub21hZWlueXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NzI4NzEsImV4cCI6MjA1MTI0ODg3MX0.VJJhKJGGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJG'
  }
})
.then(r => r.ok ? console.log('✅ FUNCIONANDO!') : console.log('❌ Erro CORS'))
.catch(e => console.log('❌ Erro:', e))
```

**Se aparecer "✅ FUNCIONANDO!"** = Não precisa configurar CORS!

---

## 🚀 **Configuração Temporária no Código:**

Enquanto resolve isso, adicione no seu `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hdqigvjlttnomaeinywf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWlndmpsdHRub21hZWlueXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NzI4NzEsImV4cCI6MjA1MTI0ODg3MX0.VJJhKJGGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJGJG'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Função de teste
export const testSupabase = async () => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1)
    console.log('✅ Supabase conectado!', { data, error })
    return true
  } catch (err) {
    console.log('❌ Erro de conexão:', err)
    return false
  }
}
```

---

## 📞 **Última Opção - Suporte Supabase:**

Se nada funcionar:
1. Vá para: https://supabase.com/support
2. Abra um ticket
3. Diga: "Não consigo encontrar configurações de CORS no painel"
4. Mencione seu Project ID: `hdqigvjlttnomaeinywf`

---

## ✅ **Resumo dos Próximos Passos:**

1. **Primeiro**: Teste no console se já está funcionando
2. **Se não funcionar**: Tente "Data API" no menu
3. **Se não encontrar**: Use Supabase CLI
4. **Enquanto isso**: Use a configuração temporária no código

**O importante é que sua aplicação funcione!** 🎯