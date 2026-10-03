import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { FilterContext } from '../../utils/Price';
import kiaLogo from 'car-brand-logos/kia-logo.svg';
import brillianceLogo from 'car-brand-logos/brilliance-logo.png';
import citroenLogo from 'car-brand-logos/citroen-logo.svg';
import fordLogo from 'car-brand-logos/ford-logo.png';
import peugeotLogo from 'car-brand-logos/peugeot-logo.svg';
import uazLogo from 'car-brand-logos/uaz-logo.png';
import hyundaiLogo from 'car-brand-logos/hyundai-logo.svg';
import changanLogo from 'car-brand-logos/changan-logo.png';
import datsunLogo from 'car-brand-logos/datsun-logo.png';
import havalLogo from 'car-brand-logos/haval-logo.png';
import mazdaLogo from 'car-brand-logos/mazda-logo.svg';
import zotyeLogo from 'car-brand-logos/zotye-logo.png';
import skodaLogo from 'car-brand-logos/skoda-logo.svg';
import cheryLogo from 'car-brand-logos/chery-logo.png';
import dongfengLogo from 'car-brand-logos/dongfeng-logo.png';
import hondaLogo from 'car-brand-logos/honda-logo.png';
import mitsubishiLogo from 'car-brand-logos/mitsubishi-logo.svg';
import renaultLogo from 'car-brand-logos/renault-logo.svg';
import volkswagenLogo from 'car-brand-logos/volkswagen-logo.svg';
import geelyLogo from 'car-brand-logos/geely-logo.svg';
import jacLogo from 'car-brand-logos/jac-logo.png';
import nissanLogo from 'car-brand-logos/nissan-logo.svg';
import ssangyongLogo from 'car-brand-logos/ssangyong-logo.png';
import toyotaLogo from 'car-brand-logos/toyota-logo.svg';
import chevroletLogo from 'car-brand-logos/chevrolet-logo.png';
import fawLogo from 'car-brand-logos/faw-logo.svg';
import greatWallLogo from 'car-brand-logos/great-wall-logo.png';
import ladaLogo from 'car-brand-logos/lada-logo.svg';
import opelLogo from 'car-brand-logos/opel-logo.svg';
import suzukiLogo from 'car-brand-logos/suzuki-logo.svg';

const brandsList = [
    { name: 'Kia', path: 'kia', logo: kiaLogo },
    { name: 'Brilliance', path: 'brilliance', logo: brillianceLogo },
    { name: 'Citroen', path: 'citroen', logo: citroenLogo },
    { name: 'Ford', path: 'ford', logo: fordLogo },
    { name: 'Haima', path: 'haima' },
    { name: 'Lifan', path: 'lifan' },
    { name: 'Peugeot', path: 'peugeot', logo: peugeotLogo },
    { name: 'UAZ', path: 'uaz', logo: uazLogo },
    { name: 'Hyundai', path: 'hyundai', logo: hyundaiLogo },
    { name: 'Changan', path: 'changan', logo: changanLogo },
    { name: 'Datsun', path: 'datsun', logo: datsunLogo },
    { name: 'Foton', path: 'foton' },
    { name: 'Haval', path: 'haval', logo: havalLogo },
    { name: 'Mazda', path: 'mazda', logo: mazdaLogo },
    { name: 'Ravon', path: 'ravon' },
    { name: 'Zotye', path: 'zotye', logo: zotyeLogo },
    { name: 'Skoda', path: 'skoda', logo: skodaLogo },
    { name: 'Chery', path: 'chery', logo: cheryLogo },
    { name: 'Dongfeng', path: 'dongfeng', logo: dongfengLogo },
    { name: 'GAC', path: 'gac' },
    { name: 'Honda', path: 'honda', logo: hondaLogo },
    { name: 'Mitsubishi', path: 'mitsubishi', logo: mitsubishiLogo },
    { name: 'Renault', path: 'renault', logo: renaultLogo },
    { name: 'Volkswagen', path: 'volkswagen', logo: volkswagenLogo },
    { name: 'CheryExeed', path: 'chery-exeed' },
    { name: 'DW Hower', path: 'dw-hower' },
    { name: 'Geely', path: 'geely', logo: geelyLogo },
    { name: 'JAC', path: 'jac', logo: jacLogo },
    { name: 'Nissan', path: 'nissan', logo: nissanLogo },
    { name: 'SsangYong', path: 'ssangyong', logo: ssangyongLogo },
    { name: 'Toyota', path: 'toyota', logo: toyotaLogo },
    { name: 'Chevrolet', path: 'chevrolet', logo: chevroletLogo },
    { name: 'FAW', path: 'faw', logo: fawLogo },
    { name: 'Great Wall', path: 'great-wall', logo: greatWallLogo },
    { name: 'Lada', path: 'lada', logo: ladaLogo },
    { name: 'Opel', path: 'opel', logo: opelLogo },
    { name: 'Suzuki', path: 'suzuki', logo: suzukiLogo }
];

const Brand = () => {
    const { t } = useTranslation();
    const { price, setPrice, setSelectedBrand, bodyType, setBodyType, transmission, setTransmission } = useContext(FilterContext);
    const navigate = useNavigate();

    const maxPriceLimit = 3000000;

    const minChange = (e) => {
        const val = Number(e.target.value);
        if (val <= price.max) {
            setPrice((prev) => ({ ...prev, min: val }));
        }
    };

    const maxPriceChange = (e) => {
        const val = Number(e.target.value);
        if (val >= price.min) {
            setPrice((prev) => ({ ...prev, max: val }));
        }
    };

    const handleSubmit = () => {
        navigate('/catalog');
    };

    return (
        <div className="max-w-[1300px] mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 my-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-3">
                    {brandsList.map((brand) => (
                        <NavLink key={brand.path} to={`/brand/${brand.name}`} onClick={() => setSelectedBrand && setSelectedBrand(brand.name)} className="flex items-center gap-3 group text-gray-800 hover:text-red-600 transition-colors">
                            <div className="w-10 h-8 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-md p-1 group-hover:bg-red-50 transition-colors">
                                {brand.logo ? (
                                    <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <span className="text-[7px] font-bold leading-none text-center text-gray-500">{brand.name}</span>
                                )}
                            </div>
                            <span className="text-sm font-medium truncate">{brand.name}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="lg:col-span-5 bg-[#f8f9fa] p-6 rounded-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-6">{t('brand.title')}</h3>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-700 mb-2 font-medium">
                                <span>{t('brand.price')}</span>
                                <span className="font-bold text-gray-900">{price.min.toLocaleString()} ₽ - {price.max.toLocaleString()} ₽</span>
                            </div>

                            <div className="relative w-full h-6 flex items-center mb-2">
                                <div className="absolute w-full h-1.5 bg-gray-300 rounded-lg"></div>
                                <div className="absolute h-1.5 bg-red-600 rounded-lg" style={{ left: `${(price.min / maxPriceLimit) * 100}%`, right: `${100 - (price.max / maxPriceLimit) * 100}%` }}></div>
                                <input type="range" min="0" max={maxPriceLimit} step="10000" value={price.min} onChange={minChange} className="absolute w-full appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none z-20" />
                                <input type="range" min="0" max={maxPriceLimit} step="10000" value={price.max} onChange={maxPriceChange} className="absolute w-full appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none z-30" />
                            </div>

                            <div className="flex justify-between text-[10px] text-gray-400 px-1">
                                    {t('brand.priceScale', { returnObjects: true }).map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <select value={bodyType || ''} onChange={(e) => setBodyType && setBodyType(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 outline-none focus:border-red-600 cursor-pointer">
                                <option value="">{t('brand.emptyBody')}</option>
                                <option value="sedan">{t('brand.optionSedan')}</option>
                                <option value="suv">{t('brand.optionSuv')}</option>
                                <option value="hatchback">{t('brand.optionHatchback')}</option>
                            </select>

                            <select value={transmission || ''} onChange={(e) => setTransmission && setTransmission(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 outline-none focus:border-red-600 cursor-pointer">
                                <option value="">{t('brand.emptyTransmission')}</option>
                                <option value="auto">{t('brand.optionAuto')}</option>
                                <option value="manual">{t('brand.optionManual')}</option>
                                <option value="robot">{t('brand.optionRobot')}</option>
                            </select>
                        </div>
                    </div>

                    <button type="button" onClick={handleSubmit} className="w-full bg-[#cc0000] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm tracking-wide uppercase transition-colors cursor-pointer text-center">{t('brand.show')}</button>
                </div>
            </div>
        </div>
    );
};

export default Brand;