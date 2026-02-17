import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import usesechandStore from "../../store/sechand-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = usesechandStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-300";
      case "Processing":
        return "bg-blue-300";
      case "Completed":
        return "bg-green-300";
      case "Cancelled":
        return "bg-red-300";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="space-y-6 px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">ประวัติการสั่งซื้อ</h1>

      {orders?.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-4">
          {/* Order Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Order date</p>
              <p className="text-lg font-semibold">{dateFormat(item.updatedAt)}</p>
            </div>
            <div>
              <span
                className={`${getStatusColor(item.orderStatus)} text-sm font-semibold px-4 py-2 rounded-full`}
              >
                {item.orderStatus}
              </span>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">สินค้า</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ราคา</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">จำนวน</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">รวม</th>
                </tr>
              </thead>
              <tbody>
                {item.products?.map((product, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{product.product.title}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{numberFormat(product.product.price)}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{product.count}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {numberFormat(product.count * product.product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="mt-4 text-right">
            <p className="text-sm text-gray-500">ราคาสุทธิ</p>
            <p className="text-xl font-bold text-gray-800">฿ {numberFormat(item.cartTotal)} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
