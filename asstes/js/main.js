/**
 * لمسة كلين - Main JavaScript File
 * ملف JavaScript الرئيسي للتفاعلات والأنيميشن
 */

// ========================================
// 1. Initialize on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initNavbar();
    initIntersectionObserver();
    initCarousel();
    initFAQ();
    initPriceCalculator();
    initContactForm();
    initMobileMenu();
    initProgressLine();
    
    // Set minimum date for date picker
    setMinimumDate();
    
    // Analytics tracking
    trackPageView();
    
    console.log('✨ لمسة كلين - Website Initialized Successfully');
}

// ========================================
// 2. Sticky Navbar with Scroll Effect
// ========================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.remove('show');
                    }
                }
            }
        });
    });
}

// ========================================
// 3. Mobile Menu Toggle
// ========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                mobileMenu.style.display = 'block';
                mobileMenu.classList.add('show');
            } else {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('show');
            }
        });
    }
}

// ========================================
// 4. Intersection Observer for Fade-in Animations
// ========================================

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// 5. Gallery Carousel
// ========================================

let currentSlide = 0;
const totalSlides = 4; // Update if you change number of images

function initCarousel() {
    // Auto-play carousel
    setInterval(function() {
        nextSlide();
    }, 5000);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            previousSlide();
        } else if (e.key === 'ArrowLeft') {
            nextSlide();
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.getElementById('gallery-carousel');
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            previousSlide();
        }
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('gallery-carousel');
    if (carousel) {
        carousel.style.transform = `translateX(${currentSlide * 100}%)`;
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-primary');
        } else {
            indicator.classList.remove('active');
            indicator.classList.remove('bg-primary');
            indicator.classList.add('bg-gray-300');
        }
    });
}

// ========================================
// 6. FAQ Accordion
// ========================================

function initFAQ() {
    // Already handled by toggleFaq function
}

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isActive = button.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== button) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('show');
        }
    });
    
    // Toggle current FAQ
    if (isActive) {
        button.classList.remove('active');
        answer.classList.remove('show');
    } else {
        button.classList.add('active');
        answer.classList.add('show');
    }
    
    // Update ARIA attributes for accessibility
    const expanded = !isActive;
    button.setAttribute('aria-expanded', expanded);
}

// ========================================
// 7. Price Calculator
// ========================================

function initPriceCalculator() {
    const form = document.getElementById('price-calculator-form');
    if (form) {
        // Add real-time calculation on input change
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Optional: Auto-calculate on change
                // calculatePrice();
            });
        });
    }
}

function calculatePrice() {
    // Get form values
    const serviceType = document.getElementById('service-type').value;
    const area = parseInt(document.getElementById('area').value) || 0;
    const rooms = parseInt(document.getElementById('rooms').value) || 0;
    
    // Base prices for each service (SAR per square meter)
    const basePrices = {
        'house': 3,
        'deep': 5,
        'furniture': 4,
        'office': 3.5,
        'after-construction': 6,
        'sanitization': 4.5
    };
    
    // Calculate base price
    let basePrice = area * basePrices[serviceType];
    
    // Add room multiplier
    const roomPrice = rooms * 50;
    
    // Calculate additional services
    let additionalPrice = 0;
    const additionalServices = document.querySelectorAll('.additional-service:checked');
    additionalServices.forEach(service => {
        additionalPrice += parseInt(service.dataset.price);
    });
    
    // Calculate total
    const totalPrice = basePrice + roomPrice + additionalPrice;
    
    // Display result
    const priceResult = document.getElementById('price-result');
    const calculatedPrice = document.getElementById('calculated-price');
    
    if (priceResult && calculatedPrice) {
        calculatedPrice.textContent = totalPrice.toFixed(0) + ' ريال';
        priceResult.classList.remove('hidden');
        
        // Smooth scroll to result
        priceResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Track analytics event
    trackEvent('price_calculated', {
        service: serviceType,
        area: area,
        rooms: rooms,
        total: totalPrice
    });
}

// ========================================
// 8. Contact Modal
// ========================================

function openContactModal(serviceName = '') {
    const modal = document.getElementById('contact-modal');
    const serviceSelect = document.getElementById('modal-service');
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill service if provided
        if (serviceName && serviceSelect) {
            serviceSelect.value = serviceName;
        }
        
        // Focus first input for accessibility
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
        
        // Track analytics event
        trackEvent('contact_modal_opened', { service: serviceName });
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// Close modal on backdrop click
document.getElementById('contact-modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeContactModal();
    }
});

// ========================================
// 9. Contact Form Submission
// ========================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('modal-name').value,
                phone: document.getElementById('modal-phone').value,
                address: document.getElementById('modal-address').value,
                service: document.getElementById('modal-service').value,
                details: document.getElementById('modal-details').value,
                timestamp: new Date().toISOString()
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual endpoint)
            setTimeout(function() {
                // Success
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Close modal
                closeContactModal();
                
                // Show success toast
                showSuccessToast();
                
                // Reset form
                form.reset();
                
                // Track analytics event
                trackEvent('form_submitted', formData);
                
                // In production, send to backend:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // })
                // .then(response => response.json())
                // .then(data => { ... })
                // .catch(error => { ... });
                
            }, 1500);
        });
    }
}

function validateForm(formData) {
    // Name validation
    if (formData.name.trim().length < 2) {
        alert('الرجاء إدخال اسم صحيح');
        return false;
    }
    
    // Phone validation (Saudi phone number)
    const phoneRegex = /^(05|5)[0-9]{8}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        alert('الرجاء إدخال رقم جوال صحيح (05xxxxxxxx)');
        return false;
    }
    
    // Address validation
    if (formData.address.trim().length < 5) {
        alert('الرجاء إدخال عنوان صحيح');
        return false;
    }
    
    // Service validation
    if (!formData.service) {
        alert('الرجاء اختيار نوع الخدمة');
        return false;
    }
    
    return true;
}

function showSuccessToast() {
    const toast = document.getElementById('success-toast');
    if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(function() {
            toast.classList.add('hidden');
            toast.classList.remove('show');
        }, 5000);
    }
}

// ========================================
// 10. Progress Line Animation
// ========================================

function initProgressLine() {
    const progressLine = document.getElementById('progress-line');
    
    if (progressLine) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressLine.style.width = '100%';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const section = document.getElementById('how-it-works');
        if (section) {
            observer.observe(section);
        }
    }
}

// ========================================
// 11. Set Minimum Date for Date Picker
// ========================================

function setMinimumDate() {
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        
        dateInput.min = `${year}-${month}-${day}`;
        dateInput.value = `${year}-${month}-${day}`;
    }
}

// ========================================
// 12. Analytics Tracking (Google Analytics / Facebook Pixel)
// ========================================

function trackPageView() {
    // Google Analytics
    if (typeof gtag === 'function') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname
        });
    }
    
    // Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('track', 'PageView');
    }
}

function trackEvent(eventName, eventData = {}) {
    console.log('Track Event:', eventName, eventData);
    
    // Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq === 'function') {
        fbq('trackCustom', eventName, eventData);
    }
    
    // DataLayer for GTM
    if (window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...eventData
        });
    }
}

// ========================================
// 13. Lazy Loading Images
// ========================================

// Native lazy loading is used via loading="lazy" attribute
// Additional observer for fade-in effect on images
function initLazyImages() {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// 14. Utility Functions
// ========================================

// Debounce function for performance
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

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return phone;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 0
    }).format(amount);
}

// ========================================
// 15. Error Handling
// ========================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Send to error tracking service in production
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Send to error tracking service in production
});

// ========================================
// 16. Performance Monitoring
// ========================================

// Log page load performance
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('📊 Performance Metrics:');
        console.log(`- Page Load Time: ${pageLoadTime}ms`);
        console.log(`- Connect Time: ${connectTime}ms`);
        console.log(`- Render Time: ${renderTime}ms`);
        
        // Track in analytics
        if (typeof gtag === 'function') {
            gtag('event', 'timing_complete', {
                name: 'page_load',
                value: pageLoadTime
            });
        }
    }
});

// ========================================
// 17. Service Worker Registration (for PWA - Optional)
// ========================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

// ========================================
// 18. Browser Compatibility Checks
// ========================================

function checkBrowserCompatibility() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, loading polyfill...');
        // Load polyfill or disable animations
    }
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        console.warn('CSS Grid not supported');
        // Add fallback styles
    }
}

checkBrowserCompatibility();

// ========================================
// 19. Console Welcome Message
// ========================================

console.log('%c✨ لمسة كلين', 'color: #0B84A5; font-size: 24px; font-weight: bold;');
console.log('%cشركة تنظيف احترافية في الرياض', 'color: #F59E0B; font-size: 14px;');
console.log('%cللتوظيف والشراكات: info@lamasaclean.com', 'color: #666; font-size: 12px;');

// ========================================
// End of Main JavaScript File
// ========================================