import React from 'react';
import { useTranslation } from 'react-i18next';

const CompanyVideo = () => {
    const { t } = useTranslation();

    return (
        <section className="mx-auto w-full max-w-[960px] px-4 py-8 sm:py-10">
            <div className="mx-auto mb-6 max-w-[850px] text-center">
                <h2 className="mb-3 text-[22px] font-bold leading-tight text-[#333333] sm:text-[28px]">
                    {t('companyVideo.title')}
                </h2>
                <p className="text-[10px] leading-[1.55] text-[#777777] sm:text-[12px]">
                    {t('companyVideo.description')}
                </p>
            </div>

            <video
                className="mx-auto aspect-video w-full max-w-[850px] rounded-[12px] bg-[#222222] object-cover"
                src="/review_video.mp4"
                controls
                playsInline
                preload="metadata"
                aria-label={t('companyVideo.title')}
            />
        </section>
    );
};

export default CompanyVideo;
