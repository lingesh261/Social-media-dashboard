import React from 'react';
import { Twitter, Instagram } from 'lucide-react';

const ScheduledPostItem = ({ post }) => (
  <div className="flex justify-between items-start p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-lg shadow-sm mb-3">
    <div className="flex-1 min-w-0">
      <div className="flex items-center text-sm font-semibold text-gray-800 mb-1">
        {post.platform === 'Twitter' ? <Twitter className="w-4 h-4 mr-2 text-blue-500" /> : <Instagram className="w-4 h-4 mr-2 text-pink-500" />}
        {post.platform}
      </div>
      <p className="text-gray-600 text-sm truncate">{post.content}</p>
    </div>
    <div className="text-right ml-4 flex-shrink-0">
      <p className="text-xs font-medium text-gray-700">{post.date}</p>
      <p className="text-xs text-gray-500">{post.time}</p>
    </div>
  </div>
);

export default ScheduledPostItem;