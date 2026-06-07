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

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      speed = 1500;
    }

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
          form.reset();
        })
        .catch((error) => {
          console.log("FAILED...", error);
        });
    });
  }

  // =========================
  // Close Mobile Menu After Link Click
  // =========================
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll("#nav-menu a");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    });
  });

  // =========================
  // Close Mobile Menu On Back / Outside Click
  // =========================
  document.addEventListener("click", function (e) {
    const menuToggle = document.querySelector(".menu-toggle");

    if (
      navMenu &&
      menuToggle &&
      !navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navMenu.classList.remove("active");
    }
  });

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
  const allNavLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

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

      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });

});

// =========================
// OUTSIDE FUNCTIONS
// =========================

// Mobile menu
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");

  if (navMenu) {
    navMenu.classList.toggle("active");
  }
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
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  const navMenu = document.getElementById("nav-menu");

  if (navMenu) {
    navMenu.classList.remove("active");
  }
}
const projects = [
  {
    title: "AgriFlow",
    description: "A smart agriculture assistant that helps users with farming-related guidance using modern frontend and backend technologies.",
    tools: ["React.js", "Vite", "Node.js", "Express.js", "Tailwind CSS"],
    image: "images/agriflow.png",
    demo: "https://agriflow-frontend-mdvz.vercel.app",
    code: "https://github.com/pavani976/Agriflow-Frontend"
  },
  {
    title: "Voice AI Assistant",
    description: "An AI-based voice assistant project that responds to user commands and improves interaction through voice features.",
    tools: ["HTML", "CSS", "JavaScript"],
    image: "images/voice.png",
    demo: "#",
    code: "https://github.com/pavani976/Voice-AI-Assistent"
  },
  {
  title: "WeatherHub",
  description: "Real-time weather forecasting platform with location-based weather updates, hourly predictions, temperature conversion, and responsive user interface.",
  tools: [
    "HTML",
    "CSS",
    "JavaScript",
    "Weather API",
    "Geolocation API"
  ],
  image: "images/weather.png",
  demo: "https://weather-forcast-woad.vercel.app/",
  code: "https://github.com/pavani976/Weather-Forcast"
},
  {
    title: "Coffee Website",
    description: "A modern and responsive coffee website built with smooth UI, clean layout, and user-friendly design.",
    tools: ["HTML", "CSS", "JavaScript"],
    image: "images/Coffee.png",
    demo: "https://pavani-coffee-project.netlify.app/",
    code: "https://github.com/pavani976/Coffee-website"
  },
  
];

let currentProject = 0;

function showProject(index) {
  const project = projects[index];

  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-img").src = project.image;

  const toolsBox = document.getElementById("project-tools");
  toolsBox.innerHTML = "";

  project.tools.forEach(tool => {
    const span = document.createElement("span");
    span.textContent = tool;
    toolsBox.appendChild(span);
  });

  document.getElementById("live-demo-btn").onclick = function () {
    if (project.demo !== "#") {
      window.open(project.demo, "_blank");
    }
  };

  document.getElementById("code-btn").onclick = function () {
    window.open(project.code, "_blank");
  };
}

function nextProject() {
  currentProject++;

  if (currentProject >= projects.length) {
    currentProject = 0;
  }

  showProject(currentProject);
}

function prevProject() {
  currentProject--;

  if (currentProject < 0) {
    currentProject = projects.length - 1;
  }

  showProject(currentProject);
}

document.addEventListener("DOMContentLoaded", function () {
  showProject(currentProject);
});