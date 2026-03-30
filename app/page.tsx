'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Шапка */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-green-400">SolEstate</h1>
            <p className="text-gray-400 mt-2">
              Фракционное владение недвижимостью на Solana
            </p>
          </div>
          <WalletMultiButton />
        </div>

        {/* Карточки активов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="text-2xl mb-2">🏢</div>
            <h2 className="text-xl font-bold">Офис в Алматы</h2>
            <p className="text-gray-400 text-sm mt-1">Бизнес-центр, 450 м²</p>
            <div className="mt-4 flex justify-between">
              <span className="text-green-400 font-bold">12% годовых</span>
              <span className="text-gray-400">$500,000</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">847/1000 токенов продано</div>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-xl">
              Купить долю
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="text-2xl mb-2">🏠</div>
            <h2 className="text-xl font-bold">Апартаменты в Астане</h2>
            <p className="text-gray-400 text-sm mt-1">ЖК Нурлы Жол, 85 м²</p>
            <div className="mt-4 flex justify-between">
              <span className="text-green-400 font-bold">9% годовых</span>
              <span className="text-gray-400">$120,000</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">340/1000 токенов продано</div>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-xl">
              Купить долю
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="text-2xl mb-2">🏪</div>
            <h2 className="text-xl font-bold">Магазин в Шымкенте</h2>
            <p className="text-gray-400 text-sm mt-1">Торговая площадь, 120 м²</p>
            <div className="mt-4 flex justify-between">
              <span className="text-green-400 font-bold">15% годовых</span>
              <span className="text-gray-400">$85,000</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">120/1000 токенов продано</div>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-xl">
              Купить долю
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}