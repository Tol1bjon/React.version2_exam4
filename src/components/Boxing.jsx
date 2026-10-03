import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VIDEO_SRC = '/review_video.mp4';

const reviews = [
  {
    id: 1,
    nameKey: 'author',
    textKey: 'shortText',
  },
  {
    id: 2,
    nameKey: 'author',
    textKey: 'shortText',
  },
  {
    id: 3,
    nameKey: 'author',
    textKey: 'shortText',
  },
];

const ReviewCard = ({ review, t }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleVideo = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        setIsPlaying(false);
        console.error('Unable to play the review video.', error);
      }
      return;
    }

    video.pause();
  };

  return (
    <article className="self-start overflow-hidden rounded-[18px] bg-[#efefef] shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className="relative h-[272px] overflow-hidden bg-[#22272d]">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="h-full w-full object-cover"
          muted
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <button
          type="button"
          onClick={handleToggleVideo}
          className="absolute inset-0 flex items-center justify-center bg-transparent"
          aria-label={isPlaying ? t('boxing.pause') : t('boxing.play')}
        >
          <span className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#1a1d20]/40 shadow-[0_0_18px_rgba(210,0,0,0.35)]">
            <span className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#d20000] text-white shadow-[0_0_18px_rgba(210,0,0,0.75)]">
              {isPlaying ? (
                <Pause className="h-8 w-8 fill-white" />
              ) : (
                <Play className="ml-1 h-8 w-8 fill-white" />
              )}
            </span>
          </span>
        </button>
      </div>

      <div className="px-5 pb-5 pt-4">
        <h3 className="mb-3 text-[17px] font-medium text-[#1f1f1f] md:text-[18px]">
          {t(`boxing.${review.nameKey}`)}
        </h3>

        <p className="mb-5 text-[14px] leading-[1.7] text-[#4d4d4d] md:text-[16px]">
          {isExpanded
            ? t('boxing.fullText')
            : t(`boxing.${review.textKey}`)}
        </p>

        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          className="relative inline-flex w-full items-center justify-center rounded-[10px] bg-[#d9d9d9] px-4 py-3 text-center text-[13px] font-semibold text-[#1c1c1c] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] transition-opacity hover:opacity-90 md:text-[14px]"
        >
          <span>{isExpanded ? t('boxing.less') : t('boxing.more')}</span>
          {isExpanded ? (
            <ChevronUp className="absolute right-4 h-4 w-4" />
          ) : (
            <ChevronDown className="absolute right-4 h-4 w-4" />
          )}
        </button>
      </div>
    </article>
  );
};

const Boxing = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1520px] px-4 py-6 md:px-8 lg:px-10">
      <h2 className="mb-8 text-[30px] font-bold tracking-[-0.04em] text-[#1d1d1d] md:text-[38px]">
        {t('boxing.title')}
      </h2>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} t={t} />
        ))}
      </div>
    </section>
  );
};

export default Boxing;
