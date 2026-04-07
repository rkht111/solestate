export type AssetId = 'almaty' | 'astana' | 'shymkent';

export type AssetInfo = {
  id: AssetId;
  name: string;
  icon: string;
  tokenPriceUsd: number;
  aprPercent: number;
  treasuryEnvKey: string;
};

export const ASSETS: Record<AssetId, AssetInfo> = {
  almaty: {
    id: 'almaty',
    name: 'Офис в Алматы',
    icon: '🏢',
    tokenPriceUsd: 500,
    aprPercent: 12,
    treasuryEnvKey: 'NEXT_PUBLIC_ALMATY_TREASURY',
  },
  astana: {
    id: 'astana',
    name: 'Апартаменты в Астане',
    icon: '🏠',
    tokenPriceUsd: 120,
    aprPercent: 9,
    treasuryEnvKey: 'NEXT_PUBLIC_ASTANA_TREASURY',
  },
  shymkent: {
    id: 'shymkent',
    name: 'Магазин в Шымкенте',
    icon: '🏪',
    tokenPriceUsd: 85,
    aprPercent: 15,
    treasuryEnvKey: 'NEXT_PUBLIC_SHYMKENT_TREASURY',
  },
};

const STORAGE_KEY = 'solestate-holdings-v1';

export type Holdings = Record<AssetId, number>;

const EMPTY_HOLDINGS: Holdings = {
  almaty: 0,
  astana: 0,
  shymkent: 0,
};

export function getTreasuryAddress(assetId: AssetId): string {
  const key = ASSETS[assetId].treasuryEnvKey;
  return process.env[key] ?? '';
}

export function readHoldings(): Holdings {
  if (typeof window === 'undefined') {
    return { ...EMPTY_HOLDINGS };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_HOLDINGS };
    const parsed = JSON.parse(raw) as Partial<Holdings>;
    return {
      almaty: Number(parsed.almaty ?? 0),
      astana: Number(parsed.astana ?? 0),
      shymkent: Number(parsed.shymkent ?? 0),
    };
  } catch {
    return { ...EMPTY_HOLDINGS };
  }
}

export function addHolding(assetId: AssetId, amount: number): Holdings {
  const current = readHoldings();
  const next: Holdings = {
    ...current,
    [assetId]: Math.max(0, current[assetId] + amount),
  };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function calculatePortfolio(holdings: Holdings) {
  const positions = (Object.keys(ASSETS) as AssetId[]).map((assetId) => {
    const asset = ASSETS[assetId];
    const tokens = holdings[assetId];
    const valueUsd = tokens * asset.tokenPriceUsd;
    const monthlyYieldUsd = valueUsd * (asset.aprPercent / 100 / 12);
    return {
      ...asset,
      tokens,
      valueUsd,
      monthlyYieldUsd,
    };
  });

  const portfolioValueUsd = positions.reduce((sum, p) => sum + p.valueUsd, 0);
  const claimableUsd = positions.reduce((sum, p) => sum + p.monthlyYieldUsd, 0);

  return { positions, portfolioValueUsd, claimableUsd };
}
