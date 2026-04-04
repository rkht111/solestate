'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

export default function Dashboard() {
  const { connected, publicKey } = useWallet();

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto">

        {/* Шапка */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="text-green-400 text-2xl font-bold">
            ← SolEstate
          </Link>
          <WalletMultiButton />
        </div>

        <h1 className="text-3xl font-bold mb-8">Мой портфель</h1>

        {!connected ? (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
            <div className="text-4xl mb-4">👛</div>
            <p className="text-gray-400">Подключите кошелёк чтобы увидеть портфель</p>
          </div>
        ) : (
          <div>
            {/* Адрес кошелька */}
            <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-6">
              <div className="text-gray-400 text-sm">Ваш кошелёк</div>
              <div className="text-green-400 font-mono text-sm mt-1">
                {publicKey?.toString()}
              </div>
            </div>

            {/* Итого */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="text-gray-400 text-sm">Стоимость портфеля</div>
                <div className="text-3xl font-bold text-white mt-2">$1,500</div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="text-gray-400 text-sm">Доступно к получению</div>
                <div className="text-3xl font-bold text-green-400 mt-2">$45.00</div>
              </div>
            </div>

            {/* Мои активы */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
              <h2 className="text-xl font-bold mb-4">Мои активы</h2>

              <div className="flex justify-between items-center py-4 border-b border-gray-800">
                <div>
                  <div className="font-bold">🏢 Офис в Алматы</div>
                  <div className="text-gray-400 text-sm mt-1">3 токена • 0.3% владения</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">$1,500</div>
                  <div className="text-green-400 text-sm">+12% годовых</div>
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <div>
                  <div className="font-bold">🏠 Апартаменты в Астане</div>
                  <div className="text-gray-400 text-sm mt-1">0 токенов</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 font-bold">$0</div>
                </div>
              </div>
            </div>

            {/* Claim yield */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-2">Получить доход</h2>
              <p className="text-gray-400 text-sm mb-6">
                Доход начисляется пропорционально вашим токенам на Solana
              </p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl text-lg">
                Получить $45.00 USDC
              </button>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}