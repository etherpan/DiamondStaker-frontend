import React from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Flex, Text, LinkExternal, Image, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_URL } from 'config';
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { shortenAddress } from 'utils';
import rot13 from '../../../utils/encode'

 const TextLavel = styled.div`
  font-family: inter !important;
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding: 5px;
  weight: 400, regular;
 `
 
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

const StyledCard = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 1.3rem;
  margin-top: 3rem;
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
`

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const referlink = account ? `${BASE_URL}/?ref=${rot13(account)}` : `${BASE_URL}/?ref=`
  return (
    <>
      <Grid>
        <Hero>
          {/* <Image src="images/header.png" width={400} height={237}/> */}
          <TextLavel style={{ fontSize: "28px", color: "white", margin: "auto" }}>
            {t('Conditions Apply')}
          </TextLavel>
          <TextLavel style={{ marginTop: "40px" }}>
            {t('- You cannot withdraw the initial')}
          </TextLavel>
          <TextLavel>
            {t('- investment You will receive 10% daily for the 30 days')}
          </TextLavel>
          <TextLavel>
            {t('- 0% of your withdrawal amount will be re-invested with its own 30 day period')}
          </TextLavel>
          <TextLavel>
            {t('- There is a 10% deposit fee and 5% withdrawal fee')}
          </TextLavel>
          <TextLavel>
            {t('- There is a 3 level referral system. If someone uses your referral link to visit the site and')}
          </TextLavel>
        </Hero>
        <StyledCard>
          <a href="https://t.me/MyYieldFarm" target="_blank" rel="noreferrer">
            <img src="/images/logo_small.png" alt='logo_small' style={{height: "100px", width: "180px" }}/>
          </a>
          <a href="https://t.me/MyYieldFarm" target="_blank" rel="noreferrer">
            <img src="/images/twitter.png" alt='twitter'/>
          </a>
          <a href="https://t.me/MyYieldFarm" target="_blank" rel="noreferrer">
            <img src="/images/telegram.png" alt='telegram'/>
          </a>
        </StyledCard>
        <TextLavel style={{ fontSize: "20px", color: "white", margin: "auto" }}>
            {t('© Copyright Diamond Staker . All Rights Reserved')}
        </TextLavel>
      </Grid>
    </>
  )
}

export default Footer
