import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ChevronDown,
    ChevronUp,
    Gift,
    Heart,
    Scale,
    ShieldCheck,
    CircleDollarSign,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFavoriteId, toggleFavorite, useFavorites } from '../../utils/favorites';
import { getCompareId, toggleCompare, useComparedCars } from '../../utils/comparison';

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

const Section2InfoCar = ({ models = [], brandName = '' }) => {
    const { t } = useTranslation();
    const favorites = useFavorites();
    const comparedCars = useComparedCars();
    const [openModelId, setOpenModelId] = useState(null);
    const [selectedVariations, setSelectedVariations] = useState({});
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    const toggleAccordion = (modelId) => {
        setOpenModelId((currentId) => currentId === modelId ? null : modelId);
    };

    const selectVariation = (modelId, variation) => {
        setSelectedVariations((currentVariations) => ({
            ...currentVariations,
            [modelId]: variation,
        }));
    };

    const toggleDescription = (modelId) => {
        setExpandedDescriptions((currentDescriptions) => ({
            ...currentDescriptions,
            [modelId]: !currentDescriptions[modelId],
        }));
    };

    if (models.length === 0) {
        return null;
    }

    const featureGroups = [
        { title: t('infoCar.safety'), items: t('infoCar.safetyItems', { returnObjects: true }) },
        { title: t('infoCar.exterior'), items: t('infoCar.exteriorItems', { returnObjects: true }) },
        { title: t('infoCar.interior'), items: t('infoCar.interiorItems', { returnObjects: true }) },
    ];

    return (
        <section className="mx-auto mt-8 w-full max-w-[1200px]">
            <h2 className="mb-5 text-center text-[20px] font-bold text-[#292929] sm:text-[26px]">
                {t('infoCar.brandCarsTitle', { brand: brandName })}
            </h2>

            <div className="space-y-3">
                {models.map((model) => {
                    const modelId = String(model.modelId || model.id);
                    const isOpen = openModelId === modelId;
                    const variations = model.variations || [];
                    const selectedVariation = selectedVariations[modelId] || variations[0] || {};
                    const isDescriptionExpanded = expandedDescriptions[modelId];
                    const modelDescription = model.description || selectedVariation.info || t('infoCar.specification');
                    const modelImage = selectedVariation.image || model.image;
                    const price = selectedVariation.price || variations[0]?.price;
                    const oldPrice = selectedVariation.oldPrice || variations[0]?.oldPrice;
                    const favoriteCar = {
                        ...model,
                        brandName,
                        image: modelImage,
                        price,
                        variation: selectedVariation,
                    };
                    const favoriteId = getFavoriteId(favoriteCar, selectedVariation);
                    const isFavorite = favorites.some((favorite) => favorite.favoriteId === favoriteId);
                    const compareId = getCompareId(favoriteCar, selectedVariation);
                    const isCompared = comparedCars.some((car) => car.compareId === compareId);
                    const detailsLinkState = {
                        model: { ...model, brandName },
                        brandName,
                        brandModels: models,
                        variation: selectedVariation,
                    };

                    return (
                        <article key={modelId} className="overflow-hidden rounded-[12px]">
                            <button
                                type="button"
                                onClick={() => toggleAccordion(modelId)}
                                aria-expanded={isOpen}
                                aria-controls={`model-details-${modelId}`}
                                className="grid min-h-[44px] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 bg-[#eeeeef] px-3 text-left sm:min-h-[48px] sm:grid-cols-[minmax(230px,1.4fr)_repeat(4,minmax(90px,1fr))_auto] sm:gap-4 sm:px-5"
                            >
                                <span className="truncate text-[9px] font-bold text-[#292929] sm:text-[12px]">
                                    {model.modelName}
                                </span>
                                <span className="hidden truncate text-[9px] text-gray-700 sm:block">
                                    {selectedVariation.info || t('infoCar.specification')}
                                </span>
                                <span className="hidden text-[9px] text-gray-700 sm:block">
                                    {selectedVariation.color || t('brandInfo.chooseColor')}
                                </span>
                                <span className="hidden text-[9px] text-gray-700 sm:block">
                                    {t('brandInfo.inStock')}
                                </span>
                                <span className="hidden text-[10px] font-bold text-gray-900 sm:block">
                                    {price ? `${Number(price).toLocaleString()} ₽` : t('infoCar.priceOnRequest')}
                                </span>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-700">
                                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </span>
                            </button>

                            {isOpen && (
                                <div id={`model-details-${modelId}`} className="bg-white">
                                    <div className="grid gap-3 border-b border-gray-100 p-3 sm:grid-cols-[130px_minmax(190px,1fr)_180px_205px] sm:items-center sm:gap-4 sm:px-4 sm:py-3">
                                        <div className="relative flex h-[92px] items-center justify-center">
                                            <div className="absolute left-0 top-0 flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    aria-label={t('header.favorites')}
                                                    aria-pressed={isFavorite}
                                                    onClick={() => toggleFavorite(favoriteCar)}
                                                    className={isFavorite ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}
                                                >
                                                    <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label={t('header.compare')}
                                                    aria-pressed={isCompared}
                                                    onClick={() => toggleCompare(favoriteCar)}
                                                    className={isCompared ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}
                                                >
                                                    <Scale size={15} />
                                                </button>
                                            </div>
                                            <img
                                                src={modelImage}
                                                alt={model.modelName || t('brandInfo.carAlt')}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="text-[12px] font-bold text-[#292929]">
                                                {model.modelName}
                                            </h3>
                                            <p className="mt-1 text-[9px] font-semibold text-red-600">
                                                {t('brandInfo.inStock')}: {t('infoCar.availableCount', { count: variations.length || 1 })}
                                            </p>
                                            <p className="mt-1 text-[9px] text-gray-600">
                                                {selectedVariation.info || t('infoCar.specification')}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => toggleDescription(modelId)}
                                                aria-expanded={Boolean(isDescriptionExpanded)}
                                                className="mt-2 flex w-full items-center justify-between rounded-full border border-red-400 px-2.5 py-1 text-left text-[8px] font-semibold text-red-600 sm:max-w-[230px]"
                                            >
                                                <span>
                                                    {isDescriptionExpanded ? t('infoCar.hideDescription') : t('infoCar.fullDescription')}
                                                </span>
                                                {isDescriptionExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                            </button>

                                            {isDescriptionExpanded && (
                                                <p className="mt-2 text-[9px] leading-relaxed text-gray-600">
                                                    {modelDescription}
                                                </p>
                                            )}

                                            <div className="mt-2 flex items-center gap-1.5">
                                                {variations.map((variation, index) => (
                                                    <button
                                                        key={variation.id || variation.color || index}
                                                        type="button"
                                                        onClick={() => selectVariation(modelId, variation)}
                                                        aria-label={`${t('brandInfo.chooseColor')}: ${variation.color || index + 1}`}
                                                        aria-pressed={selectedVariation === variation}
                                                        title={variation.color || ''}
                                                        className={`h-3 w-3 rounded-full border ${selectedVariation === variation ? 'border-red-600 ring-1 ring-red-300' : 'border-gray-300'}`}
                                                        style={{ backgroundColor: colorValues[variation.color] || '#9ca3af' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[8px] leading-tight text-gray-700 sm:grid-cols-1">
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck size={14} className="shrink-0 text-red-600" />
                                                <span>{t('brandInfo.insurance')}<br />{t('brandInfo.insuranceGift')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Gift size={14} className="shrink-0 text-red-600" />
                                                <span>{t('brandInfo.casco')}<br />{t('brandInfo.insuranceGift')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CircleDollarSign size={14} className="shrink-0 text-gray-600" />
                                                <span>{t('brandInfo.tireKit')}<br />{t('brandInfo.insuranceGift')}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-[1fr_1fr] items-center gap-2 sm:grid-cols-[1fr_112px]">
                                            <div className="text-right">
                                                <p className="text-[14px] font-extrabold text-gray-900">
                                                    {price ? `${Number(price).toLocaleString()} ₽` : t('infoCar.priceOnRequest')}
                                                </p>
                                                {oldPrice && (
                                                    <p className="text-[8px] text-gray-400 line-through">
                                                        {Number(oldPrice).toLocaleString()} ₽
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <a
                                                    href="tel:+78005519431"
                                                    className="rounded-sm bg-[#d90000] px-2 py-2 text-center text-[8px] font-bold uppercase text-white no-underline hover:bg-red-700"
                                                >
                                                    {t('infoCar.reserve')}
                                                </a>
                                                <Link
                                                    to={`/car-info/${modelId}`}
                                                    state={detailsLinkState}
                                                    className="rounded-sm bg-[#666666] px-2 py-2 text-center text-[8px] font-semibold text-white no-underline hover:bg-gray-800"
                                                >
                                                    {t('brandInfo.moreModel')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 bg-[#f0f1f2] px-4 py-4 sm:grid-cols-3 sm:gap-7 sm:px-5 sm:py-5">
                                        {featureGroups.map((group) => (
                                            <div key={group.title}>
                                                <h4 className="mb-2 text-[10px] font-bold text-[#292929] sm:text-[11px]">
                                                    {group.title}
                                                </h4>
                                                <ul className="space-y-1">
                                                    {group.items.map((feature) => (
                                                        <li
                                                            key={feature}
                                                            className="relative pl-3 text-[8px] leading-[1.35] text-gray-700 sm:text-[9px]"
                                                        >
                                                            <span className="absolute left-0 text-red-600">•</span>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default Section2InfoCar;
