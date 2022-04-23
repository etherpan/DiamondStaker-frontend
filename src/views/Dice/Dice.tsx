import React, { useState, useMemo, useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import { Flex, Box, Card, Text, Heading, Input, Button, Image } from '@pancakeswap/uikit'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import Page from 'components/Layout/Page'
import { useDice } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import Footer from 'views/Home/components/Footer'
import Loading from 'components/Loading'
import Hero from './components/Hero'
import UnlockWalletCard from './components/UnlockWalletCard'
import History from './components/History'


const Dice: React.FC = () => {
  
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const decimals = 18;

  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const CardContent = styled.div`
    padding: 16px;
  `
  const Line = styled.div`
    height: 2px;
    background: #333;
    margin: 24px 12px;
  `
  const Divider = styled.div`
    margin-top: 24px;
    text-align: center;
    color: #3c3742;
  `
  const StyledInput = styled(Input)`
    box-shadow: none;
    border-radius: 20px;
    background: #000015;
  `
  const Grid = styled.div`
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(3, auto);
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(6, auto);
  }
`
  const { balance : bnbbalance } = useGetBnbBalance()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance)
  }, [bnbbalance])
  const maxBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance.minus(3000000000000000))
  }, [bnbbalance])

  const handleChange = useCallback(
    (e) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {

    setVal(maxBalance)
  }, [maxBalance, setVal])

  const displayBalance = (balance: string) => {
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.0001)) {
      return balanceBigNumber.toLocaleString()
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const StakeAmount = new BigNumber(val)
  const isBalanceZero = Number(maxBalance) < 0.05 || !maxBalance
  const diceContract = useDice()
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const random = Math.floor(Math.random() * 6) + 1
  const handleStake = async (position : number) => {
    console.log("stake", position)
    const vaule = StakeAmount.times(10**18).toString()
    try {
      const tx = await callWithGasPrice(diceContract, 'MakeRoll', [position], {value: vaule, gasLimit: 380000,})
      setPendingTx(true)
      const receipt = await tx.wait()
      // return true
      toastSuccess(t('Your funds are invested'))
      // return receipt.status
      // onSuccess(StakeAmount.toString(), receipt.transactionHash as string)
    } catch {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }
  const diceImg = (i: number, b: boolean) => {
    return <Image src={b?`images/${i}-disabled.png` : `images/${i}.png`} width={42} height={42} alt="diceLogo" />
  }

  return (
    <>
      <Page>
        <Hero />
        
        <Box style={{maxWidth: "400px", margin: "auto", marginBottom: "32px"}}>
          <Card>
            {pendingTx && <Loading />}
            <Heading color="primary"  mt={20} ml={20} style={{textAlign: "center"}}>Dice</Heading>
            <CardContent>
              <Flex justifyContent="space-between">
                <Text>Payout:</Text>
                <Text bold>10 X</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Minimum deposit amount:</Text>
                <Text bold>0.05 bnb</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Maximum deposit amount:</Text>
                <Text bold>1 bnb</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Fee:</Text>
                <Text bold>10 %</Text>
              </Flex>
              <Line />
              <Flex justifyContent="space-between" pl="16px">
                <Text fontSize="14px">BNB</Text>
                <Text fontSize="14px">{t('Balance: %balance%', { balance: displayBalance(fullBalance) })}</Text>
              </Flex>
              <Flex alignItems="flex-end" className='dice-input' justifyContent="space-around" style={{background: "#000015", border: "2px solid #3c3742", borderRadius: "20px"}}>
                <StyledInput
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  autoFocus
                  onChange={handleChange}
                  placeholder="0"
                  value={val}
                />
                <Button scale="sm" onClick={handleSelectMax} style={{color:'#fff', height: "40px", background: "none"}}>
                  {t('Max')}
                </Button>
              </Flex>
              <Divider>----- Choose Mode -----</Divider>
              <Grid>
                <Flex justifyContent="center" >
                  <Button
                    scale="sm"
                    width="50px"
                    height="50px"
                    mb="12px"
                    style={{background: "none", padding: "0px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(1)}
                  >
                    {pendingTx ? diceImg(1, true) : diceImg(1, pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05))}
                  </Button>
                </Flex>
                <Flex justifyContent="center" >
                  <Button
                    scale="sm"
                    width="50px"
                    height="50px"
                    mb="12px"
                    style={{background: "none", padding: "0px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(2)}
                  >
                    {pendingTx ? diceImg(2, true) : diceImg(2, pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05))}
                  </Button>
                </Flex>
                <Flex justifyContent="center" >
                  <Button
                    scale="sm"
                    width="50px"
                    height="50px"
                    mb="12px"
                    style={{background: "none", padding: "0px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(3)}
                  >
                    {pendingTx ? diceImg(3, true) : diceImg(3, pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05))}
                  </Button>
                </Flex>
                <Flex justifyContent="center" >
                  <Button
                    scale="sm"
                    width="50px"
                    height="50px"
                    mb="12px"
                    style={{background: "none", padding: "0px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(4)}
                  >
                    {pendingTx ? diceImg(4, true) : diceImg(4, pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05))}
                  </Button>
                </Flex>
                <Flex justifyContent="center" >
                  <Button
                    scale="sm"
                    width="50px"
                    height="50px"
                    mb="12px"
                    style={{background: "none", padding: "0px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(5)}
                  >
                    {pendingTx ? diceImg(5, true) : diceImg(5, pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05))}
                  </Button>
                </Flex>
                <Flex justifyContent="center" >
                  <Button
                    scale="sm"
                    width="50px"
                    height="50px"
                    mb="12px"
                    style={{background: "none", padding: "0px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(6)}
                  >
                    {pendingTx ? diceImg(6, true) : diceImg(6, pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05))}
                  </Button>
                </Flex>
              </Grid>
              <Divider>----- Random Mode -----</Divider>
              <Flex justifyContent="center" mt="32px">
                  <Button
                    scale="sm"
                    width="200px"
                    height="45px"
                    mb="12px"
                    style={{color:'#fff', borderRadius: "22px"}}
                    disabled={
                      pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(maxBalance) || isBalanceZero || StakeAmount.lt(0.05)
                    }
                    onClick={() => handleStake(random)}
                  >
                    {pendingTx ? t('Betting') : t('Bet')}
                </Button>
              </Flex>           
            </CardContent>
          </Card>
        </Box>
        <History />
        <Footer />
      </Page>
    </>
  )
}

export default Dice
