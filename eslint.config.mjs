import { defineConfig } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const compat = new FlatCompat({
    recommendedConfig: js.configs.recommended,
})

export default defineConfig([
    {
        extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
])