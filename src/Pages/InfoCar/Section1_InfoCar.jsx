import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import corolla from '../../assets/car_tcm-3020-1864333 5.png';
import rav4 from '../../assets/ext-front_tcm-3020-1767644 5.png';
import bg from '../../assets/1059 2.jpg';

const cutoutImages = {
    corolla,
    'toyota-corolla': corolla,
    rav4,
    'toyota-rav4': rav4,
};

const colorValues = {
    'Белый': '#f5f5f5',
    'Белый перламутр': '#eeeeec',
    'Черный': '#252525',
    'Черный металлик': '#34383c',
    'Серый': '#96999b',
    'Серебристый': '#c2c7ca',
    'Коричневый': '#735847',
    'Красный': '#c62828',
    'Синий': '#1976d2',
    'Зеленый': '#388e3c',
    'Оранжевый': '#ef6c00',
    'Желтый': '#fbc02d',
};

const Section1InfoCar = ({ item, brandName, initialVariation }) => {
    const { t } = useTranslation();
    const [selectedVariation, setSelectedVariation] = React.useState(
        initialVariation || item.variations?.[0] || {}
    );
    const modelId = String(item.modelId || item.id || '');
    const carImage = cutoutImages[modelId] || item.image || selectedVariation.image;
    const variations = item.variations || [];
    const price = selectedVariation.price || variations[0]?.price || item.price;
    const oldPrice = selectedVariation.oldPrice || variations[0]?.oldPrice || item.oldPrice;

    return (
        <section className="relative isolate min-h-[420px] overflow-hidden rounded-2xl bg-[#ededed] sm:min-h-[500px]">
            <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url("${bg}")` }} />
            <div className="absolute inset-0 -z-10 bg-white/80" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/70 to-white/20" />

            <div className="relative z-10 p-4 sm:px-10 sm:pt-7">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
                    <Link to="/" className="hover:text-gray-900">{t('brandInfo.breadcrumbsHome')}</Link>
                    <span className="text-red-600">›</span>
                    <Link
                        to={brandName ? `/brand/${encodeURIComponent(brandName)}` : '/catalog'}
                        className="hover:text-gray-900"
                    >
                        {t('brandInfo.breadcrumbsCatalog')}
                    </Link>
                    {brandName && (
                        <>
                            <span className="text-red-600">›</span>
                            <span>{brandName}</span>
                        </>
                    )}
                    <span className="text-red-600">›</span>
                    <span className="text-gray-800">{item.modelName || t('brandInfo.carAlt')}</span>
                </nav>

                <div className="mt-6 max-w-[410px] sm:mt-8">
                    <h1 className="text-[28px] font-bold leading-tight text-[#292929] sm:text-[42px]">
                        {item.modelName || t('brandInfo.carAlt')}
                    </h1>
                    {oldPrice && (
                        <p className="mt-5 text-[13px] text-gray-500 line-through">
                            {Number(oldPrice).toLocaleString()} ₽
                        </p>
                    )}
                    {price && (
                        <div className="flex flex-wrap items-center gap-4">
                            <p className="text-[21px] font-bold leading-tight text-[#292929] sm:text-[24px]">
                                {t('brandInfo.from')} {Number(price).toLocaleString()} ₽
                            </p>
                            <span className="rounded bg-[#d90000] px-3 py-2 text-[11px] font-bold text-white">
                                {t('brandInfo.benefitUpTo')} 100 000 ₽
                            </span>
                        </div>
                    )}

                    <div className="mt-6 flex flex-col gap-2 text-[12px] text-[#292929]">
                        <p>{selectedVariation.info || t('brandInfo.inStock')}</p>
                        {variations.length > 0 && (
                            <div className="mt-2 flex items-center gap-2">
                                {variations.map((variation, index) => (
                                    <button
                                        key={variation.id || variation.color || index}
                                        type="button"
                                        title={variation.color || ''}
                                        aria-label={`${t('brandInfo.chooseColor')}: ${variation.color || index + 1}`}
                                        aria-pressed={selectedVariation === variation}
                                        onClick={() => setSelectedVariation(variation)}
                                        className={`h-6 w-6 rounded-full border-2 ${selectedVariation === variation ? 'border-red-600' : 'border-white shadow-sm'}`}
                                        style={{ backgroundColor: colorValues[variation.color] || '#9ca3af' }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <img
                    src={carImage}
                    alt={item.modelName || t('brandInfo.carAlt')}
                    className="pointer-events-none absolute bottom-[70px] right-2 z-0 max-h-[230px] w-[65%] object-contain sm:bottom-10 sm:right-[6%] sm:max-h-[370px] sm:w-[58%]"
                />
            </div>

            <div className="relative z-20 mx-4 mt-8 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mx-auto sm:mt-0 sm:max-w-[1100px] sm:grid-cols-[220px_1fr_220px] sm:items-center sm:gap-4 sm:px-6 sm:py-5">
                <div>
                    <h2 className="text-[15px] font-bold leading-tight text-gray-900 sm:text-[17px]">
                        {t('brandInfo.specialPriceTitle')}
                    </h2>
                    <p className="mt-2 text-[10px] font-semibold text-red-600">
                        {t('brandInfo.specialPriceOnly')}
                    </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                    <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder={t('brandInfo.yourName')}
                        className="h-11 min-w-0 rounded-md bg-[#eeeeee] px-3 text-[12px] text-gray-900 outline-none placeholder:text-gray-600 focus:ring-2 focus:ring-red-200"
                    />
                    <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder={t('brandInfo.yourPhone')}
                        className="h-11 min-w-0 rounded-md bg-[#eeeeee] px-3 text-[12px] text-gray-900 outline-none placeholder:text-gray-600 focus:ring-2 focus:ring-red-200"
                    />
                </div>
                <button type="button" className="h-11 rounded-md bg-[#d90000] px-4 text-[10px] font-bold uppercase text-white transition-colors hover:bg-red-700">
                    {t('brandInfo.getOffer')}
                </button>
            </div>
        </section>
    );
}

export default Section1InfoCar;
