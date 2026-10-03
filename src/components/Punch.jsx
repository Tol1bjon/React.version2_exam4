import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import punch from '../assets/pngwing 3.png';

const Punch = () => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section className="mx-auto w-full max-w-[1400px] px-3 py-4">
            <div className="relative isolate flex min-h-[230px] w-full items-center overflow-hidden rounded-[10px] bg-[#262626] min-[480px]:aspect-[4.27/1] min-[480px]:min-h-0">
                <div className="absolute inset-y-0 left-0 w-[38%] bg-[radial-gradient(ellipse_at_35%_50%,#721c1e_0%,#46191a_48%,transparent_100%)]" />
                <img
                    src={punch}
                    alt=""
                    className="absolute left-[-7%] top-1/2 z-10 w-[48%] -translate-y-1/2 object-contain min-[480px]:left-[0%] min-[480px]:w-[34%]"
                />

                <div className="relative z-20 ml-auto flex w-[65%] flex-col px-4 py-6 min-[480px]:w-[66%] min-[480px]:px-[4%] min-[480px]:py-0">
                    <h2 className="text-[18px] font-extrabold leading-tight text-white min-[480px]:text-[clamp(11px,2vw,22px)]">
                        {t('punch.title')}
                    </h2>
                    <p className="mt-1 text-[11px] leading-tight text-white min-[480px]:mt-[0.6%] min-[480px]:text-[clamp(6px,0.9vw,10px)]">
                        {t('punch.subtitle')}
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-4 flex flex-col gap-2 min-[480px]:mt-[2.5%] min-[480px]:w-[90%] min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-[4%]"
                    >
                        <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder={t('brandInfo.yourPhone')}
                            required
                            className="h-11 min-w-0 flex-1 rounded-[3px] bg-white px-3 text-sm text-[#252525] outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-500 min-[480px]:h-[clamp(24px,4.4vw,48px)] min-[480px]:px-[2%] min-[480px]:text-[clamp(7px,0.9vw,10px)]"
                        />
                        <button
                            type="submit"
                            className="h-11 shrink-0 rounded-[3px] bg-[#d90000] px-4 text-[10px] font-bold uppercase text-white transition-colors hover:bg-red-700 min-[480px]:h-[clamp(24px,4.4vw,48px)] min-[480px]:w-[47%] min-[480px]:px-2 min-[480px]:text-[clamp(5px,0.75vw,9px)]"
                        >
                            {t('punch.button')}
                        </button>
                    </form>

                    <p
                        aria-live="polite"
                        className="mt-2 text-[9px] leading-tight text-[#777] min-[480px]:mt-[1.5%] min-[480px]:text-[clamp(5px,0.65vw,7px)]"
                    >
                        {isSubmitted ? t('brandInfo.thanks') : t('punch.consent')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Punch;
