'use client';

import { useState } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import AnnouncementSection from '../components/AnnouncementSection';
import ForumPost from '../components/ForumPost';
import PostForm from '../components/PostForm';

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Best practices for teaching calculus to high school students?",
      content: "I've been tutoring calculus for 3 years, but I'm still struggling with making derivatives intuitive for students. What methods have worked for you?",
      author: "Anonymous Tutor",
      timestamp: "2 hours ago",
      replies: 12,
      likes: 8,
      category: "Mathematics"
    },
    {
      id: 2,
      title: "Dealing with unmotivated students",
      content: "How do you handle students who seem completely disinterested in learning? I've tried various approaches but nothing seems to work.",
      author: "Anonymous Tutor",
      timestamp: "5 hours ago",
      replies: 23,
      likes: 15,
      category: "General"
    },
    {
      id: 3,
      title: "Online tutoring vs in-person - pros and cons?",
      content: "With the rise of online platforms, I'm considering switching. What has been your experience with online tutoring compared to face-to-face sessions?",
      author: "Anonymous Tutor",
      timestamp: "1 day ago",
      replies: 34,
      likes: 22,
      category: "Technology"
    },
    {
      id: 4,
      title: "Setting appropriate rates for different subjects",
      content: "I tutor multiple subjects and I'm unsure about pricing. Should advanced subjects like physics cost more than basic math? What's fair?",
      author: "Anonymous Tutor",
      timestamp: "2 days ago",
      replies: 18,
      likes: 11,
      category: "Business"
    }
  ]);

  const [showPostForm, setShowPostForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mathematics', 'Science', 'Language', 'Technology', 'General', 'Business'];

  const handleAddPost = (newPost: any) => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: "Anonymous Tutor",
      timestamp: "Just now",
      replies: 0,
      likes: 0
    };
    setPosts([post, ...posts]);
    setShowPostForm(false);
  };

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <AnnouncementSection />
        
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Forum Discussion</h2>
            <button 
              onClick={() => setShowPostForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <i className="ri-add-line mr-1"></i>
              New Post
            </button>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <ForumPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <TabBar />
      
      {showPostForm && (
        <PostForm 
          onSubmit={handleAddPost}
          onClose={() => setShowPostForm(false)}
        />
      )}
    </div>
  );
}