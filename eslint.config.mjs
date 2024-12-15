import svelte3 from "eslint-plugin-svelte3";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("standard-with-typescript"), {
    plugins: {
        svelte3,
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        eqeqeq: "warn",
        "no-empty": "warn",
        "prefer-const": "warn",
        "comma-dangle": "off",
        "quote-props": "off",

        "@typescript-eslint/comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "never",
            exports: "never",
            functions: "never",
        }],

        "@typescript-eslint/no-throw-literal": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-extra-parens": "error",
        "@typescript-eslint/space-before-function-paren": "off",
    },
}];