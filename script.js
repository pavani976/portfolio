// WAIT UNTIL PAGE LOADS
document.addEventListener("DOMContentLoaded", function () {

const roles = [
  "Frontend Developer",
  "Web Designer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingEl = document.getElementById("typing");
  if (!typingEl) return;

  let currentRole = roles[roleIndex];

  // FIXED LOGIC
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingEl.textContent = currentRole.substring(0, charIndex);

  let speed = isDeleting ? 50 : 100;

  // WHEN WORD COMPLETE
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    speed = 1500; // pause
  }

  // WHEN WORD DELETED
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

  // =========================
  // EmailJS Init
  // =========================
  (function () {
    emailjs.init("CujLKAWf8wXNteKDK");
  })();

  // =========================
  // Contact Form
  // =========================
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_r4mh729", "template_h8f80za", this)
        .then(() => {
          showPopup();
        })
        .catch((error) => {
          console.log("FAILED...", error);
        });
    });
  }

  // =========================
  // Scroll Animation
  // =========================
  const elements = document.querySelectorAll(".hidden");

  window.addEventListener("scroll", () => {
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });
  });

  // =========================
  // Active Navbar Highlight
  // =========================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

});

// =========================
// OUTSIDE FUNCTIONS
// =========================

// Mobile menu
function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}

// Open project
function openProject(link) {
  window.open(link, "_blank");
}

// Popup
function showPopup() {
  const popup = document.getElementById("popup");
  if (!popup) return;

  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Scroll buttons (Hire Me / View Work)
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
// =========================
// 3D TILT EFFECT
// =========================
const cards = document.querySelectorAll(".about-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    // glow follow mouse
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});