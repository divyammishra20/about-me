// ============================================================
// Respect reduced-motion preference everywhere
// ============================================================
const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// Hero terminal typing animation
// ============================================================
const codeLines = [
  { text: "const developer = {", pause: 80 },
  { text: "  name: \"Divyam Mishra\",", pause: 60 },
  { text: "  course: \"B.Tech, CSE\",", pause: 60 },
  { text: "  year: 2,", pause: 60 },
  { text: "  passion: \"Computer Science\",", pause: 60 },
  { text: "  status: \"always debugging\"", pause: 60 },
  { text: "};", pause: 200 },
  { text: "", pause: 200 },
  { text: "console.log(`Hi, I'm ${developer.name}`);", pause: 0 },
];

const typedEl = document.getElementById('typed-code');
const caretEl = document.getElementById('typedCaret');

async function typeTerminal(){
  if (!typedEl) return;

  if (REDUCE_MOTION){
    typedEl.textContent = codeLines.map(l => l.text).join('\n');
    if (caretEl) caretEl.style.display = 'none';
    return;
  }

  for (const line of codeLines){
    for (const char of line.text){
      typedEl.textContent += char;
      await wait(14 + Math.random() * 22);
    }
    typedEl.textContent += '\n';
    await wait(line.pause);
  }
}

function wait(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Kick off typing once the hero is in view (or immediately if already visible)
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      typeTerminal();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ============================================================
// Active tab tracking on scroll
// ============================================================
const tabs = Array.from(document.querySelectorAll('.tab'));
const sections = tabs
  .map(tab => document.querySelector(tab.getAttribute('href')))
  .filter(Boolean);

function setActiveTab(id){
  tabs.forEach(tab => {
    tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
  });
}

if (sections.length){
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        setActiveTab(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));
}

// Close mobile menu after choosing a tab
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.tabs')?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Mobile menu toggle
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const tabsNav = document.querySelector('.tabs');

menuToggle?.addEventListener('click', () => {
  const isOpen = tabsNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// ============================================================
// Live clock in the status bar (purely decorative, local time)
// ============================================================
const clockEl = document.getElementById('clock');

function updateClock(){
  if (!clockEl) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}

updateClock();
setInterval(updateClock, 1000);
