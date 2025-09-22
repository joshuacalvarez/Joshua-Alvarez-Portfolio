window.addEventListener("DOMContentLoaded", () => {
  const artHitbox = document.querySelector(".hitbox.art-click");
  const techHitbox = document.querySelector(".hitbox.tech-click");
  const artVideoOverlay = document.getElementById("artVideoOverlay");
  const techVideoOverlay = document.getElementById("techVideoOverlay");
  const artIntroVideo = document.getElementById("artIntroVideo");
  const techIntroVideo = document.getElementById("techIntroVideo");
  const artPaper = document.querySelector(".click-area.art");
  const techPaper = document.querySelector(".click-area.tech");
  const artUnder = document.getElementById("Under-Art");
  const techUnder = document.getElementById("Under-Tech");
  const mq = window.matchMedia("(max-width: 768px)");

  function safePlay(v) {
    if (!v) return;
    try { v.currentTime = 0; } catch {}
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.catch(() => {
        v.muted = true;
        v.play().catch(()=>{});
      });
    }
  }

  function routeOnEnd(video, href, onBeforeNav) {
    if (!video) return;
    let navigated = false;
    const nav = () => {
      if (navigated) return;
      navigated = true;
      if (typeof onBeforeNav === "function") onBeforeNav();
      window.location.assign(href);
    };
    video.addEventListener("ended", nav, { once: true });
    const nearEndCheck = () => {
      if (!isFinite(video.duration)) return;
      if (video.currentTime >= video.duration - 0.2) nav();
    };
    video.addEventListener("timeupdate", nearEndCheck);
    const armTimeout = () => {
      if (isFinite(video.duration) && video.duration > 0) {
        setTimeout(nav, Math.ceil(video.duration * 1000) + 300);
      } else {
        video.addEventListener("loadedmetadata", armTimeout, { once: true });
      }
    };
    armTimeout();
  }

  // ART
  if (artHitbox && artVideoOverlay && artIntroVideo) {
    artHitbox.addEventListener("click", (e) => {
      // Mobile → just route, no animation
      if (mq.matches) {
        window.location.assign("/art/");
        return;
      }

      // Desktop → keep your current animation flow
      e.preventDefault();
      const blocker = document.getElementById("pageBlocker");
      if (blocker) blocker.style.display = "block";
      if (artPaper) artPaper.style.display = "none";
      if (techPaper?.querySelector("img")) {
        techPaper.querySelector("img").style.filter =
          "brightness(0.5) blur(2px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))";
      }
      artVideoOverlay.style.display = "block";
      if (artUnder) artUnder.style.display = "block";
      safePlay(artIntroVideo);
      routeOnEnd(artIntroVideo, "/art/", () => {
        if (blocker) blocker.style.display = "none";
      });
    });
  }

  // TECH
  if (techHitbox && techVideoOverlay && techIntroVideo) {
    techHitbox.addEventListener("click", (e) => {
      // Mobile → just route, no animation
      if (mq.matches) {
        window.location.assign("/tech/");
        return;
      }

      // Desktop → keep your current animation flow
      e.preventDefault();
      const blocker = document.getElementById("pageBlocker");
      if (blocker) blocker.style.display = "block";
      if (techPaper) techPaper.style.display = "none";
      if (artPaper?.querySelector("img")) {
        artPaper.querySelector("img").style.filter =
          "brightness(0.5) blur(2px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))";
      }
      techVideoOverlay.style.display = "block";
      if (techUnder) techUnder.style.display = "block";
      safePlay(techIntroVideo);
      routeOnEnd(techIntroVideo, "/tech/", () => {
        if (blocker) blocker.style.display = "none";
      });
    });
  }
});

// Keep your existing pageshow/unload handlers as-is
window.addEventListener("pageshow", (event) => {
  const nav = performance.getEntriesByType("navigation")[0];
  if (event.persisted || (nav && nav.type === "back_forward")) {
    location.reload();
  }
});

window.addEventListener("unload", () => {
  document.querySelectorAll(".video-overlay").forEach(el => el.style.display = "none");
  document.querySelectorAll("video").forEach(v => { try { v.pause(); v.currentTime = 0; } catch {} });
});
