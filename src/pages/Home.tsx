import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CoffeeCup3D from '@/components/CoffeeCup3D';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Background switched to video; image import removed

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedOnce = useRef<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      
      gsap.fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      
      gsap.fromTo('.hero-cta', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
      );

      // Features scroll animation
      gsap.fromTo('.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

      // Feature counters (count up on first reveal)
      const counters = gsap.utils.toArray<HTMLElement>('.feature-counter');
      counters.forEach((el) => {
        const target = Number(el.dataset.target || '0');
        const counterObj = { value: 0 };
        gsap.to(counterObj, {
          value: target,
          duration: 3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(counterObj.value).toLocaleString();
          },
        });
      });

      // Products scroll animation
      gsap.fromTo('.product-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Autoplay video once on mount, then stop and enable hover-to-play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      hasPlayedOnce.current = true;
      video.pause();
    };
    // Attempt autoplay once
    video.muted = true;
    video.play().catch(() => {});
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleHeroMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    if (hasPlayedOnce.current) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleHeroMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    if (hasPlayedOnce.current) {
      video.pause();
    }
  };

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden group"
        onMouseEnter={handleHeroMouseEnter}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/about.mp4"
          muted
          playsInline
        />
        {/* Dark overlay with subtle hover easing */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />

        <div className="relative z-10 container mx-auto px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="hero-title text-4xl lg:text-7xl font-bold text-white mb-6">
              Premium
              <span className="block text-accent">Coffee</span>
              Experience
            </h1>
            
            <p className="hero-subtitle text-lg lg:text-xl text-gray-200 mb-8 max-w-md mx-auto lg:mx-0">
              Discover the finest coffee blends crafted with passion and expertise. 
              From bean to cup, we deliver excellence.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 md:mt-0 w-full">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-none">
              <CoffeeCup3D />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coffee-dark mb-4">
              Why Choose CoffeeNess?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to delivering the finest coffee experience through quality, 
              sustainability, and craftsmanship.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card text-center border-none shadow-warm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coffee className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Premium Quality</h3>
                <div className="text-3xl font-bold text-coffee-dark mb-4">
                  <span className="feature-counter" data-target="5000">0</span>+
                </div>
                <p className="text-muted-foreground">
                  Hand-selected beans from the world's finest coffee regions, 
                  roasted to perfection for optimal flavor.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card text-center border-none shadow-warm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Expert Roasting</h3>
                <div className="text-3xl font-bold text-coffee-dark mb-4">
                  <span className="feature-counter" data-target="120">0</span>+
                </div>
                <p className="text-muted-foreground">
                  Our master roasters bring out the unique characteristics 
                  of each bean with precise temperature and timing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card text-center border-none shadow-warm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Community</h3>
                <div className="text-3xl font-bold text-coffee-dark mb-4">
                  <span className="feature-counter" data-target="25000">0</span>+
                </div>
                <p className="text-muted-foreground">
                  Supporting local farmers and sustainable practices 
                  while building a community of coffee lovers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coffee-dark mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most popular coffee blends, each crafted with care 
              and roasted to bring out unique flavor profiles.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="product-card" 
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-white">
              <Link to="/shop">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;