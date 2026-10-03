import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import firstCarImage from '../../assets/Group 3532.png';
import familyCarImage from '../../assets/Mask Group (3).png';
import expressCreditImage from '../../assets/Group 3532 (2).png';
import medicalImage from '../../assets/Mask Group (4).png';
import tradeInImage from '../../assets/Group 3532 copy.png';
import installmentImage from '../../assets/Mask Group (5).png';

const offers = [
    { id: 'first-car', image: firstCarImage, title: 'firstCar' },
    { id: 'family-car', image: familyCarImage, title: 'familyCar' },
    { id: 'express-credit', image: expressCreditImage, title: 'expressCredit' },
    { id: 'medical', image: medicalImage, title: 'medical' },
    { id: 'installment', image: installmentImage, title: 'installment' },
    { id: 'trade-in', image: tradeInImage, title: 'tradeIn' },
];

const Section1Credit = () => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-6">
            {/* Хлебные крошки и заголовок */}
            <div className="border-b border-[#EFEFEA] pb-4">
                <div className="text-xs leading-none text-[#929292] flex items-center gap-1.5">
                    <NavLink to="/" className="hover:text-neutral-700 transition-colors">
                        {t('creditPage.home')}
                    </NavLink>
                    <span className="text-[#CCC]">/</span>
                    <span className="text-neutral-600 font-medium">{t('creditPage.title')}</span>
                </div>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
                    {t('creditPage.title')}
                </h1>
            </div>

            {/* Сетка карточек */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer) => (
                    <article
                        key={offer.id}
                        style={{
                            backgroundImage: `url("${offer.image}")`,
                            backgroundSize: 'auto 100%',
                            backgroundPosition: '100%',
                            backgroundRepeat: 'no-repeat',
                        }}
                        className="group relative aspect-[2.1/1] overflow-hidden rounded-2xl bg-white border border-[#EBEBE5] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
                    >
                        {/* Плавный градиент для читаемости текста слева */}
                        <div
                            className="absolute inset-y-0 left-0 w-[70%]"
                            style={{ 
                                background: 'linear-gradient(90deg, #FFFFFF 55%, rgba(255,255,255,0.95) 75%, transparent 100%)' 
                            }}
                        />

                        {/* Контент карточки */}
                        <div className="relative z-10 flex h-full w-[72%] flex-col justify-between p-5 sm:p-6">
                            <div>
                                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1A1A1A] leading-snug">
                                    {t(`creditPage.offers.${offer.title}`)}
                                </h2>
                                <p className="mt-1 text-xs sm:text-sm font-medium text-[#D00000]">
                                    {t('creditPage.rate')}
                                </p>
                            </div>

                            <NavLink
                                to={`/credit/info/${offer.id}`}
                                state={{ offer }}
                                className="inline-flex h-9 w-max items-center rounded-xl bg-[#F3F3EF] px-4 text-xs font-semibold text-[#333333] no-underline transition-all duration-200 hover:bg-[#E5E5DF] hover:text-black"
                            >
                                {t('creditPage.button')}
                            </NavLink>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Section1Credit;