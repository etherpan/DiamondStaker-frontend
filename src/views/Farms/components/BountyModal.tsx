import React from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex } from '@pancakeswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useUserinfo } from 'hooks/useMorebnb'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'

interface BountyModalProps {
  onDismiss?: () => void
  bnbPrice?: any
  depositamount: number
  withdrawamount: number
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 16px auto;
  width: 100%;
`

const BountyModal: React.FC<BountyModalProps> = ({ onDismiss, bnbPrice, depositamount, withdrawamount }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const userInfo = useUserinfo()
  const depositUsd = bnbPrice ? bnbPrice.multipliedBy(depositamount) : BIG_ZERO
  const withdrawUsd = bnbPrice ? bnbPrice.multipliedBy(withdrawamount) : BIG_ZERO


  return (
    <Modal title={t('History')} onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>{t('Total Deposit')}</Text>
        <Flex flexDirection="column">
          <Balance bold value={depositamount} decimals={3} unit=" BNB" />
          <Text fontSize="12px" color="textSubtle">
            <Balance
              fontSize="12px"
              color="textSubtle"
              value={depositUsd}
              decimals={2}
              unit=" USD"
              prefix="~"
            />
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>{t('Total Withdraw')}</Text>
        <Flex flexDirection="column">
          <Balance bold value={withdrawamount} decimals={3} unit=" BNB" />
          <Text fontSize="12px" color="textSubtle">
            <Balance
              fontSize="12px"
              color="textSubtle"
              value={withdrawUsd}
              decimals={2}
              unit=" USD"
              prefix="~"
            />
          </Text>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default BountyModal
