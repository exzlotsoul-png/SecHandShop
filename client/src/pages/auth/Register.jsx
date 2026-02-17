import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
    password: z.string().nonempty({ message: "กรุณากรอกรหัสผ่าน" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5001/api/register", data);
      toast.success("ลงทะเบียนสำเร็จ!");
      reset();
      navigate("/login");
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "เกิดข้อผิดพลาดในการลงทะเบียน";
      toast.error(errMsg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,forest')",
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 transition-all duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          สร้างบัญชีผู้ใช้
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className={`mt-1 block w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
              {...register("password")}
              type="password"
              placeholder="กรอกรหัสผ่านของคุณ"
              className={`mt-1 block w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              className={`mt-1 block w-full px-4 py-3 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#ccafa5] hover:bg-[#a38b84] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            ลงทะเบียน
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            <a
              href="/login"
              className="text-orange-500 hover:text-orange-700 font-semibold"
            >
              เข้าสู่ระบบที่นี่
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
