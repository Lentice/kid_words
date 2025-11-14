# 小孩學英文｜字卡與小測驗

一個以 React + Vite 製作、適合小孩學英文單字的網站。支援字卡學習（發音、上一個/下一個、停留記錄）與小測驗（英→中 / 中→英）。

## 功能亮點
- 字卡：單字、中文、例句中英對照，5 秒以上停留再按「下一個」會被視為學過
- 發音：優先使用瀏覽器 SpeechSynthesis，並提供 Google TTS 連結
- 主題（Section）篩選：可勾選一個或多個主題學習或測驗
- 進度保存：localStorage 保留「學過單字」「上次位置」「已選主題」
- 小測驗：隨機出題，中英互測，即時回饋與分數
- RWD：支援手機/平板瀏覽器

## 專案結構
- `public/data/`：靜態資料（由根目錄的 `words.json`、`sections.json`、`parts_of_speech.json` 複製而來）
- `src/hooks/useWordData.js`：載入資料的 Hook
- `src/components/Flashcard.jsx`：字卡
- `src/components/SectionPicker.jsx`：主題多選
- `src/routes/Learn.jsx`：學習頁
- `src/routes/Quiz.jsx`：測驗頁
- `src/utils/progress.js`：進度儲存
- `src/utils/speech.js`：發音工具

## 開發與執行

安裝依賴（若遇到無法建立 `node_modules` 的環境問題，仍可用 npx 直接執行）：

```powershell
npm install
# 如果上面無法建立 node_modules，可改用：
# npx vite
```

啟動開發伺服器：

```powershell
# 常態使用
npm run dev

# 或用 npx（繞過本機安裝問題）
npx vite
```

建置（輸出到 `dist`）：

```powershell
# 常態使用
npm run build

# 或用 npx（繞過本機安裝問題，需手動複製 404.html）
npx vite build
Copy-Item dist\index.html dist\404.html
```

預覽生產版：

```powershell
npm run preview
```

## 部署到 GitHub Pages

1. 本專案已設定 base 路徑為 `/kid_words/`。若你 fork 後改了專案名稱（例如 `my-repo`），請在建置前設定 base 路徑：

```powershell
$env:BASE_URL="/my-repo/"
npm run build
```

或直接在 `vite.config.js` 把 `base` 改成 `'/my-repo/'`。

2. 建置完成後，會自動產生 `dist/404.html`（在 build script 中複製 `index.html`），確保前端路由可在 Pages 正常刷新。

3. 發布：

```powershell
# 常態使用（需要本機安裝過 gh-pages）
npm run deploy

# 若遇到 node_modules 問題，可使用 npx 版本：
npx gh-pages -d dist
```

GitHub 專案 Settings → Pages：選擇部署來源為 `gh-pages` 分支。

## 資料來源與欄位
- `words.json`：`{ id, section_id, part_of_speech_id, word, meaning_cht, example_en, example_cht }`
- `sections.json`：`{ id, name, number }`
- `parts_of_speech.json`：`{ id, tag }`

## 已知事項
- 若你的環境中 `npm install` 完成後沒有建立 `node_modules`，可先用 `npx vite`、`npx gh-pages` 進行開發/建置/部署。
- Google TTS 連結為外部服務，瀏覽器/網路政策可能偶發限制，建議以瀏覽器內建 `SpeechSynthesis` 為主。

## 授權
僅供學習與個人使用。
