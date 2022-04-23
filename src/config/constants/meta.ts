import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'BNBMultiplier',
  description:
    "Daily 10% Interest",
  image: 'https://multiplymybnb.com/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('BNBMultiplier - Daily 10% Interest')} | ${t('BNBMultiplier')}`,
      }
    case '/dashboard':
      return {
        title: `${t('Dashboard')} | ${t('BNBMultiplier')}`,
      }
    default:
      return null
  }
}
