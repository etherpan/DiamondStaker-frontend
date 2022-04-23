import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'DDR-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0EA51c243079Bbd367609845209B79007F464009',
    },
    token: tokens.ddr,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'DDR-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xe779F623892C0F371Dec54d842cEDAC6580ce403',
    },
    token: tokens.ddr,
    quoteToken: tokens.busd,
  },
  {
    pid: 2,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
]

export default farms
