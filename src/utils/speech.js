// 使用瀏覽器內建的 SpeechSynthesis API
// 針對單字和例句使用不同的發音設定

// 用於單字發音 - 快速簡潔
export function speak(text, { lang = 'en-US', rate = 0.95, pitch = 1.0 } = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported in this browser')
    return false
  }
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = rate
    utter.pitch = pitch
    window.speechSynthesis.speak(utter)
    return true
  } catch {
    return false
  }
}

// 快取最近 10 個音訊
const audioCache = new Map();
const MAX_CACHE_SIZE = 10;

export function googleTTS(text, { lang = 'en', rate = 0.8 } = {}) {
  return new Promise((resolve, reject) => {
    const cacheKey = `${text}_${lang}_${rate}`;
    
    // 檢查快取
    if (audioCache.has(cacheKey)) {
      const cachedAudio = audioCache.get(cacheKey);
      // 重置音訊到開頭並播放
      cachedAudio.currentTime = 0;
      cachedAudio.onended = () => resolve();
      cachedAudio.onerror = (err) => {
        console.log("Audio play error:", err);
        reject(err);
      };
      cachedAudio.play().catch(reject);
      return;
    }
    
    // 建立新的音訊
    const url = `https://google-tss.lentice.workers.dev/?text=${encodeURIComponent(text)}&lang=${lang}&speed=${rate}`;
    const audio = new Audio(url);
    
    audio.onended = () => resolve();
    audio.onerror = (err) => {
      console.log("Audio play error:", err);
      reject(err);
    };
    
    audio.play()
      .then(() => {
        // 播放成功後加入快取
        if (audioCache.size >= MAX_CACHE_SIZE) {
          // 刪除最舊的項目（Map 的第一個鍵）
          const firstKey = audioCache.keys().next().value;
          audioCache.delete(firstKey);
        }
        audioCache.set(cacheKey, audio);
      })
      .catch(reject);
  });
}
