const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");
const toast = document.getElementById("tease-toast");

let noClicks = 0;
let musicPlaying = false;

// MUSIC AUTOPLAY FIX (browser requires user interaction)
document.addEventListener("click", async () => {
    if (!musicPlaying && music) {
        try {
            await music.play();
            musicPlaying = true;
            toggleBtn.textContent = "🔊";
        } catch (err) {
            console.log("Audio blocked:", err);
        }
    }
}, { once: true });

// TOGGLE MUSIC
if (toggleBtn && music) {
    toggleBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            toggleBtn.textContent = "🔊";
        } else {
            music.pause();
            toggleBtn.textContent = "🔇";
        }
    });
}

// YES BUTTON
yesBtn.addEventListener("click", () => {
    window.location.href = "yes.html";
});

// NO BUTTON GROWS YES + TEASE
noBtn.addEventListener("click", () => {
    noClicks++;

    let size = 1 + noClicks * 0.2;
    yesBtn.style.transform = `scale(${size})`;

    const messages = [
        "Are you sure? 🥺",
        "Think again... 💔",
        "Last chance 😭",
        "Don't do this 😢",
        "I'll be sad..."
    ];

    toast.innerText = messages[Math.min(noClicks - 1, messages.length - 1)];

    if (noClicks >= 5) {
        noBtn.style.display = "none";
        toast.innerText = "You have no choice anymore 😈";
    }
});
