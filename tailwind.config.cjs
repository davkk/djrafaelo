/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,fs,fs.js}"],
    theme: {
        breakpoints: {
            sm: "560px"
        },
        fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "3.75rem",
            "7xl": "4.5rem",
        },
        extend: {
            colors: {
                accent: "#CA9F54",
                dark: "#0E0D0B",
                light: "#FEF4E3",
                sub: "#B0A38D",
                mute: "#1E1C18",
            },
            fontFamily: {
                sans: "Saira, sans-serif",
                serif: "DM Serif Text, serif",
            },
            boxShadow: {
                "glow": "0px 7px 30px -5px rgb(202, 159, 84, 0.6)",
            },
            keyframes: {
                "slide-up": {
                    "0%": {
                        transform: "translateX(0.7em)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translateX(0) scale(1)",
                        opactiy: 1,
                    },
                },
                "bounce-right": {
                    "0%": {
                        transform: "translate3d(0, -50%, 0) scale(1)",
                    },
                    "100%": {
                        transform: "translate3d(20%, -50%, 0) scale(1.01)",
                    },
                }
            },
            animation: {
                "slide-up": "slide-up 200ms ease-out forwards",
                "bounce-right": "bounce-right 500ms ease-in-out infinite alternate"
            }
        },
    },
    plugins: [],
}
