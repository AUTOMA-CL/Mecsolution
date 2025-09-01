document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contactForm');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--bg-primary)';
            header.style.backdropFilter = 'none';
        }

        lastScroll = currentScroll;
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const whatsappMessage = `Hola MecSolution, mi nombre es ${name}. ${message}`;
            const whatsappUrl = `https://wa.me/56923978645?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappUrl, '_blank');
            
            contactForm.reset();
            
            showNotification('Mensaje enviado correctamente');
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    const images = document.querySelectorAll('.service-image img, .logo img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Error loading image: ${this.src}`);
            this.style.display = 'none';
            
            const parent = this.parentElement;
            if (parent.classList.contains('service-image')) {
                parent.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>';
            }
        });
    });

    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.parentElement;
            const wasActive = parent.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            if (!wasActive) {
                parent.classList.add('active');
            }
        });
    });

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showNotification('Número copiado al portapapeles');
                });
            }
        });
    });

    // Modal functionality for service details
    const serviceData = {
        'mantenimiento-basico': {
            title: 'Mantenimiento Básico',
            subtitle: '(Bencinero y Diésel)',
            image: 'image/filtro aceite.jpg',
            description: 'Mantenemos tu vehículo en óptimas condiciones con nuestro servicio de mantenimiento básico. Ideal para el cuidado preventivo regular de tu auto.',
            features: [
                'Cambio de aceite de motor con aceite de alta calidad',
                'Reemplazo de filtro de aceite',
                'Cambio de filtro de aire del motor',
                'Cambio de filtro de polen/habitáculo',
                'Revisión de niveles de fluidos',
                'Inspección visual general del vehículo',
                'Reporte detallado del estado del vehículo'
            ]
        },
        'afinamiento-completo': {
            title: 'Afinamiento Completo',
            subtitle: '(Bencinero)',
            image: 'image/bujias.jpg',
            description: 'Servicio completo de afinamiento para maximizar el rendimiento de tu motor bencinero. Incluye todo lo necesario para mantener tu vehículo funcionando como nuevo.',
            features: [
                'Cambio de bujías de alta calidad',
                'Cambio de aceite y filtro de aceite',
                'Reemplazo de filtro de aire',
                'Cambio de filtro de combustible',
                'Limpieza de inyectores',
                'Revisión del sistema de encendido',
                'Ajuste de carburación (si aplica)',
                'Revisión de correas y mangueras'
            ]
        },
        'frenos': {
            title: 'Sistema de Frenos',
            subtitle: 'Seguridad garantizada',
            image: 'image/pastilla freno.jpg',
            description: 'Tu seguridad es lo más importante. Ofrecemos servicio completo de frenos con repuestos de calidad y mano de obra especializada.',
            features: [
                'Cambio de pastillas de freno delanteras y traseras',
                'Rectificado de discos de freno',
                'Cambio de discos nuevos cuando sea necesario',
                'Servicio de tambores traseros',
                'Cambio de líquido de frenos',
                'Revisión de cañerías y mangueras',
                'Calibración del sistema de frenos',
                'Prueba de funcionamiento en ruta'
            ]
        },
        'suspension-direccion': {
            title: 'Suspensión y Dirección',
            subtitle: 'Confort y estabilidad',
            image: 'image/suspensión.jpg',
            description: 'Mantén la comodidad y seguridad de tu vehículo con nuestro servicio especializado en suspensión y dirección.',
            features: [
                'Cambio de amortiguadores delanteros y traseros',
                'Reemplazo de bandejas de suspensión',
                'Cambio de rótulas superiores e inferiores',
                'Reemplazo de terminales de dirección',
                'Cambio de axiales',
                'Alineación y balanceo',
                'Revisión de dirección hidráulica',
                'Inspección completa del sistema'
            ]
        },
        'neumaticos': {
            title: 'Neumáticos',
            subtitle: 'Adherencia y seguridad',
            image: 'image/neumatico.jpg',
            description: 'Servicio completo de neumáticos para mantener la seguridad y el rendimiento óptimo de tu vehículo en todo tipo de condiciones.',
            features: [
                'Venta e instalación de neumáticos nuevos',
                'Montaje profesional de neumáticos',
                'Balanceo computarizado de precisión',
                'Alineación de dirección',
                'Rotación de neumáticos',
                'Reparación de pinchazos',
                'Válvulas nuevas incluidas',
                'Asesoría en selección de neumáticos'
            ]
        },
        'desabolladura-pintura': {
            title: 'Desabolladura y Pintura',
            subtitle: 'Como nuevo',
            image: 'image/desabolladura-pintura.jpg',
            description: 'Devuelve la apariencia original a tu vehículo con nuestro servicio de desabolladura y pintura profesional.',
            features: [
                'Desabolladura sin pintura (PDR)',
                'Reparación de abolladuras menores y mayores',
                'Pintura completa o parcial',
                'Retoque de pintura',
                'Pulido y encerado',
                'Reparación de rayones',
                'Pintura al horno cuando sea necesario',
                'Garantía en trabajos realizados'
            ]
        },
        'revision-tecnica': {
            title: 'Revisión Técnica',
            subtitle: 'Servicio completo',
            image: 'image/revicion tecnica.jpg',
            description: 'Te facilitamos el trámite de la revisión técnica. Llevamos y traemos tu vehículo, realizamos los ajustes necesarios y gestionamos todo el proceso.',
            features: [
                'Retiro del vehículo en tu domicilio',
                'Pre-inspección completa',
                'Ajustes necesarios para aprobar',
                'Trámite en planta de revisión técnica',
                'Entrega del vehículo en tu domicilio',
                'Certificado de revisión técnica',
                'Reporte de trabajos realizados',
                'Garantía en ajustes realizados'
            ]
        },
        'diagnostico': {
            title: 'Diagnóstico Profesional',
            subtitle: 'Scanner de última generación',
            image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=2070&auto=format&fit=crop',
            description: 'Utilizamos equipos de diagnóstico de última generación para identificar precisamente cualquier falla en tu vehículo.',
            features: [
                'Diagnóstico con scanner profesional',
                'Compatible con todas las marcas',
                'Lectura de códigos de error',
                'Diagnóstico de motor, transmisión, ABS, airbag',
                'Pruebas de sensores y actuadores',
                'Reporte detallado de fallas encontradas',
                'Presupuesto para reparaciones',
                'Asesoría técnica especializada'
            ]
        },
        'clima': {
            title: 'Sistema de Clima',
            subtitle: 'Confort todo el año',
            image: 'image/sistema-clima.jpg',
            description: 'Mantén el confort en tu vehículo con nuestro servicio especializado en sistemas de climatización.',
            features: [
                'Carga de gas refrigerante',
                'Revisión de compresor de A/C',
                'Cambio de filtro deshidratador',
                'Reparación de fugas en el sistema',
                'Cambio de condensador y evaporador',
                'Reparación de calefacción',
                'Limpieza de conductos de aire',
                'Prueba de funcionamiento completa'
            ]
        },
        'importacion-repuestos': {
            title: 'Importación de Repuestos',
            subtitle: 'Calidad garantizada',
            image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2074&auto=format&fit=crop',
            description: 'Conseguimos los repuestos que necesitas con la mejor relación calidad-precio del mercado.',
            features: [
                'Repuestos originales y alternativos',
                'Importación directa',
                'Amplio stock disponible',
                'Repuestos para todas las marcas',
                'Garantía en todos los productos',
                'Precios competitivos',
                'Asesoría en selección de repuestos',
                'Instalación profesional disponible'
            ]
        },
        'revision-precompra': {
            title: 'Revisión Pre-compra',
            subtitle: 'Compra con confianza',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop',
            description: 'Evita sorpresas desagradables. Evaluamos completamente el vehículo que planeas comprar antes de tomar la decisión.',
            features: [
                'Inspección mecánica completa',
                'Revisión de documentos',
                'Prueba de manejo especializada',
                'Diagnóstico computarizado',
                'Evaluación de carrocería y pintura',
                'Informe detallado por escrito',
                'Estimación de reparaciones necesarias',
                'Asesoría en la decisión de compra'
            ]
        },
        'cambio-fluidos': {
            title: 'Cambio de Fluidos',
            subtitle: 'Mantenimiento preventivo',
            image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=2070&auto=format&fit=crop',
            description: 'Mantén todos los sistemas de tu vehículo funcionando correctamente con el cambio preventivo de fluidos.',
            features: [
                'Cambio de líquido refrigerante',
                'Reemplazo de líquido de frenos',
                'Cambio de aceite hidráulico',
                'Líquido de transmisión automática',
                'Líquido de dirección hidráulica',
                'Fluidos de alta calidad',
                'Revisión de niveles y fugas',
                'Calendario de mantenimiento personalizado'
            ]
        },
        'cambio-bateria': {
            title: 'Cambio de Batería',
            subtitle: 'Energía confiable',
            image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop',
            description: 'Asegura el arranque confiable de tu vehículo con nuestro servicio de baterías de primera calidad.',
            features: [
                'Diagnóstico del sistema de carga',
                'Prueba de alternador y motor de arranque',
                'Baterías de primeras marcas',
                'Instalación profesional',
                'Limpieza de terminales',
                'Aplicación de protector anti-corrosión',
                'Prueba de funcionamiento',
                'Garantía extendida disponible'
            ]
        },
        'reparaciones-electricas': {
            title: 'Reparaciones Eléctricas',
            subtitle: 'Expertos en electricidad automotriz',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
            description: 'Solucionamos cualquier problema eléctrico de tu vehículo con tecnología avanzada y experiencia comprobada.',
            features: [
                'Diagnóstico eléctrico computarizado',
                'Reparación de alternadores',
                'Reparación de motores de arranque',
                'Sistema de luces y señalización',
                'Reparación de cableado',
                'Instalación de accesorios eléctricos',
                'Sistemas de alarma y seguridad',
                'Garantía en reparaciones realizadas'
            ]
        },
        'reparaciones-menores': {
            title: 'Reparaciones Correctivas Menores',
            subtitle: 'Soluciones rápidas',
            image: 'https://images.unsplash.com/photo-1621993202323-f438eec934ff?q=80&w=2070&auto=format&fit=crop',
            description: 'Solucionamos rápidamente los problemas menores de tu vehículo para que puedas seguir circulando sin preocupaciones.',
            features: [
                'Reparaciones de emergencia',
                'Cambio de correas y mangueras',
                'Reparación de fugas menores',
                'Ajustes de carrocería',
                'Cambio de focos y fusibles',
                'Reparación de espejos',
                'Ajuste de puertas y ventanas',
                'Servicio rápido y eficiente'
            ]
        },
        'cambio-embrague': {
            title: 'Cambio de Embrague',
            subtitle: 'Transmisión suave',
            image: 'image/embrague.jpg',
            description: 'Servicio completo de embrague para vehículos de transmisión manual. Recupera la suavidad en los cambios de tu auto.',
            features: [
                'Diagnóstico completo del sistema',
                'Cambio de disco de embrague',
                'Reemplazo de plato de presión',
                'Cambio de rodamiento de empuje',
                'Rectificado de volante cuando sea necesario',
                'Ajuste del sistema hidráulico',
                'Cambio de líquido de embrague',
                'Prueba de funcionamiento en ruta'
            ]
        }
    };

    // Create modal element
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'serviceModal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <img class="modal-image" src="" alt="">
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <h2 class="modal-title"></h2>
                    <p class="modal-subtitle"></p>
                    <p class="modal-description"></p>
                    <div class="modal-features">
                        <h4>¿Qué incluye este servicio?</h4>
                        <ul></ul>
                    </div>
                    <div class="modal-cta">
                        <a href="contacto.html" class="btn btn-primary">Solicitar Servicio</a>
                        <a href="tel:+56923978645" class="btn btn-secondary">☎ Llamar Ahora</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Initialize modal
    const modal = createModal();
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalSubtitle = modal.querySelector('.modal-subtitle');
    const modalDescription = modal.querySelector('.modal-description');
    const modalFeatures = modal.querySelector('.modal-features ul');
    const modalClose = modal.querySelector('.modal-close');

    // Open modal function
    function openModal(serviceId) {
        const service = serviceData[serviceId];
        if (!service) return;

        modalImage.src = service.image;
        modalImage.alt = service.title;
        modalTitle.textContent = service.title;
        modalSubtitle.textContent = service.subtitle;
        modalDescription.textContent = service.description;
        
        modalFeatures.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Event listeners for modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Convert service links to modal triggers
    function initServiceModals() {
        // Only intercept links to specific service pages, not general servicios.html
        const specificServiceLinks = document.querySelectorAll('a[href*="servicios/"]');
        const homepageServiceCards = document.querySelectorAll('.services-preview .service-card-link');
        
        // Handle specific service page links (servicios/service-name.html)
        specificServiceLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                const serviceId = href.split('servicios/')[1].replace('.html', '');
                
                if (serviceId && serviceData[serviceId]) {
                    openModal(serviceId);
                }
            });
        });
        
        // Handle homepage service cards - determine service from title
        homepageServiceCards.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                let serviceId;
                const titleElement = this.querySelector('h3');
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    if (title.includes('diagnóstico')) serviceId = 'diagnostico';
                    else if (title.includes('revisión técnica')) serviceId = 'revision-tecnica';
                    else if (title.includes('frenos')) serviceId = 'frenos';
                    else if (title.includes('neumáticos')) serviceId = 'neumaticos';
                    else if (title.includes('aceite')) serviceId = 'mantenimiento-basico';
                    else if (title.includes('embrague')) serviceId = 'cambio-embrague';
                }
                
                if (serviceId && serviceData[serviceId]) {
                    openModal(serviceId);
                }
            });
        });
    }

    // Initialize service modals
    initServiceModals();
});