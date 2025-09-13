import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface StairsAnimationProps {
  isAnimating: boolean;
  onComplete?: () => void;
  columnCount?: number;
}

const StairsAnimation: React.FC<StairsAnimationProps> = ({
  isAnimating,
  onComplete,
  columnCount = 6
}) => {
  const stairsRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'black' | 'white' | 'none'>('none');

  useEffect(() => {
    if (!isAnimating || !stairsRef.current) return;

    const stairs = stairsRef.current;
    const blackScreen = stairs.querySelector('.black-screen');
    const blackColumns = stairs.querySelectorAll('.stairs-column-black');
    const whiteColumns = stairs.querySelectorAll('.stairs-column-white');
    
    // Create timeline for the two-phase stairs animation
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        setPhase('none');
      }
    });

    // Set initial state - black screen is hidden, columns start from bottom
    gsap.set(blackScreen, {
      opacity: 0
    });
    
    gsap.set(blackColumns, {
      y: '-100%',
      opacity: 1
    });
    
    gsap.set(whiteColumns, {
      y: '100%',
      opacity: 1
    });

    // Phase 1: Black columns animate up to form complete black screen
    setPhase('black');
    tl.to(blackColumns, {
      y: '0%',
      stagger: {
        amount: 0.4,
        from: 'start'
      },
      duration: 1,
      ease: 'power2.inOut'
    })
    // Show black screen behind columns
    .to(blackScreen, {
      opacity: 1,
      duration: 0.4
    }, '-=0.7')
    // Phase 2: White columns animate up to remove/reveal the black screen
    .call(() => setPhase('white'))
    .to(whiteColumns, {
      y: '0%',
      stagger: {
        amount: 0.4,
        from: 'start'
      },
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.5')
    // Remove black screen and columns
    .to(blackScreen, {
      opacity: 0,
      duration: 0.4
    }, '-=0.7')
    .to([...blackColumns, ...whiteColumns], {
      y: '-100%',
      duration: 0.8,
      ease: 'power2.inOut'
    });

    return () => {
      tl.kill();
    };
  }, [isAnimating, onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      ref={stairsRef}
      className="stairs-animation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      {/* Black screen layer - covers everything */}
      <div
        className="black-screen"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#000000',
          zIndex: 1
        }}
      />
      
      {/* Black columns that slice the black screen */}
      {Array.from({ length: columnCount }, (_, index) => (
        <div
          key={`black-${index}`}
          className="stairs-column-black"
          style={{
            position: 'absolute',
            top: 0,
            left: `${(index / columnCount) * 100}%`,
            width: `${100 / columnCount}%`,
            height: '100%',
            background: '#000000',
            transform: 'translateY(100%)',
            opacity: 1,
            zIndex: 2
          }}
        />
      ))}
      
      {/* White columns that reveal the page by cutting through black */}
      {Array.from({ length: columnCount }, (_, index) => (
        <div
          key={`white-${index}`}
          className="stairs-column-white"
          style={{
            position: 'absolute',
            top: 0,
            left: `${(index / columnCount) * 100}%`,
            width: `${100 / columnCount}%`,
            height: '100%',
            background: '#3e291e',
            transform: 'translateY(100%)',
            opacity: 1,
            zIndex: 3
          }}
        />
      ))}
    </div>
  );
};

export default StairsAnimation;
