import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import bg from '../../../assets/1059 2.jpg';
import redCar from '../../../assets/rio_new 1.png';
import whiteCar from '../../../assets/ext-front_tcm-3020-1767644 1.png';
import car3 from '../../../assets/rapid-entry-AVN 1.png';

const slides = [
    { cars: [redCar, whiteCar, car3], key: 'slide1' },
    { cars: [redCar, whiteCar, car3], key: 'slide2' },
    { cars: [redCar, whiteCar, car3], key: 'slide3' },
    { cars: [redCar, whiteCar, car3], key: 'slide4' },
    { cars: [redCar, whiteCar, car3], key: 'slide5' },
    { cars: [redCar, whiteCar, car3], key: 'slide6' },
];

const Section1Home = () => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto w-full max-w-[1440px] px-2 pb-10 pt-2 sm:px-4 sm:pt-4 overflow-x-hidden">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                className="!h-[80svh] min-h-[320px] max-h-[760px] !overflow-visible rounded-xl bg-[#f1f1f1] [&_.swiper-button-next]:!hidden [&_.swiper-button-prev]:!hidden [&_.swiper-pagination]:!bottom-[-25px] [&_.swiper-pagination]:!top-auto [&_.swiper-slide]:overflow-hidden [&_.swiper-slide]:rounded-xl sm:min-h-[520px] sm:[&_.swiper-button-next]:!flex sm:[&_.swiper-button-prev]:!flex"
                style={{ '--swiper-navigation-color': '#292929', '--swiper-navigation-size': '18px', '--swiper-pagination-color': '#e00000' }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.key} className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${bg}")` }} />
                        <div className="absolute inset-0 bg-white/90" />
                        <div className="relative z-10 h-full px-2.5 pt-3 sm:px-[12%] sm:pt-0">
                            <div className="relative z-20 w-full sm:absolute sm:left-[12%] sm:top-1/2 sm:w-[40%] sm:-translate-y-1/2">
                                <span className="mb-2 inline-block rounded-full bg-[#d90000] px-2 py-0.5 text-[7px] font-bold leading-none text-white sm:mb-4 sm:px-3 sm:py-1 sm:text-[11px]">
                                    {t(`home.${slide.key}.label`)}
                                </span>
                                <h2 className="max-w-[300px] text-[17px] font-bold leading-[1.02] text-[#292929] sm:max-w-[390px] sm:text-[40px] sm:leading-[1.06]">
                                    {t(`home.${slide.key}.title`)}
                                </h2>
                                <p className="mt-1 text-[9px] leading-tight text-[#777] sm:mt-3 sm:text-[18px]">
                                    {t(`home.${slide.key}.description`)}
                                </p>
                            </div>
                            {slide.cars.map((car, index) => (
                                <img key={`${slide.key}-${index}`} src={car} alt="" className={`absolute bottom-[3%] object-contain sm:bottom-[18%] ${index === 0 ? 'right-[25%] z-20 h-[35%] w-[56%] sm:right-[17%] sm:h-[53%] sm:w-[43%]' : index === 1 ? 'left-[2%] z-10 h-[29%] w-[43%] sm:left-auto sm:right-[5%] sm:h-[41%] sm:w-[28%]' : 'right-[1%] z-0 h-[25%] w-[39%] sm:right-[0%] sm:h-[36%] sm:w-[25%]'}`} />
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Section1Home;
