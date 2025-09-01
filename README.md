# MecSolution.cl - Taller Mecánico Profesional

Una página web moderna y profesional para MecSolution.cl, taller especializado en mecánica automotriz con más de 15 años de experiencia en el sector.

## 🚗 Sobre MecSolution

**MecSolution** es un taller mecánico profesional dirigido por **Nicolás Del Brutto**, Ingeniero Mecánico Automotriz, que se especializa en brindar soluciones integrales para el mantenimiento y reparación de vehículos.

### Filosofía de la Empresa
- **Visión**: Ser la solución de confianza al momento de reparar y mantener el auto
- **Misión**: Damos seguridad al cliente con transparencia en todo momento adecuándonos a sus requerimientos

## 🛠️ Servicios Principales

### Mantenimiento y Reparación
- **Mantenimiento Básico** (Bencinero y Diésel)
- **Afinamiento Completo** (Bencinero)
- **Frenos**: Cambio de discos, pastillas, tambores, balatas y rectificado
- **Suspensión y Dirección**: Amortiguadores, bandejas, rótulas, terminales
- **Neumáticos**: Cambio, montaje, balanceo y alineación

### Servicios Especializados
- **Diagnóstico Electrónico** con scanner profesional
- **Revisión Técnica** (servicio completo de ida y vuelta)
- **Sistema de Clima** (reparación y carga de A/C)
- **Desabolladura y Pintura**
- **Revisión Pre-compra** (visual, mecánica y electrónica)
- **Importación de Repuestos**
- **Cambio de Fluidos** (refrigerante, frenos, hidráulico)
- **Reparaciones Eléctricas**
- **Cambio de Embrague**
- **Sistema de Distribución**

## 🏗️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados con variables CSS
- **JavaScript (Vanilla)** - Funcionalidades interactivas
- **Google Fonts** - Tipografía Inter
- **Responsive Design** - Compatible con todos los dispositivos

### Características Técnicas
- **Performance**: Optimizada para carga rápida
- **SEO**: Meta tags optimizados para motores de búsqueda
- **PWA Ready**: Preparada para funcionalidades Progressive Web App
- **Mobile First**: Diseño responsive con breakpoints optimizados
- **Accessibility**: Navegación accesible con teclado y screen readers

### Integración WhatsApp
- Formulario de contacto integrado con WhatsApp Business
- Enlaces directos para llamadas telefónicas
- Botón flotante de contacto siempre visible

## 📁 Estructura del Proyecto

```
mecsolution/
├── index.html              # Página principal
├── servicios.html          # Página de servicios detallados
├── privacidad.html         # Política de privacidad
├── terminos.html           # Términos y condiciones
├── styles.css              # Estilos principales
├── script.js               # JavaScript funcional
├── image/                  # Recursos visuales
│   ├── logo principal.png
│   ├── filtro aceite.jpg
│   ├── bujias.jpg
│   ├── pastilla freno.jpg
│   ├── suspensión.jpg
│   ├── neumatico.jpg
│   ├── embrague.jpg
│   ├── revicion tecnica.jpg
│   └── sistema de distribución.jpg
├── PRD-mecsolution.md      # Documento de requerimientos
└── README.md               # Este archivo
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Navegador web moderno
- Editor de código (VS Code recomendado)
- Servidor web local (opcional para desarrollo)

### Instalación Local

1. **Clonar el repositorio**:
```bash
git clone https://github.com/AUTOMA-CL/Mecsolution.git
cd mecsolution
```

2. **Abrir con servidor local** (opcional):
```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

3. **Abrir en navegador**:
- Directo: Abrir `index.html` en el navegador
- Con servidor: `http://localhost:8000`

### Desarrollo

#### Estructura de Colores (CSS Variables)
```css
:root {
    --primary-color: #1e40af;      /* Azul principal */
    --secondary-color: #3b82f6;    /* Azul secundario */
    --accent-color: #60a5fa;       /* Azul acento */
    --text-primary: #1f2937;       /* Texto principal */
    --text-secondary: #6b7280;     /* Texto secundario */
    --bg-primary: #ffffff;         /* Fondo principal */
    --bg-secondary: #f9fafb;       /* Fondo secundario */
}
```

#### Breakpoints Responsive
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🌐 Despliegue en Vercel

### Configuración Automática

1. **Fork o Push al repositorio**:
```bash
git remote add origin https://github.com/AUTOMA-CL/Mecsolution.git
git push -u origin main
```

2. **Conectar con Vercel**:
   - Ir a [vercel.com](https://vercel.com)
   - Conectar repositorio de GitHub
   - Seleccionar `AUTOMA-CL/Mecsolution`
   - Deploy automático

### Configuración Manual de Vercel

Crear archivo `vercel.json` (opcional):
```json
{
  "routes": [
    { "src": "/", "dest": "/index.html" },
    { "src": "/servicios", "dest": "/servicios.html" },
    { "src": "/privacidad", "dest": "/privacidad.html" },
    { "src": "/terminos", "dest": "/terminos.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Variables de Entorno en Vercel
```bash
# En dashboard de Vercel > Settings > Environment Variables
NODE_ENV=production
VERCEL_URL=mecsolution.vercel.app  # Se genera automáticamente
```

## 🗄️ Preparación para Supabase

### Futura Integración de Base de Datos

El proyecto está preparado para conectarse con **Supabase** para las siguientes funcionalidades:

#### Estructura de Base de Datos Propuesta

```sql
-- Tabla de contactos
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    service_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Tabla de servicios (para administración)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price_range VARCHAR(50),
    image_url VARCHAR(500),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de testimonios
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    service VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Configuración Futura

1. **Instalar dependencias**:
```bash
npm install @supabase/supabase-js
```

2. **Variables de entorno** (`.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Configuración de cliente**:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

#### Funcionalidades Futuras con Supabase
- **Formulario de contacto** → Almacenamiento en BD
- **Sistema de citas** online
- **Historial de servicios** por cliente
- **Panel de administración** para gestión
- **Sistema de testimonios** con moderación
- **Analytics** de contactos y servicios solicitados

## 📱 Funcionalidades Implementadas

### Interfaz de Usuario
- ✅ **Navegación responsiva** con hamburger menu
- ✅ **Animaciones CSS** suaves y profesionales
- ✅ **Hero section** con llamada a la acción
- ✅ **Grid de servicios** con imágenes optimizadas
- ✅ **FAQ interactivo** con accordion
- ✅ **Formulario de contacto** integrado con WhatsApp

### Interactividad JavaScript
- ✅ **Smooth scrolling** entre secciones
- ✅ **Header dinámico** con scroll detection
- ✅ **Intersection Observer** para animaciones
- ✅ **Manejo de errores** de imágenes
- ✅ **Notificaciones** toast personalizadas
- ✅ **Copiar teléfono** al portapapeles (desktop)

### SEO y Performance
- ✅ **Meta tags** optimizados
- ✅ **Open Graph** y Twitter Cards
- ✅ **Structured data** para Google
- ✅ **Imágenes optimizadas** con lazy loading
- ✅ **Lighthouse score** optimizado

## 📞 Información de Contacto

- **Teléfono**: [+569 2397 8645](tel:+56923978645)
- **Instagram**: [@mecsolution.cl](https://instagram.com/mecsolution.cl)
- **Ingeniero**: Nicolás Del Brutto - Ingeniero Mecánico Automotriz
- **Ubicación**: Chile

## 🔧 Configuración de Git

### Repositorio Principal
```bash
git remote -v
origin  https://github.com/AUTOMA-CL/Mecsolution.git (fetch)
origin  https://github.com/AUTOMA-CL/Mecsolution.git (push)
```

### Workflow de Desarrollo
```bash
# Desarrollo local
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: descripción de la nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# Deploy a producción
git checkout main
git merge feature/nueva-funcionalidad
git push origin main  # Auto-deploy en Vercel
```

## 🎯 Roadmap Futuro

### Próximas Funcionalidades
- [ ] **Panel de administración** con Supabase
- [ ] **Sistema de citas** online
- [ ] **Calculadora de servicios** con precios
- [ ] **Galería de trabajos** realizados
- [ ] **Blog técnico** sobre mantenimiento
- [ ] **Chat en vivo** integrado
- [ ] **PWA completa** con offline support
- [ ] **Integración con Google Analytics**
- [ ] **Sistema de reseñas** automatizado

### Optimizaciones Técnicas
- [ ] **Migración a Next.js** (opcional)
- [ ] **CDN para imágenes** (Cloudinary)
- [ ] **Compresión avanzada** de assets
- [ ] **Service Workers** para cache
- [ ] **AMP pages** para móviles

## 📄 Licencia

Este proyecto es propiedad de **MecSolution.cl** y **AUTOMA-CL**. Todos los derechos reservados.

---

**Desarrollado por**: AUTOMA-CL  
**Cliente**: MecSolution.cl  
**Año**: 2024  
**Versión**: 1.0.0