// src/pages/DineInMenu.jsx
import React, { useState } from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
// import TopBar from "../components/TopBar";
import dummyData from "../data/dummy";

const {dineInCategories } = dummyData;

export default function DineInMenu() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
    
      {/* <TopBar title="Dine-In Menu" /> */}
      <div className="flex  flex-1 overflow-hidden">
        <LeftPanel
          categories={dineInCategories}
          onProductSelect={handleProductSelect}
        />
        {selectedProduct && (
          <RightPanel
            selectedProduct={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    
  </section>
    
  );
}
