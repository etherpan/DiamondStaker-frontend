import React from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Flex, Text, LinkExternal, Button, Grid, Card, CardBody } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_URL } from 'config';
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { shortenAddress } from 'utils';
import { TokenUpdater } from 'state/info/updaters'
import CurrentStatus from 'views/Home/components/CurrentStatus'
import ButtonGroup from 'views/Home/components/ButtonGroup'
import CardValue from 'views/Home/components/CardValue'


 const Hero = styled.div`
  align-items: center;
  width: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding-top: 20px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    align-items: start;
    text-align: start;
  }
`

const TextLavel = styled.div`
  font-family: inter !important;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 20px;
  color: #000;
  weight: 400, regular;
`

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  height: 153px;
  min-width: 300px;
  border-radius: 15px;
  & > div {
    border-radius: 15px;
    height: 150px;
  }

  @media (max-width: 742px) {
    margin-bottom: 20px;
  }
  @media (max-width: 523px) {
    margin-bottom: 10px;
  }
`

const StyledCardBody = styled(CardBody)`
  background: #fff !important;
  border-radius: 15px;
  height: 150px;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  @media (max-width: 742px) {
    width: 80%;
  }
  @media (max-width: 523px) {
    width: 100%;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  text-align: center;
`

const BlockButton = styled(Button)`
  height: 36px;
  min-width: 120px !important;
  border-radius: 5px;

  @media (max-width: 742px) {
    width: 80%;
  }
  @media (max-width: 523px) {
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 5px;
    max-width: 400px;
    width: 150px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 240px;
  }
`

const AccountButton = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 40px;
  margin-top: 30px;
  a {
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.1);
    }
    img {
      height: 50px;
      width: 50px;
    }
  }

  @media (max-width: 742px) {
    display: block;
  }
  @media (max-width: 523px) {
    display: block;
  }
`

const YourAccount = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()

  return (
    <>
      <Grid>
        <Hero>
          <TextLavel >
            {t('Withdrawable')}
          </TextLavel>
          <TextLavel>
            {t('0 BNB')}
          </TextLavel>
          <TextLavel >
            {t('$ 0')}
          </TextLavel>
          <BlockButton mr="16px" href="/invest" style={{ marginLeft: "auto", marginRight: "auto", marginTop: "30px" }} >
            <Text color="background" style={{fontSize: "20px", color: "white"}}>Withdraw</Text>
          </BlockButton>
          <TextLavel style={{ marginTop: "20px" }}>
            {t('Every 24 hours')}
          </TextLavel>
        </Hero>
      </Grid>
      <AccountButton>
        <StyledCard>
          <StyledCardBody>
            <Row>
              <TextLavel>{t('Total Value Deposited')}</TextLavel>
            </Row>
            <Row>
              <TextLavel>{t('100')}</TextLavel>
            </Row>
            <Row>
              {/* <CardValue fontSize="22px" decimals={3}  value={tDeposited}/> */}
              <TextLavel>BNB</TextLavel>
            </Row>
            {/* <Text fontSize="22px" color="textSubtle" fontStyle="italic" >~${formatAmount(tDepositedbusd.toNumber(), { notation: 'standard' })}</Text> */}
          </StyledCardBody>
        </StyledCard>
        <StyledCard>
          <StyledCardBody>
            <Row>
              <TextLavel>{t('Total Value Deposited')}</TextLavel>
            </Row>
            <Row>
              <TextLavel>{t('100')}</TextLavel>
            </Row>
            <Row>
              {/* <CardValue fontSize="22px" decimals={3}  value={tDeposited}/> */}
              <TextLavel>BNB</TextLavel>
            </Row>
            {/* <Text fontSize="22px" color="textSubtle" fontStyle="italic" >~${formatAmount(tDepositedbusd.toNumber(), { notation: 'standard' })}</Text> */}
          </StyledCardBody>
        </StyledCard>
        <StyledCard>
          <StyledCardBody>
            <Row>
              <TextLavel>{t('Total Value Deposited')}</TextLavel>
            </Row>
            <Row>
              <TextLavel>{t('200')}</TextLavel>
            </Row>
            <Row>
              {/* <CardValue fontSize="22px" decimals={3}  value={tDeposited}/> */}
              <TextLavel>BNB</TextLavel>
            </Row>
            {/* <Text fontSize="22px" color="textSubtle" fontStyle="italic" >~${formatAmount(tDepositedbusd.toNumber(), { notation: 'standard' })}</Text> */}
          </StyledCardBody>
        </StyledCard>
      </AccountButton>
    </>
  )
}

export default YourAccount
