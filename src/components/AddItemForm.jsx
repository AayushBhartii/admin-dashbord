import React from "react"
import { motion } from "framer-motion"
import { FiX } from "react-icons/fi"

const AddItemForm = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
    >
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Add New Item</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <form className="px-4 py-3">
        {/* Form content will go here */}
      </form>
    </motion.div>
  )
}

export default AddItemForm

