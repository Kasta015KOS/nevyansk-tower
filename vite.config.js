import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/nevyansk-tower/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        akinfiyDemidov: resolve(__dirname, "akinfiy-demidov.html"),
      },
    },
  },
});