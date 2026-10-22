// ==========================================
// LUXORA RESORT - INTERACTIVE FEATURES
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // NAVIGATION
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translateY(7px)' 
                : 'rotate(0) translateY(0)';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-7px)' 
                : 'rotate(0) translateY(0)';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translateY(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translateY(0)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // BOOKING FORM
    // ==========================================
    
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) {
        checkInInput.setAttribute('min', today);
    }
    
    // Update check-out minimum date based on check-in
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            const minCheckOut = checkInDate.toISOString().split('T')[0];
            checkOutInput.setAttribute('min', minCheckOut);
            
            // Reset check-out if it's before new minimum
            if (checkOutInput.value && checkOutInput.value < minCheckOut) {
                checkOutInput.value = '';
            }
        });
    }
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Calculate nights
            if (data.checkIn && data.checkOut) {
                const checkIn = new Date(data.checkIn);
                const checkOut = new Date(data.checkOut);
                const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
                data.nights = nights;
            }
            
            // Show confirmation
            showBookingConfirmation(data);
            
            // In production, this would send data to server
            console.log('Booking Data:', data);
        });
    }
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe room cards
    document.querySelectorAll('.room-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe amenity cards
    document.querySelectorAll('.amenity-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // ==========================================
    // ROOM FILTERING (Optional Enhancement)
    // ==========================================
    
    window.filterRooms = function(category) {
        const rooms = document.querySelectorAll('.room-card');
        
        rooms.forEach(room => {
            if (category === 'all' || room.dataset.category === category) {
                room.style.display = 'block';
                setTimeout(() => {
                    room.style.opacity = '1';
                    room.style.transform = 'translateY(0)';
                }, 100);
            } else {
                room.style.opacity = '0';
                room.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    room.style.display = 'none';
                }, 300);
            }
        });
    };
    
    // ==========================================
    // PARALLAX EFFECT (Subtle)
    // ==========================================
    
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // ==========================================
    // DYNAMIC STATS COUNTER (Optional)
    // ==========================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // ==========================================
    // IMAGE LAZY LOADING ENHANCEMENT
    // ==========================================
    
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ==========================================
    // PRICE CALCULATOR
    // ==========================================
    
    const roomPrices = {
        'Garden View Room': 11200,
        'Deluxe Ocean View': 16850,
        'Family Suite': 21350,
        'Premium Suite': 25300,
        'Beachfront Bungalow': 30950,
        'Royal Villa': 45000
    };
    
    window.calculateTotal = function() {
        const roomType = document.getElementById('roomType')?.value;
        const checkIn = document.getElementById('checkIn')?.value;
        const checkOut = document.getElementById('checkOut')?.value;
        
        if (roomType && checkIn && checkOut) {
            const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
            const pricePerNight = roomPrices[roomType] || 0;
            const total = nights * pricePerNight;
            
            return { nights, pricePerNight, total };
        }
        
        return null;
    };
    
});

// ==========================================
// GLOBAL UTILITY FUNCTIONS
// ==========================================

// Scroll to booking section with pre-filled room type
window.scrollToBooking = function(roomType) {
    const bookingSection = document.getElementById('booking');
    const roomTypeSelect = document.getElementById('roomType');
    
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select room type
        if (roomTypeSelect && roomType) {
            setTimeout(() => {
                roomTypeSelect.value = roomType;
                roomTypeSelect.focus();
                
                // Add highlight effect
                roomTypeSelect.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    roomTypeSelect.style.animation = '';
                }, 500);
            }, 800);
        }
    }
};

// Show booking confirmation modal
function showBookingConfirmation(data) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
        <h2 style="color: #1a1a2e; margin-bottom: 1rem;">Reservation Received!</h2>
        <p style="color: #636e72; margin-bottom: 2rem; line-height: 1.6;">
            Thank you, <strong>${data.guestName}</strong>! Your booking request for 
            <strong>${data.roomType}</strong> has been received. 
            We'll send a confirmation email to <strong>${data.email}</strong> within 24 hours.
        </p>
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; text-align: left;">
            <p style="margin: 0.5rem 0;"><strong>Check-in:</strong> ${formatDate(data.checkIn)}</p>
            <p style="margin: 0.5rem 0;"><strong>Check-out:</strong> ${formatDate(data.checkOut)}</p>
            <p style="margin: 0.5rem 0;"><strong>Guests:</strong> ${data.guests}</p>
            ${data.nights ? `<p style="margin: 0.5rem 0;"><strong>Duration:</strong> ${data.nights} night(s)</p>` : ''}
        </div>
        <button onclick="this.closest('div').parentElement.remove()" 
                style="padding: 1rem 2rem; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); 
                       color: #1a1a2e; border: none; border-radius: 8px; font-weight: 600; 
                       cursor: pointer; font-size: 1rem;">
            Close
        </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Reset form
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
    }
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Add pulse animation for focus effects
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Console greeting
console.log('%c🏖️ Welcome to Golden Pyramid Pavilion and Resort', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with modern web technologies', 'color: #636e72; font-size: 12px;');
