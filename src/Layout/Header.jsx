import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API } from '../../API/API';
import i18n from '../Translate/Translate';
import logo from '../assets/Group 673.png';
import { MapPin, Clock, Menu, Phone, ChevronDown, Heart, Search, X } from 'lucide-react';

const Header = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [language, setLanguage] = useState('ru');
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [brands, setBrands] = useState([]);
    const [carModels, setCarModels] = useState([]);
    const [isLoadingBrands, setIsLoadingBrands] = useState(true);
    const [hasBrandsError, setHasBrandsError] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        let isActive = true;

        const loadBrands = async () => {
            try {
                const { data } = await axios.get(API);
                const carBrands = Array.isArray(data) ? data : data.cars;
                const brandNames = Array.isArray(carBrands)
                    ? carBrands
                        .map((carBrand) => carBrand.brand)
                        .filter((brand) => typeof brand === 'string' && brand.trim())
                    : [];
                const models = Array.isArray(carBrands)
                    ? carBrands.flatMap((carBrand) =>
                        (carBrand.models || []).map((model) => ({
                            ...model,
                            brandName: carBrand.brand,
                        }))
                    )
                    : [];

                if (isActive) {
                    setBrands(brandNames);
                    setCarModels(models);
                    setHasBrandsError(brandNames.length === 0);
                }
            } catch (error) {
                console.error('Unable to load car brands for the header catalog.', error);
                if (isActive) {
                    setHasBrandsError(true);
                }
            } finally {
                if (isActive) {
                    setIsLoadingBrands(false);
                }
            }
        };

        loadBrands();

        return () => {
            isActive = false;
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const nextLanguage = i18n.language && i18n.language.startsWith('en') ? 'en' : 'ru';
        setLanguage(nextLanguage);
    }, []);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    const handleLanguageChange = (nextLanguage) => {
        setLanguage(nextLanguage);
        setIsLanguageMenuOpen(false);
    };

    const searchResults = searchQuery.trim()
        ? carModels
            .filter((model) => model.modelName?.toLowerCase().includes(searchQuery.trim().toLowerCase()))
            .slice(0, 6)
        : [];

    const openCarDetails = (model) => {
        const modelId = model.modelId || model.id;
        if (!modelId) {
            return;
        }

        navigate(`/car-info/${encodeURIComponent(modelId)}`, {
            state: { model, brandName: model.brandName },
        });
        setSearchQuery('');
        setIsDesktopSearchOpen(false);
        setIsMobileSearchOpen(false);
    };

    const renderSearchSuggestions = () => searchResults.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-xl">
            {searchResults.map((model) => (
                <button
                    key={model.modelId || model.id}
                    type="button"
                    onClick={() => openCarDetails(model)}
                    className="flex w-full flex-col px-3 py-2 text-left transition-colors hover:bg-gray-50"
                >
                    <span className="text-xs font-semibold text-gray-800">
                        {model.modelName}
                    </span>
                    <span className="text-[10px] text-gray-500">
                        {model.brandName}
                    </span>
                </button>
            ))}
        </div>
    );

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const renderLanguageSwitcher = () => (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsLanguageMenuOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-[12px] font-semibold text-gray-700 shadow-sm transition-colors hover:border-[#cc0000] hover:text-[#cc0000]"
            >
                <span>{t('header.language')}</span>
                <span className="font-bold uppercase">{language}</span>
            </button>

            {isLanguageMenuOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                    {['ru', 'en'].map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => handleLanguageChange(item)}
                            className={`flex w-full items-center justify-between px-3 py-2 text-left text-[12px] font-medium transition-colors ${language === item ? 'bg-[#cc0000] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <span>{t(`header.${item}`)}</span>
                            <span className="text-[10px] uppercase">{item}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <header className="sticky top-0 w-full bg-white shadow-sm z-50">
            <div className="hidden lg:block">
                <div className="w-full bg-[#f4f4f4] border-b border-gray-200">
                    <div className="max-w-[1400px] mx-auto px-4 h-9 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-6">
                            <NavLink to="/contacts" className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                <span>{t('header.address')}</span>
                            </NavLink>
                            <NavLink to="/contacts" className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span>{t('header.hours')}</span>
                            </NavLink>
                        </div>
                        <div className="flex items-center gap-3">
                            <NavLink to="https://wa.me/78005519431" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors underline underline-offset-2">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.212 8.212 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.19-.09-1.12-.55-1.3-.61-.17-.07-.3-.1-.43.1-.13.19-.49.62-.6.75-.11.13-.22.14-.41.05-.19-.09-.8-.29-1.53-.94-.56-.5-1-1.12-1.11-1.31-.11-.19-.01-.29.08-.38.08-.08.19-.22.28-.33.1-.11.13-.19.19-.31.06-.13.03-.24-.02-.33-.05-.1-.43-1.03-.59-1.41-.15-.37-.31-.32-.43-.33h-.37c-.13 0-.33.05-.5.24-.17.19-.66.65-.66 1.58s.68 1.83.77 1.96c.1.13 1.34 2.05 3.25 2.87.45.2.81.31 1.08.4.46.14.87.12 1.2.07.37-.05 1.12-.46 1.28-.9.16-.45.16-.83.11-.91-.05-.08-.18-.13-.37-.22z" /></svg>
                                <span>{t('header.whatsapp')}</span>
                            </NavLink>
                            <div className="w-28">
                                {renderLanguageSwitcher()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white py-3.5">
                    <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button type="button" onClick={() => setIsOpen(true)} className="flex items-center text-black hover:text-[#cc0000] transition-colors">
                                <Menu className="w-7 h-7 stroke-[2.5]" />
                            </button>
                            <NavLink to="/" className="flex items-center">
                                <img src={logo} alt="ABC AUTO" className="h-9 object-contain" />
                            </NavLink>
                            <div className="h-7 w-[1px] bg-gray-300 mx-2"></div>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#cc0000] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">{t('header.years')}</span>
                                <div className="text-[12px] font-extrabold text-black leading-tight tracking-tight">
                                    <div>{t('header.highlight')}</div>
                                </div>
                            </div>
                        </div>

                        <nav className="flex items-center gap-6">
                            <NavLink to="/" className={({ isActive }) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-600 hover:text-black'}`}>{t('header.home')}</NavLink>
                            <NavLink to="/company" className={({ isActive }) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-600 hover:text-black'}`}>{t('header.company')}</NavLink>
                            <NavLink to="/services" className={({ isActive }) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-600 hover:text-black'}`}>{t('header.services')}</NavLink>
                            <NavLink to="/reviews" className={({ isActive }) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-600 hover:text-black'}`}>{t('header.reviews')}</NavLink>
                            <NavLink to="/contacts" className={({ isActive }) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-600 hover:text-black'}`}>{t('header.contacts')}</NavLink>
                        </nav>

                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center text-white shrink-0 shadow-md">
                                    <Phone className="w-4 h-4 fill-white" />
                                </div>
                                <div className="flex flex-col">
                                    <NavLink to="tel:+78005519431" className="text-[17px] font-extrabold text-gray-900 leading-tight tracking-tight hover:text-[#cc0000] transition-colors">+7 (800) 551-94-31</NavLink>
                                    <NavLink to="tel:+74952921867" className="text-[11px] font-medium text-gray-500 leading-tight hover:text-gray-800 transition-colors">+7 (495) 292-18-67</NavLink>
                                </div>
                            </div>
                            <NavLink to="/callback" className="bg-[#cc0000] hover:bg-[#b00000] transition-all transform active:scale-95 text-white text-[13px] font-bold uppercase tracking-wider px-6 py-3 rounded shadow-sm whitespace-nowrap">{t('header.callback')}</NavLink>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white py-2.5 border-t border-gray-100 relative" ref={dropdownRef}>
                    <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
                        <div className="flex items-center gap-7">
                            <div className="relative">
                                <button type="button" onClick={() => toggleDropdown('catalog')} className="flex items-center gap-1.5 text-[13px] font-extrabold text-gray-900 hover:text-[#cc0000] tracking-wide uppercase transition-colors">
                                    <span>{t('header.catalog')}</span>
                                    <ChevronDown className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${activeDropdown === 'catalog' ? 'rotate-180 text-[#cc0000]' : ''}`} />
                                </button>
                                {activeDropdown === 'catalog' && (
                                    <div className="absolute top-full left-0 mt-2 w-64 max-h-[70vh] overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-lg py-3 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
                                        {brands.map((brand) => (
                                            <NavLink
                                                key={brand}
                                                to={`/brand/${encodeURIComponent(brand)}`}
                                                onClick={() => setActiveDropdown(null)}
                                                className={({ isActive }) => `px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-[#cc0000] bg-gray-50' : 'text-gray-700 hover:text-[#cc0000]'}`}
                                            >
                                                {brand}
                                            </NavLink>
                                        ))}
                                        {isLoadingBrands && (
                                            <span className="px-4 py-2 text-xs text-gray-500">
                                                {t('header.catalogLoading')}
                                            </span>
                                        )}
                                        {!isLoadingBrands && hasBrandsError && (
                                            <span className="px-4 py-2 text-xs text-gray-500">
                                                {t('header.catalogLoadError')}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button type="button" onClick={() => toggleDropdown('used')} className="flex items-center gap-1.5 text-[13px] font-extrabold text-gray-900 hover:text-[#cc0000] tracking-wide uppercase transition-colors">
                                    <span>{t('header.used')}</span>
                                    <ChevronDown className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${activeDropdown === 'used' ? 'rotate-180 text-[#cc0000]' : ''}`} />
                                </button>
                                {activeDropdown === 'used' && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-lg py-3 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <NavLink to="/used/verified" onClick={() => setActiveDropdown(null)} className={({ isActive }) => `px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-[#cc0000] bg-gray-50' : 'text-gray-700 hover:text-[#cc0000]'}`}>{t('header.usedItem1')}</NavLink>
                                        <NavLink to="/trade-in" onClick={() => setActiveDropdown(null)} className={({ isActive }) => `px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-[#cc0000] bg-gray-50' : 'text-gray-700 hover:text-[#cc0000]'}`}>{t('header.usedItem2')}</NavLink>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button type="button" onClick={() => toggleDropdown('credit')} className="flex items-center gap-1.5 text-[13px] font-extrabold text-gray-900 hover:text-[#cc0000] tracking-wide uppercase transition-colors">
                                    <span>{t('header.credit')}</span>
                                    <ChevronDown className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${activeDropdown === 'credit' ? 'rotate-180 text-[#cc0000]' : ''}`} />
                                </button>
                                {activeDropdown === 'credit' && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-lg py-3 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <NavLink to="/credit/calculator" onClick={() => setActiveDropdown(null)} className={({ isActive }) => `px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-[#cc0000] bg-gray-50' : 'text-gray-700 hover:text-[#cc0000]'}`}>{t('header.creditItem1')}</NavLink>
                                        <NavLink to="/credit/state-program" onClick={() => setActiveDropdown(null)} className={({ isActive }) => `px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-[#cc0000] bg-gray-50' : 'text-gray-700 hover:text-[#cc0000]'}`}>{t('header.creditItem2')}</NavLink>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button type="button" onClick={() => toggleDropdown('special')} className="flex items-center gap-1.5 text-[13px] font-extrabold text-gray-900 hover:text-[#cc0000] tracking-wide uppercase transition-colors">
                                    <span>{t('header.offers')}</span>
                                    <ChevronDown className={`w-4 h-4 stroke-[2.5] transition-transform duration-200 ${activeDropdown === 'special' ? 'rotate-180 text-[#cc0000]' : ''}`} />
                                </button>
                                {activeDropdown === 'special' && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-lg py-3 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
                                        <NavLink to="/credit" onClick={() => setActiveDropdown(null)} className={({ isActive }) => `px-4 py-2 text-xs font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-[#cc0000] bg-gray-50' : 'text-gray-700 hover:text-[#cc0000]'}`}>{t('header.specialOffer')}</NavLink>
                                    </div>
                                )}
                            </div>

                            <NavLink to="/taxi" className={({ isActive }) => `flex items-center gap-1.5 text-[13px] font-extrabold tracking-wide uppercase transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-900 hover:text-[#cc0000]'}`}>
                                <span>{t('header.taxi')}</span>
                            </NavLink>
                        </div>

                        <div className="flex items-center gap-6">
                            <NavLink to="/like" aria-label={t('header.favorites')} className={({ isActive }) => `flex items-center justify-center transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-700 hover:text-[#cc0000]'}`}>
                                <Heart className="w-5 h-5 stroke-[1.8] fill-none" />
                            </NavLink>
                            <NavLink to="/compare" aria-label={t('header.compare')} className={({ isActive }) => `flex items-center justify-center transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-700 hover:text-[#cc0000]'}`}>
                                <svg className="w-5 h-5 stroke-current stroke-[1.8] fill-none" viewBox="0 0 24 24"><rect x="6" y="7" width="4" height="13" rx="2" /><rect x="14" y="4" width="4" height="16" rx="2" /></svg>
                            </NavLink>

                            <div className="flex items-center">
                                {isDesktopSearchOpen ? (
                                    <div className="relative flex items-center border border-gray-300 rounded-lg px-3 py-1.5 w-[280px] bg-white shadow-inner transition-all duration-200">
                                        <input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' && searchResults[0]) {
                                                    openCarDetails(searchResults[0]);
                                                }
                                            }}
                                            placeholder={t('header.search')}
                                            autoFocus
                                            className="w-full text-xs text-gray-800 outline-none bg-transparent"
                                        />
                                        <button type="button" onClick={() => setIsDesktopSearchOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                        {renderSearchSuggestions()}
                                    </div>
                                ) : (
                                    <button type="button" onClick={() => setIsDesktopSearchOpen(true)} className="flex items-center justify-center text-gray-700 hover:text-[#cc0000] transition-colors p-1">
                                        <Search className="w-5 h-5 stroke-[1.8]" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block lg:hidden">
                <div className="w-full bg-[#f4f4f4] border-b border-gray-200 py-2 px-4 flex items-center justify-between text-xs">
                    <NavLink to="tel:+78005519431" className="font-bold text-gray-900 tracking-tight">+7 (800) 551-94-31</NavLink>
                    <NavLink to="/callback" className="flex items-center gap-1.5 font-bold text-[#cc0000]">
                        <Phone className="w-3.5 h-3.5 fill-[#cc0000]" />
                        <span>{t('header.callback')}</span>
                    </NavLink>
                </div>

                <div className="w-full bg-white py-3 px-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setIsOpen(true)} className="flex items-center text-black">
                            <Menu className="w-7 h-7 stroke-[2.5]" />
                        </button>
                        <NavLink to="/" className="flex items-center">
                            <img src={logo} alt="ABC AUTO" className="h-8 object-contain" />
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <NavLink to="/like" aria-label={t('header.favorites')} className={({ isActive }) => `flex items-center justify-center transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-700'}`}>
                            <Heart className="w-5 h-5 stroke-[1.8]" />
                        </NavLink>
                        <NavLink to="/compare" aria-label={t('header.compare')} className={({ isActive }) => `flex items-center justify-center transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-700'}`}>
                            <svg className="w-5 h-5 stroke-current stroke-[1.8] fill-none" viewBox="0 0 24 24"><rect x="6" y="7" width="4" height="13" rx="2" /><rect x="14" y="4" width="4" height="16" rx="2" /></svg>
                        </NavLink>
                        <button type="button" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="flex items-center justify-center text-gray-700">
                            <Search className="w-5 h-5 stroke-[1.8]" />
                        </button>
                    </div>
                </div>

                {isMobileSearchOpen && (
                    <div className="w-full bg-[#f8f8f8] p-3 border-b border-gray-200 animate-in slide-in-from-top duration-200">
                        <div className="relative w-full flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' && searchResults[0]) {
                                        openCarDetails(searchResults[0]);
                                    }
                                }}
                                placeholder={t('header.search')}
                                autoFocus
                                className="w-full text-sm text-gray-800 outline-none bg-transparent"
                            />
                            <button type="button" onClick={() => setIsMobileSearchOpen(false)} className="text-gray-400 ml-2 shrink-0">
                                <X className="w-4 h-4" />
                            </button>
                            {renderSearchSuggestions()}
                        </div>
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>
                    <div className="relative w-[320px] max-w-[85%] bg-white h-full overflow-y-auto flex flex-col z-10 p-5 shadow-2xl animate-in slide-in-from-left duration-200">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                            <NavLink to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                                <img src={logo} alt="ABC AUTO" className="h-8 object-contain" />
                            </NavLink>
                            <button type="button" onClick={() => setIsOpen(false)} className="flex items-center text-gray-700 hover:text-[#cc0000] transition-colors">
                                <X className="w-6 h-6 stroke-[2]" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 py-4 border-b border-gray-200">
                            <span className="bg-[#cc0000] text-white text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">{t('header.years')}</span>
                            <div className="text-[12px] font-extrabold text-black leading-tight tracking-tight">
                                <div>{t('header.highlight')}</div>
                            </div>
                        </div>

                        <div className="py-4 border-b border-gray-200">
                            {renderLanguageSwitcher()}
                        </div>

                        <div className="flex flex-col gap-3 border-b border-gray-200 py-4 text-sm">
                            <NavLink
                                to="/catalog"
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}
                            >
                                {t('header.catalog')}
                            </NavLink>
                            {brands.map((brand) => (
                                <NavLink
                                    key={brand}
                                    to={`/brand/${encodeURIComponent(brand)}`}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `pl-3 text-xs font-medium transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-600 hover:text-black'}`}
                                >
                                    {brand}
                                </NavLink>
                            ))}
                            {isLoadingBrands && (
                                <span className="pl-3 text-xs text-gray-500">
                                    {t('header.catalogLoading')}
                                </span>
                            )}
                            {!isLoadingBrands && hasBrandsError && (
                                <span className="pl-3 text-xs text-gray-500">
                                    {t('header.catalogLoadError')}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 py-4 border-b border-gray-200 text-sm">
                            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}>{t('header.home')}</NavLink>
                            <NavLink to="/company" onClick={() => setIsOpen(false)} className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}>{t('header.company')}</NavLink>
                            <NavLink to="/services" onClick={() => setIsOpen(false)} className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}>{t('header.services')}</NavLink>
                            <NavLink to="/reviews" onClick={() => setIsOpen(false)} className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}>{t('header.reviews')}</NavLink>
                            <NavLink to="/contacts" onClick={() => setIsOpen(false)} className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}>{t('header.contacts')}</NavLink>
                            <NavLink to="/credit" onClick={() => setIsOpen(false)} className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-[#cc0000] font-bold' : 'text-gray-700 hover:text-black'}`}>{t('header.specialOffer')}</NavLink>
                        </div>

                        <div className="flex flex-col gap-3 py-4 border-b border-gray-200">
                            <NavLink to="/taxi" onClick={() => setIsOpen(false)} className={({ isActive }) => `text-[13px] font-extrabold tracking-wide uppercase transition-colors ${isActive ? 'text-[#cc0000]' : 'text-gray-900 hover:text-[#cc0000]'}`}>{t('header.taxi')}</NavLink>
                        </div>

                        <div className="flex flex-col gap-3 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#cc0000] flex items-center justify-center text-white shrink-0">
                                    <Phone className="w-4 h-4 fill-white" />
                                </div>
                                <div className="flex flex-col">
                                    <NavLink to="tel:+78005519431" className="text-[16px] font-extrabold text-gray-900 leading-tight tracking-tight">+7 (800) 551-94-31</NavLink>
                                    <NavLink to="tel:+74952921867" className="text-[11px] font-medium text-gray-500 leading-tight">+7 (495) 292-18-67</NavLink>
                                </div>
                            </div>
                            <NavLink to="/callback" onClick={() => setIsOpen(false)} className="bg-[#cc0000] text-white text-center text-[12px] font-bold uppercase tracking-wider py-2.5 rounded shadow-sm whitespace-nowrap">{t('header.callback')}</NavLink>
                        </div>

                        <div className="flex flex-col gap-2.5 pt-4 text-xs text-gray-500">
                            <NavLink to="/contacts" onClick={() => setIsOpen(false)} className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                <span>{t('header.address')}</span>
                            </NavLink>
                            <NavLink to="/contacts" onClick={() => setIsOpen(false)} className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span>{t('header.hours')}</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
