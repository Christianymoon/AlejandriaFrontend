import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import { reactRefresh } from "eslint-plugin-react-refresh";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: {
      js,
    },
    plugins: {
      "react-refresh": reactRefresh.plugin,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
]);
