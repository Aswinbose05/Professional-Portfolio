/* =========================================================
   ASWIN B – AI ENGINEER PORTFOLIO
   Modern Frontend Scripts & Micro-interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     LOADER & INITIAL ANIMATIONS
     ========================================================= */
  const loader = document.getElementById("loader");
  function hideLoader() {
    if (loader && !loader.classList.contains("hide")) {
      loader.classList.add("hide");
      animateBars();
    }
  }
  window.addEventListener("load", () => setTimeout(hideLoader, 250));
  setTimeout(hideLoader, 800); // Failsafe so user never waits

  /* =========================================================
     SCROLL PROGRESS BAR & NAVBAR SCROLL
     ========================================================= */
  const scrollProgress = document.getElementById("scrollProgress");
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollProgress) {
      scrollProgress.style.width = scrolled + "%";
    }

    if (navbar) {
      navbar.classList.toggle("scrolled", winScroll > 30);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", winScroll > 400);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================================================
     CARD SPOTLIGHT EFFECT (MOUSE-FOLLOW GLOW)
     ========================================================= */
  const spotlightCards = document.querySelectorAll(".glass, .project-card, .skill-group, .info-card, .cert-card");

  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* =========================================================
     TYPING EFFECT
     ========================================================= */
  (function initTyping() {
    const roles = [
      "AI Engineer",
      "Agentic AI Builder",
      "Generative AI Developer",
      "RAG Systems Specialist",
      "Full Stack Developer"
    ];

    const element = document.getElementById("typed-role");
    if (!element) return;

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function type() {
      const current = roles[roleIndex];

      if (!deleting) {
        element.textContent = current.slice(0, characterIndex + 1);
        characterIndex++;

        if (characterIndex === current.length) {
          deleting = true;
          setTimeout(type, 1900);
          return;
        }
      } else {
        element.textContent = current.slice(0, characterIndex - 1);
        characterIndex--;

        if (characterIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(type, deleting ? 40 : 80);
    }

    setTimeout(type, 600);
  })();

  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     ACTIVE NAV LINK SPY
     ========================================================= */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = "#" + entry.target.id;
          navAnchors.forEach((anchor) => {
            if (anchor.getAttribute("href") === currentId) {
              anchor.classList.add("active");
            } else if (anchor.getAttribute("href")?.startsWith("#")) {
              anchor.classList.remove("active");
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((sec) => activeObserver.observe(sec));

  /* =========================================================
     SCROLL REVEAL OBSERVER
     ========================================================= */
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((element) => revealObserver.observe(element));

  /* =========================================================
     SKILL BAR ANIMATION
     ========================================================= */
  function animateBars() {
    const bars = document.querySelectorAll(".bar-fill");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const percentage = bar.getAttribute("data-pct");
            if (percentage) {
              bar.style.width = percentage + "%";
            }
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.25 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }

  /* =========================================================
     PROJECT FILTERING
     ========================================================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  /* =========================================================
     CONTACT FORM
     ========================================================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const message = this.message.value.trim();
      const status = document.getElementById("formStatus");

      if (!name || !email || !message) {
        if (status) {
          status.textContent = "Please fill in all fields.";
          status.className = "form-status error";
        }
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        if (status) {
          status.textContent = "Please enter a valid email address.";
          status.className = "form-status error";
        }
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      if (status) {
        status.textContent = "✓ Opening your email client...";
        status.className = "form-status success";
      }

      window.location.href = `mailto:aswinbose05@gmail.com?subject=${subject}&body=${body}`;
      this.reset();

      setTimeout(() => {
        if (status) {
          status.textContent = "";
          status.className = "form-status";
        }
      }, 5000);
    });
  }

  /* =========================================================
     SMOOTH SCROLL FOR ANCHORS
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const selector = this.getAttribute("href");
      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* =========================================================
     HIGH-PERFORMANCE INTERACTIVE PARTICLES CANVAS
     ========================================================= */
  (function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W, H;
    let particles = [];
    let animationId;
    let mouse = { x: null, y: null, radius: 140 };

    const COLORS = [
      "rgba(79, 142, 255,",
      "rgba(168, 85, 247,",
      "rgba(0, 212, 255,"
    ];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.r = Math.random() * 1.8 + 0.6;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;
        }
      }

      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    };

    function init() {
      resize();
      const count = window.innerWidth < 768 ? 35 : 75;
      particles = Array.from({ length: count }, () => new Particle());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw particle points
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      }

      // Draw subtle connecting links
      const maxDistance = window.innerWidth < 768 ? 95 : 125;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79, 142, 255, ${0.1 * (1 - dist / maxDistance)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      animationId = requestAnimationFrame(draw);
    }

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    init();
    draw();

    window.addEventListener("resize", () => {
      cancelAnimationFrame(animationId);
      init();
      draw();
    }, { passive: true });
  })();

});