const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (darkMode) {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
  }
})();

toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section').forEach((section) => {
  section.classList.add('hidden');
  observer.observe(section);
});

const searchContainer = document.createElement('div');
searchContainer.className = 'skill-search';
searchContainer.innerHTML = `
  <input type="text" id="skillSearchInput" placeholder="Search a skill..." aria-label="Search Skills" />
`;
document.querySelector('.skills')?.prepend(searchContainer);

const searchInput = document.getElementById('skillSearchInput');
searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.skills ul li').forEach((li) => {
    li.style.display = li.textContent.toLowerCase().includes(query) ? 'list-item' : 'none';
  });
});
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.textContent = '⬆️';
scrollBtn.title = 'Back to Top';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  padding: 10px 12px;
  border-radius: 50%;
  border: none;
  background-color: #2575fc;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
  z-index: 1000;
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  scrollBtn.style.transform = 'scale(1.2)';
  setTimeout(() => (scrollBtn.style.transform = 'scale(1)'), 300);
});

const footer = document.querySelector('footer p');
if (footer && !footer.textContent.includes(new Date().getFullYear())) {
  footer.insertAdjacentHTML('beforeend', ` <br><small>© ${new Date().getFullYear()} Aryan Singh</small>`);
}
