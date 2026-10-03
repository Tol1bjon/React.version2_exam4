import React from 'react';
import { useTranslation } from 'react-i18next';
import family from '../assets/Rectangle 576.png';

const Blog = () => {
    const { t } = useTranslation();

    const articles = [1, 2, 3, 4];

    return (
        <section className="mx-auto w-full max-w-[1180px] px-7 py-6 sm:px-8 sm:py-10">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <h2 className="text-[16px] font-bold leading-none text-[#292929] sm:text-[28px]">
                    {t('blog.title')}
                </h2>
                <a
                    href="/blog"
                    className="rounded-full bg-[#d90000] px-2.5 py-1 text-[7px] font-semibold leading-none text-white transition-colors hover:bg-red-700 sm:px-3 sm:py-1.5 sm:text-[11px]"
                >
                    {t('blog.allArticles')}
                </a>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {articles.map((article) => (
                    <article key={article} className="min-w-0">
                        <a href="/blog" className="block">
                            <img
                                src={family}
                                alt={t('blog.imageAlt')}
                                className="aspect-[1.6] w-full rounded-[7px] object-cover sm:rounded-[12px]"
                            />
                            <p className="mt-1.5 text-[6px] leading-tight text-[#999999] sm:mt-2 sm:text-[10px]">
                                {t('blog.date')}
                            </p>
                            <h3 className="mt-0.5 line-clamp-2 text-[7px] font-medium leading-[1.3] text-[#292929] sm:mt-1 sm:text-[13px]">
                                {t('blog.articleTitle')}
                            </h3>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Blog;
