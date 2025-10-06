export const metadata = {
  title: 'Paddle v2 Demo',
  description: 'Next.js + Paddle Billing v2 整合示範',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}

