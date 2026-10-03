import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCreditInfo from './Header_Credit_Info';
import Punch from '@/components/Punch';
import Trust from '@/components/Trust';
import Boxing from '@/components/Boxing';
import Section1CreditInfo from './Section1_Credit_Info';
import img1_2 from '../../assets/SB RUS RGB.png';
import img2_2 from '../../assets/Group 3379.png';
import img3_2 from '../../assets/Group 3378.png';
import img4_2 from '../../assets/SB RUS RGB.png';
import img5_2 from '../../assets/Group 3379.png';
import img6_2 from '../../assets/Group 3378.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cards2 = [
    { id: '1', image: img1_2 },
    { id: '2', image: img2_2 },
    { id: '3', image: img3_2 },
    { id: '4', image: img4_2 },
    { id: '5', image: img5_2 },
    { id: '6', image: img6_2 },
];

const CreditInfo = () => {
    const { t } = useTranslation();

    return (
        <div>
            <HeaderCreditInfo/>
            <Section1CreditInfo/>
            <div className="mt-12 max-w-[1400px] mx-auto p-4">
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
            <Punch/>
            <Trust/>
            <Boxing/>
        </div>
    );
}

export default CreditInfo;
