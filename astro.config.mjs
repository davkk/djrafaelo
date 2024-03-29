import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
    site: "https://djrafaelo.pl",
    integrations: [astroImageTools, tailwind(), sitemap(), robotsTxt(), solidJs()],
    vite: {
        server: {
            hmr: {
                timeout: 3000,
            }
        }
    }
});
