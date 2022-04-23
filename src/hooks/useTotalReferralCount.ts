import { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getReferralAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import referral from 'config/abi/referral.json'
import useRefresh from './useRefresh'

const useTotalReferralCount = () => {
    const [count, setCount] = useState()
    const { account } = useActiveWeb3React()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        async function fetchTotalRef() {
            const refContract = getContract(referral, getReferralAddress())
            const total = await refContract.methods.referralsCount(account).call()
            setCount(total)
        }
        fetchTotalRef()
    }, [account, slowRefresh])

    return count
}

export default useTotalReferralCount