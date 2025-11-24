import React from "react";
import MedicineOrderForm from "../components/orderMedicine/MedicineOrderForm";
import BackButton from "../components/BackButton";

const OrderDetailsPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] p-4">
      {/* Fixed Back Button in Top-Right Corner */}
      <div className="absolute top-4 left-4 sm:top-6 sm:right-6 z-10">
        <BackButton />
      </div>

      {/* Centered Form */}
      <MedicineOrderForm />
    </div>
  );
};

export default OrderDetailsPage;
