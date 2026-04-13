/**
 * Ecoblock Company Limited Website
 * Main JavaScript File
 * 
 * Features:
 * - Mobile navigation toggle
 * - Sticky header on scroll
 * - Smooth scrolling navigation
 * - Active navigation link highlighting
 * - Project filtering
 * - Testimonials slider
 * - Counter animations
 * - Form validation
 * - Back to top button
 * - Scroll animations
 */

'use strict';

// ===================================
// DOM Elements
// ===================================
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const projectFilters = document.querySelectorAll('.projects__filter');
const projectCards = document.querySelectorAll('.project-card');

// ===================================
// Mobile Navigation
// ===================================
function openNav() {
    navMenu.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    navMenu.classList.remove('show');
    document.body.style.overflow = '';
}

if (navToggle) {
    navToggle.addEventListener('click', openNav);
}

if (navClose) {
    navClose.addEventListener('click', closeNav);
}

// Close nav when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        closeNav();
    }
});

// ===================================
// Sticky Header
// ===================================
function handleScroll() {
    if (lightSections.includes(currentSection)) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ===================================
// Active Navigation Link
// ===================================
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleBackToTop);

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Project Filtering
// ===================================
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
            card.classList.add('hidden');
        }
    });
}

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Update active filter
        projectFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter projects
        const category = filter.getAttribute('data-filter');
        filterProjects(category);
    });
});

// ===================================
// Testimonials Slider
// ===================================
class TestimonialsSlider {
    constructor() {
        this.track = document.querySelector('.testimonials__track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.testimonials__btn--prev');
        this.nextBtn = document.querySelector('.testimonials__btn--next');
        this.dotsContainer = document.querySelector('.testimonials__dots');
        
        if (!this.track || this.cards.length === 0) return;
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        
        this.init();
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    init() {
        this.createDots();
        this.updateSlider();
        this.bindEvents();
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('testimonials__dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.testimonials__dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateSlider() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 24; // var(--spacing-6)
        const offset = this.currentIndex * (cardWidth + gap) * this.cardsPerView;
        this.track.style.transform = `translateX(-${offset}px)`;
        this.updateDots();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Auto-play
        setInterval(() => this.nextSlide(), 5000);
        
        // Recalculate on resize
        window.addEventListener('resize', () => {
            this.cardsPerView = this.getCardsPerView();
            this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
            this.currentIndex = 0;
            this.createDots();
            this.updateSlider();
        });
    }
}

// Initialize slider
new TestimonialsSlider();

// ===================================
// Projects Carousel
// ===================================
class ProjectsCarousel {
    constructor() {
        this.track = document.getElementById('projects-carousel-track');
        this.prevBtn = document.getElementById('projects-carousel-prev');
        this.nextBtn = document.getElementById('projects-carousel-next');
        this.cards = this.track ? this.track.querySelectorAll('.project-card') : [];
        
        if (!this.track || this.cards.length === 0) return;
        
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        this.init();
    }
    
    getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
    }
    
    updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 24; // var(--spacing-6)
        const offset = this.currentIndex * (cardWidth + gap);
        this.track.style.transform = `translateX(-${offset}px)`;
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        this.updateCarousel();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Recalculate on resize
        window.addEventListener('resize', () => {
            this.cardsPerView = this.getCardsPerView();
            this.currentIndex = 0;
            this.updateCarousel();
        });
    }
}

// Initialize projects carousel
new ProjectsCarousel();

// ===================================
// Counter Animation
// ====================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe hero stats, projects stats, and why-us section
const heroStats = document.querySelector('.hero__stats');
const projectsStats = document.querySelector('.projects-stats');
const whyUsSection = document.querySelector('.why-us__grid');

if (heroStats) counterObserver.observe(heroStats);
if (projectsStats) counterObserver.observe(projectsStats);
if (whyUsSection) counterObserver.observe(whyUsSection);

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .why-us__card, .about__value, .contact__card, .overview-card, .product-card, .application-item, .benefit-item, .metric-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
    });
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => scrollObserver.observe(el));
}

initScrollAnimations();

// ===================================
// Form Validation
// ===================================
class FormValidator {
    constructor(form) {
        this.form = form;
        this.fields = {
            name: {
                element: form.querySelector('#name'),
                errorElement: form.querySelector('#name-error'),
                validators: [
                    { test: value => value.trim() !== '', message: 'Please enter your name' },
                    { test: value => value.trim().length >= 2, message: 'Name must be at least 2 characters' }
                ]
            },
            email: {
                element: form.querySelector('#email'),
                errorElement: form.querySelector('#email-error'),
                validators: [
                    { test: value => value.trim() !== '', message: 'Please enter your email' },
                    { test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Please enter a valid email address' }
                ]
            },
            phone: {
                element: form.querySelector('#phone'),
                errorElement: form.querySelector('#phone-error'),
                validators: [
                    { test: value => value.trim() !== '', message: 'Please enter your phone number' },
                    { test: value => /^[\d\s\-+()]{10,}$/.test(value), message: 'Please enter a valid phone number' }
                ]
            },
            message: {
                element: form.querySelector('#message'),
                errorElement: form.querySelector('#message-error'),
                validators: [
                    { test: value => value.trim() !== '', message: 'Please enter your message' },
                    { test: value => value.trim().length >= 10, message: 'Message must be at least 10 characters' }
                ]
            }
        };
        
        this.successMessage = form.querySelector('#form-success');
        this.init();
    }
    
    init() {
        // Real-time validation
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field.element) {
                field.element.addEventListener('blur', () => this.validateField(fieldName));
                field.element.addEventListener('input', () => {
                    if (field.element.classList.contains('error')) {
                        this.validateField(fieldName);
                    }
                });
            }
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.element.value;
        
        for (const validator of field.validators) {
            if (!validator.test(value)) {
                this.showError(field, validator.message);
                return false;
            }
        }
        
        this.clearError(field);
        return true;
    }
    
    showError(field, message) {
        field.element.classList.add('error');
        field.errorElement.textContent = message;
    }
    
    clearError(field) {
        field.element.classList.remove('error');
        field.errorElement.textContent = '';
    }
    
    validateAll() {
        let isValid = true;
        
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateAll()) {
            // Simulate form submission
            const submitBtn = this.form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                this.successMessage.classList.add('show');
                
                // Reset form
                this.form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    this.successMessage.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    }
}

// Initialize form validator
if (contactForm) {
    new FormValidator(contactForm);
}

// ===================================
// Thickness Dropdown Toggle
// ===================================
const serviceSelect = document.getElementById('service');
const thicknessGroup = document.getElementById('thickness-group');

if (serviceSelect) {
    serviceSelect.onchange = function() {
        if (this.value === 'commercial') {
            thicknessGroup.style.display = 'block';
        } else {
            thicknessGroup.style.display = 'none';
        }
    };
}

// ===================================
// Lazy Loading Images
// ===================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

initLazyLoading();

// ===================================
// Keyboard Navigation
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile nav on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('show')) {
        closeNav();
    }
});

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero .animate-fade-up');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// ===================================
// Console Welcome Message
// ===================================
console.log(
    '%c BuildStrong Construction ',
    'background: #f59e0b; color: #1f2937; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
);
console.log(
    '%c Building Strong Foundations for the Future ',
    'color: #1e3a5f; font-size: 14px; padding: 5px;'
);