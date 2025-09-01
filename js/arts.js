const modal    = document.getElementById("artModal");
const img      = document.getElementById("artImg");
const modalImg = document.getElementById("imgExpanded");
const closeBtn = document.getElementsByClassName("close")[0];

function openModal() {
  modalImg.src = img.src;
  modal.classList.add("show");       // triggers fade-in
}

function closeModal() {
  modal.classList.remove("show");    // triggers fade-out
}

img.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
