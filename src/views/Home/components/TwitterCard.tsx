import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import { useTranslation } from 'contexts/Localization'

const StyledTwitterCard = styled(Card)`
  min-height:300px;
  margin-top:20px;
`

const CustomCardBody = styled(CardBody)`
  margin-top:10px;
  min-height:300px;
`;

const TwitterCard = () => {
  const {t} = useTranslation()

  return (
    <StyledTwitterCard>
      <CustomCardBody>
        <Heading size="xl" mb="24px">
          {t('Announcements')}
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'ShivaTokenBSC'
          }}
          options={{
            height: '300',
            chrome: "noheader, nofooter",
          }}
        />
      </CustomCardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
