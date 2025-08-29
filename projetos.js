// ===== JAVASCRIPT ESPECÍFICO PARA PÁGINA PROJETOS - VERSÃO OTIMIZADA =====

'use strict';

// ===== CONFIGURAÇÃO E CONSTANTES =====
const PROJECTS_CONFIG = {
  ANIMATION_DELAY: 100,
  FILTER_TRANSITION: 300,
  LOAD_MORE_BATCH_SIZE: 6,
  MODAL_TRANSITION: 250,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
  API_ENDPOINT: '/api/projects', // Placeholder para API real
  INTERSECTION_THRESHOLD: 0.1,
  DEBOUNCE_DELAY: 250,
  STATS_ANIMATION_DURATION: 2000
};

// ===== DADOS DOS PROJETOS (SIMULADO - SUBSTITUIR POR API REAL) =====
const PROJECTS_DATA = [
  {
    id: 1,
    title: "EPIs para COVID-19",
    description: "Durante a pandemia, mobilizamos nossa rede para produzir mais de 50.000 equipamentos de proteção individual, incluindo máscaras face shield e suportes para máscaras N95.",
    fullDescription: "Este projeto emergencial foi desenvolvido em resposta à pandemia de COVID-19, quando houve escassez crítica de equipamentos de proteção individual no Brasil. Nossa rede de Fab Labs se mobilizou rapidamente para projetar, testar e produzir em massa diversos tipos de EPIs utilizando impressão 3D e corte a laser.",
    category: ["impressao-3d", "saude"],
    tags: ["Impressão 3D", "Saúde", "Emergência", "Solidariedade"],
    date: "2020-2021",
    status: "completed",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80"
    ],
    metrics: {
      volunteers: "200+",
      epis_produced: "50.000+",
      labs_involved: "25",
      beneficiaries: "15.000+"
    },
    technologies: ["Impressão 3D", "Corte a Laser", "Design Paramétrico"],
    partners: ["FIRJAN", "Hospitais Públicos", "Secretaria de Saúde"],
    impact: "Contribuiu significativamente para a proteção de profissionais de saúde durante o pico da pandemia no Rio de Janeiro.",
    featured: true
  },
  {
    id: 2,
    title: "Braço Robótico Educacional",
    description: "Desenvolvimento de um braço robótico de baixo custo para ensino de robótica e automação, utilizado em mais de 50 escolas técnicas do Rio de Janeiro.",
    fullDescription: "Projeto educacional focado no desenvolvimento de um braço robótico acessível para instituições de ensino. O kit inclui todos os componentes necessários, material didático completo e plataforma de programação visual.",
    category: ["robotica", "educacao"],
    tags: ["Robótica", "Educação", "Arduino", "Automação"],
    date: "2022-2023",
    status: "completed",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    ],
    metrics: {
      schools: "50+",
      students: "2.000+",
      teachers_trained: "150",
      cost_reduction: "70%"
    },
    technologies: ["Arduino", "Impressão 3D", "Servo Motores", "Programação Visual"],
    partners: ["SENAI", "Escolas Técnicas", "Secretaria de Educação"],
    impact: "Democratizou o acesso ao ensino de robótica em escolas públicas e técnicas.",
    featured: true
  },
  {
    id: 3,
    title: "Sistema de Monitoramento Ambiental",
    description: "Rede de sensores IoT para monitoramento da qualidade do ar e água em tempo real em diferentes pontos da cidade.",
    fullDescription: "Sistema integrado de monitoramento ambiental utilizando sensores IoT distribuídos pela cidade para coleta de dados em tempo real sobre qualidade do ar, água e ruído urbano.",
    category: ["iot", "sustentabilidade"],
    tags: ["IoT", "Sustentabilidade", "Sensores", "Dados Ambientais"],
    date: "2023-2024",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ],
    metrics: {
      sensors: "100+",
      cities: "5",
      data_points: "1M+",
      alerts_sent: "500+"
    },
    technologies: ["Arduino", "LoRaWAN", "Sensores Ambientais", "Dashboard Web"],
    partners: ["Prefeituras", "INEA", "Universidades"],
    impact: "Fornece dados precisos para políticas públicas ambientais.",
    featured: false
  },
  {
    id: 4,
    title: "Próteses Acessíveis",
    description: "Desenvolvimento de próteses de baixo custo utilizando impressão 3D para pessoas com deficiência.",
    fullDescription: "Projeto social focado no desenvolvimento e produção de próteses funcionais de baixo custo, personalizadas para cada usuário através de tecnologias de fabricação digital.",
    category: ["impressao-3d", "saude"],
    tags: ["Impressão 3D", "Saúde", "Inclusão", "Próteses"],
    date: "2021-2022",
    status: "completed",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80"
    ],
    metrics: {
      prosthetics_delivered: "150",
      beneficiaries: "150",
      cost_reduction: "90%",
      satisfaction_rate: "95%"
    },
    technologies: ["Impressão 3D", "Escaneamento 3D", "Design Paramétrico"],
    partners: ["Hospitais", "ONGs", "Associações"],
    impact: "Melhorou significativamente a qualidade de vida dos beneficiários.",
    featured: false
  },
  {
    id: 5,
    title: "Kit Robótica Educacional",
    description: "Kit completo para ensino de robótica em escolas, com componentes de baixo custo e material didático.",
    fullDescription: "Kit educacional completo desenvolvido especificamente para o ensino de robótica em escolas brasileiras, incluindo componentes, sensores, material didático e plataforma de programação.",
    category: ["robotica", "educacao"],
    tags: ["Robótica", "Educação", "Kit Didático", "STEM"],
    date: "2022-2023",
    status: "completed",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    ],
    metrics: {
      kits_distributed: "500",
      schools: "100",
      students_reached: "5.000",
      teacher_satisfaction: "92%"
    },
    technologies: ["Arduino", "Sensores", "Motores", "Programação Educacional"],
    partners: ["Escolas", "Secretarias de Educação", "Universidades"],
    impact: "Introduziu milhares de estudantes ao mundo da robótica e programação.",
    featured: false
  },
  {
    id: 6,
    title: "Filamento Reciclado",
    description: "Processo de reciclagem de resíduos plásticos para produção de filamento para impressão 3D.",
    fullDescription: "Projeto de economia circular que transforma resíduos plásticos em filamento de alta qualidade para impressão 3D, reduzindo custos e impacto ambiental.",
    category: ["sustentabilidade", "impressao-3d"],
    tags: ["Sustentabilidade", "Reciclagem", "Economia Circular", "Impressão 3D"],
    date: "2023-2024",
    status: "ongoing",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80"
    ],
    metrics: {
      plastic_recycled: "2.5 ton",
      filament_produced: "1.8 ton",
      cost_reduction: "60%",
      co2_saved: "3.2 ton"
    },
    technologies: ["Extrusora", "Triturador", "Controle de Qualidade"],
    partners: ["Cooperativas de Reciclagem", "Empresas", "Universidades"],
    impact: "Contribui para a economia circular e redução de resíduos plásticos.",
    featured: false
  }
];

// ===== UTILITÁRIOS =====
class Utils {
  /**
   * Debounce function to limit function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function to limit function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   */
  static announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Track analytics events
   * @param {string} eventName - Event name
   * @param {Object} parameters - Event parameters
   */
  static trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'Projects',
        ...parameters
      });
    }
    
    // Console log for development
    if (process?.env?.NODE_ENV === 'development') {
      console.log('Event tracked:', eventName, parameters);
    }
  }

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if element is in viewport
   */
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Animate number from start to target
   * @param {Element} element - Element to animate
   * @param {number} target - Target number
   * @param {number} duration - Animation duration in milliseconds
   */
  static animateNumber(element, target, duration = PROJECTS_CONFIG.STATS_ANIMATION_DURATION) {
    const start = 0;
    const startTime = performance.now();
    const suffix = target >= 1000 ? '+' : '';
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      element.textContent = current + suffix;
      element.setAttribute('aria-label', `${current} ${element.nextElementSibling?.textContent || ''}`);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// ===== GERENCIADOR DE CACHE =====
class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Set cache entry
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, value, ttl = PROJECTS_CONFIG.CACHE_DURATION) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  /**
   * Get cache entry
   * @param {string} key - Cache key
   * @returns {*} Cached value or null if expired/not found
   */
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }

  /**
   * Clear expired entries
   */
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
  }
}

// ===== CLASSE PRINCIPAL DA PÁGINA PROJETOS =====
class ProjectsPage {
  constructor() {
    this.projectsData = [...PROJECTS_DATA];
    this.filteredProjects = [...PROJECTS_DATA];
    this.currentFilter = 'all';
    this.displayedProjects = 0;
    this.isLoading = false;
    this.cache = new CacheManager();
    
    // Elementos DOM
    this.filterButtons = null;
    this.projectsGrid = null;
    this.loadMoreBtn = null;
    this.statsNumbers = null;
    this.filterResultsAnnouncement = null;
    
    // Componentes
    this.modal = null;
    this.intersectionObserver = null;
    this.imageObserver = null;
    
    // Bind methods
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleResize = Utils.debounce(this.handleResize.bind(this), PROJECTS_CONFIG.DEBOUNCE_DELAY);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    
    this.init();
  }

  /**
   * Initialize the projects page
   */
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    try {
      this.cacheElements();
      this.setupIntersectionObserver();
      this.initializeFilters();
      this.initializeProjectGrid();
      this.initializeModal();
      this.initializeLoadMore();
      this.initializeStats();
      this.bindEvents();
      
      console.log('🎯 Página Projetos - JavaScript inicializado com sucesso!');
    } catch (error) {
      console.error('Erro na inicialização da página Projetos:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectsGrid = document.querySelector('.projects-grid');
    this.loadMoreBtn = document.querySelector('.btn-load-more');
    this.statsNumbers = document.querySelectorAll('.stat-number');
    this.filterResultsAnnouncement = document.getElementById('filter-results-announcement');
    
    // Validate required elements
    if (!this.projectsGrid) {
      throw new Error('Projects grid element not found');
    }
  }

  /**
   * Setup intersection observer for animations
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, falling back to immediate animations');
      return;
    }
    
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: PROJECTS_CONFIG.INTERSECTION_THRESHOLD,
      rootMargin: '0px 0px -50px 0px'
    });

    // Setup image lazy loading observer
    this.setupImageLazyLoading();
  }

  /**
   * Setup image lazy loading
   */
  setupImageLazyLoading() {
    if (!('IntersectionObserver' in window)) return;
    
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          this.imageObserver.unobserve(img);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
  }

  /**
   * Load image with error handling
   * @param {HTMLImageElement} img - Image element to load
   */
  loadImage(img) {
    return new Promise((resolve, reject) => {
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = tempImg.src;
        img.classList.add('loaded');
        resolve(img);
      };
      
      tempImg.onerror = () => {
        img.classList.add('error');
        img.alt = 'Erro ao carregar imagem';
        reject(new Error('Failed to load image'));
      };
      
      tempImg.src = img.dataset.src || img.src;
    });
  }

  /**
   * Initialize filter functionality
   */
  initializeFilters() {
    if (!this.filterButtons.length) {
      console.warn('No filter buttons found');
      return;
    }

    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', this.handleFilterClick);
      
      // Keyboard support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleFilterClick(e);
        }
      });
    });
  }

  /**
   * Handle filter button click
   * @param {Event} e - Click event
   */
  handleFilterClick(e) {
    const button = e.currentTarget;
    const filter = button.getAttribute('data-filter');
    
    if (filter === this.currentFilter) return;
    
    // Update active state
    this.updateFilterActiveState(button);
    
    // Apply filter
    this.currentFilter = filter;
    this.applyFilter(filter);
    
    // Track analytics
    Utils.trackEvent('filter_projects', { filter });
  }

  /**
   * Update filter button active state
   * @param {HTMLElement} activeButton - Button to set as active
   */
  updateFilterActiveState(activeButton) {
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-selected', 'true');
    
    // Update aria-controls
    const gridId = this.projectsGrid.id || 'projects-grid';
    this.projectsGrid.setAttribute('aria-labelledby', activeButton.id);
  }

  /**
   * Apply filter to projects
   * @param {string} filter - Filter to apply
   */
  applyFilter(filter) {
    // Show loading state
    this.setLoadingState(true);
    
    // Filter projects
    this.filteredProjects = filter === 'all' 
      ? [...this.projectsData]
      : this.projectsData.filter(project => project.category.includes(filter));
    
    // Reset display
    this.displayedProjects = 0;
    this.clearProjectsGrid();
    
    // Load initial batch with delay for better UX
    setTimeout(() => {
      this.loadMoreProjects();
      this.updateLoadMoreButton();
      this.announceFilterResults();
      this.setLoadingState(false);
    }, PROJECTS_CONFIG.FILTER_TRANSITION);
  }

  /**
   * Clear projects grid
   */
  clearProjectsGrid() {
    if (this.projectsGrid) {
      this.projectsGrid.innerHTML = '';
    }
  }

  /**
   * Announce filter results to screen readers
   */
  announceFilterResults() {
    const count = this.filteredProjects.length;
    const filterName = this.currentFilter === 'all' ? 'todos os projetos' : this.currentFilter;
    const message = `Filtro aplicado: ${filterName}. ${count} projeto${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}.`;
    
    if (this.filterResultsAnnouncement) {
      this.filterResultsAnnouncement.textContent = message;
    } else {
      Utils.announceToScreenReader(message);
    }
  }

  /**
   * Initialize project grid
   */
  initializeProjectGrid() {
    this.loadMoreProjects();
  }

  /**
   * Load more projects
   */
  loadMoreProjects() {
    if (this.isLoading || this.displayedProjects >= this.filteredProjects.length) {
      return;
    }
    
    this.isLoading = true;
    this.updateLoadMoreButton();
    
    const startIndex = this.displayedProjects;
    const endIndex = Math.min(
      startIndex + PROJECTS_CONFIG.LOAD_MORE_BATCH_SIZE,
      this.filteredProjects.length
    );
    
    const projectsToLoad = this.filteredProjects.slice(startIndex, endIndex);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.renderProjects(projectsToLoad);
      this.displayedProjects = endIndex;
      this.isLoading = false;
      this.updateLoadMoreButton();
    }, 500);
  }

  /**
   * Render projects to the grid
   * @param {Array} projects - Projects to render
   */
  renderProjects(projects) {
    if (!this.projectsGrid) return;
    
    const fragment = document.createDocumentFragment();
    
    projects.forEach((project, index) => {
      const projectElement = this.createProjectElement(project);
      
      // Add to intersection observer
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(projectElement);
      }
      
      // Stagger animation
      setTimeout(() => {
        projectElement.style.opacity = '1';
        projectElement.style.transform = 'translateY(0)';
      }, index * PROJECTS_CONFIG.ANIMATION_DELAY);
      
      fragment.appendChild(projectElement);
    });
    
    this.projectsGrid.appendChild(fragment);
  }

  /**
   * Create project element
   * @param {Object} project - Project data
   * @returns {HTMLElement} Project element
   */
  createProjectElement(project) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.setAttribute('data-project-id', project.id);
    article.setAttribute('data-category', project.category.join(' '));
    article.style.opacity = '0';
    article.style.transform = 'translateY(30px)';
    article.style.transition = 'all 0.6s ease';
    
    // Set up accessibility
    article.setAttribute('tabindex', '0');
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `Ver detalhes do projeto ${project.title}`);
    
    article.innerHTML = this.generateProjectHTML(project);
    
    // Bind events
    this.bindProjectEvents(article, project);
    
    // Setup image lazy loading
    const img = article.querySelector('img[loading="lazy"]');
    if (img && this.imageObserver) {
      this.imageObserver.observe(img);
    }
    
    return article;
  }

  /**
   * Generate project HTML
   * @param {Object} project - Project data
   * @returns {string} HTML string
   */
  generateProjectHTML(project) {
    return `
      <figure class="project-image">
        <img src="${project.image}" 
             alt="${project.title} - ${project.description}" 
             loading="lazy"
             width="600"
             height="300"
             decoding="async">
        <div class="project-overlay">
          <button class="btn-view-project" aria-label="Visualizar projeto ${project.title}">
            <i class="fas fa-eye" aria-hidden="true"></i>
          </button>
        </div>
        <div class="project-tags">
          ${project.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </figure>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-meta">
          <time class="project-date" datetime="${project.date}">${project.date}</time>
          <span class="project-status status-${project.status}">
            ${project.status === 'completed' ? 'Concluído' : 'Em Andamento'}
          </span>
        </div>
      </div>
    `;
  }

  /**
   * Bind project events
   * @param {HTMLElement} element - Project element
   * @param {Object} project - Project data
   */
  bindProjectEvents(element, project) {
    // Click event
    element.addEventListener('click', () => this.openProjectModal(project.id));
    
    // Keyboard support
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.openProjectModal(project.id);
      }
    });
    
    // Hover effects
    this.setupProjectHoverEffects(element);
  }

  /**
   * Setup project hover effects
   * @param {HTMLElement} element - Project element
   */
  setupProjectHoverEffects(element) {
    let hoverTimeout;
    
    element.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      element.style.transform = 'translateY(-15px) scale(1.02)';
      element.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }, 100);
    });
  }

  /**
   * Initialize load more functionality
   */
  initializeLoadMore() {
    if (!this.loadMoreBtn) return;
    
    this.loadMoreBtn.addEventListener('click', this.handleLoadMore);
    this.updateLoadMoreButton();
  }

  /**
   * Handle load more button click
   */
  handleLoadMore() {
    this.loadMoreProjects();
    Utils.trackEvent('load_more_projects', { 
      current_count: this.displayedProjects,
      filter: this.currentFilter 
    });
  }

  /**
   * Update load more button state
   */
  updateLoadMoreButton() {
    if (!this.loadMoreBtn) return;
    
    const hasMore = this.displayedProjects < this.filteredProjects.length;
    
    this.loadMoreBtn.disabled = this.isLoading || !hasMore;
    this.loadMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
    
    // Update button text
    const btnText = this.loadMoreBtn.querySelector('.btn-text');
    const btnLoading = this.loadMoreBtn.querySelector('.btn-loading');
    
    if (btnText && btnLoading) {
      btnText.style.display = this.isLoading ? 'none' : 'inline';
      btnLoading.style.display = this.isLoading ? 'inline-flex' : 'none';
    }
  }

  /**
   * Set loading state
   * @param {boolean} loading - Loading state
   */
  setLoadingState(loading) {
    this.isLoading = loading;
    
    if (this.projectsGrid) {
      this.projectsGrid.setAttribute('aria-busy', loading.toString());
    }
  }

  /**
   * Initialize statistics animation
   */
  initializeStats() {
    if (!this.statsNumbers.length) return;
    
    if (!('IntersectionObserver' in window)) {
      this.animateAllStats();
      return;
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStatNumber(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    this.statsNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  /**
   * Animate all statistics
   */
  animateAllStats() {
    this.statsNumbers.forEach(stat => {
      this.animateStatNumber(stat);
    });
  }

  /**
   * Animate individual statistic number
   * @param {HTMLElement} element - Stat element
   */
  animateStatNumber(element) {
    const target = parseInt(element.getAttribute('data-target')) || 
                  parseInt(element.textContent.replace(/\D/g, '')) || 0;
    
    if (target > 0) {
      Utils.animateNumber(element, target, PROJECTS_CONFIG.STATS_ANIMATION_DURATION);
    }
  }

  /**
   * Initialize modal
   */
  initializeModal() {
    this.modal = new ProjectModal();
  }

  /**
   * Open project modal
   * @param {number} projectId - Project ID
   */
  openProjectModal(projectId) {
    const project = this.projectsData.find(p => p.id === projectId);
    if (project && this.modal) {
      this.modal.open(project);
      Utils.trackEvent('view_project_details', { 
        project_id: projectId, 
        project_title: project.title 
      });
    }
  }

  /**
   * Bind global events
   */
  bindEvents() {
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
    
    // Handle visibility change
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Cleanup cache periodically
    setInterval(() => {
      this.cache.cleanup();
    }, PROJECTS_CONFIG.CACHE_DURATION);
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Recalculate layouts if needed
    // This is where you'd handle responsive adjustments
    console.log('Window resized, recalculating layouts...');
  }

  /**
   * Handle visibility change
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.pauseAnimations();
    } else {
      this.resumeAnimations();
    }
  }

  /**
   * Pause animations when page is not visible
   */
  pauseAnimations() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.animationPlayState = 'paused';
    });
  }

  /**
   * Resume animations when page becomes visible
   */
  resumeAnimations() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.animationPlayState = 'running';
    });
  }

  /**
   * Handle initialization errors
   * @param {Error} error - Error object
   */
  handleInitializationError(error) {
    // Show user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <h3>Erro ao carregar projetos</h3>
      <p>Ocorreu um erro ao inicializar a página. Por favor, recarregue a página.</p>
      <button onclick="location.reload()">Recarregar Página</button>
    `;
    
    if (this.projectsGrid) {
      this.projectsGrid.appendChild(errorMessage);
    }
  }

  /**
   * Destroy instance and cleanup
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Disconnect observers
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
    
    // Clear cache
    this.cache.clear();
    
    // Destroy modal
    if (this.modal) {
      this.modal.destroy();
    }
  }
}

// ===== MODAL DE PROJETO APRIMORADO =====
class ProjectModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.currentProject = null;
    this.focusableElements = [];
    this.previousFocus = null;
    
    this.createModal();
    this.bindEvents();
  }

  /**
   * Create modal element
   */
  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'project-modal';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-hidden', 'true');
    this.modal.setAttribute('aria-labelledby', 'modal-title');
    this.modal.id = 'project-modal';
    
    this.modal.innerHTML = `
      <div class="modal-overlay" aria-hidden="true"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Fechar detalhes do projeto">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
        <header class="modal-header">
          <img class="modal-project-image" src="" alt="" loading="lazy" decoding="async">
        </header>
        <div class="modal-body">
          <h2 id="modal-title" class="modal-project-title"></h2>
          <div class="modal-project-meta"></div>
          <div class="modal-project-description"></div>
          <div class="modal-project-details"></div>
          <div class="modal-project-gallery"></div>
          <div class="modal-project-actions">
            <button class="btn-share" aria-label="Compartilhar projeto">
              <i class="fas fa-share-alt" aria-hidden="true"></i>
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
  }

  /**
   * Bind modal events
   */
  bindEvents() {
    // Close button
    const closeBtn = this.modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.close());
    
    // Click outside to close
    const overlay = this.modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', () => this.close());
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          this.close();
          break;
        case 'Tab':
          this.handleTabKey(e);
          break;
      }
    });
    
    // Share button
    const shareBtn = this.modal.querySelector('.btn-share');
    shareBtn.addEventListener('click', () => this.shareProject());
  }

  /**
   * Open modal with project data
   * @param {Object} project - Project data
   */
  open(project) {
    if (this.isOpen) return;
    
    this.currentProject = project;
    this.previousFocus = document.activeElement;
    
    this.populateModal(project);
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    
    // Focus management
    this.setupFocusManagement();
    
    // Focus first focusable element
    setTimeout(() => {
      const firstFocusable = this.focusableElements[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, PROJECTS_CONFIG.MODAL_TRANSITION);
  }

  /**
   * Close modal
   */
  close() {
    if (!this.isOpen) return;
    
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    
    document.body.style.overflow = '';
    this.isOpen = false;
    
    // Return focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
    
    this.currentProject = null;
  }

  /**
   * Populate modal with project data
   * @param {Object} project - Project data
   */
  populateModal(project) {
    // Image
    const modalImage = this.modal.querySelector('.modal-project-image');
    modalImage.src = project.image;
    modalImage.alt = `Imagem do projeto ${project.title}`;
    
    // Title
    const modalTitle = this.modal.querySelector('.modal-project-title');
    modalTitle.textContent = project.title;
    
    // Meta information
    const modalMeta = this.modal.querySelector('.modal-project-meta');
    modalMeta.innerHTML = `
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-meta">
        <time class="project-date" datetime="${project.date}">
          <i class="fas fa-calendar" aria-hidden="true"></i>
          ${project.date}
        </time>
        <span class="project-status status-${project.status}">
          ${project.status === 'completed' ? 'Concluído' : 'Em Andamento'}
        </span>
      </div>
    `;
    
    // Description
    const modalDescription = this.modal.querySelector('.modal-project-description');
    modalDescription.innerHTML = `
      <p>${project.fullDescription || project.description}</p>
      ${project.impact ? `<p><strong>Impacto:</strong> ${project.impact}</p>` : ''}
    `;
    
    // Details
    const modalDetails = this.modal.querySelector('.modal-project-details');
    modalDetails.innerHTML = this.generateDetailsHTML(project);
    
    // Gallery
    const modalGallery = this.modal.querySelector('.modal-project-gallery');
    if (project.gallery && project.gallery.length > 1) {
      modalGallery.innerHTML = this.generateGalleryHTML(project.gallery);
      this.bindGalleryEvents();
    } else {
      modalGallery.innerHTML = '';
    }
  }

  /**
   * Generate details HTML
   * @param {Object} project - Project data
   * @returns {string} HTML string
   */
  generateDetailsHTML(project) {
    let html = '';
    
    // Metrics
    if (project.metrics) {
      html += '<div class="detail-section"><h3>Métricas</h3>';
      Object.entries(project.metrics).forEach(([key, value]) => {
        const label = this.formatMetricLabel(key);
        html += `<div class="detail-item"><strong>${label}:</strong> ${value}</div>`;
      });
      html += '</div>';
    }
    
    // Technologies
    if (project.technologies) {
      html += `
        <div class="detail-section">
          <h3>Tecnologias Utilizadas</h3>
          <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      `;
    }
    
    // Partners
    if (project.partners) {
      html += `
        <div class="detail-section">
          <h3>Parceiros</h3>
          <div class="partners-list">
            ${project.partners.map(partner => `<span class="partner-tag">${partner}</span>`).join('')}
          </div>
        </div>
      `;
    }
    
    return html;
  }

  /**
   * Generate gallery HTML
   * @param {Array} images - Array of image URLs
   * @returns {string} HTML string
   */
  generateGalleryHTML(images) {
    return `
      <div class="detail-section">
        <h3>Galeria</h3>
        <div class="image-gallery">
          ${images.map((img, index) => `
            <img src="${img}" 
                 alt="Imagem ${index + 1} do projeto" 
                 loading="lazy"
                 decoding="async"
                 class="gallery-image"
                 tabindex="0"
                 role="button"
                 aria-label="Ampliar imagem ${index + 1}">
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Bind gallery events
   */
  bindGalleryEvents() {
    const galleryImages = this.modal.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
      img.addEventListener('click', () => this.openImageLightbox(img.src, img.alt));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openImageLightbox(img.src, img.alt);
        }
      });
    });
  }

  /**
   * Open image lightbox
   * @param {string} imageSrc - Image source URL
   * @param {string} imageAlt - Image alt text
   */
  openImageLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualização ampliada da imagem');
    
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${imageSrc}" alt="${imageAlt}" loading="lazy" decoding="async">
        <button class="lightbox-close" aria-label="Fechar visualização ampliada">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Focus management
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.focus();
    
    // Close handlers
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        document.body.removeChild(lightbox);
      }
    });
    
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        document.body.removeChild(lightbox);
        document.removeEventListener('keydown', escHandler);
      }
    };
    
    document.addEventListener('keydown', escHandler);
  }

  /**
   * Format metric label
   * @param {string} key - Metric key
   * @returns {string} Formatted label
   */
  formatMetricLabel(key) {
    const labels = {
      volunteers: 'Voluntários',
      epis_produced: 'EPIs Produzidos',
      labs_involved: 'Labs Envolvidos',
      beneficiaries: 'Beneficiários',
      schools: 'Escolas',
      students: 'Estudantes',
      teachers_trained: 'Professores Treinados',
      cost_reduction: 'Redução de Custo',
      sensors: 'Sensores',
      cities: 'Cidades',
      data_points: 'Pontos de Dados',
      alerts_sent: 'Alertas Enviados',
      prosthetics_delivered: 'Próteses Entregues',
      satisfaction_rate: 'Taxa de Satisfação',
      kits_distributed: 'Kits Distribuídos',
      students_reached: 'Estudantes Alcançados',
      teacher_satisfaction: 'Satisfação dos Professores',
      plastic_recycled: 'Plástico Reciclado',
      filament_produced: 'Filamento Produzido',
      co2_saved: 'CO2 Economizado'
    };
    
    return labels[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    this.focusableElements = Array.from(this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));
  }

  /**
   * Handle tab key for focus management
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleTabKey(e) {
    if (this.focusableElements.length === 0) return;
    
    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  /**
   * Share project
   */
  shareProject() {
    if (!this.currentProject) return;
    
    const shareData = {
      title: this.currentProject.title,
      text: this.currentProject.description,
      url: `${window.location.href}#projeto-${this.currentProject.id}`
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(err => {
        console.log('Error sharing:', err);
        this.fallbackShare(shareData);
      });
    } else {
      this.fallbackShare(shareData);
    }
  }

  /**
   * Fallback share method
   * @param {Object} shareData - Data to share
   */
  fallbackShare(shareData) {
    const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showShareSuccess();
      }).catch(() => {
        this.legacyCopyToClipboard(textToCopy);
      });
    } else {
      this.legacyCopyToClipboard(textToCopy);
    }
  }

  /**
   * Legacy copy to clipboard method
   * @param {string} text - Text to copy
   */
  legacyCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showShareSuccess();
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  }

  /**
   * Show share success message
   */
  showShareSuccess() {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = 'Link copiado para a área de transferência!';
    
    // Inline styles for toast
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#10b981',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      zIndex: '10000',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      animation: 'slideInUp 0.3s ease-out'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutDown 0.3s ease-in';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 2700);
  }

  /**
   * Destroy modal and cleanup
   */
  destroy() {
    if (this.modal && document.body.contains(this.modal)) {
      document.body.removeChild(this.modal);
    }
  }
}

// ===== INICIALIZAÇÃO =====
let projectsPageInstance;

/**
 * Initialize projects page
 */
function initializeProjectsPage() {
  try {
    projectsPageInstance = new ProjectsPage();
  } catch (error) {
    console.error('Erro na inicialização da página Projetos:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjectsPage);
} else {
  initializeProjectsPage();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (projectsPageInstance) {
    projectsPageInstance.destroy();
  }
});

// Export for external use
if (typeof window !== 'undefined') {
  window.ProjectsPage = ProjectsPage;
  window.ProjectModal = ProjectModal;
  window.Utils = Utils;
  window.CacheManager = CacheManager;
}

