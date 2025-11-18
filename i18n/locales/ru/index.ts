import ru from './ru.json'
import market from './market.json'
import common from './common.json'
import error404 from './404.json'

export default defineI18nLocale(() => ({
  ...ru,
  market,
  common,
  error404,
}))
