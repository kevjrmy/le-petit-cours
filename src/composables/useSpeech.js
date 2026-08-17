import { ref, onBeforeUnmount } from 'vue'

/**
 * French text-to-speech for the audio pages (dictées, prononciation).
 *
 * Wraps the Web Speech API so every page speaks with the same voice, the same
 * error message and the same cleanup. Call it from `<script setup>` — it
 * registers `onBeforeUnmount`, so audio never keeps playing after the learner
 * navigates away.
 *
 *   const { speak, speaking } = useSpeech()
 *   speak('Bonjour', 0.85)
 *
 * @param {object}  [options]
 * @param {string}  [options.lang='fr-FR']   BCP-47 tag for the utterance.
 * @param {boolean} [options.pickVoice=true] Prefer an installed voice matching
 *   `lang` over the browser default, which is often the OS language.
 * @param {?string} [options.unsupportedMessage] Alerted when the browser has no
 *   speech synthesis. Pass `null` to fail silently.
 */
export function useSpeech(options = {}) {
  const {
    lang = 'fr-FR',
    pickVoice = true,
    unsupportedMessage = "La synthèse vocale n'est pas prise en charge par votre navigateur.",
  } = options

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const speaking  = ref(false)

  // `getVoices()` returns [] until the engine has loaded its list; Chrome fires
  // `voiceschanged` once it has. Resolve lazily and cache, so an early call
  // does not permanently fall back to the default voice.
  const langPrefix = lang.slice(0, 2)
  let voice = null

  function resolveVoice() {
    if (!supported || !pickVoice) return null
    if (voice) return voice
    voice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith(langPrefix)) || null
    return voice
  }

  if (supported && pickVoice) {
    resolveVoice()
    window.speechSynthesis.addEventListener('voiceschanged', resolveVoice)
  }

  /**
   * Speak `text`, cancelling anything already in progress so two clicks cannot
   * overlap. Returns false when the browser cannot speak.
   *
   * @param {string} text
   * @param {number} [rate=1] 1 is normal; the dictées use 0.85 and 0.55.
   */
  function speak(text, rate = 1) {
    if (!supported) {
      if (unsupportedMessage) alert(unsupportedMessage)
      return false
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate

    const v = resolveVoice()
    if (v) utterance.voice = v

    utterance.onstart = () => { speaking.value = true }
    utterance.onend   = () => { speaking.value = false }
    utterance.onerror = () => { speaking.value = false }

    window.speechSynthesis.speak(utterance)
    return true
  }

  function cancel() {
    if (!supported) return
    window.speechSynthesis.cancel()
    speaking.value = false
  }

  onBeforeUnmount(() => {
    cancel()
    if (supported && pickVoice) {
      window.speechSynthesis.removeEventListener('voiceschanged', resolveVoice)
    }
  })

  return { speak, cancel, speaking, supported }
}
