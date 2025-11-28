import React, { useState } from 'react';
import { generateGrowthAdvice, generateIdeaValidation } from '../services/geminiService';
import { BrainCircuit, Sparkles, Send, Loader2, Lightbulb, Target } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Assistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'advice' | 'validate'>('advice');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      let response = '';
      if (activeTab === 'advice') {
        response = await generateGrowthAdvice(input);
      } else {
        response = await generateIdeaValidation(input);
      }
      setResult(response);
    } catch (err) {
      setResult("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-darkBlue text-brand-gold border-2 border-brand-gold rounded-full mb-6 shadow-xl">
            <BrainCircuit size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-darkBlue mb-4">The Consigliere</h1>
          <p className="text-stone-500 text-lg font-serif italic">AI-Powered Strategic Counsel</p>
        </div>

        <div className="bg-white rounded-sm shadow-xl border border-stone-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-darkBlue via-brand-gold to-brand-darkBlue"></div>
          
          {/* Tabs */}
          <div className="flex border-b border-stone-200">
            <button
              onClick={() => { setActiveTab('advice'); setResult(null); setInput(''); }}
              className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors ${
                activeTab === 'advice' ? 'bg-brand-cream text-brand-darkBlue border-b-2 border-brand-gold' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Target size={16} />
              Strategic Growth
            </button>
            <button
              onClick={() => { setActiveTab('validate'); setResult(null); setInput(''); }}
              className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors ${
                activeTab === 'validate' ? 'bg-brand-cream text-brand-goldDark border-b-2 border-brand-goldDark' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Lightbulb size={16} />
              Idea Validator
            </button>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">
                {activeTab === 'advice' ? 'State Your Challenge' : 'Describe The Concept'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={activeTab === 'advice' ? "e.g., How do I acquire my first 100 enterprise clients?" : "e.g., A subscription service for vintage watch repair."}
                className="w-full h-40 p-6 border-2 border-stone-100 bg-stone-50 rounded focus:ring-0 focus:border-brand-gold focus:outline-none resize-none text-brand-charcoal font-serif text-lg placeholder-stone-400 transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className={`w-full py-4 rounded font-bold uppercase tracking-widest text-xs text-white flex items-center justify-center gap-3 transition-all shadow-md ${
                loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand-darkBlue hover:bg-brand-gold hover:text-brand-darkBlue'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Analyzing Data...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {activeTab === 'advice' ? 'Request Counsel' : 'Validate Concept'}
                </>
              )}
            </button>

            {/* Results Area */}
            {result && (
              <div className="mt-12 pt-10 border-t border-stone-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] mb-6">Strategic Output</h3>
                <div className="bg-brand-cream p-8 border border-stone-200 rounded-sm relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold"></div>
                  <div className="prose prose-stone prose-sm max-w-none prose-headings:font-serif prose-headings:text-brand-darkBlue prose-p:font-serif prose-p:text-stone-700">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
            
            {/* Disclaimer */}
            {!result && !loading && (
               <div className="mt-12 text-center">
                 <p className="text-[10px] uppercase tracking-widest text-stone-400">
                   Powered by Gemini 2.5 Flash • For Informational Use Only
                 </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;