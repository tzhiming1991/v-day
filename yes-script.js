let musicPlaying = false;

window.addEventListener('load', () => {
    launchConfetti();

    const music = document.getElementById('bg-music')

    const savedTime = localStorage.getItem('musicTime')
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true'

    if (savedTime) music.currentTime = parseFloat(savedTime)

    if (wasPlaying) {
        music.volume = 0
        music.play().then(() => {
            fadeInMusic(music)
            musicPlaying = true
            document.getElementById('music-toggle').textContent = '🔊'
        }).catch(() => {})
    }
})

// Fade-in function
function fadeInMusic(music) {
    let vol = 0
    const fade = setInterval(() => {
        vol += 0.05
        if (vol >= 0.3) {
            music.volume = 0.3
            clearInterval(fade)
        } else {
            music.volume = vol
        }
    }, 100)
}

// Toggle
function toggleMusic() {
    const music = document.getElementById('bg-music')

    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        localStorage.setItem('musicPlaying', 'false')
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        localStorage.setItem('musicPlaying', 'true')
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

// Save position
window.addEventListener('beforeunload', () => {
    const music = document.getElementById('bg-music')
    localStorage.setItem('musicTime', music.currentTime)
})

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

function toggleMusic() {
    const music = document.getElementById('bg-music');

    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        document.getElementById('music-toggle').textContent = '🔇';
    } else {
        music.play();
        musicPlaying = true;
        document.getElementById('music-toggle').textContent = '🔊';
    }
}
