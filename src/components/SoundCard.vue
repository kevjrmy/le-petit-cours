<template>
  <div class="sound-card">
    <div class="letter">
      {{ letter || syllable }}
    </div>
    <p class="word">{{ word }}</p>
  </div>
</template>

<script setup>
defineProps({
  letter: {
    type: String,
    default: ''
  },
  syllable: {
    type: String,
    default: ''
  },
  word: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.sound-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.sound-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.letter {
  font-size: 3rem;
  font-weight: bold;
  color: #9333ea;
  margin-bottom: 0.75rem;
}

.word {
  font-size: 1.25rem;
  color: #374151;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 768px) {
  .letter {
    font-size: 2.5rem;
  }

  .word {
    font-size: 1rem;
  }
}
</style>