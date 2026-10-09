import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/flashcard-study-tool/",
    build: { sourcemap: false },
    plugins: [react()],
});
