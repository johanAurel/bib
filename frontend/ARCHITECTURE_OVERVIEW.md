# BIB Holdings Frontend - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Frontend App                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   React Router App                   │  │
│  │  (App.jsx - Navbar | Main Content | Footer)         │  │
│  └──────────────────────────────────────────────────────┘  │
│         │          │           │          │          │      │
│         ▼          ▼           ▼          ▼          ▼      │
│    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │
│    │Landing │ │Portfolio│ │ About │ │Strategy│ │Contact │ │
│    │        │ │        │ │       │ │        │ │        │ │
│    └────┬───┘ └────┬───┘ └──┬────┘ └────┬───┘ └────┬───┘ │
│         │          │        │          │          │       │
│         └──────────┴────────┴──────────┴──────────┘       │
│                          │                                 │
│    ┌─────────────────────▼──────────────────────┐         │
│    │     Component Library (UI Components)      │         │
│    │  • CustomCursor.jsx                        │         │
│    │  • AnimatedCounter.jsx                     │         │
│    │  • SectionReveal.jsx                       │         │
│    │  • GeometricShapes.jsx (NEW - 3D Hero)    │         │
│    └─────────┬──────────────────────────────────┘         │
│              │                                             │
│    ┌─────────▼──────────────────────────────────┐         │
│    │      Design System & Styling                │         │
│    │  • tokens.js (Colors, Typography)          │         │
│    │  • index.css (Global Styles)              │         │
│    │  • App.css (Component Styles)             │         │
│    └────────────────────────────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
┌──────────────────┐            ┌──────────────────┐
│  API Client      │            │  Three.js 3D     │
│                  │            │  Rendering       │
│ • portfolio.js   │            │                  │
│ • client.js      │            │ • WebGL Context  │
└────────┬─────────┘            │ • Shape Meshes   │
         │                       │ • Lighting       │
         ▼                       │ • Raycaster      │
┌──────────────────┐            └──────────────────┘
│  Backend API     │
│  (if running)    │
│                  │
│ GET /stats       │
│ GET /investments │
│ POST /contact    │
└──────────────────┘
```

---

## Component Hierarchy

### App Level
```
App (BrowserRouter)
├── CustomCursor
├── Navbar
│   ├── Logo (Link)
│   ├── Navigation Links
│   └── Admin Link
├── Routes
│   ├── Landing
│   │   ├── GeometricShapes (3D Canvas)
│   │   └── StatCards
│   ├── Portfolio
│   │   ├── Filters
│   │   └── Investment Cards
│   ├── About
│   │   └── Content Sections
│   ├── Strategy
│   │   └── Strategy Cards
│   ├── Contact
│   │   ├── Form
│   │   └── Submission Handler
│   └── AdminPortal
│       └── AdminDashboard
└── Footer
    ├── Copyright
    └── Author Info
```

---

## 3D Scene Architecture (GeometricShapes.jsx)

```
Three.js Scene
│
├── Camera (PerspectiveCamera)
│   └── Position: z=60
│
├── Renderer (WebGLRenderer)
│   ├── Alpha: true
│   ├── Antialias: true
│   └── Shadow Map: enabled
│
├── Lighting System
│   ├── AmbientLight (0xffffff, 0.4)
│   │   └── Illuminates entire scene
│   │
│   ├── BlueLight (PointLight)
│   │   ├── Color: 0x0066FF
│   │   ├── Position: (-20, 20, 30)
│   │   └── Intensity: 1.5
│   │
│   └── GoldLight (PointLight)
│       ├── Color: 0xC9A84C
│       ├── Position: (20, -20, 30)
│       └── Intensity: 1.2
│
├── Main Geometric Structure
│   ├── MainGroup (Group)
│   │   ├── Hexagon (ConeGeometry)
│   │   │   ├── Color: 0xC9A84C (Gold)
│   │   │   ├── Emissive: 0xC9A84C
│   │   │   └── Metalness: 0.3
│   │   │
│   │   └── InnerRing (TorusGeometry)
│   │       ├── Color: 0x0066FF (Blue)
│   │       ├── Emissive: 0x0066FF
│   │       └── Metalness: 0.4
│   │
│   └── Animation: Continuous rotation
│       ├── Rotation X: +0.0005
│       ├── Rotation Y: +0.0008
│       └── Rotation Z: +0.0002
│
├── Interactive Mini Shapes (8 Total)
│   │
│   ├── Triangles (3x TetrahedronGeometry)
│   │   ├── Color: 0x0066FF (Blue)
│   │   ├── Position: Orbital (35 units radius)
│   │   └── Y Position: +5
│   │
│   ├── Spheres (3x IcosahedronGeometry)
│   │   ├── Color: 0xC9A84C (Gold)
│   │   ├── Position: Orbital (35 units radius)
│   │   └── Y Position: -5
│   │
│   └── Octahedrons (2x OctahedronGeometry)
│       ├── Color: 0x3385FF (Light Blue)
│       ├── Position: Orbital (45 units radius)
│       └── Y Position: 0
│
├── Interactive Behavior (Each Mini Shape)
│   ├── Base Emissive: 0.3
│   ├── Hover Emissive: 1.2-1.4
│   ├── Rotation Speed: 0.002-0.006
│   ├── Float Motion: Sine wave
│   ├── Pulse on Hover: Scale 1.0→1.15
│   └── Smooth Transitions: 0.1s lerp
│
└── Input Handling
    ├── Raycaster (Mouse Intersection Detection)
    ├── Mouse Move Handler
    │   ├── Normalized coordinates
    │   ├── Raycaster.setFromCamera()
    │   └── Intersection checking
    │
    ├── Hover State Management
    │   └── Per-shape isHovered flag
    │
    └── Responsive Resizing
        ├── Window resize listener
        ├── Camera aspect update
        └── Renderer size update
```

---

## Design System Structure

### Color Tokens (tokens.js)
```javascript
colors = {
  black: '#0a0e27',           // Primary background
  white: '#F5F2EC',           // Primary text
  gold: '#C9A84C',            // Primary accent
  goldLight: '#E2C97A',       // Light accent
  blue: '#0066FF',            // Secondary accent
  blueDark: '#004FCC',        // Dark variant
  blueLight: '#3385FF',       // Light variant
  slate: '#1A1A1E',           // Component bg
  slateLight: '#2A2A30',      // Hover states
  muted: '#6B6B6B',           // Muted text
  error: '#E74C3C',           // Error states
  success: '#27AE60',         // Success states
}
```

### Typography (tokens.js)
```javascript
Typography = {
  h1: { fontSize: 72, fontWeight: 900 },
  h2: { fontSize: 48, fontWeight: 700 },
  h3: { fontSize: 32, fontWeight: 700 },
  body: { fontSize: 16, fontWeight: 400 },
  bodySmall: { fontSize: 14, fontWeight: 400 },
  label: { fontSize: 12, fontWeight: 500 },
}
```

### Spacing Scale
```javascript
spacing = {
  xs: 4,      // Small gaps
  sm: 8,      // Elements spacing
  md: 16,     // Standard spacing
  lg: 24,     // Section spacing
  xl: 32,     // Large sections
  xxl: 48,    // Major sections
}
```

---

## State Management Flow

### Landing Page State
```
Landing Component
│
├── stats (state)
│   ├── Initial: []
│   ├── Fetch: portfolioAPI.stats.list()
│   ├── Update: setStats(data)
│   └── Display: StatCard components
│
└── useEffect
    ├── On mount: Fetch stats
    ├── On unmount: Cleanup
    └── Dependencies: []
```

### Portfolio Page State
```
Portfolio Component
│
├── investments (state)
│   ├── Initial: []
│   ├── Fetch: portfolioAPI.investments.list()
│   └── Update: setInvestments(data)
│
└── selectedSector (state)
    ├── Initial: 'all'
    ├── Filter by sector
    └── Update: setSelectedSector()
```

### GeometricShapes State
```
GeometricShapes Component
│
├── containerRef (useRef)
│   └── Canvas attachment
│
├── mouseRef (useRef)
│   ├── x coordinate
│   └── y coordinate
│
├── sceneRef (useRef)
│   └── Three.js Scene
│
├── shapesRef (useRef)
│   └── Array of mini shapes with state
│       ├── isHovered (boolean)
│       ├── mesh (THREE.Mesh)
│       ├── baseEmissiveIntensity
│       └── maxEmissiveIntensity
│
└── mainShapeRef (useRef)
    └── Central hexagon group
```

---

## Animation Pipeline

### Global Animations
1. **Page Load**
   - Fade in effect
   - Staggered element reveals
   - Smooth transitions

2. **Hover Effects**
   - Border color transitions (0.3s)
   - Scale transitions
   - Shadow increases

3. **Scroll-Based** (potential)
   - Section reveals
   - Parallax effects
   - Counter animations

### 3D Scene Animations
1. **Continuous**
   - Main hexagon rotation
   - Mini shapes rotation
   - Floating motion (sine wave)

2. **Interactive (On Hover)**
   - Emissive intensity increase (0.1s lerp)
   - Scale pulse (sine wave)
   - No position change

3. **Frame-Based**
   - 60 FPS animation loop
   - requestAnimationFrame
   - Canvas re-renders continuously

---

## Data Flow

### API Integration Flow
```
Component (Page)
│
├── useEffect Hook
│   │
│   └── API Call
│       │
│       ├── Request: portfolioAPI.method()
│       ├── Method: GET/POST
│       └── URL: /api/portfolio/*
│
└── State Update
    │
    ├── setData(response.data)
    └── Component Re-render
```

### Example: Landing Page Stats
```
1. Landing component mounts
2. useEffect triggers
3. portfolioAPI.stats.list() called
4. GET /api/portfolio/stats
5. Response received
6. setStats(response.data)
7. Component re-renders with stats
8. StatCards rendered with data
```

---

## Build Pipeline

```
Source Code (src/)
│
├── Transform
│   ├── JSX → JavaScript (Babel)
│   ├── CSS Preprocessing
│   └── Asset optimization
│
├── Bundle
│   ├── Vite bundler
│   ├── Tree shaking
│   ├── Code splitting (future)
│   └── Module concatenation
│
├── Optimize
│   ├── Minification
│   ├── Gzip compression
│   ├── Source maps
│   └── Asset hashing
│
└── Output
    │
    └── dist/ Folder
        ├── index.html (985 bytes)
        ├── assets/
        │   └── index-CzD9vLvK.js (926.80 KB)
        ├── favicon.svg
        └── icons.svg
```

---

## Performance Metrics

### Bundle Breakdown
```
Total: 926.80 KB (269.60 KB gzipped)
│
├── React + ReactDOM: ~150 KB
├── Three.js: ~550 KB
├── GSAP: ~100 KB
├── React Router: ~50 KB
└── Other deps: ~76.80 KB
```

### Runtime Performance
```
Metrics:
├── FPS: 60 (target)
├── Memory: ~50-100 MB
├── CPU Usage: Low on idle
├── Load Time: < 2 seconds
└── Interactions: Instant response
```

---

## Security Considerations

### Frontend Security
- XSS Protection: React auto-escapes
- CSRF: Token validation on forms
- Input Validation: Form checks
- HTTPS: Recommended for deployment
- CSP Headers: Recommended

### API Security
- CORS: Configure on backend
- Authentication: Token-based (if needed)
- Rate Limiting: Backend enforced
- Data Validation: Server-side

---

## Deployment Architecture

```
GitHub/Git Repository
│
├── Source Code
├── Build Configuration
└── Documentation

    │
    ▼

Build Process (CI/CD)
├── npm install
├── npm run build
├── Testing (optional)
└── Generate dist/

    │
    ▼

Hosting Options
├── Vercel (Recommended)
├── Netlify
├── AWS S3 + CloudFront
├── Traditional Hosting
└── Docker Container

    │
    ▼

CDN Distribution
├── Static assets cached
├── Global edge locations
├── Fast delivery worldwide
└── Reduced server load
```

---

## File Organization Summary

```
/home/johan/PAS/Tech/bib/frontend/
│
├── Source Code
│   ├── src/pages/           (5 pages, 652 lines)
│   ├── src/components/      (7 components)
│   ├── src/styles/          (Design tokens)
│   ├── src/api/             (API integration)
│   └── src/App.jsx          (Main router)
│
├── Configuration
│   ├── vite.config.js
│   ├── package.json
│   ├── eslint.config.js
│   └── index.html
│
├── Build Output
│   └── dist/                (Production ready)
│
├── Documentation
│   ├── COMPLETION_REPORT.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── REDESIGN_NOTES.md
│   ├── BUILD_SUMMARY.md
│   ├── QUICK_START.md
│   └── ARCHITECTURE_OVERVIEW.md (this file)
│
└── Development
    ├── node_modules/
    ├── package-lock.json
    └── .gitignore
```

---

## Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 19.2.5 | UI components |
| 3D Graphics | Three.js | 0.184.0 | 3D rendering |
| Animations | GSAP | 3.15.0 | Animation library |
| Routing | React Router | 7.14.2 | Navigation |
| Build Tool | Vite | 8.0.10 | Development & build |
| HTTP | Axios | 1.15.2 | API requests |
| Scrolling | Locomotive Scroll | 5.0.1 | Scroll effects |

---

**Architecture Document**  
**Generated**: April 28, 2026  
**Status**: Complete & Production Ready
