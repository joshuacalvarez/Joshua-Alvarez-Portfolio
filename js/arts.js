const modal    = document.getElementById("artModal");
const modalImg = document.getElementById("imgExpanded");
const closeBtn = document.querySelector(".modal .close");

document.addEventListener("click", (e) => {
    const img = e.target.closest('img.painting');
    if (!img) return;

    const box = img.closest('.censor-box');
    if (box && !box.classList.contains('revealed')) {
        // still censored — do nothing (or auto-reveal)
        return;
    }

    // use data-full if provided, else the thumb src
    modalImg.src = img.dataset.full || img.src;
    modalImg.alt = img.alt || "";
    modal.classList.add("show");
});

// Open modal only if not censored
document.addEventListener("click", (e) => {
  const img = e.target.closest("img.painting");
  if (!img) return;

  const card = img.closest(".painting");
  const box  = card?.querySelector(".censor-box");
  if (box && !box.classList.contains("revealed")) return; // still censored

  modalImg.src = img.dataset.full || img.src;
  modalImg.alt = img.alt || "";
  modal.classList.add("show");
});

// Toggle censoring
document.addEventListener("click", (e) => {
  // Reveal
  const revealBtn = e.target.closest(".reveal-btn");
  if (revealBtn) {
    const card = revealBtn.closest(".painting");
    const box  = card.querySelector(".censor-box");
    box.classList.add("revealed");

    // show the recensor button that's OUTSIDE the box (but in the same card)
    const recensor = card.querySelector(".recensor-btn");
    if (recensor) recensor.classList.add("recensor-btn-revealed");
    return;
  }

  // Re-censor (button is outside the box)
  const recensorBtn = e.target.closest(".recensor-btn");
  if (recensorBtn) {
    const card = recensorBtn.closest(".painting");
    const box  = card.querySelector(".censor-box");
    box?.classList.remove("revealed");

    recensorBtn.classList.remove("recensor-btn-revealed");
    return;
  }
});



// close behaviors
function closeModal() { modal.classList.remove("show"); }
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });


