import BigNumber from 'bignumber.js'
import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { Modal, Flex, useModal, FlexProps, Text, IconButton, CalculateIcon, Box } from '@pancakeswap/uikit'
import { ModalInput } from 'components/Modal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
// import useToast from 'hooks/useToast'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'

interface StakeInnerProps extends FlexProps {
  days?: string
  pdaily?: number
  pid?: number
  total?: number
}

const StakeInner: React.FC<StakeInnerProps> = ({ days, pdaily, pid, total }) => {
  const [expected, setExpected] = useState(0)
  const [val, setVal] = useState('')

  const { t } = useTranslation()
  const { balance : bnbbalance } = useGetBnbBalance()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance)
  }, [bnbbalance])
  const maxBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance.minus(3000000000000000))
  }, [bnbbalance])


  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {

    setVal(maxBalance)
  }, [maxBalance, setVal])


  return (
    <>
      <ModalInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol='BNB'
          addLiquidityUrl='/'
          inputTitle={t('Invest')}
          pid={pid}
      />
    </>
  )
}

export default StakeInner