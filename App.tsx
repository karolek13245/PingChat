import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Instant delivery',
    desc: 'Messages arrive in real time over persistent WebSocket connections. No polling, no delays.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'End-to-end encryption',
    desc: 'Every message is encrypted before it leaves your device. Not even our servers can read your chats.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: '@username search',
    desc: 'Find anyone instantly by their @username. No phone numbers, no email address needed.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Custom profiles',
    desc: 'Upload a photo or pick your avatar color. Make PingChat feel like yours.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Multi-language',
    desc: 'English, Polish, Spanish, French, German — speak in the language that feels natural.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
    title: 'Dark & light mode',
    desc: 'Switch themes on the fly. The interface adapts to your environment and preference.',
  },
]

const STEPS = [
  { n: '01', title: 'Create an account', desc: 'Sign up with just a username and password. No email, no phone number required.' },
  { n: '02', title: 'Find your people', desc: 'Search for anyone by their @username and open a direct encrypted thread.' },
  { n: '03', title: 'Start pinging', desc: 'Send messages in real time. They arrive instantly, encrypted end-to-end.' },
]

const PRIVACYPOINTS = [
  { icon: '🚫', label: 'No ads', desc: 'Zero advertising. Your conversations are never used to target you.' },
  { icon: '🔍', label: 'No tracking', desc: 'No analytics, no telemetry, no data collection beyond what the app needs.' },
  { icon: '💾', label: 'No data sales', desc: 'Your data is yours. It is never sold, shared, or monetized.' },
  { icon: '🗑️', label: 'Full deletion', desc: 'Delete your account and all data is wiped permanently, confirmed by password.' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(244,244,248,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #e8e8f0' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="ping-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
            </svg>
          </div>
          <span className="font-extrabold text-lg tracking-tight grad-text">PingChat</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Privacy', 'How it works'].map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-600 transition-colors duration-200"
              style={{ color: '#9898b3' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7c5cfc')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9898b3')}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://karolek13245.github.io/PingChat/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm font-700 px-5 py-2.5 rounded-xl transition-all duration-200 grad-bg glow-purple"
            style={{ color: '#fff' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Open app
          </a>
          <button className="md:hidden p-2" style={{ color: '#9898b3' }} onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen
                ? <><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
                : <><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-5" style={{ background: 'rgba(244,244,248,0.97)', borderTop: '1px solid #e8e8f0' }}>
          {['Features', 'Privacy', 'How it works'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-600" style={{ color: '#1a1a2e' }} onClick={() => setMobileOpen(false)}>{l}</a>
          ))}
          <a href="https://karolek13245.github.io/PingChat/" target="_blank" rel="noopener noreferrer" className="text-sm font-700 px-5 py-3 rounded-xl text-center grad-bg" style={{ color: '#fff' }}>
            Open app
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t < 6 ? t + 1 : t)), 700)
    return () => clearInterval(id)
  }, [])

  const messages = [
    { mine: false, text: "Hey! Can you send me the file?", time: "2:41 PM" },
    { mine: true, text: "Sure, sending now 📎", time: "2:41 PM" },
    { mine: false, text: "Got it, thanks! 🙌", time: "2:42 PM" },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,122,255,0.1) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-700 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(124,92,252,0.1)', color: '#7c5cfc' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            v1.3.1 · Now with multi-language support
          </div>

          <h1 className="font-extrabold leading-tight mb-5" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#1a1a2e', letterSpacing: '-0.03em' }}>
            Chat privately,<br />
            <span className="grad-text">ping instantly</span>
          </h1>

          <p className="text-base leading-relaxed mb-8" style={{ color: '#9898b3', maxWidth: '440px' }}>
            Real-time messaging with end-to-end encryption. No ads, no tracking — just fast, private conversations powered by WebSocket and Supabase.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://karolek13245.github.io/PingChat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-700 px-6 py-3.5 rounded-xl transition-all duration-200 grad-bg glow-purple"
              style={{ color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(124,92,252,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,92,252,0.25)' }}
            >
              Start chatting free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-sm font-600 px-6 py-3.5 rounded-xl transition-all duration-200"
              style={{ background: '#fff', color: '#1a1a2e', border: '1.5px solid #e8e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#7c5cfc')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#e8e8f0')}
            >
              See features
            </a>
          </div>

          <div className="flex items-center gap-6 mt-8">
            {[['🔒', 'E2E encrypted'], ['⚡', 'WebSocket'], ['🚫', 'No ads']].map(([icon, label]) => (
              <div key={label as string} className="flex items-center gap-1.5 text-xs font-600" style={{ color: '#9898b3' }}>
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: mock app UI */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #e8e8f0', boxShadow: '0 32px 80px rgba(124,92,252,0.15), 0 2px 8px rgba(0,0,0,0.06)' }}>
            {/* App header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #e8e8f0' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm" style={{ background: 'linear-gradient(135deg, #7c5cfc, #f97aff)', color: '#fff' }}>S</div>
                <div>
                  <p className="text-sm font-700" style={{ color: '#1a1a2e' }}>@sophie</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                    <span className="text-xs" style={{ color: '#9898b3' }}>online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-600 px-2.5 py-1 rounded-full" style={{ background: 'rgba(124,92,252,0.1)', color: '#7c5cfc' }}>
                🔒 E2E
              </div>
            </div>

            {/* Messages */}
            <div className="px-4 py-4 flex flex-col gap-3" style={{ minHeight: '200px' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}
                  style={{ opacity: tick > i * 2 ? 1 : 0, transform: tick > i * 2 ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.4s ease' }}
                >
                  <div className="max-w-xs px-3.5 py-2.5 rounded-2xl" style={
                    msg.mine
                      ? { background: 'linear-gradient(135deg, #7c5cfc, #f97aff)', color: '#fff', borderBottomRightRadius: '6px' }
                      : { background: '#f4f4f8', color: '#1a1a2e', borderBottomLeftRadius: '6px' }
                  }>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className="text-right mt-0.5" style={{ fontSize: '10px', opacity: 0.7 }}>{msg.time}</p>
                  </div>
                </div>
              ))}
              {tick < 6 && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-2xl" style={{ background: '#f4f4f8', borderBottomLeftRadius: '6px' }}>
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(j => (
                        <span key={j} className="w-1.5 h-1.5 rounded-full" style={{ background: '#9898b3', animation: `typeBounce 1s ${j * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: '#f4f4f8', border: '1.5px solid #e8e8f0' }}>
                <span className="text-sm flex-1" style={{ color: '#9898b3' }}>Message @sophie…</span>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center grad-bg" style={{ flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typeBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-4px)} }
      `}</style>
    </section>
  )
}

function Features() {
  const { ref, inView } = useInView()
  return (
    <section id="features" className="py-24 px-6" style={{ background: '#fff', borderTop: '1px solid #e8e8f0' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-16 transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}>
          <div className="inline-flex items-center gap-2 text-xs font-700 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,92,252,0.08)', color: '#7c5cfc' }}>
            Features
          </div>
          <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-4" style={{ color: '#1a1a2e', letterSpacing: '-0.02em' }}>
            Everything you need to stay connected
          </h2>
          <p className="text-base" style={{ color: '#9898b3', maxWidth: '480px', margin: '0 auto' }}>
            PingChat is purpose-built for fast, private conversations. No bloat, no distractions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => <FeatureCard key={i} f={f} delay={i * 70} />)}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ f, delay }: { f: typeof FEATURES[0]; delay: number }) {
  const { ref, inView } = useInView()
  const [hov, setHov] = useState(false)
  return (
    <div
      ref={ref}
      className="p-6 rounded-2xl transition-all duration-600 cursor-default"
      style={{
        background: hov ? '#faf9ff' : '#f4f4f8',
        border: hov ? '1.5px solid rgba(124,92,252,0.25)' : '1.5px solid #e8e8f0',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(16px)',
        transitionDelay: `${delay}ms`,
        boxShadow: hov ? '0 8px 32px rgba(124,92,252,0.08)' : 'none',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: hov ? 'rgba(124,92,252,0.12)' : 'rgba(124,92,252,0.08)', color: '#7c5cfc', transition: 'background 0.2s' }}>
        {f.icon}
      </div>
      <h3 className="font-700 text-base mb-2" style={{ color: '#1a1a2e' }}>{f.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#9898b3' }}>{f.desc}</p>
    </div>
  )
}

function Privacy() {
  const { ref, inView } = useInView()
  return (
    <section id="privacy" className="py-24 px-6" style={{ borderTop: '1px solid #e8e8f0' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className="transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-16px)' }}>
            <div className="inline-flex items-center gap-2 text-xs font-700 px-3 py-1.5 rounded-full mb-5" style={{ background: 'rgba(124,92,252,0.08)', color: '#7c5cfc' }}>
              Privacy
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-5" style={{ color: '#1a1a2e', letterSpacing: '-0.02em' }}>
              Your conversations stay<br />
              <span className="grad-text">between you</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#9898b3' }}>
              PingChat is built around zero-knowledge principles. Messages are encrypted before they leave your device, secured by row-level policies, and stored in a way that even we can't read.
            </p>
            <a
              href="https://karolek13245.github.io/PingChat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-700 px-6 py-3.5 rounded-xl transition-all duration-200 grad-bg glow-purple"
              style={{ color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Try it yourself
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRIVACYPOINTS.map((p, i) => (
              <PrivacyCard key={i} p={p} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PrivacyCard({ p, delay }: { p: typeof PRIVACYPOINTS[0]; delay: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="p-5 rounded-2xl transition-all duration-700"
      style={{
        background: '#fff',
        border: '1.5px solid #e8e8f0',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(16px)',
        transitionDelay: `${delay}ms`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      <div className="text-2xl mb-3">{p.icon}</div>
      <h4 className="font-700 text-sm mb-1.5" style={{ color: '#1a1a2e' }}>{p.label}</h4>
      <p className="text-xs leading-relaxed" style={{ color: '#9898b3' }}>{p.desc}</p>
    </div>
  )
}

function HowItWorks() {
  const { ref, inView } = useInView()
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: '#fff', borderTop: '1px solid #e8e8f0' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-16 transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}>
          <div className="inline-flex items-center gap-2 text-xs font-700 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,92,252,0.08)', color: '#7c5cfc' }}>
            How it works
          </div>
          <h2 className="font-extrabold text-3xl md:text-4xl leading-tight" style={{ color: '#1a1a2e', letterSpacing: '-0.02em' }}>
            Up and running in seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <StepCard key={i} s={s} delay={i * 100} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ s, delay, isLast }: { s: typeof STEPS[0]; delay: number; isLast: boolean }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="relative flex flex-col items-start transition-all duration-700"
      style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transitionDelay: `${delay}ms` }}
    >
      {!isLast && (
        <div className="hidden md:block absolute top-5 left-14 right-0 h-px" style={{ background: 'linear-gradient(90deg, #e8e8f0, transparent)' }} />
      )}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm mb-5 grad-bg glow-purple" style={{ color: '#fff', position: 'relative', zIndex: 1 }}>
        {s.n}
      </div>
      <h3 className="font-700 text-base mb-2" style={{ color: '#1a1a2e' }}>{s.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#9898b3' }}>{s.desc}</p>
    </div>
  )
}

function CTA() {
  const { ref, inView } = useInView()
  return (
    <section className="py-24 px-6" style={{ borderTop: '1px solid #e8e8f0' }}>
      <div className="max-w-3xl mx-auto">
        <div
          ref={ref}
          className="relative rounded-3xl p-12 text-center overflow-hidden transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, #7c5cfc, #f97aff)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            boxShadow: '0 32px 80px rgba(124,92,252,0.3)',
          }}
        >
          {/* decorative circles */}
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="absolute bottom-[-40px] left-[-40px] w-36 h-36 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.06)' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-700 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Free forever · No credit card
            </div>
            <h2 className="font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', letterSpacing: '-0.02em' }}>
              Ready to ping someone?
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Join PingChat and start sending encrypted messages instantly.
            </p>
            <a
              href="https://karolek13245.github.io/PingChat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-700 px-7 py-4 rounded-xl transition-all duration-200"
              style={{ background: '#fff', color: '#7c5cfc', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
            >
              Open PingChat
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ borderTop: '1px solid #e8e8f0' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="ping-logo-icon" style={{ width: 28, height: 28, borderRadius: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
            </svg>
          </div>
          <span className="font-extrabold text-sm grad-text">PingChat</span>
          <span className="text-xs" style={{ color: '#9898b3' }}>v1.3.1</span>
        </div>
        <p className="text-xs" style={{ color: '#9898b3' }}>
          No ads · No tracking · End-to-end encrypted
        </p>
        <div className="flex items-center gap-5">
          <a href="https://karolek13245.github.io/PingChat/" target="_blank" rel="noopener noreferrer" className="text-xs font-600 transition-colors" style={{ color: '#9898b3' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#7c5cfc')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9898b3')}
          >Open app</a>
          <a href="https://github.com/karolek13245/PingChat" target="_blank" rel="noopener noreferrer" className="text-xs font-600 transition-colors" style={{ color: '#9898b3' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#7c5cfc')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9898b3')}
          >GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div style={{ background: '#f4f4f8', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Features />
      <Privacy />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  )
}
