import React, { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import usesechandStore from "../../store/sechand-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { id } = useParams();
  const actionAddtoCart = usesechandStore((state) => state.actionAddtoCart);
  const carts = usesechandStore((state) => state.carts);
  const [isModalOpen, setIsModalOpen] = useState(id === item.id.toString());

  const handleAddToCart = (item) => {
    const isItemInCart = carts.some(cartItem => cartItem.id === item.id);
    if (isItemInCart) {
      toast.info("สินค้านี้มีอยู่ในตะกร้าแล้ว!", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      actionAddtoCart(item);
      toast.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white border rounded-2xl shadow-md p-5 w-full sm:w-72 h-auto transition-all hover:shadow-lg hover:scale-105"
      >
        {/* Image Section */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              className="rounded-2xl w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center shadow">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="py-4 text-center">
          <p className="text-lg font-semibold truncate text-[#5D4037]">{item.title}</p>
          <p className="text-sm text-gray-500 truncate">{item.description}</p>
        </div>

        {/* Price & Stock */}
        <div className="flex justify-between items-center px-2">
          <span className="text-md font-bold text-[#8D6E63]">
            ฿ {numberFormat(item.price)}
          </span>
          <span
            className={`text-md font-bold ${
              item.quantity === 0 ? "text-red-600" : "text-gray-600"
            }`}
          >
            {item.quantity === 0 ? "สินค้าหมด" : numberFormat(item.quantity)}
          </span>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-gradient-to-r from-[#D7A86E] to-[#8D6E63] text-white rounded-full p-3 hover:from-[#B87333] hover:to-[#5D4037] shadow-md transition transform hover:scale-110"
            disabled={item.quantity === 0}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
{isModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => setIsModalOpen(false)}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-3xl relative" // เพิ่มขนาดของ modal
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        onClick={() => setIsModalOpen(false)}
      >
        <X size={24} />
      </button>

      {/* Image */}
      {item.images && item.images.length > 0 ? (
        <img
          src={item.images[0].url}
          className="w-full h-[70vh] object-contain rounded-lg" // เพิ่มขนาดภาพ
        />
      ) : (
        <div className="w-full h-[70vh] bg-gray-200 rounded-lg flex items-center justify-center shadow">
          No Image
        </div>
      )}

      {/* Product Details */}
      <h2 className="text-xl font-bold mt-4 text-[#5D4037]">{item.title}</h2>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <p className="text-[#8D6E63] font-bold mt-2">
        ราคา: {numberFormat(item.price)} ฿
      </p>
      <p
        className={`font-bold mt-1 ${
          item.quantity === 0 ? "text-red-600" : "text-gray-600"
        }`}
      >
        {item.quantity === 0 ? "สินค้าหมด" : `จำนวน: ${numberFormat(item.quantity)}`}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-4 w-full bg-gradient-to-r from-[#D7A86E] to-[#8D6E63] text-white py-2 rounded-lg hover:from-[#B87333] hover:to-[#5D4037] shadow-md"
        disabled={item.quantity === 0}
      >
        เพิ่มลงตะกร้า
      </button>
    </motion.div>
  </div>
)}

    </>
  );
};

export default ProductCard;
