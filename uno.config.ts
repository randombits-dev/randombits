// uno.config.ts
import {defineConfig} from 'unocss';
import presetMini from '@unocss/preset-mini';

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
      'content': 'var(--back-content)',
      'content-text': 'var(--color-content)',
      'bg-text': 'var(--color-back)'
    }
  },
  shortcuts: {
    card: 'rb-color-content relative border'
  },
  rules: [
    ['border', {border: 'var(--border-width) solid var(--border-color)', 'border-radius': 'var(--border-radius-1)'}],
    ['rb-color-content', {'background-color': 'var(--back-content)', 'color': 'var(--color-content)'}],
    ['rb-color-header', {'background-color': 'var(--back-header)', 'color': 'var(--color-header)'}],
  ]
});
