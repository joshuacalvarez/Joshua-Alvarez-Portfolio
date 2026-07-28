async function loadProjectModal() {
  const container = document.querySelector("#project-modal-container");

  if (!container) {
    console.warn("Project modal container was not found.");
    return;
  }

  try {
    const response = await fetch("/components/project-modal.fragment");

    if (!response.ok) {
      throw new Error(
        `Failed to load project modal: ${response.status}`
      );
    }

    container.innerHTML = await response.text();

    initializeProjectModal();
  } catch (error) {
    console.error("Could not load project modal:", error);
  }
}

function initializeProjectModal() {
  const modal = document.querySelector("#project-modal");

  if (!modal) {
    console.warn("Project modal was not found.");
    return;
  }

  /*
    Query modal elements from inside the modal whenever possible.
    This prevents accidentally selecting similarly named elements
    elsewhere on the page.
  */
  const projectDetails =
    modal.querySelectorAll(".Project-Details");

  const closeButton =
    modal.querySelector(".Project-Modal-Close");

  const backdrop =
    modal.querySelector(".Project-Modal-Backdrop");

  const previousButton =
    modal.querySelector(".Project-Page-Previous");

  const nextButton =
    modal.querySelector(".Project-Page-Next");

  const currentPageText =
    modal.querySelector(".Project-Current-Page");

  const totalPagesText =
    modal.querySelector(".Project-Total-Pages");

  const notebookCards =
    document.querySelectorAll(".Notebook-Card");


  const requiredElements = {
    closeButton,
    backdrop,
    previousButton,
    nextButton,
    currentPageText,
    totalPagesText,
  };

  const missingElements = Object.entries(requiredElements)
    .filter(([, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error(
      "Missing project modal elements:",
      missingElements
    );

    console.log("Loaded modal HTML:", modal.outerHTML);
    return;
  }

  let activeProject = null;
  let currentPageIndex = 0;
  let lastOpenedCard = null;

  function getActivePages() {
    if (!activeProject) {
      return [];
    }

    return [
      ...activeProject.querySelectorAll(".Project-Page")
    ];
  }

  function updatePages() {
    const pages = getActivePages();

    pages.forEach((page, index) => {
      const isActive = index === currentPageIndex;

      page.classList.toggle(
        "Project-Page--active",
        isActive
      );

      page.setAttribute(
        "aria-hidden",
        String(!isActive)
      );
    });

    currentPageText.textContent =
      String(currentPageIndex + 1);

    totalPagesText.textContent =
      String(pages.length);

    previousButton.disabled =
      currentPageIndex === 0;

    nextButton.disabled =
      currentPageIndex === pages.length - 1;
  }

  function openProject(projectId, card) {
    activeProject = null;

    projectDetails.forEach((details) => {
      const isSelected =
        details.dataset.projectDetails === projectId;

      details.classList.toggle(
        "is-active",
        isSelected
      );

      details.setAttribute(
        "aria-hidden",
        String(!isSelected)
      );

      if (isSelected) {
        activeProject = details;
      }
    });

    /*
      Do not open an empty modal when that project's
      detailed section has not been added yet.
    */
    if (!activeProject) {
      console.warn(
        `No project details found for "${projectId}".`
      );

      return;
    }

    lastOpenedCard = card;
    currentPageIndex = 0;

    updatePages();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeProject() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    projectDetails.forEach((details) => {
      details.classList.remove("is-active");
      details.setAttribute("aria-hidden", "true");
    });

    activeProject = null;
    currentPageIndex = 0;

    /*
      Return keyboard focus to the card that opened
      the modal.
    */
    if (lastOpenedCard) {
      lastOpenedCard.focus();
      lastOpenedCard = null;
    }
  }

  function turnPage(direction) {
    const pages = getActivePages();
    const nextPageIndex =
      currentPageIndex + direction;

    if (
      nextPageIndex < 0 ||
      nextPageIndex >= pages.length
    ) {
      return;
    }

    currentPageIndex = nextPageIndex;

    updatePages();
  }

  notebookCards.forEach((card) => {
    card.addEventListener("click", () => {
      openProject(card.dataset.project, card);
    });
  });

  previousButton.addEventListener("click", () => {
    turnPage(-1);
  });

  nextButton.addEventListener("click", () => {
    turnPage(1);
  });

  closeButton.addEventListener(
    "click",
    closeProject
  );

  backdrop.addEventListener(
    "click",
    closeProject
  );

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeProject();
    }

    if (event.key === "ArrowLeft") {
      turnPage(-1);
    }

    if (event.key === "ArrowRight") {
      turnPage(1);
    }
  });
}

document.addEventListener(
  "DOMContentLoaded",
  loadProjectModal
);