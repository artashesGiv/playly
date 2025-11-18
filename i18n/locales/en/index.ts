import en from './en.json'
import market from './market.json'
import common from './common.json'
import error404 from './404.json'

export default defineI18nLocale(() => ({
  ...en,
  market,
  common,
  error404,
}))
