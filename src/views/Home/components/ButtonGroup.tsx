import React from 'react'
import { Link, Text, Button, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const ButtonSection = styled.div`
  align-items: center;
  text-align: center;
  margin: 5px;
  max-width: 742px;
  ${({ theme }) => theme.mediaQueries.sm} {
    align-items: start;
    text-align: start;
  }
`

const BlockButton = styled(Button)`
  display: block;
  margin: 5px;
  height: 56px;
  padding: 0;
  width: 180px;
  border-radius: 5px;
  @media (max-width: 742px) {
    width: 80%;
  }
  @media (max-width: 523px) {
    width: 100%;
  }
  max-width: 200px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 5px;
    max-width: 400px;
    width: 150px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 240px;
  }
`;

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const ButtonGroup = () => {
  const {t} = useTranslation()

  return (
    <ButtonSection>
      <Flex>
        <BlockButton scale="md">
          <StyledLink mr="16px" href="/invest">
            <Text color="background" style={{fontSize: "20px"}}>{t('Invest')}</Text>
          </StyledLink>
        </BlockButton>

        <BlockButton scale="md" >
          <StyledLink mr="16px" href="/dice">
            <Text color="background"style={{fontSize: "20px"}}>{t('Play')}</Text>
          </StyledLink>
        </BlockButton>
      </Flex>

      {/* <BlockButton scale="md">
      <StyledLink mr="16px" href="https://bscscan.com/address/0xAC0f7E47c8BC00feEe5B71F8d9d39dB08785fAD3#code" external>
        <Text color="background">{t('Verified Contract')}</Text>
      </StyledLink>
      </BlockButton>
    
      <BlockButton scale="md">
      <StyledLink mr="16px" href="https://t.me/MoreUniverse" external>
        <Text color="background">{t('Telegram')}</Text>
      </StyledLink>
      </BlockButton> */}
      
      {/* <Text mt="70px" fontSize="24px">
        {t('Start your yield farm journey')}
      </Text>
      <Text fontSize="24px">
        {t('with BNB Multiplier community')}
      </Text> */}
    </ButtonSection>
  )
}

export default ButtonGroup
