'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

export default function AssetPage() {
  const { connected } = useWallet();

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

        {/* Информация об активе */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="text-4xl mb-4">🏢</div>
          <h1 className="text-3xl font-bold">Офис в Алматы</h1>
          <p className="text-gray-400 mt-2">Бизнес-центр, 450 м² • Алматы, Казахстан</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-green-400 text-2xl font-bold">12%</div>
              <div className="text-gray-400 text-sm mt-1">Годовых</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-white text-2xl font-bold">$500</div>
              <div className="text-gray-400 text-sm mt-1">За токен</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-white text-2xl font-bold">847/1000</div>
              <div className="text-gray-400 text-sm mt-1">Продано</div>
            </div>
          </div>

          {/* Proof of Asset */}
          <div className="mt-6 bg-gray-800 rounded-xl p-4">
            <div className="text-sm text-gray-400">Proof-of-Asset хэш (Solana)</div>
            <div className="text-green-400 text-xs mt-1 font-mono break-all">
              7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
            </div>
          </div>

          {/* Покупка */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Купить токены</h2>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                min="1"
                max="153"
                defaultValue="1"
                className="bg-gray-800 text-white rounded-xl px-4 py-3 w-32 text-center text-xl border border-gray-700"
              />
              <div className="text-gray-400">× $500 = <span className="text-white font-bold">$500</span></div>
            </div>

            {connected ? (
              <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl text-lg">
                Купить токены на Solana
              </button>
            ) : (
              <div className="mt-6 text-center text-gray-400">
                Подключите кошелёк чтобы купить токены
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}