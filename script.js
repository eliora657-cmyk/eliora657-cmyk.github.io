
/* =========================================
   MARIE CASSANDRE ABINAN — PORTFOLIO
   Interactions et animations
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const typingText = document.getElementById("typingText");
  const currentYear = document.getElementById("currentYear");

  // ANNEE AUTOMATIQUE
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // MENU MOBILE
  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // ANIMATIONS AU DEFILEMENT
  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // BARRE DE PROGRESSION + NAVBAR
  let ticking = false;

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;

    header.classList.toggle("scrolled", scrollTop > 30);
    backToTop.classList.toggle("visible", scrollTop > 500);

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollUI);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateScrollUI();

  // RETOUR EN HAUT
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  // NAVIGATION ACTIVE
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;

            navItems.forEach((link) => {
              const isActive =
                link.getAttribute("href") === `#${activeId}`;

              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // TEXTE QUI S'ECRIT AUTOMATIQUEMENT
  if (typingText && !reduceMotion) {
    const phrases = [
      "la performance.",
      "la logistique.",
      "l'amélioration continue.",
      "l'innovation industrielle."
    ];

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;

    function typeEffect() {
      const phrase = phrases[phraseIndex];

      if (deleting) {
        characterIndex--;
      } else {
        characterIndex++;
      }

      typingText.textContent = phrase.substring(
        0,
        characterIndex
      );

      let delay = deleting ? 45 : 75;

      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 300;
      }

      window.setTimeout(typeEffect, delay);
    }

    window.setTimeout(typeEffect, 1800);
  }

  // ANNEE ET LIENS : tout est prêt
  console.log("Portfolio de Marie Cassandre Abinan chargé.");

});
