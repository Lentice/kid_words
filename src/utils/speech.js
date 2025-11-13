export function speak(text, { lang = 'en-US', rate = 0.95, pitch = 1.0 } = {}) {
  try {
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = lang
    utter.rate = rate
    utter.pitch = pitch
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
    return true
  } catch {
    return false
  }
}

export function googleTTSUrl(text, { lang = 'en' } = {}) {
  const base = 'https://translate.google.com/translate_tts'
  const q = encodeURIComponent(text)
  // client=gtx is the commonly used public endpoint
  return `${base}?ie=UTF-8&q=${q}&tl=${lang}&client=gtx`
}
