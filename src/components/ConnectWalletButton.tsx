import React from 'react'
import { Button, useWalletModal, WalletFilledIcon } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} style={{color:'#181a20', height: "36px", borderRadius: "5px", margin: "5px" }}{...props}>
      {/* <WalletFilledIcon color='backgroundAlt' style={{marginRight: "5px"}}/> */}
      {t('Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
