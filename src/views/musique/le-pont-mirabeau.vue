<template>
    <AltLayout title="Le pont Mirabeau">
        <main class="song-container">
            <div class="song-header">
                <span class="difficulty-tag">⭐ Niveau Intermédiaire</span>
                <p class="artist-info">Guillaume Apollinaire (poème) / Marc Lavoine (version musicale populaire)</p>
            </div>

            <div class="song-content">
                <!-- YouTube Video -->
                <section class="video-section">
                    <h2>Écoute la chanson</h2>
                    <div class="video-wrapper">
                        <iframe 
                            width="100%" 
                            height="300" 
                            src="https://www.youtube.com/embed/6K-U4x1Wl44" 
                            title="Le pont Mirabeau - Marc Lavoine"
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
                        <p><em>Sous le pont Mirabeau coule la Seine<br>
                        Et nos amours<br>
                        Faut-il qu'il m'en souvienne<br>
                        La joie venait toujours après la peine<br><br>

                        Vienne la nuit sonne l'heure<br>
                        Les jours s'en vont je demeure<br><br>

                        Les mains dans les mains restons face à face<br>
                        Tandis que sous<br>
                        Le pont de nos bras passe<br>
                        Des éternels regards l'onde si lasse<br><br>

                        Vienne la nuit sonne l'heure<br>
                        Les jours s'en vont je demeure<em></p>
                    </div>
                </section>

                <!-- Context -->
                <section class="context-section">
                    <details class="context-box">
                        <summary>🎭 Contexte culturel et littéraire</summary>
                        <div class="context-content">
                            <p>"Le pont Mirabeau" est un poème écrit par Guillaume Apollinaire en 1912. C'est l'un des plus grands poèmes français sur le thème du temps qui passe et des amours perdues.</p>
                            <p>Le pont Mirabeau est un vrai pont à Paris, qui traverse la Seine. Apollinaire y promenait avec sa bien-aimée, et le poème exprime la mélancolie de voir les jours s'écouler tandis que l'amour s'éloigne comme l'eau sous le pont.</p>
                            <p>Le refrain "Vienne la nuit sonne l'heure / Les jours s'en vont je demeure" reflète la philosophie française : même quand le temps passe et que les jours disparaissent, on reste, on persiste. C'est une méditation profonde sur l'impermanence.</p>
                            <p>Marc Lavoine a créé une version musicale moderne et accessible de ce classique littéraire.</p>
                            <p><strong>Vocabulaire important :</strong> "coule" (flows), "sonne" (rings), "l'onde" (the wave), "demeure" (remain).</p>
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
    background: #fff3e0;
    color: #ef6c00;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
}

.artist-info {
    margin: 1rem 0 0 0;
    font-style: italic;
    color: var(--clr-alt-text);
    font-size: 0.95rem;
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
