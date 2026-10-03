import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArrowRightLeft,
    CarFront,
    ChevronRight,
    Landmark,
    Percent,
    Recycle,
    Tag,
} from 'lucide-react';

const MAX_DISCOUNT = 500000;

const offerList = [
    {
        id: 'special',
        titleKey: 'specialTitle',
        subtitleKey: 'representative',
        amount: 35000,
        icon: Tag,
        initiallyActive: true,
    },
    {
        id: 'availability',
        titleKey: 'availabilityTitle',
        subtitleKey: 'dealer',
        amount: 40000,
        icon: CarFront,
        initiallyActive: true,
    },
    {
        id: 'tradeIn',
        titleKey: 'tradeInTitle',
        subtitleKey: 'dealer',
        amount: 120000,
        icon: ArrowRightLeft,
        initiallyActive: true,
        hasDetails: true,
    },
    {
        id: 'recycling',
        titleKey: 'recyclingTitle',
        subtitleKey: 'dealer',
        amount: 60000,
        icon: Recycle,
        initiallyActive: false,
        hasDetails: true,
    },
    {
        id: 'credit',
        titleKey: 'creditTitle',
        subtitleKey: 'creditSubtitle',
        amount: 40000,
        icon: Percent,
        initiallyActive: false,
        hasDetails: true,
    },
    {
        id: 'stateProgram',
        titleKey: 'stateTitle',
        subtitleKey: 'stateSubtitle',
        amount: 0,
        icon: Landmark,
        initiallyActive: true,
        isStateProgram: true,
    },
];

const Section3InfoCar = ({ price = 0 }) => {
    const { t } = useTranslation();
    const [activeOffers, setActiveOffers] = useState(
        () => offerList.filter((offer) => offer.initiallyActive).map((offer) => offer.id)
    );
    const [isTermsConfirmed, setIsTermsConfirmed] = useState(false);

    const stateProgramDiscount = Math.round(Number(price || 0) * 0.1);
    const selectedDiscount = Math.min(
        MAX_DISCOUNT,
        offerList.reduce((total, offer) => {
            if (!activeOffers.includes(offer.id)) {
                return total;
            }

            return total + (offer.isStateProgram ? stateProgramDiscount : offer.amount);
        }, 0)
    );

    const toggleOffer = (offerId) => {
        setActiveOffers((currentOffers) => (
            currentOffers.includes(offerId)
                ? currentOffers.filter((activeOffer) => activeOffer !== offerId)
                : [...currentOffers, offerId]
        ));
        setIsTermsConfirmed(false);
    };

    const formatPrice = (amount) => `${Number(amount).toLocaleString('ru-RU')} ₽`;

    return (
        <section className="mx-auto mt-8 w-full max-w-[1200px] rounded-[12px] bg-[#f2f3f4] p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {offerList.map((offer) => {
                    const Icon = offer.icon;
                    const isActive = activeOffers.includes(offer.id);
                    const offerAmount = offer.isStateProgram
                        ? stateProgramDiscount
                        : offer.amount;

                    return (
                        <article
                            key={offer.id}
                            className={`relative flex min-h-[86px] flex-col justify-between overflow-hidden rounded-[8px] border px-3 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-colors sm:min-h-[92px] sm:px-4 sm:py-3 ${
                                isActive ? 'border-white bg-white' : 'border-transparent bg-white/60'
                            }`}
                        >
                            <div className={`relative z-10 pr-9 transition-opacity ${isActive ? 'opacity-100' : 'opacity-45'}`}>
                                <h3 className="text-[9px] font-semibold leading-tight text-[#292929] sm:text-[11px]">
                                    {t(`infoCar.offers.${offer.titleKey}`)}
                                </h3>
                                <p className="mt-0.5 text-[7px] leading-tight text-gray-500 sm:text-[9px]">
                                    {t(`infoCar.offers.${offer.subtitleKey}`)}
                                </p>
                            </div>

                            <Icon
                                aria-hidden="true"
                                className={`absolute bottom-[-10px] right-3 h-12 w-12 transition-colors sm:bottom-[-15px] sm:right-4 sm:h-16 sm:w-16 ${
                                    isActive ? 'text-gray-100' : 'text-gray-200'
                                }`}
                                strokeWidth={3}
                            />

                            <div className="relative z-10 flex items-end justify-between gap-2">
                                <span className={`text-[11px] font-bold leading-none sm:text-[13px] ${isActive ? 'text-[#292929]' : 'text-gray-400'}`}>
                                    {offer.isStateProgram
                                        ? t('infoCar.offers.stateValue')
                                        : `−${formatPrice(offerAmount)}`}
                                </span>
                                {offer.hasDetails && (
                                    <span className={`text-[7px] underline decoration-dotted underline-offset-2 sm:text-[8px] ${
                                        isActive ? 'text-gray-500' : 'text-gray-400'
                                    }`}>
                                        {t('infoCar.offers.details')}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => toggleOffer(offer.id)}
                                aria-label={t(isActive ? 'infoCar.offers.disable' : 'infoCar.offers.enable', {
                                    offer: t(`infoCar.offers.${offer.titleKey}`),
                                })}
                                aria-pressed={isActive}
                                className={`absolute right-3 top-2.5 z-20 flex h-5 w-8 items-center rounded-full p-[2px] transition-colors sm:right-4 sm:top-3 sm:h-6 sm:w-9 ${
                                    isActive ? 'justify-end bg-[#d90000]' : 'justify-start bg-[#e8e9ea]'
                                }`}
                            >
                                <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#d90000] sm:h-5 sm:w-5 ${isActive ? 'rotate-0' : 'rotate-180'}`}>
                                    <ChevronRight className="h-3 w-3" strokeWidth={3} />
                                </span>
                            </button>
                        </article>
                    );
                })}
            </div>

            <div className="mt-2 grid min-h-[56px] grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] overflow-hidden rounded-[8px] sm:mt-3 sm:min-h-[62px]">
                <div className="flex flex-col justify-center bg-white px-3 py-2 text-gray-400 sm:px-6">
                    <span className="text-[8px] leading-tight sm:text-[10px]">
                        {t('infoCar.offers.maximumDiscount')}
                    </span>
                    <span className="text-[10px] font-bold leading-tight sm:text-[13px]">
                        {t('infoCar.offers.upTo', { amount: formatPrice(MAX_DISCOUNT) })}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-2 bg-[#d90000] px-3 py-2 text-white sm:px-5">
                    <div className="min-w-0">
                        <span className="block text-[8px] leading-tight sm:text-[10px]">
                            {t('infoCar.offers.yourDiscount')}
                        </span>
                        <span className="block truncate text-[14px] font-extrabold leading-tight sm:text-[20px]">
                            {t('infoCar.offers.upTo', { amount: formatPrice(selectedDiscount) })}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsTermsConfirmed((confirmed) => !confirmed)}
                        aria-pressed={isTermsConfirmed}
                        className="flex min-h-[32px] shrink-0 items-center justify-center rounded-[4px] bg-white px-2 text-[7px] font-bold uppercase text-[#d90000] transition-colors hover:bg-red-50 sm:min-h-[38px] sm:min-w-[205px] sm:px-4 sm:text-[9px]"
                    >
                        {t(isTermsConfirmed ? 'infoCar.offers.termsConfirmed' : 'infoCar.offers.confirmTerms')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Section3InfoCar;
