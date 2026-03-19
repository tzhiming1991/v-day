let musicPlaying = false;
const music = document.getElementById('bg-music');

window.addEventListener('load', () => {
    launchConfetti();

    if (!music) return;

    const savedTime = localStorage.getItem('musicTime');
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    if (wasPlaying) {
        music.volume = 0;
        music.play().then(() => {
            fadeInMusic();
            musicPlaying = true;
            updateButton();
        }).catch(() => {});
    }
});

// 🎵 Smooth fade-in
function fadeInMusic() {
    let vol = 0;

    const fade = setInterval(() => {
        vol += 0.05;

        if (vol >= 0.3) {
            music.volume = 0.3;
            clearInterval(fade);
        } else {
            music.volume = vol;
        }
    }, 100);
}

// 🔊 Toggle music (ONLY ONE VERSION)
function toggleMusic() {
    if (!music) return;

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        localStorage.setItem('musicPlaying', 'false');
    } else {
        music.play().then(() => {
            musicPlaying = true;
            localStorage.setItem('musicPlaying', 'true');
        }).catch(() => {});
    }

    updateButton();
}

// 🔘 Button UI sync
function updateButton() {
    const btn = document.getElementById('music-toggle');
    if (!btn) return;

    btn.textContent = musicPlaying ? '🔊' : '🔇';
}

// 💾 Save progress before leaving
window.addEventListener('beforeunload', () => {
    if (!music) return;

    localStorage.setItem('musicTime', music.currentTime);
    localStorage.setItem('musicPlaying', musicPlaying);
});

// 🎉 Confetti (unchanged, just cleaned)
function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00'];
    const duration = 6000;
    const end = Date.now() + duration;

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    });

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        });

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        });
    }, 300);
}
