import React, { useState } from 'react';
import auto from '../../../assets/150502082 1 1.png';

const Auto = () => {
  const [creditSum, setCreditSum] = useState(0);
  const [creditTerm, setCreditTerm] = useState(6);
  const [initialPayment, setInitialPayment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ creditSum, creditTerm, initialPayment });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-12 px-6 font-sans text-neutral-900 flex justify-center items-center">
      <div className="w-full max-w-[1300px] bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#EFEFEA]">
        
        {/* Заголовок */}
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-8">
          Заявка на автокредит
        </h1>

        {/* Верхняя плашка с селекторами */}
        <div className="bg-[#F3F3EF] p-3 rounded-2xl grid grid-cols-3 gap-3 mb-10 border border-[#EBEBE5]">
          <div className="relative">
            <select className="w-full bg-white border border-[#E5E5DF] rounded-xl py-3.5 px-4 text-neutral-800 appearance-none focus:outline-none cursor-pointer text-sm font-medium">
              <option>Марка</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
              ▼
            </div>
          </div>

          <div className="relative">
            <select className="w-full bg-white border border-[#E5E5DF] rounded-xl py-3.5 px-4 text-neutral-800 appearance-none focus:outline-none cursor-pointer text-sm font-medium">
              <option>Модель</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
              ▼
            </div>
          </div>

          <div className="relative">
            <select className="w-full bg-white border border-[#E5E5DF] rounded-xl py-3.5 px-4 text-neutral-800 appearance-none focus:outline-none cursor-pointer text-sm font-medium">
              <option>Комплектация</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Трехколоночная структура макета */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Левая колонка: Машина + бейджи */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="bg-[#F8F8F6] rounded-2xl p-6 flex items-center justify-center min-h-[220px] border border-[#EFEFEA]">
              <img 
                src={auto} 
                alt="Автомобиль под чехлом" 
                className="max-h-40 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#EBEBE5] rounded-xl py-2.5 px-4 text-center">
                <span className="block text-sm font-bold text-neutral-800">0</span>
                <span className="block text-[10px] text-neutral-500 uppercase mt-0.5">Первоначальный взнос</span>
              </div>
              <div className="bg-[#EBEBE5] rounded-xl py-2.5 px-4 text-center">
                <span className="block text-sm font-bold text-neutral-800">0</span>
                <span className="block text-[10px] text-neutral-500 uppercase mt-0.5">Остаток по кредиту</span>
              </div>
            </div>
          </div>

          {/* 2. Центральная колонка: Слайдеры и поле ввода */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 pt-2">
            
            {/* Сумма кредита */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-neutral-500 font-medium">Сумма кредита, руб</span>
                <span className="text-xl font-extrabold text-neutral-900">
                  {creditSum.toLocaleString('ru-RU')}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3000000" 
                step="50000"
                value={creditSum}
                onChange={(e) => setCreditSum(Number(e.target.value))}
                className="w-full accent-red-600 bg-neutral-200 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1.5 px-0.5">
                <span>0</span>
                <span>500т</span>
                <span>800т</span>
                <span>1,1м</span>
                <span>1,4м</span>
                <span>1,7м</span>
                <span>2м</span>
                <span>2,3м</span>
                <span>2,7м</span>
                <span>3м</span>
              </div>
            </div>

            {/* Срок кредита */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-neutral-500 font-medium">Срок кредита, мес.</span>
                <span className="text-xl font-extrabold text-neutral-900">
                  {creditTerm} мес.
                </span>
              </div>
              <input 
                type="range" 
                min="6" 
                max="84" 
                step="6"
                value={creditTerm}
                onChange={(e) => setCreditTerm(Number(e.target.value))}
                className="w-full accent-red-600 bg-neutral-200 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1.5 px-0.5">
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

            {/* Первоначальный взнос поле */}
            <div>
              <span className="block text-xs text-neutral-500 font-medium mb-1.5">Первоначальный взнос, руб</span>
              <input 
                type="text"
                value={initialPayment}
                onChange={(e) => setInitialPayment(e.target.value)}
                placeholder="0"
                className="w-full bg-[#F7F6F2] border border-[#E5E5DF] rounded-xl py-3 px-4 text-neutral-900 focus:outline-none focus:border-neutral-400 text-sm"
              />
            </div>

          </div>

          {/* 3. Правая колонка: Карточка выгоды и форма */}
          <div className="lg:col-span-4 bg-[#FAFAF8] p-7 rounded-3xl border border-[#EFEFEA] shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            
            <div className="mb-5">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider block mb-1">
                Получить выгоду
              </span>
              <div className="text-3xl font-extrabold text-[#D00000] tracking-tight">
                300 000 ₽
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <input 
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-white border border-[#E5E5DF] rounded-xl py-3 px-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 text-sm"
                  required
                />
              </div>

              <div>
                <input 
                  type="tel"
                  placeholder="Ваш телефон"
                  className="w-full bg-white border border-[#E5E5DF] rounded-xl py-3 px-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 text-sm"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#D00000] hover:bg-[#B80000] text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 shadow-[0_8px_20px_rgba(208,0,0,0.2)] text-xs tracking-wider uppercase"
              >
                ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
              </button>
            </form>

            <p className="text-[10px] text-neutral-400 mt-3.5 leading-relaxed text-center">
              Нажимая кнопку "Получить скидку" Вы даете согласие на обработку своих <a href="#" className="underline hover:text-neutral-600">персональных данных</a>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Auto;