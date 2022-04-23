import React from 'react'
import { Card, Heading, CardHeader, CardBody, Text, Flex, Box, Grid } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import Footer from 'views/Home/components/Footer'
import StakeCard from './components/StakeCard'
import BountyCard from './components/BountyCard'
import ReferralCard from './components/ReferralCard'
import config from './config'

const StyledFlex = styled(Flex)`
  max-width: 1600px;
  width: 100%;
  margin: auto;
  flex-direction: row;

  @media (max-width: 1100px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`

const StyledPage = styled(Page)`
  max-width: 1600px;
`

const Farms: React.FC = () => {
  
  const { t } = useTranslation()

  return (
    <>
      <StyledPage>
        <StakeCard header={t('Invest BNB')} config={config(t)} m="auto" />
        <Footer />
      </StyledPage>
    </>
  )
}

export default Farms
