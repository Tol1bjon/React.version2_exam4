import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { getFavoriteId, toggleFavorite, useFavorites } from '../../utils/favorites';
import { removeComparedCar, useComparedCars } from '../../utils/comparison';

const comparisonFields = [
    { key: 'oldPrice', label: 'price' },
    { key: 'price', label: 'discountPrice' },
    { key: 'condition', label: 'condition' },
    { key: 'region', label: 'region' },
    { key: 'brandName', label: 'brand' },
    { key: 'modelName', label: 'model' },
    { key: 'modification', label: 'modification' },
    { key: 'engine', label: 'engine' },
    { key: 'transmission', label: 'transmission' },
    { key: 'bodyType', label: 'bodyType' },
    { key: 'mileage', label: 'mileage' },
    { key: 'drive', label: 'drive' },
    { key: 'year', label: 'year' },
    { key: 'power', label: 'power' },
];

const getFieldValue = (car, key) => {
    if (key === 'price') {
        return car.price ?? car.variation?.price ?? car.model?.price;
    }

    if (key === 'oldPrice') {
        return car.oldPrice ?? car.variation?.oldPrice ?? car.model?.oldPrice;
    }

    if (key === 'brandName') {
        return car.brandName || car.brand;
    }

    if (key === 'modelName') {
        return car.modelName || car.model?.modelName;
    }

    if (key === 'modification') {
        return car.variation?.info || car.description;
    }

    return car[key] ?? car.variation?.[key] ?? car.model?.[key];
};

const formatValue = (value, key, t) => {
    if (value === undefined || value === null || value === '') {
        return '—';
    }

    if (key === 'price' || key === 'oldPrice') {
        return `${Number(value).toLocaleString()} ₽`;
    }

    if (key === 'mileage' || key === 'power') {
        const unit = t(`carDetails.units.${key}`);
        return `${value}${unit ? ` ${unit}` : ''}`;
    }

    return String(value);
};

const Compare = () => {
    const { t } = useTranslation();
    const comparedCars = useComparedCars();
    const favorites = useFavorites();
    const [showDifferences, setShowDifferences] = useState(false);
    const tableRef = useRef(null);

    const availableFields = comparisonFields
        .map((field) => ({
            ...field,
            values: comparedCars.map((car) => getFieldValue(car, field.key)),
        }))
        .filter((field) => field.values.some((value) => value !== undefined && value !== null && value !== ''))
        .filter((field) => !showDifferences || new Set(field.values.map((value) => String(value ?? ''))).size > 1);

    const scrollTable = (direction) => {
        tableRef.current?.scrollBy({
            left: direction * 280,
            behavior: 'smooth',
        });
    };

    const toggleFavoriteCar = (car) => {
        const favoriteId = getFavoriteId(car, car.variation);
        const favoriteCar = { ...car, favoriteId };
        toggleFavorite(favoriteCar);
    };

    return (
        <main className="mx-auto min-h-[60vh] w-full max-w-[1400px] px-4 py-5 sm:px-6">
            <nav className="mb-4 flex items-center gap-1 text-[9px] text-[#b8b8b8] sm:text-[10px]">
                <Link to="/" className="hover:text-[#292929]">
                    {t('comparePage.home')}
                </Link>
                <span className="text-[#d90000]">›</span>
                <span>{t('comparePage.title')}</span>
            </nav>

            <div className="mb-7 flex items-center justify-between border-b border-[#eeeeee] pb-4">
                <h1 className="text-[28px] font-bold leading-none text-[#292929] sm:text-[36px]">
                    {t('comparePage.title')}
                </h1>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => scrollTable(-1)}
                        aria-label={t('comparePage.previous')}
                        className="flex h-7 w-7 items-center justify-center rounded bg-white text-gray-600 shadow-[0_1px_8px_rgba(0,0,0,0.12)] transition-colors hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollTable(1)}
                        aria-label={t('comparePage.next')}
                        className="flex h-7 w-7 items-center justify-center rounded bg-[#d90000] text-white transition-colors hover:bg-red-700"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {comparedCars.length === 0 ? (
                <p className="py-12 text-center text-sm text-gray-500">
                    {t('comparePage.empty')}
                </p>
            ) : (
                <div ref={tableRef} className="w-full overflow-x-auto">
                    <div
                        className="grid min-w-[720px]"
                        style={{
                            gridTemplateColumns: `188px repeat(${comparedCars.length}, minmax(180px, 1fr))`,
                        }}
                    >
                        <div className="border-b border-r border-[#eeeeee] px-3 py-2">
                            <p className="text-[10px] font-bold text-[#292929]">
                                {t('comparePage.cars')}
                            </p>
                            <label className="mt-2 flex cursor-pointer items-center gap-2 text-[9px] text-[#555555]">
                                <input
                                    type="checkbox"
                                    checked={showDifferences}
                                    onChange={(event) => setShowDifferences(event.target.checked)}
                                    className="h-3 w-3 accent-[#d90000]"
                                />
                                {t('comparePage.showDifferences')}
                            </label>
                        </div>

                        {comparedCars.map((car) => {
                            const favoriteId = getFavoriteId(car, car.variation);
                            const isFavorite = favorites.some((favorite) => favorite.favoriteId === favoriteId);
                            const image = car.image || car.variation?.image || car.model?.image;

                            return (
                                <div
                                    key={car.compareId}
                                    className="min-w-0 border-b border-r border-[#eeeeee] px-3 py-2"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <h2 className="text-[11px] font-bold leading-tight text-[#292929]">
                                            {car.modelName || car.model?.modelName}
                                            {car.variation?.info && (
                                                <span className="block">
                                                    {car.variation.info}
                                                </span>
                                            )}
                                        </h2>
                                        <div className="flex shrink-0 items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => toggleFavoriteCar(car)}
                                                aria-label={t('comparePage.toggleFavorite')}
                                                aria-pressed={isFavorite}
                                                className={isFavorite ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}
                                            >
                                                <Heart className="h-3.5 w-3.5" fill={isFavorite ? 'currentColor' : 'none'} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeComparedCar(car.compareId)}
                                                aria-label={t('comparePage.remove')}
                                                className="text-gray-500 hover:text-[#d90000]"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    {image && (
                                        <img
                                            src={image}
                                            alt={car.modelName || car.model?.modelName || ''}
                                            className="mt-2 h-[80px] w-full object-contain"
                                        />
                                    )}
                                </div>
                            );
                        })}

                        {availableFields.map((field) => (
                            <React.Fragment key={field.key}>
                                <div className="flex min-h-[34px] items-center border-b border-r border-[#eeeeee] px-3 py-2 text-[9px] font-semibold text-[#292929]">
                                    {t(`comparePage.fields.${field.label}`)}
                                </div>
                                {comparedCars.map((car) => (
                                    <div
                                        key={`${car.compareId}-${field.key}`}
                                        className="flex min-h-[34px] items-center border-b border-r border-[#eeeeee] px-3 py-2 text-[9px] text-[#454545]"
                                    >
                                        {formatValue(getFieldValue(car, field.key), field.key, t)}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Compare;
