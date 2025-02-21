import React, { useState } from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
// import TopBar from "../components/TopBar";
import dummyData from "../data/dummy";

export default function DeliveryMenu() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteItem = (id) => {
    console.log("Deleted item with id:", id);
    setSelectedProduct(null);
  };

  const handleDuplicateItem = (item) => {
    console.log("Duplicated item:", item);
    setSelectedProduct(item);
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
    
      {/* <TopBar title="Takeaway Menu" /> */}
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          categories={dummyData.deliveryCategories}
          onProductSelect={setSelectedProduct}
        />
        {selectedProduct && (
          <RightPanel
            selectedProduct={selectedProduct}
            onDelete={handleDeleteItem}
            onDuplicate={handleDuplicateItem}
          />
        )}
      </div>
    
    </section>
  );
}
