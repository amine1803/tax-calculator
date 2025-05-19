import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@icons": resolve(__dirname, "src/assets/icons"),
            "@styles": resolve(__dirname, "src/styles"),
        },
    },
});
