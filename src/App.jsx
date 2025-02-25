// ------------------------
// src/App.jsx
// ------------------------
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DeliveryMenu from "./pages/DeliveryMenu";
import DineInMenu from "./pages/DineInMenu";
import Offers from "./pages/Offers";
// import OutletSettings from "./pages/OutletSettings";
import OutletInfo from "./pages/OutletInfo";
import Help from "./pages/Help";
import AddItemForm from "./components/AddItemForm";
import TaxesAndCharges from "./components/TaxesAndCharges/TaxAndCharges";
import ManageTiffinSeeting from "./pages/ManageTiffinSeeting";
import OutletDashboard from "./components/OutletSetting/OutletDashboard";
import OrderManag from "./components/OrderManage/OrderManag";
import Notifications from './pages/Notifications';



export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/delivery-menu" element={<DeliveryMenu />} />
        <Route path="/dine-in-menu" element={<DineInMenu />} />
        <Route path="/add-item" element={<AddItemForm />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/outlet-settings" element={<OutletDashboard />} />
        <Route path="/outlet-info" element={<ManageTiffinSeeting />} />
        <Route path="/outlet-info" element={<OutletInfo />} />
        <Route path="/help" element={<Help />} />
        <Route path="/taxes-charges" element={<TaxesAndCharges />} />
   
        
        <Route path="/OrderManag" element={<OrderManag />} />
        <Route path="/notifications" element={<Notifications />} />
        {/* If you need more pages, add them here */}
      </Route>
    </Routes>
  );
}
