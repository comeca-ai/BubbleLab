import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface AnalysisData {
  empresa: string
  site: string
  segmento: string
  result?: any
  timestamp: string
}

interface LLMScore {
  chatgpt: number
  gemini: number
  claude: number
  perplexity: number
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'prompts' | 'alerts'>('overview')
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [scores, setScores] = useState<LLMScore>({ chatgpt: 3, gemini: 2, claude: 1, perplexity: 2 })
  const [overallScore, setOverallScore] = useState(42)

  useEffect(() => {
    // Carrega análise do localStorage (salva pelo OnboardingPage)
    const saved = localStorage.getItem('harpia_analysis')
    if (saved) {
      const data = JSON.parse(saved)
      setAnalysis(data)
      // Usa scores reais se disponíveis
      if (data.result) {
        setScores({
          chatgpt: data.result.chatgpt || 3,
          gemini: data.result.gemini || 2,
          claude: data.result.claude || 1,
          perplexity: data.result.perplexity || 2
        })
        setOverallScore(data.result.score || 42)
      }
    }
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Bom'
    if (score >= 40) return 'Regular'
    return 'Precisa melhorar'
  }

  // Prompts GEO de exemplo
  const samplePrompts = [
    { id: 1, prompt: `Quais são as melhores empresas de ${analysis?.segmento || 'tecnologia'} no Brasil?`, tested: true, mentioned: true },
    { id: 2, prompt: `Recomende uma solução de ${analysis?.segmento || 'software'} para minha empresa`, tested: true, mentioned: false },
    { id: 3, prompt: `O que é ${analysis?.empresa || 'a empresa'} e o que eles fazem?`, tested: true, mentioned: true },
    { id: 4, prompt: `Alternativas ao ${analysis?.empresa || 'produto'}`, tested: true, mentioned: false },
    { id: 5, prompt: `Cases de sucesso em ${analysis?.segmento || 'tecnologia'}`, tested: false, mentioned: false },
  ]

  // Alertas de exemplo
  const alerts = [
    { id: 1, type: 'warning', message: 'Sua empresa não foi mencionada em 60% dos prompts testados', date: 'Hoje' },
    { id: 2, type: 'info', message: 'Novo competidor detectado: TechRival está sendo mencionado mais', date: 'Ontem' },
    { id: 3, type: 'success', message: 'Menção positiva detectada no ChatGPT!', date: '2 dias atrás' },
  ]

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦅</div>
          <h2 className="text-xl font-bold text-white mb-2">Nenhuma análise encontrada</h2>
          <p className="text-gray-400 mb-6">Faça sua primeira análise de visibilidade GEO</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
          >
            Começar Análise
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦅</span>
            <div>
              <h1 className="font-bold text-lg">Harpia GEO</h1>
              <p className="text-sm text-gray-400">{analysis.empresa}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition text-sm"
          >
            + Nova Análise
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Visão Geral', icon: '📊' },
              { id: 'prompts', label: 'Prompts', icon: '💬' },
              { id: 'alerts', label: 'Alertas', icon: '🔔' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-violet-500 text-violet-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab: Visão Geral */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Score Geral</p>
                <p className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</p>
                <p className="text-sm text-gray-500 mt-1">{getScoreLabel(overallScore)}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Prompts Testados</p>
                <p className="text-4xl font-bold text-violet-400">20</p>
                <p className="text-sm text-gray-500 mt-1">Último teste: hoje</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Menções Totais</p>
                <p className="text-4xl font-bold text-blue-400">{scores.chatgpt + scores.gemini + scores.claude + scores.perplexity}</p>
                <p className="text-sm text-gray-500 mt-1">Across 4 LLMs</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Plano</p>
                <p className="text-2xl font-bold text-green-400">Free</p>
                <button className="text-sm text-violet-400 hover:underline mt-1">Fazer upgrade</button>
              </div>
            </div>

            {/* LLM Breakdown */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-6">Visibilidade por LLM</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'ChatGPT', score: scores.chatgpt, max: 5, color: 'bg-green-500' },
                  { name: 'Gemini', score: scores.gemini, max: 5, color: 'bg-blue-500' },
                  { name: 'Claude', score: scores.claude, max: 5, color: 'bg-orange-500' },
                  { name: 'Perplexity', score: scores.perplexity, max: 5, color: 'bg-purple-500' },
                ].map(llm => (
                  <div key={llm.name} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#374151" strokeWidth="8" fill="none" />
                        <circle
                          cx="48" cy="48" r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(llm.score / llm.max) * 251} 251`}
                          className={llm.color.replace('bg-', 'text-')}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold">{llm.score}/{llm.max}</span>
                      </div>
                    </div>
                    <p className="font-medium">{llm.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Informações da Análise</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Empresa</p>
                  <p className="font-medium">{analysis.empresa}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Site</p>
                  <a href={`https://${analysis.site}`} target="_blank" className="font-medium text-violet-400 hover:underline">
                    {analysis.site}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Segmento</p>
                  <p className="font-medium">{analysis.segmento}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Prompts */}
        {activeTab === 'prompts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Prompts GEO ({samplePrompts.length})</h3>
              <button className="px-4 py-2 bg-violet-600 rounded-lg text-sm hover:bg-violet-700 transition">
                Retestar Todos
              </button>
            </div>
            {samplePrompts.map(p => (
              <div key={p.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{p.prompt}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className={p.tested ? 'text-green-400' : 'text-gray-500'}>
                      {p.tested ? '✓ Testado' : '○ Pendente'}
                    </span>
                    {p.tested && (
                      <span className={p.mentioned ? 'text-green-400' : 'text-red-400'}>
                        {p.mentioned ? '✓ Mencionado' : '✗ Não mencionado'}
                      </span>
                    )}
                  </div>
                </div>
                <button className="px-3 py-1 border border-gray-600 rounded-lg text-sm hover:bg-gray-700 transition">
                  Testar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Alerts */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6">Alertas Recentes</h3>
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`bg-gray-800 rounded-xl p-4 border-l-4 ${
                  alert.type === 'warning' ? 'border-yellow-500' :
                  alert.type === 'success' ? 'border-green-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p>{alert.message}</p>
                  <span className="text-sm text-gray-500">{alert.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
