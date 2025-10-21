import ru from './ru.json'
import market from './market.json'
import common from './common.json'

export default defineI18nLocale(() => ({
  ...ru,
  market,
  common,
}))
