import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getCakeContract, getExchangeContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from './useRefresh'

type UseDividendsInfoState = {
  info: any
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useDividendsInfo = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [infoState, setInfoState] = useState<UseDividendsInfoState>({
    info: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  // const account = '0x12c1e4aaec08f0997bf3a98fa37ec83bef8adb18'
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchDividendsInfo = async () => {
      const contract = getCakeContract()
      try {
        const res = await contract.getAccountDividendsInfo(account)
        setInfoState({ info: res, fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setInfoState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchDividendsInfo()
    }
  }, [account, fastRefresh, SUCCESS, FAILED])

  return infoState
}

export const useTotalDividends = () => {
  const { slowRefresh } = useRefresh()
  const [totalDividends, setTotalDividends] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalDividends() {
      const cakeContract = getCakeContract()
      const tdividends = await cakeContract.getTotalDividendsDistributed()
      setTotalDividends(new BigNumber(tdividends.toString()))
    }

    fetchTotalDividends()
  }, [slowRefresh])

  return totalDividends
}

export const useRewardTax = () => {
  const { slowRefresh } = useRefresh()
  const [rewardTax, setRewardTax] = useState<BigNumber>()

  useEffect(() => {
    async function fetchRewardTax() {
      const cakeContract = getCakeContract()
      const btcbrewardFee = await cakeContract.BTCBRewardsFee()
      setRewardTax(new BigNumber(btcbrewardFee.toString()))
    }

    fetchRewardTax()
  }, [slowRefresh])

  return rewardTax
}

export const useClaimable = () => {
  const [claimableState, setClaimableState] = useState(false)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchClaimableInfo = async () => {
      const contract = getExchangeContract()
      try {
        const res = await contract.isAllowed(account)
        setClaimableState(res)
      } catch (e) {
        console.error(e)
        setClaimableState(false)
      }
    }

    if (account) {
      fetchClaimableInfo()
    }
  }, [account, fastRefresh])

  return claimableState
}

export const useCanSwap = () => {
  const [canSwapState, setCanSwapState] = useState(false)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchCanSwapInfo = async () => {
      const contract = getExchangeContract()
      try {
        const res = await contract.canSwap(account)
        setCanSwapState(res)
      } catch (e) {
        console.error(e)
        setCanSwapState(false)
      }
    }

    if (account) {
      fetchCanSwapInfo()
    }
  }, [account, fastRefresh])

  return canSwapState
}

export default useDividendsInfo
