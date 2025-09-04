const modal    = document.getElementById("artModal");
const modalImg = document.getElementById("imgExpanded");
const closeBtn = document.querySelector(".modal .close");

// Open modal for any .modalable image
document.addEventListener("click", (e) => {
  const img = e.target.closest("img.modalable");
  if (!img) return;

  const card = img.closest("[data-card]");
  const box  = card?.querySelector(".censor-box");

  // If there's a censor box on this card, require it to be revealed first.
  if (box && !box.classList.contains("revealed")) return;

  modalImg.src = img.dataset.full || img.src;
  modalImg.alt = img.alt || "";
  modal.classList.add("show");
});

document.addEventListener("click", (e) => {
  // Reveal
  const revealBtn = e.target.closest(".reveal-btn");
  if (revealBtn) {
    const card = revealBtn.closest(".painting");
    const box  = card?.querySelector(".censor-box");
    if (!box) return;
    box.classList.add("revealed");

    const recensor = card.querySelector(".recensor-btn");
    if (recensor) recensor.classList.add("recensor-btn-revealed");
    return;
  }

  // Re-censor (button is outside the box)
  const recensorBtn = e.target.closest(".recensor-btn");
  if (recensorBtn) {
    const card = recensorBtn.closest(".painting");
    const box  = card?.querySelector(".censor-box");
    if (box) box.classList.remove("revealed");
    recensorBtn.classList.remove("recensor-btn-revealed");
  }
});

// Close behaviors
function closeModal() { modal.classList.remove("show"); }
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
