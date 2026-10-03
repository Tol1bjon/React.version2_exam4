import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Eye, Heart, Gauge, Settings2, CarFront, Scale } from 'lucide-react';
import { API } from '../../../API/API';
import { toggleFavorite, useFavorites, getFavoriteId } from '../../utils/favorites';
import { getCompareId, toggleCompare, useComparedCars } from '../../utils/comparison';

const detailFields = [
    { key: 'year', label: 'year' },
    { key: 'mileage', label: 'mileage' },
    { key: 'transmission', label: 'transmission' },
    { key: 'drive', label: 'drive' },
    { key: 'bodyType', label: 'bodyType' },
    { key: 'engine', label: 'engine' },
    { key: 'power', label: 'power' },
];

const detailUnits = {
    mileage: 'mileage',
    power: 'power',
};

const CarDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const location = useLocation();
    const favorites = useFavorites();
    const comparedCars = useComparedCars();
    const passedModel = location.state?.model;
    const [loadedModel, setLoadedModel] = useState(null);
    const [loadedBrand, setLoadedBrand] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (passedModel) {
            return undefined;
        }

        let isActive = true;

        const loadCar = async () => {
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
                    setLoadedModel(model);
                    setLoadedBrand(brand.brand || '');
                }
            } catch (loadError) {
                console.error('Unable to load selected car details.', loadError);
                if (isActive) {
                    setError(t('infoCar.loadError'));
                }
            }
        };

        loadCar();

        return () => {
            isActive = false;
        };
    }, [id, passedModel, t]);

    const model = passedModel || loadedModel;
    const variation = location.state?.variation || model?.variations?.[0] || {};
    const brandName = location.state?.brandName || model?.brandName || model?.brand || loadedBrand;
    const images = model
        ? [...new Set([
            variation.image,
            model.image,
            ...(model.variations || []).map((item) => item.image),
        ].filter(Boolean))]
        : [];
    const selectedImage = images[selectedImageIndex] || images[0];
    const price = variation.price || model?.price;
    const oldPrice = variation.oldPrice || model?.oldPrice;
    const favoriteCar = model
        ? { ...model, brandName, image: selectedImage, price, variation }
        : null;
    const favoriteId = favoriteCar ? getFavoriteId(favoriteCar, variation) : '';
    const isFavorite = favorites.some((favorite) => favorite.favoriteId === favoriteId);
    const compareId = favoriteCar ? getCompareId(favoriteCar, variation) : '';
    const isCompared = comparedCars.some((car) => car.compareId === compareId);
    const availableDetails = model
        ? detailFields.filter(({ key }) => model[key] !== undefined && model[key] !== null && model[key] !== '')
        : [];
    const benefits = Array.isArray(model?.benefits) ? model.benefits : [];

    const moveImage = (step) => {
        setSelectedImageIndex((currentIndex) => {
            if (images.length < 2) {
                return currentIndex;
            }

            return (currentIndex + step + images.length) % images.length;
        });
    };

    if (error) {
        return (
            <main className="flex min-h-[45vh] flex-col items-center justify-center gap-4 px-4 text-center">
                <p className="text-lg font-semibold text-gray-800">{error}</p>
                <Link to="/catalog" className="text-sm font-semibold text-red-600 hover:text-red-700">
                    {t('brandInfo.backHome')}
                </Link>
            </main>
        );
    }

    if (!model) {
        return (
            <main className="flex min-h-[45vh] items-center justify-center">
                <p className="text-sm text-gray-600">{t('infoCar.loading')}</p>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-[60vh] w-full max-w-[1400px] px-4 py-5 sm:px-6">
            <nav className="mb-4 flex flex-wrap items-center gap-1 text-[9px] text-[#888888] sm:text-[10px]">
                <Link to="/" className="hover:text-[#292929]">{t('brandInfo.breadcrumbsHome')}</Link>
                <span>/</span>
                <Link
                    to={brandName ? `/brand/${encodeURIComponent(brandName)}` : '/catalog'}
                    className="hover:text-[#292929]"
                >
                    {t('brandInfo.breadcrumbsCatalog')}
                </Link>
                {brandName && (
                    <>
                        <span>/</span>
                        <span>{brandName}</span>
                    </>
                )}
                <span>/</span>
                <span className="text-[#555555]">{model.modelName || t('brandInfo.carAlt')}</span>
            </nav>

            <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)] lg:gap-7">
                <div className="min-w-0">
                    <div className="relative flex h-[230px] items-center justify-center overflow-hidden rounded-[10px] bg-[#eeeeee] sm:h-[360px] lg:h-[430px]">
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt={model.modelName || t('brandInfo.carAlt')}
                                className="h-full w-full object-contain"
                            />
                        )}
                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => moveImage(-1)}
                                    aria-label={t('carDetails.previousImage')}
                                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded bg-[#292929]/80 text-white"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveImage(1)}
                                    aria-label={t('carDetails.nextImage')}
                                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded bg-[#292929]/80 text-white"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </>
                        )}
                        <div className="absolute right-3 top-3 flex gap-1">
                            <button
                                type="button"
                                onClick={() => toggleFavorite(favoriteCar)}
                                aria-label={t('header.favorites')}
                                aria-pressed={isFavorite}
                                className={`flex h-8 w-8 items-center justify-center rounded-full bg-white ${isFavorite ? 'text-red-600' : 'text-[#292929]'}`}
                            >
                                <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleCompare(favoriteCar)}
                                aria-label={t('header.compare')}
                                aria-pressed={isCompared}
                                className={`flex h-8 w-8 items-center justify-center rounded-full bg-white ${isCompared ? 'text-red-600' : 'text-[#292929]'}`}
                            >
                                <Scale className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                            {images.map((image, index) => (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() => setSelectedImageIndex(index)}
                                    aria-label={t('carDetails.showImage', { number: index + 1 })}
                                    aria-pressed={selectedImageIndex === index}
                                    className={`flex h-[52px] items-center justify-center overflow-hidden rounded border bg-white sm:h-[64px] ${selectedImageIndex === index ? 'border-[#d90000]' : 'border-[#e5e5e5]'}`}
                                >
                                    <img src={image} alt="" className="h-full w-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="text-[25px] font-bold leading-tight text-[#292929] sm:text-[34px]">
                            {model.modelName || t('brandInfo.carAlt')}
                        </h1>
                        <span className="flex shrink-0 items-center gap-1 pt-2 text-[9px] text-[#777777]">
                            <Eye className="h-3.5 w-3.5" />
                            {t('carDetails.views', { count: model.views || 0 })}
                        </span>
                    </div>

                    <p className="mt-2 text-[10px] text-[#777777]">
                        {variation.info || model.description || t('carDetails.description')}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {variation.color && (
                            <span className="rounded-full bg-[#f2f2f2] px-2.5 py-1 text-[9px] text-[#555555]">
                                {variation.color}
                            </span>
                        )}
                        {availableDetails.slice(0, 3).map(({ key }) => (
                            <span
                                key={key}
                                className="flex items-center gap-1 rounded-full bg-[#f2f2f2] px-2.5 py-1 text-[9px] text-[#555555]"
                            >
                                {key === 'mileage' ? <Gauge className="h-3 w-3" /> : key === 'transmission' ? <Settings2 className="h-3 w-3" /> : <CarFront className="h-3 w-3" />}
                                {model[key]} {detailUnits[key] ? t(`carDetails.units.${detailUnits[key]}`) : ''}
                            </span>
                        ))}
                    </div>

                    <div className="mt-5 border-b border-[#eeeeee] pb-4">
                        {oldPrice && (
                            <p className="text-[12px] text-[#999999] line-through">
                                {Number(oldPrice).toLocaleString()} ₽
                            </p>
                        )}
                        <div className="flex flex-wrap items-end justify-between gap-2">
                            <strong className="text-[25px] font-extrabold leading-none text-[#292929] sm:text-[32px]">
                                {price ? `${Number(price).toLocaleString()} ₽` : t('infoCar.priceOnRequest')}
                            </strong>
                            {(variation.monthlyPayment || model.monthlyPayment) && (
                                <span className="text-[10px] text-[#777777]">
                                    {t('carDetails.creditPrice', {
                                        price: Number(variation.monthlyPayment || model.monthlyPayment).toLocaleString(),
                                    })}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <a
                            href="tel:+78005519431"
                            className="rounded bg-[#d90000] px-3 py-3 text-center text-[9px] font-bold uppercase text-white no-underline hover:bg-red-700 sm:text-[10px]"
                        >
                            {t('carDetails.reserve')}
                        </a>
                        <Link
                            to="/credit"
                            className="rounded bg-[#eeeeee] px-3 py-3 text-center text-[9px] font-semibold text-[#444444] no-underline hover:bg-[#e0e0e0] sm:text-[10px]"
                        >
                            {t('carDetails.buyOnCredit')}
                        </Link>
                    </div>

                    <div className="mt-5 grid gap-x-4 gap-y-3 border-t border-[#eeeeee] pt-4 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 text-[9px] text-[#555555]">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff1f1] text-[#d90000]">%</span>
                                <span>{benefit}</span>
                            </div>
                        ))}
                        {availableDetails.map(({ key, label }) => (
                            <div key={key} className="flex items-center justify-between gap-3 border-b border-[#f0f0f0] pb-1 text-[9px]">
                                <span className="text-[#888888]">{t(`carDetails.fields.${label}`)}</span>
                                <span className="text-right font-semibold text-[#292929]">
                                    {model[key]} {detailUnits[key] ? t(`carDetails.units.${detailUnits[key]}`) : ''}
                                </span>
                            </div>
                        ))}
                        {variation.color && (
                            <div className="flex items-center justify-between gap-3 border-b border-[#f0f0f0] pb-1 text-[9px]">
                                <span className="text-[#888888]">{t('carDetails.fields.color')}</span>
                                <span className="font-semibold text-[#292929]">{variation.color}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CarDetails;
