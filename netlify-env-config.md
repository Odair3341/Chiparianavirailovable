# Configurações do Netlify para Supabase

## Variáveis de Ambiente para o Netlify

Para configurar o Supabase no Netlify, você precisa adicionar as seguintes variáveis de ambiente no painel do Netlify:

### 1. Acesse o painel do Netlify:
- Vá para https://app.netlify.com
- Selecione seu site
- Vá em **Site settings** > **Environment variables**

### 2. Adicione as seguintes variáveis:

```
VITE_SUPABASE_URL=https://hdqigvjlttnomaeinywf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWlndmpsdHRub21hZWlueXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjc3MTgsImV4cCI6MjA2OTkwMzcxOH0.KK4ZooIq8--snWgfg0_GWU6Z2B-1z505S6JvbZyepvI
```

### 3. Configuração no código:

Crie um arquivo `.env.local` para desenvolvimento local:

```env
VITE_SUPABASE_URL=https://hdqigvjlttnomaeinywf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcWlndmpsdHRub21hZWlueXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjc3MTgsImV4cCI6MjA2OTkwMzcxOH0.KK4ZooIq8--snWgfg0_GWU6Z2B-1z505S6JvbZyepvI
```

### 4. Uso no código:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 5. Configuração de CORS no Supabase:

No painel do Supabase, vá em:
- **Settings** > **API** > **CORS**
- Adicione o domínio do seu site Netlify (ex: `https://seu-site.netlify.app`)

### 6. Redeploy:

Após adicionar as variáveis de ambiente, faça um redeploy do site no Netlify para que as configurações sejam aplicadas.

## Observações Importantes:

- As variáveis devem começar com `VITE_` para serem acessíveis no frontend
- Nunca commite arquivos `.env` no Git (já está no .gitignore)
- As variáveis do Netlify sobrescrevem as variáveis locais em produção
- Certifique-se de que o domínio do Netlify está configurado no CORS do Supabase