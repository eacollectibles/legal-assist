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
    // ============================================
    // PAGE SPEED OPTIMIZATIONS
    // ============================================
    build: {
      // Use default esbuild minification (faster, no extra deps)
      minify: true,
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: (id) => {
            // Vendor chunks - rarely change, cache well
            if (id.includes('node_modules')) {
              // React ecosystem
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              // Radix UI components
              if (id.includes('@radix-ui')) {
                return 'vendor-radix';
              }
              // Lucide icons
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              // Other vendors
              return 'vendor';
            }
            // UI components - shared across pages
            if (id.includes('/components/ui/')) {
              return 'ui-components';
            }
          },
          // Consistent chunk names for better caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      // Target modern browsers for smaller bundles
      target: 'es2020',
      // CSS code splitting
      cssCodeSplit: true,
      // No source maps in production
      sourcemap: false,
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },
    // Optimize deps
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'lucide-react',
      ],
      exclude: ['@wix/astro'],
    },
    // Enable esbuild optimizations
    esbuild: {
      legalComments: 'none',
      treeShaking: true,
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
  },
  // Compression
  compressHTML: true,
});
