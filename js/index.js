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



  // ART VIDEO
  if (artHitbox && artVideoOverlay && artIntroVideo) {
    artHitbox.addEventListener("click", (e) => {
      // Show the video overlay
      e.preventDefault();

      document.getElementById("pageBlocker").style.display = "block"; // activate blocker

      artPaper.style.display = "none";
      techPaper.querySelector("img").style.filter = "brightness(0.5) blur(2px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))";
      artVideoOverlay.style.display = "block";
      artUnder.style.display = "block";
    
      artIntroVideo.play();

      // Redirect when video ends
      artIntroVideo.onended = () => {
        document.getElementById("pageBlocker").style.display = "none"; // remove blocker
        window.location.href = "art/";
      };
    });
  }

  // TECH VIDEO
  if (techHitbox && techVideoOverlay && techIntroVideo){
    techHitbox.addEventListener("click", (e) => {
      //Show overlay
      e.preventDefault();

      document.getElementById("pageBlocker").style.display = "block"; // activate blocker

      techPaper.style.display = "none";
      artPaper.querySelector("img").style.filter = "brightness(0.5) blur(2px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))";
      techVideoOverlay.style.display = "block";
      techUnder.style.display = "block";


      techIntroVideo.onended = () => {
        document.getElementById("pageBlocker").style.display = "none"; // remove blocker
        window.location.href = "tech/";
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
