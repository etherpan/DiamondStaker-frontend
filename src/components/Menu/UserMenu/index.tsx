import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import {
  Flex,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  Text,
  Link,
  Button
} from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useProfile } from 'state/profile/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import ProfileUserMenuItem from './ProfileUserMenutItem'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile && profile.nft ? `/images/nfts/${profile.nft.images.sm}` : undefined
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)
  const StyledLink = styled(Link)`
    height: 100%;
    width: 100%;
    justify-content: center;
  `;

  const BlockButton = styled(Button)`
  display: block;
  margin-left: 5px;
  height: 36px;
  padding: 0;
  min-width: 120px !important;
  margin: auto;
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

  if (!account) {
    return (
    <>
      <BlockButton mr="16px" href="/invest" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Whitepaper</Text>
      </BlockButton>
      <BlockButton mr="16px" href="/dice" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Audit</Text>
      </BlockButton>
      <BlockButton mr="16px" href="/dice" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Contract</Text>
      </BlockButton>
      <ConnectWalletButton scale="sm" />
    </>
    )
  }

  return (
    <>
      <BlockButton mr="16px" href="/invest" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Whitepaper</Text>
      </BlockButton>
      <BlockButton mr="16px" href="/dice" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Audit</Text>
      </BlockButton>
      <BlockButton mr="16px" href="/dice" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Contract</Text>
      </BlockButton>
      <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
        <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} />
        {/* <UserMenuDivider />
        <UserMenuItem as="button" onClick={onPresentTransactionModal}>
          {t('Transactions')}
        </UserMenuItem> */}
        {/* <UserMenuDivider />
        <ProfileUserMenuItem isLoading={isLoading} hasProfile={hasProfile} /> */}
        <UserMenuDivider />
        <UserMenuItem style={{ margin: "5px" }} as="button" onClick={logout}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Disconnect')}
            <LogoutIcon />
          </Flex>
        </UserMenuItem>
      </UIKitUserMenu>
    </>
  )
}

export default UserMenu
