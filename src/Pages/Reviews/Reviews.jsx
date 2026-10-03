import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronDown, ChevronUp } from 'lucide-react';

const VIDEO_SRC = '/review_video.mp4';

const reviewSets = {
    ru: {
        initial: [
            {
                id: 1,
                author: 'Сергей Васильев',
                videoUrl: VIDEO_SRC,
                shortText: '«Мне понравился сервис в ALTERA: доброжелательный персонал, понятные рекомендации и честная работа. Мы купили автомобиль и остались очень довольны.»',
                fullText: '«Мне понравился сервис в ALTERA: доброжелательный персонал, понятные рекомендации и честная работа. Мы купили автомобиль и остались очень довольны. Менеджер внимательно выслушал все наши пожелания, помог сравнить варианты и быстро организовал сделку без лишнего давления.»'
            },
            {
                id: 2,
                author: 'Марина Кузнецова',
                videoUrl: VIDEO_SRC,
                shortText: '«Решили менять машину и пришли в автосалон. Здесь всё организовано очень удобно: быстро, спокойно и без спешки. Спасибо менеджеру!»',
                fullText: '«Решили менять машину и пришли в автосалон. Здесь всё организовано очень удобно: быстро, спокойно и без спешки. Нам всё подробно объяснили, помогли подобрать комплектацию и дали честные рекомендации. В итоге купили отличный автомобиль и сделали это без лишнего стресса.»'
            },
            {
                id: 3,
                author: 'Алексей Иванов',
                videoUrl: VIDEO_SRC,
                shortText: '«Очень хороший салон, вежливые сотрудники и понятный подход. Покупка прошла гладко, а машина порадует каждый день.»',
                fullText: '«Очень хороший салон, вежливые сотрудники и понятный подход. Покупка прошла гладко, без торопливости и лишних проволочек. Нам помогли с документами, показали все преимущества модели и объяснили условия, что очень важно при выборе нового авто.»'
            },
        ],
        extra: [
            {
                id: 4,
                author: 'Ольга Петрова',
                videoUrl: VIDEO_SRC,
                shortText: '«Мы приехали с конкретной задачей, и мастерски помогли выбрать автомобиль под наш бюджет и стиль жизни.»',
                fullText: '«Мы приехали с конкретной задачей, и мастерски помогли выбрать автомобиль под наш бюджет и стиль жизни. Всё было прозрачно: от консультации до оформления документов. Остались довольны и рекомендуем салон друзьям.»'
            },
            {
                id: 5,
                author: 'Дмитрий Соколов',
                videoUrl: VIDEO_SRC,
                shortText: '«Профессиональный подход и доброжелательная атмосфера. Заказали автомобиль быстро и без нервов.»',
                fullText: '«Профессиональный подход и доброжелательная атмосфера. Заказали автомобиль быстро и без нервов. С менеджером всё было понятно, всё объяснили по шагам, и мы получили то, что ожидали.»'
            },
        ],
    },
    en: {
        initial: [
            {
                id: 1,
                author: 'Sergey Vasilyev',
                videoUrl: VIDEO_SRC,
                shortText: '«I liked the service at ALTERA: friendly staff, clear recommendations and honest work. We bought a car and were very satisfied.»',
                fullText: '«I liked the service at ALTERA: friendly staff, clear recommendations and honest work. We bought a car and were very satisfied. The manager listened carefully to all our wishes, helped compare options and quickly organized the deal without unnecessary pressure.»'
            },
            {
                id: 2,
                author: 'Marina Kuznetsova',
                videoUrl: VIDEO_SRC,
                shortText: '«We decided to change cars and came to the showroom. Everything here is arranged very conveniently: fast, calm and without rush. Thank you to the manager!»',
                fullText: '«We decided to change cars and came to the showroom. Everything here is arranged very conveniently: fast, calm and without rush. We were explained everything in detail, helped choose the trim and given honest recommendations. In the end, we bought a great car and did it without extra stress.»'
            },
            {
                id: 3,
                author: 'Alexey Ivanov',
                videoUrl: VIDEO_SRC,
                shortText: '«A very good showroom, polite staff and a clear approach. The purchase went smoothly, and the car will please every day.»',
                fullText: '«A very good showroom, polite staff and a clear approach. The purchase went smoothly, without rush and without unnecessary delays. We were helped with documents, shown all the advantages of the model and explained the terms, which is very important when choosing a new car.»'
            },
        ],
        extra: [
            {
                id: 4,
                author: 'Olga Petrov',
                videoUrl: VIDEO_SRC,
                shortText: '«We came with a specific goal, and they helped us choose a car that fit our budget and lifestyle perfectly.»',
                fullText: '«We came with a specific goal, and they helped us choose a car that fit our budget and lifestyle perfectly. Everything was transparent, from consultation to paperwork. We are satisfied and recommend the showroom to friends.»'
            },
            {
                id: 5,
                author: 'Dmitry Sokolov',
                videoUrl: VIDEO_SRC,
                shortText: '«Professional approach and friendly atmosphere. We ordered a car quickly and without stress.»',
                fullText: '«Professional approach and friendly atmosphere. We ordered a car quickly and without stress. Everything with the manager was clear, everything was explained step by step, and we got exactly what we expected.»'
            },
        ],
    },
};

const ReviewCard = ({ item, isExpanded, onToggle, activeVideoId, setActiveVideoId, t }) => {
    const videoRef = useRef(null);
    const isPlaying = activeVideoId === item.id;

    useEffect(() => {
        const video = videoRef.current;

        if (video && activeVideoId !== item.id && !video.paused) {
            video.pause();
        }
    }, [activeVideoId, item.id]);

    const handleTogglePlay = async () => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        if (video.paused) {
            setActiveVideoId(item.id);

            try {
                await video.play();
            } catch (error) {
                setActiveVideoId(null);
                console.error('Unable to play the review video.', error);
            }

            return;
        }

        video.pause();
    };

    const toggleLabel = isExpanded ? t('reviews.less') : t('reviews.more');

    return (
        <div className="group flex w-full flex-col self-start overflow-hidden rounded-2xl border border-gray-200 bg-[#f8f9fa] shadow-sm transition-shadow hover:shadow-md">
            <div className="relative h-[220px] overflow-hidden md:h-[240px]">
                <video
                    ref={videoRef}
                    key={item.id}
                    src={item.videoUrl}
                    preload="auto"
                    playsInline
                    muted
                    controls={isPlaying}
                    autoPlay={isPlaying}
                    onPlay={() => setActiveVideoId(item.id)}
                    onPause={() => {
                        if (activeVideoId === item.id) {
                            setActiveVideoId(null);
                        }
                    }}
                    onEnded={() => setActiveVideoId(null)}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? t('reviews.pause') : t('reviews.play')}
                    className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#cc0000] text-white shadow-[0_0_24px_rgba(204,0,0,0.6)] transition-all duration-300 hover:scale-110 hover:bg-red-700 md:h-14 md:w-14"
                >
                    {isPlaying ? (
                        <Pause className="h-5 w-5 fill-white" />
                    ) : (
                        <Play className="ml-0.5 h-5 w-5 fill-white" />
                    )}
                </button>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                    <h3 className="mb-3 text-base font-bold text-gray-900 md:text-lg">
                        {item.author}
                    </h3>
                    <p className="mb-6 text-xs leading-relaxed text-gray-600 md:text-[13px]">
                        {isExpanded ? item.fullText : item.shortText}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={toggleLabel}
                    className="inline-flex items-center gap-2 rounded-full bg-[#e5e7eb] px-5 py-2 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-300 md:text-sm"
                >
                    <span>{toggleLabel}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-700" /> : <ChevronDown className="h-4 w-4 text-gray-700" />}
                </button>
            </div>
        </div>
    );
};

const Reviews = () => {
    const { t, i18n } = useTranslation();
    const languageKey = i18n.language && i18n.language.startsWith('en') ? 'en' : 'ru';
    const [reviews, setReviews] = useState(reviewSets[languageKey].initial);
    const [expandedId, setExpandedId] = useState(null);
    const [activeVideoId, setActiveVideoId] = useState(null);

    useEffect(() => {
        setReviews(reviewSets[languageKey].initial);
        setExpandedId(null);
        setActiveVideoId(null);
    }, [languageKey]);

    const handleToggleExpand = (id) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };

    const handleLoadMore = () => {
        const moreReviews = reviewSets[languageKey].extra.filter(
            (item) => !reviews.some((existing) => existing.id === item.id)
        );

        setReviews((prev) => [...prev, ...moreReviews]);
    };

    return (
        <div className="mx-auto max-w-[1400px] px-4 py-8 text-[#222]">
            <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
                <Link className="transition-colors hover:text-gray-600" to="/">{t('reviews.breadcrumbsHome')}</Link>
                <span>/</span>
                <span className="text-gray-600">{t('reviews.breadcrumbsCurrent')}</span>
            </div>

            <h1 className="mb-10 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                {t('reviews.title')}
            </h1>

            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {reviews.map((item) => (
                    <ReviewCard
                        key={item.id}
                        item={item}
                        isExpanded={expandedId === item.id}
                        onToggle={() => handleToggleExpand(item.id)}
                        activeVideoId={activeVideoId}
                        setActiveVideoId={setActiveVideoId}
                        t={t}
                    />
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    type="button"
                    onClick={handleLoadMore}
                    className="w-full rounded-lg bg-[#cc0000] px-10 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 active:translate-y-0.5 sm:w-auto"
                >
                    {t('reviews.loadMore')}
                </button>
            </div>
        </div>
    );
};

export default Reviews;
