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

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.reveal-btn');
    if (!btn) return;
    const box = btn.closest('.censor-box');
    box.classList.add('revealed');
});


// close behaviors
function closeModal() { modal.classList.remove("show"); }
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });


