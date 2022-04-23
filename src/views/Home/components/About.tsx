import React from 'react'
import {  Grid, Image, Link, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useTokenData } from 'state/info/hooks'
import { getCakeAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'

const StyleGrid = styled(Grid)`
  max-width: 1200px;
  margin: auto;
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(3,minmax(0,1fr));
  }

  & > div {
    margin: 0 10px;
    margin-top: 32px;
  }
`
const StyleDiv = styled.div`
  margin: 0 15px;
`;

const StyledLink = styled(Link)`
  display: inline;
`;

const About = () => {
  const { t } = useTranslation()
  return (
    <StyleGrid>
      <StyleDiv>
        <Image width={130} height={130} src="images/home1.png" m="auto"/>
        <Text fontSize="20px" textAlign="center" mt="20px" mb="20px">{t('Powered by SHIVA Ecosystem')}</Text>
        <Text fontSize="16px" textAlign="center" fontWeight="100" color="textSubtle">
        As a part of SHIVA DEFI Ecosystem, MoreBNB is backed by SHIVA Token which is Audited by <StyledLink href="https://www.certik.org/projects/shiva-token/" external >Certik</StyledLink> & <StyledLink href="https://paladinsec.co/projects/shiva-token/" external >Paladin.</StyledLink>
        </Text>
      </StyleDiv>
      <StyleDiv>
        <Image width={130} height={130} src="images/home2.png"  m="auto"/>
        <Text fontSize="20px" textAlign="center" mt="20px" mb="20px">{t('High & Stable APR')}</Text>
        <Text fontSize="16px" textAlign="center" fontWeight="100" color="textSubtle" >{t('In the code sets the highest APR among all yield farms on BSC, rules of a smart contract can’t be changed, nothing can affect the amount of income.')}</Text>
      </StyleDiv>
      <StyleDiv>
        <Image width={130} height={130} src="images/home3.png" m="auto" />
        <Text fontSize="20px" textAlign="center" mt="20px" mb="20px">{t('Customer support')}</Text>
        <Text fontSize="16px" textAlign="center" fontWeight="100" color="textSubtle" >
          MoreBNB 24/7 provides you our knowledgable and experienced customer support team in <StyledLink href="https://t.me/MoreUniverse" external >Telegram.</StyledLink>
        </Text>
      </StyleDiv>
    </StyleGrid>
  )
}

export default About
