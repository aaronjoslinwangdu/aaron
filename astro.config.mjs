// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  markdown: {
      shikiConfig: {
          theme: "github-light",
          langAlias: {
              py: "python",
          },
      },
	},

  adapter: cloudflare(),
});