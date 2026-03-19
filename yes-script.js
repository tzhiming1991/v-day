let musicPlaying = false;
const music = document.getElementById("bg-music");

function toggleMusic() {
    if (!musicPlaying) {
        music.play();
        musicPlaying = true;
        document.getElementById("music-toggle").innerText = "🔇";
    } else {
        music.pause();
        musicPlaying = false;
        document.getElementById("music-toggle").innerText = "🔊";
    }
}

    launchConfetti();

    if (wasPlaying) {
        music.volume = 0;
        music.play().then(() => {
            fadeIn();
            musicPlaying = true;
            updateBtn();
        });
    }
});

function fadeIn() {
    let v = 0;
    const fade = setInterval(() => {
        v += 0.05;
        if (v >= 0.3) {
            music.volume = 0.3;
            clearInterval(fade);
        } else {
            music.volume = v;
        }
    }, 100);
}

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

window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", music.currentTime);
    localStorage.setItem("musicPlaying", musicPlaying);
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
    }, 300);
}
