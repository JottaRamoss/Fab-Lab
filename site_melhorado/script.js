// ===== MODERN JAVASCRIPT FOR FAB LAB BRASIL - ENHANCED VERSION =====

// Utility functions
const utils = {
  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Animate number counting
  animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
    }, 16);
  },

  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    }
  },

  // Format phone number
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },

  // Validate email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
};

// ===== LOADING SCREEN =====
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.init();
  }

  init() {
    if (!this.loadingScreen) return;

    // Simulate loading progress
    const progressBar = this.loadingScreen.querySelector('.loading-progress');
    let progress = 0;

    const loadingInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        setTimeout(() => this.hide(), 500);
      }
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    }, 100);

    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
      clearInterval(loadingInterval);
      setTimeout(() => this.hide(), 1000);
    });
  }

  hide() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
      }, 350);
    }
  }
}

// ===== THEME TOGGLE =====
class ThemeToggle {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    if (!this.themeToggle) return;

    // Set initial theme
    this.setTheme(this.currentTheme);

    // Add event listener
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;

    // Update icon
    const icon = this.themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// ===== ADVANCED SLIDESHOW =====
class AdvancedSlideshow {
  constructor() {
    this.slideshow = document.querySelector('.slideshow');
    this.slides = document.querySelectorAll('.slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.prevBtn = document.querySelector('.slide-prev');
    this.nextBtn = document.querySelector('.slide-next');
    this.currentSlide = 0;
    this.slideInterval = null;
    this.isAutoPlaying = true;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.setupSlideBackgrounds();
    this.bindEvents();
    this.startAutoPlay();
    this.addTouchSupport();
    this.addKeyboardSupport();
  }

  setupSlideBackgrounds() {
    this.slides.forEach(slide => {
      const bgUrl = slide.dataset.bg;
      const bgElement = slide.querySelector('.slide-bg');
      if (bgUrl && bgElement) {
        bgElement.style.backgroundImage = `url(${bgUrl})`;
      }
    });
  }

  bindEvents() {
    // Navigation buttons
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Pause on hover
    this.slideshow?.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.slideshow?.addEventListener('mouseleave', () => this.resumeAutoPlay());

    // Intersection Observer for performance
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.resumeAutoPlay();
          } else {
            this.pauseAutoPlay();
          }
        });
      });
      observer.observe(this.slideshow);
    }
  }

  goToSlide(index) {
    // Remove active classes
    this.slides[this.currentSlide]?.classList.remove('active');
    this.indicators[this.currentSlide]?.classList.remove('active');

    // Update current slide
    this.currentSlide = index;

    // Add active classes
    this.slides[this.currentSlide]?.classList.add('active');
    this.indicators[this.currentSlide]?.classList.add('active');

    // Trigger custom event
    this.slideshow?.dispatchEvent(new CustomEvent('slideChange', {
      detail: { currentSlide: this.currentSlide }
    }));
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    if (!this.isAutoPlaying) return;
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  pauseAutoPlay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  resumeAutoPlay() {
    if (this.isAutoPlaying && !this.slideInterval) {
      this.startAutoPlay();
    }
  }

  addTouchSupport() {
    if (!this.slideshow) return;

    this.slideshow.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.slideshow.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const threshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  addKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
      if (!this.slideshow || !utils.isInViewport(this.slideshow)) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          break;
        case ' ':
          e.preventDefault();
          this.isAutoPlaying ? this.pauseAutoPlay() : this.resumeAutoPlay();
          break;
      }
    });
  }
}

// ===== RESPONSIVE NAVIGATION =====
class ResponsiveNavigation {
  constructor() {
    this.header = document.getElementById('header');
    this.menuBtn = document.querySelector('.btn-menu');
    this.menu = document.querySelector('.menu');
    this.menuItems = document.querySelectorAll('.menu-item-has-children');
    this.isOpen = false;
    this.lastScrollY = window.scrollY;
    
    this.init();
  }

  init() {
    if (!this.header) return;

    this.bindEvents();
    this.setupScrollBehavior();
    this.setupSubmenuBehavior();
  }

  bindEvents() {
    // Mobile menu toggle
    this.menuBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.menu?.contains(e.target) && !this.menuBtn?.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu when clicking on menu links
    this.menu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1023) {
          this.closeMenu();
        }
      });
    });
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.menu?.classList.add('active');
    this.menuBtn?.classList.add('active');
    this.menuBtn?.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.menu?.classList.remove('active');
    this.menuBtn?.classList.remove('active');
    this.menuBtn?.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    document.body.style.overflow = '';
  }

  setupScrollBehavior() {
    const scrollHandler = utils.throttle(() => {
      const currentScrollY = window.scrollY;

      // Add scrolled class
      if (currentScrollY > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      // Hide/show header on scroll
      if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
        this.header.style.transform = 'translateY(-100%)';
      } else {
        this.header.style.transform = 'translateY(0)';
      }

      this.lastScrollY = currentScrollY;
    }, 100);

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  setupSubmenuBehavior() {
    this.menuItems.forEach(item => {
      const link = item.querySelector('a');
      const submenu = item.querySelector('.sub-menu');

      if (link && submenu) {
        // Desktop hover behavior
        if (window.innerWidth > 1023) {
          item.addEventListener('mouseenter', () => {
            link.setAttribute('aria-expanded', 'true');
          });

          item.addEventListener('mouseleave', () => {
            link.setAttribute('aria-expanded', 'false');
          });
        }

        // Mobile click behavior
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 1023) {
            e.preventDefault();
            const isExpanded = link.getAttribute('aria-expanded') === 'true';
            link.setAttribute('aria-expanded', !isExpanded);
            submenu.style.display = isExpanded ? 'none' : 'block';
          }
        });
      }
    });
  }
}

// ===== SEARCH FUNCTIONALITY =====
class SearchPopup {
  constructor() {
    this.searchToggle = document.querySelector('.search-toggle');
    this.searchPopup = document.querySelector('.search-popup');
    this.closeBtn = document.querySelector('.btn-close');
    this.searchInput = document.querySelector('.search-form input');
    this.searchForm = document.querySelector('.search-form');
    
    this.init();
  }

  init() {
    if (!this.searchToggle || !this.searchPopup) return;

    this.bindEvents();
  }

  bindEvents() {
    // Open search
    this.searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    // Close search
    this.closeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    // Close when clicking outside
    this.searchPopup.addEventListener('click', (e) => {
      if (e.target === this.searchPopup) {
        this.close();
      }
    });

    // Handle search form submission
    this.searchForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.performSearch();
    });
  }

  open() {
    this.searchPopup.classList.add('active');
    this.searchPopup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus input after animation
    setTimeout(() => {
      this.searchInput?.focus();
    }, 100);
  }

  close() {
    this.searchPopup.classList.remove('active');
    this.searchPopup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  performSearch() {
    const query = this.searchInput?.value.trim();
    if (query) {
      // Here you would implement actual search functionality
      console.log('Searching for:', query);
      // For demo purposes, just close the popup
      this.close();
    }
  }
}

// ===== PROJECT FILTER =====
class ProjectFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    if (this.filterBtns.length === 0) return;

    this.bindEvents();
  }

  bindEvents() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.dataset.filter;
        this.filterProjects(filter);
        this.updateActiveButton(btn);
      });
    });
  }

  filterProjects(filter) {
    this.projectCards.forEach(card => {
      const category = card.dataset.category;
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  updateActiveButton(activeBtn) {
    this.filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('[data-aos]');
    this.stats = document.querySelectorAll('.stat-number');
    this.statsAnimated = false;
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupStatsAnimation();
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation attributes
    document.querySelectorAll('.service-card, .project-card, .stat, .section-header').forEach(el => {
      observer.observe(el);
    });
  }

  setupStatsAnimation() {
    if (!('IntersectionObserver' in window)) return;

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.statsAnimated) {
          this.animateStats();
          this.statsAnimated = true;
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  animateStats() {
    this.stats.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      utils.animateNumber(stat, target);
    });
  }
}

// ===== BACK TO TOP BUTTON =====
class BackToTop {
  constructor() {
    this.button = document.querySelector('.back-to-top');
    this.init();
  }

  init() {
    if (!this.button) return;

    this.bindEvents();
    this.setupScrollBehavior();
  }

  bindEvents() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  setupScrollBehavior() {
    const scrollHandler = utils.throttle(() => {
      if (window.scrollY > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }
}

// ===== ENHANCED FORM FUNCTIONALITY =====
class FormEnhancements {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.newsletterForm = document.getElementById('newsletter-form');
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.enhanceContactForm();
    }
    if (this.newsletterForm) {
      this.enhanceNewsletterForm();
    }
  }

  enhanceContactForm() {
    // Add real-time validation
    const inputs = this.contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateInput(input));
      input.addEventListener('input', () => this.clearErrors(input));
    });

    // Phone number formatting
    const phoneInput = this.contactForm.querySelector('input[type="tel"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = utils.formatPhone(e.target.value);
      });
    }

    // Handle form submission
    this.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm(this.contactForm)) {
        this.submitContactForm();
      }
    });
  }

  enhanceNewsletterForm() {
    this.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = this.newsletterForm.querySelector('input[type="email"]').value;
      if (utils.validateEmail(email)) {
        this.submitNewsletterForm(email);
      } else {
        this.showMessage('Por favor, insira um e-mail válido.', 'error');
      }
    });
  }

  validateInput(input) {
    let isValid = true;
    let message = '';

    // Check required fields
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      message = 'Este campo é obrigatório.';
    }

    // Email validation
    if (input.type === 'email' && input.value && !utils.validateEmail(input.value)) {
      isValid = false;
      message = 'Por favor, insira um e-mail válido.';
    }

    // Phone validation
    if (input.type === 'tel' && input.value && input.value.replace(/\D/g, '').length < 10) {
      isValid = false;
      message = 'Por favor, insira um telefone válido.';
    }

    if (!isValid) {
      input.classList.add('error');
      this.showInputError(input, message);
    } else {
      input.classList.remove('error');
      this.clearInputError(input);
    }

    return isValid;
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  showInputError(input, message) {
    let errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.color = 'var(--danger-color)';
      errorElement.style.fontSize = 'var(--text-sm)';
      errorElement.style.marginTop = 'var(--space-xs)';
      input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearInputError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  clearErrors(input) {
    input.classList.remove('error');
    this.clearInputError(input);
  }

  async submitContactForm() {
    const formData = new FormData(this.contactForm);
    const data = Object.fromEntries(formData);

    try {
      // Show loading state
      const submitBtn = this.contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success
      this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      this.contactForm.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

    } catch (error) {
      this.showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
      
      // Reset button
      const submitBtn = this.contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span>Enviar mensagem</span><i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;
    }
  }

  async submitNewsletterForm(email) {
    try {
      const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.showMessage('Inscrição realizada com sucesso!', 'success');
      this.newsletterForm.reset();

      // Reset button
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;

    } catch (error) {
      this.showMessage('Erro ao realizar inscrição. Tente novamente.', 'error');
      
      const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;
    }
  }

  showMessage(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
      color: white;
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-toast);
      transform: translateX(100%);
      transition: transform var(--transition-base);
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 5000);
  }
}

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    this.logPageLoadTime();
    this.setupPerformanceObserver();
    this.monitorMemoryUsage();
  }

  logPageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`🚀 Página carregada em ${Math.round(loadTime)}ms`);
      
      // Log navigation timing
      if (performance.getEntriesByType) {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          console.log(`📊 DNS: ${Math.round(navTiming.domainLookupEnd - navTiming.domainLookupStart)}ms`);
          console.log(`📊 TCP: ${Math.round(navTiming.connectEnd - navTiming.connectStart)}ms`);
          console.log(`📊 Request: ${Math.round(navTiming.responseStart - navTiming.requestStart)}ms`);
          console.log(`📊 Response: ${Math.round(navTiming.responseEnd - navTiming.responseStart)}ms`);
          console.log(`📊 DOM: ${Math.round(navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart)}ms`);
        }
      }
    });
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Monitor Long Tasks
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              console.warn(`⚠️ Long task detected: ${Math.round(entry.duration)}ms`);
            }
          });
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API not supported
      }

      // Monitor Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`📊 LCP: ${Math.round(lastEntry.startTime)}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP API not supported
      }
    }
  }

  monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const used = Math.round(memory.usedJSHeapSize / 1048576);
        const total = Math.round(memory.totalJSHeapSize / 1048576);
        
        if (used > 50) { // Alert if using more than 50MB
          console.warn(`🧠 High memory usage: ${used}MB / ${total}MB`);
        }
      }, 30000); // Check every 30 seconds
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.setupFocusManagement();
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupReducedMotion();
  }

  setupFocusManagement() {
    // Ensure focus is visible for keyboard users
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  setupKeyboardNavigation() {
    // Add keyboard support for custom interactive elements
    document.querySelectorAll('[role="button"]:not(button)').forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });

    // Skip links for better navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.focus();
        }
      });
    });
  }

  setupScreenReaderSupport() {
    // Create live region for announcements
    this.createLiveRegion();

    // Announce page changes
    this.announcePageChanges();
  }

  setupReducedMotion() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Disable animations
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  announcePageChanges() {
    // Announce when sections come into view
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.querySelector('h2')?.textContent || 
                               entry.target.getAttribute('aria-label') || 
                               'Nova seção';
            this.announce(`Navegando para: ${sectionName}`);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
    }
  }

  announce(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
}

// ===== INITIALIZATION =====
class FabLabApp {
  constructor() {
    this.components = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components = [
        new LoadingScreen(),
        new ThemeToggle(),
        new AdvancedSlideshow(),
        new ResponsiveNavigation(),
        new SearchPopup(),
        new ProjectFilter(),
        new ScrollAnimations(),
        new BackToTop(),
        new FormEnhancements(),
        new PerformanceMonitor(),
        new AccessibilityEnhancements()
      ];

      // Setup additional features
      this.setupSmoothScrolling();
      this.setupLazyLoading();
      this.setupServiceWorker();

      console.log('✅ Fab Lab Brasil - Todos os componentes inicializados com sucesso!');
    } catch (error) {
      console.error('❌ Erro na inicialização:', error);
    }
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.getElementById('header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupLazyLoading() {
    // Initialize lazy loading for images
    utils.lazyLoadImages();
  }

  setupServiceWorker() {
    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('✅ Service Worker registrado:', registration);
          })
          .catch(registrationError => {
            console.log('❌ Falha no registro do Service Worker:', registrationError);
          });
      });
    }
  }
}

// ===== START APPLICATION =====
const app = new FabLabApp();

