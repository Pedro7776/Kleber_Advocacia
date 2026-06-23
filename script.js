// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Smooth scroll + active link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('show');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.servico-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelector('.carousel-indicators');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Criar indicadores
    function createIndicators() {
        indicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(dot);
        }
    }
    
    // Calcular quantos cards cabem por tela
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 992) return 2;
        return 3;
    }
    
    // Atualizar slides
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 30; // Largura + gap
        const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
        const shift = currentIndex * (containerWidth);
        
        track.style.transform = `translateX(-${shift}px)`;
        
        // Atualizar indicadores
        const dots = indicators.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Próximo slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Resetar autoplay
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 4000);
    }
    
    // Navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Pausar autoplay no hover
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        resetAutoPlay();
    });
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Recalcular no resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                totalSlides = Math.ceil(cards.length / cardsPerView);
                createIndicators();
                currentIndex = Math.min(currentIndex, totalSlides - 1);
                updateCarousel();
            }
        }, 250);
    });
    
    // Inicializar
    createIndicators();
    updateCarousel();
    resetAutoPlay();
});

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // CARROSSEL DO ESCRITÓRIO
    // ========================================
    
    const track = document.querySelector('.escritorio-track');
    const slides = document.querySelectorAll('.escritorio-slide');
    const prevBtn = document.querySelector('.escritorio-carousel .prev-btn');
    const nextBtn = document.querySelector('.escritorio-carousel .next-btn');
    const indicators = document.querySelector('.escritorio-indicators');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    const totalSlides = slides.length;
    
    // Criar indicadores
    function createIndicators() {
        indicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(dot);
        }
    }
    
    // Atualizar carrossel
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Atualizar indicadores
        const dots = indicators.querySelectorAll('span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    // Próximo slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Slide anterior
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Resetar autoplay
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 4000); // Troca a cada 4 segundos
    }
    
    // Navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Pausar autoplay no hover
    const carousel = document.querySelector('.escritorio-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        resetAutoPlay();
    });
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Recalcular no resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 100);
    });
    
    // Inicializar
    createIndicators();
    updateCarousel();
    resetAutoPlay();
});
