let musicPlaying = false;

let catGif, yesBtn, noBtn, music;

window.addEventListener('DOMContentLoaded', () => {
    catGif = document.getElementById('cat-gif');
    yesBtn = document.getElementById('yes-btn');
    noBtn = document.getElementById('no-btn');
    music = document.getElementById('bg-music');

    if (music) {
        music.volume = 0.3;
    }

    launchConfetti();
});

// safe autoplay (GitHub Pages friendly)
window.addEventListener('click', () => {
    if (music && !musicPlaying) {
        music.play().catch(() => {});
        musicPlaying = true;
        updateMusicButton();
    }
}, { once: true });

function toggleMusic() {
    if (!music) return;

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
    } else {
        music.play().catch(() => {});
        musicPlaying = true;
    }

    updateMusicButton();
}

function updateMusicButton() {
    const btn = document.getElementById('music-toggle');
    if (!btn) return;
    btn.textContent = musicPlaying ? '🔊' : '🔇';
}
