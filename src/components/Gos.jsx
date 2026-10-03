import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import family from '../assets/stock-photo-laughing-fun-young-happy-parents-mom-mama-dad-papa-with-child-kid-daughter-teen-girl-in-white-1938829744 1.png';
import bg from '../assets/1088 1.png';

const Gos = () => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section className="mx-auto w-full max-w-[1400px] px-3 py-4 sm:px-4">
            <div
                className="relative isolate flex min-h-[460px] w-full items-center overflow-hidden rounded-[14px] bg-[#f5f5f5] sm:min-h-[460px]"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />

                <div className="relative z-20 flex w-full flex-col gap-7 px-5 py-10 sm:w-[58%] sm:gap-8 sm:px-10 sm:py-12">
                    <div>
                        <h2 className="text-[27px] font-extrabold leading-tight text-[#292929] sm:text-[34px]">
                            {t('gos.title')}
                        </h2>
                        <div className="mt-5 flex items-baseline gap-3 sm:mt-6">
                            <span className="text-[18px] font-bold text-[#d90000] sm:text-[20px]">
                                {t('gos.rate')}
                            </span>
                            <span className="text-[14px] text-gray-500 sm:text-[15px]">
                                {t('gos.rateDescription')}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[20px] font-bold leading-snug text-[#d90000] sm:text-[23px]">
                            {t('gos.discount')}
                        </p>
                        <p className="mt-3 text-[16px] leading-relaxed text-gray-700 sm:mt-4 sm:text-[18px]">
                            {t('gos.description')}
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2"
                    >
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder={t('brandInfo.yourName')}
                            required
                            className="h-16 min-w-0 flex-1 rounded-[3px] bg-white px-5 text-[16px] text-[#252525] outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-300 sm:h-[62px] sm:text-[17px]"
                        />
                        <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder={t('brandInfo.yourPhone')}
                            required
                            className="h-16 min-w-0 flex-1 rounded-[3px] bg-white px-5 text-[16px] text-[#252525] outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-300 sm:h-[62px] sm:text-[17px]"
                        />
                        <button
                            type="submit"
                            className="h-16 shrink-0 rounded-[3px] bg-[#d90000] px-6 text-[16px] font-bold uppercase text-white transition-colors hover:bg-red-700 sm:h-[62px] sm:min-w-[210px] sm:text-[17px]"
                        >
                            {t('gos.button')}
                        </button>
                    </form>

                    <p
                        aria-live="polite"
                        className="text-[14px] leading-tight text-gray-500 sm:text-[15px]"
                    >
                        {isSubmitted ? t('brandInfo.thanks') : t('gos.consent')}
                    </p>
                </div>

                <img
                    src={family}
                    alt={t('gos.familyAlt')}
                    className="absolute bottom-0 right-0 z-10 hidden h-full w-[45%] object-cover object-center sm:block"
                />
            </div>
        </section>
    );
};

export default Gos;
