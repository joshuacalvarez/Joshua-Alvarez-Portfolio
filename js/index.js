window.addEventListener("DOMContentLoaded", () => {
  const artHitbox = document.querySelector(".hitbox.art-click");
  const videoOverlay = document.getElementById("videoOverlay");
  const introVideo = document.getElementById("introVideo");

  const artPaper = document.querySelector(".click-area.art");
  const techPaper = document.querySelector(".click-area.tech");
  const artUnder = document.getElementById("Under-Art");


  if (artHitbox && videoOverlay && introVideo) {
    artHitbox.addEventListener("click", (e) => {
      // Show the video overlay
      e.preventDefault();
      artPaper.style.display = "none";
      techPaper.querySelector("img").style.filter = "brightness(0.5) blur(2px)";
      videoOverlay.style.display = "block";
      artUnder.style.display = "block";
    
      introVideo.play();

      // Redirect when video ends
      introVideo.onended = () => {
        window.location.href = "art.html";
      };
    });
  }
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    const videoOverlay = document.getElementById("videoOverlay");
    const introVideo = document.getElementById("introVideo");
    videoOverlay.style.display = "none";
    introVideo.pause();
    introVideo.currentTime = 0;
  }
});