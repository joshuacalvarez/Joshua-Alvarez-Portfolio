const ART_INTRO_KEY = "seenArtIntro";

const artIntro = document.getElementById("art-intro");
const skipArtIntro = document.getElementById("skip-art-intro");
const replayArtIntro = document.getElementById("replay-art-intro");

let currentNoteIndex = 0;
let notes = [];
let isRunning = false;
let loaderCheckInterval = null;

function getNotes() {
    return Array.from(document.querySelectorAll(".sticky-note"));
}

function playIntroVideos() {
    if (!artIntro) return;

    const videos = artIntro.querySelectorAll("video");

    videos.forEach((video) => {
        video.currentTime = 0;
        video.play().catch(() => { });
    });
}

function pauseIntroVideos() {
    if (!artIntro) return;

    const videos = artIntro.querySelectorAll("video");

    videos.forEach((video) => {
        video.pause();
    });
}

function resetNotes() {
    notes.forEach((note) => {
        note.classList.remove("is-active", "is-final");
    });
}

function playCurrentNote() {
    if (!isRunning) return;

    if (currentNoteIndex >= notes.length) {
        hideArtIntro();
        return;
    }

    const note = notes[currentNoteIndex];
    const isLastNote = currentNoteIndex === notes.length - 1;

    note.classList.remove("is-active", "is-final");

    // Forces the CSS animation to restart cleanly.
    void note.offsetWidth;

    note.classList.add(isLastNote ? "is-final" : "is-active");

    note.addEventListener(
        "animationend",
        () => {
            if (!isRunning) return;

            currentNoteIndex += 1;

            if (isLastNote) {
                setTimeout(hideArtIntro, 350);
            } else {
                playCurrentNote();
            }
        },
        { once: true }
    );
}

function startStickyNotes() {
    if (!isRunning) return;

    playIntroVideos();
    playCurrentNote();
}

function isLoaderHidden(preloader) {
    if (!preloader) return true;

    const loaderStyles = getComputedStyle(preloader);

    return (
        preloader.style.display === "none" ||
        preloader.classList.contains("hidden") ||
        preloader.classList.contains("loaded") ||
        loaderStyles.opacity === "0" ||
        loaderStyles.visibility === "hidden"
    );
}

function startStickyNotesAfterLoader() {
    const preloader = document.getElementById("preloader");

    if (!preloader || isLoaderHidden(preloader)) {
        setTimeout(startStickyNotes, 150);
        return;
    }

    loaderCheckInterval = setInterval(() => {
        if (isLoaderHidden(preloader)) {
            clearInterval(loaderCheckInterval);
            loaderCheckInterval = null;

            setTimeout(startStickyNotes, 150);
        }
    }, 100);
}

function showArtIntro({ waitForLoader = false } = {}) {
    if (!artIntro) return;

    notes = getNotes();

    if (notes.length === 0) return;

    isRunning = true;
    currentNoteIndex = 0;

    artIntro.style.display = "block";
    artIntro.classList.remove("is-visible", "is-hiding");

    resetNotes();

    // Forces the overlay transition to restart cleanly.
    void artIntro.offsetWidth;

    artIntro.classList.add("is-visible");

    if (waitForLoader) {
        startStickyNotesAfterLoader();
    } else {
        startStickyNotes();
    }
}

function hideArtIntro() {
    if (!artIntro || artIntro.classList.contains("is-hiding")) return;

    isRunning = false;
    pauseIntroVideos();

    if (loaderCheckInterval) {
        clearInterval(loaderCheckInterval);
        loaderCheckInterval = null;
    }

    sessionStorage.setItem(ART_INTRO_KEY, "true");

    artIntro.classList.add("is-hiding");

    setTimeout(() => {
        artIntro.classList.remove("is-visible", "is-hiding");
        artIntro.style.display = "none";
        resetNotes();
    }, 450);
}

window.addEventListener("DOMContentLoaded", () => {
    const hasSeenIntro = sessionStorage.getItem(ART_INTRO_KEY);

    skipArtIntro?.addEventListener("click", hideArtIntro);

    replayArtIntro?.addEventListener("click", () => {
        showArtIntro();
    });

    if (!hasSeenIntro) {
        showArtIntro({ waitForLoader: true });
    }
});