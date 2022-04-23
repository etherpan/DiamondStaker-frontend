import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {  AutoRenewIcon, Card, CardBody, Text, Flex, Button, Heading, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePollCoreFarmData, usePriceBnbBusd } from 'state/farms/hooks'
import { harvestReward, reinvestReward } from 'utils/calls/moreb'
import { useAvailable, useUserinfo, useCanReinvest, useCanHarvest } from 'hooks/useMorebnb'
import { useMorebnb } from 'hooks/useContract'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import BountyModal from './BountyModal'


const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const StyledFlex = styled(Flex)`
  @media (max-width: 412px) {
    flex-wrap: wrap;
  }
`

const SmallpaddingButton = styled(Button)`
  padding: 0 10px;
  color: #181a20;
`

const BountyCard = () => {
  usePollCoreFarmData()
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingTx1, setPendingTx1] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const availAmount = useAvailable().toString()
  const getBnbBalance = useGetBnbBalance()
  const bnbBalance = getBnbBalance.fetchStatus === 'success' ? getBalanceNumber(getBnbBalance.balance) : 0
  const userInfo = useUserinfo()
  const tDeposit = userInfo.fetchStatus === 'success' ? getBalanceNumber(userInfo.info.totalDeposit.toString()) : 0
  const tWithdrawn = userInfo.fetchStatus === 'success' ? getBalanceNumber(userInfo.info.totalWithdrawn.toString()) : 0
  const bnbPrice = usePriceBnbBusd()
  const bnbBalanceInUsd = bnbPrice ? bnbPrice.multipliedBy(bnbBalance) : BIG_ZERO
  const availAmountInUsd = bnbPrice ? bnbPrice.multipliedBy(availAmount) : BIG_ZERO
  const tDepositInUsd = bnbPrice ? bnbPrice.multipliedBy(tDeposit) : BIG_ZERO
  const canharvest = useCanHarvest()
  const canreinvest = useCanReinvest()
  const [onHistoryModal] = useModal(<BountyModal bnbPrice={bnbPrice} depositamount={tDeposit} withdrawamount={tWithdrawn}/>)

  const morebnbContract = useMorebnb()

  const onReinvest = useCallback(async () => {
    setPendingTx(true)
      try {
        await reinvestReward(morebnbContract)
        toastSuccess(
          `${t('Reinvested')}!`,
          t('Your %symbol% rewards have been re-invested to 3rd plan!', { symbol: 'BNB' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    setPendingTx(false)
  }, [ morebnbContract, toastSuccess, toastError, t])

  const onHarvest = useCallback(async () => {
    if(!canharvest) {
      toastError(t('Error'), t('Your withdraw amount exceeds Max value today. Please try tomorrow'))
    } else {
      setPendingTx1(true)
        try {
          await harvestReward(morebnbContract, 11110)
          toastSuccess(
            `${t('Claimed')}!`,
            t('Your %symbol% rewards have been sent to your wallet!', { symbol: 'BNB' }),
          )
        } catch (error) {
          toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        }
      setPendingTx1(false)
    }
  }, [ morebnbContract, canharvest, toastSuccess, toastError, t])

  return (
    <>
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="24px" bold color="secondary" mr="4px">
                {t('Your Farm')}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="row" mr="12px" alignItems="center">
              <Text fontSize="14px" color="text" mr="4px">{t('Total Deposited BNB:')}</Text>
              <Heading display="flex" mr="2px">
                <Balance fontSize="20px" bold value={tDeposit} decimals={2} />
                <Text fontSize="20px" color="text" ml="4px">{t('BNB')}</Text>
              </Heading>
            </Flex>
          </Flex>
          <StyledFlex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Text fontSize="14px" color="text" mr="4px">{t('BNB to Harvest:')}</Text>
              <Heading display="flex">
                <Balance fontSize="20px" bold value={getBalanceNumber(new BigNumber(availAmount))} decimals={7} />
                <Text fontSize="20px" color="text" ml="4px">{t('BNB')}</Text>
              </Heading>
              <Balance
                fontSize="14px"
                color="textSubtle"
                value={getBalanceNumber(availAmountInUsd)}
                decimals={7}
                unit=" USD"
                prefix="~"
              />
            </Flex>
            <Flex>
              <SmallpaddingButton
                disabled={!canreinvest || pendingTx}
                isLoading={pendingTx}
                endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
                onClick={onReinvest}
                scale="md"
                id="clickClaimVaultBounty"
                mr="5px"
              >
                {pendingTx ? t('Staking') : t('Reinvest')}
              </SmallpaddingButton>
              <SmallpaddingButton
                disabled={new BigNumber(availAmount) <= BIG_ZERO || pendingTx1}
                isLoading={pendingTx1}
                endIcon={pendingTx1 ? <AutoRenewIcon spin color="currentColor" /> : null}
                onClick={onHarvest}
                scale="md"
                id="clickClaimVaultBounty"
              >
                {pendingTx1 ? t('Claiming') : t('Harvest')}
              </SmallpaddingButton>
            </Flex>
          </StyledFlex>
          <StyledFlex alignItems="center" justifyContent="space-between" mt="8px">
            <Flex flexDirection="column" mr="12px">
              <Text fontSize="14px" color="text" mr="4px">BNB in Wallet:</Text>
              <Heading display="flex">
                <Balance fontSize="20px" bold value={bnbBalance} decimals={7} />
                <Text fontSize="20px" color="text" ml="4px">{t('BNB')}</Text>
              </Heading>
              <Balance
                fontSize="14px"
                color="textSubtle"
                value={bnbBalanceInUsd.toNumber()}
                decimals={7}
                unit=" USD"
                prefix="~"
              />
            </Flex>
            <Button
              // disabled={!dollarBountyToDisplay || !cakeBountyToDisplay || !callFee}
              onClick={onHistoryModal}
              scale="md"
              id="clickClaimVaultBounty"
              style={{color:'#181a20'}}
            >
              {t('History')}
            </Button>
          </StyledFlex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
