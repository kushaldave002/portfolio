'use client';

import React from 'react';

const AmbientBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Deep Blue/Purple Orb - Top Left */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20 animate-pulse"
                style={{ background: 'radial-gradient(circle, #4c1d95 0%, transparent 70%)' }}
            />

            {/* Deep Teal/Cyan Orb - Bottom Right */}
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-15"
                style={{ background: 'radial-gradient(circle, #0f766e 0%, transparent 70%)' }}
            />

            {/* Subtle Central Glow */}
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-10"
                style={{ background: 'radial-gradient(circle, #333333 0%, transparent 60%)' }}
            />
        </div>
    );
};

export default AmbientBackground;
