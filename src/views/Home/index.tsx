import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';
import { useQueryParam, StringParam } from 'use-query-params';
import { Text, Image, Flex, Heading } from '@pancakeswap/uikit'
import { TokenUpdater } from 'state/info/updaters'
import Page from 'components/Layout/Page'

import CurrentStatus from 'views/Home/components/CurrentStatus'
import ButtonGroup from 'views/Home/components/ButtonGroup'
import About from 'views/Home/components/About'
import Footer from 'views/Home/components/Footer'
import { useTranslation } from 'contexts/Localization'
import { isAddress } from '../../utils/web3'
import rot13 from '../../utils/encode'
import CakeDataRow from './components/CakeDataRow';

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

const ImageDiv = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
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
    <Page>
      <Flex alignItems="center" justifyContent="center">

        <div style={{width: "100%"}}>
          
          <Hero>
            {/* <Image src="images/header.png" width={400} height={237}/> */}
            <Heading scale="xxl" color='primary'>BNB Multiplier</Heading>
            <Text fontSize="20px" color="#fff" >
              {t('Experimental Yield Farm on Binance Smart Chain')}
            </Text>
            <Text fontSize="20px" color="textSubtle" >
              {t('- 0.01 BNB Min Investment')}
            </Text>
            <Text fontSize="20px" color="textSubtle" >
              {t('- 10% Daily rewards')}
            </Text>
            <Text fontSize="20px" color="textSubtle" >
              {t('- 20 Day 200% ROI')}
            </Text>
            <Text fontSize="20px" color="textSubtle" >
              {t('- 0.0035 BNB Minimum Withdrawal')}
            </Text>
            <Text fontSize="20px" color="textSubtle" >
              {t('- Withdraw Anytime')}
            </Text>
            <Text fontSize="20px" color="textSubtle" >
              {t('- 100% availability : 70% withdraw 30% auto reinvested for sustainability and anti whale functions')}
            </Text>
            <Text fontSize="20px" color="textSubtle"  mb="20px">
              {t('- 3 BNB max withdrawal per transaction')}
            </Text>
          </Hero>
          <TokenUpdater />
          <CurrentStatus />
          <ButtonGroup />
        </div>
        {/* <ImageDiv style={{width: "100%"}}>
          <Image src="images/landing.png" width={600} height={777}/>
        </ImageDiv> */}
      </Flex>
      <Footer />
    </Page>
  )
}

export default Home
