import { createI18n } from 'vue-i18n'
import messages from '#root/locales/messages'

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'en',
  fallbackLocale: 'en',
  // datetimeFormats,
  // numberFormats,
  messages
})
