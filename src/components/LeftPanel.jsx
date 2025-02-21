import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiChevronDown, FiLink, FiLayers, FiFolderPlus } from "react-icons/fi"
import { MdOutlineFiberManualRecord } from "react-icons/md"
import AddItemForm from "./AddItemForm"
import PopUp from "./PopUp"
import MapExistingItem from "./MapExistingItem"
import CreateComboForm from "./CreateComboForm"
import AddSubcategoryForm from "./AddSubcategoryForm"

const LeftPanel = ({ categories = [], onProductSelect, dropdownOptions }) => {
  const [openCategories, setOpenCategories] = useState({})
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [popUpTitle, setPopUpTitle] = useState("")
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [showMapExistingItem, setShowMapExistingItem] = useState(false)
  const [showCreateComboForm, setShowCreateComboForm] = useState(false)
  const [showAddSubcategoryForm, setShowAddSubcategoryForm] = useState(false)
  const navigate = useNavigate()

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const handleActionClick = (action) => {
    if (action === "Add Item") {
      setShowAddItemForm(true)
    } else if (action === "Map Existing Item") {
      setShowMapExistingItem(true)
    } else if (action === "Create Combo") {
      setShowCreateComboForm(true)
    } else if (action === "Add Subcategory") {
      setShowAddSubcategoryForm(true)
    } else {
      setPopUpTitle(action)
      setIsPopUpOpen(true)
    }
  }

  const handleCloseAddItem = () => {
    setShowAddItemForm(false)
  }

  const handleCloseMapExistingItem = () => {
    setShowMapExistingItem(false)
  }

  const handleCloseCreateCombo = () => {
    setShowCreateComboForm(false)
  }

  const handleCloseAddSubcategory = () => {
    setShowAddSubcategoryForm(false)
  }

  const closePopUp = () => {
    setIsPopUpOpen(false)
    setPopUpTitle("")
  }

  return (
    <div className="bg-gray-50 border-r border-gray-200 flex flex-col h-full w-full md:w-80 lg:w-96">
      {/* Menu Listing Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Menu Listing</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-sm">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-800">{category.name}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{category.subCount || 0} sub</span>
                    <span>•</span>
                    <span>{category.itemCount || 0} items</span>
                  </div>
                </div>
                <FiChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    openCategories[category.name] ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {/* Subcategories */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openCategories[category.name] ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {category.subcategories?.map((subcategory) => (
                  <div
                    key={subcategory.name}
                    className="border-t border-gray-100 px-4 py-3"
                  >
                    <h4 className="font-medium text-gray-700 mb-2">
                      {subcategory.name}
                    </h4>
                    <div className="space-y-2">
                      {subcategory.items?.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onProductSelect(item)}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <MdOutlineFiberManualRecord
                              className={`w-4 h-4 ${
                                item.type === "Veg"
                                  ? "text-green-500"
                                  : item.type === "Non-Veg"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                            />
                            <span className="text-gray-700 text-sm">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            ₹{item.pricing}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleActionClick("Add Item")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiFolderPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Add Item</span>
          </button>
          <button
            onClick={() => handleActionClick("Map Existing Item")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiLink className="w-5 h-5" />
            <span className="text-sm font-medium">Map Item</span>
          </button>
          <button
            onClick={() => handleActionClick("Create Combo")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <FiLayers className="w-5 h-5" />
            <span className="text-sm font-medium">Create Combo</span>
          </button>
          <button
            onClick={() => handleActionClick("Add Subcategory")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FiFolderPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Add Subcategory</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showAddItemForm && (
        <AddItemForm
          isOpen={showAddItemForm}
          onClose={handleCloseAddItem}
          dropdownOptions={dropdownOptions}
        />
      )}
      {showMapExistingItem && (
        <MapExistingItem onClose={handleCloseMapExistingItem} />
      )}
      {showCreateComboForm && (
        <CreateComboForm
          isOpen={showCreateComboForm}
          onClose={handleCloseCreateCombo}
          categories={categories}
        />
      )}
      {showAddSubcategoryForm && (
        <AddSubcategoryForm
          isOpen={showAddSubcategoryForm}
          onClose={handleCloseAddSubcategory}
          categories={categories}
        />
      )}

      {/* Pop-Up for other actions */}
      {isPopUpOpen && (
        <PopUp isOpen={isPopUpOpen} onClose={closePopUp} title={popUpTitle}>
          <p className="text-gray-600">This feature will be implemented soon.</p>
        </PopUp>
      )}
    </div>
  )
}

export default LeftPanel

