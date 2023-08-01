// Styles
// import 'vuetify/lib/styles/main.sass'
import 'vuetify/styles'
// Vuetify
import { createVuetify } from 'vuetify/lib/framework'
import * as directives from 'vuetify/lib/directives/index.mjs'
// https://pictogrammers.github.io/@mdi/font/7.0.96/
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import i18n from './i18n'

export default createVuetify({
  directives,

  icons: {
    defaults: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },

  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },

  theme: {
    themes: {
      dark: {
        dark: true
      },

      light: {
        dark: false
      }
    }
  }
})
