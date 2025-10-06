'use client';

import PaddleLoader from '@/components/PaddleLoader';

// 替換為你在 Paddle Catalog 建立的 Price ID
// 格式：pri_ 開頭 + 27 位小寫英數字
const PRICE_ID = 'pri_01abc2def3ghi4jkl5mno6pqr7s';

export default function Page() {
  const onBuy = () => {
    const Paddle = (window as any).Paddle;
    if (!Paddle?.Checkout?.open) {
      console.error('Paddle v2 尚未載入');
      return;
    }
    Paddle.Checkout.open({
      items: [{ priceId: PRICE_ID }],
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-10">
      <PaddleLoader />
      <h1 className="text-3xl font-bold">Next.js + Paddle v2（Sandbox）</h1>
      <button
        onClick={onBuy}
        aria-label="Buy my product"
        className="px-6 py-3 rounded bg-green-600 text-white hover:bg-green-700"
      >
        Buy my product
      </button>
    </main>
  );
}

