# 貢獻指南

感謝你考慮為 Open Paddle Reference Guides 做出貢獻！🎉

---

## 📋 目錄
- [如何貢獻](#如何貢獻)
- [報告問題](#報告問題)
- [提交改進](#提交改進)
- [文檔改進](#文檔改進)
- [補充截圖](#補充截圖)
- [程式碼規範](#程式碼規範)
- [提交規範](#提交規範)

---

## 如何貢獻

我們歡迎各種形式的貢獻：

- 🐛 **回報 Bug**：發現問題？請提交 Issue
- 📚 **改進文檔**：發現錯誤或不清楚的地方？提交 PR
- 📸 **補充截圖**：幫助我們完善操作指南的視覺化內容
- 💡 **功能建議**：有好點子？在 Discussions 分享
- 🌍 **翻譯文檔**：幫助翻譯成其他語言
- ⭐ **Star 專案**：如果專案對你有幫助，請給我們一顆星！

---

## 報告問題

在提交新的 Issue 前，請先搜尋是否已有類似的問題。

### 提交 Bug Report

請包含以下資訊：

- **問題描述**：清楚描述遇到的問題
- **重現步驟**：如何重現這個問題
- **預期行為**：你期望發生什麼
- **實際行為**：實際發生了什麼
- **環境資訊**：
  - OS：Windows / macOS / Linux
  - Node.js 版本
  - 瀏覽器版本
  - Paddle 環境：Sandbox / Production
- **錯誤訊息**：如果有的話，請附上完整的錯誤訊息
- **截圖**：如果適用，請附上截圖

---

## 提交改進

### 1. Fork 專案

點擊 GitHub 頁面右上角的「Fork」按鈕

### 2. Clone 到本機

```bash
git clone https://github.com/your-username/open-paddle-reference-guides.git
cd open-paddle-reference-guides
```

### 3. 建立新分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

分支命名建議：
- `feature/` - 新功能
- `fix/` - Bug 修復
- `docs/` - 文檔改進
- `refactor/` - 重構
- `test/` - 測試相關

### 4. 進行修改

請確保：
- 遵循專案的程式碼風格
- 修改後專案仍可正常運行
- 如果修改程式碼，請測試所有功能

### 5. Commit 修改

```bash
git add .
git commit -m "類型: 簡短描述"
```

Commit 訊息格式：
- `feat: 新增功能`
- `fix: 修復 Bug`
- `docs: 文檔更新`
- `style: 格式調整`
- `refactor: 重構`
- `test: 測試相關`

### 6. Push 到你的 Fork

```bash
git push origin feature/your-feature-name
```

### 7. 提交 Pull Request

1. 前往你的 Fork 頁面
2. 點擊「New Pull Request」
3. 填寫 PR 描述：
   - 做了什麼修改
   - 為什麼要這樣改
   - 如何測試
4. 提交 PR

---

## 文檔改進

文檔是這個專案的核心！

### 文檔撰寫原則

1. **清晰易懂**：假設讀者是初學者
2. **循序漸進**：由淺入深
3. **視覺化**：多使用表格、清單、程式碼範例
4. **實用性**：提供實際可用的範例

### 文檔格式規範

- 使用 Markdown 格式
- 標題層級不超過 4 層（`####`）
- 每個操作步驟都要編號
- 重要提示使用 blockquote：`> 💡 **提示**：`
- 警告訊息使用：`> ⚠️ **警告**：`
- 成功標記使用：`> ✅ **成功**：`

### 範例

```markdown
## 2️⃣ 建立產品

### 2.1 點擊新增產品

**操作步驟**：

1. 在 Catalog 頁面中，找到 **「Products」** 分頁

2. 點擊右上角的 **「+ Add Product」** 按鈕

![新增產品按鈕](./images/catalog/add-product-button.png)

> 📸 **截圖內容**：
> - Catalog 頁面的 Products 分頁
> - 紅框標註「Add Product」按鈕位置

> 💡 **提示**：建議先在沙盒環境測試
```

---

## 補充截圖

截圖是幫助使用者理解操作流程的關鍵！

### 截圖要求

- **格式**：PNG 或 JPG
- **解析度**：至少 1920x1080
- **內容**：
  - 完整的介面（包含左側選單）
  - 用紅框或箭頭標註重點
  - 隱藏敏感資訊（如真實的 API Key）

### 截圖存放位置

```
docs/images/
├── catalog/          # 產品目錄相關
├── developer-tools/  # 開發者工具
├── webhook/          # Webhook 設定
└── domain-approval/  # 網域核准與 KYC
```

### 截圖命名規範

使用描述性的檔名，例如：
- `add-product-button.png`
- `price-id-location.png`
- `webhook-simulator.png`

---

## 程式碼規範

### TypeScript / JavaScript

- 使用 2 空格縮排
- 使用單引號 `'` 而非雙引號 `"`
- 函式和變數使用 camelCase
- 元件使用 PascalCase
- 常數使用 UPPER_SNAKE_CASE

### 範例

```typescript
// ✅ 正確
const PRICE_ID = 'pri_...';

function handleCheckout() {
  // ...
}

// ❌ 錯誤
const price_id = "pri_...";

function handle_checkout() {
  // ...
}
```

---

## 提交規範

### Commit 訊息格式

```
類型: 簡短描述（不超過 50 字元）

詳細說明（如果需要）
- 第一點
- 第二點

相關 Issue: #123
```

### 類型

- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文檔更新
- `style`: 格式調整（不影響程式碼運行）
- `refactor`: 重構
- `test`: 測試相關
- `chore`: 雜項（例如更新依賴）

### 範例

```
feat: 新增多幣別定價範例

- 在產品新增指南中新增多幣別設定章節
- 提供實際操作步驟和截圖位置標註
- 新增常見場景建議

相關 Issue: #42
```

---

## Pull Request 審核流程

1. **自動檢查**：
   - 程式碼格式檢查
   - 測試是否通過

2. **人工審核**：
   - 程式碼品質
   - 文檔清晰度
   - 是否符合專案風格

3. **討論與修改**：
   - 維護者可能會提出修改建議
   - 請根據反饋進行調整

4. **合併**：
   - 所有檢查通過後，PR 會被合併

---

## 社群規範

### 我們的承諾

為了建立一個開放友善的環境，我們承諾：

- 使用友善和包容的語言
- 尊重不同的觀點和經驗
- 優雅地接受建設性批評
- 專注於對社群最有利的事情
- 對其他社群成員展現同理心

### 不可接受的行為

- 使用性暗示的語言或圖像
- 騷擾、侮辱或攻擊性言論
- 公開或私下的騷擾
- 未經許可發布他人的私人資訊
- 其他不專業或不適當的行為

---

## 需要幫助？

如果你有任何問題，可以：

- 📖 查看 [文檔](./docs/)
- 💬 在 [Discussions](https://github.com/your-username/open-paddle-reference-guides/discussions) 發問
- 📧 發送郵件給維護者

---

## 授權

提交貢獻即表示你同意你的貢獻將以 [MIT License](./LICENSE) 授權。

---

**感謝你的貢獻！❤️**

