import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import usesechandStore from "../../store/sechand-store";
import { Link } from "react-router-dom";
import { numberFormat } from '../../utils/number';
import { toast } from 'react-toastify';

const CartCard = () => {
  const carts = usesechandStore((state) => state.carts);
  const actionUpdateQuantity = usesechandStore((state) => state.actionUpdateQuantity);
  const actionRemoveProduct = usesechandStore((state) => state.actionRemoveProduct);
  const getTotalPrice = usesechandStore((state) => state.getTotalPrice);

  const totalItems = carts.reduce((total, item) => total + item.count, 0);

  const handleUpdateQuantity = (itemId, newCount) => {
    actionUpdateQuantity(itemId, newCount);
  };

  const handleRemoveProduct = (itemId) => {
    actionRemoveProduct(itemId);
    toast.success("ลบสินค้าจากตะกร้าเรียบร้อยแล้ว!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">ตะกร้าสินค้า</h1>
      <div className="border p-4 rounded-lg shadow-md bg-white">
        {/* Products List with Scroll */}
        <div className="max-h-[60vh] overflow-y-auto mb-6">
          {carts.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-20 h-20 rounded-md object-cover"
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div
                  onClick={() => handleRemoveProduct(item.id)}
                  className="text-red-600 p-2 cursor-pointer self-end md:self-auto"
                >
                  <Trash2 />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.count - 1)}
                    className="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1 bg-white border-t border-b">{item.count}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.count + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="font-bold text-[#8D6E63]">
                  ฿ {numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Checkout Button */}
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2 bg-gray-100 rounded-lg mt-4">
          <span className="font-semibold">รวม</span>
          <span className="font-bold text-gray-900">
            ({totalItems} สินค้า) : <span className="text-[#8D6E63] text-lg">฿ {numberFormat(getTotalPrice())}</span>
          </span>
        </div>

        {/* Checkout Button */}
        <Link to="/cart">
          <button
            className="mt-4 bg-gradient-to-r from-[#D7A86E] to-[#8D6E63] hover:from-[#B87333] hover:to-[#5D4037] text-white w-full py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            ดำเนินการชำระเงิน
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
