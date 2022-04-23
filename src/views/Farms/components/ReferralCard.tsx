import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {  Card,  CardBody,  Text,  Flex } from '@pancakeswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { useUserinfo, useTotalReferralBonus } from 'hooks/useMorebnb'
import ReferralLinkCard from './ReferralLinkCard'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`
const StyledFlex = styled(Flex)`
  flex-direction: row;

  @media (max-width: 733px) {
    // flex-direction: column;
    flex-wrap: wrap;
  }
`

const ReferralCard = () => {
  const { t } = useTranslation()
  const userInfo = useUserinfo()
  const tWithdrawn = getBalanceNumber(new BigNumber(useTotalReferralBonus().toString()))
  const tReferrals = userInfo.fetchStatus === 'success' ? userInfo.info.totalReferrals.toString() : '0'
  
  return (
    <>
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="24px" bold color="secondary" mr="4px">
                {t('Affiliate Program')}
              </Text>
            </Flex>
          </Flex>
          <StyledFlex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Text fontSize="16px" color="text" mr="4px">1 LVL (your invited user) - 7%</Text>
              <Text fontSize="16px" color="text" mr="4px">2 LVL (user invited by your 1 lvl) - 3%</Text>
              <Text fontSize="16px" color="text" mr="4px">3 LVL - 1.5%</Text>
              <Text fontSize="16px" color="text" mr="4px">4 LVL - 1%</Text>
              <Text fontSize="16px" color="text" mr="4px">5 LVL - 0.5%</Text>
              <Text fontSize="16px" color="text" mr="4px" mt="20px">{t('Invited users: %referrals%', {referrals : tReferrals})}</Text>
              <Text fontSize="16px" color="text" mr="4px">{t('Total Earnings: %earnings% BNB', {earnings : formatAmount(tWithdrawn, { notation: 'standard' })})}</Text>
            </Flex>
            <Flex flexDirection="column" mr="12px">
              <ReferralLinkCard />
            </Flex>
          </StyledFlex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default ReferralCard
