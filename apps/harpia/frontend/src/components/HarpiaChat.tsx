import { useEffect, useState, useCallback } from 'react'

// Tipos para o ChatKit
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatSession {
  clientSecret: string
  sessionId: string
}

export function HarpiaChat() {
  const [session, setSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Busca sessão do backend
  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) throw new Error('Falha ao criar sessão')

      const data = await response.json()
      setSession(data)

      // Mensagem de boas-vindas
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Olá! Sou o Harpia 🦅

Eu descubro se as IAs recomendam sua empresa — e se não recomendam, eu resolvo.

**Para começar, me diga:**
- Nome da sua empresa
- URL do site

Exemplo: "Minha empresa é a TechSolutions, site techsolutions.com.br"`,
        timestamp: new Date()
      }])

    } catch (err) {
      setError('Erro ao conectar. Tente novamente.')
      console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  // Envia mensagem
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Envia para o backend ChatKit
      const response = await fetch('/chatkit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'chatkit_beta=v1'
        },
        body: JSON.stringify({
          message: inputValue,
          session_id: session?.sessionId
        })
      })

      if (!response.ok) throw new Error('Erro ao processar mensagem')

      // Lê stream de resposta
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      // Adiciona mensagem do assistente vazia
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          assistantContent += chunk

          // Atualiza mensagem do assistente
          setMessages(prev => prev.map(msg =>
            msg.id === assistantMessage.id
              ? { ...msg, content: assistantContent }
              : msg
          ))
        }
      }

    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Desculpe, houve um erro. Pode tentar novamente?',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Render de mensagem
  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user'

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-harpia-blue text-white rounded-br-md'
              : 'bg-harpia-dark border border-harpia-gray/20 rounded-bl-md'
          }`}
        >
          {/* Avatar para assistente */}
          {!isUser && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-harpia-gray/20">
              <span className="text-lg">🦅</span>
              <span className="text-sm font-medium text-harpia-blue">Harpia</span>
            </div>
          )}

          {/* Conteúdo com suporte a markdown básico */}
          <div
            className="prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br />')
            }}
          />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-harpia-red mb-4">{error}</p>
          <button
            onClick={fetchSession}
            className="harpia-btn-primary"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.map(renderMessage)}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-harpia-dark border border-harpia-gray/20 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🦅</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-harpia-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-harpia-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-harpia-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input área */}
      <div className="border-t border-harpia-gray/20 pt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-harpia-dark border border-harpia-gray/30 rounded-xl px-4 py-3 text-white placeholder-harpia-gray focus:outline-none focus:border-harpia-blue transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="harpia-btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '🚀'}
          </button>
        </div>
        <p className="text-xs text-harpia-gray text-center mt-2">
          Pressione Enter para enviar
        </p>
      </div>
    </div>
  )
}
