import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://www.kuem.eu",
  output: "server",
  adapter: node({ mode: "standalone" })
});
