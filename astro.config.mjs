// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudProviderFetchAdapter from "@wix/cloud-provider-fetch-adapter";
import wix from "@wix/astro";
import monitoring from "@wix/monitoring-astro";
import react from "@astrojs/react";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";
import postcssPseudoToData from "@wix/postcss-pseudo-to-data";

const isBuild = process.env.NODE_ENV == "production";

// https://astro.build/config
export default defineConfig({
  output: "server",
  // Inline stylesheets under 8KB to eliminate render-blocking CSS requests
  inlineStylesheets: 'always',
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `import loadFramewire from "framewire.js";
              loadFramewire(true);`
            );
          }
        },
      },
    },
    tailwind(),
    wix({
      htmlEmbeds: isBuild,
      auth: true,
    }),
    ...(isBuild ? [monitoring()] : []),
    react({ babel: { plugins: [sourceAttrsPlugin, dynamicDataPlugin] } }),
  ],
  vite: {
    plugins: [customErrorOverlayPlugin()],
    css: !isBuild ? {
      postcss: {
        plugins: [
          postcssPseudoToData(),
        ],
      },
    } : undefined,
    // Tell Vite's SSR build to NEVER bundle wix-secrets-backend.
    // The Wix runtime injects this module at request time. If Vite/Rollup
    // tries to resolve it during build it gets rewritten to a relative
    // path (e.g. "pages/api/square/wix-secrets-backend") which then fails
    // at runtime with "No such module". Belt-and-suspenders together with
    // the existing rollupOptions.external below.
    ssr: {
      external: ['wix-secrets-backend'],
    },
    // Pre-bundle heavy deps so Rollup doesn't re-process them
    optimizeDeps: {
      include: ['lucide-react', 'react', 'react-dom', 'react-router-dom', 'date-fns'],
    },
    // Resolve lucide-react to its ESM bundle for faster builds
    resolve: {
      alias: isBuild ? {
        'lucide-react': 'lucide-react/dist/esm/lucide-react.js',
      } : undefined,
    },
    build: {
      // Reduce unused JS by splitting vendor chunks
      rollupOptions: {
        external: ['wix-secrets-backend'],
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'icons': ['lucide-react'],
          },
        },
      },
      // Inline small CSS files to eliminate render-blocking requests
      cssMinify: 'lightningcss',
      // Reduce chunk size — raised for lucide icon bundle
      chunkSizeWarningLimit: 1000,
    },
  },
  ...(isBuild && { adapter: cloudProviderFetchAdapter({}) }),
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["static.wixstatic.com"],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
  security: {
    checkOrigin: false
  }
});
