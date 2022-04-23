import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Link, Text, Heading } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import copy from 'copy-to-clipboard';
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import { BASE_URL } from 'config';
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import rot13 from '../../../utils/encode'

const StyledLink = styled(Link)`
    cursor: pointer;
    align-self: center;
    width: 280px;
    overflow: hidden;
`

const StyledFooter = styled(CardFooter)`
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  min-height: 85px;
`

const StyledButton = styled(Button)`
    color: ${(props) => props.theme.colors.primary};
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.primary};
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;
    height: 32px;
    padding: 0px 16px;
    opacity: 1;

    &:hover {
        background-color: transparent !important;
        opacity: 0.8;
    }

    &:focus {
        box-shadow: none;
    }
`

const StyledCard = styled(Card)`
    // margin-top: -20px;
    @media (max-width: 733px) {
        margin-top: 10px;
    }
`

const ReferralLinkCard = () => {
    const { account } = useActiveWeb3React()
    const referlink = account ? `${BASE_URL}/?ref=${rot13(account)}` : `${BASE_URL}/?ref=`
    return (
        <StyledCard>
            <StyledFooter>
                <Text fontSize="20px" size="sm" mr="8px" mb="20px" color="primary">Your Referral Link</Text>
                <CopyAddress account={referlink}/>
            </StyledFooter>
        </StyledCard>
    )
}

export default ReferralLinkCard
