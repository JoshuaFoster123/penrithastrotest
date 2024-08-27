import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import react from "@astrojs/react";
import { passthroughImageService } from 'astro/config';
/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
import cloudflare from "@astrojs/cloudflare";
const astroExpressiveCodeOptions = {
  themes: ["min-dark", "min-light"]
};



// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: "prepend",
      content: {
        type: "text",
        value: "#"
      },
      headingProperties: {
        className: ["anchor"]
      },
      properties: {
        className: ["anchor-link mr-5"]
      }
    }]]
  },
  integrations: [(await import("astro-compress")).default({
    CSS: false,
    SVG: false
  }), tailwind(), sitemap(), expressiveCode(astroExpressiveCodeOptions), icon(), mdx(), react()],
  
  site: "https://astrozinc.exylons.com",
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    },
    ssr: {
      noExternal: ["@resvg/resvg-js"]
    },
    build: {
      rollupOptions: {
        external: ["@resvg/resvg-js"]
      }
    }
  },
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    functionPerRoute: true
  }),
  image: {
    service: passthroughImageService(),
  },
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}