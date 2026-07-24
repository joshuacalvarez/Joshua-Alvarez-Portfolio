const modal = document.querySelector("#project-modal");
const projectDetails = document.querySelectorAll(".Project-Details");
const closeButton = document.querySelector(".Project-Modal-Close");
const backdrop = document.querySelector(".Project-Modal-Backdrop");

function openProject(projectId) {
  projectDetails.forEach((details) => {
    const isSelected =
      details.dataset.projectDetails === projectId;

    details.classList.toggle("is-active", isSelected);
  });

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeProject() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";

  projectDetails.forEach((details) => {
    details.classList.remove("is-active");
  });
}

document.querySelectorAll(".Notebook-Card").forEach((card) => {
  card.addEventListener("click", () => {
    openProject(card.dataset.project);
  });
});

closeButton.addEventListener("click", closeProject);
backdrop.addEventListener("click", closeProject);