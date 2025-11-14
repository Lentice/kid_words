// 使用瀏覽器內建的 SpeechSynthesis API
// 針對單字和例句使用不同的發音設定

// 用於單字發音 - 快速簡潔
export function speak(text, { lang = 'en-US', rate = 0.95, pitch = 1.0 } = {}) {
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

export function googleTTS(text, { lang = 'en', rate = 0.8 } = {}) {
  const url = `https://google-tss.lentice.workers.dev/?text=${encodeURIComponent(text)}&lang=${lang}&speed=${rate}`;
  const audio = new Audio(url);
  audio.play().catch(err => console.log("Audio play error:", err));
}
