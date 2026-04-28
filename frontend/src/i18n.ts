import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import eng from './locales/eng/translation.json'
import est from './locales/est/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    eng: { translation: eng },
    est: { translation: est },
  },
  lng: 'eng',
  fallbackLng: 'eng',
})

export default i18n