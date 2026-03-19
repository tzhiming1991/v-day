let music, musicPlaying = false;

const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif"
];

let noClick = 0;
let runaway = false;

window.addEventListener("DOMContentLoaded", () => {
    music = document.getElementById("bg-music");
    music.volume = 0.3;
});

// 🔥 start music only after interaction (GitHub safe)
document.addEventListener("click", () => {
    if (!musicPlaying && music) {
        music.play().then(() => {
            musicPlaying = true;
            updateBtn();
        }).catch(() => {});
    }
}, { once: true });

function toggleMusic() {
    if (!music) return;

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

/* YES */
function handleYesClick() {
    localStorage.setItem("musicTime", music?.currentTime || 0);
    localStorage.setItem("musicPlaying", musicPlaying);

    window.location.href = "yes.html";
}

/* NO */
function handleNoClick() {
    noClick++;

    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const gif = document.getElementById("cat-gif");

    noBtn.textContent = "No way 😭";

    yesBtn.style.transform = `scale(${1 + noClick * 0.2})`;

    gif.src = gifStages[Math.min(noClick, gifStages.length - 1)];

    if (noClick > 4 && !runaway) {
        runaway = true;
        noBtn.style.position = "fixed";
        noBtn.addEventListener("mouseover", () => {
            noBtn.style.left = Math.random() * 80 + "%";
            noBtn.style.top = Math.random() * 80 + "%";
        });
    }
}
