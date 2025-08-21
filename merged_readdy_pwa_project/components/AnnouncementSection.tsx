'use client';

export default function AnnouncementSection() {
  const announcements = [
    {
      id: 1,
      title: "New Math Curriculum Guidelines Released",
      content: "Updated guidelines for teaching algebra and geometry are now available in the resources section.",
      priority: "high",
      timestamp: "1 hour ago"
    },
    {
      id: 2,
      title: "Weekly Tutor Meetup - This Friday",
      content: "Join us for our weekly virtual meetup to discuss best practices and share experiences.",
      priority: "medium",
      timestamp: "3 hours ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-megaphone-fill text-blue-500 text-lg"></i>
        <h2 className="text-lg font-bold text-gray-800">Latest Announcements</h2>
      </div>
      
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{announcement.timestamp}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{announcement.content}</p>
              </div>
              <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                <i className="ri-more-line text-gray-400 text-sm"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}