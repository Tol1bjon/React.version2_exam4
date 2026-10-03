import React, { useState } from 'react';
import img1 from "../../assets/Group (3).png";
import img2 from "../../assets/Group (4).png";
import img3 from "../../assets/Group (5).png";
import img4 from "../../assets/Frame (2).png";
import car from '../../assets/14-1-1-_600-370 2.png';

const Section1CreditInfo = () => {
    const [loanTerm, setLoanTerm] = useState(36);
    const [tradeInActive, setTradeInActive] = useState(true);

    return (
        <section className="mx-auto w-full max-w-[1200px] px-4 py-8 font-sans text-neutral-900">
            {/* Заголовок и преимущества программы */}
            <div className="mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
                    Преимущества программы
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 items-center border-b border-[#EFEFEA] pb-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 flex items-center justify-center mb-2">
                            <img src={img1} alt="Первоначальный взнос" className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="text-sm font-bold text-neutral-900">от 0%</span>
                        <span className="text-xs text-neutral-500 mt-0.5">Первоначальный взнос</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 flex items-center justify-center mb-2">
                            <img src={img2} alt="Ответ кредитных специалистов" className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="text-sm font-bold text-neutral-900">30 минут</span>
                        <span className="text-xs text-neutral-500 mt-0.5">Ответ кредитных специалистов</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 flex items-center justify-center mb-2">
                            <img src={img3} alt="Ставка по кредиту" className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="text-sm font-bold text-neutral-900">от 1,9%</span>
                        <span className="text-xs text-neutral-500 mt-0.5">Ставка по кредиту</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 flex items-center justify-center mb-2">
                            <img src={img4} alt="Одобрение кредита" className="max-h-full max-w-full object-contain" />
                        </div>
                        <span className="text-sm font-bold text-neutral-900">98%</span>
                        <span className="text-xs text-neutral-500 mt-0.5">Одобрение кредита</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Шаг 1: Ваш будущий автомобиль */}
                <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-[#EBEBE5] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                    <div className="absolute -left-3.5 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-[#E30613] text-xs font-bold text-white shadow-md">
                        1
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                <h3 className="text-xl font-extrabold text-[#1A1A1A]">Ваш будущий автомобиль</h3>
                                <span className="text-xs sm:text-sm font-semibold text-neutral-600">Kia Comfort 1.4 100 л.с. 6MT 2WD (2020)</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400">
                                        <option>Марка</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">▼</div>
                                </div>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400">
                                        <option>Модель</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">▼</div>
                                </div>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400">
                                        <option>Комплектация</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">▼</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-6 lg:w-[45%] justify-end">
                            <div className="max-w-[220px] w-full">
                                <img src={car} alt="Kia Comfort" className="w-full h-auto object-contain" />
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <span className="text-xs text-neutral-400">Цена со скидками</span>
                                <span className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A]">2 200 000 ₽</span>
                                <span className="text-xs text-neutral-400 line-through mt-0.5">2 500 000 ₽</span>
                                <div className="mt-2 inline-flex items-center rounded-xl bg-[#E30613] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                                    Платеж 70 000 ₽/мес.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Шаг 2: Купить в кредит */}
                <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-[#EBEBE5] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                    <div className="absolute -left-3.5 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-[#E30613] text-xs font-bold text-white shadow-md">
                        2
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="flex-1">
                            <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-6">Купить в кредит</h3>
                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-neutral-500 mb-2">
                                    <span>Срок кредита, месяцев</span>
                                    <span className="font-bold text-neutral-900">{loanTerm} мес.</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="6" 
                                    max="84" 
                                    step="6"
                                    value={loanTerm} 
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                    className="w-full accent-[#E30613] cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                                    <span>6</span>
                                    <span>12</span>
                                    <span>24</span>
                                    <span>36</span>
                                    <span>48</span>
                                    <span>60</span>
                                    <span>72</span>
                                    <span>84</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs text-neutral-500 block mb-3">Выберите банк</span>
                                <div className="flex flex-wrap gap-2">
                                    {['СБЕРБАНК', 'ВТБ', 'Альфа-Банк', 'СБЕРБАНК', 'ВТБ', 'Альфа-Банк', 'СБЕРБАНК'].map((bank, i) => (
                                        <button key={i} className="rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-2 text-xs font-semibold text-neutral-700 hover:border-neutral-400 transition-colors">
                                            {bank}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[35%] flex flex-col justify-center space-y-4">
                            <label className="flex items-center gap-3 text-xs text-neutral-700 cursor-pointer">
                                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-neutral-300 accent-[#E30613]" />
                                <span>Скидка 70 000 ₽</span>
                            </label>
                            <label className="flex items-center gap-3 text-xs text-neutral-700 cursor-pointer">
                                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-neutral-300 accent-[#E30613]" />
                                <span>Акция "Выгодный кредит"<br />Скидка 38 000 ₽</span>
                            </label>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Первоначальный взнос" 
                                    className="w-full rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Шаг 3: Программа Trade-in */}
                {tradeInActive && (
                    <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-[#EBEBE5] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                        <div className="absolute -left-3.5 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-[#E30613] text-xs font-bold text-white shadow-md">
                            3
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-extrabold text-[#1A1A1A]">Программа Trade-in</h3>
                                <button 
                                    onClick={() => setTradeInActive(false)}
                                    className="rounded-lg bg-[#E30613] px-3 py-1 text-xs font-bold text-white transition-opacity hover:opacity-90"
                                >
                                    УБРАТЬ
                                </button>
                            </div>
                            <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-neutral-300 accent-[#E30613]" />
                                <span>Скидка 120 000 ₽</span>
                            </label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {['Марка', 'Модель', 'Год выпуска', 'Коробка передач', 'Комплектация'].map((placeholder, i) => (
                                <div key={i} className="relative">
                                    <select className="w-full appearance-none rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400">
                                        <option>{placeholder}</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">▼</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Шаг 4: Персональные данные */}
                <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-[#EBEBE5] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                    <div className="absolute -left-3.5 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-[#E30613] text-xs font-bold text-white shadow-md">
                        4
                    </div>
                    <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-6">Персональные данные</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Ваше имя" 
                                className="w-full rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400"
                            />
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Номер телефона" 
                                    className="w-full rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400"
                                />
                            </div>
                            <p className="text-[11px] text-neutral-400 leading-relaxed">
                                Нажимая кнопку "Получить лучшие условия" Вы даете согласие на обработку своих <a href="#" className="underline">персональных данных</a>.
                            </p>
                        </div>
                        <div className="space-y-4 flex flex-col justify-between">
                            <div className="relative">
                                <select className="w-full appearance-none rounded-xl border border-[#E4E4DF] bg-[#FAFAF8] px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-400">
                                    <option>Выберите подарок</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">▼</div>
                            </div>
                            <button className="w-full rounded-2xl bg-[#E30613] py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(227,6,19,0.3)] transition-all hover:bg-red-700">
                                ПОЛУЧИТЬ ЛУЧШИЕ УСЛОВИЯ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section1CreditInfo;