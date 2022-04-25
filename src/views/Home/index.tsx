import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';
import { useQueryParam, StringParam } from 'use-query-params';
import PageSection from 'components/PageSection'
import { Text, Image, Flex, Heading } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import About from 'views/Home/components/About'
import Footer from 'views/Home/components/Footer'
import Referral from 'views/Home/components/Referral'
import YourAccount from 'views/Home/components/YourAccount'
import { useTranslation } from 'contexts/Localization'
import { isAddress } from '../../utils/web3'
import CakeDataRow from './components/CakeDataRow'
import StakeCard from './components/StakeCard'
import config from './config'

const StyledHeroSection = styled(PageSection)`
  background-image: url('images/bg.jpg');
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Hero = styled.div`
  align-items: center;
  width: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content:  space-evenly;
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
  margin: auto;
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding: 5px;
  weight: 400, regular;
`

const AccountStyle = styled.div`
  background: #1F09AC;
  font-size: 26px;
  font-family: inter !important;
  margin: auto;
  padding: 10px;
  text-align: center;
  color: #fff;
`

const Home: React.FC = () => {
  
  const { t } = useTranslation()

  return (
    <>
      <div style={{ background: "#3C20E9" }}>
        <Page style={{ background: "#3C20E9" }}>
          <Flex alignItems="center" justifyContent="center">
            <div >
              <Hero style={{ marginBottom: "20px" }}>
                <TextLavel style={{ fontSize: "28px", color: "white", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}>
                  {t('Make a New Investment & Start Earning Daily')}
                </TextLavel>
                <TextLavel >
                  {t('10% Daily for 30 days')}
                </TextLavel>
                <TextLavel>
                  {t('30% Auto Reinvestment on Withdrawal')}
                </TextLavel>
                <TextLavel >
                  {t('3 Level Referral System')}
                </TextLavel>
              </Hero>
              <StakeCard header={t('Invest BNB')} config={config(t)} m="auto" />
            </div>
          </Flex>
        </Page>
      </div>
      <div style={{ background: "#fff" }}>
        <AccountStyle>
          Your Account
        </AccountStyle>
        <Page style={{ background: "#fff" }}>
          <YourAccount/>
        </Page>
      </div>
      <div style={{ background: "#3C20E9" }}>
        <Page style={{ background: "#3C20E9" }}>
          <Referral/>
        </Page>
      </div>
      <div>
        <Page>
          <Footer />
        </Page>
      </div>  
    </>
  )
}

export default Home
