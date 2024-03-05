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
      'light': 'var(--color-light)',
      'bg-text': 'var(--color-back)'
    },
    fontSize: {
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    }
  },

  shortcuts: {
    card: 'bg-white shadow-md rounded-md border-2 border-solid',
    btn: 'text-center px-3 py-5 border tb-color-header cursor-pointer',
    'header-link': 'px-3 sm:px-5 py-3 md:px-8 hover:underline hover:decoration-2 hover:underline-offset-4 cursor-pointer'
  },
  rules: [
    ['font-header', {'font-family': 'var(--font-1)'}],
    ['border', {border: 'var(--border-width) solid var(--border-color)', 'border-radius': 'var(--border-radius-1)'}],
    ['border-light', {border: 'var(--border-width-light) solid var(--border-color-light)', 'border-radius': 'var(--border-radius-1)'}],
    ['rb-color-content', {'background-color': 'var(--back-content)', 'color': 'var(--color-content)'}],
    ['rb-color-header', {'background-color': 'var(--back-header)', 'color': 'var(--color-header)'}],
    ['rb-color-back', {'background-color': 'var(--back-0)', 'color': 'var(--color-back)'}],
    ['outlined', {'box-shadow': 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, #171717 4px 6px 0px 0px, #171717 0px 6px 0px 0px;'}],
    ['outlined:hover', {'box-shadow': 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, #171717 2px 4px 0px 0px, #171717 0px 4px 0px 0px;'}],
  ]
});
