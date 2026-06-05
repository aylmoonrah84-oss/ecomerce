import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fetchData from '../../../Utils/fetchData';
import { SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import { Navigation } from 'lucide-react';
import { Autoplay, Pagination } from 'swiper/modules';

export default function MainSlider() {
    const navigate = useNavigate();
    const [sliders, setSliders] = useState();
    useEffect(() => {
        (async () => {
            const result = await fetchData("sliders");
            setSliders(result.data);
        })();
    }, []);
    const items = sliders.map((item) => (
        <SwiperSlide onClick={() => navigate(item.herf)}>
            <img src={import.meta.env.VITE_BASE_FILE + item.image} alt={item.title} />
        </SwiperSlide>
    ));
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            SliderPerView={10}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigate={true}
        >
            {items}
        </Swiper>
    )
}
