import React, { useEffect, useState } from "react";
import usesechandStore from "../../store/sechand-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = usesechandStore((state) => state.getProduct);
  const products = usesechandStore((state) => state.products);
  const actionSearchFilters = usesechandStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = usesechandStore((state) => state.getCategory);
  const categories = usesechandStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 5000]);
  const [ok, setOk] = useState(false);

  const getCreatedAt = usesechandStore((state) => state.getCreatedAt);
  const createdAt = usesechandStore((state) => state.createdAt);

  useEffect(() => {
    getCreatedAt();
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  // Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  // Search by Price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">ค้นหาสินค้า</h1>

      {/* Search by Text */}
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า...."
        className="border rounded-md w-full mb-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bc7d42]"
      />

      <hr className="mb-4" />

      {/* Search by Category */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">หมวดหมู่สินค้า</h2>
        <div className="space-y-2 mt-2">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                onChange={handleCheck}
                value={item.id}
                type="checkbox"
                className="peer hidden"
                id={`category-${item.id}`}
              />
              <label
                htmlFor={`category-${item.id}`}
                className="cursor-pointer px-3 py-1 border rounded-md text-sm text-gray-600 
                     peer-checked:bg-[#bc7d42] peer-checked:text-white peer-checked:border-[#bc7d42]
                     hover:bg-[#ddc3aa] transition-colors duration-200 ease-in-out"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="mb-4" />

      {/* Search by Price */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">ค้นหาราคา</h2>
        <div className="mt-2">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>ต่ำสุด : {numberFormat(price[0])}</span>
            <span>สูงสุด : {numberFormat(price[1])}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={5000}
            defaultValue={[0, 5000]}
            className="my-4"
            trackStyle={{ backgroundColor: "#ccafa5" }} // สีของแถบ
            railStyle={{ backgroundColor: "#dcd2cc" }} // สีของพื้นหลังแถบ
            handleStyle={{ borderColor: "#bdc3cb", backgroundColor: "#bdc3cb" }} // สีของลูกแถบ
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
