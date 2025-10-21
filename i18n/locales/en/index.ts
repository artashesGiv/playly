import en from './en.json'
import market from './market.json'
import common from './common.json'

export default defineI18nLocale(() => ({
  ...en,
  market,
  common,
}))
