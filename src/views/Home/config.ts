import { ContextApi } from 'contexts/Localization/types'

const config = (t: ContextApi['t']) => {
  return [
    {
        pid: 0,
        days: t('15'),
        pdaily: 80,
        total: 120,
    },
    {
        pid: 1,
        days: t('30'),
        pdaily: 56,
        total: 168,
    },
    {
        pid: 2,
        days: t('60'),
        pdaily: 38,
        total: 228,
    },
    {
        pid: 3,
        days: t('90'),
        pdaily: 33,
        total: 297,
    },
    {
        pid: 4,
        days: t('180'),
        pdaily: 30,
        total: 540,
    },
  ]
}

export default config