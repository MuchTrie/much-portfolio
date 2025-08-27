// Script loaded
console.log('[script] script.js loaded');

// Simple Carousel for Plagiarism Checker Card
function plagiarismCarouselPrev(e) {
    e.preventDefault();
    const carousel = e.target.closest('.plagiarism-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    if (!images || images.length === 0) return;
    let idx = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (idx === -1) idx = 0;
    console.log('[plagiarism] prev clicked. current index:', idx);
    images[idx].classList.remove('active');
    idx = (idx - 1 + images.length) % images.length;
    images[idx].classList.add('active');
    console.log('[plagiarism] new active index:', idx, 'src:', images[idx].getAttribute('src'));
}
function plagiarismCarouselNext(e) {
    e.preventDefault();
    const carousel = e.target.closest('.plagiarism-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    if (!images || images.length === 0) return;
    let idx = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (idx === -1) idx = 0;
    console.log('[plagiarism] next clicked. current index:', idx);
    images[idx].classList.remove('active');
    idx = (idx + 1) % images.length;
    images[idx].classList.add('active');
    console.log('[plagiarism] new active index:', idx, 'src:', images[idx].getAttribute('src'));
}
// (Initial nav/event bindings removed; now handled after partials load in initAppScripts())

// Navbar background & active link highlighting (re-bound after partials load)
let observer; // will be initialized once
function highlightNavLink() {
    const scrollPos = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos <= bottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(220, 38, 38, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    highlightNavLink();
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            if (entry.target.classList.contains('cert-card') || entry.target.classList.contains('skill-category') || entry.target.classList.contains('contact-card')) {
                const cards = entry.target.parentElement.children;
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => { card.classList.add('fade-in-up'); }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Typing animation for hero title
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Debug: Attach load/error handlers to plagiarism carousel images
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.plagiarism-carousel');
    if (!carousel) return;
    const images = carousel.querySelectorAll('.carousel-image');
    images.forEach((img, i) => {
        // log current src
        console.log(`[plagiarism] image[${i}] src=`, img.getAttribute('src'));
        img.addEventListener('load', () => console.log(`[plagiarism] image[${i}] loaded OK:`, img.getAttribute('src')));
        img.addEventListener('error', (ev) => console.error(`[plagiarism] image[${i}] failed to load:`, img.getAttribute('src'), ev));
    });
});

// Also initialize debug helpers after partials are injected or when initAppScripts runs
function initPlagiarismDebug() {
    const carousel = document.querySelector('.plagiarism-carousel');
    if (!carousel) {
        console.log('[plagiarism] init: no carousel found');
        return;
    }
    console.log('[plagiarism] init: found carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    images.forEach((img, i) => {
        console.log(`[plagiarism] init image[${i}] src=`, img.getAttribute('src'));
        img.addEventListener('load', () => console.log(`[plagiarism] image[${i}] loaded OK:`, img.getAttribute('src')));
        img.addEventListener('error', (ev) => console.error(`[plagiarism] image[${i}] failed to load:`, img.getAttribute('src'), ev));
    });
}

document.addEventListener('partials:loaded', initPlagiarismDebug);

// Particle background animation
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(220, 38, 38, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Delay particle creation until hero exists
function ensureParticles() {
    if (document.querySelector('.hero') && !document.body.dataset.particles) {
        document.body.dataset.particles = '1';
        createParticles();
    }
}

document.addEventListener('partials:loaded', ensureParticles);
if (document.readyState !== 'loading') setTimeout(ensureParticles, 0);

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #dc2626, #7f1d1d);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Enhanced skill tag interactions
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
        tag.style.boxShadow = '0 5px 15px rgba(220, 38, 38, 0.3)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
        tag.style.boxShadow = '';
    });
});

// Contact card click to copy functionality
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', () => {
        const text = card.querySelector('p').textContent;
        const icon = card.querySelector('i');
        
        // Copy email or phone to clipboard
        if (icon.classList.contains('fa-envelope') || icon.classList.contains('fa-phone')) {
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const originalText = card.querySelector('h3').textContent;
                card.querySelector('h3').textContent = 'Copied!';
                card.style.background = 'rgba(220, 38, 38, 0.2)';
                
                setTimeout(() => {
                    card.querySelector('h3').textContent = originalText;
                    card.style.background = '';
                }, 1000);
            });
        }
        // Open LinkedIn profile
        else if (icon.classList.contains('fa-linkedin')) {
            window.open('https://www.linkedin.com/in/much-trie-harnanto', '_blank');
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Add entrance animations
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::before {
        width: 100% !important;
    }
    
    .particle {
        z-index: 0;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
    }
    
    .contact-card {
        cursor: pointer;
    }
    
    .contact-card:hover {
        background: rgba(220, 38, 38, 0.1) !important;
    }
`;

document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Easter egg: Console message
console.log(`
    ╔══════════════════════════════════════╗
    ║          Welcome to my Portfolio!     ║
    ║                                      ║
    ║     Built with ❤️  by Much. Trie      ║
    ║                                      ║
    ║   🔒 Cybersecurity Enthusiast        ║
    ║   💻 Web Developer                   ║
    ║   🎓 Computer Science Student        ║
    ║                                      ║
    ║   Contact: mtrie.h@gmail.com         ║
    ╚══════════════════════════════════════╝
`);

// Add dynamic background pattern
function createBackgroundPattern() {
    const pattern = document.createElement('div');
    pattern.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.05) 0%, transparent 50%);
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(pattern);
}

// Create background pattern once
if (!document.body.dataset.bgPattern) {
    document.body.dataset.bgPattern = '1';
    createBackgroundPattern();
}

// Project dropdown toggle functionality with mobile modal support
function toggleProjectDropdown(projectId) {
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
        openProjectModal(projectId);
        return;
    }
    
    const dropdownContent = document.getElementById(projectId);
    const projectCard = dropdownContent.closest('.project-card');
    const dropdownArrow = projectCard.querySelector('.dropdown-arrow');
    
    // Toggle active classes
    dropdownContent.classList.toggle('active');
    projectCard.classList.toggle('active');
    
    // Close other open dropdowns in the same section
    const allDropdowns = document.querySelectorAll('.project-dropdown-content');
    const allCards = document.querySelectorAll('.project-card');
    
    allDropdowns.forEach(dropdown => {
        if (dropdown !== dropdownContent && dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
            dropdown.closest('.project-card').classList.remove('active');
        }
    });
}

// Project modal functionality for mobile
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalContent = modal.querySelector('.modal-content');
    
    // Get project data
    const projectCard = document.getElementById(projectId).closest('.project-card');
    const projectTitle = projectCard.querySelector('.project-info h4').textContent;
    const projectContent = document.getElementById(projectId).innerHTML;
    
    // Check if this is a defense project
    const isDefenseProject = projectCard.classList.contains('defense-project');
    
    // Apply appropriate modal styling
    if (isDefenseProject) {
        modalContent.classList.add('defense-modal');
    } else {
        modalContent.classList.remove('defense-modal');
    }
    
    // Set modal content
    modalTitle.textContent = projectTitle;
    modalBody.innerHTML = projectContent;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.animation = 'modalSlideIn 0.3s ease-out';
    }, 10);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeProjectModal();
            }
        });
    }
});

// Handle window resize to switch between dropdown and modal
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Close modal if open and switch to dropdown
        closeProjectModal();
    } else {
        // Close any open dropdowns
        const activeDropdowns = document.querySelectorAll('.project-dropdown-content.active');
        const activeCards = document.querySelectorAll('.project-card.active');
        
        activeDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        activeCards.forEach(card => card.classList.remove('active'));
    }
});

// Certificate Provider Toggle Function
function toggleCertProvider(certId) {
    const content = document.getElementById(certId);
    const card = content.closest('.cert-provider-card');
    const isCurrentlyActive = content.classList.contains('active');
    
    // Check if we're on mobile (≤768px)
    if (window.innerWidth <= 768) {
        // On mobile, open modal instead of dropdown
        openCertModal(card);
        return;
    }
    
    // Desktop behavior - dropdown toggle
    // First, close all other open certificates immediately
    document.querySelectorAll('.cert-provider-content').forEach(otherContent => {
        if (otherContent !== content) {
            otherContent.classList.remove('active');
            otherContent.closest('.cert-provider-card').classList.remove('active');
        }
    });
    
    // Then toggle the current certificate
    if (isCurrentlyActive) {
        content.classList.remove('active');
        card.classList.remove('active');
    } else {
        content.classList.add('active');
        card.classList.add('active');
    }
}

// Open Certificate Modal (Mobile Only)
function openCertModal(card) {
    const modal = document.getElementById('certModal');
    const modalBody = modal.querySelector('.cert-modal-body');
    
    // Extract card data
    const logo = card.querySelector('.cert-provider-logo img');
    const providerName = card.querySelector('.cert-provider-info h3').textContent;
    const providerDesc = card.querySelector('.cert-provider-info p').textContent;
    const certCount = card.querySelector('.cert-count').textContent;
    const certItems = card.querySelectorAll('.cert-item');
    
    // Build modal content
    let modalContent = `
        <div class="cert-modal-provider">
            <div class="cert-modal-provider-header">
                <div class="cert-modal-provider-logo">
                    <img src="${logo.src}" alt="${logo.alt}">
                </div>
                <div class="cert-modal-provider-info">
                    <h3>${providerName}</h3>
                    <p>${providerDesc}</p>
                    <span class="cert-count">${certCount}</span>
                </div>
            </div>
            <div class="cert-modal-certs">
    `;
    
    // Add each certificate item
    certItems.forEach(item => {
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        const viewBtn = item.querySelector('.cert-btn:not(.cert-validate)');
        const validateBtn = item.querySelector('.cert-validate');
        
        modalContent += `
            <div class="cert-modal-item">
                <div class="cert-modal-item-info">
                    <h4>${title}</h4>
                    <p>${description}</p>
                </div>
                <div class="cert-modal-item-actions">
        `;
        
        if (viewBtn) {
            modalContent += `
                <a href="${viewBtn.href}" class="cert-modal-btn" target="_blank">
                    <i class="fas fa-eye"></i> View
                </a>
            `;
        }
        
        if (validateBtn) {
            modalContent += `
                <a href="${validateBtn.href}" class="cert-modal-btn cert-validate" target="_blank">
                    <i class="fas fa-check-circle"></i> Validate
                </a>
            `;
        }
        
        modalContent += `
                </div>
            </div>
        `;
    });
    
    modalContent += `
            </div>
        </div>
    `;
    
    // Insert content and show modal
    modalBody.innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Certificate Modal
function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear modal content after animation
    setTimeout(() => {
        if (!modal.classList.contains('active')) {
            modal.querySelector('.cert-modal-body').innerHTML = '';
        }
    }, 300);
}

// Handle window resize to close modal if screen becomes larger
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeCertModal();
    }
});

// Handle escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('certModal').classList.contains('active')) {
        closeCertModal();
    }
});

// Add smooth scrolling behavior for certificate section
document.addEventListener('DOMContentLoaded', function() {
    // Add intersection observer for certificate cards animation
    const certCards = document.querySelectorAll('.cert-provider-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    certCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Simple Carousel for Malaundry Card
function malaundryCarouselPrev(e) {
    e.preventDefault();
    const carousel = e.target.closest('.malaundry-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    if (!images || images.length === 0) return;
    let idx = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (idx === -1) idx = 0;
    images[idx].classList.remove('active');
    images[idx].style.display = 'none';
    idx = (idx - 1 + images.length) % images.length;
    images[idx].classList.add('active');
    images[idx].style.display = 'block';
}
function malaundryCarouselNext(e) {
    e.preventDefault();
    const carousel = e.target.closest('.malaundry-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    if (!images || images.length === 0) return;
    let idx = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (idx === -1) idx = 0;
    images[idx].classList.remove('active');
    images[idx].style.display = 'none';
    idx = (idx + 1) % images.length;
    images[idx].classList.add('active');
    images[idx].style.display = 'block';
}

// Wrap initialization so it can be re-run after partials are injected
window.initAppScripts = function() {
    // Re-query DOM elements that might be missing at first load
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu && !navToggle.dataset.bound) {
        navToggle.dataset.bound = '1';
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        });
    }
    // Bind nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (!link.dataset.bound) {
            link.dataset.bound = '1';
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.querySelectorAll('.bar').forEach(bar => {
                        bar.style.transform = '';
                        bar.style.opacity = '';
                    });
                }
            });
        }
    });
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.dataset.bound) {
            anchor.dataset.bound = '1';
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            });
        }
    });
    // Observer / sections
    window.highlightNavLink && window.removeEventListener('scroll', highlightNavLink);
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', highlightNavLink);
    // Re-observe elements for fade-in
    document.querySelectorAll('section, .cert-card, .skill-category, .contact-card, .timeline-item').forEach(el => {
        if (!el.dataset.observed) {
            el.dataset.observed = '1';
            observer.observe(el);
        }
    });
    // Highlight state after injection
    highlightNavLink();
    // Particles if not yet
    ensureParticles();
};
// If partials already loaded (direct load without dynamic injection) run immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => window.initAppScripts && window.initAppScripts(), 0);
} else {
    document.addEventListener('partials:loaded', () => window.initAppScripts && window.initAppScripts());
}
