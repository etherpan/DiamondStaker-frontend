import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchef.json'
import erc20 from 'config/abi/erc20.json'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { Farm, SerializedBigNumber } from '../types'

type PublicFarmData = {
  tokenAmountMc: SerializedBigNumber
  quoteTokenAmountMc: SerializedBigNumber
  tokenAmountTotal: SerializedBigNumber
  quoteTokenAmountTotal: SerializedBigNumber
  lpTotalInQuoteToken: SerializedBigNumber
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  poolWeight: SerializedBigNumber
  multiplier: string
  depositfee: string
  ddrperblock: SerializedBigNumber
  canharvest: boolean
}

const fetchFarm = async (farm: Farm): Promise<PublicFarmData> => {
  const { pid, lpAddresses, token, quoteToken, isTokenOnly } = farm
  const lpAddress = getAddress(lpAddresses)
  const calls = [
    // Balance of token in the LP contract
    {
      address: getAddress(token.address),
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: getAddress(quoteToken.address),
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [getMasterChefAddress()],
    },
    // Balance of Single token in the master chef contract
    {
      address: getAddress(token.address),
      name: 'balanceOf',
      params: [getMasterChefAddress()],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: getAddress(token.address),
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: getAddress(quoteToken.address),
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, singleTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
    await multicall(erc20, calls)

  
    // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

    // Raw amount of token in the LP, including those not staked
    const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

    // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
    const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio)
    const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

    // Total staked in LP, in quote token value
    const lpTotalInQuoteToken = isTokenOnly ?  new BigNumber(singleTokenBalanceMC).div(BIG_TEN.pow(tokenDecimals)): quoteTokenAmountMc.times(new BigNumber(2))

  // Only make masterchef calls if farm has pid
  const [info, totalAllocPoint, ddrPerBlock, startBlockHarvest] =
    pid || pid === 0
      ? await multicall(masterchefABI, [
          {
            address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [pid],
          },
          {
            address: getMasterChefAddress(),
            name: 'totalAllocPoint',
          },
          {
            address: getMasterChefAddress(),
            name: 'DDRPerBlock',
          },
          // Start Block Number when harvest start
          // {
          //   address: getMasterChefAddress(),
          //   name: 'startBlockHarvest',
          // },
        ])
      : [null, null]

  const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
  const depositfee1 = info ? new BigNumber(info.depositFeeBP) : BIG_ZERO
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
  const DDRPerBlock = ddrPerBlock? new BigNumber(ddrPerBlock).div(BIG_TEN.pow(18)) : BIG_ZERO
  const canharvest = true

  return {
    tokenAmountMc: tokenAmountMc.toJSON(),
    quoteTokenAmountMc: quoteTokenAmountMc.toJSON(),
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    multiplier: `${allocPoint.div(100).toString()}X`,
    depositfee: `${depositfee1.div(100).toString()}%`,
    ddrperblock: DDRPerBlock.toJSON(),
    canharvest
  }
}

export default fetchFarm

// export const getCountdownparams = async () => {
//   const masterChefAddress = getMasterChefAddress()
//   const calls = [
//     // Current Harvest Fee
//     {
//       address: masterChefAddress,
//       name: 'harvestFee',
//     },
//     // Harvest Fee Reduction Rate
//     {
//       address: masterChefAddress,
//       name: 'harvestFeeReductionRate',
//     },
//     // Harvest Period
//     {
//       address: masterChefAddress,
//       name: 'harvestTime',
//     },
//     // Initial Harvest Fee
//     {
//       address: masterChefAddress,
//       name: 'initialHarvestFee',
//     },
//     // Locked Period
//     {
//       address: masterChefAddress,
//       name: 'lockedTime',
//     },
//     // Start Block Number when harvest start
//     {
//       address: masterChefAddress,
//       name: 'startBlockHarvest',
//     },
//   ]

//   const [harvestFee, harvestFeeReductionRate, harvestTime, initialHarvestFee, lockedTime, startBlockHarvest] =
//   await multicall(masterchefABI, calls)
//   const blockNumber = await simpleRpcProvider.getBlockNumber()
//   const isharvestnow = harvestTime && blockNumber ? startBlockHarvest < blockNumber : false
//   const remainingtime = isharvestnow ? (new BigNumber(startBlockHarvest)).plus(new BigNumber(harvestTime)).minus(new BigNumber(blockNumber)).times(3) : (new BigNumber(startBlockHarvest)).minus(new BigNumber(blockNumber)).times(3)
//   return {
//     harvestFee: new BigNumber(harvestFee).div(100).toJSON(),
//     harvestFeeReductionRate: new BigNumber (harvestFeeReductionRate).toJSON(),
//     harvestTime: new BigNumber (harvestTime).toJSON(),
//     lockedTime: new BigNumber (lockedTime).toJSON(),
//     initialHarvestFee: new BigNumber (initialHarvestFee).toJSON(),
//     startBlockHarvest: new BigNumber (startBlockHarvest).toJSON(),
//     currentblocknumber: blockNumber ? new BigNumber (blockNumber).toJSON() : '0',
//     isharvestnow,
//     remainingtime: Number(remainingtime.toJSON()) +  Date.now() / 1000
//   }
// }