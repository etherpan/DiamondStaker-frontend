import React from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Flex, Text, LinkExternal, Image, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_URL } from 'config';
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { shortenAddress } from 'utils';
import rot13 from '../../../utils/encode'

const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
 const TextLavel = styled.div`
  font-family: Roboto Condensed;
  text-align: center;
  font-size: 18px;
  color: #fff;
  padding: 5px;
 `
 const SocialsBox = styled.div`
 .effect {
   width: 100%;
   // padding: 50px 0px 70px 0px;
   // background-color: #212121;
   
   h2 {
     color: #fff;
     font: {
       family: 'Playfair Display', serif;
       weight: 400;
       size: 25px;
     }
     letter-spacing: 3px;
   }
   
   &:nth-child(2) {
     margin-top: 50px;
   }
   
   &:nth-child(2n+1) {
     // background-color: #fff;
     
     h2 {
       color: #212121;
     }
   }
   
   &:nth-child(2n) {
     
     a {
       color: #fff;
       border-color: #fff;
     }
   }
   
   .buttons {
     margin-top: 40px;
     display: flex;
     justify-content: center;
   }

   a {
     text-decoration: none !important;
     width: 50px;
     height: 50px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     margin-right: 10px;
     font-size: 22px;
     overflow: hidden;
     position: relative;
     color: #fcd535; //or change to your own color
     border: 2px solid #fcd535; //or change to your own color
     transition: all 0.2s linear 0s;

     i {
       position: relative;
       z-index: 3;
     }
     
     &:last-child {
       margin-right: 0px;
     }
     
     &:before {
       content: "";
       display: inline-block;
       height: 100%;
       vertical-align: middle;
     }
     
     i {
       display: inline-block;
       vertical-align: middle;
     }

     &:after {
       content: "";
       display: block;
       width: 90%;
       height: 90%;
       top: -110%;
       left: 0;
       right: 0;
       margin: auto;
       position: absolute;
       background-color: #212121;
       border-radius: 50%;
     }
     
     &:hover {
       color: #fff;
       
       &:after {
         top: 5%;
         transition: all 0.2s linear 0s;
       }
     }
   }      
 }
 

/* varrius effect */
.effect {
 a {
   transition: all 0.2s linear 0s;
   
   &:after {
     content: "";
     display: block;
     width: 90%;
     height: 90%;
     top: -110%;
     left: 0;
     right: 0;
     margin: auto;
     position: absolute;
     background-color: #212121;
     border-radius: 50%;
   }
   
   &:hover {
     color: #fff;
     
     &:after {
       top: 5%;
       transition: all 0.2s linear 0s;
     }
   }
 }
}
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
            {t('Experimental Yield Farm on Binance Smart Chain')}
          </TextLavel>
          <TextLavel style={{ marginTop: "40px" }}>
            {t('- 0.01 BNB Min Investment')}
          </TextLavel>
          <TextLavel>
            {t('- 10% Daily rewards')}
          </TextLavel>
          <TextLavel>
            {t('- 20 Day 200% ROI')}
          </TextLavel>
          <TextLavel>
            {t('- 0.0035 BNB Minimum Withdrawal')}
          </TextLavel>
          <TextLavel>
            {t('- Withdraw Anytime')}
          </TextLavel>
          <TextLavel>
            {t('- 100% availability : 70% withdraw 30% auto reinvested for sustainability and anti whale functions')}
          </TextLavel>
          <TextLavel>
            {t('- 3 BNB max withdrawal per transaction')}
          </TextLavel>
        </Hero>

        <Flex flexDirection="column">
          <Text color="primary" fontSize="20px" >{t('Referral Link')}</Text>
          <CopyAddress account={referlink} mt="5px" style={{width: "fit-content"}} color="textSubtle"/>
        </Flex>
        <Flex flexDirection="column">
          <Text color="primary" fontSize="20px" >{t('Contract')}</Text>
          <LinkExternal href='https://bscscan.com/address/0x13f3bc9dd5c93e9a11779f269ca27fe890ed45d1#code' color="textSubtle" mt="12px" fontSize='16px'>{shortenAddress("0x13f3bc9dd5c93e9a11779f269ca27fe890ed45d1", 6)}</LinkExternal>
          <LinkExternal href='https://acrobat.adobe.com/link/review?uri=urn%3Aaaid%3Ascds%3AUS%3A7d3e6efd-b72f-3217-a4ad-4eaf27682a50#pageNum=1' color="textSubtle" mt="12px" fontSize='16px'>Audit Report</LinkExternal>
          <a href='https://dappradar.com/binance-smart-chain/high-risk/bnb-multiplier' style={{marginTop: "8px"}} rel="noreferrer" target="_blank"><Image src="/images/dapp.svg" width={110} height={24} /> </a>
          <a href='https://hazecrypto.net/audit/bnbmultiplier' style={{marginTop: "8px"}} rel="noreferrer" target="_blank"><Image src="/images/haze.png" width={124} height={24} /> </a>
        </Flex>
        <Flex flexDirection="column">
          <Text color="primary" fontSize="20px" >{t('Socials')}</Text>
          {/* <TelegramIcon /> */}
          <a href="https://t.me/MyYieldFarm" target="_blank" rel="noreferrer" style={{marginTop: "10px"}}>
            <Image src="/images/telegram.svg" width={24} height={24} />
          </a>
        </Flex>
        <TextLavel style={{ fontSize: "20px", color: "white", margin: "auto" }}>
            {t('© Copyright Diamond Staker . All Rights Reserved')}
        </TextLavel>
      </Grid>
    </>
  )
}

export default Footer
