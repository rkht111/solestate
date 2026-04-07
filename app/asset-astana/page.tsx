'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { addHolding, getTreasuryAddress } from '@/lib/portfolio';
import { DEMO_MODE_ENABLED, sendBuyTransaction } from '@/lib/solana';

export default function AssetAstana() {
  const wallet = useWallet();
  const { connected } = wallet;
  const MAX_TOKENS = 660;
  const [amount, setAmount] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const [status, setStatus] = useState('');
  const treasuryAddress = useMemo(() => getTreasuryAddress('astana'), []);
  const totalUsd = amount * 120;

  const handleAmountChange = (value: string) => {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      setAmount(1);
      return;
    }
    setAmount(Math.min(Math.max(parsed, 1), MAX_TOKENS));
  };

  const handleBuy = async () => {
    if (!connected) return;
    if (!DEMO_MODE_ENABLED && !treasuryAddress) {
      setStatus('Укажите NEXT_PUBLIC_ASTANA_TREASURY в .env.local');
      return;
    }

    try {
      setIsBuying(true);
      setStatus(DEMO_MODE_ENABLED ? 'Demo mode: имитируем покупку...' : 'Отправляем транзакцию в Solana Devnet...');
      const signature = await sendBuyTransaction({
        wallet,
        recipientAddress: treasuryAddress,
        assetId: 'astana',
        tokenAmount: amount,
        totalUsd,
      });
      addHolding('astana', amount);
      setStatus(`${DEMO_MODE_ENABLED ? 'Demo mode' : 'Покупка подтверждена'}. Tx: ${signature.slice(0, 8)}...`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось выполнить покупку';
      setStatus(message);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <main className="min-h-screen text-white" style={{background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1530 50%, #0a1628 100%)'}}>

      <nav style={{borderBottom: '1px solid rgba(99,179,237,0.1)', background: 'rgba(10,15,30,0.8)'}} className="px-8 py-4">
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

        <div className="rounded-2xl p-8 mb-6" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(159,122,234,0.15)'}}>
          <div className="text-5xl mb-4">🏠</div>
          <div className="inline-block text-xs px-3 py-1 rounded-full mb-4" style={{background: 'rgba(159,122,234,0.1)', color: '#9f7aea'}}>Жилая</div>
          <h1 className="text-4xl font-bold mb-2">Апартаменты в Астане</h1>
          <p className="text-gray-400">ЖК Нурлы Жол, 85 м² • Астана, Казахстан</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(159,122,234,0.05)', border: '1px solid rgba(159,122,234,0.1)'}}>
              <div className="text-2xl font-bold" style={{color: '#9f7aea'}}>9%</div>
              <div className="text-gray-400 text-sm mt-1">Годовых</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(159,122,234,0.05)', border: '1px solid rgba(159,122,234,0.1)'}}>
              <div className="text-2xl font-bold text-white">$120</div>
              <div className="text-gray-400 text-sm mt-1">За токен</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{background: 'rgba(159,122,234,0.05)', border: '1px solid rgba(159,122,234,0.1)'}}>
              <div className="text-2xl font-bold text-white">660</div>
              <div className="text-gray-400 text-sm mt-1">Доступно</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>340/1000 токенов продано</span>
              <span>34%</span>
            </div>
            <div className="w-full rounded-full h-2" style={{background: 'rgba(255,255,255,0.1)'}}>
              <div className="h-2 rounded-full" style={{width: '34%', background: 'linear-gradient(90deg, #9f7aea, #b794f4)'}}></div>
            </div>
          </div>

          <div className="mt-6 rounded-xl p-4" style={{background: 'rgba(159,122,234,0.05)', border: '1px solid rgba(159,122,234,0.1)'}}>
            <div className="text-xs text-gray-400">Proof-of-Asset хэш (Solana)</div>
            <div className="text-xs mt-1 font-mono" style={{color: '#9f7aea'}}>3mNvkQp8YWx5TZJSDpbD5jBkheTqA83TZRuJosgBstN</div>
          </div>
        </div>

        <div className="rounded-2xl p-8" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(159,122,234,0.15)'}}>
          <h2 className="text-2xl font-bold mb-6">Купить токены</h2>
          {DEMO_MODE_ENABLED && (
            <p className="text-xs mb-4 text-yellow-300">Demo mode включен: покупка проходит без Devnet SOL.</p>
          )}
          <div className="flex gap-4 items-center mb-4">
            <input
              type="number"
              min="1"
              max={MAX_TOKENS}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="text-white rounded-xl px-4 py-3 w-32 text-center text-xl border"
              style={{background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(159,122,234,0.3)'}}
            />
            <div className="text-gray-400">
              × $120 = <span className="text-white font-bold text-xl">${totalUsd.toLocaleString()}</span>
            </div>
          </div>

          {connected ? (
            <>
              <button
                onClick={handleBuy}
                disabled={isBuying}
                className="w-full font-bold py-4 rounded-xl text-lg text-white mt-4 disabled:opacity-60"
                style={{background: 'linear-gradient(90deg, #9f7aea, #b794f4)'}}
              >
                {isBuying ? 'Подтверждение...' : `Купить ${amount} токен(а) на Solana`}
              </button>
              <p className="text-sm text-gray-400 mt-3 break-all">{status}</p>
            </>
          ) : (
            <div className="mt-4 text-center py-4 rounded-xl" style={{background: 'rgba(159,122,234,0.05)', border: '1px solid rgba(159,122,234,0.1)'}}>
              <p className="text-gray-400">Подключите кошелёк чтобы купить токены</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}