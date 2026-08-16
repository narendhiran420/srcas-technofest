import { useRef, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: 'button' | 'a';
  strength?: number;
}

/**
 * Wraps any button/link with:
 *  - a magnetic pull toward the cursor on hover (desktop only, subtle)
 *  - a ripple burst from the click point
 * Use around .btn-glow / .btn-outline elements for the "magnetic buttons"
 * and "ripple click effects" requested in the brief.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  as = 'button',
  strength = 18,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  function spawnRipple(e: MouseEvent<HTMLElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.6;
    ripple.style.position = 'absolute';
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.borderRadius = '9999px';
    ripple.style.background = 'rgba(255,255,255,0.35)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 600ms ease-out, opacity 600ms ease-out';
    target.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 650);
    onClick?.();
  }

  const Tag: any = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      <Tag href={href} onClick={spawnRipple} className={`ripple relative overflow-hidden ${className}`}>
        {children}
      </Tag>
    </motion.div>
  );
}
