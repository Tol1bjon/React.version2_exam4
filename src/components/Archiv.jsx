import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Check, Gift, ShieldCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import model from '../assets/1 627.png';
import toyotaLogo from 'car-brand-logos/toyota-logo.svg';

const archivedModels = [
    { id: 1, price: '980 000', oldPrice: '1 280 000' },
    { id: 2, price: '980 000', oldPrice: '1 280 000' },
    { id: 3, price: '980 000', oldPrice: '1 280 000' },
    { id: 4, price: '980 000', oldPrice: '1 280 000' },
];

const Archiv = () => {
    const { t } = useTranslation();
    const swiperRef = useRef(null);

    return (
        <section className="mx-auto w-full max-w-[1400px] px-3 py-4 sm:px-4 overflow-x-hidden">
            <div className="mb-4 flex items-center justify-between sm:mb-5">
                <h2 className="text-xl font-extrabold text-[#292929] sm:text-2xl">
                    {t('archive.title')}
                </h2>

                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        aria-label={t('trust.previous')}
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="flex h-8 w-8 items-center justify-center rounded bg-white text-gray-600 shadow-[0_1px_8px_rgba(0,0,0,0.12)] transition-colors hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label={t('trust.next')}
                        onClick={() => swiperRef.current?.slideNext()}
                        className="flex h-8 w-8 items-center justify-center rounded bg-[#d90000] text-white transition-colors hover:bg-red-700"
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
                spaceBetween={14}
                slidesPerView={1.15}
                breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 14 },
                    768: { slidesPerView: 3, spaceBetween: 14 },
                    1024: { slidesPerView: 4, spaceBetween: 14 },
                }}
                className="!overflow-visible"
            >
                {archivedModels.map((item) => (
                    <SwiperSlide key={item.id} className="h-auto">
                        <article className="flex h-full min-h-[300px] flex-col rounded-[14px] border border-[#e9e9e9] bg-white p-3.5 text-[#292929] sm:min-h-[300px]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[12px] font-extrabold leading-tight">
                                    {t('archive.modelName')}
                                </h3>
                                <img
                                    src={toyotaLogo}
                                    alt="Toyota"
                                    className="h-[14px] w-[14px] rounded-full bg-[#d90000] p-[3px]"
                                />
                            </div>

                            <img
                                src={model}
                                alt={t('archive.modelName')}
                                className="mx-auto mt-2 h-[66px] w-full object-contain"
                            />

                            <div className="mt-1">
                                <p className="text-[9px] font-extrabold leading-tight text-[#d90000]">
                                    {t('archive.benefit')}
                                </p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-[16px] font-extrabold leading-tight">
                                        {t('brandInfo.from')} {item.price} ₽
                                    </span>
                                    <span className="text-[8px] font-medium text-gray-400 line-through">
                                        {item.oldPrice} ₽
                                    </span>
                                </div>
                            </div>

                            <div className="mt-2.5 space-y-[3px] text-[9px] font-medium leading-tight">
                                {[t('brandInfo.deal'), t('brandInfo.creditOffer'), t('brandInfo.sale')].map((label, index) => (
                                    <div key={label} className="flex items-center gap-1">
                                        <span className="font-semibold text-[#d90000]">
                                            {index === 0 ? '-20%' : '-10%'}
                                        </span>
                                        <span>{label}</span>
                                        <span className="ml-auto flex h-[12px] w-[12px] items-center justify-center rounded-[2px] bg-[#d90000] text-white">
                                            <Check className="h-[10px] w-[10px]" strokeWidth={3} />
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-[8px] leading-tight">
                                <div className="flex items-center gap-1">
                                    <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#292929] text-white">
                                        <ShieldCheck className="h-[9px] w-[9px]" />
                                    </span>
                                    <span>
                                        <span className="block font-semibold text-[#d90000]">{t('brandInfo.insurance')}</span>
                                        <span className="block">{t('brandInfo.insuranceGift')}</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-[#d90000] text-white">
                                        <Gift className="h-[9px] w-[9px]" />
                                    </span>
                                    <span>
                                        <span className="block font-semibold text-[#d90000]">{t('brandInfo.casco')}</span>
                                        <span className="block">{t('brandInfo.insuranceGift')}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col gap-1 pt-2">
                                <button
                                    type="button"
                                    className="h-[24px] rounded-[4px] bg-[#eeeeee] text-[9px] font-bold transition-colors hover:bg-gray-200"
                                >
                                    {t('archive.details')}
                                </button>
                                <button
                                    type="button"
                                    className="h-[24px] rounded-[4px] bg-[#d90000] text-[9px] font-extrabold text-white transition-colors hover:bg-red-700"
                                >
                                    {t('archive.book')}
                                </button>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Archiv;
