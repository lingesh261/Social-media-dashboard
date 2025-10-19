import React, { useState, useCallback } from 'react';
import { Plus, Send } from 'lucide-react';
import { initialScheduledPosts } from './mockData';
import ScheduledPostItem from './ScheduledPostItem';

const SchedulePage = () => {
  const [posts, setPosts] = useState(initialScheduledPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ platform: 'Twitter', content: '', date: '', time: '' });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.content.length < 5 || !newPost.date || !newPost.time) {
        // In a real app, use a better notification system than console log
        console.error("Please fill all fields.");
        return;
    }
    const postToAdd = {
      ...newPost,
      id: posts.length + 1,
      // In a Node/PostgreSQL app, this would be saved to the database.
    };
    setPosts(prev => [...prev, postToAdd]);
    setNewPost({ platform: 'Twitter', content: '', date: '', time: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Content Scheduler</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule New Post
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Posts ({posts.length})</h2>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {posts.length > 0 ? (
            posts.map(post => <ScheduledPostItem key={post.id} post={post} />)
          ) : (
            <p className="text-gray-500 italic">No posts currently scheduled.</p>
          )}
        </div>
      </div>

      {/* Schedule Post Modal (Simulated) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-30 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl transform scale-100 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Schedule New Post</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  name="platform"
                  value={newPost.platform}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  required
                >
                  <option value="Twitter">Twitter</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  rows="4"
                  maxLength="280"
                  placeholder="What's on your mind? (Max 280 chars)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-shadow"
                  required
                ></textarea>
                <p className="text-xs text-right text-gray-500">{newPost.content.length}/280</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newPost.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newPost.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Schedule Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;