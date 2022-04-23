import React from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Flex, Text, LinkExternal, Image, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_URL } from 'config';
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { shortenAddress } from 'utils';
import rot13 from '../../../utils/encode'

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const referlink = account ? `${BASE_URL}/?ref=${rot13(account)}` : `${BASE_URL}/?ref=`
  return (
    <>
      <Grid>
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
      </Grid>
    </>
  )
}

export default Footer
