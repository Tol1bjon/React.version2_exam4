import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import car from '../../assets/day-exterior-3_040_FA20 2.png';
import bg from '../../assets/1088 1 (1).png';

const Section4InfoCar = ({ model }) => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section
            className="relative mx-auto mt-8 flex min-h-[300px] w-full max-w-[1200px] items-center overflow-hidden rounded-[12px] bg-cover bg-center px-4 py-6 sm:min-h-[235px] sm:px-[8%] sm:py-5"
            style={{ backgroundImage: `url("${bg}")` }}
        >
            <div className="absolute inset-0 bg-white/35" />

            <div className="relative z-10 w-full sm:w-[58%]">
                <span className="inline-flex rounded-full bg-[#d90000] px-3 py-1 text-[8px] font-bold text-white sm:text-[9px]">
                    {t('infoCar.advertisement.offer')}
                </span>
                <h2 className="mt-2 max-w-[440px] text-[21px] font-extrabold leading-[1.05] text-[#292929] sm:mt-1 sm:text-[26px]">
                    {t('infoCar.advertisement.title', {
                        model: model?.modelName || t('infoCar.advertisement.car'),
                    })}
                </h2>

                <p className="mt-4 text-[12px] font-bold text-[#292929] sm:mt-5">
                    {t('infoCar.advertisement.formTitle')}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-2 grid grid-cols-2 gap-2 sm:max-w-[460px] sm:grid-cols-[1fr_1fr_145px]"
                >
                    <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder={t('brandInfo.yourName')}
                        required
                        className="h-9 min-w-0 rounded-[3px] border border-gray-200 bg-white px-2 text-[9px] text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-200 sm:h-[36px]"
                    />
                    <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder={t('brandInfo.yourPhone')}
                        required
                        className="h-9 min-w-0 rounded-[3px] border border-gray-200 bg-white px-2 text-[9px] text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-200 sm:h-[36px]"
                    />
                    <button
                        type="submit"
                        className="col-span-2 h-9 rounded-[3px] bg-[#d90000] px-3 text-[8px] font-bold uppercase text-white transition-colors hover:bg-red-700 sm:col-span-1 sm:h-[36px]"
                    >
                        {t('brandInfo.getOffer')}
                    </button>
                </form>

                <p aria-live="polite" className="mt-2 max-w-[460px] text-[7px] leading-tight text-gray-500">
                    {isSubmitted ? t('brandInfo.thanks') : t('infoCar.advertisement.consent')}
                </p>
            </div>

            <img
                src={car}
                alt={t('infoCar.advertisement.carAlt')}
                className="pointer-events-none absolute bottom-3 right-2 z-0 hidden h-[88%] w-[44%] object-contain sm:block"
            />
        </section>
    );
}

export default Section4InfoCar;
