import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaCog, FaPen, FaEnvelope, FaUserCircle, FaCloudUploadAlt, FaVideo, FaTimes, FaCheck, FaPlayCircle } from "react-icons/fa";

const initialMessages = [
  {
    id: 1,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    time: "a week ago",
    content:
      "Dear Sagetoad, Thank you very much for contacting Public Mobile. My name is Jorge. I am sorry you are having issues with your port. It is my pleasure to assist you. So I can access your account, what is your Public Mobile phone number? What is your email? What is the phone number you ...",
  },
  {
    id: 2,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    time: "a week ago",
    content: "Hi Akhil, Just a follow-up! The part of message we are waiting for it. I am sorry you are having issues with your port. It is my pleasure to assist you. So I can access your account, what is your Public Mobile phone number? What is your email? What is the phone number you",
  },
  {
    id: 3,
    sender: "CS_Agent",
    subject: "Re: New Customer : Moving from Fido to Public",
    time: "a week ago",
    content: "Hi Akhil, Thank you for your response! ...",
  },
];

const VideoUploader = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const videoFiles = files.filter(file => 
      file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024
    ).slice(0, 5);

    setVideos(prev => [
      ...prev,
      ...videoFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        status: 'uploading',
        thumbnail: URL.createObjectURL(file)
      }))
    ]);

    // Simulate upload progress
    videoFiles.forEach(file => {
      simulateUpload(file);
    });
  };

  const simulateUpload = (file) => {
    const interval = setInterval(() => {
      setVideos(prev => prev.map(video => {
        if (video.file === file) {
          const newProgress = Math.min((video.progress || 0) + 10, 100);
          return {
            ...video,
            progress: newProgress,
            status: newProgress === 100 ? 'complete' : 'uploading'
          };
        }
        return video;
      }));
    }, 500);

    setTimeout(() => clearInterval(interval), 5000);
  };

  const removeVideo = (videoId) => {
    setVideos(prev => prev.filter(video => video.id !== videoId));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">Upload Videos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <FaTimes className="text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center
              transition-all duration-200
              ${dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-200 hover:border-blue-400'
              }
            `}
          >
            <FaCloudUploadAlt className={`
              text-5xl mb-4 transition-all duration-200
              ${dragActive ? 'text-blue-500' : 'text-slate-400'}
            `} />
            
            <p className="text-slate-600 text-center mb-2">
              Drag and drop your videos here, or{' '}
              <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFiles([...e.target.files])}
                />
              </label>
            </p>
            <p className="text-sm text-slate-500">
              Maximum file size: 100MB (Up to 5 videos)
            </p>
          </div>

          {/* Video Preview List */}
          {videos.length > 0 && (
            <div className="mt-6 space-y-4">
              {videos.map(video => (
                <div
                  key={video.id}
                  className="bg-slate-50 rounded-lg p-4 flex items-center"
                >
                  {/* Video Thumbnail */}
                  <div className="relative w-24 h-16 bg-slate-200 rounded-lg overflow-hidden mr-4">
                    <video className="w-full h-full object-cover">
                      <source src={video.thumbnail} type={video.file.type} />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30">
                      <FaPlayCircle className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-800 truncate">
                          {video.file.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {(video.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => removeVideo(video.id)}
                        className="p-1.5 hover:bg-slate-200 rounded-full transition-all duration-200"
                      >
                        <FaTimes className="text-slate-400 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2">
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${video.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-500">
                          {video.status === 'complete' ? (
                            <span className="text-green-500 flex items-center">
                              <FaCheck className="mr-1" /> Complete
                            </span>
                          ) : (
                            `Uploading: ${video.progress}%`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
              onClick={onClose}
            >
              Upload All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [activeMessage, setActiveMessage] = useState(messages[0]);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [reply, setReply] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeDetails, setComposeDetails] = useState({
    subject: "",
    recipient: "",
    message: "",
  });
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [showVideoUploader, setShowVideoUploader] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Logic to handle responsive design if needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deleteMessage = () => {
    const remainingMessages = messages.filter(
      (message) => message.id !== messageToDelete.id
    );
    setMessages(remainingMessages);
    setActiveMessage(remainingMessages[0] || null);
    setIsConfirmDelete(false);
  };

  const cancelDelete = () => {
    setIsConfirmDelete(false);
  };

  const sendReply = () => {
    alert(`Reply sent: ${reply}`);
    setReply("");
  };

  const openCompose = () => {
    setIsComposeOpen(true);
    setComposeDetails({
      subject: "",
      recipient: "",
      message: "",
    });
  };

  const sendCompose = () => {
    alert(`Message sent to ${composeDetails.recipient}: ${composeDetails.message}`);
    setIsComposeOpen(false);
  };

  const openSettings = () => {
    alert("Settings functionality clicked!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-lg border-r border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-800">Messages</h1>
          <div className="flex space-x-3 items-center">
            <button 
              onClick={openCompose}
              className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
            >
              <FaPen className="text-slate-600 hover:text-blue-500" />
            </button>
            <button 
              onClick={openSettings}
              className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
            >
              <FaCog className="text-slate-600 hover:text-blue-500" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200">
              <FaUserCircle className="text-slate-600 hover:text-blue-500 text-2xl" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Messages List */}
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setActiveMessage(message)}
              className={`mx-2 mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                activeMessage?.id === message.id 
                ? 'bg-blue-50 border border-blue-100' 
                : 'bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-sm">
                  {message.sender[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900 truncate">
                      {message.subject}
                    </h4>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 truncate mt-1">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {isComposeOpen ? (
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">New Message</h2>
            <div className="space-y-4 flex-1">
              <input
                type="text"
                placeholder="To:"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={composeDetails.recipient}
                onChange={(e) =>
                  setComposeDetails({ ...composeDetails, recipient: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Subject:"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={composeDetails.subject}
                onChange={(e) =>
                  setComposeDetails({ ...composeDetails, subject: e.target.value })
                }
              />
              <textarea
                rows="12"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your message here..."
                value={composeDetails.message}
                onChange={(e) =>
                  setComposeDetails({ ...composeDetails, message: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
              <button
                className="px-6 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-200"
                onClick={() => setIsComposeOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
                onClick={sendCompose}
              >
                Send
              </button>
            </div>
          </div>
        ) : activeMessage ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h1 className="text-xl font-semibold text-slate-800">
                {activeMessage.subject}
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
                  onClick={() => {
                    setIsConfirmDelete(true);
                    setMessageToDelete(activeMessage);
                  }}
                >
                  <FaTrash className="text-slate-600 hover:text-red-500" />
                </button>
                <button
                  className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
                  onClick={openSettings}
                >
                  <FaCog className="text-slate-600 hover:text-blue-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-white rounded-lg">
                <p className="text-slate-700 leading-relaxed">
                  {showFullMessage
                    ? activeMessage.content
                    : `${activeMessage.content.substring(0, 100)}...`}
                </p>
                <button
                  className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
                  onClick={() => setShowFullMessage(!showFullMessage)}
                >
                  {showFullMessage ? "Show less" : "Read more"}
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <h2 className="font-medium text-slate-800 mb-3">Reply</h2>
              <textarea
                rows="4"
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
                  onClick={sendReply}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No message selected
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmDelete && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Delete Message
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all duration-200"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200"
                onClick={deleteMessage}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showVideoUploader && (
        <VideoUploader onClose={() => setShowVideoUploader(false)} />
      )}
    </div>
  );
};

export default Support;
