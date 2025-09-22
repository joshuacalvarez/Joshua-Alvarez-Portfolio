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

  function applyVideoSources(){
    [artIntroVideo, techIntroVideo].forEach(v => {
      if(!v) return;
      const src = mq.matches ? v.dataset.srcMobile : v.dataset.srcDesktop;
      
      if (src && v.dataset.activeSrc !== src){
        v.src = src;
        v.onload();
        v.dataset.activeSrc = src;
      }
    })
  }


  applyVideoSources();

  // ART VIDEO
   if (artHitbox && artVideoOverlay && artIntroVideo) {
    artHitbox.addEventListener("click", (e) => {
      e.preventDefault();

      document.getElementById("pageBlocker").style.display = "block";

      if (artPaper) artPaper.style.display = "none";
      if (techPaper?.querySelector("img")) {
        techPaper.querySelector("img").style.filter =
          "brightness(0.5) blur(2px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))";
      }
      artVideoOverlay.style.display = "block";
      if (artUnder) artUnder.style.display = "block";

      safePlay(artIntroVideo);

      artIntroVideo.onended = () => {
        document.getElementById("pageBlocker").style.display = "none";
        window.location.href = "/art/";
      };
    });
  }

  if (techHitbox && techVideoOverlay && techIntroVideo) {
    techHitbox.addEventListener("click", (e) => {
      e.preventDefault();

      document.getElementById("pageBlocker").style.display = "block";

      if (techPaper) techPaper.style.display = "none";
      if (artPaper?.querySelector("img")) {
        artPaper.querySelector("img").style.filter =
          "brightness(0.5) blur(2px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))";
      }
      techVideoOverlay.style.display = "block";
      if (techUnder) techUnder.style.display = "block";

      safePlay(techIntroVideo);

      techIntroVideo.onended = () => {
        document.getElementById("pageBlocker").style.display = "none";
        window.location.href = "/tech/";
      };
    });
  }

});


window.addEventListener("pageshow", (event) => {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    location.reload();
  }
});

window.addEventListener("unload", () => {
  Array.from(document.getElementsByClassName("video-overlay")).forEach(el => {
    el.style.display = "none";
  });
  Array.from(document.getElementsByTagName("video")).forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
});
