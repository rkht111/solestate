'use client';

import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <main className="min-h-screen text-white" style={{background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1530 50%, #0a1628 100%)'}}>

      {/* Шапка */}
      <nav style={{borderBottom: '1px solid rgba(99,179,237,0.1)', backdropFilter: 'blur(10px)', background: 'rgba(10,15,30,0.8)'}} className="px-8 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛</span>
            <span className="text-2xl font-bold" style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>SolEstate</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition text-sm">Активы</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition text-sm">Портфель</Link>
            <WalletMultiButton />
          </div>
        </div>
      </nav>

      {/* Герой */}
      <div className="max-w-6xl mx-auto px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full mb-8" style={{background: 'rgba(99,179,237,0.1)', border: '1px solid rgba(99,179,237,0.2)', color: '#63b3ed'}}>
          ⚡ Работает на Solana Devnet
        </div>
       <h1 className="text-6xl font-bold mb-6 leading-tight" style={{color: 'white'}}>
  Инвестируй в недвижимость<br/>
          <span style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>от $50</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Покупай доли реальных объектов в виде токенов на Solana. Получай доход от аренды автоматически.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/asset" className="font-bold px-8 py-4 rounded-xl text-black" style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}>
            Начать инвестировать →
          </Link>
          <Link href="/dashboard" className="font-bold px-8 py-4 rounded-xl text-white" style={{border: '1px solid rgba(99,179,237,0.3)', background: 'rgba(99,179,237,0.05)'}}>
            Мой портфель
          </Link>
        </div>
      </div>

      {/* Статистика */}
      <div className="max-w-6xl mx-auto px-8 mb-16">
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 text-center" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.1)'}}>
            <div className="text-3xl font-bold" style={{color: '#63b3ed'}}>$2.4M</div>
            <div className="text-gray-400 mt-1 text-sm">Всего заблокировано (TVL)</div>
          </div>
          <div className="rounded-2xl p-6 text-center" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.1)'}}>
            <div className="text-3xl font-bold" style={{color: '#63b3ed'}}>3</div>
            <div className="text-gray-400 mt-1 text-sm">Активных объекта</div>
          </div>
          <div className="rounded-2xl p-6 text-center" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.1)'}}>
            <div className="text-3xl font-bold" style={{color: '#63b3ed'}}>847</div>
            <div className="text-gray-400 mt-1 text-sm">Инвесторов</div>
          </div>
        </div>
      </div>

      {/* Карточки */}
      <div className="max-w-6xl mx-auto px-8 pb-20">
        <h2 className="text-2xl font-bold mb-6">Доступные объекты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Карточка 1 */}
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.1)'}}>
            <div className="text-3xl mb-3">🏢</div>
            <div className="inline-block text-xs px-3 py-1 rounded-full mb-3" style={{background: 'rgba(99,179,237,0.1)', color: '#63b3ed'}}>Коммерческая</div>
            <h3 className="text-xl font-bold">Офис в Алматы</h3>
            <p className="text-gray-400 text-sm mt-1">Бизнес-центр, 450 м²</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg" style={{color: '#63b3ed'}}>12% годовых</span>
              <span className="text-gray-300 font-bold">$500,000</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>847/1000 токенов</span>
                <span>84.7%</span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{background: 'rgba(255,255,255,0.1)'}}>
                <div className="h-1.5 rounded-full" style={{width: '84.7%', background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}></div>
              </div>
            </div>
            <Link href="/asset-almaty" className="mt-5 block w-full font-bold py-3 rounded-xl text-center text-black" style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}>
              Купить долю
            </Link>
          </div>

          {/* Карточка 2 */}
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.1)'}}>
            <div className="text-3xl mb-3">🏠</div>
            <div className="inline-block text-xs px-3 py-1 rounded-full mb-3" style={{background: 'rgba(159,122,234,0.1)', color: '#9f7aea'}}>Жилая</div>
            <h3 className="text-xl font-bold">Апартаменты в Астане</h3>
            <p className="text-gray-400 text-sm mt-1">ЖК Нурлы Жол, 85 м²</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg" style={{color: '#63b3ed'}}>9% годовых</span>
              <span className="text-gray-300 font-bold">$120,000</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>340/1000 токенов</span>
                <span>34%</span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{background: 'rgba(255,255,255,0.1)'}}>
                <div className="h-1.5 rounded-full" style={{width: '34%', background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}></div>
              </div>
            </div>
            <Link href="/asset-astana" className="mt-5 block w-full font-bold py-3 rounded-xl text-center text-black" style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}>
              Купить долю
            </Link>
          </div>

          {/* Карточка 3 */}
          <div className="rounded-2xl p-6" style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,179,237,0.1)'}}>
            <div className="text-3xl mb-3">🏪</div>
            <div className="inline-block text-xs px-3 py-1 rounded-full mb-3" style={{background: 'rgba(246,173,85,0.1)', color: '#f6ad55'}}>Торговая</div>
            <h3 className="text-xl font-bold">Магазин в Шымкенте</h3>
            <p className="text-gray-400 text-sm mt-1">Торговая площадь, 120 м²</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg" style={{color: '#63b3ed'}}>15% годовых</span>
              <span className="text-gray-300 font-bold">$85,000</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>120/1000 токенов</span>
                <span>12%</span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{background: 'rgba(255,255,255,0.1)'}}>
                <div className="h-1.5 rounded-full" style={{width: '12%', background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}></div>
              </div>
            </div>
            <Link href="/asset-shymkent" className="mt-5 block w-full font-bold py-3 rounded-xl text-center text-black" style={{background: 'linear-gradient(90deg, #63b3ed, #76e4f7)'}}>
              Купить долю
            </Link>
          </div>

        </div>
      </div>

    </main>
  );
}