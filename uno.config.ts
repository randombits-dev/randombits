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
    card: 'rb-color-content relative border',
    btn: 'text-center px-3 py-5 border tb-color-header cursor-pointer',
    'header-link': 'px-3 sm:px-5 py-3 md:px-8 hover:underline hover:decoration-4 hover:underline-offset-4 cursor-pointer'
  },
  rules: [
    ['border', {border: 'var(--border-width) solid var(--border-color)', 'border-radius': 'var(--border-radius-1)'}],
    ['border-light', {border: 'var(--border-width-light) solid var(--border-color-light)', 'border-radius': 'var(--border-radius-1)'}],
    ['rb-color-content', {'background-color': 'var(--back-content)', 'color': 'var(--color-content)'}],
    ['rb-color-header', {'background-color': 'var(--back-header)', 'color': 'var(--color-header)'}],
    ['rb-color-back', {'background-color': 'var(--back-0)', 'color': 'var(--color-back)'}]
  ]
});
