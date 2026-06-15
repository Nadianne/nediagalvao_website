document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  const aboutModal = document.getElementById("aboutModal");
  const openAboutButtons = document.querySelectorAll(".open-about-modal");
  const closeAboutButton = document.querySelector(".about-modal-close");
  const aboutOverlay = document.querySelector(".about-modal-overlay");

  function openAboutModal(event) {
    if (event) {
      event.preventDefault();
    }

    if (aboutModal) {
      aboutModal.classList.add("active");
      aboutModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    if (nav) {
      nav.classList.remove("open");
    }
  }

  function closeAboutModal() {
    if (aboutModal) {
      aboutModal.classList.remove("active");
      aboutModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }
  }

  openAboutButtons.forEach(function (button) {
    button.addEventListener("click", openAboutModal);
  });

  if (closeAboutButton) {
    closeAboutButton.addEventListener("click", closeAboutModal);
  }

  if (aboutOverlay) {
    aboutOverlay.addEventListener("click", closeAboutModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAboutModal();
    }
  });

  const downloadLinks = document.querySelectorAll(".download-link");

  downloadLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const material = link.dataset.material || "Material não informado";
      const downloadName = link.dataset.downloadName || "Download não informado";
      const downloadType = link.dataset.downloadType || "PDF";
      const fileUrl = link.href;

      if (typeof window.gtag === "function") {
        window.gtag("event", "download_material", {
          material_name: material,
          download_name: downloadName,
          download_type: downloadType,
          file_url: fileUrl,
          page_title: document.title,
          page_path: window.location.pathname
        });
      }
    });
  });
  const contentRows = document.querySelectorAll(".content-row");

  contentRows.forEach(function (row) {
    const scrollArea = row.querySelector(".content-scroll");
    const prevButton = row.querySelector(".row-arrow.prev");
    const nextButton = row.querySelector(".row-arrow.next");

    if (!scrollArea || !prevButton || !nextButton) {
      return;
    }

    function getScrollAmount() {
      const firstCard = scrollArea.querySelector(".content-card");

      if (!firstCard) {
        return 300;
      }

      const cardWidth = firstCard.getBoundingClientRect().width;
      return cardWidth + 24;
    }

    function updateButtons() {
      const maxScrollLeft = scrollArea.scrollWidth - scrollArea.clientWidth;

      prevButton.disabled = scrollArea.scrollLeft <= 4;
      nextButton.disabled = scrollArea.scrollLeft >= maxScrollLeft - 4;
    }

    prevButton.addEventListener("click", function () {
      scrollArea.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    nextButton.addEventListener("click", function () {
      scrollArea.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });

    scrollArea.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    updateButtons();
  });
});