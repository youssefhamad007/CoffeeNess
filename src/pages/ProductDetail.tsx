import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { gsap } from 'gsap';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-image',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo('.product-info',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-coffee-dark mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="product-image">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-warm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {product.roastLevel}
              </Badge>
              <h1 className="text-4xl font-bold text-coffee-dark mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.8) • 124 reviews</span>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-3xl font-bold text-accent">
                ${product.price}
              </span>
              <span className="text-muted-foreground ml-2">per 12oz bag</span>
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-coffee-dark mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Roast Level:</span>
                    <span className="ml-2 font-medium">{product.roastLevel}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-2 font-medium">12oz (340g)</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Origin:</span>
                    <span className="ml-2 font-medium">Single Origin</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Processing:</span>
                    <span className="ml-2 font-medium">Washed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-coffee-dark hover:bg-coffee-medium text-warm-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-white">
                Add to Wishlist
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 p-4 bg-cream rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Free shipping</strong> on orders over $50. 
                Usually ships within 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;