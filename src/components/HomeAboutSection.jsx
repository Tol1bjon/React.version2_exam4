import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock3, MapPin, Navigation, Phone } from 'lucide-react';

const HomeAboutSection = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('showroom');
    const tabs = [
        { id: 'showroom', label: t('homeAbout.showroom') },
        { id: 'tradeIn', label: t('homeAbout.tradeIn') },
        { id: 'purchase', label: t('homeAbout.purchase') },
    ];

    return (
        <section className="mx-auto w-full max-w-[1400px] px-2 pb-8 pt-10 sm:px-4 sm:pt-12">
            <div className="mx-auto mb-12 max-w-[960px] px-2 sm:px-4">
                <div className="mb-6 flex items-center gap-7">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-3 text-[12px] font-semibold transition-colors ${activeTab === tab.id ? 'text-[#d90000]' : 'text-[#282828] hover:text-[#d90000]'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#d90000]" />
                            )}
                        </button>
                    ))}
                </div>

                <h2 className="mb-3 text-[22px] font-bold leading-tight text-[#333333] sm:text-[28px]">
                    {t('homeAbout.title')}
                </h2>
                <p className="text-[10px] leading-[1.55] text-[#777777] sm:text-[12px]">
                    {t('homeAbout.description')}
                </p>
            </div>

            <div className="relative h-[300px] w-full overflow-hidden sm:h-[340px]">
                <iframe
                    title={t('homeAbout.mapTitle')}
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Af7293bcf91494924a2efaa53026f212903ea7e203598717b9bcfb555d49c6692&amp;source=constructor"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                />

                <div className="absolute right-4 top-4 z-10 flex w-[min(245px,calc(100%-2rem))] flex-col gap-2 rounded-[10px] bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.14)] sm:right-[12%] sm:top-1/2 sm:w-[270px] sm:-translate-y-1/2 sm:p-5">
                    <a
                        href="tel:+78005519431"
                        className="flex items-center gap-2 text-[10px] leading-tight text-[#333333] hover:text-[#d90000] sm:text-[11px]"
                    >
                        <Phone className="h-4 w-4 shrink-0 fill-[#d90000] text-[#d90000]" />
                        <span>+7 (800) 551-94-31</span>
                    </a>
                    <a
                        href="tel:+74952921867"
                        className="flex items-center gap-2 text-[10px] leading-tight text-[#333333] hover:text-[#d90000] sm:text-[11px]"
                    >
                        <Phone className="h-4 w-4 shrink-0 fill-[#d90000] text-[#d90000]" />
                        <span>+7 (495) 292-18-67</span>
                    </a>
                    <div className="flex items-center gap-2 text-[10px] leading-tight text-[#333333] sm:text-[11px]">
                        <Clock3 className="h-4 w-4 shrink-0 text-[#d90000]" />
                        <span>{t('homeAbout.hours')}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[10px] leading-tight text-[#333333] sm:text-[11px]">
                        <MapPin className="h-4 w-4 shrink-0 fill-[#d90000] text-[#d90000]" />
                        <span>{t('contacts.addressValue')}</span>
                    </div>
                    <a
                        href="https://yandex.ru/maps/?rtext=~55.597068,37.511805"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex min-h-10 items-center justify-center gap-2 rounded-[4px] bg-[#d90000] px-3 text-center text-[9px] font-bold uppercase text-white transition-colors hover:bg-red-700 sm:text-[10px]"
                    >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>{t('homeAbout.directions')}</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HomeAboutSection;
