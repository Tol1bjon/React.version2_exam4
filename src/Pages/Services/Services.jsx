import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <span className="text-xs md:text-sm text-gray-500">
                    <a href="/" className="hover:underline">{t('services.breadcrumbsHome')}</a> / {t('services.breadcrumbsCurrent')}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mt-2">
                    {t('services.title')}
                </h1>
            </div>

            <div className="w-full h-[1px] bg-gray-200 mb-8" />

            <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl mb-12">
                {t('services.intro')}
            </p>

            {/* Сетка услуг */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.bodyRepair')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.bodyRepairText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.repair')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.repairText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.tire')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.tireText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.diagnostics')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.diagnosticsText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.oilChange')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.oilChangeText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.maintenance')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.maintenanceText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.wheelAlignment')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.wheelAlignmentText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.parts')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.partsText')}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-4 h-1 bg-red-600 inline-block shrink-0" />
                        <h3 className="text-xl font-bold text-gray-900">{t('services.insurance')}</h3>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{t('services.insuranceText')}</p>
                </div>
            </div>
        </div>
    );
};

export default Services;