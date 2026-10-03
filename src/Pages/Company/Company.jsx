import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, UserPlus, Award } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

import img1 from '../../assets/Rectangle 487.png';
import img2 from '../../assets/images.jfif';
import img3 from '../../assets/images (1).jfif';
import img4 from '../../assets/images (2).jfif';
import img5 from '../../assets/images (3).jfif';
import img6 from '../../assets/images (4).jfif';

import img1_2 from '../../assets/SB RUS RGB.png';
import img2_2 from '../../assets/Group 3379.png';
import img3_2 from '../../assets/Group 3378.png';
import img4_2 from '../../assets/SB RUS RGB.png';
import img5_2 from '../../assets/Group 3379.png';
import img6_2 from '../../assets/Group 3378.png';

import desktopMap from '../../assets/Group 3394.png';
import phoneMap from '../../assets/Group 3394 (1).png';

const cards = [
    { id: '1', image: img1 },
    { id: '2', image: img2 },
    { id: '3', image: img3 },
    { id: '4', image: img4 },
    { id: '5', image: img5 },
    { id: '6', image: img6 },
];

const cards2 = [
    { id: '1', image: img1_2 },
    { id: '2', image: img2_2 },
    { id: '3', image: img3_2 },
    { id: '4', image: img4_2 },
    { id: '5', image: img5_2 },
    { id: '6', image: img6_2 },
];

const Company = () => {
    const { t } = useTranslation();
    const cityGroups = t('company.cityGroups', { returnObjects: true });
    const citiesCol1 = cityGroups.col1;
    const citiesCol2 = cityGroups.col2;

    return (
        <div className="mx-auto max-w-[1400px] px-4 py-8 text-[#222]">
            <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
                <Link className="transition-colors hover:text-gray-600" to="/">{t('company.breadcrumbsHome')}</Link>
                <span>/</span>
                <span className="text-gray-600">{t('company.breadcrumbsCurrent')}</span>
            </div>

            <h1 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
                {t('company.title')}
            </h1>

            <div className="mb-8 h-[1px] w-full bg-gray-200"></div>

            <div className="flex flex-col gap-6 text-[14px] leading-relaxed text-gray-700">
                <p>{t('company.intro')}</p>
                <p className="mt-2 font-semibold text-gray-900">{t('company.benefitTitle')}</p>

                <ul className="flex flex-col gap-2.5 pl-2">
                    {t('company.benefits', { returnObjects: true }).map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cc0000]"></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-gray-900">{t('company.shouldKnow')}</p>
                <p className="font-semibold text-gray-900">{t('company.gratitude')}</p>
                <p className="text-lg font-semibold text-[#cc0000]">{t('company.slogan')}</p>
            </div>

            <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                        {t('company.photoTitle')}
                    </h2>

                    <div className="flex items-center gap-2">
                        <div className="swiper-button-prev-custom flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100">
                            <ChevronLeft className="h-5 w-5" />
                        </div>
                        <div className="swiper-button-next-custom flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded bg-[#cc0000] text-white transition-colors hover:bg-red-700">
                            <ChevronRight className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {cards.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <img src={item.image} className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="mt-12 rounded-3xl bg-[#f8f9fa] p-6 md:p-10 lg:p-12">
                <div className="hidden items-center justify-between gap-6 md:flex">
                    <div className="flex shrink-0 flex-col items-center justify-between lg:w-[30%]">
                        <div className="flex flex-col items-center">
                            <span className="block text-7xl leading-none text-[#cc0000] lg:text-[200px]">12</span>
                            <p className="mt-3 text-base font-bold text-[#cc0000] lg:text-lg">{t('company.citiesTitle')}</p>
                        </div>

                        <div className="mt-12 flex items-center gap-8 lg:mt-16">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#222] text-white">
                                    <UserPlus className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold leading-tight text-gray-900">1000</span>
                                <span className="text-xs text-gray-400">{t('company.workers')}</span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#222] text-white">
                                    <Award className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold leading-tight text-gray-900">20</span>
                                <span className="text-xs text-gray-400">{t('company.experience')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-end">
                        <img src={desktopMap} alt={t('company.citiesTitle')} className="h-auto w-full max-w-[720px] object-contain" />
                    </div>
                </div>

                <div className="flex flex-col items-center text-center md:hidden">
                    <span className="block text-8xl leading-none text-[#cc0000]">12</span>
                    <p className="mb-6 mt-2 text-base font-bold leading-tight text-[#cc0000]">{t('company.citiesTitle')}</p>

                    <div className="mb-8 flex items-center justify-center gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#222] text-white">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-bold leading-tight text-gray-900">1000</span>
                            <span className="text-xs text-gray-400">{t('company.workers')}</span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#222] text-white">
                                <Award className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-bold leading-tight text-gray-900">20</span>
                            <span className="text-xs text-gray-400">{t('company.experience')}</span>
                        </div>
                    </div>

                    <div className="mb-6 w-full max-w-[280px]">
                        <img src={phoneMap} alt={t('company.citiesTitle')} className="h-auto w-full object-contain" />
                    </div>

                    <div className="grid w-full max-w-[260px] grid-cols-2 gap-x-6 gap-y-2.5 text-left text-xs text-gray-800">
                        <div className="flex flex-col gap-2">
                            {citiesCol1.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <span className="font-bold text-[#cc0000]">{item.id}</span>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            {citiesCol2.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <span className="font-bold text-[#cc0000]">{item.id}</span>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                        {t('company.partnerBanks')}
                    </h2>

                    <div className="flex items-center gap-2">
                        <div className="swiper-button-prev-banks flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100">
                            <ChevronLeft className="h-5 w-5" />
                        </div>
                        <div className="swiper-button-next-banks flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded bg-[#cc0000] text-white transition-colors hover:bg-red-700">
                            <ChevronRight className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-button-prev-banks',
                        nextEl: '.swiper-button-next-banks',
                    }}
                    breakpoints={{
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="w-full"
                >
                    {cards2.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="flex h-[95px] items-center justify-center rounded-xl bg-[#f0f2f5] p-4 md:h-[105px]">
                                <img src={item.image} alt={t('company.partnerBanks')} className="h-auto max-h-7 w-auto max-w-[140px] object-contain md:max-h-8" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Company;
