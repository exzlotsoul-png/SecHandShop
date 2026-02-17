import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import usesechandStore from "../store/sechand-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";
import { ShoppingCart, X } from "lucide-react";

const Shop = () => {
  const getProduct = usesechandStore((state) => state.getProduct);
  const products = usesechandStore((state) => state.products);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar Search */}
      <div className="w-full md:w-1/6 p-6 bg-white shadow-lg rounded-r-xl h-auto md:h-screen overflow-y-auto">
        <SearchCard />
      </div>

      {/* Product Section */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">สินค้าทั้งหมด</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* ปุ่มแสดงตะกร้า */}
      <button 
        onClick={toggleCart} 
        className="p-4 bg-gradient-to-r from-[#D7A86E] to-[#8D6E63] text-white rounded-full fixed bottom-10 right-10 shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        <ShoppingCart size={24} />
      </button>

      {/* ตะกร้า (Cart Popup) */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl rounded-l-xl transform transition-transform duration-300 ease-in-out ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ปิดตะกร้า */}
        <button 
          onClick={toggleCart} 
          className="absolute top-5 right-5 p-2 text-gray-500 hover:text-red-500"
        >
          <X size={28} />
        </button>

        {/* เนื้อหาในตะกร้า */}
        <div className="p-6 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
          <CartCard />
        </div>
      </div>
    </div>
  );
};

export default Shop;
