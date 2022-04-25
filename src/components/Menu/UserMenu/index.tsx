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
  max-width: 140px !important;
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
`

  if (!account) {
    return (
    <>
      <BlockButton>
        <a href="https://gitbook.diamond.com"  target="_blank" rel="noreferrer">
          <Text style={{fontSize: "20px", color: "white"}}>WhitePater</Text>
        </a>
      </BlockButton>
      <BlockButton>
        <a href="https://acrobat.adobe.com/link/review?uri=urn%3Aaaid%3Ascds%3AUS%3A7d3e6efd-b72f-3217-a4ad-4eaf27682a50#pageNum=1"  target="_blank" rel="noreferrer">
          <Text color="background" style={{fontSize: "20px", color: "white"}}>Audit</Text>
        </a>
      </BlockButton>
      <BlockButton>
        <a href="https://bscscan.com/address/0x47c9A278f6a482b0C033A646e9DD2DD52a9EFF20"  target="_blank" rel="noreferrer">
          <Text color="background" style={{fontSize: "20px", color: "white"}}>Contract</Text>
        </a>
      </BlockButton>
      <ConnectWalletButton scale="sm"/>
    </>
    )
  }

  return (
    <>
      <BlockButton>
        <a href="https://gitbook.diamond.com"  target="_blank" rel="noreferrer">
          <Text style={{fontSize: "20px", color: "white"}}>WhitePater</Text>
        </a>
      </BlockButton>
      <BlockButton>
        <a href="https://acrobat.adobe.com/link/review?uri=urn%3Aaaid%3Ascds%3AUS%3A7d3e6efd-b72f-3217-a4ad-4eaf27682a50#pageNum=1"  target="_blank" rel="noreferrer">
          <Text color="background" style={{fontSize: "20px", color: "white"}}>Audit</Text>
        </a>
      </BlockButton>
      <BlockButton>
        <a href="https://bscscan.com/address/0x47c9A278f6a482b0C033A646e9DD2DD52a9EFF20"  target="_blank" rel="noreferrer">
          <Text color="background" style={{fontSize: "20px", color: "white"}}>Contract</Text>
        </a>
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
