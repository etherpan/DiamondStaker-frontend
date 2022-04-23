import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'

const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledText = styled(Text)`
  margin: 16px 0;
`

const UnlockWalletCard = () => {
  // const TranslateString = useI18n()

  return (
    <Card>
      <StyledCardBody>
        <ConnectWalletButton />
        <StyledText color="primary">Unlock wallet to get your unique referral link</StyledText>
      </StyledCardBody>
    </Card>
  )
}

export default UnlockWalletCard
