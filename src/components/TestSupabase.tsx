import { useState } from 'react'
import { testSupabaseConnection } from '../lib/supabase'

export function TestSupabase() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleTest = async () => {
    setIsLoading(true)
    setResult(null)
    
    try {
      const isConnected = await testSupabaseConnection()
      setResult(isConnected ? '✅ Supabase conectado com sucesso!' : '❌ Erro de conexão')
    } catch (error) {
      setResult('❌ Erro ao testar conexão')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">🧪 Teste de Conexão Supabase</h3>
      
      <button 
        onClick={handleTest}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '⏳ Testando...' : '🧪 Testar Conexão'}
      </button>
      
      {result && (
        <div className={`mt-3 p-3 rounded ${
          result.includes('✅') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {result}
        </div>
      )}
      
      <div className="mt-3 text-sm text-gray-600">
        <p><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</p>
        <p><strong>Status:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '🔑 API Key configurada' : '❌ API Key não encontrada'}</p>
      </div>
    </div>
  )
}