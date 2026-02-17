import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import usesechandStore from "../../store/sechand-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = usesechandStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("อัปเดตสถานะสำเร็จ!");
        handleGetOrder(token);
      })
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-400 text-white";
      case "Processing":
        return "bg-blue-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderedBy.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">รายการคำสั่งซื้อ</h1>
      <input
        type="text"
        placeholder="ค้นหาโดยอีเมล..."
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#2D336B] text-white text-center">
              <th className="p-3 border">ลำดับ</th>
              <th className="p-3 border">ผู้ใช้งาน</th>
              <th className="p-3 border">ที่อยู่</th>
              <th className="p-3 border">วันที่</th>
              <th className="p-3 border">สินค้า</th>
              <th className="p-3 border">ราคารวม</th>
              <th className="p-3 border">สถานะ</th>
              <th className="p-3 border">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders?.map((item, index) => (
              <tr
                key={index}
                className="border text-center hover:bg-gray-100 transition"
              >
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  <p className="font-semibold">{item.orderedBy.email}</p>                 
                </td>
                <td className="p-3 border">{(item.orderedBy.address)}</td>

                <td className="p-3 border">{dateFormat(item.createdAt)}</td>

                <td className="p-3 border text-left">
                  {item.products?.map((product, idx) => (
                    <li key={idx} className="list-none">
                      {product.product.title} 
                      <span className="text-sm text-gray-700 ml-2">
                        {product.count} x {numberFormat(product.product.price)}
                      </span>
                    </li>
                  ))}
                </td>

                <td className="p-3 border font-bold">{numberFormat(item.cartTotal)}</td>

                <td className="p-3 border">
                  <span className={`${getStatusColor(item.orderStatus)} px-3 py-1 rounded-full`}>
                    {item.orderStatus}
                  </span>
                </td>

                <td className="p-3 border">
                  <select
                    className="border p-2 rounded-md bg-gray-50 cursor-pointer focus:ring-2 focus:ring-blue-500"
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, item.id, e.target.value)
                    }
                  >
                    <option value="Not Process">Not Process</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
