// ========== DOM LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 300);
        }, 500);
    }
    
    // Initialize all functions
    initNavbar();
    initScrollAnimations();
    initPortfolioFilter();
    initContactForm();
    initTestimonialSlider();
    initAnimations();
    initCounterAnimation();
    initTypingAnimation();
    
    // Show feedback modal after 5 seconds
    setTimeout(showFeedbackModal, 5000);
});

// ========== NAVBAR FUNCTIONALITY ==========
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== PORTFOLIO FILTER ==========
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add click animations to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Here you can add functionality to open a modal with larger image
            // For now, we'll just log the item data
            const category = this.getAttribute('data-category');
            console.log(`Portfolio item clicked: ${category}`);
        });
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const contactForm = document.getElementById('projectForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send this data to a server
            // For now, we'll simulate a successful submission
            
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Log form data (for testing)
            console.log('Form submitted:', data);
        });
    }
}

// ========== TESTIMONIAL SLIDER ==========
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Auto-rotate testimonials
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
            
            if (index === currentIndex) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
        });
        
        currentIndex = (currentIndex + 1) % testimonialCards.length;
    }
    
    // Start rotation if we have testimonials
    if (testimonialCards.length > 1) {
        rotateTestimonials(); // Show first testimonial immediately
        setInterval(rotateTestimonials, 5000); // Rotate every 5 seconds
        
        // Add hover pause
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                clearInterval(window.testimonialInterval);
            });
            
            card.addEventListener('mouseleave', () => {
                clearInterval(window.testimonialInterval);
                window.testimonialInterval = setInterval(rotateTestimonials, 5000);
            });
        });
        
        // Store interval ID
        window.testimonialInterval = setInterval(rotateTestimonials, 5000);
    }
}

// ========== ANIMATIONS ==========
function initAnimations() {
    // Add animation classes to elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image-container');
    
    // Add animation delays
    if (heroTitle) heroTitle.style.animationDelay = '0.2s';
    if (heroDescription) heroDescription.style.animationDelay = '0.4s';
    if (heroButtons) heroButtons.style.animationDelay = '0.6s';
    if (heroImage) heroImage.style.animationDelay = '0.8s';
    
    // Add scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }
}

// ========== FEEDBACK MODAL ==========
function showFeedbackModal() {
    // Check if user has already given feedback
    if (localStorage.getItem('feedbackGiven')) return;
    
    // Create modal HTML
    const modalHTML = `
        <div class="feedback-modal" id="feedbackModal">
            <div class="feedback-content">
                <button class="close-modal" id="closeModal">&times;</button>
                <h3>How's your experience?</h3>
                <p>We'd love your feedback to improve!</p>
                
                <div class="rating-stars" id="ratingStars">
                    <i class="fas fa-star star" data-rating="1"></i>
                    <i class="fas fa-star star" data-rating="2"></i>
                    <i class="fas fa-star star" data-rating="3"></i>
                    <i class="fas fa-star star" data-rating="4"></i>
                    <i class="fas fa-star star" data-rating="5"></i>
                </div>
                
                <textarea class="form-control" id="feedbackText" placeholder="Any suggestions? (optional)"></textarea>
                <button class="btn-submit" id="submitFeedback">Submit Feedback</button>
                <button class="btn-secondary" id="skipFeedback">Maybe Later</button>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .feedback-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            .feedback-content {
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                border: 2px solid rgba(99, 102, 241, 0.3);
                text-align: center;
                animation: slideUp 0.5s ease;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: var(--light);
                font-size: 24px;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .close-modal:hover {
                color: var(--primary);
            }
            
            .feedback-content h3 {
                margin-bottom: 10px;
            }
            
            .feedback-content p {
                color: #94A3B8;
                margin-bottom: 30px;
            }
            
            .rating-stars {
                margin-bottom: 20px;
            }
            
            .star {
                font-size: 30px;
                color: var(--primary);
                cursor: pointer;
                margin: 0 5px;
                transition: all 0.2s ease;
                opacity: 0.4;
            }
            
            .star:hover,
            .star.active {
                color: var(--primary);
                transform: scale(1.2);
                opacity: 1;
            }
            
            #feedbackText {
                width: 100%;
                margin-bottom: 20px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(99, 102, 241, 0.3);
                color: var(--light);
                padding: 15px;
                border-radius: 10px;
                resize: vertical;
                min-height: 100px;
            }
            
            #skipFeedback {
                background: transparent;
                color: var(--light);
                border: 2px solid #94A3B8;
                padding: 8px 15px;
                border-radius: 50px;
                margin: 15px auto 0;
                font-size: 0.85rem;
                transition: all 0.3s ease;
                cursor: pointer;
                display: block;
            }
            
            #skipFeedback:hover {
                border-color: var(--primary);
                color: var(--primary);
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Add event listeners
    const modal = document.getElementById('feedbackModal');
    const closeBtn = document.getElementById('closeModal');
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('submitFeedback');
    const skipBtn = document.getElementById('skipFeedback');
    
    let selectedRating = 0;
    
    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-rating');
            updateStars(selectedRating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = this.getAttribute('data-rating');
            updateStars(rating);
        });
    });
    
    document.getElementById('ratingStars').addEventListener('mouseleave', function() {
        updateStars(selectedRating);
    });
    
    function updateStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-rating') <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    skipBtn.addEventListener('click', closeModal);
    
    // Submit feedback
    submitBtn.addEventListener('click', function() {
        const feedbackText = document.getElementById('feedbackText').value;
        
        if (selectedRating === 0) {
            showNotification('Please select a rating!', 'error');
            return;
        }
        
        // Here you would typically send feedback to your server
        console.log('Feedback submitted:', {
            rating: selectedRating,
            feedback: feedbackText
        });
        
        // Store that feedback was given
        localStorage.setItem('feedbackGiven', 'true');
        
        showNotification('Thank you for your feedback!', 'success');
        closeModal();
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    const notificationStyles = `
        <style>
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(10px);
                border-left: 4px solid #6366F1;
                padding: 15px 20px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.25);
                z-index: 9998;
                animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
                animation-fill-mode: forwards;
            }
            
            .notification-success {
                border-left-color: #10B981;
            }
            
            .notification-error {
                border-left-color: #F87171;
            }
            
            .notification i {
                font-size: 20px;
            }
            
            .notification-success i {
                color: #10B981;
            }
            
            .notification-error i {
                color: #F87171;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        </style>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = notificationStyles;
        document.head.appendChild(styleElement);
    }
    
    // Add to page and remove after 3 seconds
    document.body.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// ========== ADDITIONAL EFFECTS ==========
// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ========== COUNTER ANIMATION ==========
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-counter');
    const speed = 50; // Milliseconds per increment
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCount, speed);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCount();
        });
    }
    
    // Trigger animation when stats section comes into view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset animation on every view
                    animateCounters();
                    
                    // Loop the animation every 5 seconds
                    setInterval(animateCounters, 5000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// ========== TYPING ANIMATION ==========
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const phrases = [
        { text: 'Transform your Ideas', lastWord: ' in to Reality' },
        { text: 'Transform visuals', lastWord: ' in to Story' },
        { text: 'Transform imagination', lastWord: ' to Stunning Design' }
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 60;
    const deletingSpeed = 30;
    const pauseDuration = 2000;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        const fullText = currentPhrase.text + ' ' + currentPhrase.lastWord;
        
        if (isDeleting) {
            charIndex--;
            updateDisplay(fullText, charIndex);
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, deletingSpeed);
            }
        } else {
            charIndex++;
            updateDisplay(fullText, charIndex);
            
            if (charIndex === fullText.length) {
                isDeleting = true;
                setTimeout(type, pauseDuration);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }
    
    function updateDisplay(fullText, currentLength) {
        const currentPhrase = phrases[phraseIndex];
        const mainText = currentPhrase.text;
        const lastWord = currentPhrase.lastWord;
        const fullString = mainText + ' ' + lastWord;
        
        const visibleText = fullString.substring(0, currentLength);
        const mainPartLength = mainText.length + 1;
        
        if (currentLength <= mainPartLength) {
            // Still typing the main text
            typingText.innerHTML = visibleText;
        } else {
            // Typing the last word
            const lastWordVisible = visibleText.substring(mainPartLength);
            typingText.innerHTML = mainText + ' <span class="gradient-text">' + lastWordVisible + '</span>';
        }
    }
    
    type();
}
const select = document.querySelector(".custom-select");
const selected = select.querySelector(".selected");
const options = select.querySelector(".options");
const hiddenInput = document.querySelector("#service");

selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

options.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        hiddenInput.value = option.getAttribute("data-value");
        options.style.display = "none";
    });
});

document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) options.style.display = "none";
});


// Add cursor effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add loading screen HTML
document.body.insertAdjacentHTML('afterbegin', '<div class="loading"></div>');