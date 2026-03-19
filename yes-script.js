let musicPlaying = false;
const music = document.getElementById("bg-music");

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
    } else {
        music.play();
        musicPlaying = true;
    }
    updateBtn();
}

function updateBtn() {
    document.getElementById("music-toggle").textContent =
        musicPlaying ? "🔊" : "🔇";
}

// optional: confetti on load
window.addEventListener("load", () => {
    launchConfetti();
});

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    setInterval(() => {
        confetti({
            particleCount: 40,
            spread: 80,
            origin: { x: Math.random(), y: 0 }
        });
    }, 3000);
}

// save state
window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", music.currentTime);
    localStorage.setItem("musicPlaying", musicPlaying);
});
