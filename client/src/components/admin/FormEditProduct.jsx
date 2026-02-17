import React, { useEffect, useState } from "react";
import usesechandStore from "../../store/sechand-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "Core i7",
  description: "desc",
  price: 200,
  quantity: 20,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = usesechandStore((state) => state.token);
  const getCategory = usesechandStore((state) => state.getCategory);
  const categories = usesechandStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
      toast.error("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          แก้ไขข้อมูลสินค้า
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
            value={form.title}
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            name="title"
            required
          />
          <input
            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
            value={form.description}
            onChange={handleOnChange}
            placeholder="รายละเอียด"
            name="description"
            required
          />
          <input
            type="number"
            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
            value={form.price}
            onChange={handleOnChange}
            placeholder="ราคา"
            name="price"
            required
          />
          <input
            type="number"
            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="จำนวน"
            name="quantity"
            required
          />
        </div>

        <div className="mb-4">
          <select
            className="border p-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              กรุณาเลือกหมวดหมู่
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="my-4" />

        {/* Upload file component */}
        <Uploadfile form={form} setForm={setForm} />

        <button
          type="submit"
          className="bg-[#2D336B] text-white p-3 rounded-md w-full mt-4 shadow-md hover:bg-[#7886C7] transition duration-200"
        >
          แก้ไขสินค้า
        </button>
      </form>
    </div>
  );
};

export default FormEditProduct;
