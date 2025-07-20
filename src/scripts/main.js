const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if(theme === 'dark'){
        themeIcon.className = 'fas fa-sun';
    } else{
        themeIcon.className = 'fas fa-moon';
    }
}

const hamburguer = document.getElementById('hamburguer');
const navMenu = document.querySelector('.nav-menu');

hamburguer.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburguer.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburguer.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.pageYOffset >= sectionTop - headerHeight - 100) {
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

const filterButtons = document.querySelectorAll('.filter-btn');
const projetoCards = document.querySelectorAll('.projeto-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projetoCards.forEach(card => {
            if(filterValue === 'all'){
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.remove('hidden');
                }, 10);
            } else{
                const cardCategories = card.getAttribute('data-category');
                if (cardCategories && cardCategories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('hidden');
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

const contatoForm = document.querySelector('.contato-form');

contatoForm.addEventListener('submit', (e) => {
    const nome = contatoForm.querySelector('[name="nome"]').value.trim();
    const email = contatoForm.querySelector('[name="email"]').value.trim();
    const servico = contatoForm.querySelector('[name="servico"]').value;
    const mensagem = contatoForm.querySelector('[name="mensagem"]').value.trim();

    if (!nome || !email || !servico || !mensagem) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos!');
        return;
    }

    alert('Obrigado pela sua mensagem! Eu retornarei o mais breve possível!');
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.servico-card, .projeto-card, .section-title, .section-title2').forEach(el => {
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = `${getComputedStyle(document.documentElement).getPropertyValue('--bg-primary')}ee`;
    } else {
        header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    }
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 150);
    }
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const inicio = document.querySelector('.inicio');
    const rate = scrolled * -0.5;
    
    if (inicio) {
        inicio.style.transform = `translateY(${rate}px)`;
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    revealObserver.observe(section);
});