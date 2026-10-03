import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Check, Gift, ShieldCheck, CircleDollarSign, Heart } from 'lucide-react';
import { getFavoriteId, toggleFavorite, useFavorites } from '../../utils/favorites';
import { getCompareId, toggleCompare, useComparedCars } from '../../utils/comparison';

const Section1BrandInfo = ({ item, brandModels = [] }) => {
    const { t } = useTranslation();
    const favorites = useFavorites();
    const comparedCars = useComparedCars();
    const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);

    const normalizeColor = (color) => {
        return String(color || '')
            .trim()
            .toLowerCase()
            .replace(/ё/g, 'е')
            .replace(/\s+/g, ' ')
            .replace(/\s*[-_]+\s*/g, ' ')
            .replace(/\bwhite pearl\b/g, 'white pearl')
            .replace(/\bgrey metallic\b/g, 'grey metallic')
            .replace(/\bblack metallic\b/g, 'black metallic')
            .replace(/\bbright red\b/g, 'bright red');
    };

    const getColorValue = (color) => {
        const normalized = normalizeColor(color);
        const map = {
            white: '#f5f5f5',
            'white pearl': '#eeeeec',
            black: '#252525',
            'black metallic': '#34383c',
            grey: '#96999b',
            'grey metallic': '#8b9297',
            silver: '#c2c7ca',
            brown: '#735847',
            red: '#c62828',
            'bright red': '#e53935',
            blue: '#1976d2',
            green: '#388e3c',
            orange: '#ef6c00',
            yellow: '#fbc02d',
        };

        return map[normalized] || color || '#d1d5db';
    };

    const getColorName = (color) => {
        const normalized = normalizeColor(color);
        const map = {
            white: t('brandInfo.colorNames.white'),
            'white pearl': t('brandInfo.colorNames.pearlWhite'),
            black: t('brandInfo.colorNames.black'),
            'black metallic': t('brandInfo.colorNames.blackMetallic'),
            grey: t('brandInfo.colorNames.grey'),
            'grey metallic': t('brandInfo.colorNames.greyMetallic'),
            silver: t('brandInfo.colorNames.silver'),
            brown: t('brandInfo.colorNames.brown'),
            red: t('brandInfo.colorNames.red'),
            'bright red': t('brandInfo.colorNames.brightRed'),
            blue: t('brandInfo.colorNames.blue'),
            green: t('brandInfo.colorNames.green'),
            orange: t('brandInfo.colorNames.orange'),
            yellow: t('brandInfo.colorNames.yellow'),
        };

        return map[normalized] || color || t('brandInfo.chooseColor');
    };

    const variations = item.variations || [];
    const selectedVariation = variations[selectedColorIndex] || variations[0] || {};
    const currentImage = item.image || "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80";
    const brandName = item.brandName || item.brand || '';
    const colors = variations.length ? variations.map((variation) => variation.color) : item.colors || [];
    const favoriteCar = {
        ...item,
        brandName,
        image: selectedVariation.image || currentImage,
        price: selectedVariation.price,
        variation: selectedVariation,
    };
    const favoriteId = getFavoriteId(favoriteCar, selectedVariation);
    const isFavorite = favorites.some((favorite) => favorite.favoriteId === favoriteId);
    const compareId = getCompareId(favoriteCar, selectedVariation);
    const isCompared = comparedCars.some((car) => car.compareId === compareId);

    return (
        <div className="mx-auto mb-3 grid w-full max-w-[1300px] grid-cols-2 gap-x-2 gap-y-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:flex sm:min-h-[108px] sm:items-center sm:justify-between sm:gap-0 sm:px-4 sm:py-2">
            <div className="relative col-span-2 flex w-full flex-col items-center sm:w-[205px] sm:flex-none">
                <div className="absolute left-0 top-0 flex items-center gap-1 sm:gap-1.5">
                    <button
                        type="button"
                        aria-label={t('header.favorites')}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(favoriteCar)}
                        className={`bg-transparent transition-colors ${isFavorite ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <Heart className="h-3 w-3 sm:h-5 sm:w-5" fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        type="button"
                        aria-label={t('header.compare')}
                        aria-pressed={isCompared}
                        onClick={() => toggleCompare(favoriteCar)}
                        className={`bg-transparent transition-colors ${isCompared ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <svg className="h-3 w-3 stroke-current stroke-[1.8] fill-none sm:h-5 sm:w-5" viewBox="0 0 24 24"><rect x="6" y="7" width="4" height="13" rx="2" /><rect x="14" y="4" width="4" height="16" rx="2" /></svg>
                    </button>
                </div>

                <img src={currentImage} alt={item.modelName || t('brandInfo.carAlt')} className="my-1 h-[72px] w-full max-w-[150px] object-contain sm:my-1 sm:h-[100px] sm:max-w-[200px]" />

                <div className="mt-0.5 flex gap-1.5 sm:mt-1">
                    {colors.map((color, idx) => (
                        <button
                            key={idx}
                            type="button"
                            aria-label={`${t('brandInfo.chooseColor')}: ${getColorName(color)}`}
                            aria-pressed={selectedColorIndex === idx}
                            onClick={() => setSelectedColorIndex(idx)}
                            style={{ backgroundColor: getColorValue(color) }}
                            className={`h-1.5 w-1.5 rounded-full cursor-pointer transition-transform sm:h-2 sm:w-2 ${selectedColorIndex === idx ? 'border border-gray-900 scale-125' : 'border border-gray-300 scale-100'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="min-w-0 sm:w-[165px] sm:flex-none">
                <h3 className="mb-1 text-[13px] font-bold leading-tight text-gray-900 sm:text-[17px]">
                    {item.modelName || 'New Corolla'}
                </h3>
                <p className="mb-2 text-[9px] leading-tight text-gray-600 sm:mb-3 sm:text-[12px]">
                    {t('brandInfo.inStock')}: <strong className="text-red-600">{item.count || '20 cars'}</strong>
                </p>

                <div className="flex flex-col gap-1 text-[9px] leading-tight text-gray-800 sm:gap-1.5 sm:text-[11px]">
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-red-600 px-1 py-0.5 text-[8px] font-bold text-white sm:px-1.5 sm:text-[10px]">-20%</span>
                        <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[2px] bg-red-600 text-white sm:h-3 sm:w-3"><Check size={9} strokeWidth={3} /></span>
                        <span>{t('brandInfo.deal')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-red-600 px-1 py-0.5 text-[8px] font-bold text-white sm:px-1.5 sm:text-[10px]">-10%</span>
                        <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[2px] bg-red-600 text-white sm:h-3 sm:w-3"><Check size={9} strokeWidth={3} /></span>
                        <span>{t('brandInfo.creditOffer')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-red-600 px-1 py-0.5 text-[8px] font-bold text-white sm:px-1.5 sm:text-[10px]">-10%</span>
                        <span className="flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[2px] bg-red-600 text-white sm:h-3 sm:w-3"><Check size={9} strokeWidth={3} /></span>
                        <span>{t('brandInfo.sale')}</span>
                    </div>
                </div>
            </div>

            <div className="flex min-w-0 flex-col gap-1 text-[8px] leading-tight text-gray-800 sm:w-[125px] sm:flex-none sm:gap-1.5 sm:text-[11px]">
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white sm:h-6 sm:w-6"><ShieldCheck size={12} /></div>
                    <div>
                        <div className="text-red-600 font-semibold">{t('brandInfo.insurance')}</div>
                        <div className="text-gray-500">{t('brandInfo.insuranceGift')}</div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-white sm:h-6 sm:w-6"><Gift size={12} /></div>
                    <div>
                        <div className="text-red-600 font-semibold">{t('brandInfo.casco')}</div>
                        <div className="text-gray-500">{t('brandInfo.insuranceGift')}</div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-600 text-white sm:h-6 sm:w-6"><CircleDollarSign size={12} /></div>
                    <div>
                        <div className="text-gray-900 font-semibold">{t('brandInfo.tireKit')}</div>
                        <div className="text-gray-500">{t('brandInfo.insuranceGift')}</div>
                    </div>
                </div>
            </div>

            <div className="col-span-2 flex min-w-0 flex-col gap-1.5 sm:w-[220px] sm:flex-none sm:gap-2">
                <div className="text-left sm:text-left">
                    <div className="text-[9px] font-bold text-red-600 sm:text-[11px]">{t('brandInfo.benefitUpTo')} 300 000 ₽</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[17px] font-extrabold text-gray-900 sm:text-[22px]">{t('brandInfo.from')} {selectedVariation.price ? selectedVariation.price.toLocaleString() : '980 000'} ₽</span>
                        <span className="text-[8px] text-gray-400 line-through sm:text-[10px]">{selectedVariation.oldPrice ? selectedVariation.oldPrice.toLocaleString() : '1 280 000'} ₽</span>
                    </div>
                </div>

                <div className="mt-1 grid w-full grid-cols-2 gap-1 sm:mt-1.5 sm:grid-cols-3 sm:gap-0">
                    <NavLink to={`/checkout/${selectedVariation.id || item.modelId || item.id || 'model'}`} className="col-span-2 rounded-md bg-red-600 px-2 py-1.5 text-center text-[9px] font-semibold text-white no-underline transition-colors hover:bg-red-700 sm:col-span-1 sm:rounded-r-none sm:px-1 sm:py-2.5 sm:text-[10px]">{t('brandInfo.buyWithDiscount')}</NavLink>
                    <NavLink to={`/credit/${selectedVariation.id || item.modelId || item.id || 'model'}`} className="rounded-md bg-gray-900 px-1 py-1.5 text-center text-[8px] font-medium text-white no-underline transition-colors hover:bg-gray-800 sm:rounded-none sm:px-1 sm:py-2.5 sm:text-[10px]">{t('brandInfo.calculateCredit')}</NavLink>
                    <NavLink
                        to={`/infocar/${item.modelId || item.id || 'model'}`}
                        state={{
                            model: item,
                            brandName,
                            brandModels,
                            variation: selectedVariation,
                        }}
                        className="rounded-md bg-gray-600 px-1 py-1.5 text-center text-[8px] font-medium text-white no-underline transition-colors hover:bg-gray-700 sm:rounded-l-none sm:px-1 sm:py-2.5 sm:text-[10px]"
                    >
                        {t('brandInfo.moreModel')}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Section1BrandInfo;