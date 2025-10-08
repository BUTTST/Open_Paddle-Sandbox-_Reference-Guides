# Webhook 事件處理完整指南

> 本文檔詳細說明如何正確處理 Paddle Webhook 事件，包含簽章驗證、冪等性處理等

---

## ⚠️ 文檔免責聲明

**本指南全文由 AI 生成，「無人工審閱」  
雖然已盡力確保準確性，但仍可能存在偏差或錯誤，  
請自行驗證並以實際操作結果為準。**

---

> ⚠️ 正式環境必讀：請先完成 Webhook 設置
>
> 1) 在 Paddle Dashboard 建立 Webhook endpoint（Developer Tools → Notifications → Add endpoint）
> 2) 設定 URL 為 `https://yourdomain.com/api/webhook`
> 3) 複製 Webhook Secret 並保存到伺服器環境變數
>
> ```env
> PADDLE_WEBHOOK_SECRET=whsec_xxx
> ```
>
> 4) 啟用必要事件（建議全選），5) 在伺服器端實作簽章驗證與冪等性

## 📋 目錄
1. [Webhook 說明](#1%EF%B8%8F⃣-webhook-說明)
2. [設定 Webhook](#2%EF%B8%8F⃣-設定-webhook)
3. [常見事件指南](#3%EF%B8%8F⃣-常見事件指南)
4. [簽章驗證實作](#4%EF%B8%8F⃣-簽章驗證實作)
5. [冪等性處理](#5%EF%B8%8F⃣-冪等性處理)
6. [錯誤處理與重試](#6%EF%B8%8F⃣-錯誤處理與重試)
7. [測試 Webhook](#7%EF%B8%8F⃣-測試-webhook)

---

## 1️⃣ Webhook 說明

### 1.1 什麼是 Webhook？

**Webhook（網路回呼）**：當特定事件發生時，Paddle 會自動向你的伺服器發送 HTTP POST 請求

**為什麼需要 Webhook？**
- 即時接收付款成功通知
- 處理訂閱狀態變更（取消、續費等）
- 自動開通或撤銷用戶權限
- 記錄交易歷史

---

### 1.2 Webhook 工作流程

```
用戶付款成功
    ↓
Paddle 系統處理
    ↓
Paddle 發送 Webhook → 你的伺服器 API
    ↓
你的 API 處理事件（開通權限等）
    ↓
回傳 200 OK
```

---

### 1.3 Webhook URL 要求

| 要求 | 說明 |
|------|------|
| **協定** | 必須是 HTTPS（開發環境可用 tunnel 工具） |
| **可訪問性** | 必須是公開可訪問的 URL |
| **回應時間** | 建議在 5 秒內回應 |
| **回應碼** | 必須回傳 `200 OK` |
| **冪等性** | 能處理重複的事件（Paddle 會重試） |
| **逾時** | 超過逾時視為失敗，Paddle 會重試 |
| **重試機制** | 失敗請求自動重試（指數退避） |

---

## 2️⃣ 設定 Webhook

### 2.1 Sandbox 環境（測試用）

**Sandbox 不需要預先設定 Webhook URL**

直接使用 **Simulations（模擬器）**：

1. Paddle Dashboard → **Developer Tools** → **Notifications** → **Simulations**

2. 選擇事件類型（例如 `subscription_created`）

3. 輸入 Webhook URL（例如你的 localtunnel URL）

4. 點擊 **Send test**

---

### 2.2 Production 環境（正式環境）

**操作步驟**：

1. Paddle Dashboard → **Developer Tools** → **Notifications**

2. 點擊 **「Add endpoint」**

3. 填寫資訊：
   - **URL**：`https://yourdomain.com/api/webhook`
   - **Description**：`Production Webhook`

4. 選擇要訂閱的事件（建議全選）：
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.cancelled`
   - ✅ `transaction.completed`
   - ✅ `transaction.updated`
   - ✅ `transaction.payment_failed`
   - ✅ （其他相關事件）

5. 點擊 **Save**

---

### 2.3 Webhook Secret Key 與 URL 規範

#### Webhook Secret Key

**參數格式**：
- 類型：字串
- 用於驗證 Webhook 簽章

**用途說明**：
- 驗證 Webhook 請求確實來自 Paddle
- 防止惡意偽造通知
- 沙盒環境：不需要設置（測試時可略過簽章驗證）
- 生產環境：必須設置並實作簽章驗證

**取得與設定方式**：
1) 進入 Paddle Dashboard → Developer Tools → Notifications
2) 找到 Webhook endpoint 設定區塊
3) 點擊「Add endpoint」或編輯現有 endpoint
4) 設定 Webhook URL 後，系統會自動生成 Secret Key
5) 立即複製並安全保存 Secret Key（只會顯示一次！）

**環境設定**：

```env
# .env.local（伺服器端使用）
PADDLE_WEBHOOK_SECRET=whsec_你的_webhook_secret_key
```

> 安全警告：
> - 絕對不要將 Secret Key 暴露在前端程式碼
> - 不要提交到 Git 版本控制
> - 如果洩漏，立即撤銷並重新生成

#### Webhook URL

**參數格式**：
- 類型：完整的 HTTPS URL
- 範例：`https://yourdomain.com/api/webhook`

**用途說明**：
- Paddle 發送事件通知的目標網址
- 必須是公開可訪問的 HTTPS 端點

**設定位置**：
1) 正式環境：Developer Tools → Notifications → 設定 Webhook URL
2) 測試環境：可使用 Simulations（模擬器）直接發送，不需預先設定

**測試工具**：

| 工具 | 用途 | 使用方式 |
|------|------|---------|
| localtunnel | 將本機暴露到公網 | `npx localtunnel --port 3000` |
| ngrok | 同上（較穩定） | https://ngrok.com |
| cloudflared | Cloudflare 提供 | `npx cloudflared tunnel` |

**Webhook URL 規範補充**：

| 要求 | 說明 |
|------|------|
| 協定 | 必須是 HTTPS（本機測試工具會自動提供） |
| 回應碼 | 必須回傳 `200 OK` |
| 逾時 | 建議在 5 秒內回應 |
| 重試機制 | Paddle 會自動重試失敗的請求 |

## 3️⃣ 事件類型說明

### 3.1 訂閱相關事件

| 事件名稱 | 觸發時機 | 建議動作 |
|---------|---------|---------|
| `subscription.created` | 新訂閱建立成功 | ✅ 開通用戶權限 |
| `subscription.updated` | 訂閱資訊更新 | ⚠️ 檢查變更內容並更新資料庫 |
| `subscription.cancelled` | 訂閱被取消 | ❌ 撤銷用戶權限（考慮給予緩衝期） |
| `subscription.paused` | 訂閱暫停 | ⏸️ 暫時撤銷權限 |
| `subscription.resumed` | 訂閱恢復 | ▶️ 恢復用戶權限 |

---

### 3.2 付款相關事件

| 事件名稱 | 觸發時機 | 建議動作 |
|---------|---------|---------|
| `transaction.completed` | 付款成功 | ✅ 開通權限/發送收據郵件 |
| `transaction.updated` | 交易資訊更新 | ⚠️ 更新資料庫記錄 |
| `transaction.payment_failed` | 付款失敗 | ❌ 發送提醒郵件給用戶 |
| `transaction.refunded` | 退款完成 | 💸 撤銷權限/更新紀錄 |

---

### 3.3 事件資料結構範例

```json
{
  "event_type": "subscription.created",
  "event_id": "evt_01h2x3y4z5...",
  "occurred_at": "2025-10-01T10:30:00.000Z",
  "data": {
    "id": "sub_01abc2def3...",
    "status": "active",
    "customer_id": "ctm_01xyz9abc8...",
    "items": [
      {
        "price_id": "pri_01...",
        "quantity": 1
      }
    ],
    "custom_data": {
      "user_id": "123"
    }
  }
}
```

---

### 3.4 舊版 alert_name 事件與範例

**常見事件清單（alert_name）**：

| 事件名稱 | 觸發時機 | 必須處理 |
|---------|---------|---------|
| `subscription_created` | 訂閱建立成功 | ✅ |
| `subscription_updated` | 訂閱資訊更新 | ✅ |
| `subscription_cancelled` | 訂閱被取消 | ✅ |
| `subscription_payment_succeeded` | 訂閱續費成功 | ✅ |
| `subscription_payment_failed` | 訂閱續費失敗 | ✅ |
| `payment_succeeded` | 一次性付款成功 | ✅ |
| `payment_refunded` | 退款完成 | ✅ |
| `payment_dispute_created` | 爭議/拒付發生 | ⚠️ 建議處理 |

**事件處理範例（alert_name）**：

```typescript
// Webhook API 範例（alert_name 格式）
export async function POST(req: Request) {
  const body = await req.json();
  const eventType = body.alert_name;
  
  switch(eventType) {
    case 'subscription_created':
      // 處理新訂閱：開通用戶權限
      break;
    case 'subscription_cancelled':
      // 處理取消：移除用戶權限
      break;
    case 'subscription_payment_succeeded':
      // 處理續費成功：延長權限期限
      break;
    case 'subscription_payment_failed':
      // 處理扣款失敗：發送提醒郵件
      break;
  }
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200
  });
}
```

## 4️⃣ 簽章驗證實作

### 4.1 為什麼需要簽章驗證？

**防止惡意攻擊**：
- 確保 Webhook 確實來自 Paddle
- 防止有人偽造事件通知
- 保護你的業務邏輯

> ⚠️ **重要**：生產環境**必須**實作簽章驗證！

---

### 4.2 取得 Webhook Secret

**操作步驟**：

1. Paddle Dashboard → **Developer Tools** → **Notifications**

2. 在 Webhook endpoint 設定中找到 **Notification authentication key** 或 **Webhook Secret**

3. 複製並保存到環境變數：
   ```env
   PADDLE_WEBHOOK_SECRET=你的Secret
   ```

---

### 4.3 簽章驗證實作（Next.js 範例）

```typescript
// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook Secret（從環境變數讀取）
const WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // 1. 讀取原始 body（字串格式）
    const rawBody = await req.text();
    
    // 2. 取得 Paddle 簽章
    const signature = req.headers.get('paddle-signature');
    
    // 3. 驗證簽章
    if (!verifySignature(rawBody, signature, WEBHOOK_SECRET)) {
      console.error('❌ Webhook 簽章驗證失敗');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    // 4. 解析 JSON
    const event = JSON.parse(rawBody);
    
    // 5. 處理事件
    await handleWebhookEvent(event);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

// 簽章驗證函式
function verifySignature(
  rawBody: string,
  signature: string | null,
  secret: string | undefined
): boolean {
  if (!signature || !secret) {
    return false;
  }
  
  // Paddle 簽章格式：ts=timestamp;h1=hash
  const parts = signature.split(';');
  const tsValue = parts.find(p => p.startsWith('ts='))?.substring(3);
  const h1Value = parts.find(p => p.startsWith('h1='))?.substring(3);
  
  if (!tsValue || !h1Value) {
    return false;
  }
  
  // 建立簽章字串：timestamp:body
  const signedPayload = `${tsValue}:${rawBody}`;
  
  // 使用 HMAC SHA256 計算簽章
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  
  // 比對簽章
  return crypto.timingSafeEqual(
    Buffer.from(h1Value),
    Buffer.from(expectedSignature)
  );
}

// 事件處理函式
async function handleWebhookEvent(event: any) {
  const eventType = event.event_type;
  
  console.log(`📬 收到 Webhook 事件: ${eventType}`);
  
  switch (eventType) {
    case 'subscription.created':
      await handleSubscriptionCreated(event.data);
      break;
    case 'subscription.cancelled':
      await handleSubscriptionCancelled(event.data);
      break;
    case 'transaction.completed':
      await handleTransactionCompleted(event.data);
      break;
    default:
      console.log(`ℹ️ 未處理的事件類型: ${eventType}`);
  }
}

// 處理訂閱建立
async function handleSubscriptionCreated(data: any) {
  const subscriptionId = data.id;
  const customerId = data.customer_id;
  const userId = data.custom_data?.user_id;
  
  console.log(`✅ 開通用戶權限: ${userId}`);
  
  // TODO: 在資料庫中開通用戶權限
  // await db.users.update({ id: userId }, { isPro: true });
}

// 處理訂閱取消
async function handleSubscriptionCancelled(data: any) {
  const subscriptionId = data.id;
  const userId = data.custom_data?.user_id;
  
  console.log(`❌ 撤銷用戶權限: ${userId}`);
  
  // TODO: 在資料庫中撤銷用戶權限
  // await db.users.update({ id: userId }, { isPro: false });
}

// 處理付款完成
async function handleTransactionCompleted(data: any) {
  const transactionId = data.id;
  const customerId = data.customer_id;
  
  console.log(`💰 付款成功: ${transactionId}`);
  
  // TODO: 發送收據郵件等
}
```

---

### 4.4 簽章驗證測試

**開發階段可暫時跳過驗證**（僅限 Sandbox）：

```typescript
// 僅供開發測試使用！
if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_PADDLE_ENV === 'production') {
  // 生產環境：必須驗證簽章
  if (!verifySignature(rawBody, signature, WEBHOOK_SECRET)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
} else {
  // 開發環境：可選擇性跳過驗證
  console.warn('⚠️ 開發模式：跳過簽章驗證');
}
```

---

## 5️⃣ 冪等性處理

### 5.1 什麼是冪等性？

**冪等性（Idempotency）**：同一個事件被處理多次，結果與處理一次相同

**為什麼需要？**
- Paddle 會在失敗時自動重試 Webhook
- 網路問題可能導致重複發送
- 確保不會重複開通權限或扣款

---

### 5.2 實作冪等性

**使用事件 ID 防止重複處理**：

```typescript
// 假設使用資料庫記錄已處理的事件
async function handleWebhookEvent(event: any) {
  const eventId = event.event_id;
  
  // 1. 檢查是否已處理過
  const alreadyProcessed = await db.webhookEvents.findOne({ eventId });
  
  if (alreadyProcessed) {
    console.log(`ℹ️ 事件已處理過: ${eventId}`);
    return; // 直接返回，不重複處理
  }
  
  // 2. 處理事件...
  const eventType = event.event_type;
  
  switch (eventType) {
    case 'subscription.created':
      await handleSubscriptionCreated(event.data);
      break;
    // ... 其他事件
  }
  
  // 3. 記錄為已處理
  await db.webhookEvents.create({
    eventId,
    eventType: event.event_type,
    processedAt: new Date(),
    rawData: JSON.stringify(event)
  });
  
  console.log(`✅ 事件處理完成: ${eventId}`);
}
```

---

### 5.3 資料庫 Schema 建議

```typescript
// Prisma Schema 範例
model WebhookEvent {
  id          String   @id @default(cuid())
  eventId     String   @unique  // Paddle 的 event_id
  eventType   String              // 事件類型
  processedAt DateTime @default(now())
  rawData     String   @db.Text   // 原始 JSON 資料
  
  @@index([eventId])
}
```

---

## 6️⃣ 錯誤處理與重試

### 6.1 Paddle 的重試機制

| 情況 | Paddle 行為 |
|------|-----------|
| 回傳 200 OK | ✅ 視為成功，不再重試 |
| 回傳 4xx 錯誤 | ❌ 視為永久失敗，不再重試 |
| 回傳 5xx 錯誤 | 🔄 視為暫時失敗，會自動重試 |
| 逾時（無回應） | 🔄 會自動重試 |

**重試策略**：
- 指數退避（Exponential Backoff）
- 重試間隔逐漸增加
- 最多重試約 3 天

---

### 6.2 錯誤處理最佳實踐

```typescript
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);
    
    // 處理事件
    await handleWebhookEvent(event);
    
    // ✅ 一定要回傳 200
    return NextResponse.json({ success: true });
    
  } catch (err) {
    console.error('Webhook error:', err);
    
    // ⚠️ 判斷錯誤類型決定回傳狀態碼
    
    if (err instanceof SyntaxError) {
      // JSON 解析錯誤：永久失敗，不重試
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }
    
    if (err.message === 'Database connection failed') {
      // 暫時性錯誤：Paddle 會重試
      return NextResponse.json(
        { error: 'Temporary error' },
        { status: 503 }
      );
    }
    
    // 其他未知錯誤
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
```

---

## 7️⃣ 測試 Webhook

### 7.1 本機測試（使用 Tunnel 工具）

**步驟**：

1. **啟動開發伺服器**：
   ```bash
   npm run dev
   ```

2. **開啟 Tunnel**（新終端機視窗）：
   ```bash
   npx localtunnel --port 3000
   ```

3. **取得公開 URL**（例如 `https://funny-cat-123.loca.lt`）

4. **在 Paddle Simulator 發送測試**：
   - URL：`https://funny-cat-123.loca.lt/api/webhook`
   - 事件類型：`subscription.created`

5. **檢查伺服器日誌**是否收到事件

---

### 7.2 手動測試 Webhook API

```bash
# 測試本機 API
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "subscription.created",
    "event_id": "evt_test_123",
    "data": {
      "id": "sub_test_123",
      "status": "active"
    }
  }'
```

---

### 7.3 生產環境測試

1. **小額真實交易測試**：
   - 建立低價測試商品（$0.50 USD）
   - 使用真實信用卡付款
   - 確認 Webhook 正確接收並處理

2. **檢查 Paddle Dashboard**：
   - Developer Tools → Notifications → Logs
   - 查看 Webhook 發送紀錄和回應狀態

---

## ✅ Webhook 實作檢查清單

完成以下所有項目，確保 Webhook 正確運作：

- [ ] Webhook URL 已正確設定（HTTPS）
- [ ] 已實作簽章驗證
- [ ] 已實作冪等性處理
- [ ] 所有必要事件都有處理函式
- [ ] 錯誤處理完善（區分永久/暫時失敗）
- [ ] 回應時間在 5 秒內
- [ ] 一定回傳 200 OK
- [ ] 已在 Sandbox 測試通過
- [ ] 已在 Production 測試通過
- [ ] 有完整的日誌記錄

---

## 🔗 相關文檔

- [02-Paddle平台參數說明](./02-Paddle平台參數說明.md)
- [03-沙盒轉生產環境指南](./03-沙盒轉生產環境指南.md)
- [04-常見問題與除錯](./04-常見問題與除錯.md)

---

**文檔版本**：v2.0.0  
**最後更新**：2025-10-05  
**實測日期**：2025-09-30

