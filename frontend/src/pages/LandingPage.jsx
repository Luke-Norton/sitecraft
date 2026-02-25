import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI-Powered Design',
    description: 'Our AI understands your business and creates a website that perfectly matches your brand and goals.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Full Customization',
    description: 'Choose your sections, fonts, colors, animations, and layout. You have complete control over the final result.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Instant Generation',
    description: 'Watch your website come to life in real-time. No waiting days or weeks for a designer.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Revision Loop',
    description: 'Not quite right? Simply describe what you want changed and regenerate instantly.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Production Ready',
    description: 'Clean, semantic HTML with responsive design. Deploy anywhere or use our one-click Vercel deployment.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Your Content, Your Way',
    description: 'Upload your photos, assign them to sections, and we handle the rest beautifully.',
  },
]

const steps = [
  { number: '01', title: 'Tell us about your business', description: 'Share your business name, description, and what makes you unique.' },
  { number: '02', title: 'Define your goals', description: 'What do you want visitors to do? Book appointments, contact you, make purchases?' },
  { number: '03', title: 'Add your content', description: 'Upload your logo, photos, services, and contact information.' },
  { number: '04', title: 'Choose your style', description: 'Pick colors, animations, and visual effects that match your brand.' },
  { number: '05', title: 'Structure your site', description: 'Select sections, fonts, and layout options for your perfect website.' },
  { number: '06', title: 'Review and generate', description: 'Preview everything, hit build, and watch your site come to life.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-syne font-extrabold text-[24px] tracking-tight">
            <span className="text-accent">Bespoke</span>
          </div>
          <Link
            to="/create"
            className="bg-accent hover:bg-accent/90 text-black font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(200,241,53,0.3)]"
          >
            Start Building
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-accent text-sm font-medium">AI-Powered Website Builder</span>
          </div>

          <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-[1.1] mb-6 tracking-tight">
            Your perfect website,{' '}
            <span className="text-accent">built in minutes</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your business, choose your style, and watch as AI creates a stunning,
            production-ready website tailored exactly to your needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-black font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(200,241,53,0.4)] hover:scale-105"
            >
              Build Your Site
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto border border-border hover:border-muted text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-200"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-syne font-bold text-3xl md:text-4xl mb-4">
              Everything you need to launch
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Professional websites without the professional price tag or timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-syne font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-border bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-syne font-bold text-3xl md:text-4xl mb-4">
              How it works
            </h2>
            <p className="text-muted text-lg">
              Six simple steps to your perfect website.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-bg border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
              >
                <div className="font-syne font-bold text-2xl text-accent shrink-0 w-12">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-muted text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/create"
              className="inline-flex bg-accent hover:bg-accent/90 text-black font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(200,241,53,0.4)]"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne font-bold text-3xl md:text-4xl mb-4">
            Ready to build something{' '}
            <span className="text-accent">bespoke</span>?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            No design skills needed. No coding required. Just answer a few questions
            and let AI do the heavy lifting.
          </p>
          <Link
            to="/create"
            className="inline-flex bg-accent hover:bg-accent/90 text-black font-bold px-10 py-5 rounded-full text-xl transition-all duration-200 hover:shadow-[0_0_40px_rgba(200,241,53,0.5)] hover:scale-105"
          >
            Start Building Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-syne font-extrabold text-xl">
            <span className="text-accent">Bespoke</span>
          </div>
          <p className="text-muted text-sm">
            Built with AI. Designed for humans.
          </p>
        </div>
      </footer>
    </div>
  )
}
