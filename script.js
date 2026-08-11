/* =========================================================
   ASWIN B – AI ENGINEER PORTFOLIO
   script.js
   ========================================================= */


/* =========================================================
   LOADER
   ========================================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    if (loader) {
      loader.classList.add("hide");
    }

    animateBars();

  }, 900);

});


/* =========================================================
   PARTICLE BACKGROUND
   ========================================================= */

(function initParticles() {

  const canvas = document.getElementById("particles");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let W;
  let H;

  let particles = [];

  let animationId;

  const COLORS = [
    "rgba(79,142,255,",
    "rgba(157,101,255,",
    "rgba(0,212,255,"
  ];


  function resize() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

  }


  function Particle() {

    this.x = Math.random() * W;
    this.y = Math.random() * H;

    this.vx =
      (Math.random() - 0.5) * 0.3;

    this.vy =
      (Math.random() - 0.5) * 0.3;

    this.r =
      Math.random() * 1.5 + 0.5;

    this.alpha =
      Math.random() * 0.5 + 0.1;

    this.color =
      COLORS[
        Math.floor(
          Math.random() * COLORS.length
        )
      ];

  }


  Particle.prototype.update = function () {

    this.x += this.vx;
    this.y += this.vy;


    if (this.x < 0) this.x = W;

    if (this.x > W) this.x = 0;

    if (this.y < 0) this.y = H;

    if (this.y > H) this.y = 0;

  };


  function init() {

    resize();

    const count =
      window.innerWidth < 700
        ? 40
        : 80;

    particles =
      Array.from(
        { length: count },
        () => new Particle()
      );

  }


  function draw() {

    ctx.clearRect(
      0,
      0,
      W,
      H
    );


    particles.forEach((p) => {

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        p.color +
        p.alpha +
        ")";

      ctx.fill();

    });


    for (
      let i = 0;
      i < particles.length;
      i++
    ) {

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {

        const dx =
          particles[i].x -
          particles[j].x;

        const dy =
          particles[i].y -
          particles[j].y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if (distance < 120) {

          ctx.beginPath();

          ctx.moveTo(
            particles[i].x,
            particles[i].y
          );

          ctx.lineTo(
            particles[j].x,
            particles[j].y
          );

          ctx.strokeStyle =
            `rgba(79,142,255,${
              0.08 *
              (1 - distance / 120)
            })`;

          ctx.lineWidth = 0.5;

          ctx.stroke();

        }

      }

    }


    particles.forEach(
      (particle) =>
        particle.update()
    );


    animationId =
      requestAnimationFrame(draw);

  }


  init();

  draw();


  window.addEventListener(
    "resize",
    () => {

      cancelAnimationFrame(
        animationId
      );

      init();

      draw();

    },
    { passive: true }
  );

})();


/* =========================================================
   TYPING EFFECT
   ========================================================= */

(function initTyping() {

  const roles = [
    "Software Developer",
    "Java Full Stack Developer",
    "AI Engineer",
    "Generative AI Developer",
    "Agentic AI Builder",
    "RAG Developer",

  ];


  const element =
    document.getElementById(
      "typed-role"
    );


  if (!element) return;


  let roleIndex = 0;

  let characterIndex = 0;

  let deleting = false;


  function type() {

    const current =
      roles[roleIndex];


    if (!deleting) {

      element.textContent =
        current.slice(
          0,
          characterIndex + 1
        );

      characterIndex++;


      if (
        characterIndex ===
        current.length
      ) {

        deleting = true;

        setTimeout(
          type,
          1800
        );

        return;

      }

    } else {

      element.textContent =
        current.slice(
          0,
          characterIndex - 1
        );

      characterIndex--;


      if (
        characterIndex === 0
      ) {

        deleting = false;

        roleIndex =
          (roleIndex + 1) %
          roles.length;

      }

    }


    setTimeout(
      type,
      deleting ? 45 : 80
    );

  }


  setTimeout(
    type,
    600
  );

})();


/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

const navbar =
  document.getElementById(
    "navbar"
  );


window.addEventListener(
  "scroll",
  () => {

    if (!navbar) return;

    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  },
  { passive: true }
);


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const navToggle =
  document.getElementById(
    "navToggle"
  );

const navLinks =
  document.getElementById(
    "navLinks"
  );


if (
  navToggle &&
  navLinks
) {

  navToggle.addEventListener(
    "click",
    () => {

      const open =
        navLinks.classList.toggle(
          "open"
        );

      navToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  navLinks
    .querySelectorAll(
      ".nav-link"
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "open"
          );

          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const reveals =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


reveals.forEach(
  (element) =>
    revealObserver.observe(
      element
    )
);


/* =========================================================
   SKILL BAR ANIMATION
   ========================================================= */

function animateBars() {

  const bars =
    document.querySelectorAll(
      ".bar-fill"
    );


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              const bar =
                entry.target;

              const percentage =
                bar.getAttribute(
                  "data-pct"
                );


              bar.style.width =
                percentage + "%";


              observer.unobserve(
                bar
              );

            }

          }
        );

      },
      {
        threshold: 0.3
      }
    );


  bars.forEach(
    (bar) =>
      observer.observe(bar)
  );

}


/* =========================================================
   PROJECT FILTERING
   ========================================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );


filterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          (btn) =>
            btn.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        const filter =
          button.getAttribute(
            "data-filter"
          );


        document
          .querySelectorAll(
            ".project-card"
          )
          .forEach(
            (card) => {

              const category =
                card.getAttribute(
                  "data-category"
                );


              if (
                filter === "all" ||
                category === filter
              ) {

                card.classList.remove(
                  "hidden"
                );

              } else {

                card.classList.add(
                  "hidden"
                );

              }

            }
          );

      }
    );

  }
);


/* =========================================================
   ACTIVE NAV LINK
   ========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const navAnchors =
  document.querySelectorAll(
    ".nav-link"
  );


const activeObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            navAnchors.forEach(
              (anchor) => {

                anchor.style.color =
                  "";

                if (
                  anchor.getAttribute(
                    "href"
                  ) ===
                  "#" +
                  entry.target.id
                ) {

                  anchor.style.color =
                    "var(--blue)";

                }

              }
            );

          }

        }
      );

    },
    {
      threshold: 0.35
    }
  );


sections.forEach(
  (section) =>
    activeObserver.observe(
      section
    )
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const name =
        this.name.value.trim();

      const email =
        this.email.value.trim();

      const message =
        this.message.value.trim();

      const status =
        document.getElementById(
          "formStatus"
        );


      if (
        !name ||
        !email ||
        !message
      ) {

        status.textContent =
          "Please fill in all fields.";

        status.className =
          "form-status error";

        return;

      }


      /* Fixed email validation */

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (
        !emailPattern.test(
          email
        )
      ) {

        status.textContent =
          "Please enter a valid email.";

        status.className =
          "form-status error";

        return;

      }


      const subject =
        encodeURIComponent(
          `Portfolio Contact from ${name}`
        );


      const body =
        encodeURIComponent(
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`
        );


      status.textContent =
        "✓ Opening your email client...";

      status.className =
        "form-status success";


      window.location.href =
        `mailto:aswinbose05@gmail.com?subject=${subject}&body=${body}`;


      this.reset();


      setTimeout(
        () => {

          status.textContent =
            "";

          status.className =
            "form-status";

        },
        4000
      );

    }
  );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    (anchor) => {

      anchor.addEventListener(
        "click",
        function (event) {

          const selector =
            this.getAttribute(
              "href"
            );


          if (
            !selector ||
            selector === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              selector
            );


          if (target) {

            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }
      );

    }
  );