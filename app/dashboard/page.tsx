'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { calculatePortfolio, readHoldings } from '@/lib/portfolio';
import { DEMO_MODE_ENABLED, sendClaimRequestTransaction } from '@/lib/solana';

export default function Dashboard() {
  const wallet = useWallet();
  const { connected, publicKey } = wallet;
  const [isClaiming, setIsClaiming] = useState(false);
  const [status, setStatus] = useState('');

  const portfolio = useMemo(() => {
    const holdings = readHoldings();
    return calculatePortfolio(holdings);
  }, []);

  const handleClaim = async () => {
    if (!connected) return;
    if (portfolio.claimableUsd <= 0) {
      setStatus('Нет доступного дохода для claim.');
      return;
    }

    try {
      setIsClaiming(true);
      setStatus(DEMO_MODE_ENABLED ? 'Demo mode: имитируем claim...' : 'Отправляем claim-запрос в Solana Devnet...');
      const signature = await sendClaimRequestTransaction({
        wallet,
        claimableUsd: portfolio.claimableUsd,
      });
      setStatus(`${DEMO_MODE_ENABLED ? 'Demo mode' : 'Claim-запрос отправлен'}. Tx: ${signature.slice(0, 8)}...`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось отправить claim';
      setStatus(message);
    } finally {
      setIsClaiming(false);
    }
  };

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
                <div className="text-3xl font-bold text-white mt-2">
                  ${portfolio.portfolioValueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <div className="text-gray-400 text-sm">Доступно к получению</div>
                <div className="text-3xl font-bold text-green-400 mt-2">
                  ${portfolio.claimableUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Мои активы */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
              <h2 className="text-xl font-bold mb-4">Мои активы</h2>

              {portfolio.positions.map((position, index) => (
                <div
                  key={position.id}
                  className={`flex justify-between items-center py-4 ${index < portfolio.positions.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <div>
                    <div className="font-bold">{position.icon} {position.name}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {position.tokens} токен(ов) • {(position.tokens / 10).toFixed(1)}% владения
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`${position.valueUsd > 0 ? 'text-white' : 'text-gray-500'} font-bold`}>
                      ${position.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-green-400 text-sm">+{position.aprPercent}% годовых</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Claim yield */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-2">Получить доход</h2>
              {DEMO_MODE_ENABLED && (
                <p className="text-xs mb-3 text-yellow-300">Demo mode включен: claim проходит без Devnet SOL.</p>
              )}
              <p className="text-gray-400 text-sm mb-6">
                Доход начисляется пропорционально вашим токенам на Solana
              </p>
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl text-lg disabled:opacity-60"
              >
                {isClaiming
                  ? 'Подтверждение...'
                  : `Получить $${portfolio.claimableUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })} USDC`}
              </button>
              <p className="text-sm text-gray-400 mt-3 break-all">{status}</p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}