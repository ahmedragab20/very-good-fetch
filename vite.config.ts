import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/lib.ts"),
      name: "arcatch",
      fileName: "arcatch",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
