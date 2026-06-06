<template>
    <AltLayout title="La vie en rose">
        <main class="song-container">
            <div class="song-header">
                <span class="difficulty-tag">🌟 Niveau Facile</span>
                <p class="artist-info">Édith Piaf</p>
            </div>

            <div class="song-content">
                <!-- YouTube Video -->
                <section class="video-section">
                    <h2>Écoute la chanson</h2>
                    <div class="video-wrapper">
                        <iframe 
                            width="100%" 
                            height="300" 
                            src="https://www.youtube.com/embed/gy1B3ag7-Yc" 
                            title="La vie en rose - Édith Piaf"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </section>

                <!-- Lyrics -->
                <section class="lyrics-section">
                    <h2>Les paroles</h2>
                    <div class="lyrics">
                        <p><em>Quand il me prend dans ses bras<br>
                        Il me parle tout bas<br>
                        Je vois la vie en rose<br><br>

                        Il me dit des mots d'amour<br>
                        Des mots de tous les jours<br>
                        Et ça me fait quelque chose<br><br>

                        Il me dit des mots d'amour<br>
                        Des mots de tous les jours<br>
                        Et ça me fait quelque chose<br><br>

                        Je suis toute rose<br>
                        Et je sens en moi<br>
                        Mon cœur qui s'expose<br>
                        Et qui crie à la fois...</em></p>
                    </div>
                </section>

                <!-- Context -->
                <section class="context-section">
                    <details class="context-box">
                        <summary>🎭 Contexte culturel</summary>
                        <div class="context-content">
                            <p>"La vie en rose" est la chanson emblématique d'Édith Piaf, créée en 1946. C'est une chanson d'amour romantique qui est devenue l'hymne du romantisme français dans le monde entier.</p>
                            <p>Édith Piaf (1915-1963) est l'une des plus grandes chanteuses françaises de tous les temps. Cette chanson raconte simplement comment l'amour transforme la vision du monde - tout devient rose, c'est-à-dire beau et merveilleux.</p>
                            <p>La mélodie simple et douce en fait une chanson facile à écouter pour les apprenants du français !</p>
                        </div>
                    </details>
                </section>

                <div class="song-footer">
                    <RouterLink to="/musique" class="btn-back">← Retour à la musique</RouterLink>
                </div>
            </div>
        </main>
    </AltLayout>
</template>

<script setup>
import AltLayout from '@/layouts/AltLayout.vue'
</script>

<style scoped>
.song-container {
    padding: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
}

.song-header {
    margin-bottom: 2rem;
    text-align: center;
}

.difficulty-tag {
    display: inline-block;
    background: #e8f5e9;
    color: #2e7d32;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
}

.artist-info {
    margin: 1rem 0 0 0;
    font-style: italic;
    color: var(--clr-alt-text);
}

.song-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.video-section h2,
.lyrics-section h2,
.context-section h2 {
    font-size: 1.3rem;
    color: var(--clr-text);
    margin-bottom: 1rem;
}

.video-wrapper {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--box-shadow);
}

.lyrics-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid var(--clr-border);
}

.lyrics {
    line-height: 1.8;
    color: var(--clr-text);
    font-size: 1rem;
}

.lyrics p {
    margin: 0;
}

.context-section {
    margin-bottom: 1rem;
}

.context-box {
    background: white;
    border: 1px solid var(--clr-border);
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
}

.context-box summary {
    font-weight: bold;
    color: var(--clr-text);
    outline: none;
    user-select: none;
}

.context-box summary:hover {
    color: var(--clr-primary);
}

.context-content {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--clr-border);
    color: var(--clr-alt-text);
    line-height: 1.6;
}

.context-content p {
    margin: 0.8rem 0;
}

.song-footer {
    text-align: center;
    margin-top: 2rem;
}

.btn-back {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: var(--clr-primary);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.btn-back:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
