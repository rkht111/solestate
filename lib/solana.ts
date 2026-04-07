import type { WalletContextState } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';

import type { AssetId } from './portfolio';

const COMMITMENT = 'confirmed';
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
const DEMO_FLAG = process.env.NEXT_PUBLIC_DEMO_MODE;
export const DEMO_MODE_ENABLED = DEMO_FLAG ? DEMO_FLAG === 'true' : true;

let cachedConnection: Connection | null = null;

function getConnection() {
  if (!cachedConnection) {
    cachedConnection = new Connection(clusterApiUrl('devnet'), COMMITMENT);
  }
  return cachedConnection;
}

function assertWalletReady(wallet: WalletContextState) {
  if (!wallet.publicKey || !wallet.sendTransaction) {
    throw new Error('Подключите кошелек, чтобы отправить транзакцию.');
  }
}

function usdToLamports(usd: number) {
  const solUsdRate = Number(process.env.NEXT_PUBLIC_SOL_USD_RATE ?? 140);
  if (!Number.isFinite(solUsdRate) || solUsdRate <= 0) {
    throw new Error('NEXT_PUBLIC_SOL_USD_RATE должен быть положительным числом.');
  }
  return Math.ceil((usd / solUsdRate) * LAMPORTS_PER_SOL);
}

export async function sendBuyTransaction(params: {
  wallet: WalletContextState;
  recipientAddress: string;
  assetId: AssetId;
  tokenAmount: number;
  totalUsd: number;
}) {
  const { wallet, recipientAddress, assetId, tokenAmount, totalUsd } = params;
  if (DEMO_MODE_ENABLED) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return `DEMO_BUY_${assetId}_${tokenAmount}_${Math.floor(totalUsd)}_${Date.now().toString(36)}`;
  }

  assertWalletReady(wallet);

  const recipient = new PublicKey(recipientAddress);
  const lamports = usdToLamports(totalUsd);
  const connection = getConnection();

  const memoPayload = {
    app: 'SolEstate',
    action: 'buy',
    assetId,
    tokenAmount,
    totalUsd,
    ts: Date.now(),
  };

  const memoIx = new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    keys: [],
    data: Buffer.from(JSON.stringify(memoPayload), 'utf-8'),
  });

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey!,
      toPubkey: recipient,
      lamports,
    }),
    memoIx,
  );

  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, COMMITMENT);
  return signature;
}

export async function sendClaimRequestTransaction(params: {
  wallet: WalletContextState;
  claimableUsd: number;
}) {
  const { wallet, claimableUsd } = params;
  if (DEMO_MODE_ENABLED) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return `DEMO_CLAIM_${Math.floor(claimableUsd * 100)}_${Date.now().toString(36)}`;
  }

  assertWalletReady(wallet);
  const connection = getConnection();

  const memoPayload = {
    app: 'SolEstate',
    action: 'claim_yield_request',
    claimableUsd,
    wallet: wallet.publicKey!.toBase58(),
    ts: Date.now(),
  };

  const memoIx = new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    keys: [],
    data: Buffer.from(JSON.stringify(memoPayload), 'utf-8'),
  });

  const tx = new Transaction().add(memoIx);
  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature, COMMITMENT);
  return signature;
}
