// src/components/PopUp.jsx
import React from "react"
import { motion } from "framer-motion"

const PopUp = ({ isOpen, onClose, title, children }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {children}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

export default PopUp
