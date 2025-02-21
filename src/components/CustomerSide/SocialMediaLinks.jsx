import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaGlobe } from 'react-icons/fa';

const SocialMediaLinks = ({ socialLinks }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Connect With Us</h3>
      
      <div className="flex justify-center gap-4">
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <FaInstagram className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
              Instagram
            </span>
          </a>
        )}

        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <FaFacebook className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
              Facebook
            </span>
          </a>
        )}

        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <FaTwitter className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
              Twitter
            </span>
          </a>
        )}

        {socialLinks.website && (
          <a
            href={socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <FaGlobe className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
              Website
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialMediaLinks; 