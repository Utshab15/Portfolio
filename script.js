/* =================================================================
   PORTFOLIO — script.js
   -----------------------------------------------------------------
   TABLE OF CONTENTS
   -----------------------------------------------------------------
   01. DATA — Skills, Projects, Experience, Contact
   02. THEME — Dark / Light toggle + localStorage
   03. NAVBAR — Scroll shadow + Active link highlight
   04. MOBILE MENU — Hamburger toggle
   05. SMOOTH SCROLL — Offset for fixed navbar
   06. SCROLL REVEAL — IntersectionObserver fade-in
   07. TILT CARDS — 3D mouse-tracking hover effect
   08. PARTICLE BACKGROUND — Canvas animation + connections
   09. BUILD SKILLS — Render skill cards from data
   10. BUILD PROJECTS — Render project cards + filter bar
   11. BUILD TIMELINE — Render experience items
   12. BUILD CONTACT — Render contact cards
   13. INIT — Run everything on load
   ================================================================= */


/* =================================================================
   01. DATA
   -----------------------------------------------------------------
   Edit the arrays below to customise all portfolio content.
   ================================================================= */

/* --- Skills --- */
const SKILLS_DATA = [
  {
    category: "Languages",
    icon:     "fa-solid fa-code",
    color:    "#6ee7f7",
    items:    ["Python", "JavaScript", "PHP", "C (Basic)", "HTML", "CSS"]
  },
  {
    category: "Web Development",
    icon:     "fa-solid fa-layer-group",
    color:    "#a78bfa",
    items:    ["HTML5", "CSS3", "JavaScript", "PHP", "Responsive Design", "DOM Manipulation"]
  },
  {
    category: "IoT & Hardware",
    icon:     "fa-solid fa-microchip",
    color:    "#34d399",
    items:    ["Arduino", "Arduino Cloud", "Sensors", "Weather Devices", "Circuit Design"]
  },
  {
    category: "Python & Bots",
    icon:     "fa-brands fa-python",
    color:    "#fb923c",
    items:    ["Python", "Discord.py", "Bot Development", "Automation", "Scripting"]
  },
  {
    category: "Tools & Design",
    icon:     "fa-solid fa-wrench",
    color:    "#f472b6",
    items:    ["VS Code", "Git", "GitHub", "Photoshop", "Discord", "Figma (Basic)"]
  },
  {
    category: "Community & Servers",
    icon:     "fa-solid fa-server",
    color:    "#facc15",
    items:    ["Discord Moderation", "Minecraft Server Dev", "Server Management", "Community Building"]
  }
];

/* --- Projects --- */
const PROJECTS_DATA = [
  {
    id:          1,
    title:       "Arduino Weather Station",
    description: "A fully functional weather-forecasting device built with Arduino and connected to Arduino Cloud. Reads temperature, humidity, and atmospheric pressure in real time.",
    image:       null,
    gradient:    "linear-gradient(135deg, #34d399 0%, #6ee7f7 100%)",
    category:    "IoT",
    tags:        ["Arduino", "Arduino Cloud", "C++", "IoT", "Sensors"],
    github:      "https://github.com/Utshab15",
    demo:        "https://github.com/Utshab15"
  },
  {
    id:          2,
    title:       "Discord Bot",
    description: "A feature-rich Discord bot built with Python and discord.py. Includes moderation commands, auto-responses, server utilities, and custom role management.",
    image:       null,
    gradient:    "linear-gradient(135deg, #a78bfa 0%, #6ee7f7 100%)",
    category:    "Python",
    tags:        ["Python", "discord.py", "Bot", "Automation"],
    github:      "https://github.com/Utshab15",
    demo:        "https://discordapp.com/users/1240262625791574026"
  },
  {
    id:          3,
    title:       "Personal Portfolio Website",
    description: "This very portfolio — a fully responsive personal website built with vanilla HTML, CSS, and JavaScript featuring dark/light mode, animations, and particle effects.",
    image:       null,
    gradient:    "linear-gradient(135deg, #6ee7f7 0%, #a78bfa 100%)",
    category:    "Web",
    tags:        ["HTML", "CSS", "JavaScript", "Responsive Design"],
    github:      "https://github.com/Utshab15",
    demo:        "https://github.com/Utshab15"
  },
  {
    id:          4,
    title:       "PHP Web Application",
    description: "A backend web application built with PHP featuring user authentication, dynamic content, and a MySQL database — developed during Grade 12 as part of learning backend development.",
    image:       null,
    gradient:    "linear-gradient(135deg, #fb923c 0%, #f472b6 100%)",
    category:    "Web",
    tags:        ["PHP", "HTML", "CSS", "MySQL", "Backend"],
    github:      "https://github.com/Utshab15",
    demo:        "https://github.com/Utshab15"
  },
  {
    id:          5,
    title:       "Minecraft Server",
    description: "Designed, developed, and managed a custom Minecraft server with plugins, economy systems, custom gamemodes, and an active player community.",
    image:       null,
    gradient:    "linear-gradient(135deg, #34d399 0%, #facc15 100%)",
    category:    "Gaming",
    tags:        ["Minecraft", "Server Dev", "Java Plugins", "Community"],
    github:      "https://github.com/Utshab15",
    demo:        "https://github.com/Utshab15"
  },
  {
    id:          6,
    title:       "Python Automation Scripts",
    description: "A collection of Python scripts for automating everyday tasks — file organisation, web scraping, data processing, and simple CLI tools built during the post-SEE learning period.",
    image:       null,
    gradient:    "linear-gradient(135deg, #facc15 0%, #fb923c 100%)",
    category:    "Python",
    tags:        ["Python", "Automation", "Scripting", "CLI"],
    github:      "https://github.com/Utshab15",
    demo:        "https://github.com/Utshab15"
  }
];

/* --- Experience / Timeline --- */
const EXPERIENCE_DATA = [
  {
    year:        "May 2026",
    role:        "Grade 12 Completed — NEB Board Exam",
    company:     "NEB (National Examinations Board), Nepal",
    location:    "Nepal",
    description: "Completed Grade 12 (+2 Science, Computer Major) NEB board exams. During this year I learned IoT with Arduino, built a fully functional weather-forecasting device using Arduino Cloud, and also learned PHP for backend web development.",
    tags:        ["Arduino", "IoT", "Arduino Cloud", "PHP", "Backend"]
  },
  {
    year:        "2025 — 2026",
    role:        "Grade 12 Student — Plus 2 Science (Computer Major)",
    company:     "Plus 2 Science Faculty",
    location:    "Nepal",
    description: "Deepened my technical skills in Grade 12. Built a real-world IoT weather station with Arduino and Arduino Cloud, learned PHP backend development, and continued growing as a developer.",
    tags:        ["PHP", "Arduino", "IoT", "Web Development", "Computer Science"]
  },
  {
    year:        "2024 — 2025",
    role:        "Grade 11 Student — Plus 2 Science (Computer Major)",
    company:     "Plus 2 Science Faculty",
    location:    "Nepal",
    description: "Joined Plus 2 Science with Computer as a major. Learned frontend web development (HTML, CSS, JavaScript), Photoshop for design, and continued building my programming foundation.",
    tags:        ["HTML", "CSS", "JavaScript", "Photoshop", "Frontend"]
  },
  {
    year:        "Apr 2024 — Jun 2024",
    role:        "Self-Taught Developer — Post-SEE Vacation",
    company:     "Self Learning",
    location:    "Nepal",
    description: "Used my Grade 10 vacation to dive deep into Python and Discord bot development with discord.py. Built several bots and automation scripts, igniting a passion for programming.",
    tags:        ["Python", "discord.py", "Bot Development", "Automation"]
  },
  {
    year:        "Apr 5, 2024",
    role:        "Grade 10 (SEE) Completed",
    company:     "NEB (National Examinations Board), Nepal",
    location:    "Nepal",
    description: "Successfully completed the Secondary Education Examination (SEE) — a major national milestone. This marked the beginning of a dedicated journey into software development.",
    tags:        ["SEE", "NEB", "Milestone"]
  },
  {
    year:        "Ongoing",
    role:        "Discord Server Moderator",
    company:     "Various Discord Communities",
    location:    "Remote",
    description: "Served as a moderator across multiple Discord servers — managing communities, enforcing rules, handling disputes, and creating a welcoming environment for members.",
    tags:        ["Discord", "Moderation", "Community Management"]
  }
];

/* --- Contact --- */
const CONTACT_DATA = [
  {
    icon:  "fa-solid fa-envelope",
    label: "Email",
    value: "utsav999adhikari@gmail.com",
    href:  "mailto:utsav999adhikari@gmail.com",
    color: "#6ee7f7"
  },
  {
    icon:  "fa-solid fa-phone",
    label: "Phone",
    value: "+977 976-291-8563",
    href:  "tel:+9779762918563",
    color: "#34d399"
  },
  {
    icon:  "fa-brands fa-github",
    label: "GitHub",
    value: "github.com/Utshab15",
    href:  "https://github.com/Utshab15",
    color: "#a78bfa"
  },
  {
    icon:  "fa-brands fa-instagram",
    label: "Instagram",
    value: "@utshab_adhikari",
    href:  "https://www.instagram.com/utshab_adhikari/",
    color: "#f472b6"
  },
  {
    icon:  "fa-brands fa-discord",
    label: "Discord",
    value: "utshab",
    href:  "https://discordapp.com/users/1240262625791574026",
    color: "#facc15"
  }
];


/* =================================================================
   02. THEME — Dark / Light toggle + localStorage
   ================================================================= */

/* Apply saved theme immediately before paint (prevents flash) */
(function applyThemeEarly() {
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  initParticles();   // re-colour particles to match new theme
});


/* =================================================================
   03. NAVBAR — Scroll shadow + Active link highlight
   ================================================================= */
const navbar = document.getElementById('navbar');

/* Add shadow when page is scrolled */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* Highlight the nav link for whichever section is in view */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}


/* =================================================================
   04. MOBILE MENU — Hamburger toggle
   ================================================================= */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* Close menu when a link is tapped */
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* =================================================================
   05. SMOOTH SCROLL — Offset scroll position for fixed navbar
   ================================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;   /* navbar height */
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* =================================================================
   06. SCROLL REVEAL — IntersectionObserver fade-in
   ================================================================= */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); /* animate once only */
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

/* Call this after dynamically inserting new .reveal elements */
function registerRevealElements() {
  document.querySelectorAll('.reveal:not(.observed)').forEach((el, i) => {
    /* Stagger cards inside grid containers */
    const parentGrid = el.closest('.skills-grid, .projects-grid, .contact-grid');
    if (parentGrid) {
      const siblings = Array.from(parentGrid.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${idx * 0.07}s`;
    }
    el.classList.add('observed');
    revealObserver.observe(el);
  });
}


/* =================================================================
   07. TILT CARDS — 3D mouse-tracking hover effect
   ================================================================= */
function attachTilt(el) {
  const onMove = e => {
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rotateX = -((clientY - cy) / (rect.height / 2)) * 6;
    const rotateY =  ((clientX - cx) / (rect.width  / 2)) * 6;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onLeave = () => {
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  };

  el.addEventListener('mousemove',  onMove);
  el.addEventListener('mouseleave', onLeave);
}

function initAllTilts() {
  document.querySelectorAll('.tilt-card').forEach(attachTilt);
}


/* =================================================================
   08. PARTICLE BACKGROUND — Canvas animation + connection lines
   ================================================================= */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let   particles = [];
let   animId;

/* Pick colours based on current theme */
function getParticleColor() {
  const theme  = document.documentElement.getAttribute('data-theme');
  const colors = theme === 'dark'
    ? ['rgba(110,231,247,', 'rgba(167,139,250,', 'rgba(52,211,153,']
    : ['rgba(14,165,201,',  'rgba(124,58,237,',  'rgba(5,150,105,'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    vx:    (Math.random() - 0.5) * 0.35,
    vy:    (Math.random() - 0.5) * 0.35,
    r:     Math.random() * 1.8 + 0.4,
    alpha: Math.random() * 0.5 + 0.1,
    color: getParticleColor()
  };
}

/* Draw faint lines between nearby particles */
function drawConnections() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.12;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(110,231,247,${opacity})`;
        ctx.lineWidth   = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();

  particles.forEach(p => {
    /* Move */
    p.x += p.vx;
    p.y += p.vy;
    /* Wrap around edges */
    if (p.x < 0)             p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0)             p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    /* Draw dot */
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();
  });

  animId = requestAnimationFrame(animateParticles);
}

function initParticles() {
  cancelAnimationFrame(animId);
  resizeCanvas();
  const count = Math.floor((canvas.width * canvas.height) / 14000);
  particles   = Array.from({ length: count }, createParticle);
  animateParticles();
}

window.addEventListener('resize', initParticles);


/* =================================================================
   09. BUILD SKILLS — Render skill cards from SKILLS_DATA
   ================================================================= */
function buildSkills() {
  const grid = document.getElementById('skills-grid');

  grid.innerHTML = SKILLS_DATA.map(skill => `
    <div class="glass-card skill-card tilt-card reveal">
      <div class="skill-card-header">
        <div class="skill-icon" style="background:${skill.color}1a; color:${skill.color};">
          <i class="${skill.icon}"></i>
        </div>
        <span class="skill-category">${skill.category}</span>
      </div>
      <div class="skill-items">
        ${skill.items.map(item => `<span class="skill-pill">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');

  /* Attach tilt to newly created cards */
  grid.querySelectorAll('.tilt-card').forEach(attachTilt);
  registerRevealElements();
}


/* =================================================================
   10. BUILD PROJECTS — Render project cards + filter bar
   ================================================================= */
let activeFilter = 'All';

function buildProjects() {
  const grid = document.getElementById('projects-grid');
  const bar  = document.getElementById('filter-bar');

  /* Collect unique categories */
  const categories = ['All', ...new Set(PROJECTS_DATA.map(p => p.category))];

  /* Render filter buttons */
  bar.innerHTML = categories.map(cat => `
    <button class="filter-btn${cat === activeFilter ? ' active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join('');

  /* Filter button click handler */
  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      bar.querySelectorAll('.filter-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.cat === activeFilter)
      );
      applyProjectFilter();
    });
  });

  /* Render project cards */
  grid.innerHTML = PROJECTS_DATA.map(project => `
    <div class="glass-card project-card tilt-card reveal" data-cat="${project.category}">

      <div class="project-thumb">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;" />`
          : `<div class="project-thumb-inner" style="background:${project.gradient};"></div>
             <span class="project-thumb-label">${project.title}</span>`
        }
      </div>

      <div class="project-body">
        <div class="project-category">${project.category}</div>
        <div class="project-title">${project.title}</div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.github}" target="_blank" class="project-link-btn">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
          <a href="${project.demo}" target="_blank" class="project-link-btn primary">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
        </div>
      </div>

    </div>
  `).join('');

  grid.querySelectorAll('.tilt-card').forEach(attachTilt);
  applyProjectFilter();
  registerRevealElements();
}

/* Show / hide cards based on active filter */
function applyProjectFilter() {
  document.querySelectorAll('.project-card').forEach(card => {
    const match = activeFilter === 'All' || card.dataset.cat === activeFilter;
    card.classList.toggle('hidden', !match);
  });
}


/* =================================================================
   11. BUILD TIMELINE — Render experience items from EXPERIENCE_DATA
   ================================================================= */
function buildTimeline() {
  const timeline = document.getElementById('timeline');

  timeline.innerHTML = EXPERIENCE_DATA.map(item => `
    <div class="glass-card timeline-item reveal">
      <div class="timeline-date">${item.year}</div>
      <div class="timeline-role">${item.role}</div>
      <div class="timeline-company">${item.company}</div>
      <div class="timeline-location">
        <i class="fa-solid fa-location-dot"></i> ${item.location}
      </div>
      <p class="timeline-desc">${item.description}</p>
      <div class="timeline-tags">
        ${item.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  registerRevealElements();
}


/* =================================================================
   12. BUILD CONTACT — Render contact cards from CONTACT_DATA
   ================================================================= */
function buildContact() {
  const grid = document.getElementById('contact-grid');

  grid.innerHTML = CONTACT_DATA.map(item => `
    <a href="${item.href}"
       class="glass-card contact-card tilt-card reveal"
       ${item.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
      <div class="contact-icon" style="background:${item.color}1a; color:${item.color};">
        <i class="${item.icon}"></i>
      </div>
      <div class="contact-label">${item.label}</div>
      <div class="contact-value">${item.value}</div>
      <div class="contact-arrow"><i class="fa-solid fa-arrow-right"></i></div>
    </a>
  `).join('');

  grid.querySelectorAll('.tilt-card').forEach(attachTilt);
  registerRevealElements();
}


/* =================================================================
   13. INIT — Run everything once the DOM is ready
   ================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();         /* 08 — start canvas animation */
  initAllTilts();          /* 07 — static tilt cards (hero, about) */
  registerRevealElements();/* 06 — static reveal elements */
  initActiveNavLinks();    /* 03 — active nav highlighting */

  buildSkills();           /* 09 */
  buildProjects();         /* 10 */
  buildTimeline();         /* 11 */
  buildContact();          /* 12 */
});