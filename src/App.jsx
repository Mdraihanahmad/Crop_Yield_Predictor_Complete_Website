import React, { useState, useEffect, useRef } from 'react';
import Chatbot from './components/Chatbot.jsx';
import Skeleton from './components/Skeleton.jsx';
import Toaster from './components/Toaster.jsx';

// Single-file React UI using Tailwind CSS utility classes.
// Assumes Tailwind is already configured in the project build.

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

const translations = {
  en: {
    startPredicting: 'Start Predicting',
    learnMore: 'Learn More',
    aboutTitle: 'About AI Crop Predict',
    readMore: 'Read More',
    showLess: 'Show Less',
    missionVision: 'Mission & Vision',
    missionLabel: 'Mission:',
    missionText: 'Empower every grower with precise, explainable AI so they can reduce risk, optimize inputs, and protect soil health.',
    visionLabel: 'Vision:',
    visionText: 'A climate‑resilient farming ecosystem where decisions are data‑driven, sustainable, and accessible regardless of scale.',
    challenges: 'Challenges in Modern Farming',
    challenge1: 'Unpredictable weather & rainfall volatility.',
    challenge2: 'Nutrient imbalance & inefficient fertilizer use.',
    challenge3: 'Late detection of pests & crop diseases.',
    challenge4: 'Yield variability across micro‑plots.',
    challenge5: 'Data silos: soil tests, climate feeds, and advisory tools not connected.',
    approach: 'Our Approach (AI + Agronomy + UX)',
    layerData: 'Data Layer',
    layerDataText: 'Soil parameters, climate feeds, rainfall models and user inputs normalized into a consistent feature set.',
    layerModel: 'Model Layer',
    layerModelText: 'Specialized models for crop choice, yield, disease risk, fertilizer balance & rainfall alignment—soon with feature importance.',
    layerExperience: 'Experience Layer',
    layerExperienceText: 'Clean UI, fast access, mobile responsiveness and planned alerts & multilingual guidance.',
    showLessBtn: 'Show Less'
  },
  hi: {
    startPredicting: 'पूर्वानुमान शुरू करें',
    learnMore: 'और जानें',
    aboutTitle: 'AI Crop Predict के बारे में',
    readMore: 'और पढ़ें',
    showLess: 'कम दिखाएँ',
    missionVision: 'मिशन व विज़न',
    missionLabel: 'मिशन:',
    missionText: 'हर किसान को सटीक व स्पष्ट AI से सशक्त बनाना ताकि जोखिम कम हो, इनपुट अनुकूल हों और मिट्टी की सेहत सुरक्षित रहे।',
    visionLabel: 'विजन:',
    visionText: 'डेटा‑आधारित व टिकाऊ निर्णयों वाला जलवायु‑लचीला कृषि तंत्र जो सभी के लिए सुलभ हो।',
    challenges: 'आधुनिक खेती की चुनौतियाँ',
    challenge1: 'अनिश्चित मौसम व वर्षा में तेजी से बदलाव।',
    challenge2: 'पोषक तत्व असंतुलन व उर्वरक का अक्षम उपयोग।',
    challenge3: 'कीट व रोग की देर से पहचान।',
    challenge4: 'सूक्ष्म भू‑खंडों में उत्पादन भिन्नता।',
    challenge5: 'मिट्टी, मौसम व सलाहकार डेटा का अलग‑अलग रहना।',
    approach: 'हमारा दृष्टिकोण (AI + एग्रोनॉमी + UX)',
    layerData: 'डेटा लेयर',
    layerDataText: 'मिट्टी, मौसम, वर्षा मॉडल व उपयोगकर्ता इनपुट को एक समान फीचर सेट में सामान्यीकृत किया जाता है।',
    layerModel: 'मॉडल लेयर',
    layerModelText: 'फ़सल चयन, उत्पादन, रोग जोखिम, उर्वरक संतुलन व वर्षा को जोड़ने हेतु विशिष्ट मॉडल।',
    layerExperience: 'अनुभव लेयर',
    layerExperienceText: 'सरल UI, तेज अनुभव, मोबाइल अनुकूल व बहुभाषी मार्गदर्शन।',
  showLessBtn: 'कम दिखाएँ',
  Home: 'होम',
  AiServices: 'एआई सेवाएँ',
  FarmerConnect: 'किसान संपर्क',
  About: 'परिचय'
  }
};

const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);
  const t = (k) => (translations[lang] && translations[lang][k]) || translations.en[k] || k;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeService, setActiveService] = useState(null); // {label, href, _instance}
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [deletedStats, setDeletedStats] = useState(null);
  const dropdownRef = useRef(null);
  const iframeTimerRef = useRef(null);
  const navItems = [
    { label: t('Home'), key: 'Home', href: '#home', type: 'internal' },
    {
      label: t('AiServices'),
      key: 'AiServices',
      type: 'dropdown',
      items: [
        { label: 'Crop Recommendation', href: 'https://crop-recommendation-juhl.onrender.com/', embed: true },
        { label: 'Yield Prediction', href: 'https://mdraihanahmad-cropyieldprediction.streamlit.app/', embed: false },
        { label: 'Disease Prediction', href: 'https://rhn-disease-prediction.streamlit.app/', embed: false },
        { label: 'Fertilizer Guide', href: 'https://www.india.gov.in/farmers-portal', embed: false },
        { label: 'Weather Forecast', href: 'https://mdraihanahmad-weather.netlify.app/', embed: false },
        { label: 'Rainfall Forecast', href: 'https://fzn-rainfall-prediction.streamlit.app/', embed: false },
      ],
    },
    { label: t('FarmerConnect'), key: 'FarmerConnect', href: '#farmer-connect', type: 'internal' },
    { label: t('About'), key: 'About', href: '#about', type: 'internal' },
  ];
  const AiServices = navItems.find(i => i.type === 'dropdown')?.items || [];

  useEffect(()=>{ const id = setTimeout(()=> setStatsLoading(false), 1100); return ()=> clearTimeout(id); },[]);

  const pushToast = (t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, ...t }]);
  };
  const removeToast = (id) => setToasts(ts => ts.filter(t => t.id!==id));
  const handleUndo = (t) => {
    if(deletedStats){ setDeletedStats(null); pushToast({ title: 'Restored', message: 'Stats restored.', duration: 2500 }); }
    removeToast(t.id);
  };

  const clearStats = () => {
    if(statsLoading) return;
    setDeletedStats([{ label: '95% Accuracy', value: '95%' }, { label: 'Disease Detection', value: 'AI' }, { label: 'Weather Forecast', value: 'Wx' }]);
    pushToast({ title: 'Stats cleared', message: 'You removed quick stats.', canUndo: true });
  };

  const openService = (service) => {
    if (!service) return;
    if (service.embed === false) {
      // Directly open in new tab and skip modal
      window.open(service.href, '_blank');
      return;
    }
    // Always create a fresh object so React re-renders even if same label clicked repeatedly
    const svc = { ...service, _instance: Date.now() + Math.random() };
    setActiveService(svc);
    setServiceLoading(true);
    setServiceError(false);
    clearTimeout(iframeTimerRef.current);
    iframeTimerRef.current = setTimeout(() => {
      setServiceLoading(false);
      setServiceError(true);
    }, 9000); // 9s timeout for blocked iframe
  };
  const closeService = () => {
    setActiveService(null);
    setServiceLoading(false);
    setServiceError(false);
    clearTimeout(iframeTimerRef.current);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        if (activeService) closeService();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [activeService]);

  // Disable body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen || activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen, activeService]);

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
                AI Crop Predict
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-10 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.key || item.label} className="relative" ref={item.type === 'dropdown' ? dropdownRef : undefined}>
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
                    <a href={item.href} onClick={() => setDropdownOpen(false)} className="py-2 relative group inline-block">
                      <span className="group-hover:text-emerald-300 transition-colors">{item.label}</span>
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-emerald-400 to-green-300 group-hover:w-full transition-all duration-300" />
                    </a>
                  )}

                  {item.type === 'dropdown' && dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border border-white/10 bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-black/40 p-2 animate-fade-in">
                      <ul className="space-y-1">
                        {item.items.map((sub) => (
                          <li key={sub.label}>
                            <a
                              href={sub.href}
                              className="flex items-start gap-3 w-full rounded-lg px-3 py-2 text-left text-[13px] leading-tight hover:bg-white/5 hover:text-emerald-300 transition-colors"
                              onClick={(e) => { e.preventDefault(); openService(sub); setDropdownOpen(false); }}
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
              <span className="font-semibold text-lg tracking-tight">AI Crop Predict</span>
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
                              className="block text-[13px] px-3 py-2 rounded-md bg-white/0 hover:bg-white/5 hover:text-emerald-300 transition-colors"
                              onClick={(e) => { e.preventDefault(); openService(sub); setMobileOpen(false); setDropdownOpen(false); }}
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
              © {new Date().getFullYear()} AI Crop Predict. All rights reserved.
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
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05] drop-shadow-lg">
                <span className="block bg-gradient-to-br from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                  Smart Agriculture
                </span>
                <span className="relative inline-block mt-2">
                  {/* Highlight bar */}
                  <span className="absolute inset-0 bg-emerald-300/90 md:bg-emerald-300 -skew-x-3" />
                  <span className="relative px-3 py-1 text-gray-900 tracking-tight">
                    with AI Predictions
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-emerald-100/80 max-w-xl">
                Revolutionize your farming with cutting-edge AI technology. Get accurate crop yield predictions, disease alerts, fertilizer recommendations, and weather forecasts all in one platform.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Find the Crop Recommendation service config
                    const cropService = AiServices.find(s => s.label.toLowerCase().includes('crop'));
                    if (cropService) {
                      const svc = { ...cropService, _instance: Date.now() + Math.random() };
                      setActiveService(svc);
                      setServiceLoading(true);
                      setServiceError(false);
                      clearTimeout(iframeTimerRef.current);
                      iframeTimerRef.current = setTimeout(() => {
                        setServiceLoading(false);
                        setServiceError(true);
                      }, 9000);
                    }
                  }}
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_8px_30px_-5px_rgba(16,185,129,0.55)] transition hover:shadow-[0_8px_30px_-5px_rgba(16,185,129,0.8)] focus:outline-none"
                >
                  <span className="relative z-10">{t('startPredicting')}</span>
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mix-blend-overlay" />
                  <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
                <a
                  href="#about"
                  className="relative inline-flex items-center gap-2 rounded-xl px-8 py-[14px] text-sm font-semibold tracking-wide border border-white/15 bg-white/0 text-white hover:text-emerald-300 hover:border-emerald-400/60 transition backdrop-blur-sm"
                >
                  {t('learnMore')}
                </a>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-white/10 border border-white/15 text-xs font-medium rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                >
                  <option value="en">EN</option>
                  <option value="hi">हिंदी</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button onClick={clearStats} className="relative overflow-hidden rounded-lg px-4 py-2 text-[11px] font-semibold bg-white/10 hover:bg-white/15 border border-white/10 group transition active:scale-[0.97]">
                  <span className="relative z-10">Clear Stats</span>
                  <span className="absolute inset-0 opacity-0 group-active:opacity-100 bg-white/20 transition" />
                </button>
                {deletedStats && (
                  <p className="text-[11px] text-emerald-200/60">Stats hidden. Undo from toast.</p>
                )}
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4 max-w-md min-h-[120px]">
                {statsLoading && [1,2,3].map(i => <Skeleton key={i} className="h-24" />)}
                {!statsLoading && !deletedStats && [
                  { label: '95% Accuracy', value: '95%' },
                  { label: 'Disease Detection', value: 'AI' },
                  { label: 'Weather Forecast', value: 'Wx' },
                ].map((stat) => (
                  <div key={stat.label} className="group relative rounded-xl p-[1px] overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-white/0 will-change-transform transition-transform duration-300 hover:-translate-y-1 active:translate-y-0">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/40 to-green-400/30 blur-xl" />
                    <div className="relative z-10 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/10 px-4 py-5 flex flex-col items-center text-center gap-1">
                      <span className="text-lg font-bold bg-gradient-to-br from-emerald-300 to-green-200 bg-clip-text text-transparent tracking-wide drop-shadow">{stat.value}</span>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-100/70 font-medium">{stat.label}</span>
                    </div>
                  </div>
                ))}
                {!statsLoading && deletedStats && (
                  <div className="col-span-3 text-[12px] text-emerald-100/60 bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="font-medium text-emerald-200 mb-1">No quick stats</p>
                    <p>Re-enable by Undo (toast) or refresh page.</p>
                    <ul className="mt-2 text-emerald-100/50 list-disc list-inside space-y-1">
                      <li>Add your field data to generate personalized stats.</li>
                      <li>Connect weather service for localized accuracy.</li>
                      <li>Enable more KPIs in upcoming Settings panel.</li>
                    </ul>
                  </div>
                )}
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
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 bg-clip-text text-transparent">{t('aboutTitle')}</h2>
          <p className="text-sm sm:text-base text-emerald-100/70 leading-relaxed max-w-4xl">
            A unified intelligence layer for crops, yield, disease, fertilizer, rainfall and weather—turning fragmented data into clear, timely, field‑ready decisions.
          </p>
          {!aboutExpanded && (
            <div className="mt-6">
              <button
                onClick={() => setAboutExpanded(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-900/40 transition focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              >
                {t('readMore')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          )}
          {aboutExpanded && (
            <div className="mt-12 space-y-14 animate-fade-in">
              {/* Mission & Vision */}
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold tracking-wide text-emerald-300">{t('missionVision')}</h3>
                </div>
                <div className="md:col-span-2 space-y-4 text-sm leading-relaxed text-emerald-100/80">
                  <p><span className="font-semibold text-emerald-200">{t('missionLabel')}</span> {t('missionText')}</p>
                  <p><span className="font-semibold text-emerald-200">{t('visionLabel')}</span> {t('visionText')}</p>
                </div>
              </div>
              {/* Challenges */}
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold tracking-wide text-emerald-300">{t('challenges')}</h3>
                </div>
                <div className="md:col-span-2">
                  <ul className="space-y-3 text-sm text-emerald-100/80">
                    <li className="flex gap-3"><span className="text-emerald-400">•</span><span>{t('challenge1')}</span></li>
                    <li className="flex gap-3"><span className="text-emerald-400">•</span><span>{t('challenge2')}</span></li>
                    <li className="flex gap-3"><span className="text-emerald-400">•</span><span>{t('challenge3')}</span></li>
                    <li className="flex gap-3"><span className="text-emerald-400">•</span><span>{t('challenge4')}</span></li>
                    <li className="flex gap-3"><span className="text-emerald-400">•</span><span>{t('challenge5')}</span></li>
                  </ul>
                </div>
              </div>
              {/* Our Approach */}
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold tracking-wide text-emerald-300">{t('approach')}</h3>
                </div>
                <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
                  <div className="group relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 blur-xl" />
                    <div className="relative h-full rounded-xl bg-gray-900/60 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-3">
                      <h4 className="text-sm font-semibold text-emerald-200 tracking-wide">{t('layerData')}</h4>
                      <p className="text-[12px] leading-relaxed text-emerald-100/70">{t('layerDataText')}</p>
                    </div>
                  </div>
                  <div className="group relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 blur-xl" />
                    <div className="relative h-full rounded-xl bg-gray-900/60 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-3">
                      <h4 className="text-sm font-semibold text-emerald-200 tracking-wide">{t('layerModel')}</h4>
                      <p className="text-[12px] leading-relaxed text-emerald-100/70">{t('layerModelText')}</p>
                    </div>
                  </div>
                  <div className="group relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 blur-xl" />
                    <div className="relative h-full rounded-xl bg-gray-900/60 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-3">
                      <h4 className="text-sm font-semibold text-emerald-200 tracking-wide">{t('layerExperience')}</h4>
                      <p className="text-[12px] leading-relaxed text-emerald-100/70">{t('layerExperienceText')}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Closing blurb */}
              <div className="pt-2 text-[12px] text-emerald-200/50 max-w-4xl">
                Roadmap: anomaly alerts, localized agronomy packs, offline caching, explainability dashboard & open API access.
              </div>
              <div>
                <button
                  onClick={() => { setAboutExpanded(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-sm transition"
                >
                  {t('showLess')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI Service Modal */}
      {activeService && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeService} />
          <div className="relative w-[95%] max-w-6xl h-[85vh] flex flex-col rounded-2xl border border-white/10 bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/60 animate-fade-in">
            <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-white/10">
              <div className="flex items-center gap-4 overflow-x-auto pr-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white text-xs font-bold shadow-inner shadow-emerald-900/40">AI</div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide">{activeService.label}</h3>
                    <p className="text-[11px] text-emerald-200/60 truncate max-w-[42ch]">Embedded service (iframe)</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
                  {AiServices.map(s => {
                    const active = s.href === activeService.href;
                    const externalOnly = s.embed === false;
                    return (
                      <button
                        title={externalOnly ? 'Opens in new tab' : 'Embed in modal'}
                        key={s.label}
                        onClick={() => openService(s)}
                        className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition border flex items-center gap-1 whitespace-nowrap ${active ? 'bg-emerald-500 border-emerald-400 text-white shadow shadow-emerald-900/40' : externalOnly ? 'bg-amber-500/10 border-amber-400/40 text-amber-300 hover:bg-amber-500/20' : 'bg-white/5 hover:bg-white/10 border-white/10 text-emerald-100/80'}`}
                      >
                        {s.label.split(' ')[0]}
                        {externalOnly && (
                          <svg className="w-3.5 h-3.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(activeService.href, '_blank')}
                  className="hidden sm:inline-flex text-[11px] font-medium px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Open Tab
                </button>
                <button
                  onClick={closeService}
                  aria-label="Close"
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition border border-white/10"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M6 6l12 12M6 18 18 6" /></svg>
                </button>
              </div>
            </header>
            <div className="relative flex-1 rounded-b-2xl overflow-hidden bg-gray-900/60">
              {serviceLoading && !serviceError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
                  <p className="text-xs tracking-wide text-emerald-200/70">Loading {activeService.label}...</p>
                  <p className="text-[10px] text-emerald-300/50">If it does not load, the site may block iframes.</p>
                </div>
              )}
              {serviceError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="text-sm text-emerald-200/80">Unable to embed <span className="font-semibold text-emerald-300">{activeService.label}</span>. The site probably blocks iframes.</p>
                  <div className="flex gap-3">
                    <button onClick={() => openService(activeService)} className="px-4 py-2 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-600 text-white shadow">
                      Retry
                    </button>
                    <button onClick={() => window.open(activeService.href, '_blank')} className="px-4 py-2 text-xs font-semibold rounded-md bg-white/10 hover:bg-white/20 border border-white/10">
                      Open in New Tab
                    </button>
                  </div>
                  <p className="text-[10px] text-emerald-100/40 mt-2 max-w-sm leading-relaxed">Service owners must remove X-Frame-Options=DENY/SAMEORIGIN or set CSP frame-ancestor including this domain to allow embedding.</p>
                </div>
              )}
              {/* Iframe */}
              <iframe
                key={activeService._instance}
                src={activeService.href}
                title={activeService.label}
                className={`w-full h-full ${serviceError ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                sandbox="allow-scripts allow-forms allow-same-origin"
                loading="eager"
                onLoad={() => { setServiceLoading(false); clearTimeout(iframeTimerRef.current); }}
              />
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 md:items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} AI Crop Predict. All rights reserved.</p>
          <p className="text-white/40">Project Created By Raihan and Faizan</p>
        </div>
      </footer>

      {/* Chatbot Floating UI */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3">
        {chatOpen && (
          <Chatbot onClose={()=> setChatOpen(false)} />
        )}
        <button
          onClick={()=> setChatOpen(o=>!o)}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 border border-white/10 hover:scale-105 transition"
          aria-label="Toggle chatbot"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12c0-3.771 0-5.657 1.172-6.828C5.343 4 7.229 4 11 4h2c3.771 0 5.657 0 6.828 1.172C21 6.343 21 8.229 21 12s0 5.657-1.172 6.828C18.657 20 16.771 20 13 20h-1l-4.2 2.1c-.933.467-1.4.7-1.7.49A.9.9 0 0 1 6 21.6V20c-1.771 0-2.657 0-3.828-1.172C1 17.657 1 15.771 1 12" />
            <path d="M8 10h.01M12 10h.01M16 10h.01" />
          </svg>
          <span className="absolute -top-2 -right-2 w-5 h-5 text-[10px] font-semibold rounded-full bg-white/90 text-emerald-600 flex items-center justify-center shadow">{chatOpen ? '×' : 'AI'}</span>
        </button>
      </div>

  <Toaster toasts={toasts} onUndo={handleUndo} remove={removeToast} />

      {/* Simple keyframes (if Tailwind config not extended) */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.35s ease forwards; }
      `}</style>
    </div>
  );
};

export default App;
