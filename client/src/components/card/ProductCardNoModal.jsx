import React from "react";
import { ShoppingCart } from "lucide-react";
import usesechandStore from "../../store/sechand-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCardNoModal = ({ item }) => {
  const actionAddtoCart = usesechandStore((state) => state.actionAddtoCart);
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    console.log("Adding item to cart:", item);
    actionAddtoCart(item);
    toast.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว!", {
      position: "top-right",
    });
    navigate("/shop");
  };

  const handleImageClick = () => {
    navigate("/shop");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border rounded-2xl shadow-md p-5 w-full sm:w-72 h-auto transition-all hover:shadow-lg hover:scale-105"
    >
      {/* Image Section */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        onClick={handleImageClick}
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
  );
};

export default ProductCardNoModal;
