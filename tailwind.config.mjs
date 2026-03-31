/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        screens: {
            'xs': '375px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            // Landscape mobile detection
            'landscape': { 'raw': '(orientation: landscape) and (max-height: 500px)' },
            // Touch device detection
            'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
            // Fine pointer (mouse) detection
            'pointer-fine': { 'raw': '(hover: hover) and (pointer: fine)' },
        },
        extend: {
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
                // Thumb-friendly spacing
                'thumb': '48px',
                'thumb-lg': '56px',
            },
            minHeight: {
                'touch': '44px',
                'touch-lg': '48px',
                'touch-xl': '52px',
            },
            minWidth: {
                'touch': '44px',
                'touch-lg': '48px',
                'touch-xl': '52px',
            },
            // Border radius for mobile-friendly rounded corners
            borderRadius: {
                'mobile': '12px',
                'mobile-lg': '16px',
            },
            // Animation timing for mobile interactions
            transitionDuration: {
                'tap': '100ms',
                'press': '150ms',
            },
            // Box shadows optimized for mobile
            boxShadow: {
                'mobile': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
                'mobile-lg': '0 4px 16px -4px rgba(0, 0, 0, 0.15)',
                'sticky': '0 -4px 20px rgba(0, 0, 0, 0.1)',
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.03em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '0.03em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.6', letterSpacing: '0.035em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.6', letterSpacing: '0.035em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.045em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1.1', letterSpacing: '0.045em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "'Playfair Display', serif",
                paragraph: "'DM Sans', sans-serif"
            },
            colors: {
                pastellavender: '#D6D0DD',
                pastelbeige: '#E6D6C4',
                pastelgreen: '#DCE6CD',
                pastelpeach: '#F7BFA6',
                foreground: '#4A2C23',
                destructive: '#DF3131',
                destructiveforeground: '#FFFFFF',
                background: '#F9F5F0',
                secondary: '#4A2C23',
                'secondary-foreground': '#F9F5F0',
                'primary-foreground': '#FFFFFF',
                primary: '#B94A1F',
                accent: '#D4612A',
                dark: '#1A1512',
                'dark-foreground': '#F9F5F0'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
