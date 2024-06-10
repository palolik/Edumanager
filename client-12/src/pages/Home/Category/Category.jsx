import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../../assets/home/slide1.png';
import slide2 from '../../../assets/home/slide2.png';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';

const Category = () => {
    return (
        <section className="flex flex-col justify-center items-center">
      <div className="mx-auto text-center md:w-4/12 my-8">
            <h3 className="text-3xl uppercase  py-4">Popular Courses</h3>

        </div>
        <div className="w-4/5">
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <img className="h-[500px] w-[400px]" src={slide1} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Machine Learning</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="h-[500px] w-[400px]" src={slide2} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Pithon</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="h-[500px] w-[400px]" src={slide3} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Django</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="h-[500px] w-[400px]" src={slide4} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">laravel</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="h-[500px] w-[400px]" src={slide5} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Mearn Stack</h3>
                </SwiperSlide>
            </Swiper>
            </div>
        </section>
    );
};

export default Category;