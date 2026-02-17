import React from "react";
import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/sechand-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        toast.success("บันทึกใส่ตะกร้าเรียบร้อย", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex gap-4 mb-6 items-center justify-center">
        <ListCheck size={36} />
        <p className="text-2xl font-bold">รายการสินค้า ({cart.length} รายการ)</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - รายการสินค้า */}
        <div className="col-span-2">
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex justify-between mb-4">
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-20 h-20 rounded-md object-cover"
                      src={item.images[0].url}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      <span className="text-[#8D6E63] font-bold">฿ {numberFormat(item.price)}</span> x ({item.count} สินค้า)
                    </p>
                  </div>
                </div>

                <div className="font-bold text-[#8D6E63] text-lg">
                  ฿ {numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - ยอดรวมและปุ่ม */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <p className="text-2xl font-bold text-gray-800">ยอดรวม</p>
          <div className="flex justify-between text-lg text-gray-700">
            <span>รวมสุทธิ</span>
            <span className="text-2xl font-bold text-[#8D6E63]">
              ฿ {numberFormat(getTotalPrice())}
            </span>
          </div>

          <div className="space-y-4">
            {user ? (
              <button
                disabled={cart.length < 1}
                onClick={handleSaveCart}
                className="bg-[#c9795e] w-full rounded-lg text-white py-3 shadow-lg 
                hover:bg-[#724333] transition-transform transform hover:scale-105"
              >
                สั่งซื้อ
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="bg-[#c9795e] w-full rounded-lg text-white py-3 
                shadow-lg hover:bg-[#724333] transition-transform transform hover:scale-105">
                  Login
                </button>
              </Link>
            )}
            <hr />
            <Link to={"/shop"}>
              <button className="bg-gray-500 w-full rounded-lg text-white py-3 
              shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105">
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;