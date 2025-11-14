export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");
    const lang = searchParams.get("lang") || "en";
    const speed = searchParams.get("speed") || "1";

    if (!text) return new Response("Missing text", { status: 400 });

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&ttsspeed=${speed}&client=tw-ob`;

    const resp = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://translate.google.com/",
        "Accept": "*/*"
      }
    });

    if (!resp.ok) {
      const textResp = await resp.text();
      return new Response("Google blocked TTS: " + textResp, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
    }

    const audioBuffer = await resp.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
