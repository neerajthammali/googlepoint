import React from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Zap, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Mon', active: 400, new: 240 },
  { name: 'Tue', active: 300, new: 139 },
  { name: 'Wed', active: 200, new: 980 },
  { name: 'Thu', active: 278, new: 390 },
  { name: 'Fri', active: 189, new: 480 },
  { name: 'Sat', active: 239, new: 380 },
  { name: 'Sun', active: 349, new: 430 },
];

const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-24 bg-brand-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-36 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-brand-darkBlue text-xs font-bold uppercase tracking-[0.15em] mb-8 font-serif">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              Engineering Growth Since 2024
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-darkBlue tracking-tight leading-[1.1] mb-8">
              Learn Smarter.<br />
              <span className="text-brand-gold italic">
                Build Legacy.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 mb-12 leading-relaxed font-serif max-w-2xl mx-auto">
              The digital ecosystem for the modern artisan. Insights, tools, and intelligence to sculpt your masterpiece from chaos.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/assistant" className="inline-flex justify-center items-center px-8 py-4 text-sm uppercase tracking-widest font-bold text-brand-cream bg-brand-darkBlue rounded shadow-lg hover:bg-brand-gold transition-all duration-300">
                Consult AI
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/shop" className="inline-flex justify-center items-center px-8 py-4 text-sm uppercase tracking-widest font-bold text-brand-darkBlue bg-transparent border-2 border-brand-darkBlue rounded hover:bg-brand-darkBlue hover:text-white transition-all duration-300">
                Browse Emporium
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle Paper Texture Overlay could go here */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-gold/10 blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[100px]"></div>
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded border border-stone-200 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-[8px_8px_0px_0px_rgba(180,83,9,0.1)]">
            <div className="flex items-center gap-5 p-4">
              <div className="p-3 bg-brand-darkBlue text-brand-gold rounded">
                <Users size={24} />
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-brand-darkBlue">12k+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Builders</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-4 border-l-0 md:border-l border-stone-100">
              <div className="p-3 bg-brand-gold text-white rounded">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-brand-darkBlue">500+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Assets</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-4 border-l-0 md:border-l border-stone-100">
              <div className="p-3 bg-stone-200 text-brand-darkBlue rounded">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-brand-darkBlue">$2M+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Generated</p>
              </div>
            </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-stone-200 pb-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-brand-darkBlue">Latest Insights</h2>
            <p className="text-stone-500 mt-2 font-serif italic">Tactics and philosophy for the ambitious.</p>
          </div>
          <Link to="/blog" className="hidden sm:flex items-center text-brand-gold font-bold uppercase tracking-wider text-xs hover:text-brand-darkBlue transition-colors mt-4 md:mt-0">
            Read the Journal <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block h-full">
              <div className="bg-white rounded-none border border-stone-200 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-56 overflow-hidden relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover filter sepia-[0.2] transition-all duration-500 group-hover:scale-105 group-hover:sepia-0" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-darkBlue border border-stone-200">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4 text-xs font-serif text-stone-400 italic">{post.date}</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-darkBlue mb-4 leading-tight group-hover:text-brand-gold transition-colors">{post.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6 font-serif flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-brand-darkBlue text-xs font-bold uppercase tracking-widest group-hover:text-brand-gold">
                    Read Article
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Analytics Demo Section (Visual Appeal) */}
      <section className="bg-brand-darkBlue py-24 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-4xl font-serif font-bold mb-6 text-brand-cream">The Architecture of Success</h2>
               <p className="text-stone-400 mb-10 text-lg font-serif leading-relaxed">
                 We believe in data over dogma. Use our proprietary dashboards to visualize your trajectory and pivot with precision.
               </p>
               <ul className="space-y-5 mb-10">
                 {[
                   'Real-time financial telemetry',
                   'Market trend prediction',
                   'Audience sentiment analysis'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-4">
                     <div className="rounded-full bg-brand-gold/20 p-1">
                       <CheckCircle2 className="text-brand-gold w-4 h-4" />
                     </div>
                     <span className="text-stone-300 font-serif">{item}</span>
                   </li>
                 ))}
               </ul>
               <button className="bg-brand-gold text-brand-darkBlue px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
                 Access Dashboard
               </button>
             </div>
             
             {/* Chart Visual */}
             <div className="bg-white/5 backdrop-blur-sm p-8 rounded border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-8">
                 <h3 className="text-lg font-serif text-brand-cream">Weekly Performance</h3>
                 <span className="text-xs text-brand-gold uppercase tracking-wider">Live Data</span>
               </div>
               <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                     <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12, fontFamily: 'serif'}} tickLine={false} axisLine={false} />
                     <YAxis stroke="#94a3b8" tick={{fontSize: 12, fontFamily: 'serif'}} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#b45309', color: '#fdfbf7', fontFamily: 'serif' }}
                        cursor={{fill: '#334155', opacity: 0.2}}
                     />
                     <Bar dataKey="active" fill="#1e3a8a" radius={[2, 2, 0, 0]} />
                     <Bar dataKey="new" fill="#b45309" radius={[2, 2, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-serif font-bold text-brand-darkBlue">Curated Tools</h2>
           <p className="text-stone-500 mt-4 font-serif italic">Artifacts to accelerate your craft.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-white rounded border border-stone-200 p-8 hover:border-brand-gold/50 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded bg-brand-cream border border-stone-100 flex items-center justify-center text-brand-darkBlue group-hover:bg-brand-darkBlue group-hover:text-brand-gold transition-colors">
                    <Zap size={24} />
                  </div>
                  <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-brand-darkBlue font-serif">${product.price}</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-darkBlue mb-3">{product.name}</h3>
                <p className="text-stone-500 text-sm mb-6 font-serif leading-relaxed line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-stone-50 text-stone-500 border border-stone-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full py-3 border border-stone-300 text-stone-600 font-bold text-xs uppercase tracking-widest hover:border-brand-darkBlue hover:bg-brand-darkBlue hover:text-white transition-all">
                  Inspect Tool
                </button>
              </div>
            ))}
        </div>
        <div className="mt-16 text-center">
            <Link to="/shop" className="text-brand-darkBlue font-bold uppercase tracking-widest text-xs border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">View all products</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;