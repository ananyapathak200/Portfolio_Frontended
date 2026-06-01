// =============================
// NAVBAR SCROLL EFFECT
// =============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// =============================
// HAMBURGER MENU
// =============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// =============================
// TYPEWRITER EFFECT
// =============================
const roles = [
  'Full Stack Developer',
  'B.Tech CSE Student',
  'Problem Solver',
  'Web Developer',
  'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(type, speed);
}
type();

// =============================
// SCROLL REVEAL
// =============================
const revealEls = document.querySelectorAll(
  'section > *, .edu-card, .sem-card, .project-card, .cert-card, .skill-group, .about-card, .about-info, .contact-info, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// =============================
// ACTIVE NAV LINK
// =============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color =
      link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// =============================
// CERTIFICATE UPLOAD
// =============================
function triggerUpload(index) {
  document.getElementById("cert" + index).click();
}

function loadCert(input, index) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("certImg" + index).innerHTML =
        `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// =============================
// LIGHTBOX
// =============================
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  lbImg.src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// =============================
// CONTACT FORM (CONNECTED TO BACKEND)
// =============================
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const success = document.getElementById('formSuccess');

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const btn = form.querySelector('button[type=submit]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  fetch("http://localhost:8082/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message
    })
  })
    .then(res => res.text())
    .then(data => {
      form.reset();
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;

      success.style.display = 'block';
      setTimeout(() => {
        success.style.display = 'none';
      }, 4000);
    })
    .catch(error => {
      console.error(error);
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      alert("Something went wrong ❌");
    });
}

// =============================
// SMOOTH SCROLL
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      e.preventDefault();

      const offset = 70;
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  });
});