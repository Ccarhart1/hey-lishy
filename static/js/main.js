// Main JavaScript for Li Shy Website

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    createFloatingHearts();
    createParticleSystem();
    initializeNavigation();
    initializeScrollAnimations();
    initializeMessageCards();
    initializeLoadingSequence();
    initializeParallaxEffect();

    // Add click ripple effects to buttons
    addRippleEffects();

    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Initialize intersection observer for animations
    initializeIntersectionObserver();

    // Add keyboard navigation
    initializeKeyboardNavigation();
}

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    if (!heartsContainer) return;

    const heartShapes = ['💕', '💖', '💗', '💝', '💓', '💘', '💞', '💌', '🌸', '🌺'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartShapes[Math.floor(Math.random() * heartShapes.length)];

        // Random position and properties
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 10000);
    }

    // Create hearts at intervals
    setInterval(createHeart, 2000);

    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 400);
    }
}

// Create particle system
function createParticleSystem() {
    const particleContainer = document.querySelector('.particle-system');
    if (!particleContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';

        particleContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    // Create particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }

    // Continue creating particles
    setInterval(createParticle, 3000);
}

// Initialize navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    function checkScrollPosition() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Check on load
}

// Initialize message cards
function initializeMessageCards() {
    const messageCards = document.querySelectorAll('.message-card');

    if (messageCards.length === 0) return;

    const sweetMessages = [
        {
            date: "Right now",
            icon: "💕",
            content: "Li Shy, you're the most beautiful person I've ever known, inside and out. Your kindness lights up every room you enter."
        },
        {
            date: "Always",
            icon: "🌟",
            content: "I love the way you laugh at my silly jokes, even when they're not funny. You make everything better just by being you."
        },
        {
            date: "Forever",
            icon: "💖",
            content: "Distance can't diminish what we have. Every day apart makes me appreciate you more and love you deeper."
        },
        {
            date: "Every moment",
            icon: "🌙",
            content: "I think about you when I wake up, throughout the day, and as I fall asleep. You're my first and last thought every day."
        },
        {
            date: "Until the end of time",
            icon: "♾️",
            content: "You're not just my girlfriend, you're my best friend, my confidante, my partner in everything. I can't imagine life without you."
        }
    ];

    // Add click listeners to message cards
    messageCards.forEach((card, index) => {
        card.addEventListener('click', function () {
            setActiveMessage(index);
        });
    });

    // Random message function
    window.showRandomMessage = function () {
        const randomIndex = Math.floor(Math.random() * sweetMessages.length);
        const randomMessage = sweetMessages[randomIndex];

        // Find a random card to update
        const cardIndex = Math.floor(Math.random() * messageCards.length);
        const card = messageCards[cardIndex];

        // Update card content with animation
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';

        setTimeout(() => {
            card.querySelector('.message-date').textContent = randomMessage.date;
            card.querySelector('.message-icon').textContent = randomMessage.icon;
            card.querySelector('.message-content p').textContent = randomMessage.content;

            card.style.transform = 'scale(1)';
            card.style.opacity = '1';

            // Highlight the updated card
            setActiveMessage(cardIndex);
        }, 300);
    };
}

// Set active message card
function setActiveMessage(index) {
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        } else {
            card.classList.remove('active');
        }
    });
}

// Initialize loading sequence
function initializeLoadingSequence() {
    // Add stagger animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';

        setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 * index);
    });
}

// Initialize parallax effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Add ripple effects to buttons
function addRippleEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.classList.add('btn-ripple');

        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Smooth scroll to section (global function)
window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Initialize intersection observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Add stagger animation to children
                const children = entry.target.querySelectorAll('.message-card, .gallery-item, .game-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('slide-in-left');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        // Press 'H' to go to home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
            scrollToSection('home');
        }

        // Press 'M' to show random message
        if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.altKey) {
            showRandomMessage();
        }

        // Press 'G' to go to gallery
        if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.altKey) {
            scrollToSection('gallery');
        }

        // Press 'C' to go to countdown
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey) {
            scrollToSection('countdown');
        }

        // Press Escape to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add performance optimization
window.addEventListener('scroll', debounce(function () {
    updateActiveNavLink();
}, 100));

// Add touch support
function addTouchSupport() {
    let startY = 0;
    let startX = 0;

    document.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchmove', function (e) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;

        const diffY = startY - currentY;
        const diffX = startX - currentX;

        // Detect swipe gestures
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                // Swipe left - next section
                // Add logic here if needed
            } else if (diffX < -50) {
                // Swipe right - previous section
                // Add logic here if needed
            }
        }
    });
}

// Initialize touch support
addTouchSupport();

// Add loading indicator
function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '<div class="preloader-heart">💕</div>';
    document.body.appendChild(loader);

    return loader;
}

function hideLoadingIndicator(loader) {
    if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
    }
}

// Export functions for use in other scripts
window.LiShyWebsite = {
    scrollToSection: window.scrollToSection,
    showRandomMessage: window.showRandomMessage,
    showLoadingIndicator,
    hideLoadingIndicator
}; 