// 使用瀏覽器內建的 SpeechSynthesis API
// 針對單字和例句使用不同的發音設定

// 播放狀態管理
let playingCallback = null;

export function onPlayingChange(callback) {
  playingCallback = callback;
}

// 用於單字發音 - 快速簡潔
export function speak(text, { lang = 'en-US', rate = 0.95, pitch = 1.0 } = {}) {
  // 返回一個 Promise，使用者可以選擇 await 或忽略
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported in this browser')
      resolve(false)
      return
    }
    try {
      console.log('Speaking via SpeechSynthesis:', text);

      // Build utterance with provided options
      function makeUtter(voice) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        u.rate = Number.isFinite(rate) ? rate : 0.95;
        u.pitch = Number.isFinite(pitch) ? pitch : 1.0;
        u.volume = 1.0;
        if (voice) u.voice = voice;

        u.onstart = () => { if (playingCallback) playingCallback(true); };
        u.onend = () => { if (playingCallback) playingCallback(false); resolve(true); };
        u.onerror = (ev) => { if (playingCallback) playingCallback(false); reject(ev || new Error('SpeechSynthesis error')); };
        return u;
      }

      // pick a voice matching lang (exact or prefix)
      function pickVoice(requestedLang) {
        const vs = window.speechSynthesis.getVoices() || [];
        if (!vs.length) return null;
        const exact = vs.find(v => v.lang && v.lang.toLowerCase() === requestedLang.toLowerCase());
        if (exact) return exact;
        const prefix = requestedLang.split('-')[0].toLowerCase();
        return vs.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix)) || null;
      }

      // speak now with optional voice
      function speakNow() {
        try {
          const v = pickVoice(lang);
          const utter = makeUtter(v);
          window.speechSynthesis.speak(utter);
        } catch (err) {
          if (playingCallback) playingCallback(false);
          reject(err);
        }
      }

      // If voices are not yet loaded, wait once for voiceschanged, otherwise speak immediately
      const currentVoices = window.speechSynthesis.getVoices();
      if (!currentVoices || currentVoices.length === 0) {
        let done = false;
        const handler = () => {
          if (done) return;
          done = true;
          try { speakNow(); } catch (err) { if (playingCallback) playingCallback(false); reject(err); }
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
        };
        // use addEventListener to avoid overwriting other handlers
        window.speechSynthesis.addEventListener('voiceschanged', handler);
        // fallback: if voiceschanged never fires, try after a short timeout
        setTimeout(() => {
          if (done) return;
          done = true;
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
          try { speakNow(); } catch (err) { if (playingCallback) playingCallback(false); reject(err); }
        }, 300);
      } else {
        speakNow();
      }
    } catch (err) {
      if (playingCallback) playingCallback(false);
      reject(err);
    }
  })
}

// 快取最近 10 個音訊 (只儲存可重用的音訊 src 字串，不直接快取 Audio 物件)
const audioCache = new Map();
const MAX_CACHE_SIZE = 10;

export function googleTTS(text, { lang = 'en', rate = 0.8 } = {}) {
  if (!text || String(text).trim() === '') {
    // 對空內容視為 no-op，讓呼叫方不用處理錯誤
    return Promise.resolve()
  }

  // 精簡：統一播放邏輯到 playSrc，減少重複的錯誤處理與事件綁定
  const cacheKey = `${text}_${lang}_${rate}`;
  const fallbackRate = typeof rate === 'number' ? rate : 0.95;

  function playSrc(src, { onStart } = {}) {
    return new Promise((resolve, reject) => {
      try {
        const a = new Audio(src);
        a.preload = 'auto';
        a.crossOrigin = 'anonymous';

        a.onended = () => {
          if (playingCallback) playingCallback(false);
          resolve();
        };
        a.onerror = (err) => {
          if (playingCallback) playingCallback(false);
          reject(err || new Error('Audio error'));
        };

        a.play()
          .then(() => {
            if (playingCallback) playingCallback(true);
            if (typeof onStart === 'function') onStart();
          })
          .catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }

  // 先嘗試使用快取的 src
  if (audioCache.has(cacheKey)) {
    console.log('Using cached TTS audio for:', text);
    const cachedSrc = audioCache.get(cacheKey);
    return playSrc(cachedSrc).catch((err) => {
      console.error('Cached TTS playback failed, falling back to SpeechSynthesis:', err);
      return speak(text, { rate: fallbackRate });
    });
  }

  // 否則建立 remote url 並播放，播放開始時加入快取
  console.log('Fetching new TTS audio for:', text);
  const url = `https://google-tss.lentice.workers.dev/?text=${encodeURIComponent(text)}&lang=${lang}&speed=${rate}`;
  return playSrc(url, {
    onStart: () => {
      try {
        if (audioCache.size >= MAX_CACHE_SIZE) {
          const firstKey = audioCache.keys().next().value;
          audioCache.delete(firstKey);
        }
        audioCache.set(cacheKey, url);
      } catch (err) {
        console.warn('Failed to set audio cache:', err);
      }
    }
  }).catch((err) => {
    console.error('Google TTS playback failed, falling back to SpeechSynthesis:', err);
    return speak(text, { rate: fallbackRate });
  });
}
