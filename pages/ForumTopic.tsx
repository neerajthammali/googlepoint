import React, { useState, useEffect } from 'react';
// @ts-ignore
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, User, Calendar, MessageSquare, Send } from 'lucide-react';
import { ForumTopic, ForumReply } from '../types';
import { INITIAL_FORUM_TOPICS } from '../constants';

const ForumTopicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('hp_forum_topics');
    let allTopics: ForumTopic[] = [];
    
    if (stored) {
      allTopics = JSON.parse(stored);
    } else {
      allTopics = INITIAL_FORUM_TOPICS;
    }
    
    setTopics(allTopics);
    const found = allTopics.find(t => t.id === id);
    setTopic(found || null);

    // Increment View Count (simple logic)
    if (found) {
        const updated = allTopics.map(t => {
            if (t.id === id) {
                return { ...t, views: (t.views || 0) + 1 };
            }
            return t;
        });
        localStorage.setItem('hp_forum_topics', JSON.stringify(updated));
    }

  }, [id]);

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyAuthor.trim() || !topic) return;

    const newReply: ForumReply = {
      id: Date.now().toString(),
      author: replyAuthor,
      content: replyContent,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };

    const updatedTopic = {
      ...topic,
      replies: [...topic.replies, newReply]
    };

    const updatedTopics = topics.map(t => t.id === topic.id ? updatedTopic : t);
    
    setTopics(updatedTopics);
    setTopic(updatedTopic);
    localStorage.setItem('hp_forum_topics', JSON.stringify(updatedTopics));

    setReplyContent('');
    setReplyAuthor('');
  };

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream">
        <h1 className="text-3xl font-serif font-bold text-brand-darkBlue mb-4">Topic Not Found</h1>
        <Link to="/forum" className="text-brand-gold hover:underline font-serif italic">Return to The Commons</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/forum" className="inline-flex items-center text-stone-500 hover:text-brand-darkBlue mb-8 transition-colors font-serif italic group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to The Commons
        </Link>

        {/* Main Topic Card */}
        <div className="bg-white border border-stone-200 p-8 md:p-10 shadow-lg relative mb-12">
           <div className="absolute top-0 left-0 w-full h-1 bg-brand-darkBlue"></div>
           
           <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-darkBlue bg-stone-100 px-3 py-1 rounded">
                {topic.category}
              </span>
              <span className="text-xs text-stone-400 font-serif">{topic.date}</span>
           </div>

           <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-darkBlue mb-6 leading-tight">
             {topic.title}
           </h1>

           <div className="prose prose-stone prose-lg max-w-none font-serif mb-8 text-stone-600">
             {topic.content}
           </div>

           <div className="flex items-center gap-3 pt-6 border-t border-stone-100">
             <div className="w-10 h-10 bg-brand-darkBlue text-brand-gold flex items-center justify-center rounded-full font-serif font-bold">
                {topic.author.charAt(0).toUpperCase()}
             </div>
             <div>
               <p className="text-sm font-bold text-brand-darkBlue font-serif">{topic.author}</p>
               <p className="text-[10px] uppercase tracking-wider text-stone-400">Original Poster</p>
             </div>
           </div>
        </div>

        {/* Replies Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
             <MessageSquare className="text-brand-gold" size={24} />
             <h3 className="text-2xl font-serif font-bold text-brand-darkBlue">
               {topic.replies.length} Responses
             </h3>
          </div>

          <div className="space-y-6">
            {topic.replies.map((reply) => (
               <div key={reply.id} className="bg-stone-50 border border-stone-200 p-6 rounded-r-xl border-l-4 border-l-brand-gold/30 ml-4 md:ml-8">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white border border-stone-200 flex items-center justify-center rounded-full text-brand-darkBlue font-serif font-bold text-xs">
                          {reply.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-serif font-bold text-brand-charcoal text-sm">{reply.author}</span>
                     </div>
                     <span className="text-xs text-stone-400 font-serif italic">{reply.date}</span>
                  </div>
                  <p className="text-stone-600 font-serif text-sm leading-relaxed">
                    {reply.content}
                  </p>
               </div>
            ))}
            
            {topic.replies.length === 0 && (
              <p className="text-stone-400 italic font-serif ml-4">No responses yet. Be the first to weigh in.</p>
            )}
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-white border border-stone-200 p-8 shadow-sm rounded-lg">
           <h4 className="text-xl font-serif font-bold text-brand-darkBlue mb-6">Contribute to the Discussion</h4>
           <form onSubmit={handleReply} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded focus:border-brand-gold focus:outline-none font-serif"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Response</label>
                <textarea 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full h-32 px-4 py-3 bg-stone-50 border border-stone-200 rounded focus:border-brand-gold focus:outline-none font-serif resize-none"
                  placeholder="Add your insights..."
                />
              </div>
              <button 
                type="submit" 
                className="inline-flex items-center px-8 py-3 bg-brand-darkBlue text-white rounded font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-darkBlue transition-all shadow-md"
              >
                Post Response <Send size={14} className="ml-2" />
              </button>
           </form>
        </div>

      </div>
    </div>
  );
};

export default ForumTopicDetail;