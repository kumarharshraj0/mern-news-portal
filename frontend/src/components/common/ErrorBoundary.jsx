import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 text-center">
          <div className="max-w-md w-full">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            
            <h2 className="text-4xl font-serif font-bold text-ink tracking-tight mb-6">Something stalled</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-12">
              Our editorial system encountered an unexpected disruption. We've been notified and are investigating.
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="btn-primary py-5 rounded-2xl"
              >
                Return to Newsroom
              </button>
              <button 
                onClick={() => this.setState({ hasError: false })}
                className="text-[10px] font-semibold uppercase tracking-widest text-ink/40 hover:text-ink transition-colors mt-4"
              >
                Attempt Recovery
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
