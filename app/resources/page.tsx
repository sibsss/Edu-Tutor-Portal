'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import TabBar from '../../components/TabBar';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Teaching Guides', 'Curriculum', 'Tools', 'Research', 'Professional Development'];

  const resources = [
    {
      id: 1,
      title: 'Effective Math Teaching Strategies',
      description: 'Comprehensive guide on modern approaches to mathematics education',
      category: 'Teaching Guides',
      type: 'PDF',
      downloadCount: 1200,
      rating: 4.8,
      image: 'https://readdy.ai/api/search-image?query=Modern%20mathematics%20education%20guide%2C%20teaching%20strategies%20book%20cover%2C%20colorful%20educational%20design%2C%20mathematical%20symbols%20and%20formulas%20background%2C%20professional%20academic%20layout%2C%20vibrant%20blue%20and%20orange%20gradient%20background&width=300&height=200&seq=1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Science Lab Safety Protocols',
      description: 'Essential safety guidelines for conducting science experiments',
      category: 'Teaching Guides',
      type: 'Document',
      downloadCount: 890,
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Science%20laboratory%20safety%20guide%2C%20chemistry%20lab%20equipment%20illustration%2C%20safety%20symbols%20and%20icons%2C%20clean%20white%20background%20with%20blue%20accents%2C%20professional%20medical%20design&width=300&height=200&seq=2&orientation=landscape'
    },
    {
      id: 3,
      title: 'New STEM Curriculum 2024',
      description: 'Updated STEM curriculum standards and implementation guide',
      category: 'Curriculum',
      type: 'PDF',
      downloadCount: 1500,
      rating: 4.7,
      image: 'https://readdy.ai/api/search-image?query=STEM%20education%20curriculum%20guide%2C%20science%20technology%20engineering%20math%20icons%2C%20modern%20educational%20design%2C%20geometric%20patterns%20background%2C%20green%20and%20blue%20gradient%20theme&width=300&height=200&seq=3&orientation=landscape'
    },
    {
      id: 4,
      title: 'Online Teaching Tools Comparison',
      description: 'Compare popular digital tools for remote and hybrid learning',
      category: 'Tools',
      type: 'Spreadsheet',
      downloadCount: 650,
      rating: 4.6,
      image: 'https://readdy.ai/api/search-image?query=Digital%20teaching%20tools%20comparison%20chart%2C%20laptop%20computer%20with%20educational%20apps%2C%20technology%20icons%2C%20modern%20flat%20design%2C%20purple%20and%20teal%20gradient%20background&width=300&height=200&seq=4&orientation=landscape'
    },
    {
      id: 5,
      title: 'Student Engagement Research',
      description: 'Latest findings on improving student motivation and participation',
      category: 'Research',
      type: 'Research Paper',
      downloadCount: 420,
      rating: 4.8,
      image: 'https://readdy.ai/api/search-image?query=Student%20engagement%20research%20paper%2C%20academic%20study%20illustration%2C%20diverse%20students%20learning%20together%2C%20modern%20classroom%20setting%2C%20soft%20blue%20and%20yellow%20gradient%20background&width=300&height=200&seq=5&orientation=landscape'
    },
    {
      id: 6,
      title: 'Professional Development Webinar Series',
      description: 'Monthly webinars on advanced teaching methodologies',
      category: 'Professional Development',
      type: 'Video Series',
      downloadCount: 780,
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=Professional%20development%20webinar%2C%20online%20learning%20presentation%2C%20teacher%20training%20session%2C%20modern%20video%20conference%20interface%2C%20orange%20and%20blue%20gradient%20background&width=300&height=200&seq=6&orientation=landscape'
    }
  ];

  const filteredResources = activeCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  const getTypeIcon = (type: string) => {
    const icons = {
      'PDF': 'ri-file-pdf-line',
      'Document': 'ri-file-text-line',
      'Spreadsheet': 'ri-file-excel-line',
      'Research Paper': 'ri-article-line',
      'Video Series': 'ri-play-circle-line'
    };
    return icons[type as keyof typeof icons] || 'ri-file-line';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'PDF': 'text-red-600 bg-red-100',
      'Document': 'text-blue-600 bg-blue-100',
      'Spreadsheet': 'text-green-600 bg-green-100',
      'Research Paper': 'text-purple-600 bg-purple-100',
      'Video Series': 'text-orange-600 bg-orange-100'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-book-3-fill text-blue-500 text-2xl"></i>
            <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
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
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 leading-tight">{resource.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{resource.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                      <i className={`${getTypeIcon(resource.type)} text-sm`}></i>
                      <span className="text-xs font-medium">{resource.type}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <i className="ri-download-line text-xs"></i>
                        <span>{resource.downloadCount}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {resource.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <i className="ri-bookmark-line text-gray-400 text-sm"></i>
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                        <i className="ri-download-line text-sm"></i>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <TabBar />
    </div>
  );
}