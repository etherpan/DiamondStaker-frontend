import React from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Flex, Text, LinkExternal, Image, Grid, Button, Card, CardBody } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_URL } from 'config';
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { shortenAddress } from 'utils';
import rot13 from '../../../utils/encode'

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

const TextLavel = styled.div`
  font-family: inter !important;
  margin-left: auto;
  margin-right: auto;
  vertical-align: center;
  font-size: 20px;
  color: #000;
  weight: 400, regular;
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
  max-width: 200px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 5px;
    max-width: 400px;
    width: 150px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 240px;
  }
`

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  // margin: auto;
  height: 153px;
  border-radius: 15px;
  & > div {
    border-radius: 5px;
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
  justify-content: space-around;
  display: flex;
  max-width: 300px;
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
  // margin-bottom: 8px;
`

const ReferralLink = styled.div`
  align-items: center;
  display: flex;
  text-align: center;
  margin: auto;
  // margin-bottom: 8px;
`

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const referlink = account ? `${BASE_URL}/?ref=${rot13(account)}` : `${BASE_URL}/?ref=`
  return (
    <>
      <Grid>
        {/* <Flex flexDirection="column"> */}
          {/* <Text color="primary" fontSize="20px" >{t('Contract')}</Text> */}
          {/* <LinkExternal href='https://bscscan.com/address/0x13f3bc9dd5c93e9a11779f269ca27fe890ed45d1#code' color="textSubtle" mt="12px" fontSize='16px'>{shortenAddress("0x13f3bc9dd5c93e9a11779f269ca27fe890ed45d1", 6)}</LinkExternal> */}
          {/* <LinkExternal href='https://acrobat.adobe.com/link/review?uri=urn%3Aaaid%3Ascds%3AUS%3A7d3e6efd-b72f-3217-a4ad-4eaf27682a50#pageNum=1' color="textSubtle" mt="12px" fontSize='16px'>Audit Report</LinkExternal> */}
          {/* <a href='https://dappradar.com/binance-smart-chain/high-risk/bnb-multiplier' style={{marginTop: "8px"}} rel="noreferrer" target="_blank"><Image src="/images/dapp.svg" width={110} height={24} /> </a> */}
          {/* <a href='https://hazecrypto.net/audit/bnbmultiplier' style={{marginTop: "8px"}} rel="noreferrer" target="_blank"><Image src="/images/haze.png" width={124} height={24} /> </a> */}
        {/* </Flex> */}
      </Grid>
      <Grid>
        <Hero>
          <TextLavel style={{ color: "#fff" }}>
            {t('Referral Program')}
          </TextLavel>
          <TextLavel style={{ marginTop: "20px", color: "#fff" }}>
            {t('Invest atleast once to receive referral rewards!')}
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
      <ReferralLink >
        <TextLavel style={{ color: "#fff" }}>{t('Referral Link')}</TextLavel>
        <CopyAddress account={referlink} mt="5px" style={{width: "fit-content"}} color="textSubtle"/>
      </ReferralLink>
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

export default Footer
