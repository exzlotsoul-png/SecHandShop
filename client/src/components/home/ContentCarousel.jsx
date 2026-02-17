import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from 'axios';

const ContentCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '48873369-bfc7f311acaf4a7bc2b295ccf', // แทนที่ด้วย API Key ของคุณ
            q: 'clothing',
            image_type: 'photo',
            per_page: 10,
          },
        });
        setImages(response.data.hits);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="my-12 px-6">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        className="mySwiper h-80 object-cover rounded-md mb-4 shadow-lg"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.largeImageURL}
              alt={item.tags}
              className="w-full h-full object-cover rounded-md transition-transform transform hover:scale-105 duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;