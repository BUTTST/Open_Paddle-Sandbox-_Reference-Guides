# Open Paddle Reference Guides

> 🚀 使用 Next.js + Paddle Billing v2 快速建立金流系統的完整參考指南與起始專案模板

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org/)
[![Paddle](https://img.shields.io/badge/Paddle-Billing_v2-blue)](https://www.paddle.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

---

## ⚠️ 重要免責聲明

**本專案的所有說明文檔（README 以及 docs/01-05）皆由 AI 產生，  
容易有偏差或錯誤，使用者需自行判斷並驗證內容正確性。**

### 文檔審核狀態說明：
- **01-Paddle完整設定指南** 與 **02-本地沙盒實作指南**：有重點審閱過，準確性相對較高
- **03-沙盒轉生產環境指南**、**04-常見問題與除錯** 與 **05-Webhook事件處理指南**：全文由 AI 生成，無人工檢查，建議謹慎參考

---

## 📢 關於本專案

本專案於 **2025-09-30** 完成實測，並在 **2025-10-5** 撰寫完成此範例說明：

- 將所有「產品與平台參數的建立與取得」整合為一份一站式圖文指南：[01-Paddle完整設定指南](./docs/01-Paddle完整設定指南.md)
- 新增一份「本地 Sandbox 實作」專用指南：[02-本地沙盒實作指南](./docs/02-本地沙盒實作指南.md)

### 初心與用意

實際整合 Paddle 金流時，我們面臨：
- 官方資訊分散、跨頁查找成本高
- 中文素材不足，缺少符合最新介面的圖文說明
- 缺少從「參數建立 → 本地運行 → 對外測試」的完整流程

因此本專案將「產出與取得必要參數」與「本地實作」清楚拆分、互相連結，讓你一步一步完成：
- 在 01 取得所有必要參數（含截圖與欄位說明）
- 在 02 按步驟修改程式與環境變數、啟動與測試

---

## ✨ 特色功能

- ✅ 一站式圖文指南（01）：涵蓋產品/價格建立、身分參數、API 金鑰取得
- ✅ 本地運行指南（02）：清楚告訴你要改哪些檔案、調哪些參數、如何對外測試
- ✅ 最新 Paddle v2：依照最新 Dashboard 介面撰寫與截圖
- ✅ 雙環境思維：Sandbox/Production 差異與切換提醒
- ✅ 參數脫敏：專案內僅有模擬值與占位符，避免洩漏
- ✅ 可直接跑：提供可運行的 Next.js + Paddle v2 範例頁面

---

## 📋 前置需求

在開始之前，請確保你已經：

- ✅ Node.js **18.x 或更高版本**
- ✅ npm 或 yarn 套件管理器
- ✅ Paddle 帳號（[免費註冊](https://www.paddle.com/)）
- ✅ 基礎的 Next.js 與 React 知識

---

## 🚀 快速開始

### 第 1 步：複製專案

```bash
git clone https://github.com/BUTTST/Open_Paddle-Sandbox-_Reference-Guides.git
cd Open_Paddle-Sandbox-_Reference-Guides
```

### 第 2 步：安裝依賴

```bash
npm install
# 或
yarn install
```

### 第 3 步：設定環境變數（務必先完成 01）

1. 複製環境變數範例檔案：

```bash
# Windows PowerShell
Copy-Item env.example .env.local

# macOS / Linux
cp env.example .env.local
```

2. 或者，將專案內的 `本地.env.local`/`本地.env` 改名為 `.env.local`/`.env` 後再編輯（皆為模擬值）

3. 編輯 `.env.local`，填入 01 指南中你取得的參數：

```env
NEXT_PUBLIC_PADDLE_ENV=sandbox
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_你的SandboxToken
NEXT_PUBLIC_PADDLE_PRICE_ID=pri_你的SandboxPriceId
```

> 💡 參數取得位置：請依 [01-Paddle完整設定指南](./docs/01-Paddle完整設定指南.md) 操作；若需本地運行細節，請見 [02-本地沙盒實作指南](./docs/02-本地沙盒實作指南.md)

### 第 4 步：啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 第 5 步：測試結帳

點擊頁面上的「**Buy my product**」按鈕，使用 Paddle 測試卡號：

| 項目 | 測試數值 |
|------|---------|
| **卡號** | `4242 4242 4242 4242` |
| **到期日** | 任何未來日期（例如 `12/28`） |
| **CVC** | 任意 3 碼（例如 `123`） |
| **郵遞區號** | 任意數字（例如 `12345`） |

---

## 📚 完整文檔導覽

### 🎓 必讀路線

1. **[01-Paddle完整設定指南](./docs/01-Paddle完整設定指南.md)**  
   最新介面的圖文解說，從登入、建立產品/價格、到取得 `Client Token / Price ID / API Key / Vendor/Seller ID`，含表格與截圖。

2. **[02-本地沙盒實作指南](./docs/02-本地沙盒實作指南.md)**  
   本地運行的所有步驟：修改哪些檔案、填哪些環境變數、如何對外暴露測試 Webhook、VSCode/Cursor 預覽工具。

3. **[03-沙盒轉生產環境指南](./docs/03-沙盒轉生產環境指南.md)**  
   從 Sandbox 轉 Production 的完整流程（KYC/Domain Approval 等）。

### 🔧 進階主題

4. **[04-常見問題與除錯](./docs/04-常見問題與除錯.md)**  
   常見錯誤、佈署與環境差異、除錯建議。

5. **[05-Webhook事件處理指南](./docs/05-Webhook事件處理指南.md)**  
   Webhook 驗證與事件處理的完整實作（生產環境簽章、冪等性）。

---

## 📁 專案結構

```
Open_Paddle-Sandbox-_Reference-Guides/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── webhook/
│   │   │       └── route.ts          # Webhook API 端點（Sandbox 示範）
│   │   ├── layout.tsx                # 應用佈局
│   │   └── page.tsx                  # 首頁（結帳示範）
│   └── components/
│       └── PaddleLoader.tsx          # Paddle SDK v2 載入器
├── docs/
│   ├── images/
│   │   ├── catalog/                  # 產品/價格/介面截圖（主要使用）
│   │   ├── domain-approval/          # 本地保留，Git 忽略（給 03）
│   │   ├── webhook/                  # 本地保留，Git 忽略（給 05）
│   │   └── 圖片暫存區/                 # 僅開發者暫存，本地保留，Git 忽略
│   ├── 01-Paddle完整設定指南.md
│   ├── 02-本地沙盒實作指南.md
│   ├── 03-沙盒轉生產環境指南.md
│   ├── 04-常見問題與除錯.md
│   └── 05-Webhook事件處理指南.md
├── env.example                       # 環境變數範例
├── 本地.env / 本地.env.local            # 本地示例（需改名為 .env / .env.local）
├── .gitignore                        # 已忽略 .env*.local 與本地 images 區
├── package.json                      # 專案依賴
├── tsconfig.json                     # TypeScript 配置
├── next.config.js                    # Next.js 配置
└── README.md                         # 本檔案
```

---

## 🔧 環境變數說明

| 變數名稱 | 必填 | 說明 | 範例（模擬數值） |
|---------|------|------|-----------------|
| `NEXT_PUBLIC_PADDLE_ENV` | ✅ | 環境設定 | `sandbox` 或 `production` |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | ✅ | Client-side Token | `test_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o` |
| `NEXT_PUBLIC_PADDLE_PRICE_ID` | ✅ | 產品 Price ID | `pri_01abc2def3ghi4jkl5mno6pqr7s` |
| `PADDLE_API_KEY` | ❌ | 伺服器端 API Key（進階） | `apikey_89x4ypq73ab92cd8e5fg1hi6op` |

> ⚠️ **注意**：上表中的範例數值皆為模擬數值，請替換為你從 Paddle Dashboard 取得的實際數值。


---


## 🎯 使用場景

本專案適合以下情境：

### ✅ 適合你，如果你想...
- 快速整合 Paddle 金流到 Next.js 專案
- 了解 Paddle Billing v2 的完整操作流程
- 學習如何處理 Webhook 事件
- 建立 SaaS 訂閱制服務
- 銷售數位產品（軟體、課程、電子書等）

### ❌ 可能不適合，如果你...
- 需要 Paddle Classic（v1）的整合（本專案使用 v2）
- 需要實體商品的金流處理
- 需要其他金流服務（Stripe、PayPal 等）

---


## 📄 授權

本專案採用 **MIT 授權** - 詳見 [LICENSE](./LICENSE) 檔案

這意味著你可以：
- ✅ 自由使用於個人或商業專案
- ✅ 修改程式碼
- ✅ 分發與販售

但請保留原始授權聲明。

---

## 🔗 相關連結

- [Paddle 官方網站](https://www.paddle.com/)
- [Paddle 開發者文檔](https://developer.paddle.com/)
- [Paddle Billing v2 API 文檔](https://developer.paddle.com/api-reference/overview)
- [Next.js 官方文檔](https://nextjs.org/docs)
- [本專案 GitHub](https://github.com/BUTTST/Open_Paddle-Sandbox-_Reference-Guides)

---

## ⚠️ 重要注意事項

### 安全性
- 🔒 **API Key 保密**：請勿將 API Key 提交到公開版本庫
- 🔒 **Webhook 驗證**：生產環境務必實作簽章驗證
- 🔒 **環境變數**：使用 `.env.local`，已加入 `.gitignore`

### 合規性
- 📜 本專案僅供學習與參考
- 📜 實際使用請確保符合 [Paddle 使用條款](https://www.paddle.com/legal)
- 📜 請在網站上提供隱私政策、服務條款、退款政策

### 測試
- 🧪 請在 Sandbox 環境充分測試後再上線
- 🧪 測試時使用 Paddle 提供的測試卡號
- 🧪 Production 環境無法使用測試卡號

---

## 💬 支援與協助

遇到問題？我們提供多種管道：

1. **📖 查閱文檔**：先查看 [docs/](./docs/) 資料夾中的詳細指南
2. **❓ 常見問題**：參考 [04-常見問題與除錯.md](./docs/04-常見問題與除錯.md)
3. **🐛 回報 Bug**：[提交 Issue](https://github.com/BUTTST/Open_Paddle-Sandbox-_Reference-Guides/issues)
4. **💬 討論交流**：[GitHub Discussions](https://github.com/BUTTST/Open_Paddle-Sandbox-_Reference-Guides/discussions)---

## 📝 更新日誌

### 2025-10-06
- 🎉 首次發布 v1.0.0
- ✨ 完整的 Paddle Billing v2 整合
- 📚 5 份詳盡的中文操作指南
- 🔒 所有敏感資訊已脫敏處理


