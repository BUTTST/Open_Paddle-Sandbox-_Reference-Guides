'use client';

import Script from 'next/script';

export default function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => {
        // v2：使用 Client-side Token 初始化（沙盒環境）
        // 從 Paddle Dashboard → Developer Tools → Authentication 取得你的 Client-side Token
        // 格式：test_ 開頭（Sandbox）或 live_ 開頭（Production）+ 28 位小寫英數字
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o';
        
        // 設定為沙盒環境（測試用）
        (window as any).Paddle?.Environment?.set('sandbox');
        
        // 初始化 Paddle（注意：v2 使用 token，不是 clientToken）
        (window as any).Paddle?.Initialize?.({ token });
      }}
    />
  );
}

