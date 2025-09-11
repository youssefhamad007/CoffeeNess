# CoffeeNess - Premium Coffee E-commerce

A beautiful, modern e-commerce website for premium coffee built with React, Vite, Tailwind CSS, and TypeScript.

## Features

- **Interactive 3D Coffee Cup**: React Three Fiber powered 3D model with user interaction
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **GSAP Animations**: Smooth scroll animations and page transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Premium UI**: Coffee-inspired design system with warm colors and typography

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **3D Graphics**: React Three Fiber + Drei
- **Animations**: GSAP with ScrollTrigger
- **UI Components**: shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router DOM

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx  # Main navigation component
│   ├── ProductCard.tsx # Product display component
│   └── CoffeeCup3D.tsx # 3D coffee cup component
├── contexts/           # React context providers
│   └── CartContext.tsx # Shopping cart state management
├── data/              # Static data and product information
│   └── products.ts    # Product catalog
├── pages/             # Page components
│   ├── Home.tsx       # Landing page with hero section
│   ├── Shop.tsx       # Product listing page
│   ├── ProductDetail.tsx # Individual product page
│   ├── Cart.tsx       # Shopping cart page
│   ├── About.tsx      # About page
│   └── Contact.tsx    # Contact page
└── lib/              # Utility functions
```

## Asset Management

### Product Images
Product images are located in `/public/assets/products/`. Current products include:

- `coffee-classic.jpg` - Classic Blend
- `coffee-dark.jpg` - Dark Roast
- `coffee-light.jpg` - Light Roast  
- `coffee-espresso.jpg` - Espresso Blend

**Replacing Product Images**:
1. Add new images to `/public/assets/products/`
2. Update the `products.ts` file with new image paths
3. Ensure images are high-quality (recommended: 1024x768px)

### Hero Background
The hero section uses `/public/assets/hero-bg.jpg`. To replace:
1. Add new hero image to `/public/assets/`
2. Update the import in `src/pages/Home.tsx`

### 3D Models
The 3D coffee cup uses a fallback geometry. To add a custom GLB model:
1. Place your GLB file in `/public/assets/models/coffee_cup.glb`
2. Update `CoffeeCup3D.tsx` to load the custom model using `useGLTF`

Example:
```typescript
const { scene } = useGLTF('/assets/models/coffee_cup.glb');
```

## Design System

The project uses a coffee-inspired design system with semantic color tokens:

### Colors
- **Coffee Dark**: Rich brown for primary elements
- **Coffee Medium**: Medium brown for hover states  
- **Coffee Light**: Light brown for accents
- **Cream**: Warm off-white for backgrounds
- **Gold**: Premium gold for highlights

### Gradients
- `gradient-coffee`: Dark to medium brown
- `gradient-cream`: Cream to warm white
- `gradient-gold`: Gold variations

All colors are defined in `src/index.css` and `tailwind.config.ts`.

## Animations

The site uses GSAP for all animations:

- **Page Load**: Staggered fade-in animations
- **Scroll Triggers**: Elements animate as they enter viewport
- **Cart Actions**: Smooth feedback when adding items
- **3D Interactions**: Hover and rotation effects on coffee cup

## Cart Functionality

The shopping cart includes:
- Add/remove items
- Update quantities
- Persistent storage (localStorage)
- Free shipping calculation
- Responsive cart page

## SEO Optimizations

- Semantic HTML structure
- Meta tags and Open Graph data
- Descriptive alt text for images
- Clean, crawlable URLs
- Performance optimized

## Browser Support

- Modern browsers with ES6+ support
- WebGL support required for 3D features
- Responsive design for mobile/tablet

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Maintain the design system consistency
4. Test responsive design across devices

## License

This project is licensed under the MIT License.