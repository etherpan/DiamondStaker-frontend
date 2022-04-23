import React from 'react'
import { Card, CardBody, Heading, Text, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalDividends } from 'hooks/useDividend'
import { useTokenData } from 'state/info/hooks'
import { useTranslation } from 'contexts/Localization'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import Balance from 'components/Balance'

const StyledTwitterCard = styled(Card)`
  min-height:75px;
  margin: 0 10px;
  margin-top:20px;
`

const Row = styled.div`
  align-items: center;
  margin: 20px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
`

const TotalRewards = () => {
  const {t} = useTranslation()
  const totalRewardBtcb = useTotalDividends()
  const btcbAmount = totalRewardBtcb ? getBalanceNumber(totalRewardBtcb) : 0
  const btcbaddress = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'.toLowerCase()
  const tokendata = useTokenData(btcbaddress);
  const btcbPrice = tokendata ? tokendata.priceUSD : 0
  const busdprice = btcbAmount*btcbPrice
  return (
    <StyledTwitterCard>
        <Row>
          <Image height={60} width={60} src="images/tokens/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c.png" alt="BTCB icon" ml="20px" mr="20px"/>
          <Text ml="20px" mt="10px" fontSize="24px">
            {t('%btcAmount% Bitcoin Paid To SHIVA Holders which are worth',{btcAmount : btcbAmount.toFixed(4)})} ${formatAmount(busdprice, { notation: 'standard' })}
          </Text>
        </Row>
    </StyledTwitterCard>
  )
}

export default TotalRewards
