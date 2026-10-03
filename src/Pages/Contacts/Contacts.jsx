import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import img1 from '../../assets/Rectangle 487.png';
import img2 from '../../assets/images.jfif';
import img3 from '../../assets/images (1).jfif';
import img4 from '../../assets/images (2).jfif';
import img5 from '../../assets/images (3).jfif';
import img6 from '../../assets/images (4).jfif';

const Contacts = () => {
    const { t } = useTranslation();
    const images = [img1, img2, img3, img4, img5, img6];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <div className="mb-8">
                <span className="text-xs text-gray-500 md:text-sm">
                    <a href="/" className="hover:underline">{t('contacts.breadcrumbsHome')}</a> / {t('contacts.breadcrumbsCurrent')}
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                    {t('contacts.title')}
                </h1>
            </div>

            <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="mb-1 font-bold text-gray-900">{t('contacts.phone')}</h3>
                        <p className="text-sm text-gray-700 md:text-base">+7 (800) 551-94-31</p>
                        <p className="text-sm text-gray-700 md:text-base">+7 (495) 292-18-67</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="mb-1 font-bold text-gray-900">{t('contacts.address')}</h3>
                        <p className="text-sm text-gray-700 md:text-base">{t('contacts.addressValue')}</p>
                        <p className="mt-1 text-xs font-semibold text-red-600 md:text-sm">GPS: 55.597068, 37.511805</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="mb-1 font-bold text-gray-900">{t('contacts.route')}</h3>
                        <ul className="space-y-1 text-sm md:text-base">
                            <li>
                                <a href="#mkad-in" className="text-red-600 hover:underline">
                                    {t('contacts.routeMkadIn')}
                                </a>
                            </li>
                            <li>
                                <a href="#mkad-out" className="text-red-600 hover:underline">
                                    {t('contacts.routeMkadOut')}
                                </a>
                            </li>
                            <li>
                                <a href="#city" className="text-red-600 hover:underline">
                                    {t('contacts.routeCity')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative mb-12 h-[400px] w-full overflow-hidden rounded-2xl border border-gray-100 shadow-md md:h-[450px]">
                <iframe
                    title="Yandex Map"
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Af7293bcf91494924a2efaa53026f212903ea7e203598717b9bcfb555d49c6692&amp;source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen={true}
                    style={{ position: 'relative' }}
                ></iframe>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
                        {t('contacts.company')}
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                        {t('contacts.companyText')}
                    </p>
                </div>

                <div className="relative h-[280px] overflow-hidden rounded-2xl bg-gray-100 shadow-lg md:h-[340px]">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
                        >
                            <img src={img} alt={`${t('contacts.slideLabel')} ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                    ))}

                    <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 px-6">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${index === currentIndex ? 'w-10 bg-red-600' : 'w-6 bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;