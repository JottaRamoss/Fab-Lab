// ===== REDE PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeAnimations();
    initializeSearch();
    initializeFilters();
});

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all lab cards
    const labCards = document.querySelectorAll('.lab-card');
    labCards.forEach(card => {
        observer.observe(card);
    });

    // Observe stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-form input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterLabs(searchTerm);
    });
}

// Filter labs based on search term
function filterLabs(searchTerm) {
    const labCards = document.querySelectorAll('.lab-card');
    
    labCards.forEach(card => {
        const labName = card.querySelector('h4').textContent.toLowerCase();
        const labLocation = card.querySelector('p').textContent.toLowerCase();
        const labDescription = card.querySelectorAll('p')[1].textContent.toLowerCase();
        
        const matches = labName.includes(searchTerm) || 
                       labLocation.includes(searchTerm) || 
                       labDescription.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Initialize region filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.labs-section .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const region = this.dataset.region;
            filterByRegion(region);
            updateActiveFilter(this);
        });
    });
}

// Filter labs by region
function filterByRegion(region) {
    const regionSections = document.querySelectorAll('.region-section');
    
    regionSections.forEach(section => {
        const sectionRegion = section.dataset.regionName;
        
        if (region === 'todos') {
            section.style.display = 'block';
        } else {
            if (sectionRegion === region) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }
    });
}

// Update active filter button
function updateActiveFilter(activeButton) {
    const filterButtons = document.querySelectorAll('.labs-section .filter-btn');
    
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    activeButton.classList.add('active');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Mobile menu functionality
const menuBtn = document.querySelector('.btn-menu');
const menu = document.querySelector('.menu');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Toggle aria-expanded
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent body scroll when menu is open
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on links
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 1023) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 1023) {
        menu.classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Initialize language on page load
const savedLanguage = localStorage.getItem('language') || 'pt';
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === savedLanguage) {
        btn.classList.add('active');
    }
});