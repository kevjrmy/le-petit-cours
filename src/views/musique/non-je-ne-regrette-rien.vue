<template>
    <AltLayout title="Non, je ne regrette rien">
        <main class="song-container">
            <div class="song-header">
                <span class="difficulty-tag">⭐ Niveau Intermédiaire</span>
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
                            src="https://www.youtube.com/embed/Q3Ksskx-zE8" 
                            title="Non, je ne regrette rien - Édith Piaf"
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
                        <p><em>Non, rien de rien<br>
                        Non, je ne regrette rien<br>
                        Ni le bien qu'on m'a fait<br>
                        Ni le mal, tout ça m'est bien égal<br><br>

                        Non, rien de rien<br>
                        Non, je ne regrette rien<br>
                        C'est payé, balayé, oublié<br>
                        Je me fous du passé<br><br>

                        Avec mes souvenirs<br>
                        J'ai allumé mon feu<br>
                        Mes chagrins, mes plaisirs<br>
                        Je n'ai besoin de rien<br>
                        Et je recommence ma vie<br>
                        À zéro...</em></p>
                    </div>
                </section>

                <!-- Context -->
                <section class="context-section">
                    <details class="context-box">
                        <summary>🎭 Contexte culturel</summary>
                        <div class="context-content">
                            <p>"Non, je ne regrette rien" est l'une des chansons les plus célèbres au monde, écrite en 1960 pour le film "Milord". C'est l'hymne de la résilience et de la dignité.</p>
                            <p>Édith Piaf a choisi cette chanson pour exprimer son philosophie de vie : regarder vers l'avant sans se regretter le passé. Les paroles reflètent sa vie tumultueuse et son courage face à l'adversité.</p>
                            <p>La chanson a une force dramatique particulière, avec une mélodie montante qui exprime la force et la détermination. Elle reste le symbole ultime de la chanson française dans le monde.</p>
                            <p>Les verbes au passé composé et l'absence de regret sont des thèmes importants pour comprendre la mentalité française !</p>
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
