import React, { useState, useEffect } from 'react';
// @ts-ignore
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS } from '../constants';
import { ChevronLeft, Calendar, User, MessageSquare, Send, Twitter, Linkedin, Facebook, Link as LinkIcon, Check, ArrowRight, Loader2 } from 'lucide-react';
import { Comment } from '../types';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  // State for dynamic content loading
  const [postContent, setPostContent] = useState<string>(post?.content || '');
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(!!post?.contentPath);
  const [contentError, setContentError] = useState<boolean>(false);

  // SEO: Update Title and Meta Description
  useEffect(() => {
    if (post) {
      // Update Title
      document.title = `${post.title} | Hustlers Point`;
      
      // Update Meta Description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }
    }

    // Cleanup to reset title on unmount
    return () => {
      document.title = "Hustlers Point | Build Faster, Grow Smarter";
    };
  }, [post]);

  // Load Content (Inline or Fetch)
  useEffect(() => {
    if (!post) return;

    if (post.contentPath) {
      setIsLoadingContent(true);
      fetch(post.contentPath)
        .then(response => {
          if (!response.ok) throw new Error("Failed to fetch article");
          return response.text();
        })
        .then(text => {
          setPostContent(text);
          setIsLoadingContent(false);
        })
        .catch(err => {
          console.error("Error loading post content:", err);
          setContentError(true);
          setIsLoadingContent(false);
        });
    } else if (post.content) {
      setPostContent(post.content);
      setIsLoadingContent(false);
    }
  }, [post]);

  // Load comments from localStorage
  useEffect(() => {
    if (id) {
      const storedComments = localStorage.getItem(`hp_comments_${id}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      } else {
        setComments([]);
      }
    }
  }, [id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentContent.trim() || !id) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: newCommentName,
      content: newCommentContent,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`hp_comments_${id}`, JSON.stringify(updatedComments));
    
    setNewCommentName('');
    setNewCommentContent('');
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream">
        <h1 className="text-3xl font-serif font-bold text-brand-darkBlue mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-brand-gold hover:underline font-serif italic">Return to Journal</Link>
      </div>
    );
  }

  const currentUrl = window.location.href;

  // Filter related posts (Same category, excluding current post)
  const relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-brand-cream py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/blog" className="inline-flex items-center text-stone-500 hover:text-brand-darkBlue mb-12 transition-colors font-serif italic group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>
        
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
             <span className="bg-stone-200/50 text-brand-darkBlue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border border-stone-200">
               {post.category}
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-darkBlue tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-stone-500 text-sm font-serif italic border-t border-b border-double border-stone-300 py-4 max-w-md mx-auto">
             <div className="flex items-center gap-2">
               <User size={16} className="text-brand-gold" />
               <span>{post.author}</span>
             </div>
             <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
             <div className="flex items-center gap-2">
               <Calendar size={16} className="text-brand-gold" />
               <span>{post.date}</span>
             </div>
          </div>
        </header>

        <div className="bg-white p-2 shadow-lg rotate-1 rounded-lg mb-12 border border-stone-200">
           <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto rounded filter sepia-[0.15] contrast-[1.05]"
          />
        </div>

        {/* Content Section */}
        <div className="min-h-[200px] mb-16">
          {isLoadingContent ? (
            <div className="flex flex-col items-center justify-center py-20 text-stone-400">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-serif italic text-sm">Loading article contents...</p>
            </div>
          ) : contentError ? (
            <div className="bg-red-50 border border-red-200 text-red-800 p-8 rounded text-center font-serif">
              <p>We encountered an issue loading this article. Please try again later.</p>
            </div>
          ) : (
            <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:text-brand-darkBlue prose-p:font-serif prose-p:leading-loose prose-a:text-brand-gold hover:prose-a:text-brand-goldDark prose-blockquote:border-l-brand-gold prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:font-serif">
              <ReactMarkdown>{postContent}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Author Biography Section */}
        <div className="mb-12 bg-white rounded-lg border border-stone-200 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
          <div className="flex-shrink-0">
            {post.authorAvatar ? (
              <img 
                src={post.authorAvatar} 
                alt={post.author} 
                className="w-24 h-24 rounded-full border-4 border-stone-100 shadow-inner object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-brand-darkBlue text-brand-gold flex items-center justify-center font-serif font-bold text-3xl border-4 border-stone-100">
                {post.author.charAt(0)}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 font-serif">About the Author</h4>
            <h3 className="text-2xl font-serif font-bold text-brand-darkBlue mb-3">{post.author}</h3>
            <p className="text-stone-600 font-serif italic leading-relaxed text-sm">
              {post.authorBio || `An expert contributor at Hustlers Point, sharing insights on ${post.category.toLowerCase()} and growth.`}
            </p>
          </div>
        </div>
        
        {/* Social Share Section */}
        <div className="py-8 my-12 border-t border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 px-6 rounded-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 font-serif">Share this insight</span>
            <div className="flex items-center gap-3">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 border border-stone-200"
                  aria-label="Share on Twitter"
                >
                    <Twitter size={18} />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-[#0A66C2] hover:text-white transition-all duration-300 border border-stone-200"
                  aria-label="Share on LinkedIn"
                >
                    <Linkedin size={18} />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300 border border-stone-200"
                   aria-label="Share on Facebook"
                >
                    <Facebook size={18} />
                </a>
                 <button 
                  onClick={handleCopyLink}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${isCopied ? 'bg-green-600 text-white border-green-600' : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-brand-gold hover:text-white hover:border-brand-gold'}`}
                  aria-label="Copy Link"
                >
                    {isCopied ? <Check size={18} /> : <LinkIcon size={18} />}
                </button>
            </div>
        </div>
        
        <div className="mt-10 pt-10">
          <h3 className="text-2xl font-serif font-bold text-brand-darkBlue mb-8 flex items-center gap-3">
            <MessageSquare className="text-brand-gold" size={24} />
            Discussion
          </h3>

          {/* Comment Form */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 mb-12">
            <h4 className="text-lg font-serif font-bold text-brand-charcoal mb-4">Leave a Remark</h4>
            <form onSubmit={handleAddComment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="w-full px-4 py-2 border-b-2 border-stone-200 bg-stone-50 focus:border-brand-gold focus:outline-none transition-colors font-serif"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Comment</label>
                <textarea 
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  className="w-full px-4 py-3 border-b-2 border-stone-200 bg-stone-50 focus:border-brand-gold focus:outline-none transition-colors resize-none font-serif h-32"
                  placeholder="Share your thoughts..."
                />
              </div>
              <button 
                type="submit" 
                className="inline-flex items-center px-6 py-3 bg-brand-darkBlue text-brand-gold border border-brand-darkBlue rounded font-serif font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-brand-darkBlue transition-all shadow-md"
              >
                Post Comment <Send size={14} className="ml-2" />
              </button>
            </form>
          </div>

          {/* Comment List */}
          <div className="space-y-8">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold font-serif font-bold border border-brand-gold/20">
                     {comment.author.charAt(0).toUpperCase()}
                   </div>
                   <div className="flex-1">
                      <div className="bg-white p-6 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-sm border border-stone-100 relative">
                         <div className="flex justify-between items-center mb-2">
                           <h5 className="font-serif font-bold text-brand-darkBlue">{comment.author}</h5>
                           <span className="text-xs text-stone-400 font-serif italic">{comment.date}</span>
                         </div>
                         <p className="text-stone-600 font-serif text-sm leading-relaxed">{comment.content}</p>
                      </div>
                   </div>
                </div>
              ))
            ) : (
               <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-stone-300">
                 <p className="text-stone-400 font-serif italic">No remarks yet. Be the first to share your wisdom.</p>
               </div>
            )}
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <h3 className="text-2xl font-serif font-bold text-brand-darkBlue mb-8">Related Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map(related => (
                <Link key={related.id} to={`/blog/${related.id}`} className="group block h-full">
                  <div className="bg-white border border-stone-200 h-full flex flex-col hover:shadow-lg transition-all duration-300">
                     <div className="h-40 overflow-hidden relative">
                        <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover filter sepia-[0.2] transition-transform duration-500 group-hover:scale-105 group-hover:sepia-0" />
                        <div className="absolute top-0 left-0 bg-brand-darkBlue text-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                          {related.category}
                        </div>
                     </div>
                     <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs text-stone-400 font-serif italic mb-2">{related.date}</div>
                        <h4 className="text-lg font-serif font-bold text-brand-darkBlue mb-3 leading-tight group-hover:text-brand-gold transition-colors">
                          {related.title}
                        </h4>
                        <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-brand-darkBlue group-hover:translate-x-1 transition-transform">
                           Read <ArrowRight size={12} className="ml-1" />
                        </div>
                     </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};

export default BlogPost;