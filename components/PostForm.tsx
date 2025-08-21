'use client';

import { useState } from 'react';

interface PostFormProps {
  onSubmit: (post: any) => void;
  onClose: () => void;
}

export default function PostForm({ onSubmit, onClose }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const categories = ['Mathematics', 'Science', 'Language', 'Technology', 'General', 'Business'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({
        title: title.trim(),
        content: content.trim(),
        category
      });
      setTitle('');
      setContent('');
      setCategory('General');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Create New Post</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <i className="ri-close-line text-gray-600"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setContent(e.target.value);
                }
              }}
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              rows={6}
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">Anonymous posting keeps your identity private</span>
              <span className={`text-xs ${content.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                {content.length}/500
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Post Anonymously
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}