import React from 'react'
import { Flex, IconButton, CogIcon, useModal, Link, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import SettingsModal from './SettingsModal'

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  justify-content: center;
`;

  return (
    <Flex>
      <StyledLink mr="16px" href="/invest">
        <Text color="background" style={{fontSize: "20px"}}>Invest</Text>
      </StyledLink>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px">
        <CogIcon height={22} width={22} color="textSubtle" />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
