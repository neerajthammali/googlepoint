import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { Plus, MessageCircle, Eye, User, Calendar, Search } from 'lucide-react';
import { ForumTopic } from '../types';
import { INITIAL_FORUM_TOPICS } from '../constants';

const Forum: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  useEffect(() => {
    const stored = localStorage.getItem('hp_forum_topics');
    if (stored) {
      setTopics(JSON.parse(stored));
    } else {
      setTopics(INITIAL_FORUM_TOPICS);
      localStorage.setItem('hp_forum_topics', JSON.stringify(INITIAL_FORUM_TOPICS));
    }
  }, []);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    const newTopic: ForumTopic = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      author: newAuthor,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      category: newCategory,
      replies: [],
      views: 0
    };

    const updatedTopics = [newTopic, ...topics];
    setTopics(updatedTopics);
    localStorage.setItem('hp_forum_topics', JSON.stringify(updatedTopics));

    // Reset and Close
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewCategory('General');
    setIsModalOpen(false);
  };

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-brand-gold pb-6 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <MessageCircle className="text-brand-gold" size={32} />
               <h1 className="text-4xl font-serif font-bold text-brand-darkBlue">The Commons</h1>
            </div>
            <p className="text-stone-500 font-serif italic max-w-xl">
              A private gathering for builders to exchange trade secrets, validate blueprints, and forge alliances.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-darkBlue text-brand-gold px-6 py-3 rounded shadow-lg hover:bg-brand-gold hover:text-brand-darkBlue transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2"
          >
            <Plus size={16} />
            Start Discussion
          </button>
        </div>

        {/* Search */}
        <div className="mb-8 relative max-w-md">
           <input 
              type="text" 
              placeholder="Search discussions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded focus:border-brand-darkBlue focus:outline-none font-serif text-sm"
           />
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <Link key={topic.id} to={`/forum/${topic.id}`} className="block group">
                <div className="bg-white border border-stone-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-brand-gold hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                   {/* Decorative side bar */}
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-darkBlue group-hover:bg-brand-gold transition-colors"></div>
                   
                   <div className="flex-1 pl-3">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/20 px-2 py-0.5 rounded bg-brand-gold/5">
                          {topic.category}
                        </span>
                        <span className="text-xs text-stone-400 font-serif">{topic.date}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-brand-darkBlue mb-2 group-hover:text-brand-gold transition-colors">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-serif italic">
                         <User size={12} />
                         <span>{topic.author}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-6 text-stone-400 pr-4">
                      <div className="flex flex-col items-center min-w-[60px]">
                         <span className="text-lg font-bold text-brand-darkBlue font-serif">{topic.replies.length}</span>
                         <span className="text-[10px] uppercase tracking-wider">Replies</span>
                      </div>
                      <div className="flex flex-col items-center min-w-[60px]">
                         <span className="text-lg font-bold text-brand-darkBlue font-serif">{topic.views}</span>
                         <span className="text-[10px] uppercase tracking-wider">Views</span>
                      </div>
                   </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-stone-300">
               <p className="text-stone-500 font-serif italic">No discussions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Topic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-darkBlue/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-brand-cream">
              <h2 className="text-2xl font-serif font-bold text-brand-darkBlue">Start a New Discussion</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-500 hover:text-brand-darkBlue">
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateTopic} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Topic Title</label>
                    <input 
                      type="text" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded focus:border-brand-gold focus:outline-none font-serif"
                      placeholder="e.g. Scaling via LinkedIn"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Category</label>
                    <select 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded focus:border-brand-gold focus:outline-none font-serif"
                    >
                      <option>General</option>
                      <option>Strategy</option>
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                    </select>
                 </div>
              </div>
              
              <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Your Name</label>
                 <input 
                    type="text" 
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded focus:border-brand-gold focus:outline-none font-serif"
                    placeholder="e.g. John Doe"
                 />
              </div>

              <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Content</label>
                 <textarea 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full h-32 p-3 bg-stone-50 border border-stone-200 rounded focus:border-brand-gold focus:outline-none font-serif resize-none"
                    placeholder="What's on your mind?"
                 />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-stone-100">
                 <button 
                   type="button" 
                   onClick={() => setIsModalOpen(false)}
                   className="px-6 py-2 text-stone-500 hover:text-brand-darkBlue font-serif font-bold text-sm"
                 >
                   Cancel
                 </button>
                 <button 
                   type="submit" 
                   className="px-8 py-2 bg-brand-darkBlue text-white rounded shadow hover:bg-brand-gold hover:text-brand-darkBlue transition-colors font-bold uppercase tracking-widest text-xs"
                 >
                   Publish Topic
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;