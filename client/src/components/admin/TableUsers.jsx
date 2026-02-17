import React, { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import usesechandStore from "../../store/sechand-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = usesechandStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("อัปเดทสถานะเรียบร้อย!!!");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("อัปเดทบทบาทเรียบร้อย!!!");
      })
      .catch((err) => console.log(err));
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-[#FFFFFF] rounded-lg shadow-xl border border-[#A9B5DF]">
      <input
        type="text"
        placeholder="ค้นหาโดยอีเมล..."
        className="mb-4 p-2 border border-[#A9B5DF] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full table-fixed text-sm text-[#2D336B] border border-[#A9B5DF] rounded-md overflow-hidden">
        <thead>
          <tr className="bg-[#2D336B] text-white">
            <th className="px-4 py-2 text-center w-1/12">ลำดับ</th>
            <th className="px-4 py-2 text-center w-3/12">Email</th>
            <th className="px-4 py-2 text-center w-2/12">สิทธิ์</th>
            <th className="px-4 py-2 text-center w-2/12">สถานะ</th>
            <th className="px-4 py-2 text-center w-2/12">จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers?.map((el, i) => (
            <tr key={el.id} className="hover:bg-[#A9B5DF]/20 transition-colors">
              <td className="px-4 py-3 text-center border-b border-[#A9B5DF]">{i + 1}</td>
              <td className="px-4 py-3 text-center border-b border-[#A9B5DF]">{el.email}</td>
              <td className="px-4 py-3 text-center border-b border-[#A9B5DF]">
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  value={el.role}
                  className="border border-[#A9B5DF] px-2 py-1 rounded-md bg-[#FFFFF] text-[#2D336B] hover:bg-[#A9B5DF]/30 transition"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td className="px-4 py-3 text-center border-b border-[#A9B5DF]">
                {el.enabled ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-500 font-semibold">Inactive</span>
                )}
              </td>

              <td className="px-4 py-3 text-center border-b border-[#A9B5DF]">
                <button
                  className={`${
                    el.enabled ? "bg-red-500" : "bg-green-500"
                  } text-white px-4 py-2 rounded-lg hover:opacity-80 transition`}
                  onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                >
                  {el.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
