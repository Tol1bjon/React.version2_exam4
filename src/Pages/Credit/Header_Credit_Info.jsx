import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BadgePercent, CalendarCheck, CirclePercent } from 'lucide-react';
import firstCarImage from '../../assets/Group 3532.png';
import familyCarImage from '../../assets/Mask Group (3).png';
import expressCreditImage from '../../assets/Group 3532 (2).png';
import medicalImage from '../../assets/Mask Group (4).png';
import tradeInImage from '../../assets/Group 3532 copy.png';
import installmentImage from '../../assets/Mask Group (5).png';

const offerImages = {
    'first-car': firstCarImage,
    'family-car': familyCarImage,
    'express-credit': expressCreditImage,
    medical: medicalImage,
    'trade-in': tradeInImage,
    installment: installmentImage,
};

const offerTitles = {
    'first-car': 'firstCar',
    'family-car': 'familyCar',
    'express-credit': 'expressCredit',
    medical: 'medical',
    'trade-in': 'tradeIn',
    installment: 'installment',
};

const HeaderCreditInfo = () => {
    const { t } = useTranslation();
    const { offerId } = useParams();
    const { state } = useLocation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const offer = state?.offer || { id: offerId, title: offerTitles[offerId] };
    const image = offer.image || offerImages[offerId];

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
            <div className="relative mb-[160px] sm:mb-[100px]">
                <div
                    className="relative min-h-[390px] overflow-hidden rounded-xl bg-[#d9e5e9] bg-cover bg-right bg-no-repeat sm:min-h-[420px]"
                    style={{
                        backgroundImage: image ? `url("${image}")` : undefined,
                        backgroundSize: 'auto 100%',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8da9b8]/95 via-[#8da9b8]/75 to-transparent" />
                    <div className="absolute bottom-0 left-0 h-2 w-full bg-[#8cc63f]" />

                    <div className="relative z-10 max-w-[680px] px-5 pb-36 pt-7 text-white sm:px-10 sm:pb-32 sm:pt-9">
                        <p className="text-xs font-semibold text-white/80">
                            {t('creditPage.infoLabel')}
                        </p>
                        <h1 className="mt-2 text-2xl font-extrabold leading-tight sm:text-4xl">
                            {t(`creditPage.offers.${offer.title}`, {
                                defaultValue: offer.title || t('creditPage.title'),
                            })}
                        </h1>
                        <p className="mt-2 max-w-[440px] text-xs leading-relaxed text-white/90 sm:text-sm">
                            {t('creditPage.infoDescription')}
                        </p>

                        <div className="mt-4 inline-flex items-baseline gap-2 rounded-full bg-[#e51d2a] px-4 py-2 text-white shadow-md">
                            <span className="text-[10px] font-semibold uppercase">
                                {t('creditPage.rateLabel')}
                            </span>
                            <strong className="text-xl font-extrabold sm:text-2xl">1,9%</strong>
                            <span className="text-[10px]">
                                {t('creditPage.perYear')}
                            </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-semibold sm:text-xs">
                            <div className="flex max-w-[150px] items-center gap-2">
                                <CalendarCheck className="h-7 w-7 shrink-0 rounded-full bg-white p-1.5 text-[#708d9c]" />
                                <span>{t('creditPage.benefitOne')}</span>
                            </div>
                            <div className="flex max-w-[150px] items-center gap-2">
                                <BadgePercent className="h-7 w-7 shrink-0 rounded-full bg-white p-1.5 text-[#708d9c]" />
                                <span>{t('creditPage.benefitTwo')}</span>
                            </div>
                            <div className="flex max-w-[150px] items-center gap-2">
                                <CirclePercent className="h-7 w-7 shrink-0 rounded-full bg-white p-1.5 text-[#708d9c]" />
                                <span>{t('creditPage.benefitThree')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    className="absolute bottom-5 left-4 right-4 z-20 grid gap-2 rounded-lg bg-white p-3 text-[#292929] shadow-lg sm:bottom-0 sm:left-10 sm:right-10 sm:translate-y-1/2 sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-end sm:gap-3 sm:p-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-sm font-extrabold sm:col-span-4 sm:text-base">
                        {t('creditPage.formTitle')}
                    </h2>
                    <label className="flex flex-col gap-1 text-[10px] font-medium text-[#777]">
                        {t('creditPage.name')}
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder={t('creditPage.namePlaceholder')}
                            required
                            className="h-9 rounded border border-[#dedede] px-2 text-xs text-[#292929] outline-none focus:border-[#c90000]"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-[10px] font-medium text-[#777]">
                        {t('creditPage.phone')}
                        <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder="+7 (___) ___-__-__"
                            required
                            className="h-9 rounded border border-[#dedede] px-2 text-xs text-[#292929] outline-none focus:border-[#c90000]"
                        />
                    </label>
                    <button
                        type="submit"
                        className="h-9 rounded bg-[#d90000] px-4 text-[10px] font-bold uppercase text-white transition-colors hover:bg-[#b80000] sm:text-xs"
                    >
                        {t('creditPage.submit')}
                    </button>
                    <p aria-live="polite" className="text-[9px] leading-tight text-[#888] sm:col-span-4">
                        {isSubmitted ? t('creditPage.thanks') : t('creditPage.consent')}
                    </p>
                </form>
            </div>
        </section>
    );
}

export default HeaderCreditInfo;
