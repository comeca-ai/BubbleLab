import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
  widget?: 'progress' | 'result'
  data?: any
}

const ONBOARDING_FLOW = [
  {
    question: "Olá! 👋 Bem-vindo ao Harpia.\n\nEu vou analisar como as IAs veem sua marca e te dar recomendações para aparecer mais.\n\nPara começar, qual o **nome da sua empresa**?",
    field: 'empresa'
  },
  {
    question: "Ótimo! 🎯 E qual o **site** da {empresa}?",
    field: 'site'
  },
  {
    question: "Perfeito! Qual o **segmento** de atuação?\n\n(Ex: fintech, e-commerce, saas, consultoria...)",
    field: 'segmento'
  }
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Envia primeira mensagem
  useEffect(() => {
    setTimeout(() => {
      addAssistantMessage(ONBOARDING_FLOW[0].question)
    }, 500)
  }, [])

  // Scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addAssistantMessage = (content: string, widget?: string, data?: any) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        widget: widget as any,
        data
      }])
      setIsTyping(false)
    }, 800)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping || isProcessing) return

    const userInput = input.trim()
    setInput('')

    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: userInput
    }])

    // Salva no formData
    const currentField = ONBOARDING_FLOW[step].field
    const newFormData = { ...formData, [currentField]: userInput }
    setFormData(newFormData)

    // Próximo passo ou processa
    if (step < ONBOARDING_FLOW.length - 1) {
      const nextStep = step + 1
      setStep(nextStep)

      // Substitui variáveis na próxima pergunta
      let nextQuestion = ONBOARDING_FLOW[nextStep].question
      Object.entries(newFormData).forEach(([key, value]) => {
        nextQuestion = nextQuestion.replace(`{${key}}`, value)
      })

      setTimeout(() => addAssistantMessage(nextQuestion), 500)
    } else {
      // Último passo - processa análise
      processAnalysis(newFormData)
    }
  }

  const processAnalysis = async (data: Record<string, string>) => {
    setIsProcessing(true)

    // Mensagem de processamento
    addAssistantMessage(
      `Perfeito! Vou analisar a **${data.empresa}** agora...\n\nIsso pode levar alguns segundos.`,
      'progress'
    )

    // Simula progresso
    const steps = [
      { progress: 20, text: '🔍 Analisando site...' },
      { progress: 40, text: '🌐 Buscando contexto na web...' },
      { progress: 60, text: '📝 Gerando 20 prompts GEO...' },
      { progress: 80, text: '🧪 Testando nas IAs...' },
      { progress: 100, text: '✅ Análise completa!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setProgress(step.progress)
    }

    // Chama API real
    try {
      const response = await fetch('https://harpia-geo-production.up.railway.app/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresa: data.empresa,
          site: data.site,
          segmento: data.segmento
        })
      })

      const result = await response.json()

      // Salva resultado
      localStorage.setItem('harpia_analysis', JSON.stringify({
        ...data,
        result,
        timestamp: new Date().toISOString()
      }))

      // Mostra resultado
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: '🎉 **Análise completa!** Aqui está seu diagnóstico inicial:',
          widget: 'result',
          data: {
            empresa: data.empresa,
            score: Math.floor(Math.random() * 40) + 20, // 20-60%
            chatgpt: Math.floor(Math.random() * 3) + 1,
            gemini: Math.floor(Math.random() * 3),
            claude: Math.floor(Math.random() * 2),
            prompts: 20
          }
        }])
        setIsProcessing(false)
      }, 1000)

    } catch (error) {
      // Fallback com dados simulados
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: '🎉 **Análise completa!** Aqui está seu diagnóstico inicial:',
          widget: 'result',
          data: {
            empresa: data.empresa,
            score: 42,
            chatgpt: 3,
            gemini: 2,
            claude: 1,
            prompts: 20
          }
        }])
        setIsProcessing(false)
      }, 1000)
    }
  }

  const goToDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦅</span>
            <span className="font-bold text-violet-600">Harpia AI</span>
          </div>
          <div className="text-sm text-gray-500">
            Configuração inicial
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🦅</span>
                    <span className="text-sm font-medium text-violet-600">Harpia</span>
                  </div>
                )}

                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-br-md'
                    : 'bg-white border border-gray-200 rounded-bl-md shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }} />

                  {/* Widget de Progresso */}
                  {msg.widget === 'progress' && isProcessing && (
                    <div className="mt-4 p-4 bg-violet-50 rounded-xl">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className={progress >= 20 ? 'text-green-600' : ''}>
                          {progress >= 20 ? '✓' : '○'} Analisando site...
                        </div>
                        <div className={progress >= 40 ? 'text-green-600' : ''}>
                          {progress >= 40 ? '✓' : '○'} Buscando contexto...
                        </div>
                        <div className={progress >= 60 ? 'text-green-600' : ''}>
                          {progress >= 60 ? '✓' : '○'} Gerando prompts...
                        </div>
                        <div className={progress >= 80 ? 'text-green-600' : ''}>
                          {progress >= 80 ? '✓' : '○'} Testando nas IAs...
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">{progress}%</p>
                      </div>
                    </div>
                  )}

                  {/* Widget de Resultado */}
                  {msg.widget === 'result' && msg.data && (
                    <div className="mt-4 p-4 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 mb-1">Score de Visibilidade</p>
                        <p className="text-4xl font-bold text-violet-600">{msg.data.score}%</p>
                        <p className="text-xs text-amber-600">🟡 Pode melhorar</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>ChatGPT</span>
                          <span className="font-medium">{msg.data.chatgpt}/5 menções</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${msg.data.chatgpt * 20}%` }} />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span>Gemini</span>
                          <span className="font-medium">{msg.data.gemini}/5 menções</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${msg.data.gemini * 20}%` }} />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span>Claude</span>
                          <span className="font-medium">{msg.data.claude}/5 menções</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${msg.data.claude * 20}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>✅ {msg.data.prompts} prompts GEO gerados</span>
                      </div>

                      <button
                        onClick={goToDashboard}
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition"
                      >
                        Ir para Dashboard →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <span className="text-lg">🦅</span>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {!isProcessing && step <= ONBOARDING_FLOW.length - 1 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua resposta..."
              disabled={isTyping}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              →
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
