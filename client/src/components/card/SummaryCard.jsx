import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import usesechandStore from "../../store/sechand-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const token = usesechandStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning("กรุณากรอกที่อยู่");
    }
    saveAddress(token, address)
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่");
    }
    navigate("/user/payment");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-6">
        {/* Left Card - Address */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="font-bold text-xl mb-4">ที่อยู่ในการจัดส่ง</h1>
          <textarea
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="กรุณากรอกที่อยู่"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9795e]"
            rows="4"
          />
          <button
            onClick={hdlSaveAddress}
            className="mt-4 w-full bg-[#ccafa5] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#a38b84] transition-all duration-200"
          >
            Save Address
          </button>
        </div>

        {/* Right Card - Order Summary */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">คำสั่งซื้อของคุณ</h1>

          {/* Item List */}
          <div className="space-y-4">
            {products?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-bold">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    จำนวน : {item.count} x {numberFormat(item.product.price)}
                  </p>
                </div>
                <p className="text-[#8D6E63] font-bold">
                  ฿ {numberFormat(item.count * item.product.price)}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold">ยอดรวมสุทธิ:</p>
            <p className="text-[#8D6E63] font-bold text-lg">
              ฿ {numberFormat(cartTotal)}
            </p>
          </div>

          <hr className="my-4" />

          {/* Payment Button */}
          <button
            onClick={hdlGoToPayment}
            className="w-full bg-[#c9795e] text-white p-3 rounded-lg shadow-md hover:bg-[#724333] transition-all duration-200"
          >
            ดำเนินการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
