"use client";

import { useState } from "react";
import {
  AiOutlineFilter,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineSync,
} from "react-icons/ai";
import AddOutletModal from "./AddOutletModal";
import EditOutletModal from "./EditOutletModal";
import OutletFilterModal from "./OutletFilterModal";
// import { OperatingHoursSection } from "../ManageSettingComponets/OperatingHoursSection";
import { OperatingHoursSection } from "./OperatingHoursSection";
import { FaInstagram, FaFacebook, FaTwitter, FaGlobe } from 'react-icons/fa';

const OutletDashboard = ({ setSelectedOutlet }) => {
  const [activeTab, setActiveTab] = useState("Outlet Management");
  const [selectedEditOutlet, setSelectedEditOutlet] = useState(null);
  const [outlets, setOutlets] = useState([
    {
      id: 1,
      name: "Downtown Restaurant",
      type: "Dine-in",
      status: "Open",
      location: "123 Main St, City Center",
      manager: "John Doe",
      contactInfo: "(555) 123-4567",
    },
    {
      id: 2,
      name: "Express Takeaway",
      type: "Takeaway",
      status: "Closed",
      location: "456 Market St, Business District",
      manager: "Jane Smith",
      contactInfo: "(555) 987-6543",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    website: "",
    youtube: "",
    linkedin: ""
  });

  const [restaurantDetails, setRestaurantDetails] = useState({
    cuisines: [],
    features: [],
    paymentMethods: [],
    deliveryAreas: ['Coastal Region', 'Harbor Area'] // Default areas
  });

  const handleAddOutlet = (newOutlet) => {
    setOutlets([...outlets, { ...newOutlet, id: outlets.length + 1 }]);
    setIsAddModalOpen(false);
  };

  const handleEditOutlet = (updatedOutlet) => {
    setOutlets(
      outlets.map((outlet) =>
        outlet.id === updatedOutlet.id ? updatedOutlet : outlet
      )
    );
    setIsEditModalOpen(false);
  };

  const handleSwitchOutlet = (outletId) => {
    const outlet = outlets.find((o) => o.id === outletId);
    setSelectedOutlet(outlet);
  };

  const filteredOutlets = outlets.filter(
    (outlet) =>
      (filters.type ? outlet.type === filters.type : true) &&
      (filters.status ? outlet.status === filters.status : true)
  );

  const tabs = ["Outlet Management", "Operating Hours", "Additional Settings"];

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg">
        {/* Grid Tab Navigation */}
        <div className="grid gap-5 grid-cols-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold text-white transition 
                ${
                  activeTab === tab
                    ? "bg-red-700 hover:bg-red-800"
                    : "bg-red-500 hover:bg-red-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Existing content remains the same as previous artifact */}
        <div className="p-6">
          {activeTab === "Outlet Management" && (
            <>
              {/* Outlet Management content */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Outlet Management
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilters({})}
                    title="Clear Filters"
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    <AiOutlineSync className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    title="Filter Outlets"
                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    <AiOutlineFilter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <AiOutlinePlus className="h-5 w-5 mr-2" /> Add Outlet
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredOutlets.map((outlet) => (
                  <div
                    key={outlet.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow grid grid-cols-3 items-center bg-gray-50"
                  >
                    {/* Outlet details remain the same */}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {outlet.name}
                      </h3>
                      <p className="text-sm text-gray-500">{outlet.location}</p>
                    </div>
                    <div className="flex space-x-2 justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          outlet.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {outlet.type} - {outlet.status}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleSwitchOutlet(outlet.id)}
                        title="Switch to this Outlet"
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        Switch
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEditOutlet(outlet);
                          setIsEditModalOpen(true);
                        }}
                        className="flex items-center px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        <AiOutlineEdit className="h-5 w-5 mr-2" /> Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Operating Hours" && <OperatingHoursSection />}

          {activeTab === "Additional Settings" && (
            <div className="p-4 text-gray-700">
              <div className="space-y-6">
                {/* Social Media Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Social Media Links</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Instagram Input */}
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <FaInstagram className="w-8 h-8 text-pink-600" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Profile</label>
                        <input
                          type="url"
                          value={socialLinks.instagram}
                          onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                          placeholder="https://instagram.com/your-profile"
                          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Facebook Input */}
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <FaFacebook className="w-8 h-8 text-blue-600" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Page</label>
                        <input
                          type="url"
                          value={socialLinks.facebook}
                          onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                          placeholder="https://facebook.com/your-page"
                          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Twitter Input */}
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <FaTwitter className="w-8 h-8 text-blue-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Profile</label>
                        <input
                          type="url"
                          value={socialLinks.twitter}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                          placeholder="https://twitter.com/your-handle"
                          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Website Input */}
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <FaGlobe className="w-8 h-8 text-gray-600" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          type="url"
                          value={socialLinks.website}
                          onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                          placeholder="https://your-website.com"
                          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button 
                    onClick={() => {
                      // Here you would typically save to your backend
                      console.log('Saving social links:', socialLinks);
                    }}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Save Social Media Links
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {isAddModalOpen && (
          <AddOutletModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddOutlet}
          />
        )}
        {isEditModalOpen && selectedEditOutlet && (
          <EditOutletModal
            outlet={selectedEditOutlet}
            onClose={() => setIsEditModalOpen(false)}
            onEdit={handleEditOutlet}
          />
        )}
        {isFilterModalOpen && (
          <OutletFilterModal
            currentFilters={filters}
            onClose={() => setIsFilterModalOpen(false)}
            onApplyFilters={(newFilters) => {
              setFilters(newFilters);
              setIsFilterModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OutletDashboard;
