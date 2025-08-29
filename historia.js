/**
 * Nossa História - JavaScript Melhorado
 * Versão otimizada com melhor performance, acessibilidade e manutenibilidade
 */

(function() {
    'use strict';

    // Configurações globais
    const CONFIG = {
        animationDuration: 800,
        scrollOffset: 100,
        counterDuration: 2000,
        parallaxRate: 0.5,
        debounceDelay: 16, // ~60fps
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    };

    // Estado da aplicação
    const state = {
        isInitialized: false,
        observers: new Map(),
        animatedCounters: new Set(),
        scrollPosition: 0,
        isReducedMotion: false
    };

    // Utilitários
    const utils = {
        // Debounce para otimizar eventos de scroll
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

        // Throttle para eventos frequentes
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

        // Verificar se elemento está visível
        isElementVisible(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Verificar suporte a Intersection Observer
        supportsIntersectionObserver() {
            return 'IntersectionObserver' in window;
        },

        // Verificar preferência por movimento reduzido
        prefersReducedMotion() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        },

        // Verificar se é dispositivo móvel
        isMobile() {
            return window.innerWidth <= CONFIG.breakpoints.mobile;
        },

        // Função de easing suave
        easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        },

        // Sanitizar entrada do usuário
        sanitizeInput(input) {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        }
    };

    // Gerenciador de eventos
    const eventManager = {
        listeners: new Map(),

        add(element, event, handler, options = {}) {
            if (!element || !event || !handler) return;

            const key = `${element.constructor.name}-${event}`;
            if (!this.listeners.has(key)) {
                this.listeners.set(key, []);
            }

            this.listeners.get(key).push({ element, event, handler, options });
            element.addEventListener(event, handler, options);
        },

        remove(element, event, handler) {
            if (!element || !event || !handler) return;

            element.removeEventListener(event, handler);
            
            const key = `${element.constructor.name}-${event}`;
            if (this.listeners.has(key)) {
                const listeners = this.listeners.get(key);
                const index = listeners.findIndex(l => 
                    l.element === element && l.event === event && l.handler === handler
                );
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        },

        removeAll() {
            this.listeners.forEach(listeners => {
                listeners.forEach(({ element, event, handler }) => {
                    element.removeEventListener(event, handler);
                });
            });
            this.listeners.clear();
        }
    };

    // Animações de scroll
    const scrollAnimations = {
        init() {
            if (!utils.supportsIntersectionObserver()) {
                this.fallbackInit();
                return;
            }

            const observerOptions = {
                threshold: 0.1,
                rootMargin: `0px 0px -${CONFIG.scrollOffset}px 0px`
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observar elementos para animação
            const animatedElements = document.querySelectorAll(
                '.timeline-item, .value-card, .impact-stat, .section-header'
            );

            animatedElements.forEach(element => {
                observer.observe(element);
            });

            state.observers.set('scroll', observer);
        },

        fallbackInit() {
            // Fallback para navegadores sem Intersection Observer
            const handleScroll = utils.throttle(() => {
                const elements = document.querySelectorAll(
                    '.timeline-item:not(.animate-in), .value-card:not(.animate-in), .impact-stat:not(.animate-in)'
                );

                elements.forEach(element => {
                    if (utils.isElementVisible(element)) {
                        this.animateElement(element);
                    }
                });
            }, CONFIG.debounceDelay);

            eventManager.add(window, 'scroll', handleScroll, { passive: true });
        },

        animateElement(element) {
            if (state.isReducedMotion) {
                element.style.opacity = '1';
                element.style.transform = 'none';
                return;
            }

            element.classList.add('animate-in');

            // Animar contadores se existirem
            const counters = element.querySelectorAll('[data-count]');
            counters.forEach(counter => this.animateCounter(counter));
        },

        animateCounter(element) {
            if (state.animatedCounters.has(element)) return;

            const target = parseInt(element.dataset.count) || 0;
            const duration = CONFIG.counterDuration;
            const start = performance.now();
            const startValue = 0;

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = utils.easeOutQuart(progress);
                const current = Math.floor(startValue + (target - startValue) * easedProgress);

                element.textContent = current.toLocaleString('pt-BR');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString('pt-BR');
                    state.animatedCounters.add(element);
                }
            };

            requestAnimationFrame(updateCounter);
        }
    };

    // Interações da timeline
    const timelineInteractions = {
        init() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            timelineItems.forEach((item, index) => {
                this.setupItemInteractions(item, index);
            });
        },

        setupItemInteractions(item, index) {
            const marker = item.querySelector('.timeline-marker');
            const content = item.querySelector('.timeline-content');

            if (!marker || !content) return;

            // Adicionar delay baseado no índice para animação escalonada
            item.style.setProperty('--animation-delay', `${index * 0.1}s`);

            // Eventos de hover
            const handleMouseEnter = () => {
                if (state.isReducedMotion) return;
                
                item.classList.add('timeline-item-hover');
                marker.classList.add('timeline-marker-hover');
            };

            const handleMouseLeave = () => {
                item.classList.remove('timeline-item-hover');
                marker.classList.remove('timeline-marker-hover');
            };

            eventManager.add(item, 'mouseenter', handleMouseEnter);
            eventManager.add(item, 'mouseleave', handleMouseLeave);

            // Suporte a touch para dispositivos móveis
            if ('ontouchstart' in window) {
                eventManager.add(item, 'touchstart', handleMouseEnter, { passive: true });
                eventManager.add(item, 'touchend', handleMouseLeave, { passive: true });
            }
        }
    };

    // Efeitos parallax otimizados
    const parallaxEffects = {
        init() {
            if (state.isReducedMotion || utils.isMobile()) return;

            const parallaxElements = document.querySelectorAll('.page-hero, .section-cta');
            if (parallaxElements.length === 0) return;

            const handleScroll = utils.throttle(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const rate = scrolled * CONFIG.parallaxRate;
                    element.style.transform = `translate3d(0, ${rate}px, 0)`;
                });
            }, CONFIG.debounceDelay);

            eventManager.add(window, 'scroll', handleScroll, { passive: true });
        }
    };

    // Navegação e menu
    const navigation = {
        init() {
            this.setupMobileMenu();
            this.setupSearchPopup();
            this.setupSmoothScrolling();
            this.setupKeyboardNavigation();
        },

        setupMobileMenu() {
            const menuButton = document.querySelector('.btn-menu');
            const menu = document.querySelector('.menu');

            if (!menuButton || !menu) return;

            const toggleMenu = () => {
                const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
                menuButton.setAttribute('aria-expanded', !isExpanded);
                menu.classList.toggle('menu-open');
                
                // Prevenir scroll do body quando menu está aberto
                document.body.style.overflow = isExpanded ? '' : 'hidden';
            };

            eventManager.add(menuButton, 'click', toggleMenu);

            // Fechar menu ao clicar fora
            eventManager.add(document, 'click', (e) => {
                if (!menuButton.contains(e.target) && !menu.contains(e.target)) {
                    if (menu.classList.contains('menu-open')) {
                        toggleMenu();
                    }
                }
            });
        },

        setupSearchPopup() {
            const searchToggle = document.querySelector('.search-toggle');
            const searchPopup = document.querySelector('.search-popup');
            const searchClose = document.querySelector('.btn-close');
            const searchInput = document.querySelector('#search-input');

            if (!searchToggle || !searchPopup || !searchClose) return;

            const openSearch = () => {
                searchPopup.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                
                // Focar no input após a animação
                setTimeout(() => {
                    if (searchInput) searchInput.focus();
                }, 300);
            };

            const closeSearch = () => {
                searchPopup.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                searchToggle.focus(); // Retornar foco para o botão
            };

            eventManager.add(searchToggle, 'click', openSearch);
            eventManager.add(searchClose, 'click', closeSearch);

            // Fechar com ESC
            eventManager.add(document, 'keydown', (e) => {
                if (e.key === 'Escape' && searchPopup.getAttribute('aria-hidden') === 'false') {
                    closeSearch();
                }
            });

            // Fechar ao clicar no backdrop
            eventManager.add(searchPopup, 'click', (e) => {
                if (e.target === searchPopup) {
                    closeSearch();
                }
            });
        },

        setupSmoothScrolling() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                eventManager.add(link, 'click', (e) => {
                    e.preventDefault();
                    
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        setupKeyboardNavigation() {
            // Melhorar navegação por teclado nos menus dropdown
            const menuItems = document.querySelectorAll('.menu-item-has-children');
            
            menuItems.forEach(item => {
                const link = item.querySelector('a');
                const submenu = item.querySelector('.sub-menu');
                
                if (!link || !submenu) return;

                eventManager.add(link, 'keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const isExpanded = link.getAttribute('aria-expanded') === 'true';
                        link.setAttribute('aria-expanded', !isExpanded);
                        submenu.style.display = isExpanded ? 'none' : 'block';
                    }
                });
            });
        }
    };

    // Sistema de notificações
    const notifications = {
        show(message, type = 'info', duration = 4000) {
            const notification = this.create(message, type);
            document.body.appendChild(notification);

            // Animar entrada
            requestAnimationFrame(() => {
                notification.classList.add('notification-show');
            });

            // Auto-remover
            setTimeout(() => {
                this.remove(notification);
            }, duration);

            return notification;
        },

        create(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            
            const content = document.createElement('div');
            content.className = 'notification-content';
            content.textContent = utils.sanitizeInput(message);
            
            const closeButton = document.createElement('button');
            closeButton.className = 'notification-close';
            closeButton.setAttribute('aria-label', 'Fechar notificação');
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            
            eventManager.add(closeButton, 'click', () => {
                this.remove(notification);
            });

            notification.appendChild(content);
            notification.appendChild(closeButton);

            return notification;
        },

        remove(notification) {
            if (!notification || !notification.parentNode) return;

            notification.classList.add('notification-hide');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    };

    // Gerenciamento de performance
    const performance = {
        init() {
            this.setupLazyLoading();
            this.setupImageOptimization();
            this.monitorPerformance();
        },

        setupLazyLoading() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            imageObserver.unobserve(img);
                        }
                    });
                });

                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => imageObserver.observe(img));
            }
        },

        setupImageOptimization() {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // Adicionar loading="lazy" se não especificado
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }

                // Otimizar imagens para diferentes densidades de pixel
                if (window.devicePixelRatio > 1 && img.src.includes('unsplash.com')) {
                    const url = new URL(img.src);
                    url.searchParams.set('dpr', Math.min(window.devicePixelRatio, 2));
                    img.src = url.toString();
                }
            });
        },

        monitorPerformance() {
            if ('PerformanceObserver' in window) {
                try {
                    const observer = new PerformanceObserver((list) => {
                        list.getEntries().forEach(entry => {
                            if (entry.entryType === 'largest-contentful-paint') {
                                console.log('LCP:', entry.startTime);
                            }
                        });
                    });
                    
                    observer.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (e) {
                    console.warn('Performance monitoring not supported');
                }
            }
        }
    };

    // Acessibilidade
    const accessibility = {
        init() {
            this.setupFocusManagement();
            this.setupAriaLabels();
            this.setupReducedMotion();
        },

        setupFocusManagement() {
            // Melhorar indicadores de foco
            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach(element => {
                eventManager.add(element, 'focus', () => {
                    element.classList.add('focus-visible');
                });

                eventManager.add(element, 'blur', () => {
                    element.classList.remove('focus-visible');
                });
            });
        },

        setupAriaLabels() {
            // Adicionar labels ARIA dinâmicos onde necessário
            const counters = document.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const value = counter.dataset.count;
                const label = counter.nextElementSibling?.textContent || 'contador';
                counter.setAttribute('aria-label', `${value} ${label}`);
            });
        },

        setupReducedMotion() {
            state.isReducedMotion = utils.prefersReducedMotion();
            
            // Escutar mudanças na preferência
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            mediaQuery.addListener((e) => {
                state.isReducedMotion = e.matches;
                
                if (state.isReducedMotion) {
                    document.body.classList.add('reduced-motion');
                } else {
                    document.body.classList.remove('reduced-motion');
                }
            });

            if (state.isReducedMotion) {
                document.body.classList.add('reduced-motion');
            }
        }
    };

    // Inicialização principal
    const app = {
        init() {
            if (state.isInitialized) return;

            try {
                // Verificar se DOM está pronto
                if (document.readyState === 'loading') {
                    eventManager.add(document, 'DOMContentLoaded', () => this.start());
                } else {
                    this.start();
                }
            } catch (error) {
                console.error('Erro na inicialização:', error);
                this.handleError(error);
            }
        },

        start() {
            console.log('📚 Nossa História - Iniciando aplicação...');

            // Inicializar módulos
            accessibility.init();
            performance.init();
            navigation.init();
            scrollAnimations.init();
            timelineInteractions.init();
            parallaxEffects.init();

            state.isInitialized = true;
            
            console.log('✅ Nossa História - Aplicação inicializada com sucesso!');
            
            // Notificar que a página está pronta
            this.notifyReady();
        },

        notifyReady() {
            // Disparar evento customizado
            const readyEvent = new CustomEvent('historiaReady', {
                detail: { timestamp: Date.now() }
            });
            document.dispatchEvent(readyEvent);

            // Callback global se existir
            if (typeof window.onHistoriaReady === 'function') {
                window.onHistoriaReady();
            }
        },

        handleError(error) {
            console.error('Erro na aplicação Nossa História:', error);
            
            // Tentar recuperação básica
            try {
                scrollAnimations.fallbackInit();
            } catch (fallbackError) {
                console.error('Erro na recuperação:', fallbackError);
            }
        },

        destroy() {
            // Limpar recursos
            eventManager.removeAll();
            
            state.observers.forEach(observer => {
                if (observer && typeof observer.disconnect === 'function') {
                    observer.disconnect();
                }
            });
            
            state.observers.clear();
            state.animatedCounters.clear();
            state.isInitialized = false;
            
            console.log('🧹 Nossa História - Recursos limpos');
        }
    };

    // API pública
    window.HistoriaJS = {
        init: () => app.init(),
        destroy: () => app.destroy(),
        showNotification: (message, type, duration) => notifications.show(message, type, duration),
        version: '2.0.0'
    };

    // Auto-inicialização
    app.init();

    // Cleanup ao descarregar a página
    eventManager.add(window, 'beforeunload', () => {
        app.destroy();
    });

})();

