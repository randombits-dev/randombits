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
            'primary-contrast': 'var(--primary-contrast)',
            'content-text': 'var(--color-content)',
            'bg-text': 'var(--color-back)'
        }
    }
})