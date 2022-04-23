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
 const Row = styled(Flex)`
  
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

const StyledColumn = styled(Flex)<{ noMobileBorder?: boolean }>`
  flex-direction: column;
  ${({ noMobileBorder, theme }) =>
    noMobileBorder
      ? `${theme.mediaQueries.md} {
           padding: 0 16px;
           border-left: 1px ${theme.colors.inputSecondary} solid;
         }
       `
      : `border-left: 1px ${theme.colors.inputSecondary} solid;
         padding: 0 8px;
         ${theme.mediaQueries.sm} {
           padding: 0 16px;
         }
       `}
`

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const referlink = account ? `${BASE_URL}/?ref=${rot13(account)}` : `${BASE_URL}/?ref=`
  return (
    <>
      <Grid alignContent="center">
        <Text fontSize="20px" color="#fff">
          Conditinos Apply
        </Text>
        <Grid>
          <Text color="primary" fontSize="20px" >{t('Referral Levels')}</Text>
          <Text color="textSubtle" mt="5px">Level 1 - 15%</Text>
          <Text color="textSubtle" mt="2px">Level 2 - 10%</Text>
          <Text color="textSubtle" mt="2px">Level 3 - 8%</Text>
          <Text color="textSubtle" mt="2px">Level 4 - 5%</Text>
          <Text color="textSubtle" mt="2px">Level 5 - 3%</Text>
          
        </Grid>
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
      </Grid>
    </>
  )
}

export default Footer
