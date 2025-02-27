import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('dineIn');
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    admin: [
      {
        id: 1,
        title: "Restaurant Details Change Request",
        message: "New request to update restaurant operating hours",
        time: "2 hours ago",
        isRead: false,
        type: "restaurant_details",
        status: "pending"
      },
      {
        id: 2,
        title: "Menu Change Approval Required",
        message: "New items added to menu waiting for approval",
        time: "3 hours ago",
        isRead: false,
        type: "menu_change",
        status: "pending"
      },
      {
        id: 3,
        title: "Offer Change Request",
        message: "New seasonal discount offer pending approval",
        time: "5 hours ago",
        isRead: true,
        type: "offer_change",
        status: "approved"
      },
    ],
    takeaway: [
      {
        id: 4,
        title: "New Takeaway Order #123",
        message: "Customer ordered 2 items for takeaway",
        time: "10 mins ago",
        isRead: false,
        status: "new"
      },
      {
        id: 5,
        title: "Order Picked Up",
        message: "Order #120 has been picked up by customer",
        time: "1 hour ago",
        isRead: true,
        status: "completed"
      },
    ],
    reviews: [
      {
        id: 6,
        title: "New Customer Review",
        message: "⭐⭐⭐⭐ Great food and service!",
        time: "4 hours ago",
        isRead: false,
        rating: 4
      },
    ],
    dineIn: [
      {
        id: 7,
        title: "New Dine-in Reservation",
        message: "Table for 4 at 8:00 PM",
        time: "30 mins ago",
        isRead: false,
        status: "new"
      },
      {
        id: 8,
        title: "Dine-in Complete",
        message: "Table 5 has completed their meal",
        time: "2 hours ago",
        isRead: true,
        status: "completed"
      },
    ],
  });

  const handleViewMore = () => {
    switch (activeTab) {
      case 'dineIn':
        navigate('/OrderManag', { state: { defaultTab: 'dining' } });
        break;
      case 'takeaway':
        navigate('/OrderManag', { state: { defaultTab: 'takeaway' } });
        break;
      case 'reviews':
        navigate('/OrderManag', { state: { defaultTab: 'history' } });
        break;
      case 'admin':
        navigate('/OrderManag');
        break;
      default:
        navigate('/OrderManag');
    }
  };

  const handleClearAll = () => {
    setNotifications({
      admin: [],
      takeaway: [],
      reviews: [],
      dineIn: []
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      new: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'dineIn', label: 'Dine-In' },
    { id: 'takeaway', label: 'Takeaway' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 px-4 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {notifications[tab.id]?.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {notifications[tab.id].length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications[activeTab]?.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.isRead ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-lg">{notification.title}</h2>
                  {notification.status && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(notification.status)}`}>
                      {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-500">{notification.time}</span>
                  {activeTab === 'admin' && (
                    <div className="flex gap-2">
                      <button className="text-sm text-green-600 hover:text-green-700">
                        Approve
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {!notification.isRead && (
                <span className="bg-blue-500 h-2 w-2 rounded-full flex-shrink-0"></span>
              )}
            </div>
          </div>
        ))}
        
        {notifications[activeTab]?.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View More
            </button>
          </div>
        )}

        {notifications[activeTab]?.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notifications in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 