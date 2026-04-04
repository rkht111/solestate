'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AssetShymkent() {
  const { connected } = useWallet();
  const [amount, setAmount] = useState(1);

  return (
    <main className="min-h-screen text-white" style={{background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1530 50%, #0a1628 100%)'}}>

      <nav style={{borderBottom: '1px solid rgba(246,173,85,0.1)', background: 'rgba(10,15,30,0.8)'}} className="px-8 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
  🏛 SolEstate
</Link>
<div className="flex items-center gap-6">
  <Link href="/" className="text-gray-400 hover:text-white transition text-sm">Активы</Link>
  <Link href="/dashboard" className="text-gray-400 hover:text-white transition text-sm">Портфель</Link>
</div>
          <WalletMultiButton />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">

        <div className="rounded-2xl p-8 mb-6" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(246,173,85,0.15)'}}>
          <div className="text-5xl mb-4">🏪</div>
          <div className="inline-block text-xs px-3 py-1 rounded-full mb-4" style={{background: 'rgba(246,173,85,0.1)', color: '#f6ad55'}}>Торговая</div>
          <h1 className="text-4xl font-bold mb-2">Магазин в Шымкенте</h1>
          <p className="text-gray-400">Торговая площадь, 120 м² • Шымкент, Казахстан</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(246,173,85,0.05)', border: '1px solid rgba(246,173,85,0.1)'}}>
              <div className="text-2xl font-bold" style={{color: '#f6ad55'}}>15%</div>
              <div className="text-gray-400 text-sm mt-1">Годовых</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(246,173,85,0.05)', border: '1px solid rgba(246,173,85,0.1)'}}>
              <div className="text-2xl font-bold text-white">$85</div>
              <div className="text-gray-400 text-sm mt-1">За токен</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(246,173,85,0.05)', border: '1px solid rgba(246,173,85,0.1)'}}>
              <div className="text-2xl font-bold text-white">880</div>
              <div className="text-gray-400 text-sm mt-1">Доступно</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>120/1000 токенов продано</span>
              <span>12%</span>
            </div>
            <div className="w-full rounded-full h-2" style={{background: 'rgba(255,255,255,0.1)'}}>
              <div className="h-2 rounded-full" style={{width: '12%', background: 'linear-gradient(90deg, #f6ad55, #fbd38d)'}}></div>
            </div>
          </div>

          <div className="mt-6 rounded-xl p-4" style={{background: 'rgba(246,173,85,0.05)', border: '1px solid rgba(246,173,85,0.1)'}}>
            <div className="text-xs text-gray-400">Proof-of-Asset хэш (Solana)</div>
            <div className="text-xs mt-1 font-mono" style={{color: '#f6ad55'}}>9pQwRt4CW87d97TXJSDpbD5jBkheTqA83TZRuJosgCvX</div>
          </div>
        </div>

        <div className="rounded-2xl p-8" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(246,173,85,0.15)'}}>
          <h2 className="text-2xl font-bold mb-6">Купить токены</h2>
          <div className="flex gap-4 items-center mb-4">
            <input
              type="number"
              min="1"
              max="880"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-white rounded-xl px-4 py-3 w-32 text-center text-xl border"
              style={{background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(246,173,85,0.3)'}}
            />
            <div className="text-gray-400">
              × $85 = <span className="text-white font-bold text-xl">${(amount * 85).toLocaleString()}</span>
            </div>
          </div>

          {connected ? (
            <button className="w-full font-bold py-4 rounded-xl text-lg text-black mt-4" style={{background: 'linear-gradient(90deg, #f6ad55, #fbd38d)'}}>
              Купить {amount} токен(а) на Solana
            </button>
          ) : (
            <div className="mt-4 text-center py-4 rounded-xl" style={{background: 'rgba(246,173,85,0.05)', border: '1px solid rgba(246,173,85,0.1)'}}>
              <p className="text-gray-400">Подключите кошелёк чтобы купить токены</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}