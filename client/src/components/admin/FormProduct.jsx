import React, { useEffect, useState } from "react";
import usesechandStore from "../../store/sechand-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  categoryId: "",
  images: [],
  price: "",
  quantity: "",
};

const FormProduct = () => {
  const token = usesechandStore((state) => state.token);
  const getCategory = usesechandStore((state) => state.getCategory);
  const categories = usesechandStore((state) => state.categories);
  const getProduct = usesechandStore((state) => state.getProduct);
  const products = usesechandStore((state) => state.products);

  const [form, setForm] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState("");  // ฟิลด์ค้นหา
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    getCategory();
    getProduct(100); // ดึงข้อมูลสินค้าทั้งหมด
  }, []);

  useEffect(() => {
    // ฟิลเตอร์สินค้าเมื่อมีการค้นหาหรือกรอง
    if (searchTerm) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm({
        ...initialState,
        images: [], // ล้างข้อมูลรูปภาพ
      });
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?")) {
      try {
        await deleteProduct(token, id);
        toast.success("ลบสินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.log(err);
        toast.error("เกิดข้อผิดพลาดในการลบสินค้า");
      }
    }
  };

  // คำนวณสินค้าที่ต้องแสดงในแต่ละหน้า
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // เปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // สร้างปุ่ม Pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="bg-[#2D336B] text-white p-2 rounded-md w-50 mt-1 mb-4 shadow-md hover:bg-[#7886C7] transition duration-200"
      >
        {formVisible ? "ปิดฟอร์มเพิ่มสินค้า" : "เปิดฟอร์มเพิ่มสินค้า"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-4">เพิ่มข้อมูลสินค้า</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* ชื่อสินค้า */}
            <div className="relative">
              <input
                className="peer border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7] w-full"
                value={form.title}
                onChange={handleOnChange}
                placeholder=" "
                name="title"
                required
              />
              <label
                htmlFor="title"
                className={`absolute left-2 text-gray-500 text-sm transform transition-all duration-200 
                  ${form.title ? "top-0 text-xs" : "top-2 text-sm"}`}
              >
                ชื่อสินค้า
              </label>
            </div>

            {/* รายละเอียด */}
            <div className="relative">
              <input
                className="peer border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7] w-full"
                value={form.description}
                onChange={handleOnChange}
                placeholder=" "
                name="description"
                required
              />
              <label
                className={`absolute left-2 text-gray-500 text-sm transform transition-all duration-200 
                  ${form.description ? "top-0 text-xs" : "top-2 text-sm"}`}
              >
                รายละเอียด
              </label>
            </div>

            {/* ราคา */}
            <div className="relative">
              <input
                type="number"
                className="peer border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7] w-full"
                value={form.price}
                onChange={handleOnChange}
                placeholder=" "
                name="price"
                required
              />
              <label
                className={`absolute left-2 text-gray-500 text-sm transform transition-all duration-200 
                  ${form.price ? "top-0 text-xs" : "top-2 text-sm"}`}
              >
                ราคา
              </label>
            </div>

            {/* จำนวน */}
            <div className="relative">
              <input
                type="number"
                className="peer border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7] w-full"
                value={form.quantity}
                onChange={handleOnChange}
                placeholder=" "
                name="quantity"
                required
              />
              <label
                className={`absolute left-2 text-gray-500 text-sm transform transition-all duration-200 
                  ${form.quantity ? "top-0 text-xs" : "top-2 text-sm"}`}
              >
                จำนวน
              </label>
            </div>
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
            className="bg-[#2D336B] text-white p-2 rounded-md w-full mt-4 shadow-md hover:bg-[#7886C7] transition duration-200"
          >
            เพิ่มสินค้า
          </button>
        </form>
      )}

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">รายการสินค้าของคุณ</h2>

      {/* ฟิลด์ค้นหาสินค้า */}
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
          placeholder="ค้นหาชื่อสินค้า..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">No.</th>
            <th className="px-4 py-2 text-left">รูปภาพ</th>
            <th className="px-4 py-2 text-left">ชื่อสินค้า</th>
            <th className="px-4 py-2 text-left">รายละเอียด</th>
            <th className="px-4 py-2 text-left">ราคา</th>
            <th className="px-4 py-2 text-left">จำนวน</th>
            <th className="px-4 py-2 text-left">จำนวนที่ขายได้</th>
            <th className="px-4 py-2 text-left">วันที่อัปเดต</th>
            <th className="px-4 py-2 text-left">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((item, index) => (
            <tr key={item.id} className="border-t hover:bg-gray-100 transition">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {item.images.length > 0 ? (
                  <img
                    className="w-16 h-16 rounded-lg shadow-md"
                    src={item.images[0].url}
                    alt={item.title}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                    ไม่มีรูปภาพ
                  </div>
                )}
              </td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2 break-words max-w-xs">{item.description}</td>
              <td className="px-4 py-2">{numberFormat(item.price)}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.sold}</td>
              <td className="px-4 py-2">{dateFormat(item.updatedAt)}</td>
              <td className="px-4 py-2 flex gap-2">
                <Link
                  to={"/admin/product/" + item.id}
                  className="bg-yellow-500 text-white p-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
                >
                  <Pencil />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-md text-sm ${
                  currentPage === number
                    ? "bg-[#2D336B] text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-[#7886C7] transition`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormProduct;
