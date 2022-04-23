import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Dashboard'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('DexGuru'),
        href: 'https://dex.guru/token/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61-bsc',
      },
      {
        label: t('PooCoin'),
        href: 'https://poocoin.app/tokens/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
      },
      {
        label: t('Dextools'),
        href: 'https://www.dextools.io/app/bsc/pair-explorer/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
      },
      {
        label: t('BSCscan'),
        href: 'https://bscscan.com/token/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
      },
    ],
  },

]

export default config
