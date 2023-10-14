import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/"),
      name: "very-good-fetch",
      fileName: "very-good-fetch",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
