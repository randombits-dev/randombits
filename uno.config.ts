// uno.config.ts
import {defineConfig} from 'unocss'
import presetMini from '@unocss/preset-mini'

export default defineConfig({
    presets: [
        presetMini(),
    ],
    theme: {
        colors: {
            base: 'var(--back-0)',
            primary: 'var(--color-primary)',
            header: 'var(--back-header)',
            'header-text': 'var(--color-header)',
            'primary-contrast': 'var(--primary-contrast)'
        }
    },
    rules: [
        ['bg-content', {'background-color': 'var(--back-content)'}],
        ['', {'background-color': 'var(--back-content)'}],
    ]
})