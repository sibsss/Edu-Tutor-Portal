'use client';

import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  replies: number;
  likes: number;
  category: string;
}

interface ForumPostProps {
  post: Post;
}

export default function ForumPost({ post }: ForumPostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Mathematics: 'bg-blue-100 text-blue-700',
      Science: 'bg-green-100 text-green-700',
      Language: 'bg-purple-100 text-purple-700',
      Technology: 'bg-orange-100 text-orange-700',
      General: 'bg-gray-100 text-gray-700',
      Business: 'bg-indigo-100 text-indigo-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
          <i className="ri-user-line text-white text-lg"></i>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{post.timestamp}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-800 mb-2 leading-tight">{post.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 text-sm hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors ${
                  liked ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                <i className={`${liked ? 'ri-heart-fill' : 'ri-heart-line'} text-base`}></i>
                <span>{likeCount}</span>
              </button>
              
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                <i className="ri-chat-3-line text-base"></i>
                <span>{post.replies}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <i className="ri-share-line text-gray-400 text-sm"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <i className="ri-bookmark-line text-gray-400 text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}