import { Spinner } from '@/components/ui/spinner';
import { API } from '../../../API/API';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Gift, Percent, RefreshCw, ShieldCheck } from 'lucide-react';
import { FilterContext } from '../../../utils/Price';
import bg from '../../assets/1059 2.jpg';
import corolla from '../../assets/car_tcm-3020-1864333 5.png';
import rav4 from '../../assets/ext-front_tcm-3020-1767644 5.png';
import Section1BrandInfo from './Section1_BrandInfo';
import Boxing from '@/components/Boxing';
import 'swiper/css';
import 'swiper/css/navigation';
import img1_2 from '../../assets/SB RUS RGB.png';
import img2_2 from '../../assets/Group 3379.png';
import img3_2 from '../../assets/Group 3378.png';
import img4_2 from '../../assets/SB RUS RGB.png';
import img5_2 from '../../assets/Group 3379.png';
import img6_2 from '../../assets/Group 3378.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Punch from '@/components/Punch';
import Archiv from '@/components/Archiv';
import Gos from '@/components/Gos';
import Context from '@/components/Context';
import Blog from '@/components/Blog';
import Spec from '@/components/Spec';

const cards2 = [
    { id: '1', image: img1_2 },
    { id: '2', image: img2_2 },
    { id: '3', image: img3_2 },
    { id: '4', image: img4_2 },
    { id: '5', image: img5_2 },
    { id: '6', image: img6_2 },
];

const BrandInfo = () => {
    const { t } = useTranslation();
    const { name } = useParams();
    const { price } = useContext(FilterContext);

    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    async function getCars() {
        try {
            const { data } = await axios.get(API);
            setCars(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCars();
    }, []);

    const currentBrand = cars.find((car) => car.brand.toLowerCase() === name?.toLowerCase());
    const models = currentBrand
        ? currentBrand.models
        : cars.flatMap((brand) => brand.models.map((model) => ({ ...model, brand: brand.brand })));
    const filteredModels = models
        .map((model) => ({
            ...model,
            variations: (model.variations || []).filter((variation) => variation.price >= price.min && variation.price <= price.max),
        }))
        .filter((model) => model.variations.length > 0);

    const heroCars = [
        { modelId: 'corolla', modelName: 'Toyota Corolla', image: corolla },
        { modelId: 'rav4', modelName: 'Toyota RAV4', image: rav4 },
    ];

    const benefits = [
        { icon: ShieldCheck, title: t('brandInfo.guarantee'), description: t('brandInfo.bestPrice') },
        { icon: Percent, title: t('brandInfo.credit'), description: t('brandInfo.creditText') },
        { icon: RefreshCw, title: t('brandInfo.tradeInTitle'), description: t('brandInfo.tradeInText') },
        { icon: Gift, title: t('brandInfo.giftTitle'), description: t('brandInfo.giftText') },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center"><Spinner /></div>;
    }

    if (name && !currentBrand) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{t('brandInfo.notFound')}</h1>
                <Link to="/" className="font-semibold text-red-600 hover:text-red-700">{t('brandInfo.backHome')}</Link>
            </div>
        );
    }

    if (!name) {
        return (
            <main className="mx-auto w-full max-w-[1400px] px-4 py-6">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">{t('brandInfo.filteredTitle')}</h1>
                <p className="mb-6 text-sm text-gray-600">
                    {t('brandInfo.found')}: {filteredModels.length}
                </p>
                {filteredModels.length > 0 ? (
                    filteredModels.map((model) => (
                        <Section1BrandInfo
                            key={model.modelId}
                            item={{ ...model, brandName: model.brand || currentBrand?.brand }}
                            brandModels={cars.find((brand) => brand.brand === model.brand)?.models || []}
                        />
                    ))
                ) : (
                    <p className="rounded-lg bg-gray-50 p-5 text-sm text-gray-600">{t('brandInfo.empty')}</p>
                )}
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-2 sm:pt-4">
            <section className="relative min-h-[370px] overflow-hidden rounded-2xl bg-[#eeeeee] px-4 pb-4 pt-4 sm:min-h-[420px] sm:px-[5%] sm:pb-12 sm:pt-4">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${bg}")` }} />
                <div className="absolute inset-0 bg-white/75" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/45 to-white/10" />
                <nav aria-label="Breadcrumb" className="relative z-20 flex items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
                    <Link to="/" className="hover:text-gray-900">{t('brandInfo.breadcrumbsHome')}</Link>
                    <span className="text-red-600">›</span>
                    <Link to="/" className="hover:text-gray-900">{t('brandInfo.breadcrumbsCatalog')}</Link>
                    <span className="text-red-600">›</span>
                    <span className="text-gray-800">{currentBrand.brand}</span>
                </nav>
                <span aria-hidden="true" className="absolute right-0 top-4 z-0 hidden select-none text-[120px] font-black leading-none text-white/90 sm:block lg:text-[210px]">
                    {currentBrand.brand}
                </span>
                <div className="relative z-10 mt-4 w-full max-w-[480px] sm:mt-10 sm:max-w-[560px]">
                    <div className="sm:pr-24">
                        <h1 className="max-w-[72%] text-[20px] font-extrabold leading-[1.02] text-[#252525] sm:max-w-[520px] sm:text-[46px]">
                            {t('brandInfo.saleTitle')} {currentBrand.brand}
                        </h1>
                        <p className="mt-2 max-w-[72%] text-[9px] font-semibold leading-snug text-gray-800 sm:mt-4 sm:max-w-[380px] sm:text-base">
                            {t('brandInfo.saleText')}
                        </p>
                    </div>
                    <div className="mt-2 inline-flex flex-col rounded-full bg-[#d90000] px-3 py-1 text-white shadow-sm sm:absolute sm:left-[50%] sm:top-[-60px] sm:mt-0 sm:px-5 sm:py-2 sm:whitespace-nowrap">
                        <span className="text-[9px] font-semibold leading-none sm:text-[10px]">{t('brandInfo.discountLabel')}</span>
                        <span className="text-[18px] font-extrabold leading-tight sm:text-[32px]">350 000 ₽</span>
                    </div>
                </div>
                <div className="absolute left-1/2 top-[65%] z-10 flex h-[90px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:left-auto sm:right-[4%] sm:top-[54%] sm:h-[74%] sm:w-[50%] sm:translate-x-0 sm:-translate-y-1/2">
                    {heroCars.map((model, index) => (
                        <img key={model.modelId} src={model.image || model.variations?.[0]?.image} alt={model.modelName} className={`absolute h-full w-[65%] object-contain sm:w-[62%] ${index === 0 ? 'left-0 z-10 sm:left-[1%]' : 'right-0 z-20 sm:right-0'}`} />
                    ))}
                </div>
                <div className="absolute bottom-3 left-4 right-4 z-20 grid grid-cols-2 gap-x-3 gap-y-2 sm:bottom-[28%] sm:left-[5%] sm:right-auto sm:flex sm:max-w-[600px] sm:items-center sm:gap-6">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="flex items-center gap-2 text-[9px] leading-tight text-gray-800 sm:text-xs">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-red-600 sm:h-8 sm:w-8">
                                <benefit.icon size={15} strokeWidth={2.4} />
                            </span>
                            <span>
                                <span className="block font-semibold">{benefit.title}</span>
                                <span className="block">{benefit.description}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <form onSubmit={handleSubmit} className="relative z-30 mx-auto mt-[-44px] flex w-full max-w-[800px] flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-4">
                <div className="shrink-0 sm:w-[190px]">
                    <h2 className="text-[16px] font-bold leading-tight text-gray-900 sm:text-[20px]">{t('brandInfo.specialPriceTitle')}</h2>
                    <span className="mt-2 inline-block rounded-full bg-[#d90000] px-2.5 py-1 text-[9px] font-bold leading-none text-white">
                        {t('brandInfo.specialPriceOnly')}
                    </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <input type="text" name="name" autoComplete="name" placeholder={t('brandInfo.yourName')} required className="h-11 min-w-0 flex-1 rounded-md bg-[#eeeeee] px-3 text-[12px] text-gray-900 outline-none placeholder:text-gray-600 focus:ring-2 focus:ring-red-200 sm:h-[50px]" />
                    <input type="tel" name="phone" autoComplete="tel" placeholder={t('brandInfo.yourPhone')} required className="h-11 min-w-0 flex-1 rounded-md bg-[#eeeeee] px-3 text-[12px] text-gray-900 outline-none placeholder:text-gray-600 focus:ring-2 focus:ring-red-200 sm:h-[50px]" />
                </div>
                <button type="submit" className="h-11 shrink-0 rounded-md bg-[#d90000] px-6 text-[11px] font-bold uppercase text-white transition-colors hover:bg-red-700 sm:h-[50px] sm:min-w-[180px]">
                    {t('brandInfo.getOffer')}
                </button>
                <p aria-live="polite" className="text-[9px] leading-tight text-gray-400 sm:absolute sm:bottom-1 sm:left-[215px]">
                    {isSubmitted ? t('brandInfo.thanks') : t('brandInfo.consent')}
                </p>
            </form>

            <section className="pt-6">
                <h2 className="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
                    {t('brandInfo.modelRangeTitle')} {currentBrand.brand}
                </h2>
                {filteredModels.length > 0 ? filteredModels.map((model) => (
                    <Section1BrandInfo
                        key={model.modelId}
                        item={{ ...model, brandName: model.brand || currentBrand?.brand }}
                        brandModels={currentBrand.models}
                    />
                )) : (
                    <p className="mt-6 rounded-lg bg-gray-50 p-5 text-sm text-gray-600">{t('brandInfo.emptyRange')}</p>
                )}
            </section>

            <Punch/>

            <section className="pt-6">
                <h2 className="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
                    {t('brandInfo.modelRangeTitle')} {currentBrand.brand}
                </h2>
                {filteredModels.length > 0 ? filteredModels.map((model) => (
                    <Section1BrandInfo
                        key={model.modelId}
                        item={{ ...model, brandName: model.brand || currentBrand?.brand }}
                        brandModels={currentBrand.models}
                    />
                )) : (
                    <p className="mt-6 rounded-lg bg-gray-50 p-5 text-sm text-gray-600">{t('brandInfo.emptyRange')}</p>
                )}
            </section>

            <Archiv/>
            <Spec/>
            <Gos/>




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

            <Boxing/>
            <Blog/>
            <Context/>
        </main>
    );
};

export default BrandInfo;
