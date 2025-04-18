// Navigation scroll effects
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// Smooth scrolling for navigation links
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Header shrink on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Highlight active navigation based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add active class style to navigation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    nav a.active {
      background-color: rgba(59, 130, 246, 0.15);
      color: #3b82f6;
    }
    nav a.active::after {
      width: 70%;
    }
  </style>
`);

// Add animation to reveal elements as they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    }
  });
}, { threshold: 0.3 });

// Apply to project cards, skill items, etc.
document.querySelectorAll('.project-card, .skill-item, .contact-links')
  .forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });

// Add reveal animation styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s ease;
    }
    .appear {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`);

// Optional: Dark/Light Mode Toggle
const createToggleButton = () => {
  const button = document.createElement('button');
  button.className = 'mode-toggle';
  button.innerHTML = '<i class="fas fa-moon"></i>';
  button.title = 'Toggle Dark/Light Mode';
  
  document.body.appendChild(button);
  
  button.addEventListener('click', toggleColorMode);
};

function toggleColorMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('.mode-toggle i');
  
  if (document.body.classList.contains('dark-mode')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Dark mode styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    body.dark-mode {
      --text-color: #e2e8f0;
      --light-text: #94a3b8;
      --dark-bg: #0f172a;
      --light-bg: #1e293b;
      --card-bg: #1e293b;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    
    body.dark-mode h1, 
    body.dark-mode h2, 
    body.dark-mode h3 {
      color: #f1f5f9;
    }
    
    body.dark-mode .project-card,
    body.dark-mode .skill-item,
    body.dark-mode .contact-links {
      background: #334155;
    }
    
    body.dark-mode .mode-toggle {
      background: #f1f5f9;
      color: #0f172a;
    }
  </style>
`);

// Initialize theme toggle button
window.addEventListener('DOMContentLoaded', createToggleButton);