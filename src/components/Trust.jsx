import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslation } from 'react-i18next';

const trustSites = [
  { id: 1, score: '4.5' },
  { id: 2, score: '4.5' },
  { id: 3, score: '4.5' },
  { id: 4, score: '4.5' },
  { id: 5, score: '4.5' },
  { id: 6, score: '4.5' },
];

const Trust = () => {
  const { t } = useTranslation();
  const swiperRef = useRef(null);

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 text-[#292929] md:px-7 overflow-x-hidden">
      <div className="mb-5 flex items-center justify-between md:mb-6">
        <h2 className="text-xl font-bold leading-none md:text-3xl">
          {t('trust.title')}
        </h2>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={t('trust.previous')}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-500 shadow-[0_1px_8px_rgba(0,0,0,0.12)] transition-colors hover:bg-gray-100 md:h-10 md:w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={t('trust.next')}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e00000] text-white transition-colors hover:bg-red-700 md:h-10 md:w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={16}
        slidesPerView={1.35}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 18 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="!overflow-visible"
      >
        {trustSites.map((site) => (
          <SwiperSlide key={site.id}>
            <article className="h-[104px] rounded-lg bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(22,42,62,0.12)] md:h-[112px] md:px-5 md:py-4">
              <h3 className="text-sm font-bold leading-tight md:text-base">
                {t('trust.siteName')}
              </h3>
              <p className="mt-0.5 text-xs leading-tight text-gray-400 md:text-sm">
                {t('trust.dealerName')}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2 md:mt-4">
                <span className="text-[10px] leading-tight text-gray-500 md:text-xs">
                  {t('trust.recommend')}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-px" aria-label="5 stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className="h-3.5 w-3.5 fill-[#ffad00] text-[#ffad00] md:h-4 md:w-4"
                      />
                    ))}
                  </div>
                  <span className="rounded-sm bg-[#52bd72] px-1.5 py-1 text-[11px] font-bold leading-none text-white md:text-xs">
                    {site.score}
                  </span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-7">
        <article className="flex min-h-[88px] items-center justify-between gap-3 rounded-lg bg-[#f5f6f6] px-5 py-4 md:min-h-[96px] md:px-6">
          <span className="self-end text-xs text-gray-400 md:text-sm">
            {t('trust.dealerName')}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-gray-600 md:text-xs">{t('trust.recommend')}</span>
              <div className="flex gap-px" aria-label="5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="h-3.5 w-3.5 fill-[#ffad00] text-[#ffad00]"
                  />
                ))}
              </div>
            </div>
            <span className="rounded-md bg-[#52bd72] px-4 py-2 text-2xl leading-none text-white md:text-3xl">
              4.5
            </span>
          </div>
        </article>

        <article className="flex min-h-[88px] items-center justify-between gap-3 rounded-lg bg-[#f5f6f6] px-5 py-4 md:min-h-[96px] md:px-6">
          <div>
            <div className="flex items-center gap-1 text-lg font-medium leading-none text-[#737373] md:text-xl">
              <MapPin className="h-5 w-5 fill-[#4285f4] text-[#34a853]" />
              <span>
                <span className="text-[#4285f4]">G</span>
                <span className="text-[#ea4335]">o</span>
                <span className="text-[#fbbc05]">o</span>
                <span className="text-[#4285f4]">g</span>
                <span className="text-[#34a853]">l</span>
                <span className="text-[#ea4335]">e</span>
              </span>
              <span>{t('trust.maps')}</span>
            </div>
            <p className="mt-1 text-xs leading-tight text-gray-400 md:text-sm">
              {t('trust.dealerName')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-gray-600 md:text-xs">{t('trust.recommend')}</span>
              <div className="flex gap-px" aria-label="5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="h-3.5 w-3.5 fill-[#ffad00] text-[#ffad00]"
                  />
                ))}
              </div>
            </div>
            <span className="rounded-md bg-[#52bd72] px-4 py-2 text-2xl leading-none text-white md:text-3xl">
              4.1
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Trust;
