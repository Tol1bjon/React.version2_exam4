import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ShieldCheck } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { toggleFavorite, useFavorites } from '../../utils/favorites';
import defaultCarImage from '../../assets/car_tcm-3020-1864333 5.png';

const formatPrice = (price, fallback) => {
    if (!price) {
        return fallback;
    }

    return `${Number(price).toLocaleString()} ₽`;
};

const Like = () => {
    const { t } = useTranslation();
    const favorites = useFavorites();

    return (
        <main className="mx-auto min-h-[60vh] w-full max-w-[1400px] px-4 pb-12 pt-5">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-[#eeeeee] pb-4">
                <div>
                    <div className="mb-2 flex items-center gap-1 text-[10px] text-[#929292]">
                        <NavLink to="/" className="text-inherit no-underline hover:text-[#292929]">
                            {t('favoritesPage.home')}
                        </NavLink>
                        <span>/</span>
                        <span>{t('favoritesPage.title')}</span>
                    </div>
                    <h1 className="text-[30px] font-extrabold leading-none text-[#292929] sm:text-[38px]">
                        {t('favoritesPage.title')}
                    </h1>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] font-semibold">
                    <span className="rounded bg-[#d90000] px-2.5 py-1.5 text-white">
                        {t('favoritesPage.newCars', { count: favorites.length })}
                    </span>
                    <span className="rounded bg-[#eeeeee] px-2.5 py-1.5 text-[#444444]">
                        {t('favoritesPage.usedCars')}
                    </span>
                    <span className="rounded bg-[#eeeeee] px-2.5 py-1.5 text-[#444444]">
                        {t('favoritesPage.taxi')}
                    </span>
                </div>
            </div>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-bold text-[#292929]">
                        {t('favoritesPage.newCarsTitle')}
                    </h2>
                    <span className="text-[10px] font-medium text-[#777777]">
                        {t('favoritesPage.selectedCount', { count: favorites.length })}
                    </span>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {favorites.map((car) => {
                            const carId = String(car.modelId || car.id);
                            const variation = car.variation || {};
                            const price = car.price || variation.price;
                            const oldPrice = car.oldPrice || variation.oldPrice;

                            return (
                                <article
                                    key={car.favoriteId}
                                    className="relative overflow-hidden rounded-[12px] border border-[#e6e6e6] bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                                >
                                    <div className="mb-2 flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-[15px] font-bold leading-tight text-[#292929]">
                                                {car.modelName}
                                            </h3>
                                            <span className="mt-1 inline-flex rounded bg-[#d90000] px-2 py-1 text-[8px] font-bold text-white">
                                                {t('favoritesPage.specialOffer')}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => toggleFavorite(car)}
                                            aria-label={t('favoritesPage.remove')}
                                            aria-pressed="true"
                                            className="shrink-0 text-[#d90000]"
                                        >
                                            <Heart className="h-4 w-4" fill="currentColor" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-[minmax(0,1fr)_45%] items-center gap-2">
                                        <div className="space-y-1.5 text-[9px] leading-tight text-[#555555]">
                                            <div className="inline-flex rounded bg-[#eeeeee] px-1.5 py-1 text-[8px] font-semibold text-[#292929]">
                                                {variation.color || t('favoritesPage.available')}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck className="h-3 w-3 shrink-0 text-[#555555]" />
                                                <span>{t('favoritesPage.creditProgram')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck className="h-3 w-3 shrink-0 text-[#555555]" />
                                                <span>{t('favoritesPage.benefits')}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ShieldCheck className="h-3 w-3 shrink-0 text-[#555555]" />
                                                <span>{t('favoritesPage.warranty')}</span>
                                            </div>
                                        </div>

                                        <div className="flex h-[105px] items-center justify-center">
                                            <img
                                                src={car.image || defaultCarImage}
                                                alt={car.modelName || t('brandInfo.carAlt')}
                                                onError={(event) => {
                                                    event.currentTarget.src = defaultCarImage;
                                                }}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2 flex flex-wrap items-baseline justify-between gap-1">
                                        <span className="text-[13px] font-extrabold text-[#292929]">
                                            {t('favoritesPage.priceFrom', {
                                                price: formatPrice(price, t('infoCar.priceOnRequest')),
                                            })}
                                        </span>
                                        {oldPrice && (
                                            <span className="text-[9px] text-[#999999] line-through">
                                                {formatPrice(oldPrice, '')}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-3 grid grid-cols-[1fr_0.8fr_1fr] gap-0.5">
                                        <Link
                                            to={`/infocar/${carId}`}
                                            state={{
                                                model: car,
                                                brandName: car.brandName || car.brand || '',
                                                variation,
                                            }}
                                            className="rounded-l bg-[#d90000] px-1 py-2.5 text-center text-[9px] font-semibold text-white no-underline hover:bg-red-700"
                                        >
                                            {t('favoritesPage.details')}
                                        </Link>
                                        <a
                                            href="tel:+78005519431"
                                            className="bg-[#292929] px-1 py-2.5 text-center text-[9px] font-semibold text-white no-underline hover:bg-black"
                                        >
                                            {t('favoritesPage.buy')}
                                        </a>
                                        <a
                                            href="tel:+78005519431"
                                            className="rounded-r bg-[#777777] px-1 py-2.5 text-center text-[9px] font-semibold text-white no-underline hover:bg-gray-800"
                                        >
                                            {t('favoritesPage.offer')}
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#d5d5d5] px-5 text-center">
                        <Heart className="mb-3 h-8 w-8 text-[#d90000]" />
                        <p className="text-sm font-semibold text-[#292929]">
                            {t('favoritesPage.empty')}
                        </p>
                        <Link
                            to="/"
                            className="mt-4 rounded bg-[#d90000] px-4 py-2 text-xs font-semibold text-white no-underline hover:bg-red-700"
                        >
                            {t('favoritesPage.catalog')}
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Like;
