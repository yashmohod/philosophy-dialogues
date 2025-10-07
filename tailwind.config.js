/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                bg: '#0b0e13',
                panel: '#151a23',
                text: '#e8eaf6',
                accent: '#00eaff',
                accent2: '#7b61ff',
                muted: '#8b94a3',
                glass: '#ffffff1a',
            },
            boxShadow: {
                glow: '0 0 10px rgba(0,234,255,0.4)',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
