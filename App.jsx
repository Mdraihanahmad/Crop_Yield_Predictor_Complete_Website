import React, { useState, useEffect, useRef } from 'react';

// Single-file React UI using Tailwind CSS utility classes.
// Assumes Tailwind is already configured in the project build.

const navItems = [
  { label: 'Home', href: '#home', type: 'internal' },
  {
    label: 'AI Services',
    type: 'dropdown',
    items: [
      { label: 'Crop Recommendation', href: 'https://your-deploy-link.com/crop' },
      { label: 'Yield Prediction', href: 'https://your-deploy-link.com/yield' },
      { label: 'Disease Prediction', href: 'https://your-deploy-link.com/disease' },
      { label: 'Fertilizer Guide', href: 'https://your-deploy-link.com/fertilizer' },
      { label: 'Weather Forecast', href: 'https://your-deploy-link.com/weather' },
      { label: 'Fertilizer Guide', href: 'https://your-deploy-link.com/fertilizer' },
    ],
  },
  { label: 'Farmer Connect', href: '#farmer-connect', type: 'internal' },
  { label: 'About', href: '#about', type: 'internal' },
];

const FeatureCard = ({ title, icon, gradient }) => (
  <div
    className={`relative rounded-xl p-[1px] overflow-hidden group ${gradient}`}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-400/40 via-green-500/20 to-teal-500/40 blur-xl" />
    <div className="relative z-10 flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-md px-5 py-4 border border-white/15 shadow-lg">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-green-400 text-white shadow-inner shadow-emerald-800/30">
        {icon}
      </div>
      <h4 className="text-sm font-semibold tracking-wide text-white">{title}</h4>
    </div>
  </div>
);

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Disable body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <div className="min-h-screen w-full font-sans text-white bg-gradient-to-br from-gray-950 via-emerald-900 to-gray-900 relative selection:bg-emerald-400 selection:text-gray-900">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] bg-emerald-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-[38rem] h-[38rem] bg-green-500/10 rounded-full blur-3xl animate-pulse [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse [animation-delay:6s]" />
      </div>

      {/* Navbar */}
      <header className="relative z-30">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                {/* Leaf icon */}
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c4.97-4.97 8-9 8-13a8 8 0 1 0-16 0c0 4 3 8 8 13Z" />
                  <path d="M8 10c2 .667 4 2.667 4 6" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-green-200 to-teal-200 bg-clip-text text-transparent drop-shadow-sm">
                AgriPredict
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.label} className="relative" ref={item.label === 'AI Services' ? dropdownRef : undefined}
                    onMouseEnter={() => item.type === 'dropdown' && setDropdownOpen(true)}
                    onMouseLeave={() => item.type === 'dropdown' && setDropdownOpen(false)}>
                  {item.type === 'dropdown' ? (
                    <button
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="inline-flex items-center gap-1 py-2 transition-colors hover:text-emerald-300 focus:outline-none"
                    >
                      <span>{item.label}</span>
                      <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  ) : (
                    <a href={item.href} className="py-2 relative group inline-block">
                      <span className="group-hover:text-emerald-300 transition-colors">{item.label}</span>
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-emerald-400 to-green-300 group-hover:w-full transition-all duration-300" />
                    </a>
                  )}

                  {item.type === 'dropdown' && dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 rounded-xl border border-white/10 bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-black/40 p-2 animate-fade-in">
                      <ul className="space-y-1">
                        {item.items.map((sub) => (
                          <li key={sub.label}>
                            <a
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3 w-full rounded-lg px-3 py-2 text-left text-[13px] leading-tight hover:bg-white/5 hover:text-emerald-300 transition-colors"
                            >
                              <span className="mt-0.5 text-emerald-300">•</span>
                              <span>{sub.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Slide-over */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {/* Backdrop */}
            <div
              onClick={() => setMobileOpen(false)}
              className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
            />
          <div
            className={`absolute top-0 right-0 h-full w-[78%] max-w-sm bg-gray-950/95 backdrop-blur-xl border-l border-white/10 shadow-2xl shadow-black/50 transform transition-transform duration-300 flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c4.97-4.97 8-9 8-13a8 8 0 1 0-16 0c0 4 3 8 8 13Z" />
                  <path d="M8 10c2 .667 4 2.667 4 6" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight">AgriPredict</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4 text-sm font-medium tracking-wide">
                {navItems.map((item) => (
                  <li key={item.label} className="relative">
                    {item.type !== 'dropdown' ? (
                      <a
                        href={item.href}
                        className="block px-3 py-2 rounded-lg bg-white/0 hover:bg-white/5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <>
                        <button
                          onClick={() => setDropdownOpen((o) => !o)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <span>{item.label}</span>
                          <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div className={`mt-2 ml-2 space-y-1 border-l border-white/10 pl-4 ${dropdownOpen ? 'block' : 'hidden'}`}>
                          {item.items.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-[13px] px-3 py-2 rounded-md bg-white/0 hover:bg-white/5 hover:text-emerald-300 transition-colors"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border-t border-white/10 text-[11px] text-white/50">
              © {new Date().getFullYear()} AgriPredict. All rights reserved.
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main id="home" className="relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium tracking-wider uppercase text-emerald-200/80 shadow-inner shadow-emerald-900/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI-Powered Platform
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-br from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent drop-shadow-lg">
                Smart Agriculture<br className="hidden sm:block" />
                <span className="relative inline-block mt-3">
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-tr from-emerald-500/20 to-green-400/20 blur" />
                  <span className="relative">with AI Predictions</span>
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-emerald-100/80 max-w-xl">
                Revolutionize your farming with cutting-edge AI technology. Get accurate crop yield predictions, disease alerts, fertilizer recommendations, and weather forecasts all in one platform.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <a
                  href="#ai-services"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_8px_30px_-5px_rgba(16,185,129,0.55)] transition hover:shadow-[0_8px_30px_-5px_rgba(16,185,129,0.8)] focus:outline-none"
                >
                  <span className="relative z-10">Start Predicting</span>
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mix-blend-overlay" />
                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#about"
                  className="relative inline-flex items-center gap-2 rounded-xl px-8 py-[14px] text-sm font-semibold tracking-wide border border-white/15 bg-white/0 text-white hover:text-emerald-300 hover:border-emerald-400/60 transition backdrop-blur-sm"
                >
                  Learn More
                </a>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6 max-w-md">
                {[
                  { label: '95% Accuracy', value: '95%' },
                  { label: 'Disease Detection', value: 'AI' },
                  { label: 'Weather Forecast', value: 'Wx' },
                ].map((stat) => (
                  <div key={stat.label} className="group relative rounded-xl p-[1px] overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/0">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/40 to-green-400/30 blur-xl" />
                    <div className="relative z-10 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/10 px-4 py-5 flex flex-col items-center text-center gap-1">
                      <span className="text-lg font-bold bg-gradient-to-br from-emerald-300 to-green-200 bg-clip-text text-transparent tracking-wide drop-shadow">{stat.value}</span>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-100/70 font-medium">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Feature Cards (Floating / Layered) */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="absolute -inset-8 bg-gradient-to-br from-emerald-500/10 via-green-400/5 to-teal-500/10 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-8 p-10">
                <FeatureCard
                  title="95% Accuracy"
                  icon={<span className="text-sm font-bold">95%</span>}
                  gradient="bg-gradient-to-br from-emerald-500/40 to-green-400/10"
                />
                <FeatureCard
                  title="Disease Detection"
                  icon={
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c4.97-4.97 8-9 8-13a8 8 0 1 0-16 0c0 4 3 8 8 13Z" />
                      <path d="M10 10h.01M14 10h.01M9 14c.9.667 1.9 1 3 1s2.1-.333 3-1" />
                    </svg>
                  }
                  gradient="bg-gradient-to-br from-green-500/40 to-emerald-400/10"
                />
                <FeatureCard
                  title="Weather Forecast"
                  icon={
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 13h2M5 13a7 7 0 0 1 14 0h2" />
                      <path d="M12 17v4" />
                      <path d="M9 21h6" />
                    </svg>
                  }
                  gradient="bg-gradient-to-br from-teal-500/40 to-emerald-400/10 col-span-2"
                />
                <div className="col-span-2 mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex items-center gap-5 shadow-2xl shadow-black/40">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c4.97-4.97 8-9 8-13a8 8 0 1 0-16 0c0 4 3 8 8 13Z" />
                      <path d="M9.5 9.5h.01M14.5 9.5h.01" />
                      <path d="M8.5 13.5c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-emerald-200/90">AI Insights</p>
                    <p className="text-xs text-emerald-100/60 leading-relaxed max-w-sm">Continuously learning models deliver precise guidance for crop health, yield optimization, and input planning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Placeholder Sections */}
      <section id="about" className="relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">About AgriPredict</h2>
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-3xl">
            AgriPredict is a smart agriculture interface designed to empower farmers and agronomists with AI-driven insights. This UI showcases how crop recommendation, yield prediction, disease diagnostics, fertilizer guidance, and weather intelligence can be unified in a single streamlined experience.
          </p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 md:items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} AgriPredict. All rights reserved.</p>
          <p className="text-white/40">Built with React & Tailwind CSS.</p>
        </div>
      </footer>

      {/* Simple keyframes (if Tailwind config not extended) */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.35s ease forwards; }
      `}</style>
    </div>
  );
};

export default App;
