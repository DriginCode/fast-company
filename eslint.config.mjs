import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: {
			globals: globals.browser,
			ecmaVersion: "latest",
			sourceType: "module",
			ecmaFeatures: {
				jsx: true,
			},
		},
		rules: {
			indent: ["error", 4], // Отступ количество пробелов
			semi: [2, "always"], // Точка с запятой в конце строки
			"space-before-function-paren": [
				"error",
				{
					anonymous: "always",
					named: "never",
					asyncArrow: "never",
				},
			],
			quotes: ["error", "double", { allowTemplateLiterals: true }],
		},
	},
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
];
