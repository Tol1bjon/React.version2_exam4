import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import img1 from '../assets/Group 3532.png';
import img2 from '../assets/Group 3532 (2).png';
import img3 from '../assets/Mask Group (3).png';
import img4 from '../assets/Mask Group (4).png';
import img5 from '../assets/Group 3532 copy.png';
import img6 from '../assets/Mask Group (5).png';

const offers = [
    { id: 'first-car', image: img1, title: 'firstCar', descriptionKey: 'firstCarDescription' },
    { id: 'family-car', image: img3, title: 'familyCar', descriptionKey: 'familyCarDescription' },
    { id: 'express-credit', image: img2, title: 'expressCredit', descriptionKey: 'expressCreditDescription' },
    { id: 'medical', image: img4, title: 'medical', descriptionKey: 'medicalDescription' },
    { id: 'trade-in', image: img5, title: 'tradeIn', descriptionKey: 'tradeInDescription' },
    { id: 'installment', image: img6, title: 'installment', descriptionKey: 'installmentDescription' },
];

const Spec = () => {
    const { t } = useTranslation();
    const swiperRef = useRef(null);

    return (
        <section className="mx-auto w-full max-w-[1400px] overflow-hidden px-4 py-5 sm:px-8 sm:py-7">
            <div className="mb-4 flex items-center justify-between sm:mb-5">
                <h2 className="text-[16px] font-extrabold text-[#292929] sm:text-[22px]">
                    {t('specialOffers.title')}
                </h2>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        aria-label={t('specialOffers.previous')}
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-gray-600 shadow-[0_1px_8px_rgba(0,0,0,0.12)] transition-colors hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label={t('specialOffers.next')}
                        onClick={() => swiperRef.current?.slideNext()}
                        className="flex h-7 w-7 items-center justify-center rounded bg-[#d90000] text-white transition-colors hover:bg-red-700"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Navigation]}
                loop
                spaceBetween={12}
                slidesPerView={1.15}
                breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 12 },
                    768: { slidesPerView: 3, spaceBetween: 14 },
                }}
                className="!overflow-visible"
            >
                {offers.map((offer) => (
                    <SwiperSlide key={offer.id} className="h-auto">
                        <article className="relative flex h-[112px] overflow-hidden rounded-[12px] bg-[#e8eef0] sm:h-[140px]">
                            <img
                                src={offer.image}
                                alt={t(`specialOffers.${offer.title}`)}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="relative z-10 flex w-[64%] flex-col items-start px-3 py-2.5 text-[#292929] sm:w-[60%] sm:px-4 sm:py-3.5">
                                <h3 className="text-[10px] font-extrabold leading-tight sm:text-[13px]">
                                    {t(`specialOffers.${offer.title}`)}
                                </h3>
                                <p className="mt-1 max-w-[175px] text-[7px] leading-tight text-gray-600 sm:text-[9px]">
                                    {t(`specialOffers.${offer.descriptionKey}`)}
                                </p>
                                <NavLink
                                    to={`/credit/info/${offer.id}`}
                                    state={{ offer }}
                                    className="mt-auto inline-flex h-[22px] items-center rounded-[3px] bg-[#eeeeee] px-2.5 text-[7px] font-bold text-[#292929] no-underline transition-colors hover:bg-white sm:h-[25px] sm:px-3 sm:text-[8px]"
                                >
                                    {t('specialOffers.button')}
                                </NavLink>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Spec;
