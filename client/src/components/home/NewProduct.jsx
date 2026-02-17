import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";
import ProductCardNoModal from "../card/ProductCardNoModal";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("updatedAt", "desc", 12)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-12 px-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
        🆕 สินค้าใหม่
      </h2>
      <p className="text-gray-500 text-center mb-6">
        สินค้าที่อัปเดตล่าสุดในร้าน
      </p>

      {/* Divider */}
      <div className="h-1 w-20 bg-gray-500 mx-auto mb-6"></div>

      {/* Swiper */}
      <SwiperShowProduct>
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="transition-transform transform hover:scale-105 duration-300">
              <ProductCardNoModal item={item} />
            </div>
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </div>
  );
};

export default NewProduct;
