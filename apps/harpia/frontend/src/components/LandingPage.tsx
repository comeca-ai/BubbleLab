import { useState } from 'react'

// Ícones SVG inline
const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
)

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-2 5v10l8-5-8-5z"/>
  </svg>
)

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
)

const PerplexityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
)

export function LandingPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦅</span>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Harpia AI
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
              <a href="#como-funciona" className="hover:text-violet-600 transition">Como Funciona</a>
              <a href="#recursos" className="hover:text-violet-600 transition">Recursos</a>
              <a href="#precos" className="hover:text-violet-600 transition">Preços</a>
            </nav>
            <button className="px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 rounded-lg transition">
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-8">
            <span>↙</span>
            <span>Plataforma #1 de GEO no Brasil</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Seja a marca citada pelo
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ChatGPT, Gemini e Claude
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Monitore, analise e otimize a presença da sua marca em modelos de IA generativa.
            Clientes agora recebem recomendações da IA, não do Google.
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-8">
            Esteja nessas respostas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25">
              Teste Grátis por 14 Dias
              <span>→</span>
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <span>▶</span>
              Ver Demo
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-8">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              14 dias grátis
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Cancele quando quiser
            </span>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
              +200 marcas monitoradas
            </span>
            <div className="flex items-center gap-1">
              <span className="text-amber-400">★★★★★</span>
              <span className="text-sm text-gray-600">67% dos usuários consultam IA para pesquisar</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Models Bar */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6">
            Monitore sua marca nos principais modelos de IA
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { name: 'ChatGPT', icon: <ChatGPTIcon /> },
              { name: 'Gemini', icon: <GeminiIcon /> },
              { name: 'Claude', icon: <ClaudeIcon /> },
              { name: 'Perplexity', icon: <PerplexityIcon /> },
            ].map((ai) => (
              <div key={ai.name} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm">
                {ai.icon}
                {ai.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Tabs */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {['E-commerce Fashion', 'TechStartup', 'Agência Digital', 'Marca Global', 'Consultoria'].map((industry, i) => (
              <button
                key={industry}
                className={`px-4 py-2 rounded-lg transition ${
                  i === 0 ? 'bg-violet-100 text-violet-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            A busca mudou. <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Sua marca está preparada?</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Consumidores não pesquisam mais no Google. Eles perguntam para o ChatGPT. E você não tem controle sobre o que a IA responde.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '👁️‍🗨️',
                iconBg: 'bg-red-100',
                title: 'Sem Visibilidade',
                description: 'Você não sabe o que ChatGPT, Gemini ou Claude dizem quando seus clientes perguntam sobre sua marca ou categoria.'
              },
              {
                icon: '⚠️',
                iconBg: 'bg-amber-100',
                title: 'Desinformação',
                description: 'IAs podem estar recomendando seus concorrentes ou pior - fornecendo informações incorretas sobre sua empresa.'
              },
              {
                icon: '📉',
                iconBg: 'bg-red-100',
                title: 'Perdendo Mercado',
                description: '67% dos consumidores já usam IA para pesquisar. Se você não está nessas respostas, está perdendo vendas.'
              }
            ].map((problem, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className={`w-12 h-12 ${problem.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-xl">{problem.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-20 px-4 bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Como a <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Harpia AI</span> funciona
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Monitoramento, análise e otimização em tempo real. Controle total sobre sua presença em IA.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: '🔍',
                title: 'Monitore sua marca',
                description: 'Configure queries de busca e monitore automaticamente o que ChatGPT, Gemini, Claude e Perplexity dizem sobre você.'
              },
              {
                step: 2,
                icon: '📊',
                title: 'Analise os insights',
                description: 'Receba análises de sentimento, comparativo com concorrentes e identificação de informações incorretas.'
              },
              {
                step: 3,
                icon: '💡',
                title: 'Otimize sua presença',
                description: 'Siga recomendações acionáveis baseadas em GEO para melhorar citações e posicionamento em IA.'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-20 px-4 bg-violet-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '👁️',
                title: 'Monitoramento 24/7',
                description: 'Rastreamento contínuo de menções da sua marca em ChatGPT, Gemini, Claude e Perplexity. Saiba exatamente o que dizem sobre você.'
              },
              {
                icon: '📊',
                title: 'Análise de Sentimento',
                description: 'Identifique menções positivas, neutras e negativas automaticamente. Detecte informações incorretas antes que prejudiquem sua marca.'
              },
              {
                icon: '📈',
                title: 'Análise Competitiva',
                description: 'Compare seu Share of Voice com concorrentes. Descubra em quais queries eles aparecem e você não.'
              },
              {
                icon: '🔔',
                title: 'Alertas Inteligentes',
                description: 'Notificações em tempo real sobre menções negativas, desinformação e mudanças de posicionamento vs. concorrentes.'
              },
              {
                icon: '📄',
                title: 'Relatórios Executivos',
                description: 'Reports automatizados semanais e mensais prontos para apresentar para stakeholders. Exportação em PDF, Excel e PowerPoint.'
              },
              {
                icon: '💡',
                title: 'Recomendações GEO',
                description: 'Sugestões acionáveis de otimização baseadas em dados. Melhore structured data, conteúdo e autoridade para aparecer mais em IA.'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-violet-600 font-medium mb-4">
            14 dias grátis em todos os planos • Cancele quando quiser
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900">Starter</h3>
              <p className="text-gray-600 text-sm mb-4">Ideal para marcas em crescimento</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">R$ 497</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl mb-6">
                Começar Teste Grátis
              </button>
              <ul className="space-y-3 text-sm text-gray-600">
                {['3 marcas monitoradas', '5 modelos de IA principais', '50 queries por marca', 'Análise de sentimento', 'Relatórios semanais', 'Alertas via email', 'Suporte via email'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-violet-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional */}
            <div className="bg-white border-2 border-violet-600 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-full">
                ⭐ Mais Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900">Professional</h3>
              <p className="text-gray-600 text-sm mb-4">Perfeito para empresas estabelecidas</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">R$ 1.297</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl mb-6">
                Começar Teste Grátis
              </button>
              <ul className="space-y-3 text-sm text-gray-600">
                {['10 marcas monitoradas', 'Todos os modelos de IA', '200 queries por marca', '5 concorrentes', 'Relatórios diários', 'Alertas em tempo real', 'Recomendações GEO', 'Suporte prioritário', 'Analytics avançado'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-violet-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
              <p className="text-gray-600 text-sm mb-4">Para grandes corporações</p>
              <div className="mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Sob consulta</span>
              </div>
              <button className="w-full py-3 border border-violet-600 text-violet-600 font-semibold rounded-xl mb-6 hover:bg-violet-50 transition">
                Fale Conosco
              </button>
              <ul className="space-y-3 text-sm text-gray-600">
                {['Marcas ilimitadas', 'Modelos custom de IA', 'Queries ilimitadas', 'Concorrentes ilimitados', 'Relatórios personalizados', 'Slack/Teams integração', 'API de acesso', 'White-label', 'Gestor de conta dedicado'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-violet-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="text-violet-600">✓</span>
              Suporte em português
            </span>
            <span className="flex items-center gap-2">
              <span className="text-violet-600">✓</span>
              Pagamento seguro
            </span>
            <span className="flex items-center gap-2">
              <span className="text-violet-600">✓</span>
              Dados protegidos
            </span>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para dominar a presença em IA?
          </h2>
          <p className="text-violet-100 mb-8">
            Comece seu teste grátis de 14 dias. Sem cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Seu email corporativo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-80 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto px-8 py-3 bg-white text-violet-600 font-semibold rounded-xl hover:bg-violet-50 transition">
              Começar Grátis
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦅</span>
              <span className="text-xl font-bold text-white">Harpia AI</span>
            </div>
            <p className="text-sm">© 2024 Harpia AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
