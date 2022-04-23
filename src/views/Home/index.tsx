import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';
import { useQueryParam, StringParam } from 'use-query-params';
import PageSection from 'components/PageSection'
import { Text, Image, Flex, Heading } from '@pancakeswap/uikit'
import { TokenUpdater } from 'state/info/updaters'
import Page from 'components/Layout/Page'

import CurrentStatus from 'views/Home/components/CurrentStatus'
import ButtonGroup from 'views/Home/components/ButtonGroup'
import About from 'views/Home/components/About'
import Footer from 'views/Home/components/Footer'
import Referral from 'views/Home/components/Referral'
import YourAccount from 'views/Home/components/YourAccount'
import { useTranslation } from 'contexts/Localization'
import { isAddress } from '../../utils/web3'
import rot13 from '../../utils/encode'
import CakeDataRow from './components/CakeDataRow';

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
text-align: center;
font-size: 20px;
color: #fff;
padding: 5px;
weight: 400, regular;
`

const Home: React.FC = () => {
  
  const { t } = useTranslation()
  const cookies = new Cookies();
  const [ref, setNum] = useQueryParam('ref', StringParam);

  if(ref) {
    if(isAddress(rot13(ref))) {
      cookies.set("ref", ref)
    }
  }

  return (
    <>
      <div>
        <Page>
          <Flex alignItems="center" justifyContent="center">
            <div style={{width: "100%"}}>
              <Hero>
                {/* <Image src="images/header.png" width={400} height={237}/> */}
                <TextLavel style={{ fontSize: "28px", color: "white", margin: "auto" }}>
                  {t('Make a New Investment & Start Earning Daily')}
                </TextLavel>
                <TextLavel >
                  {t('- 0.01 BNB Min Investment')}
                </TextLavel>
                <TextLavel >
                  {t('- 10% Daily rewards')}
                </TextLavel>
                <TextLavel >
                  {t(' 20 Day 200% ROI')}
                </TextLavel>
                <TextLavel >
                  {t('- 0.0035 BNB Minimum Withdrawal')}
                </TextLavel>
                <TextLavel >
                  {t('- Withdraw Anytime')}
                </TextLavel>
                <TextLavel >
                  {t('- 100% availability : 70% withdraw 30% auto reinvested for sustainability and anti whale functions')}
                </TextLavel>
                <TextLavel>
                  {t('- 3 BNB max withdrawal per transaction')}
                </TextLavel>
              </Hero>
              <TokenUpdater />
              <CurrentStatus />
              <ButtonGroup />
            </div>
          </Flex>
        </Page>
      </div>
      <div style={{ background: "#fff" }}>
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
