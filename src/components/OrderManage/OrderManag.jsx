import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DiningOrders from "./DiningOrders";
import TakeawayOrders from "./TakeawayOrders";
import OrderHistory from "./OrderHistory";

const OrderManag = () => {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab || "dining";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [orders, setOrders] = useState({
    dining: [
      {
        id: "1",
        type: "dining",
        table: "Table 5",
        customer: "John Doe",
        items: "Burger:2, Fries:3",
        status: "preparing",
        time: "10 min ago",
      },
      {
        id: "2",
        type: "dining",
        table: "Table 3",
        customer: "Jane Smith",
        items: "Pizza:4, Salad:3",
        status: "ready",
        time: "15 min ago",
      },
      {
        id: "3",
        type: "dining",
        table: "Table 8",
        customer: "Bob Johnson",
        items: "Steak:3, Mashed Potatoes:2",
        status: "served",
        time: "30 min ago",
      },
    ],
    takeaway: [
      {
        id: "4",
        type: "takeaway",
        customer: "Alice Brown",
        items: "Chicken Wings:1, Coke:2",
        status: "preparing",
        time: "5 min ago",
      },
      {
        id: "5",
        type: "takeaway",
        customer: "Mike Wilson",
        items: "Pasta, Garlic Bread",
        status: "ready",
        time: "12 min ago",
      },
      {
        id: "6",
        type: "takeaway",
        customer: "Sarah Davis",
        items: "Sushi Set:3, Green Tea:5",
        status: "pending",
        time: "2 min ago",
      },
    ],
  });

  const [orderHistory, setOrderHistory] = useState([]);

  const updateOrderStatus = (orderId) => {
    const orderType = activeTab;
    setOrders({
      ...orders,
      [orderType]: orders[orderType].map((order) => {
        if (order.id === orderId) {
          const statusMap = {
            pending: "preparing",
            preparing: "ready",
            ready: "served",
            served: "served",
          };
          const updatedOrder = { ...order, status: statusMap[order.status] };

          // Move to history if served
          if (
            statusMap[order.status] === "served" &&
            !orderHistory.includes(order)
          ) {
            setOrderHistory([...orderHistory, updatedOrder]);
          }

          return updatedOrder;
        }
        return order;
      }),
    });
  };

  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-20 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Order Management
            </h1>
            <div className="flex gap-20">
              <button
                className={`px-8 py-3 font-medium bg-red-500 rounded ${
                  activeTab === "dining"
                    ? "border-b-2 border-black text-black"
                    : "text-white"
                }`}
                onClick={() => setActiveTab("dining")}
              >
                Dining
              </button>
              <button
                className={`px-8 py-3 font-medium bg-red-500 rounded ${
                  activeTab === "takeaway"
                    ? "border-b-2 border-black text-black"
                    : "text-white"
                }`}
                onClick={() => setActiveTab("takeaway")}
              >
                Takeaway
              </button>
              <button
                className={`px-8 py-3 font-medium bg-red-500 rounded ${
                  activeTab === "history"
                    ? "border-b-2 border-black text-black"
                    : "text-white"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Order History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === "dining" && (
          <DiningOrders
            orders={orders.dining}
            onUpdateStatus={updateOrderStatus}
          />
        )}
        {activeTab === "takeaway" && (
          <TakeawayOrders
            orders={orders.takeaway}
            onUpdateStatus={updateOrderStatus}
          />
        )}
        {activeTab === "history" && (
          <OrderHistory orderHistory={orderHistory} />
        )}
      </div>
    </div>
  );
};

export default OrderManag;
