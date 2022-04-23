import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getMoreBnbContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from './useRefresh'

type UseMoreBnbInfoState = {
  info: any
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useMoreBnbInfo = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [infoState, setInfoState] = useState<UseMoreBnbInfoState>({
    info: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchMoreBnbInfo = async () => {
      const contract = getMoreBnbContract()
      try {
        const res = await contract.contractInfo()
        setInfoState({ info: res, fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setInfoState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    fetchMoreBnbInfo()
  }, [fastRefresh, SUCCESS, FAILED])

  return infoState
}

export const useAvailable = () => {
  const [availableState, setAvailableState] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchUserInfo = async () => {
      const contract = getMoreBnbContract()
      try {
        const res = await contract.getUserAvailable(account)
        setAvailableState(res)
      } catch (e) {
        console.error(e)
        setAvailableState(BIG_ZERO)
      }
    }

    if (account) {
      fetchUserInfo()
    }
  }, [account, fastRefresh])

  return availableState
}

export const useUserinfo = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [userInfoState, setUserInfoState] = useState<UseMoreBnbInfoState>({
    info: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchUserInfo = async () => {
      const contract = getMoreBnbContract()
      try {
        const res = await contract.userInfo(account)
        setUserInfoState({ info: res, fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setUserInfoState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchUserInfo()
    }
  }, [account, fastRefresh, SUCCESS, FAILED])

  return userInfoState
}

export const useTotalReferralBonus = () => {
  const [treferralState, setTreferralState] = useState(BIG_ZERO)

  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchReferralInfo = async () => {
      const contract = getMoreBnbContract()
      try {
        const res = await contract.getUserReferralTotalBonus(account)
        console.log('debug->res', res)
        setTreferralState(res)
      } catch (e) {
        console.error(e)
        setTreferralState(BIG_ZERO)
      }
    }

    if (account) {
      fetchReferralInfo()
    }
  }, [account, fastRefresh])

  return treferralState
}

export const useCanHarvest = () => {
  const [canharvestState, setCanHarvestState] = useState(false)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchCanHarvestInfo = async () => {
      const contract = getMoreBnbContract()
      try {
        const res = await contract.canHarvest(account)
        console.log('debug->canh', res)
        setCanHarvestState(res)
      } catch (e) {
        console.error(e)
        setCanHarvestState(false)
      }
    }
    if (account) {
      fetchCanHarvestInfo()
    }
  }, [account, fastRefresh])

  return canharvestState
}

export const useCanReinvest = () => {
  const [canreinvestState, setCanReinvestState] = useState(false)
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchCanReinvestInfo = async () => {
      const contract = getMoreBnbContract()
      try {
        const res = await contract.canReinvest(account)
        console.log('debug->canr', res)
        setCanReinvestState(res)
      } catch (e) {
        console.error(e)
        setCanReinvestState(false)
      }
    }
    if (account) {
      fetchCanReinvestInfo()
    }
  }, [account, fastRefresh])

  return canreinvestState
}

export default useMoreBnbInfo
