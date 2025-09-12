import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { gsap } from 'gsap';

const Cart: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cart-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo('.cart-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo('.cart-summary',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  if (itemCount === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-coffee-dark mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some delicious coffee to get started!</p>
          <Link to="/CoffeeNess/shop">
            <Button size="lg" className="bg-coffee-dark hover:bg-coffee-medium text-warm-white">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="cart-header mb-8">
          <Link to="/CoffeeNess/shop" className="inline-flex items-center text-muted-foreground hover:text-accent mb-4 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          
          <h1 className="text-4xl font-bold text-coffee-dark mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="cart-item overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-coffee-dark">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.roastLevel} Roast
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-semibold text-coffee-dark">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="cart-summary sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-accent">
                      {total >= 50 ? 'Free' : '$5.99'}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-accent">
                        ${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {total < 50 && (
                  <div className="mb-6 p-3 bg-cream rounded-lg">
                    <p className="text-sm text-coffee-dark">
                      Add ${(50 - total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <Button 
                  size="lg" 
                  className="w-full bg-coffee-dark hover:bg-coffee-medium text-warm-white mb-4"
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-white"
                  asChild
                >
                  <Link to="/CoffeeNess/shop">
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;