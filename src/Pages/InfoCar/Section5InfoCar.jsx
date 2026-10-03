import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFavoriteId, toggleFavorite, useFavorites } from '../../utils/favorites';
import carImage from '../../assets/car_tcm-3020-1864333 5.png';

const Section5InfoCar = ({ model, models = [], brandName = '' }) => {
    const { t } = useTranslation();
    const favorites = useFavorites();
    const [showAll, setShowAll] = useState(false);
    const [firstOfferIndex, setFirstOfferIndex] = useState(0);

    const offerModels = models.length > 0 ? models : model ? [model] : [];
    const offers = offerModels.flatMap((offerModel) => {
        const variations = offerModel.variations?.length ? offerModel.variations : [null];

        return variations.map((variation, index) => ({
            ...offerModel,
            offerId: `${offerModel.modelId || offerModel.id}-${variation?.id || index}`,
            offerVariation: variation,
        }));
    });
    const visibleOffers = showAll
        ? offers
        : Array.from({ length: Math.min(3, offers.length) }, (_, index) =>
            offers[(firstOfferIndex + index) % offers.length]
        );

    if (visibleOffers.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto mt-12 w-full max-w-[1200px] px-1 sm:px-0">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[24px] font-bold text-[#292929] sm:text-[30px]">
                    {t('infoCar.similarOffers.title')}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setFirstOfferIndex((currentIndex) =>
                            (currentIndex - 1 + offers.length) % offers.length
                        )}
                        aria-label={t('infoCar.similarOffers.previous')}
                        className="flex h-10 w-10 items-center justify-center rounded bg-[#f0f0f0] text-[22px] text-gray-600"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => setFirstOfferIndex((currentIndex) =>
                            (currentIndex + 1) % offers.length
                        )}
                        aria-label={t('infoCar.similarOffers.next')}
                        className="flex h-10 w-10 items-center justify-center rounded bg-[#d90000] text-[22px] text-white"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visibleOffers.map((offer) => {
                    const offerId = String(offer.modelId || offer.id);
                    const variation = offer.offerVariation || offer.variations?.[0] || {};
                    const favoriteCar = {
                        ...offer,
                        brandName: offer.brandName || brandName,
                        image: variation.image || offer.image || carImage,
                        price: variation.price,
                        variation,
                    };
                    const favoriteId = getFavoriteId(favoriteCar, variation);
                    const isFavorite = favorites.some((favorite) => favorite.favoriteId === favoriteId);

                    return (
                        <article
                            key={offer.offerId}
                            className="flex min-h-[285px] flex-col overflow-hidden rounded-[14px] border border-gray-100 bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.12)] sm:min-h-[320px] sm:p-6"
                        >
                            <div className="mb-2 flex items-start justify-between">
                                <h3 className="text-[18px] font-bold leading-tight text-[#292929] sm:text-[22px]">
                                    {offer.modelName || model?.modelName}
                                </h3>
                                <button
                                    type="button"
                                    aria-label={t('brandInfo.favoriteCompare')}
                                    aria-pressed={isFavorite}
                                    onClick={() => toggleFavorite(favoriteCar)}
                                    className={`flex items-center gap-1 text-[13px] sm:text-[14px] ${isFavorite ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
                                >
                                    <Heart className="h-3 w-3" fill={isFavorite ? 'currentColor' : 'none'} />
                                    <span>0</span>
                                </button>
                            </div>

                            <div className="grid flex-1 grid-cols-[1fr_125px] gap-3">
                                <div className="space-y-2.5">
                                    <div className="inline-flex rounded-sm bg-[#d90000] px-3 py-2 text-[11px] font-semibold leading-none text-white sm:text-[12px]">
                                        {t('infoCar.similarOffers.discount')}
                                    </div>
                                    <div className="flex items-start gap-2 text-[12px] leading-tight text-[#292929] sm:text-[13px]">
                                        <ShieldCheck className="h-[18px] w-[18px] shrink-0 text-[#333333]" />
                                        <span>{t('infoCar.similarOffers.insurance')}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-[12px] leading-tight text-[#292929] sm:text-[13px]">
                                        <ShieldCheck className="h-[18px] w-[18px] shrink-0 text-[#333333]" />
                                        <span>{t('infoCar.similarOffers.casco')}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-[12px] leading-tight text-[#292929] sm:text-[13px]">
                                        <ShieldCheck className="h-[18px] w-[18px] shrink-0 text-[#333333]" />
                                        <span>{t('infoCar.similarOffers.gift')}</span>
                                    </div>
                                </div>

                                <div className="flex h-[135px] items-center justify-center sm:h-[155px]">
                                    <img
                                        src={carImage}
                                        alt={t('infoCar.similarOffers.carAlt')}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex items-baseline justify-between gap-2">
                                <span className="text-[17px] font-bold text-[#292929] sm:text-[19px]">
                                    {variation.price
                                        ? `${Number(variation.price).toLocaleString()} ₽`
                                        : t('infoCar.priceOnRequest')}
                                </span>
                                <span className="text-[11px] text-[#292929] sm:text-[12px]">
                                    {t('infoCar.similarOffers.credit')}
                                </span>
                            </div>

                            <div className="mt-4 grid grid-cols-[1fr_0.8fr_1fr] gap-0.5">
                                <a
                                    href="tel:+78005519431"
                                    className="rounded-l bg-[#d90000] px-1 py-3 text-center text-[10px] font-semibold text-white no-underline hover:bg-red-700 sm:text-[11px]"
                                >
                                    {t('infoCar.similarOffers.reserve')}
                                </a>
                                <a
                                    href="tel:+78005519431"
                                    className="bg-[#292929] px-1 py-3 text-center text-[10px] font-semibold text-white no-underline hover:bg-black sm:text-[11px]"
                                >
                                    {t('infoCar.similarOffers.buy')}
                                </a>
                                <Link
                                    to={`/infocar/${offerId}`}
                                    state={{
                                        model: { ...offer, brandName: offer.brandName || brandName },
                                        brandName: offer.brandName || brandName,
                                        brandModels: models,
                                        variation,
                                    }}
                                    className="rounded-r bg-[#777777] px-1 py-3 text-center text-[10px] font-semibold text-white no-underline hover:bg-gray-800 sm:text-[11px]"
                                >
                                    {t('brandInfo.moreModel')}
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            {offers.length > 3 && (
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setShowAll((isShowingAll) => !isShowingAll)}
                        className="min-h-[54px] min-w-[220px] rounded-[4px] bg-[#d90000] px-5 text-[12px] font-bold uppercase text-white transition-colors hover:bg-red-700"
                    >
                        {t(showAll ? 'infoCar.similarOffers.showLess' : 'infoCar.similarOffers.showMore')}
                    </button>
                </div>
            )}
        </section>
    );
};

export default Section5InfoCar;
