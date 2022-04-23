import { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getMasterChefAddress, getReferralAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import referral from 'config/abi/referral.json'
import masterchef from 'config/abi/masterchef.json'
import useRefresh from './useRefresh'

const useTotalRefCommission = () => {
    const [commission, setCommission] = useState()
    const { account } = useActiveWeb3React()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        async function fetchTotalRef() {
            const refContract = getContract(referral, getReferralAddress())
            const totalCommissions = await refContract.methods.referalCommisionRate().call()
            setCommission(totalCommissions)
        }
        fetchTotalRef()
    }, [account, slowRefresh])

    return commission
}

export default useTotalRefCommission


export const useGetReferrate = () => {

    const [commission, setCommission] = useState(0)
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        async function fetchTotalRef() {
            const refContract = getContract(masterchef, getMasterChefAddress())
            const commissionrate = await refContract.methods.referralCommissionRate().call().then((res) => {
                setCommission(res/100)
            })
        }
        fetchTotalRef()
    }, [slowRefresh])

    return commission
}