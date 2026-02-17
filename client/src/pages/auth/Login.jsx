import React, { useState } from "react";
import { toast } from "react-toastify";
import usesechandStore from "../../store/sechand-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = usesechandStore((state) => state.actionLogin);
  const [form, setForm] = useState({ email: "", password: "" });
  const [isHovered, setIsHovered] = useState(false);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("ยินดีต้อนรับ!");
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || "เข้าสู่ระบบล้มเหลว";
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    navigate(role === "admin" ? "/admin" : "/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,water')",
      }}
    >
      <div
        className={`w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 transition-all duration-300 $
          
        `}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ยินดีต้อนรับ
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="กรอกอีเมลของคุณ"
              value={form.email}
              onChange={handleOnChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="กรอกรหัสผ่านของคุณ"
              value={form.password}
              onChange={handleOnChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#ccafa5] hover:bg-[#a38b84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ยังไม่มีบัญชี?{" "}
            <a
              href="/register"
              className="text-orange-500 hover:text-orange-700 font-semibold"
            >
              สมัครสมาชิกที่นี่
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
