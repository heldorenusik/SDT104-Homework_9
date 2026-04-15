(function () {
  const toggle = document.querySelector(".nav-menu-toggle");
  const overlay = document.getElementById("site-nav-overlay");
  if (!toggle || !overlay) return;

  const backdrop = overlay.querySelector("[data-nav-overlay-dismiss]");
  const closeBtn = overlay.querySelector(".nav-overlay__close");
  const focusableSelector = 'a[href], button:not([disabled]):not([hidden])';

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function getFocusables() {
    return Array.from(overlay.querySelectorAll(focusableSelector));
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    overlay.removeAttribute("hidden");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-menu-open");
    closeBtn?.focus();
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    overlay.setAttribute("hidden", "");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-menu-open");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  backdrop?.addEventListener("click", closeMenu);

  overlay.querySelectorAll(".nav-overlay__list a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      e.preventDefault();
      closeMenu();
    }

    if (e.key !== "Tab" || !isOpen()) return;

    const focusables = getFocusables();
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
