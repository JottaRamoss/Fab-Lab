// ===== JAVASCRIPT MELHORADO PARA PÁGINA INSTALAÇÕES =====

// Utility functions
const InstalacoesUtils = {
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

    // Generate unique ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }
};

// ===== DADOS DOS LABORATÓRIOS =====
const LaboratoriesData = {
    laboratories: [
        {
            id: 1,
            name: "Laboratório de Impressão 3D",
            category: "fabricacao",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
            description: "Espaço dedicado à prototipagem rápida e fabricação aditiva com tecnologias de ponta para desenvolvimento de produtos inovadores.",
            status: "available",
            area: "120m²",
            capacity: "15 pessoas",
            equipment: [
                "Impressoras 3D FDM (Ultimaker S5, Prusa i3)",
                "Impressoras 3D SLA (Formlabs Form 3)",
                "Scanner 3D (Artec Eva)",
                "Estação de pós-processamento",
                "Fornos de cura UV",
                "Lavadora ultrassônica"
            ],
            features: ["Impressão 3D", "Prototipagem", "Design", "Materiais Diversos"],
            specs: {
                area: "120m²",
                capacity: "15 pessoas",
                equipment: 12,
                materials: "PLA, ABS, PETG, Resina, TPU"
            },
            schedule: {
                weekdays: "8h às 18h",
                saturday: "9h às 13h",
                sunday: "Fechado"
            }
        },
        {
            id: 2,
            name: "Laboratório de Eletrônica",
            category: "eletronica",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
            description: "Ambiente completo para desenvolvimento de circuitos e projetos eletrônicos com equipamentos de medição e teste de alta precisão.",
            status: "busy",
            area: "80m²",
            capacity: "12 pessoas",
            equipment: [
                "Estações de solda (Weller WE1010)",
                "Osciloscópios (Tektronix TBS2000)",
                "Multímetros digitais",
                "Fontes de alimentação variáveis",
                "Geradores de função",
                "Analisadores de espectro"
            ],
            features: ["Eletrônica", "IoT", "Robótica", "Automação"],
            specs: {
                area: "80m²",
                capacity: "12 pessoas",
                equipment: 18,
                voltage: "110V/220V/380V"
            },
            schedule: {
                weekdays: "8h às 18h",
                saturday: "9h às 13h",
                sunday: "Fechado"
            }
        },
        {
            id: 3,
            name: "Laboratório de Marcenaria Digital",
            category: "marcenaria",
            image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop",
            description: "Oficina moderna com máquinas CNC e ferramentas tradicionais de marcenaria para criação de móveis e estruturas personalizadas.",
            status: "available",
            area: "200m²",
            capacity: "10 pessoas",
            equipment: [
                "Router CNC (ShopBot PRSalpha)",
                "Cortadora a laser (Epilog Fusion Pro)",
                "Serra circular de bancada",
                "Furadeira de bancada",
                "Plaina elétrica",
                "Sistema de aspiração"
            ],
            features: ["CNC", "Corte a Laser", "Marcenaria", "Design de Móveis"],
            specs: {
                area: "200m²",
                capacity: "10 pessoas",
                equipment: 15,
                materials: "Madeira, MDF, Acrílico, Compensado"
            },
            schedule: {
                weekdays: "8h às 18h",
                saturday: "9h às 13h",
                sunday: "Fechado"
            }
        },
        {
            id: 4,
            name: "Laboratório de Robótica",
            category: "robotica",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
            description: "Espaço para desenvolvimento e teste de sistemas robóticos e automação com plataformas de prototipagem avançadas.",
            status: "available",
            area: "150m²",
            capacity: "20 pessoas",
            equipment: [
                "Braços robóticos (Universal Robots UR5)",
                "Kits Arduino e Raspberry Pi",
                "Sensores diversos (LIDAR, câmeras)",
                "Motores servo e stepper",
                "Controladores PLC",
                "Plataformas móveis"
            ],
            features: ["Robótica", "IA", "Sensores", "Automação"],
            specs: {
                area: "150m²",
                capacity: "20 pessoas",
                equipment: 25,
                platforms: "Arduino, Raspberry Pi, ROS"
            },
            schedule: {
                weekdays: "8h às 18h",
                saturday: "9h às 13h",
                sunday: "Fechado"
            }
        },
        {
            id: 5,
            name: "Laboratório de Realidade Virtual",
            category: "digital",
            image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
            description: "Ambiente imersivo para desenvolvimento e teste de aplicações VR/AR com equipamentos de última geração.",
            status: "maintenance",
            area: "100m²",
            capacity: "8 pessoas",
            equipment: [
                "Headsets VR (Oculus Quest 2, HTC Vive)",
                "Computadores high-end (RTX 3080)",
                "Sensores de movimento",
                "Projetores 4K",
                "Sistemas de tracking",
                "Luvas hápticas"
            ],
            features: ["VR/AR", "Simulação", "Gaming", "Visualização"],
            specs: {
                area: "100m²",
                capacity: "8 pessoas",
                equipment: 12,
                resolution: "4K por olho"
            },
            schedule: {
                weekdays: "8h às 18h",
                saturday: "Fechado",
                sunday: "Fechado"
            }
        },
        {
            id: 6,
            name: "Laboratório de Biotecnologia",
            category: "biotecnologia",
            image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop",
            description: "Laboratório para pesquisa e desenvolvimento em biotecnologia e biofabricação com equipamentos especializados.",
            status: "available",
            area: "90m²",
            capacity: "6 pessoas",
            equipment: [
                "Microscópios ópticos e eletrônicos",
                "Incubadoras com controle de CO2",
                "Centrífugas refrigeradas",
                "Espectrofotômetros UV-Vis",
                "Cabines de segurança biológica",
                "Autoclaves"
            ],
            features: ["Biotecnologia", "Biofabricação", "Pesquisa", "Análise"],
            specs: {
                area: "90m²",
                capacity: "6 pessoas",
                equipment: 20,
                biosafety: "Nível 1 e 2"
            },
            schedule: {
                weekdays: "8h às 17h",
                saturday: "Fechado",
                sunday: "Fechado"
            }
        }
    ],

    equipmentData: {
        fabricacao: [
            { name: "Impressora 3D Ultimaker S5", status: "available", location: "Bancada A1" },
            { name: "Impressora 3D Formlabs Form 3", status: "available", location: "Bancada A2" },
            { name: "Scanner 3D Artec Eva", status: "maintenance", location: "Sala de Medição" },
            { name: "Cortadora a Laser Epilog", status: "available", location: "Área de Corte" },
            { name: "Forno de Cura UV", status: "available", location: "Bancada B1" }
        ],
        eletronica: [
            { name: "Osciloscópio Tektronix TBS2000", status: "available", location: "Bancada 1" },
            { name: "Estação de Solda Weller WE1010", status: "available", location: "Bancada 2" },
            { name: "Fonte de Alimentação Keysight", status: "reserved", location: "Bancada 3" },
            { name: "Analisador de Espectro", status: "available", location: "Rack Central" },
            { name: "Gerador de Função", status: "available", location: "Bancada 4" }
        ],
        marcenaria: [
            { name: "Router CNC ShopBot PRSalpha", status: "available", location: "Área Central" },
            { name: "Serra Circular Dewalt", status: "available", location: "Bancada Principal" },
            { name: "Furadeira de Bancada", status: "maintenance", location: "Área de Furação" },
            { name: "Lixadeira Orbital", status: "available", location: "Bancada de Acabamento" },
            { name: "Plaina Elétrica", status: "available", location: "Bancada de Preparação" }
        ],
        robotica: [
            { name: "Braço Robótico UR5", status: "available", location: "Célula 1" },
            { name: "Kit Arduino Mega", status: "available", location: "Bancada Eletrônica" },
            { name: "Raspberry Pi 4", status: "available", location: "Rack de Computação" },
            { name: "Sensor LIDAR", status: "reserved", location: "Área de Testes" },
            { name: "Plataforma Móvel TurtleBot", status: "available", location: "Área de Navegação" }
        ],
        digital: [
            { name: "Oculus Quest 2", status: "available", location: "Estação VR 1" },
            { name: "HTC Vive Pro", status: "maintenance", location: "Estação VR 2" },
            { name: "Computador RTX 3080", status: "available", location: "Workstation 1" },
            { name: "Projetor 4K", status: "available", location: "Sala de Projeção" }
        ],
        biotecnologia: [
            { name: "Microscópio Zeiss", status: "available", location: "Bancada de Microscopia" },
            { name: "Incubadora CO2", status: "available", location: "Área de Cultivo" },
            { name: "Centrífuga Refrigerada", status: "available", location: "Bancada Central" },
            { name: "Espectrofotômetro UV-Vis", status: "reserved", location: "Sala de Análise" }
        ]
    },

    getStatusText(status) {
        const statusMap = {
            'available': 'Disponível',
            'busy': 'Em Uso',
            'maintenance': 'Manutenção',
            'reserved': 'Reservado'
        };
        return statusMap[status] || status;
    },

    getStatusColor(status) {
        const colorMap = {
            'available': '#22c55e',
            'busy': '#ef4444',
            'maintenance': '#f59e0b',
            'reserved': '#8b5cf6'
        };
        return colorMap[status] || '#6b7280';
    }
};

// ===== LOADING SCREEN =====
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = null;
        this.init();
    }

    init() {
        if (!this.loadingScreen) return;

        this.progressBar = this.loadingScreen.querySelector('.loading-progress');
        this.simulateLoading();
        
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 1000);
        });
    }

    simulateLoading() {
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                setTimeout(() => this.hide(), 500);
            }
            if (this.progressBar) {
                this.progressBar.style.width = `${progress}%`;
            }
        }, 100);
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

// ===== LABORATÓRIOS MANAGER =====
class LaboratoriesManager {
    constructor() {
        this.laboratories = LaboratoriesData.laboratories;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderLaboratories();
        this.initFilterSystem();
        this.initLabInteractions();
        this.setupIntersectionObserver();
    }

    renderLaboratories() {
        const labsGrid = document.querySelector('.labs-grid');
        if (!labsGrid) return;

        labsGrid.innerHTML = this.laboratories.map(lab => this.createLabCard(lab)).join('');
        this.addLabEventListeners();
    }

    createLabCard(lab) {
        return `
            <div class="lab-card" data-id="${lab.id}" data-category="${lab.category}" data-aos="fade-up">
                <div class="lab-image">
                    <img src="${lab.image}" alt="${lab.name}" loading="lazy">
                    <div class="lab-overlay">
                        <a href="#" class="btn-explore" data-lab-id="${lab.id}">
                            <i class="fas fa-eye"></i>
                            Explorar
                        </a>
                    </div>
                    <div class="lab-status ${lab.status}">
                        ${LaboratoriesData.getStatusText(lab.status)}
                    </div>
                </div>
                <div class="lab-info">
                    <h3 class="lab-title">${lab.name}</h3>
                    <p class="lab-description">${lab.description}</p>
                    <div class="lab-specs">
                        <div class="spec-item">
                            <i class="fas fa-expand-arrows-alt"></i>
                            <span>${lab.specs.area}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-users"></i>
                            <span>${lab.specs.capacity}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-tools"></i>
                            <span>${lab.specs.equipment} equipamentos</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-cube"></i>
                            <span>${this.getSpecDetail(lab.specs)}</span>
                        </div>
                    </div>
                    <div class="lab-features">
                        ${lab.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getSpecDetail(specs) {
        return specs.materials || specs.voltage || specs.platforms || specs.resolution || specs.biosafety || 'Especializado';
    }

    addLabEventListeners() {
        // Explore buttons
        document.querySelectorAll('.btn-explore').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const labId = parseInt(btn.dataset.labId);
                this.openLabModal(labId);
            });
        });

        // Lab cards
        document.querySelectorAll('.lab-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-explore')) {
                    const labId = parseInt(card.dataset.id);
                    this.openLabModal(labId);
                }
            });

            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    initFilterSystem() {
        this.createFilterButtons();
        
        const filterButtons = document.querySelectorAll('.lab-filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.applyFilter(filter);
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                NotificationManager.show(`Filtro aplicado: ${btn.textContent}`);
            });
        });
    }

    createFilterButtons() {
        const labsSection = document.querySelector('.section-labs .container');
        if (!labsSection || document.querySelector('.labs-filters')) return;

        const categories = ['all', 'fabricacao', 'eletronica', 'marcenaria', 'robotica', 'digital', 'biotecnologia'];
        const categoryNames = {
            'all': 'Todos',
            'fabricacao': 'Fabricação',
            'eletronica': 'Eletrônica',
            'marcenaria': 'Marcenaria',
            'robotica': 'Robótica',
            'digital': 'Digital',
            'biotecnologia': 'Biotecnologia'
        };

        const filtersHTML = `
            <div class="labs-filters" data-aos="fade-up" data-aos-delay="100">
                ${categories.map((cat, index) => `
                    <button class="lab-filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat}">
                        ${categoryNames[cat]}
                    </button>
                `).join('')}
            </div>
        `;

        const sectionHeader = labsSection.querySelector('.section-header');
        sectionHeader.insertAdjacentHTML('afterend', filtersHTML);
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        const labCards = document.querySelectorAll('.lab-card');
        
        labCards.forEach(card => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    openLabModal(labId) {
        const lab = this.laboratories.find(l => l.id === labId);
        if (!lab) return;

        const modal = this.createLabModal(lab);
        document.body.appendChild(modal);
        
        // Show modal
        requestAnimationFrame(() => {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            modal.querySelector('.modal-close').focus();
        });

        // Add event listeners
        this.addModalEventListeners(modal);
    }

    createLabModal(lab) {
        const modal = document.createElement('div');
        modal.className = 'lab-modal';
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'modal-title');
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Fechar modal">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="modal-header">
                    <img class="modal-lab-image" src="${lab.image}" alt="${lab.name}">
                    <div class="modal-lab-info">
                        <h2 id="modal-title" class="modal-lab-name">${lab.name}</h2>
                        <span class="modal-lab-status ${lab.status}">
                            ${LaboratoriesData.getStatusText(lab.status)}
                        </span>
                    </div>
                </div>
                
                <div class="modal-body">
                    <p class="modal-lab-description">${lab.description}</p>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-tools"></i> Equipamentos Disponíveis</h3>
                        <ul class="equipment-list">
                            ${lab.equipment.map(equipment => 
                                `<li><i class="fas fa-check"></i> ${equipment}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-info-circle"></i> Especificações</h3>
                        <ul class="specs-list">
                            ${Object.entries(lab.specs).map(([key, value]) => 
                                `<li><strong>${this.formatSpecKey(key)}:</strong> ${value}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-clock"></i> Horários de Funcionamento</h3>
                        <ul class="schedule-list">
                            <li><strong>Segunda a Sexta:</strong> ${lab.schedule.weekdays}</li>
                            <li><strong>Sábado:</strong> ${lab.schedule.saturday}</li>
                            <li><strong>Domingo:</strong> ${lab.schedule.sunday}</li>
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-book" onclick="scrollToBooking()">
                            <i class="fas fa-calendar-check"></i>
                            Agendar Visita
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    formatSpecKey(key) {
        const keyMap = {
            'area': 'Área',
            'capacity': 'Capacidade',
            'equipment': 'Equipamentos',
            'materials': 'Materiais',
            'voltage': 'Tensão',
            'platforms': 'Plataformas',
            'resolution': 'Resolução',
            'biosafety': 'Biossegurança'
        };
        return keyMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }

    addModalEventListeners(modal) {
        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeLabModal(modal));

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeLabModal(modal);
            }
        });

        // Escape key to close
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeLabModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    closeLabModal(modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }

    initLabInteractions() {
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedCard = document.activeElement.closest('.lab-card');
                if (focusedCard) {
                    e.preventDefault();
                    const labId = parseInt(focusedCard.dataset.id);
                    this.openLabModal(labId);
                }
            }
        });
    }

    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.lab-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// ===== EQUIPMENT MANAGER =====
class EquipmentManager {
    constructor() {
        this.equipmentData = LaboratoriesData.equipmentData;
        this.init();
    }

    init() {
        this.renderEquipmentCategories();
        this.setupRealTimeUpdates();
    }

    renderEquipmentCategories() {
        const equipmentContainer = document.querySelector('.equipment-categories');
        if (!equipmentContainer) return;

        const categories = [
            { id: 'fabricacao', name: 'Fabricação Digital', icon: 'fas fa-cube' },
            { id: 'eletronica', name: 'Eletrônica', icon: 'fas fa-microchip' },
            { id: 'marcenaria', name: 'Marcenaria Digital', icon: 'fas fa-hammer' },
            { id: 'robotica', name: 'Robótica', icon: 'fas fa-robot' },
            { id: 'digital', name: 'Realidade Virtual', icon: 'fas fa-vr-cardboard' },
            { id: 'biotecnologia', name: 'Biotecnologia', icon: 'fas fa-dna' }
        ];

        equipmentContainer.innerHTML = categories.map(category => 
            this.createEquipmentCategory(category)
        ).join('');
    }

    createEquipmentCategory(category) {
        const equipment = this.equipmentData[category.id] || [];
        
        return `
            <div class="equipment-category" data-aos="fade-up">
                <div class="category-header">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3 class="category-title">${category.name}</h3>
                </div>
                <ul class="equipment-list">
                    ${equipment.map(item => `
                        <li class="equipment-item">
                            <div class="equipment-info">
                                <span class="equipment-name">${item.name}</span>
                                <span class="equipment-location">${item.location}</span>
                            </div>
                            <span class="equipment-status ${item.status}">
                                ${LaboratoriesData.getStatusText(item.status)}
                            </span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    setupRealTimeUpdates() {
        // Simulate real-time equipment status updates
        setInterval(() => {
            this.updateEquipmentStatus();
        }, 30000); // Update every 30 seconds
    }

    updateEquipmentStatus() {
        const equipmentItems = document.querySelectorAll('.equipment-status');
        equipmentItems.forEach(item => {
            // Randomly change some equipment status for demo
            if (Math.random() < 0.1) { // 10% chance
                const statuses = ['available', 'busy', 'maintenance', 'reserved'];
                const currentStatus = item.className.split(' ').pop();
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                if (currentStatus !== newStatus) {
                    item.className = `equipment-status ${newStatus}`;
                    item.textContent = LaboratoriesData.getStatusText(newStatus);
                }
            }
        });
    }
}

// ===== VIRTUAL TOUR MANAGER =====
class VirtualTourManager {
    constructor() {
        this.isFullscreen = false;
        this.isVRMode = false;
        this.init();
    }

    init() {
        this.setupTourControls();
    }

    setupTourControls() {
        // Make functions globally available
        window.startVirtualTour = () => this.startTour();
        window.toggleFullscreen = () => this.toggleFullscreen();
        window.startVRMode = () => this.startVRMode();
    }

    startTour() {
        NotificationManager.show('Iniciando tour virtual...', 'info');
        
        // Simulate tour start
        const tourContainer = document.querySelector('.tour-placeholder');
        if (tourContainer) {
            tourContainer.innerHTML = `
                <div class="tour-active">
                    <div class="tour-viewer">
                        <div class="tour-scene">
                            <i class="fas fa-360-degrees"></i>
                            <h3>Tour Virtual Ativo</h3>
                            <p>Use o mouse para navegar em 360°</p>
                        </div>
                    </div>
                    <div class="tour-navigation">
                        <button class="tour-nav-btn" onclick="this.previousScene()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <span class="tour-scene-info">Laboratório de Impressão 3D</span>
                        <button class="tour-nav-btn" onclick="this.nextScene()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    }

    toggleFullscreen() {
        const tourContainer = document.querySelector('.tour-container');
        if (!tourContainer) return;

        if (!this.isFullscreen) {
            if (tourContainer.requestFullscreen) {
                tourContainer.requestFullscreen();
            } else if (tourContainer.webkitRequestFullscreen) {
                tourContainer.webkitRequestFullscreen();
            } else if (tourContainer.msRequestFullscreen) {
                tourContainer.msRequestFullscreen();
            }
            this.isFullscreen = true;
            NotificationManager.show('Modo tela cheia ativado');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullscreen = false;
            NotificationManager.show('Modo tela cheia desativado');
        }
    }

    startVRMode() {
        if ('xr' in navigator) {
            NotificationManager.show('Iniciando modo VR...', 'info');
            // WebXR implementation would go here
        } else {
            NotificationManager.show('VR não suportado neste dispositivo.', 'error');
        }
    }
}

// ===== BOOKING MANAGER =====
class BookingManager {
    constructor() {
        this.form = null;
        this.init();
    }

    init() {
        this.form = document.getElementById('bookingForm');
        if (!this.form) return;

        this.setupForm();
        this.populateLabOptions();
        this.addFormValidation();
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmission();
        });
    }

    populateLabOptions() {
        const labSelect = this.form.querySelector('select[name="lab"]');
        if (!labSelect) return;

        const availableLabs = LaboratoriesData.laboratories.filter(lab => lab.status === 'available');
        
        labSelect.innerHTML = '<option value="">Selecione um laboratório</option>' +
            availableLabs.map(lab => `<option value="${lab.id}">${lab.name}</option>`).join('');
    }

    addFormValidation() {
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const isValid = field.checkValidity();
        
        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, field.validationMessage);
        } else {
            field.classList.remove('error');
            this.clearFieldError(field);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleSubmission() {
        if (!this.validateForm()) {
            NotificationManager.show('Por favor, corrija os erros antes de enviar.', 'error');
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        const submitButton = this.form.querySelector('.btn-submit');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            this.form.reset();
            
            NotificationManager.show('Agendamento realizado com sucesso! Entraremos em contato em breve.', 'success');
            
            // Send confirmation email (simulation)
            this.sendConfirmationEmail(data);
        }, 2000);
    }

    sendConfirmationEmail(data) {
        // Simulate email sending
        console.log('Sending confirmation email:', data);
        
        // In a real application, this would make an API call
        // to send the confirmation email
    }
}

// ===== NOTIFICATION MANAGER =====
class NotificationManager {
    static show(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));
        
        // Auto remove
        setTimeout(() => {
            if (document.body.contains(notification)) {
                this.remove(notification);
            }
        }, duration);
    }

    static getIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    static getBackgroundColor(type) {
        const colors = {
            'success': '#22c55e',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    static remove(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupStatsAnimation();
    }

    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.overview-card, .equipment-category, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    setupStatsAnimation() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.overview-card .overview-title').forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateStats(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number && number > 0) {
            InstalacoesUtils.animateNumber(element, number);
        }
    }
}

// ===== BACK TO TOP =====
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
        const scrollHandler = InstalacoesUtils.throttle(() => {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', scrollHandler, { passive: true });
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
        this.createLiveRegion();
    }

    setupFocusManagement() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupKeyboardNavigation() {
        document.querySelectorAll('[role="button"]:not(button)').forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }

    createLiveRegion() {
        if (document.getElementById('live-region')) return;
        
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

// ===== MAIN APPLICATION =====
class InstalacoesApp {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
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
                new LaboratoriesManager(),
                new EquipmentManager(),
                new VirtualTourManager(),
                new BookingManager(),
                new ScrollAnimations(),
                new BackToTop(),
                new AccessibilityEnhancements()
            ];

            // Setup global functions
            this.setupGlobalFunctions();

            // Initialize AOS if available
            this.initializeAOS();

            console.log('✅ Instalações - Todos os componentes inicializados com sucesso!');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
        }
    }

    setupGlobalFunctions() {
        // Global function for booking scroll
        window.scrollToBooking = () => {
            const bookingSection = document.querySelector('.section-booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Global function for map
        window.openMap = () => {
            const mapUrl = 'https://maps.google.com/?q=Av.+Graça+Aranha,+1+-+Centro,+Rio+de+Janeiro+-+RJ';
            window.open(mapUrl, '_blank');
        };
    }

    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                delay: 100
            });
        }
    }
}

// ===== INITIALIZE APPLICATION =====
const instalacoesApp = new InstalacoesApp();

// Export for external use
window.InstalacoesApp = InstalacoesApp;
window.NotificationManager = NotificationManager;

