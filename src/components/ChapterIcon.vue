<template>
  <component :is="icons[name] ?? icons.default" :style="sizeStyle" aria-hidden="true" />
</template>

<script setup>
import { computed } from 'vue'

/**
 * Chapter glyphs, resolved by the `icon` key in `src/data/navigation.js`.
 *
 * unplugin-icons' auto-resolver only works on statically-named components in a
 * template, so dynamic icons have to be imported explicitly and mapped here.
 * Adding a chapter means adding one import + one map entry.
 */
import IconHome from '~icons/mdi/home-variant-outline'
import IconGrammaire from '~icons/mdi/book-open-page-variant-outline'
import IconOrthographe from '~icons/mdi/spellcheck'
import IconConjugaison from '~icons/mdi/table-large'
import IconAstuces from '~icons/mdi/head-lightbulb-outline'
import IconDictees from '~icons/mdi/ear-hearing'
import IconExercices from '~icons/mdi/dumbbell'
import IconLecture from '~icons/mdi/book-open-variant'
import IconLitterature from '~icons/mdi/feather'
import IconPrononciation from '~icons/mdi/account-voice'
import IconMusique from '~icons/mdi/music-note-outline'
import IconVocabulaire from '~icons/mdi/alphabetical-variant'
import IconConversation from '~icons/mdi/chat-outline'
import IconTheme from '~icons/mdi/lightbulb-outline'
import IconAbout from '~icons/mdi/information-outline'
import IconContact from '~icons/mdi/email-outline'
import IconDefault from '~icons/mdi/file-document-outline'

const icons = {
  home:          IconHome,
  grammaire:     IconGrammaire,
  orthographe:   IconOrthographe,
  conjugaison:   IconConjugaison,
  astuces:       IconAstuces,
  dictees:       IconDictees,
  exercices:     IconExercices,
  lecture:       IconLecture,
  litterature:   IconLitterature,
  prononciation: IconPrononciation,
  musique:       IconMusique,
  vocabulaire:   IconVocabulaire,
  conversation:  IconConversation,
  theme:         IconTheme,
  about:         IconAbout,
  contact:       IconContact,
  default:       IconDefault,
}

const props = defineProps({
  name: { type: String, default: 'default' },
  size: { type: String, default: '1.15rem' },
})

const sizeStyle = computed(() => ({ width: props.size, height: props.size }))
</script>
