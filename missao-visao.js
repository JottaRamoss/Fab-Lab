// ===== MISSÃO E VISÃO - JAVASCRIPT OTIMIZADO =====

/**
 * Configuração e dados da aplicação
 */
const CONFIG = {
    // Configurações de animação
    animation: {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        staggerDelay: 150
    },
    
    // Configurações de scroll
    scroll: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    
    // Configurações de tema
    theme: {
        storageKey: 'fab-lab-theme',
        default: 'light'
    },
    
    // Configurações de notificação
    notification: {
        duration: 4000,
        maxVisible: 3
    }
};

/**
 * Dados estruturados da missão, visão e valores
 */
const DATA = {
    mission: {
        title: "Nossa Missão",
        description: "Democratizar o acesso à fabricação digital e promover a cultura de inovação no Brasil, capacitando pessoas e organizações para criar soluções transformadoras através de tecnologias emergentes, educação de qualidade e pesquisa aplicada.",
        features: [
            {
                icon: "fas fa-users",
                text: "Capacitar pessoas com conhecimento em fabricação digital"
            },
            {
                icon: "fas fa-lightbulb", 
                text: "Fomentar a inovação e criatividade tecnológica"
            },
            {
                icon: "fas fa-network-wired",
                text: "Conectar makers, empreendedores e instituições"
            },
            {
                icon: "fas fa-graduation-cap",
                text: "Promover educação tecnológica de qualidade"
            }
        ]
    },
    
    vision: {
        title: "Nossa Visão",
        description: "Ser reconhecido como o principal centro de referência em fabricação digital e inovação da América Latina, liderando a transformação da indústria brasileira através da educação, pesquisa e desenvolvimento de tecnologias que moldam o futuro.",
        goals: [
            {
                icon: "fas fa-trophy",
                title: "Liderança Regional",
                description: "Referência em fabricação digital na América Latina"
            },
            {
                icon: "fas fa-leaf",
                title: "Sustentabilidade", 
                description: "Práticas eco-friendly e economia circular"
            },
            {
                icon: "fas fa-globe",
                title: "Impacto Global",
                description: "Soluções que transformam comunidades"
            },
            {
                icon: "fas fa-rocket",
                title: "Inovação Contínua",
                description: "Sempre na vanguarda tecnológica"
            }
        ]
    },
    
    values: [
        {
            icon: "fas fa-heart",
            title: "Paixão pela Inovação",
            description: "Acreditamos que a paixão é o combustível da inovação. Cada projeto é uma oportunidade de criar algo extraordinário.",
            examples: ["Criatividade", "Experimentação", "Ousadia"]
        },
        {
            icon: "fas fa-handshake",
            title: "Colaboração",
            description: "Valorizamos o trabalho em equipe e a troca de conhecimentos. Juntos, somos mais fortes e criativos.",
            examples: ["Trabalho em Equipe", "Compartilhamento", "Networking"]
        },
        {
            icon: "fas fa-star",
            title: "Excelência",
            description: "Buscamos a excelência em tudo que fazemos, desde o atendimento até a qualidade dos nossos projetos e serviços.",
            examples: ["Qualidade", "Precisão", "Melhoria Contínua"]
        },
        {
            icon: "fas fa-shield-alt",
            title: "Integridade",
            description: "Agimos com transparência, honestidade e ética em todas as nossas relações e decisões empresariais.",
            examples: ["Transparência", "Honestidade", "Responsabilidade"]
        },
        {
            icon: "fas fa-seedling",
            title: "Sustentabilidade",
            description: "Comprometidos com práticas sustentáveis que preservem o meio ambiente para as futuras gerações.",
            examples: ["Eco-friendly", "Reciclagem", "Energia Limpa"]
        },
        {
            icon: "fas fa-universal-access",
            title: "Inclusão",
            description: "Acreditamos que a tecnologia deve ser acessível a todos, independentemente de origem, gênero ou condição social.",
            examples: ["Diversidade", "Acessibilidade", "Igualdade"]
        }
    ]
};

/**
 * Classe principal da aplicação
 */
class MissionVisionApp {
    constructor() {
        this.observers = new Map();
        this.isInitialized = false;
        this.notificationQueue = [];
        
        // Bind methods
        this.handleScroll = this.throttle(this.handleScroll.bind(this), 16);
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        this.handleKeydown = this.handleKeydown.bind(this);
    }
    
    /**
     * Inicialização da aplicação
     */
    async init() {
        try {
            this.showLoading();
            
            // Aguardar DOM estar pronto
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Inicializar componentes
            await this.initializeComponents();
            
            this.isInitialized = true;
            this.hideLoading();
            
            console.log('🎯 Fab Lab Brasil - Missão e Visão carregado com sucesso!');
            this.showNotification('Página carregada com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro na inicialização:', error);
            this.showNotification('Erro ao carregar a página. Tente recarregar.', 'error');
            this.hideLoading();
        }
    }
    
    /**
     * Inicializar todos os componentes
     */
    async initializeComponents() {
        const tasks = [
            () => this.renderContent(),
            () => this.initScrollAnimations(),
            () => this.initInteractiveElements(),
            () => this.initThemeSystem(),
            () => this.initAccessibility(),
            () => this.initPerformanceOptimizations(),
            () => this.initEventListeners()
        ];
        
        // Executar tarefas em paralelo quando possível
        await Promise.all(tasks.map(task => {
            try {
                return Promise.resolve(task());
            } catch (error) {
                console.warn('Erro em componente:', error);
                return Promise.resolve();
            }
        }));
    }
    
    /**
     * Renderizar conteúdo dinâmico
     */
    renderContent() {
        this.renderMissionSection();
        this.renderVisionSection();
        this.renderValuesSection();
    }
    
    /**
     * Renderizar seção de missão
     */
    renderMissionSection() {
        const container = document.querySelector('.mission-content');
        if (!container) return;
        
        const { mission } = DATA;
        
        container.innerHTML = `
            <div class="mission-text">
                <div class="mission-icon" aria-hidden="true">
                    <i class="fas fa-bullseye"></i>
                </div>
                <h2 id="mission-heading" class="mission-title">${mission.title}</h2>
                <p class="mission-description">${mission.description}</p>
                <div class="mission-features">
                    ${mission.features.map((feature, index) => `
                        <div class="mission-feature" style="animation-delay: ${index * 0.1}s">
                            <div class="mission-feature-icon" aria-hidden="true">
                                <i class="${feature.icon}"></i>
                            </div>
                            <span class="mission-feature-text">${feature.text}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="mission-visual">
                <div class="mission-graphic" tabindex="0" role="button" aria-label="Gráfico interativo da missão">
                    <div class="mission-graphic-content">
                        <div class="mission-graphic-icon" aria-hidden="true">
                            <i class="fas fa-compass"></i>
                        </div>
                        <div class="mission-graphic-text">Guiando o Futuro</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Renderizar seção de visão
     */
    renderVisionSection() {
        const container = document.querySelector('.vision-content');
        if (!container) return;
        
        const { vision } = DATA;
        
        container.innerHTML = `
            <div class="vision-visual">
                <div class="vision-graphic" tabindex="0" role="button" aria-label="Gráfico interativo da visão">
                    <div class="vision-graphic-content">
                        <div class="vision-graphic-icon" aria-hidden="true">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="vision-graphic-text">Visão de Futuro</div>
                    </div>
                </div>
            </div>
            <div class="vision-text">
                <div class="vision-icon" aria-hidden="true">
                    <i class="fas fa-telescope"></i>
                </div>
                <h2 id="vision-heading" class="vision-title">${vision.title}</h2>
                <p class="vision-description">${vision.description}</p>
                <div class="vision-goals">
                    ${vision.goals.map((goal, index) => `
                        <div class="vision-goal" style="animation-delay: ${index * 0.1}s">
                            <div class="vision-goal-icon" aria-hidden="true">
                                <i class="${goal.icon}"></i>
                            </div>
                            <h4 class="vision-goal-title">${goal.title}</h4>
                            <p class="vision-goal-description">${goal.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /**
     * Renderizar seção de valores
     */
    renderValuesSection() {
        const container = document.querySelector('.values-grid');
        if (!container) return;
        
        const { values } = DATA;
        
        container.innerHTML = values.map((value, index) => `
            <article class="value-card" style="animation-delay: ${index * 0.1}s" tabindex="0">
                <div class="value-icon" aria-hidden="true">
                    <i class="${value.icon}"></i>
                </div>
                <h3 class="value-title">${value.title}</h3>
                <p class="value-description">${value.description}</p>
                <div class="value-examples" role="list" aria-label="Exemplos de ${value.title}">
                    ${value.examples.map(example => `
                        <span class="value-example" role="listitem">${example}</span>
                    `).join('')}
                </div>
            </article>
        `).join('');
    }
    
    /**
     * Inicializar animações de scroll
     */
    initScrollAnimations() {
        // Intersection Observer para animações
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target); // Animar apenas uma vez
                }
            });
        }, CONFIG.scroll);
        
        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(`
            .mission-text, .vision-text, .value-card, .hero-pillar,
            .mission-graphic, .vision-graphic, .section-header
        `);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        this.observers.set('scroll', observer);
    }
    
    /**
     * Animar elemento individual
     */
    animateElement(element) {
        element.classList.add('animate-in');
        
        // Animações específicas por tipo
        if (element.classList.contains('mission-text')) {
            this.animateMissionFeatures(element);
        } else if (element.classList.contains('vision-text')) {
            this.animateVisionGoals(element);
        } else if (element.classList.contains('value-card')) {
            this.animateValueCard(element);
        }
    }
    
    /**
     * Animar features da missão
     */
    animateMissionFeatures(container) {
        const features = container.querySelectorAll('.mission-feature');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateX(-30px)';
                
                requestAnimationFrame(() => {
                    feature.style.transition = `all ${CONFIG.animation.duration}ms ${CONFIG.animation.easing}`;
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateX(0)';
                });
            }, index * CONFIG.animation.staggerDelay);
        });
    }
    
    /**
     * Animar goals da visão
     */
    animateVisionGoals(container) {
        const goals = container.querySelectorAll('.vision-goal');
        goals.forEach((goal, index) => {
            setTimeout(() => {
                goal.style.opacity = '0';
                goal.style.transform = 'translateY(30px)';
                
                requestAnimationFrame(() => {
                    goal.style.transition = `all ${CONFIG.animation.duration}ms ${CONFIG.animation.easing}`;
                    goal.style.opacity = '1';
                    goal.style.transform = 'translateY(0)';
                });
            }, index * CONFIG.animation.staggerDelay);
        });
    }
    
    /**
     * Animar card de valor
     */
    animateValueCard(card) {
        const icon = card.querySelector('.value-icon');
        const examples = card.querySelectorAll('.value-example');
        
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }, 200);
        }
        
        examples.forEach((example, index) => {
            setTimeout(() => {
                example.style.opacity = '0';
                example.style.transform = 'scale(0.8)';
                
                requestAnimationFrame(() => {
                    example.style.transition = 'all 0.3s ease';
                    example.style.opacity = '1';
                    example.style.transform = 'scale(1)';
                });
            }, 400 + (index * 100));
        });
    }
    
    /**
     * Inicializar elementos interativos
     */
    initInteractiveElements() {
        this.initCardHoverEffects();
        this.initGraphicInteractions();
        this.initPillarInteractions();
        this.initButtonEffects();
    }
    
    /**
     * Efeitos de hover para cards
     */
    initCardHoverEffects() {
        const cards = document.querySelectorAll('.value-card, .hero-pillar');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
            
            // Suporte para teclado
            card.addEventListener('focus', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('blur', () => {
                this.animateCardHover(card, false);
            });
        });
    }
    
    /**
     * Animar hover de card
     */
    animateCardHover(card, isHover) {
        const icon = card.querySelector('.value-icon, .hero-pillar-icon');
        
        if (icon) {
            if (isHover) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            } else {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }
    
    /**
     * Interações com gráficos
     */
    initGraphicInteractions() {
        const graphics = document.querySelectorAll('.mission-graphic, .vision-graphic');
        
        graphics.forEach(graphic => {
            graphic.addEventListener('click', () => {
                this.animateGraphicClick(graphic);
            });
            
            graphic.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.animateGraphicClick(graphic);
                }
            });
        });
    }
    
    /**
     * Animar clique em gráfico
     */
    animateGraphicClick(graphic) {
        graphic.classList.add('pulse');
        
        // Feedback tátil se disponível
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        setTimeout(() => {
            graphic.classList.remove('pulse');
        }, 1000);
        
        this.showNotification('Gráfico interativo ativado!', 'info');
    }
    
    /**
     * Interações com pilares do hero
     */
    initPillarInteractions() {
        const pillars = document.querySelectorAll('.hero-pillar');
        
        pillars.forEach((pillar, index) => {
            pillar.addEventListener('click', () => {
                this.scrollToSection(index);
            });
            
            pillar.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.scrollToSection(index);
                }
            });
        });
    }
    
    /**
     * Scroll suave para seção
     */
    scrollToSection(index) {
        const sections = ['.section-mission', '.section-vision', '.section-values'];
        const targetSection = document.querySelector(sections[index]);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Feedback de navegação
            this.showNotification(`Navegando para ${['Missão', 'Visão', 'Valores'][index]}`, 'info');
        }
    }
    
    /**
     * Efeitos para botões
     */
    initButtonEffects() {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }
    
    /**
     * Criar efeito ripple
     */
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    /**
     * Sistema de tema
     */
    initThemeSystem() {
        // Carregar tema salvo
        const savedTheme = localStorage.getItem(CONFIG.theme.storageKey) || CONFIG.theme.default;
        this.setTheme(savedTheme);
        
        // Botão de alternância de tema
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            // Atualizar ícone do botão
            this.updateThemeToggleIcon(savedTheme);
        }
        
        // Detectar preferência do sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem(CONFIG.theme.storageKey)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    /**
     * Alternar tema
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        localStorage.setItem(CONFIG.theme.storageKey, newTheme);
        
        this.showNotification(`Tema alterado para: ${newTheme === 'dark' ? 'Escuro' : 'Claro'}`, 'success');
    }
    
    /**
     * Definir tema
     */
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeToggleIcon(theme);
        
        // Atualizar meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#4da6ff';
        }
    }
    
    /**
     * Atualizar ícone do botão de tema
     */
    updateThemeToggleIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    /**
     * Inicializar acessibilidade
     */
    initAccessibility() {
        // Navegação por teclado
        this.initKeyboardNavigation();
        
        // Anúncios para leitores de tela
        this.initScreenReaderAnnouncements();
        
        // Foco visível
        this.initFocusManagement();
        
        // Redução de movimento
        this.initReducedMotion();
    }
    
    /**
     * Navegação por teclado
     */
    initKeyboardNavigation() {
        document.addEventListener('keydown', this.handleKeydown);
        
        // Melhorar navegação por tab
        const focusableElements = document.querySelectorAll(`
            a[href], button, input, textarea, select, details,
            [tabindex]:not([tabindex="-1"])
        `);
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('keyboard-focus');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('keyboard-focus');
            });
        });
    }
    
    /**
     * Manipular teclas
     */
    handleKeydown(event) {
        // Esc para fechar modais/popups
        if (event.key === 'Escape') {
            this.closeAllPopups();
        }
        
        // Atalhos de teclado
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case 'd':
                    event.preventDefault();
                    this.toggleTheme();
                    break;
            }
        }
    }
    
    /**
     * Fechar todos os popups
     */
    closeAllPopups() {
        const searchPopup = document.querySelector('.search-popup');
        if (searchPopup && !searchPopup.hasAttribute('aria-hidden')) {
            this.closeSearchPopup();
        }
    }
    
    /**
     * Anúncios para leitores de tela
     */
    initScreenReaderAnnouncements() {
        // Criar região de anúncios
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.id = 'screen-reader-announcer';
        document.body.appendChild(announcer);
    }
    
    /**
     * Anunciar para leitores de tela
     */
    announceToScreenReader(message) {
        const announcer = document.getElementById('screen-reader-announcer');
        if (announcer) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    }
    
    /**
     * Gerenciamento de foco
     */
    initFocusManagement() {
        // Trap de foco para modais
        document.addEventListener('focusin', (e) => {
            const activeModal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
            if (activeModal && !activeModal.contains(e.target)) {
                const firstFocusable = activeModal.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        });
    }
    
    /**
     * Redução de movimento
     */
    initReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.documentElement.style.setProperty('--transition-fast', 'none');
            document.documentElement.style.setProperty('--transition-slow', 'none');
        }
        
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--transition', 'none');
            } else {
                document.documentElement.style.removeProperty('--transition');
            }
        });
    }
    
    /**
     * Otimizações de performance
     */
    initPerformanceOptimizations() {
        // Lazy loading para imagens
        this.initLazyLoading();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
        
        // Otimização de scroll
        this.optimizeScrollPerformance();
    }
    
    /**
     * Lazy loading de imagens
     */
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    /**
     * Preload de recursos críticos
     */
    preloadCriticalResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
        ];
        
        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    /**
     * Otimizar performance de scroll
     */
    optimizeScrollPerformance() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    /**
     * Manipular scroll
     */
    handleScroll() {
        const scrolled = window.pageYOffset;
        const header = document.getElementById('header');
        
        // Header transparente/opaco baseado no scroll
        if (header) {
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Efeito parallax sutil
        const parallaxElements = document.querySelectorAll('.page-hero');
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    /**
     * Inicializar event listeners
     */
    initEventListeners() {
        // Redimensionamento da janela
        window.addEventListener('resize', this.handleResize, { passive: true });
        
        // Visibilidade da página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        // Navegação
        this.initNavigationListeners();
        
        // Busca
        this.initSearchListeners();
    }
    
    /**
     * Manipular redimensionamento
     */
    handleResize() {
        // Recalcular layouts se necessário
        this.updateLayoutCalculations();
        
        // Reposicionar elementos fixos
        this.repositionFixedElements();
    }
    
    /**
     * Atualizar cálculos de layout
     */
    updateLayoutCalculations() {
        // Implementar se necessário
    }
    
    /**
     * Reposicionar elementos fixos
     */
    repositionFixedElements() {
        // Implementar se necessário
    }
    
    /**
     * Pausar animações
     */
    pauseAnimations() {
        document.documentElement.style.setProperty('--transition', 'none');
    }
    
    /**
     * Retomar animações
     */
    resumeAnimations() {
        document.documentElement.style.removeProperty('--transition');
    }
    
    /**
     * Listeners de navegação
     */
    initNavigationListeners() {
        // Menu mobile
        const menuToggle = document.querySelector('.btn-menu');
        const menu = document.querySelector('.menu');
        
        if (menuToggle && menu) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Dropdown menus
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleDropdown(toggle);
            });
        });
    }
    
    /**
     * Alternar menu mobile
     */
    toggleMobileMenu() {
        const menuToggle = document.querySelector('.btn-menu');
        const menu = document.querySelector('.menu');
        
        if (menuToggle && menu) {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isOpen);
            menu.classList.toggle('open');
            
            if (!isOpen) {
                this.announceToScreenReader('Menu aberto');
            } else {
                this.announceToScreenReader('Menu fechado');
            }
        }
    }
    
    /**
     * Alternar dropdown
     */
    toggleDropdown(toggle) {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        const submenu = toggle.nextElementSibling;
        
        // Fechar outros dropdowns
        document.querySelectorAll('.dropdown-toggle').forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
                const otherSubmenu = otherToggle.nextElementSibling;
                if (otherSubmenu) {
                    otherSubmenu.classList.remove('open');
                }
            }
        });
        
        // Alternar dropdown atual
        toggle.setAttribute('aria-expanded', !isOpen);
        if (submenu) {
            submenu.classList.toggle('open');
        }
    }
    
    /**
     * Listeners de busca
     */
    initSearchListeners() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchPopup = document.querySelector('.search-popup');
        const searchClose = document.querySelector('.btn-close');
        const searchInput = document.querySelector('#search-input');
        
        if (searchToggle && searchPopup) {
            searchToggle.addEventListener('click', () => {
                this.openSearchPopup();
            });
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                this.closeSearchPopup();
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
        }
    }
    
    /**
     * Abrir popup de busca
     */
    openSearchPopup() {
        const searchPopup = document.querySelector('.search-popup');
        const searchInput = document.querySelector('#search-input');
        
        if (searchPopup) {
            searchPopup.setAttribute('aria-hidden', 'false');
            searchPopup.classList.add('open');
            
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
            
            this.announceToScreenReader('Busca aberta');
        }
    }
    
    /**
     * Fechar popup de busca
     */
    closeSearchPopup() {
        const searchPopup = document.querySelector('.search-popup');
        const searchToggle = document.querySelector('.search-toggle');
        
        if (searchPopup) {
            searchPopup.setAttribute('aria-hidden', 'true');
            searchPopup.classList.remove('open');
            
            if (searchToggle) {
                searchToggle.focus();
            }
            
            this.announceToScreenReader('Busca fechada');
        }
    }
    
    /**
     * Manipular busca
     */
    handleSearch(query) {
        if (query.length < 2) return;
        
        // Implementar lógica de busca
        console.log('Buscando por:', query);
        
        // Simular resultados
        setTimeout(() => {
            this.showNotification(`Buscando por: "${query}"`, 'info');
        }, 300);
    }
    
    /**
     * Sistema de notificações
     */
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}" aria-hidden="true"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" aria-label="Fechar notificação">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;
        
        // Limitar número de notificações visíveis
        const existingNotifications = container.querySelectorAll('.notification');
        if (existingNotifications.length >= CONFIG.notification.maxVisible) {
            existingNotifications[0].remove();
        }
        
        container.appendChild(notification);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Botão de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto-remover
        setTimeout(() => {
            this.hideNotification(notification);
        }, CONFIG.notification.duration);
        
        // Anunciar para leitores de tela
        this.announceToScreenReader(message);
    }
    
    /**
     * Esconder notificação
     */
    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
    
    /**
     * Obter ícone da notificação
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }
    
    /**
     * Mostrar loading
     */
    showLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.classList.add('show');
            loading.setAttribute('aria-hidden', 'false');
        }
    }
    
    /**
     * Esconder loading
     */
    hideLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.classList.remove('show');
            loading.setAttribute('aria-hidden', 'true');
        }
    }
    
    /**
     * Utilitários
     */
    
    /**
     * Throttle function
     */
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
    }
    
    /**
     * Debounce function
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    /**
     * Cleanup ao destruir
     */
    destroy() {
        // Remover event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeydown);
        
        // Desconectar observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        
        // Limpar timers
        this.notificationQueue.forEach(timer => {
            clearTimeout(timer);
        });
        
        console.log('🧹 Aplicação limpa com sucesso');
    }
}

/**
 * Adicionar estilos dinâmicos
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para animações dinâmicas */
        .hero-pillar.clicked {
            animation: pillarClick 0.3s ease;
        }
        
        @keyframes pillarClick {
            0% { transform: translateY(-10px) scale(1); }
            50% { transform: translateY(-15px) scale(1.05); }
            100% { transform: translateY(-10px) scale(1); }
        }
        
        .mission-graphic.pulse,
        .vision-graphic.pulse {
            animation: graphicPulse 1s ease;
        }
        
        @keyframes graphicPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); box-shadow: 0 30px 60px rgba(77, 166, 255, 0.4); }
            100% { transform: scale(1); }
        }
        
        /* Estilos para foco de teclado */
        .keyboard-focus {
            outline: 2px solid var(--accent-color) !important;
            outline-offset: 2px !important;
        }
        
        /* Estilos para header scrolled */
        #header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        [data-theme="dark"] #header.scrolled {
            background: rgba(15, 23, 42, 0.98);
        }
        
        /* Estilos para menu mobile */
        .menu.open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            box-shadow: var(--shadow-medium);
            z-index: 1000;
        }
        
        /* Estilos para dropdown */
        .sub-menu.open {
            display: block !important;
        }
        
        /* Estilos para search popup */
        .search-popup.open {
            display: block !important;
        }
        
        /* Estilos para notificações */
        .notification {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            padding: 1rem;
            margin-bottom: 0.5rem;
            box-shadow: var(--shadow-card);
            transform: translateX(100%);
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left: 4px solid #10b981;
        }
        
        .notification.error {
            border-left: 4px solid #ef4444;
        }
        
        .notification.warning {
            border-left: 4px solid #f59e0b;
        }
        
        .notification.info {
            border-left: 4px solid var(--accent-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 50%;
            transition: var(--transition-fast);
        }
        
        .notification-close:hover {
            background: var(--bg-secondary);
            color: var(--text-primary);
        }
        
        /* Ripple effect */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Inicialização da aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos dinâmicos
    addDynamicStyles();
    
    // Criar e inicializar aplicação
    window.missionVisionApp = new MissionVisionApp();
    window.missionVisionApp.init();
});

/**
 * Cleanup ao sair da página
 */
window.addEventListener('beforeunload', () => {
    if (window.missionVisionApp) {
        window.missionVisionApp.destroy();
    }
});

/**
 * Exportar para uso global se necessário
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MissionVisionApp, CONFIG, DATA };
}

