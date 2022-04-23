import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getDiceContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from './useRefresh'

export type UseDiceInfoState = {
  info: any
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useRollInfo = ( i:number ) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [infoState, setInfoState] = useState<UseDiceInfoState>({
    info: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchRollInfo = async () => {
      const contract = getDiceContract()
      try {
        const res = await contract.Rolls(i)
        const rollIndex = await contract.currentRollIndex()
        setInfoState({ info: res, fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setInfoState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    fetchRollInfo()
  }, [fastRefresh, SUCCESS, FAILED, i])

  return infoState
}

export const useRollIndex = () => {
    const [rollIndex, setIndex] = useState(0)
    useEffect(() => {
        const fetchRollInfo = async () => {
          const contract = getDiceContract()
          try {
            const index = await contract.currentRollIndex()
            setIndex(index)
          } catch (e) {
            console.error(e)
          }
        }
    
        fetchRollInfo()
      }, [rollIndex])
      return rollIndex;
}


export default useRollInfo
