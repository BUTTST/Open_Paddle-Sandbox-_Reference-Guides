# Paddle 完整設定指南

> 本指南將手把手教你如何在 Paddle Dashboard 完成所有必要設定，包括產品建立、價格設定、API 金鑰獲取等完整流程

---

## 📋 目錄
1. [前置準備](#1%EF%B8%8F⃣-前置準備)
2. [建立產品](#2%EF%B8%8F⃣-建立產品)
3. [設定價格方案](#3%EF%B8%8F⃣-設定價格方案)
5. [身份識別參數](#5%EF%B8%8F⃣-身份識別參數)
6. [API 金鑰與 Token](#6%EF%B8%8F⃣-api-金鑰與-token)
7. [常見場景建議方案](#7%EF%B8%8F⃣-常見場景建議方案)
8. [檢查清單](#✅-檢查清單)

---

## 📊 參數範例與特徵說明

在使用本指南前，請先了解常用的 Paddle 參數格式：

| 參數類型 | 格式特徵 | 範例 | 說明 |
|---------|---------|------|------|
| **Product ID** | `pro_` 開頭 + 27 位小寫英數字 | `pro_78x9yza3bc456de7fg8hi9jk0lm` | 產品唯一識別碼，建立後無法修改 |
| **Price ID** | `pri_` 開頭 + 27 位小寫英數字 | `pri_89a4bcd5ef678gh9ij0klm1nop2` | 價格方案識別碼，前端結帳使用 |
| **Client-side Token** | `test_`/`live_` 開頭 + 28 位小寫英數字 | `test_7a8b3c4d9e5f6g1h2i3j4k5l6m7n` | 前端初始化Token，Sandbox用test_，Production用live_ |
| **API Key** | `apikey_` 開頭 + 27 位小寫英數字 | `apikey_89x4ypq73ab92cd8e5fg1hi6op` | 伺服器端API金鑰，高度敏感 |
| **Vendor ID** | 5位數字 | `12345` | 供應商識別碼，舊版API使用 |

> 💡 **重要提示**：以上範例皆為脫敏假資料，實際使用時請替換為你在Paddle Dashboard取得的真實參數

---

## 1️⃣ 前置準備

### 1.1 登入 Paddle Dashboard

**操作步驟**：

1. 開啟瀏覽器，前往以下網址：
   - **沙盒環境**（測試用）：https://sandbox-vendors.paddle.com/
   - **正式環境**：https://vendors.paddle.com/

2. 輸入你的帳號與密碼登入

![登入畫面](./images/catalog/登入畫面.png)

> 💡 **提示**：建議先在沙盒環境進行測試，等一切正常後再切換到正式環境

---

### 1.2 進入 Catalog（產品目錄）

**操作步驟**：

1. 登入後，在左側導航選單中找到 **「Catalog」** 選項並點擊進入

2. 進入後會看到產品列表頁面，包含搜尋和篩選功能

![Catalog 頁面](./images/catalog/登入後主介面.png)

---

## 2️⃣ 建立產品

> 💡 **產品 vs 價格方案說明**：
> - **產品（Product）**：代表你的商品或服務項目
> - **價格方案（Price）**：為產品設定的具體價格規則，一個產品可有多個價格方案

### 2.1 點擊新增產品

**操作步驟**：

1. 在 Catalog 頁面中，點擊右上角的 **「+ New product」** 按鈕

![填寫產品資訊](./images/catalog/catalog-目錄_產品列表頁面.png)

---

### 2.2 填寫產品基本資訊

**欄位說明**：

| 欄位名稱 | 必填 | 說明 | 範例 |
|---------|------|------|------|
| **Product name** | ✅ | 產品名稱，會顯示在結帳頁面 | `進階功能解鎖` |
| **Tax category** | ✅ | 稅務類別 | 選擇 `Standard digital goods`（標準數位商品） |
| **Description** | ❌ | 產品描述（選填） | `解鎖所有進階功能，永久使用` |
| **Product icon URL** | ❌ | 產品圖片網址（選填） | `https://yoursite.com/product-icon.jpg` |
| **Custom data** | ❌ | 自訂資料（選填） | 可用來儲存額外資訊 |

**操作步驟**：

1. 在 **Product name** 欄位輸入產品名稱

2. 選擇適當的 **Tax category**（通常選 `Standard digital goods`）

3. （選填）輸入 **Description**

4. （選填）輸入 **Product icon URL**

5. （選填）設定 **Custom data**（可新增鍵值對）

6. 點擊 **「Save」** 儲存產品

![填寫產品資訊](./images/catalog/新增產品-設定頁面.png)

> ⚠️ **注意**：產品名稱建立後仍可修改，但 **Product ID** 一旦生成就無法更改


---

## 3️⃣ 設定價格方案


### 3.1 進入價格設定頁面

**操作步驟**：

1. 在產品列表中找到剛建立的產品

2. 點擊產品名稱進入產品詳細頁面

3. 在頁面中找到 **「Prices」** 區塊

4. 點擊 **「+ New price」** 按鈕

![產品價格區塊-新增按鈕](./images/catalog/產品頁面-新建方案.png)

---
### 3.2 設定價格基本資訊與詳細規則

**欄位說明**：

| 欄位名稱 | 必填 | 說明 | 範例 |
|---------|------|------|------|
| **Base price** | ✅ | 產品價格 | `29.99` |
| **Currency** | ✅ | 幣別 | `US Dollar (USD)`、`Taiwan Dollar (TWD)` 等 |
| **Tax** | ✅ | 稅務設定 | 選擇 `Account default (inc. tax)` |
| **Type** | ✅ | 價格類型 | `One-time`（一次性）或 `Recurring`（循環） |
| **Billing period** | ✅* | 計費週期（僅循環價格） | `Monthly`、`Yearly` 等 |
| **Trial period** | ❌ | 免費試用期（僅循環價格） | `0`（無試用）或 `7`（7天試用） |
| **Price name** | ❌ | 價格名稱 | `專業版月費`、`年費優惠` 等 |
| **Internal description** | ❌ | 內部描述 | 方便管理使用的說明 |

> 💡 **價格方案類型說明**：
> - **一次性價格（One-time）**：用戶只需支付一次的商品
> - **循環價格（Recurring）**：定期自動扣款的訂閱服務

> 💡 **試用期說明**（僅循環價格）：
> - 設定為 `0` 表示無試用期
> - 試用期內不會扣款，用戶可隨時取消
> - 試用結束後自動開始正式計費

**操作步驟**：

1. 填寫 **必要選項**：
   - 在 **Base price** 欄位輸入金額（例如 `29.99`）
   - 選擇 **Currency**（幣別，例如 `US Dollar (USD)`）
   - 選擇 **Tax** 設定（通常選 `Account default (inc. tax)`）
   - 選擇 **Type**（價格類型）：
     - `One-time`：用於一次性產品。
     - `Recurring`：用於訂閱服務。選擇此項後，請繼續設定以下循環價格的必要選項：
       - **Billing period**（計費週期）：`Monthly`（每月）、`Yearly`（每年）、`Weekly`（每週）或 `Quarterly`（每季）

2. 填寫 **可選進階設定**：
   - **Trial period**（免費試用期）：僅限循環價格。可設定天數，`0` 表示無試用期（例如 `7` 天試用）。
   - **Price name**（價格名稱）：方便內部識別與顯示於結帳頁面（例如 `專業版月費`）。
   - **Internal description**（內部描述）：僅供內部管理使用。

3. **多幣別定價 (可選)**：
   - 若需針對不同國家/地區設定不同價格，可重複上述步驟，為同一產品新增不同幣別的價格方案。
   - **建議**：至少設定 `USD`（美金）和你的主要市場幣別。Paddle 會根據用戶所在地自動顯示對應幣別價格。

4. **新增多個價格方案 (可選)**：
   - 為同一產品建立不同的價格選項（例如：基本版、專業版），重複 **3.1 進入價格設定頁面** 的步驟，並為每個方案設定不同的價格金額、計費類型和週期。
   - 設定不同的價格名稱以便區分。

5. **編輯現有價格方案 (可選)**：
   - 在產品詳細頁面的 **Prices** 區塊中，找到要編輯的價格方案，點擊右側的 **⋯** 選單，選擇 **「Edit」**。
   - 修改價格設定後點擊 **「Save」**。
   - **注意**：修改價格不會影響現有的訂閱，但新購買會使用新價格。

6. 完成設定後，點擊 **「Save」** 儲存價格方案。

![價格基本設定](./images/catalog/設定價格和方案.png)

---

### 3.3 取得 Price ID 和 Product ID

**操作步驟**：

1. **取得 Price ID**：
   - 價格方案建立成功後，會顯示在產品的 **Prices** 區塊中
   - 找到剛建立的價格方案，點擊右側的 **⋯** 選單
   - 選擇 **「Copy ID」** 複製 Price ID（格式為 `pri_xxxxxxxxxx`）

2. **取得 Product ID**：
   - 在同個頁面左下角找到複製的圖標，此為 **Product ID**
   - 點擊複製按鈕（格式為 `pro_xxxxxxxxxx`）

![複製Price ID和Product ID](./images/catalog/產品頁面-複製PriceID和ProductID.png)

> ⚠️ **重要**：
> - 前端結帳使用的是 **Price ID**，不是 Product ID！
> - **Price ID**：前端整合時必須使用的參數，請務必記錄！
> - **Product ID**：後端 API 可能會用到

**參數記錄表**：

| 項目 | 值 | 備註 |
|------|-----|------|
| 產品名稱 |  | 例如：`進階功能解鎖` |
| **Product ID** |  | 格式：`pro_` 開頭 + 27位小寫英數字 |
| **Price ID** |  | **格式：`pri_` 開頭 + 27位小寫英數字** |
| 價格金額 |  | 例如：$29.99 USD |
| 價格類型 |  | One-time 或 Recurring |
| 計費週期（循環價格） |  | Monthly / Yearly / 等 |

---

## 5️⃣ 身份識別參數

### 5.1 Vendor ID（供應商識別碼）

**參數格式**：
- **類型**：數字
- **長度**：4-6 位數
- **模擬數值範例**：`12345`

**用途說明**：
- 唯一識別你的 Paddle 帳號
- Billing v1 前端初始化時必須提供（v2 已改用 Token）
- 部分 API 呼叫時需要提供

**取得方式**：

1. 登入 Paddle Dashboard

2. 左側選單 → **Developer Tools** → **Authentication**

3. 在頁面上方找到 **「Vendor ID」**

![Seller ID 位置](./images/catalog/查看SellerID.png)


**使用場景**：

| 場景 | 是否必須 | 備註 |
|------|---------|------|
| Billing v1 前端初始化 | ✅ 必須 | `Paddle.Setup({ vendor: VENDOR_ID })` |
| Billing v2 前端初始化 | ❌ 不需要 | v2 改用 Client-side Token |
| 伺服器端 API 呼叫 | ⚠️ 部分需要 | 依 API 而定 |

**環境差異**：

| 環境 | Vendor ID 是否相同 |
|------|------------------|
| Sandbox（測試環境） | 不同 |
| Production（正式環境） | 不同 |

> ⚠️ **重要**：Sandbox 和 Production 的 Vendor ID 是不同的！

**參數記錄**：

| 項目 | 值 | 備註 |
|------|-----|------|
| Sandbox Vendor ID |  | 測試環境使用 |
| Production Vendor ID |  | 正式環境使用 |

---

### 5.2 Seller ID

**參數格式**：
- **類型**：字串
- **格式**：`sel_` 開頭 + 27 位小寫英數字
- **模擬數值範例**：`sel_01h2x3y4z5a6b7c8d9e0f1g2h3i`

**用途說明**：
- Billing v2 中替代 Vendor ID 的角色
- 某些 API 文件中會提到

**取得方式**：
同 Vendor ID 的頁面，可能會顯示 Seller ID

**使用場景**：
- 主要用於 Billing v2 的伺服器端 API
- 前端整合通常不需要

---

## 6️⃣ API 金鑰與 Token

### 6.1 新增-獲取API Key（API 金鑰）⭐

**操作步驟**：

1. 進入 Paddle Dashboard → **Developer Tools** → **Authentication**

2. 在右上角找到並點擊 **「New API key」** 按鈕

3. 在展開的 **「New API key」** 表單中進行以下設定：

   **Name（名稱）**：為這個 API Key 設定一個清晰的名稱
   - 建議名稱：`Production Server`、`Webhook Handler`、`Admin Panel` 等

   **Description（說明）**：選填，為這個 Key 的用途添加說明
   - 範例：`用於生產環境的伺服器端 API 呼叫`

   **Expires at（到期時間）**：設定到期日期以增強安全性
   - 建議設定為 90 天後（Paddle 預設值）
   - 到期後需要重新生成新的 Key

   **Permissions（權限）**：選擇需要的權限（至少選一個）

   > 💡 **權限選擇建議**：
   > - **開發階段**：建議只勾選需要的權限以確保安全性
   > - **生產環境**：根據實際需求勾選，建議分開建立不同用途的 Key
   > - **常見配置**：
   >   - Webhook 處理：勾選 `Notification settings`、`Notifications`（讀取）
   >   - 訂閱管理：勾選 `Subscriptions`、`Customers`、`Transactions`（讀寫）
   >   - 完整管理：勾選 `All`（但僅用於管理後台）

   | 權限類型 | 建議勾選時機 | 說明 |
   |---------|-------------|------|
   | **All** | 管理後台 | 擁有所有權限，僅用於後台管理 |
   | **Read** | 查詢操作 | 僅讀取資料，用於報表查詢 |
   | **Write** | 修改操作 | 可修改資料，用於業務邏輯 |

4. 設定完成後點擊 **「Save」** 儲存

5. **立即複製並安全保存** API Key（只會顯示一次！）

> 圖片（按流程順序檢視）：
> 1) 新 API Key 設定表單（名稱、說明、到期日、權限）
> 2) 已建立的 API Key 操作選單 → Copy ID 複製

![API Key 設定介面](./images/catalog/新增金鑰-設置介面_API-Key.png)

![API Key 新增與複製](./images/catalog/新增與複製_API-Key.png)

**參數格式**：
- **類型**：字串
- **格式**：`apikey_` 開頭 + 27 位小寫英數字
- **模擬數值範例**：`apikey_89x4ypq73ab92cd8e5fg1hi6op`

**用途說明**：
- **伺服器端** API 呼叫時使用
- **高度敏感**，絕對不可放在前端程式碼
- 擁有完整的後台操作權限（查詢、退款、取消訂閱等）

**使用場景**：

```typescript
// 伺服器端 API 呼叫範例
const response = await fetch('https://api.paddle.com/subscriptions', {
  headers: {
    'Authorization': `Bearer apikey_89x4ypq73ab92cd8e5fg1hi6op`,  // 你的 API Key
    'Content-Type': 'application/json'
  }
});
```

**安全性**：

| 特性 | 說明 |
|------|------|
| 是否敏感 | ✅ **高度敏感** |
| 權限範圍 | 完整後台操作權限 |
| 洩漏風險 | **極高**（可執行退款、取消訂閱等） |
| 存放位置 | **僅限伺服器端**環境變數 |

**環境設定**：

```env
# .env.local（僅供伺服器端使用，絕對不要用 NEXT_PUBLIC_ 開頭）
PADDLE_API_KEY=apikey_89x4ypq73ab92cd8e5fg1hi6op
```

> ⚠️ **安全警告**：
> - 絕對不要使用 `NEXT_PUBLIC_` 開頭（會暴露在前端）
> - 不要提交到 Git 版本控制（`.env.local` 應該在 `.gitignore` 中）
> - 定期更換 API Key（建議每 90 天）
> - 如果不慎洩漏，立即在 Dashboard 中撤銷（Revoke）

**權限管理建議**：

建議針對不同用途建立不同的 API Key：

| Key 用途 | 權限範圍 | 建議名稱 | 建議權限 |
|---------|---------|---------|----------|
| Webhook 處理 | 唯讀（僅查詢） | `webhook_handler` | `Notification settings`、`Notifications`（讀取） |
| 訂閱管理 | 訂閱相關操作 | `subscription_mgmt` | `Subscriptions`、`Customers`、`Transactions`（讀寫） |
| 管理後台 | 所有操作 | `admin_panel` | `All`（完整權限） |

**參數記錄**：

| 項目 | 值 | 備註 |
|------|-----|------|
| Sandbox API Key |  | 測試環境使用（test_開頭） |
| Production API Key |  | 正式環境使用（live_開頭） |

---

### 6.2 Client-side Token（客戶端 Token）⭐

**參數格式**：
- **類型**：字串
- **格式**：
  - **Sandbox**：`test_` 開頭 + 28 位小寫英數字
  - **Production**：`live_` 開頭 + 28 位小寫英數字
- **模擬數值範例**（Sandbox）：`test_7a8b3c4d9e5f6g1h2i3j4k5l6m7n`

**用途說明**：
- Billing v2 前端初始化時必須提供
- 公開的 Token，可以放在前端程式碼中
- 用於識別你的 Paddle 帳號並驗證來源

**取得方式**：

1. Paddle Dashboard → **Developer Tools** → **Authentication**

2. 切換到 **Client-side tokens** 分頁

3. 點擊 **「New Client-side token」** 建立，填寫名稱與（選填）說明，按 **Save**

4. 於列表右側選單 **…** → **Copy token** 複製 Token 值

> 圖片（按流程順序檢視）：
> 1) 新 Client-side token 設定表單（名稱、說明）
> 2) 列表操作選單 → Copy token 複製

![Client-side Token 設定介面](./images/catalog/新增金鑰-設置介面Client-side-Token.png)

![Client-side Token 新增與複製](./images/catalog/新增與複製Client-side-Token.png)

**使用場景**：

```typescript
// Billing v2 初始化
Paddle.Initialize({
  token: 'test_7a8b3c4d9e5f6g1h2i3j4k5l6m7n'  // 你的 Client-side Token
});
```

**安全性**：

| 特性 | 說明 |
|------|------|
| 是否敏感 | ❌ 不敏感（可公開） |
| 權限範圍 | 僅限前端結帳 |
| 洩漏風險 | 低（無法執行後端操作） |

**環境設定**：

```env
# .env.local（前端環境變數）
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_7a8b3c4d9e5f6g1h2i3j4k5l6m7n
```

> 💡 **提示**：`NEXT_PUBLIC_` 開頭表示這個變數會暴露在前端，Paddle 的設計就是允許這樣做。

**環境差異**：

| 環境 | Token 前綴 |
|------|-----------|
| Sandbox | `test_` |
| Production | `live_` |

> ⚠️ **切換環境檢查清單**：
> - [ ] Token 前綴是否正確（test_ / live_）
> - [ ] 環境變數是否已更新
> - [ ] 是否已重新啟動開發伺服器

**參數記錄**：

| 項目 | 值 | 備註 |
|------|-----|------|
| Sandbox Client Token |  | 測試環境使用（test_開頭） |
| Production Client Token |  | 正式環境使用（live_開頭） |

---

## 7️⃣ 常見場景建議方案

### 場景 A：SaaS 軟體訂閱（建議）

**推薦配置**：

| 項目 | 設定值 | 理由 |
|------|--------|------|
| 產品類型 | 訂閱方案 | 持續性收入 |
| 計費週期 | Monthly + Yearly | 提供彈性選擇，年付可給折扣 |
| 試用期 | 7-14 天 | 讓用戶充分體驗 |
| 多幣別 | ✅ 啟用 | 支援全球用戶 |
| 取消政策 | 隨時可取消 | 降低用戶疑慮 |

---

### 場景 B：數位產品一次性銷售

**推薦配置**：

| 項目 | 設定值 | 理由 |
|------|--------|------|
| 產品類型 | 一次性產品 | 買斷制 |
| 定價策略 | 固定價格 | 簡單明瞭 |
| 多幣別 | ✅ 啟用 | 擴大市場 |
| 授權期限 | 永久授權 | 提高購買意願 |

---

### 場景 C：企業授權（多座位）

**推薦配置**：

| 項目 | 設定值 | 理由 |
|------|--------|------|
| 產品類型 | 訂閱方案 | 持續服務 |
| 計費週期 | Monthly 或 Yearly | 依企業偏好 |
| 試用期 | 可選 | 企業通常需試用 |
| 分級定價 | ✅ 啟用 | 鼓勵購買更多座位 |
| 數量範圍 | 1-10, 11-50, 51+ | 針對不同規模企業 |

---

## ✅ 完整設定檢查清單

完成所有設定後，請確認以下事項：

### 產品設定確認
- [ ] 產品名稱清晰易懂
- [ ] 稅務類別設定正確（通常選 `Standard digital goods`）
- [ ] （選填）產品描述已填寫
- [ ] （選填）產品圖示 URL 已設定
- [ ] 已取得並記錄 **Product ID**

### 價格設定確認
- [ ] 價格金額設定正確
- [ ] 幣別選擇正確（支援主要市場）
- [ ] 價格類型正確（One-time 或 Recurring）
- [ ] 已取得並記錄 **Price ID**
- [ ] （循環價格）計費週期設定正確
- [ ] （循環價格）試用期設定正確（若需要）
- [ ] （選填）價格名稱已設定
- [ ] （選填）多幣別定價已設定（若需要）
- [ ] （選填）多個價格方案已建立（若需要）

### 身份識別參數確認
- [ ] 已記錄 Vendor ID（Sandbox 和 Production）
- [ ] 已記錄 Seller ID（若需要）

### API 金鑰與 Token 確認
- [ ] 已建立並安全保存 API Key
- [ ] API Key 權限設定符合實際需求
- [ ] 已建立並記錄 Client-side Token
- [ ] Token 前綴符合環境（test_ 或 live_）
- [ ] 環境變數已正確設定

---

## 📝 完整參數記錄表

建議將以下所有資訊記錄下來，方便後續整合使用：

### 產品與價格參數

| 項目 | 值 | 備註 |
|------|-----|------|
| 產品名稱 |  | 例如：進階功能解鎖 |
| **Product ID** |  | 格式：`pro_` 開頭 + 27位小寫英數字 |
| **Price ID** |  | **必填，前端結帳使用，格式：`pri_` 開頭 + 27位小寫英數字** |
| 價格金額 |  | 例如：$29.99 USD |
| 價格類型 |  | One-time（一次性）或 Recurring（循環） |
| 計費週期（循環價格） |  | Monthly / Yearly / Weekly / Quarterly |
| 試用期（循環價格） |  | 天數，0表示無試用期 |
| 支援幣別 |  | USD、TWD 等 |
| 建立日期 |  | 方便追蹤版本 |
| 進階設定 |  | 多幣別定價、多個價格方案等 |

### 身份識別參數

| 項目 | 值 | 備註 |
|------|-----|------|
| Sandbox Vendor ID |  | 測試環境使用 |
| Production Vendor ID |  | 正式環境使用 |
| Seller ID |  | 若需要，格式：`sel_` 開頭 |

### API 金鑰與 Token

| 項目 | 值 | 備註 |
|------|-----|------|
| Sandbox API Key |  | 測試環境使用，格式：`apikey_` 開頭 |
| Production API Key |  | 正式環境使用，格式：`apikey_` 開頭 |
| Sandbox Client Token |  | 測試環境使用，格式：`test_` 開頭 |
| Production Client Token |  | 正式環境使用，格式：`live_` 開頭 |

> 💡 **重要提醒**：
> - **Product ID** 和 **Price ID** 在 Sandbox 和 Production 環境中是不同的
> - 記錄這些參數時，請註明是哪個環境的
> - 這些 ID 建立後無法修改，請謹慎操作

---

## 🔗 相關文檔

- [02-本地沙盒實作指南](./02-本地沙盒實作指南.md)
- [03-沙盒轉生產環境指南](./03-沙盒轉生產環境指南.md)

---

**文檔版本**：v2.0.0  
**最後更新**：2025-10-05  
**實測日期**：2025-09-30

