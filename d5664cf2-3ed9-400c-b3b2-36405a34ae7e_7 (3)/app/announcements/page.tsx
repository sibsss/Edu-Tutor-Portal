'use client';

import Header from '../../components/Header';
import TabBar from '../../components/TabBar';

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "New Math Curriculum Guidelines Released",
      content: "Updated guidelines for teaching algebra and geometry are now available in the resources section. These new standards focus on practical applications and student engagement strategies.",
      priority: "high",
      timestamp: "1 hour ago",
      author: "Education Department"
    },
    {
      id: 2,
      title: "Weekly Tutor Meetup - This Friday",
      content: "Join us for our weekly virtual meetup to discuss best practices and share experiences. This week's topic: 'Effective Online Teaching Strategies'.",
      priority: "medium",
      timestamp: "3 hours ago",
      author: "TutorHub Team"
    },
    {
      id: 3,
      title: "System Maintenance Scheduled",
      content: "The platform will undergo maintenance this Sunday from 2 AM to 4 AM. Forum posting will be temporarily unavailable during this time.",
      priority: "low",
      timestamp: "1 day ago",
      author: "Technical Team"
    },
    {
      id: 4,
      title: "New Resource Library Categories Added",
      content: "We've added new categories to the resource library including 'Special Needs Education' and 'STEM Projects'. Check them out in the Resources section.",
      priority: "medium",
      timestamp: "2 days ago",
      author: "Content Team"
    },
    {
      id: 5,
      title: "Tutor Recognition Program Launch",
      content: "Introducing our new monthly recognition program for outstanding tutors. Nominations are now open for February. Help us celebrate exceptional educators!",
      priority: "high",
      timestamp: "3 days ago",
      author: "TutorHub Team"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'ri-error-warning-line';
      case 'medium': return 'ri-information-line';
      default: return 'ri-notification-3-line';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <i className="ri-megaphone-fill text-blue-500 text-2xl"></i>
            <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
          </div>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityColor(announcement.priority)}`}>
                    <i className={`${getPriorityIcon(announcement.priority)} text-lg`}></i>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{announcement.timestamp}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2 leading-tight">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{announcement.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">By {announcement.author}</span>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                        <i className="ri-bookmark-line text-gray-400 text-sm"></i>
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