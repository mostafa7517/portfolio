// ===== RESUME TOGGLE =====
const resumeToggle = document.getElementById("resumeToggle");
const resumeContent = document.getElementById("resumeContent");
const toggleText = resumeToggle.querySelector("span");

resumeToggle.addEventListener("click", () => {
  const isExpanded = resumeContent.classList.contains("show");

  if (isExpanded) {
    // Hide resume
    resumeContent.classList.remove("show");
    resumeToggle.classList.remove("expanded");
    toggleText.textContent = "View Resume";
    resumeToggle.querySelector("i:first-child").className =
      "fas fa-eye me-2";
  } else {
    // Show resume
    resumeContent.classList.add("show");
    resumeToggle.classList.add("expanded");
    toggleText.textContent = "Hide Resume";
    resumeToggle.querySelector("i:first-child").className =
      "fas fa-eye-slash me-2";

    // Animate resume elements
    setTimeout(() => {
      const resumeElements = resumeContent.querySelectorAll(".animate-text");
      resumeElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("visible");
        }, index * 100);
      });
    }, 300);
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

// Load theme from storage or fallback
const savedTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .service-card, .portfolio-card, .animate-text, section"
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// ===== PARALLAX HERO =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});
