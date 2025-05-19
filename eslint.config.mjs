import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist", "node_modules"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            import: importPlugin,
            "react-dom": reactDom,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "react-x": reactX,
            prettier: prettierPlugin,
        },
        rules: {
            ...reactX.configs["recommended-typescript"].rules,
            ...reactDom.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "import/order": [
                "warn",
                {
                    groups: [["builtin", "external"], "internal", ["index", "sibling", "parent"]],
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            "prettier/prettier": [
                "warn",
                {
                    printWidth: 100,
                    tabWidth: 4,
                    semi: true,
                    singleQuote: false,
                    trailingComma: "all",
                    bracketSameLine: true,
                    singleAttributePerLine: true,
                },
            ],
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                },
            ],
        },
    },
);
