# TikTok clone using React.js
這是一個模擬抖音、Shorts，短影片類型功能的 WAP 應用
主要是串接 m3u8 串流及模擬滑動效果

# Usage
目前已將後端部屬至 Vercel，前端 Github Pages
可以直接觀看 [Demo](https://huskylin.github.io/web-demo-tiktok/public/)

~~1. To install the dependencies, run `npm install`
2. run the code `npm start`
    (server 預設跑在:3000，所以用 .env 設定前端 demo 跑在:3001)~~
    
# Feature
1. 上下滑動切換
2. Following / For You 切換暫停(切換回去要從離開的進度繼續播放)
3. 過場圖片遮罩(封面圖) 功能
4. Progress Bar 可拖曳播放進度
5. 影片播放切換 請參考(二擇一)盡可能完全相同
    1. https://www.tiktok.com/ (請看WAP版畫面)
    2. TikTok APP

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