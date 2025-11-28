import React, { useState } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Calculate Pagination
  const totalPages = Math.ceil(BLOG_POSTS.length / itemsPerPage);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = BLOG_POSTS.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold text-brand-darkBlue mb-6">The Hustlers Journal</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-serif italic">
            Chronicling the strategies of the new vanguard.
          </p>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[600px]">
          {currentPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="flex flex-col group">
              <article className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="h-60 overflow-hidden relative">
                   <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.3] group-hover:sepia-0" 
                   />
                   <div className="absolute top-0 left-0 bg-brand-darkBlue text-brand-gold px-4 py-2 text-xs font-bold uppercase tracking-widest">
                     {post.category}
                   </div>
                </div>
                <div className="p-8 flex-1 flex flex-col bg-white relative">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-t-brand-gold/20 border-l-[20px] border-l-transparent"></div>
                  
                  <div className="flex items-center gap-4 text-xs text-stone-400 mb-5 font-serif uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </div>
                    <div className="w-px h-3 bg-stone-300"></div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-brand-darkBlue mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-1 font-serif line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-brand-darkBlue font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    Continue Reading <ArrowRight className="ml-2 w-3 h-3 text-brand-gold" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {currentPosts.length === 0 && (
             <div className="col-span-full text-center py-20">
               <p className="text-stone-500 font-serif italic">No articles found on this page.</p>
             </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
             <button 
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className={`flex items-center px-4 py-2 border rounded font-serif font-bold text-xs uppercase tracking-widest transition-colors ${currentPage === 1 ? 'border-stone-200 text-stone-300 cursor-not-allowed' : 'border-brand-darkBlue text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white'}`}
             >
               <ChevronLeft size={14} className="mr-2" />
               Previous
             </button>
             
             <div className="flex gap-2">
               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                 <button
                   key={page}
                   onClick={() => handlePageChange(page)}
                   className={`w-10 h-10 rounded-full font-serif font-bold text-xs flex items-center justify-center transition-colors ${currentPage === page ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-stone-500 border border-stone-200 hover:border-brand-gold'}`}
                 >
                   {page}
                 </button>
               ))}
             </div>

             <button 
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className={`flex items-center px-4 py-2 border rounded font-serif font-bold text-xs uppercase tracking-widest transition-colors ${currentPage === totalPages ? 'border-stone-200 text-stone-300 cursor-not-allowed' : 'border-brand-darkBlue text-brand-darkBlue hover:bg-brand-darkBlue hover:text-white'}`}
             >
               Next
               <ChevronRight size={14} className="ml-2" />
             </button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-24 bg-brand-darkBlue rounded-none p-10 md:p-16 text-center text-white relative overflow-hidden border-t-4 border-brand-gold shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
             <h3 className="text-3xl font-serif font-bold mb-4">The Tuesday Dispatch</h3>
             <p className="text-stone-300 mb-10 font-serif text-lg">Join 20,000+ others receiving our weekly operational intelligence briefing.</p>
             <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
               <input 
                 type="email" 
                 placeholder="Email Address" 
                 className="flex-1 px-6 py-4 bg-brand-cream text-brand-darkBlue focus:outline-none font-serif placeholder-stone-400 border-none"
               />
               <button className="bg-brand-gold text-brand-darkBlue hover:bg-white px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors">
                 Subscribe
               </button>
             </form>
          </div>
          {/* Abstract texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Blog;