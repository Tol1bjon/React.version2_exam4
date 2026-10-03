import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API } from '../../../API/API';
import Section1InfoCar from './Section1_InfoCar';
import Section2InfoCar from './Section2_InfoCar';
import Section3InfoCar from './Section3InfoCar';
import Boxing from '@/components/Boxing';
import Trust from '@/components/Trust';
import img1_2 from '../../assets/SB RUS RGB.png';
import img2_2 from '../../assets/Group 3379.png';
import img3_2 from '../../assets/Group 3378.png';
import img4_2 from '../../assets/SB RUS RGB.png';
import img5_2 from '../../assets/Group 3379.png';
import img6_2 from '../../assets/Group 3378.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section4InfoCar from './Section4_InfoCar';
import Section5InfoCar from './Section5InfoCar';
import Context from '@/components/Context';
import Blog from '@/components/Blog';


const cards2 = [
    { id: '1', image: img1_2 },
    { id: '2', image: img2_2 },
    { id: '3', image: img3_2 },
    { id: '4', image: img4_2 },
    { id: '5', image: img5_2 },
    { id: '6', image: img6_2 },
];

const InfoCar = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const location = useLocation();
    const passedModel = location.state?.model;
    const [loadedModel, setLoadedModel] = useState(null);
    const [loadedBrandModels, setLoadedBrandModels] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (passedModel) {
            return undefined;
        }

        let isActive = true;

        const loadModel = async () => {
            try {
                const { data } = await axios.get(API);
                const brands = Array.isArray(data) ? data : data.cars;
                const brand = brands?.find((item) =>
                    item.models?.some((model) => String(model.modelId || model.id) === id)
                );
                const model = brand?.models?.find((item) => String(item.modelId || item.id) === id);

                if (!model) {
                    if (isActive) {
                        setError(t('infoCar.notFound'));
                    }
                    return;
                }

                if (isActive) {
                    setLoadedModel({ ...model, brandName: brand.brand });
                    setLoadedBrandModels(brand.models || []);
                }
            } catch (loadError) {
                console.error('Unable to load car details.', loadError);
                if (isActive) {
                    setError(t('infoCar.loadError'));
                }
            }
        };

        loadModel();

        return () => {
            isActive = false;
        };
    }, [id, passedModel, t]);

    const model = passedModel || loadedModel;
    const brandModels = location.state?.brandModels || loadedBrandModels;

    if (error) {
        return (
            <main className="mx-auto flex min-h-[45vh] max-w-[1200px] flex-col items-center justify-center gap-4 px-4 text-center">
                <p className="text-lg font-semibold text-gray-800">{error}</p>
                <Link to="/catalog" className="text-sm font-semibold text-red-600 hover:text-red-700">
                    {t('brandInfo.backHome')}
                </Link>
            </main>
        );
    }

    if (!model) {
        return (
            <main className="mx-auto flex min-h-[45vh] max-w-[1200px] items-center justify-center px-4">
                <p className="text-sm text-gray-600">{t('infoCar.loading')}</p>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-[1400px] px-3 pb-10 pt-4 sm:px-6">
            <Section1InfoCar
                key={model.modelId || model.id}
                item={model}
                brandName={location.state?.brandName || model.brandName || model.brand}
                initialVariation={location.state?.variation}
            />
            <Section2InfoCar
                models={brandModels}
                brandName={location.state?.brandName || model.brandName || model.brand || ''}
            />
            <Section2InfoCar
                models={brandModels}
                brandName={location.state?.brandName || model.brandName || model.brand || ''}
            />
            <Section3InfoCar price={location.state?.variation?.price || model.variations?.[0]?.price || model.price} />
            <Section4InfoCar model={model} />
            <Section5InfoCar
                model={model}
                models={brandModels}
                brandName={location.state?.brandName || model.brandName || model.brand || ''}
            />
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
                    <Trust/>
                    <Boxing/>
                    <Blog/>
                    <Context/>
        </main>
    );
};

export default InfoCar;
