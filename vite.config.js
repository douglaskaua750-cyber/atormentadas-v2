import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
var rootDir = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
    base: "./",
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                popover: resolve(rootDir, "index.html"),
                background: resolve(rootDir, "background.html"),
                token: resolve(rootDir, "context-token.html")
            }
        }
    }
});
