# TikTok clone using React.js
這是一個模擬抖音、Shorts，短影片類型功能的 demo

# Usage
1. To install the dependencies, run `npm install`
2. run the code `npm start`
    (server 預設跑在:3000，所以用 .env 設定前端 demo 跑在:3001)
    
# Feature
1. 上下滑動切換 - 必要
2. Following / For You 切換暫停(切換回去要從離開的進度繼續播放)
3. 過場圖片 遮罩(封面圖) 功能，如影片所示意
4. Progress Bar 可拖曳播放進度
5. 影片播放切換 請參考(二擇一)盡可能完全相同
    1. https://www.tiktok.com/ (請看WAP版畫面)
    2. TikTok APP
6. 驗測會採用 Mac Chrome & iPhone 實體手機 & iPhone Simulator 需功能正常
      (請務必確保 在行動裝置時功能均正常)

# Demo GIF
![Demo GIF](https://github.com/huskylin/web-demo-tiktok/blob/master/web-exam-tiktok.gif)

# Developer Notes
1. 上下滑動主要透過
    1. Intersection Observer API 來監測是否播放、是否切換
    2. scroll-snap-align: start 來達到像是 slides 一樣的視覺效果
2. 從離開的進度繼續播放
    切換頁面時，在 useEffect 的 return function 
    儲存影片的當前播放時間到 redux
    每次讀取影片時，在讀取並設定到該時間
3. 設定一個 overlay 在影片上，並設定 CSS pointer-events: none;
    讓事件穿透圖層
    以及同樣使用 Intersection Observer API，在暫停影片播放時，會顯示封面圖遮罩，播放時則隱藏
4. 跨裝置的部分，有透過 ngrok 簡單測試一下確認可以播放 hls 影片
    並且使用 CSS dvh 作為高度單位
    但其他行為或 layout ，因為沒有更多時間實際部屬並進行詳細測試
    如果有不購周全的地方，再麻煩指教了，謝謝
