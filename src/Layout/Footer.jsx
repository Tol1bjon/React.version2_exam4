import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import raiting from '../assets/45588c5ae1444dc11fd0cd39704f66dd 1.png';
import { Phone, Clock, MapPin, ChevronDown } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full bg-[#1f1f1f] text-white transition-colors duration-300">
            <div className="border-b border-white/10">
                <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 text-[13px] font-extrabold uppercase tracking-wider">
                    {[
                        { to: '/catalog', label: t('footer.catalog') },
                        { to: '/used', label: t('footer.used') },
                        { to: '/credit', label: t('footer.credit') },
                        { to: '/offers', label: t('footer.offers') },
                        { to: '/taxi', label: t('footer.taxi') },
                    ].map((item, index) => (
                        <NavLink key={index} to={item.to} className="relative text-gray-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 group"> {item.label}
                            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#cc0000] transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-[12px]">
                        <div className="flex flex-col gap-2">
                            <div className="mb-2">
                                <span className="font-extrabold text-[13px] tracking-wider uppercase block leading-none">{t('footer.catalogTitle')}</span>
                                <span className="font-extrabold text-[13px] tracking-wider uppercase block leading-none">{t('footer.catalogTitle2')}</span>
                                <div className="w-7 h-[2px] bg-[#cc0000] mt-1.5 transition-all duration-300 hover:w-12"></div>
                            </div>
                            <div className="flex flex-col gap-1.5 text-gray-400">
                                {['Kia', 'Hyundai', 'Skoda', 'Volkswagen', 'Toyota', 'Brilliance'].map((brand, i) => (
                                    <NavLink key={i} to={`/catalog/${brand.toLowerCase()}`} className="hover:text-white hover:translate-x-1 transition-all duration-200">{brand}</NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="mb-2 h-[34px] flex items-end">
                                <NavLink to="/details" className="text-gray-400 hover:text-white text-xs underline underline-offset-2 transition-colors">{t('footer.more')}</NavLink>
                            </div>
                            <div className="flex flex-col gap-1.5 text-gray-400">
                                {['Changan', 'Chery', 'CheryExeed', 'Chevrolet', 'Citroen', 'Datsun'].map((brand, i) => (
                                    <NavLink key={i} to={`/catalog/${brand.toLowerCase()}`} className="hover:text-white hover:translate-x-1 transition-all duration-200">{brand}</NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="mb-2 h-[34px]"></div>
                            <div className="flex flex-col gap-1.5 text-gray-400">
                                {['Dongfeng', 'DW Hower', 'FAW', 'Ford', 'Foton', 'Geely'].map((brand, i) => (
                                    <NavLink key={i} to={`/catalog/${brand.toLowerCase().replace(' ', '-')}`} className="hover:text-white hover:translate-x-1 transition-all duration-200">{brand}</NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="mb-2 h-[34px]"></div>
                            <div className="flex flex-col gap-1.5 text-gray-400">
                                {['Great Wall', 'Haima', 'Haval', 'Honda', 'JAC', 'Lada'].map((brand, i) => (
                                    <NavLink key={i} to={`/catalog/${brand.toLowerCase().replace(' ', '-')}`} className="hover:text-white hover:translate-x-1 transition-all duration-200">{brand}</NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="mb-2 h-[34px]"></div>
                            <div className="flex flex-col gap-1.5 text-gray-400">
                                {['Lifan', 'Mazda', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot'].map((brand, i) => (
                                    <NavLink
                                        key={i}
                                        to={`/catalog/${brand.toLowerCase()}`}
                                        className="hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {brand}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="mb-2 h-[34px] flex items-end">
                                <NavLink to="/sitemap" className="text-gray-400 hover:text-white text-xs underline underline-offset-2 transition-colors">{t('footer.sitemap')}</NavLink>
                            </div>
                            <div className="flex flex-col gap-1.5 text-gray-400">
                                {['Ravon', 'Renault', 'SsangYong', 'Suzuki', 'UAZ', 'Zotye'].map((brand, i) => (
                                    <NavLink key={i} to={`/catalog/${brand.toLowerCase()}`} className="hover:text-white hover:translate-x-1 transition-all duration-200">{brand}</NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-2 text-[12px]">
                        <div className="mb-2">
                            <span className="font-extrabold text-[13px] tracking-wider uppercase block leading-none">{t('footer.creditTitle')}</span>
                            <div className="w-7 h-[2px] bg-[#cc0000] mt-3"></div>
                        </div>
                        <div className="flex flex-col gap-1.5 text-gray-400">
                            {[
                                { to: '/credit/express', label: t('footer.express') },
                                { to: '/credit/family', label: t('footer.family') },
                                { to: '/credit/first-car', label: t('footer.firstCar') },
                                { to: '/credit/medical', label: t('footer.medical') },
                                { to: '/credit/installment', label: t('footer.installment') },
                                { to: '/trade-in', label: 'Trade-in' },
                            ].map((item, i) => (
                                <NavLink key={i} to={item.to} className="hover:text-white hover:translate-x-1 underline underline-offset-2 transition-all duration-200">{item.label}</NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-2 text-[12px]">
                        <div className="mb-2">
                            <span className="font-extrabold text-[13px] tracking-wider uppercase block leading-none">{t('footer.contactsTitle')}</span>
                            <div className="w-7 h-[2px] bg-[#cc0000] mt-3"></div>
                        </div>
                        <div className="flex flex-col gap-3 text-gray-300">
                            <div className="flex items-start gap-2.5 group">
                                <div className="w-5 h-5 rounded-full bg-[#cc0000] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-900/30">
                                    <Phone className="w-2.5 h-2.5 fill-white text-white animate-pulse" />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <a href="tel:+78005519431" className="font-semibold text-white hover:text-[#cc0000] transition-colors">+7 (800) 551-94-31</a>
                                    <a href="tel:+74952921867" className="font-semibold text-white hover:text-[#cc0000] transition-colors">+7 (495) 292-18-67</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-[#cc0000] flex items-center justify-center shrink-0 mt-0.5">
                                    <Clock className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-[11px] text-gray-300">{t('footer.hours')}</span>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-[#cc0000] flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin className="w-2.5 h-2.5 text-white" />
                                </div>
                                <div className="flex flex-col text-[11px]">
                                    <span className="text-gray-300">{t('footer.address')}</span>
                                    <NavLink to="/map" className="text-[#cc0000] underline mt-0.5 hover:text-red-400 transition-colors">{t('footer.route')}</NavLink>
                                </div>
                            </div>

                            <div className="mt-1">
                                <div className="flex items-center justify-between bg-[#2d2d2d] hover:bg-[#383838] active:scale-[0.98] transition-all duration-200 px-3 py-2 rounded text-xs text-white cursor-pointer shadow-md">
                                    <span>{t('footer.city')}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 transition-transform duration-300 hover:rotate-180" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-[#191919] py-6">
                <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-1.5 text-center lg:text-left">
                        <div className="text-[12px] font-semibold text-white">
                            {t('footer.copyright')}
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] text-gray-500">
                            <NavLink to="/privacy" className="underline hover:text-gray-300 transition-colors">{t('footer.privacy')}</NavLink>
                            <NavLink to="/agreement" className="underline hover:text-gray-300 transition-colors">{t('footer.agreement')}</NavLink>
                        </div>
                    </div>

                    <p className="max-w-[620px] text-[10px] text-gray-500 leading-normal text-center lg:text-left">
                        {t('footer.disclaimer')}
                    </p>

                    <div className="shrink-0 flex items-center justify-center">
                        <img
                            src={raiting}
                            alt={t('footer.ratingAlt')}
                            className="h-10 object-contain rounded transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.displayName = 'Footer';
export default Footer;