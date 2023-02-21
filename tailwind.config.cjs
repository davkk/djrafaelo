/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,fs,fs.js}'],
    theme: {
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
        },
    },
    plugins: [],
}
