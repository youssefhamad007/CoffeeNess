import React, { useEffect, useRef } from 'react';
import { Coffee, Users, Award, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.about-hero',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Story animation
      gsap.fromTo('.story-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 80%',
          }
        }
      );

      // Values animation
      gsap.fromTo('.value-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
          }
        }
      );

      // Value card hover lift effect (uses CSS classes; no JS needed at hover time)

      // Stats counters
      const counters = gsap.utils.toArray<HTMLElement>('.about-counter');
      counters.forEach((el) => {
        const target = Number(el.dataset.target || '0');
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 2.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(state.value).toLocaleString();
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-gradient-cream">
        <div className="container mx-auto px-4">
          <div className="about-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-coffee-dark mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded with a passion for exceptional coffee, CoffeeNess began as a small 
              roastery with a big dream: to bring the world's finest coffee directly to 
              your cup, one bean at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="story-content">
              <h2 className="text-4xl font-bold text-coffee-dark mb-6">
                A Journey of Flavor
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  It all started in 2015 when our founder, Maria Santos, traveled to 
                  Colombia and experienced the perfect cup of coffee on a small farm 
                  high in the Andes. That moment changed everything.
                </p>
                <p>
                  Inspired by the dedication of local farmers and the incredible 
                  complexity of flavors hidden in each bean, Maria returned home with 
                  a mission: to bridge the gap between exceptional coffee growers and 
                  coffee lovers around the world.
                </p>
                <p>
                  Today, CoffeeNess partners with sustainable farms across three 
                  continents, ensuring fair wages for farmers while delivering 
                  uncompromising quality to your morning ritual.
                </p>
              </div>
            </div>
            
            <div className="story-content">
              <div className="aspect-[4/3] rounded-lg shadow-warm overflow-hidden relative">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="/assets/about.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coffee-dark mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything we do is guided by our commitment to quality, 
              sustainability, and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="value-card group border-none shadow-warm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Coffee className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Quality First</h3>
                <p className="text-muted-foreground">
                  Every bean is carefully selected and roasted to perfection, 
                  ensuring exceptional quality in every cup.
                </p>
              </CardContent>
            </Card>

            <Card className="value-card group border-none shadow-warm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to environmentally responsible practices 
                  and supporting sustainable farming methods.
                </p>
              </CardContent>
            </Card>

            <Card className="value-card group border-none shadow-warm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Community</h3>
                <p className="text-muted-foreground">
                  Building lasting relationships with farmers, customers, 
                  and coffee communities worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="value-card group border-none shadow-warm text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-coffee rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Excellence</h3>
                <p className="text-muted-foreground">
                  Pursuing excellence in every aspect of our business, 
                  from sourcing to customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2"><span className="about-counter" data-target="50">0</span>+</div>
              <div className="text-muted-foreground">Partner Farms</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2"><span className="about-counter" data-target="15">0</span></div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2"><span className="about-counter" data-target="100000">0</span>+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2"><span className="about-counter" data-target="8">0</span></div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;