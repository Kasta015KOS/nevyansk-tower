import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
    base: command === "build" ? "/nevyansk-tower/" : "/",

    server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true
    },

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                akinfiyDemidov: resolve(
                    __dirname,
                    "akinfiy-demidov.html"
                )
            }
        }
    }
}));