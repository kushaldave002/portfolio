'use client';

import React, { useRef, useState } from 'react';
import LiquidGlass from './LiquidGlass';

interface LiquidGlassCardProps {
    children: React.ReactNode;
    className?: string;
    /** Blur intensity in pixels (default: 12) */
    blur?: number;
    /** Background opacity 0-1 (default: 0.08) */
    backgroundOpacity?: number;
    /** Border opacity 0-1 (default: 0.15) */
    borderOpacity?: number;
    /** Border radius in pixels (default: 12) */
    borderRadius?: number;
    /** Enable glow effect on hover (default: true) */
    glowOnHover?: boolean;
    /** Custom inline styles */
    style?: React.CSSProperties;
    /** HTML element type to render (default: 'div') */
    as?: React.ElementType;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
    children,
    className = '',
    blur = 1, // Increased from 0.5
    backgroundOpacity = 0.08,
    borderOpacity = 0.15,
    borderRadius = 12,
    glowOnHover = true,
    style,
    as: Component = 'div',
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // We can't easily attach the ref to LiquidGlass internal div without forwarding ref.
    // For the glow effect, we'll wrap content or use a wrapper if needed, 
    // but LiquidGlass puts children inside the glass container.
    // Let's implement the glow effect as a child of LiquidGlass which overlays everything else,
    // or wrap LiquidGlass.
    // Since LiquidGlass applies the filter to ITSELF (backdrop-filter), it needs to be the container.

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!glowOnHover) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    const glowOverlayStyles: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        borderRadius: `${borderRadius}px`,
        background: isHovered && glowOnHover
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, color-mix(in srgb, var(--foreground) 15%, transparent) 0%, transparent 50%)`
            : 'transparent',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: 20, // Check LiquidGlass zIndex
    };

    const shimmerStyles: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        borderRadius: `${borderRadius}px`,
        background: `linear-gradient(
            135deg,
            transparent 0%,
            color-mix(in srgb, var(--foreground) 3%, transparent) 50%,
            transparent 100%
        )`,
        pointerEvents: 'none',
        zIndex: 20,
    };

    return (
        <LiquidGlass
            borderRadius={borderRadius}
            blur={blur}
            displacementScale={4} // Significantly increased from 1.5 to 4 for visibility
            elasticity={0.2} // Decreased elasticity for 'softer/floppier' liquid feel
            className={`liquid-glass-card ${className}`}
        // We can pass onMouseMove etc to className or wrap it? 
        // LiquidGlass passes props to the div? No, strict props.
        // We need to modify LiquidGlass to accept extra props or wrap it. 
        // LiquidGlass source doesn't accept ...rest.
        // Let's wrap it in a div for the event listeners if we can't modify it easily, 
        // BUT backdrop-filter needs to see what's behind it.
        // Let's rely on the fact that we can modify LiquidGlass.tsx since we own it now.
        // Or better, just put the event listeners on the children wrapper.
        >
            {/* 
                Since we can't easily attach mouse listeners to the LiquidGlass container directly 
                (unless we update LiquidGlass.tsx), we'll put an overlay for interaction 
                OR we update LiquidGlass.tsx to accept ...rest.
                
                Actually, let's just update LiquidGlass.tsx in a subsequent step if needed. 
                For now, let's wrap the children in a full-size div that captures mouse events?
                No, the card itself is the target.
                
                Let's Assume we can add a wrapper around the children inside LiquidGlass.
             */}
            <div
                style={{ width: '100%', height: '100%', position: 'relative' }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Enhanced Shimmer layer for dark mode */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: `${borderRadius}px`,
                    background: `linear-gradient(
                        125deg,
                        transparent 20%,
                        rgba(255, 255, 255, 0.1) 40%, 
                        rgba(255, 255, 255, 0.15) 50%,
                        rgba(255, 255, 255, 0.1) 60%,
                        transparent 80%
                    )`,
                    pointerEvents: 'none',
                    zIndex: 20,
                    opacity: 0.7, // More visible shimmer
                }} />

                {/* Dynamic glow overlay */}
                <div style={glowOverlayStyles} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {children}
                </div>
            </div>
        </LiquidGlass>
    );
};

export default LiquidGlassCard;
