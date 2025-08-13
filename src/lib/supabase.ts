import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  // Configuração para resolver CORS
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    },
  },
})

// Tipos para o banco de dados
export interface Database {
  public: {
    Tables: {
      // Adicione suas tabelas aqui conforme necessário
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Função de teste de conexão
export const testSupabaseConnection = async () => {
  try {
    // Teste simples de conexão
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (error && error.code !== 'PGRST116') {
      console.log('❌ Erro de conexão:', error.message)
      return false
    }
    
    console.log('✅ Supabase conectado com sucesso!')
    return true
  } catch (err) {
    console.log('❌ Erro de rede:', err)
    return false
  }
}