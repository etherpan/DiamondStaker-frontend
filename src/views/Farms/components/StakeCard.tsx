import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { Text, Heading, Card, CardBody, Box, BoxProps, Flex, Button, Grid } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUserinfo } from 'hooks/useMorebnb'
import { useMorebnb } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { harvestReward } from 'utils/calls/moreb'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from 'views/Home/components/CardValue'
import StakeInner from './StakeInner'

const StyledCard = styled(Card)`
  margin: 15px 10px;
  margin-bottom: 0px;
  height: 113px;
  border-radius: 10px;
  & > div {
    border-radius: 10px;
    height: 110px;
  }
`

const StyledCardBody = styled(CardBody)`
  border-radius: 15px;
  height: 150px;
  max-width: 300px;
  text-align: center;
`

const StyleGrid = styled(Grid)`
  max-width: 300px;
  margin: auto;
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(1,minmax(0,1fr));
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(1,minmax(0,1fr));
    max-width: 542px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }  
`

const Row = styled.div`
  align-items: center;
  display: flex;
  // text-align: center;
  justify-content: center;
  // margin-bottom: 8px;
`


interface Props extends BoxProps {
  header: string
  config: { days: string; pdaily: number; total: number; pid:number; }[]
}

const StakeCard: React.FC<Props> = ({ header, config, ...props }) => {
    const { t } = useTranslation()
    const { toastSuccess, toastError } = useToast()
    const [pendingTx, setPendingTx] = useState(false)
    const userInfo = useUserinfo()
    const morebnbContract = useMorebnb()
    const tDeposit = userInfo.fetchStatus === 'success' ? getBalanceNumber(userInfo.info.total_invested.toString()) : 0
    const tWithdrawn = userInfo.fetchStatus === 'success' ? getBalanceNumber(userInfo.info.total_withdrawn.toString()) : 0
    const tRewards = userInfo.fetchStatus === 'success' ? getBalanceNumber(userInfo.info.total_ref_bonus.toString()) : 0
    const tWithdrawable = userInfo.fetchStatus === 'success' ? getBalanceNumber(userInfo.info.for_withdraw.toString()) : 0
    const canharvest = tWithdrawable ? tWithdrawable > 0.0035 : false
    const withdrawable = canharvest ? tWithdrawable * 1000000000000000000 : 0

    const onHarvest = useCallback(async () => {
      if(!canharvest) {
        toastError(t('Error'), t('Your withdraw amount exceeds Max value today. Please try tomorrow'))
      } else {
        setPendingTx(true)
          try {
            await harvestReward(morebnbContract, withdrawable.toString())
            toastSuccess(
              `${t('Claimed')}!`,
              t('Your %symbol% rewards have been sent to your wallet!', { symbol: 'BNB' }),
            )
          } catch (error) {
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
          }
        setPendingTx(false)
      }
      // await harvestReward(morebnbContract, tWithdrawable)
    }, [ morebnbContract, canharvest, toastSuccess, toastError, t, withdrawable])
  return (
    <>
    <Box maxWidth="888px" {...props} minHeight="500px">
      {tDeposit > 0 && 
      <Card>
        <Heading color="primary"  mt={20} ml={20}>Dividends</Heading>
        <StyleGrid>
          <StyledCard>
            <StyledCardBody>
              <Text fontSize="18px" mb="8px">{t('My BNB Invested')}</Text>
              <Row>
                <CardValue fontSize="22px" decimals={3}  value={tDeposit}/>
                <Text fontSize="24px" ml="5px">BNB</Text>
              </Row>
            </StyledCardBody>
          </StyledCard>
          <StyledCard>
            <StyledCardBody>
              <Text fontSize="18px" mb="8px">{t('Withdrawn')}</Text>
              <Row>
                <CardValue fontSize="22px" decimals={3}  value={tWithdrawn}/>
                <Text fontSize="24px" ml="5px">BNB</Text>
              </Row>
            </StyledCardBody>
          </StyledCard>
        </StyleGrid>
        <StyleGrid>
          <StyledCard>
            <StyledCardBody>
              <Text fontSize="18px" mb="8px">{t('Referral Rewards')}</Text>
              <Row>
                <CardValue fontSize="22px" decimals={3}  value={tRewards}/>
                <Text fontSize="24px" ml="5px">BNB</Text>
              </Row>
            </StyledCardBody>
          </StyledCard>
          <StyledCard>
            <StyledCardBody>
              <Text fontSize="18px" mb="8px">{t('Withdrawable')}</Text>
              <Row>
                <CardValue fontSize="22px" decimals={4}  value={tWithdrawable}/>
                <Text fontSize="24px" ml="5px">BNB</Text>
              </Row>
            </StyledCardBody>
          </StyledCard>
        </StyleGrid>
        <Flex justifyContent="center" mt="32px">
          <Button
              scale="sm"
              width="200px"
              height="45px"
              mb="20px"
              style={{color:'#fff', borderRadius: "22px"}}
              disabled={
                pendingTx || !canharvest
              }
              onClick={onHarvest}
            >
              {pendingTx ? t('Withdrawing') : t('Withdraw')}
          </Button>
        </Flex>
      </Card>}
      <Card mt="32px">
        <Heading color="primary"  mt={20} ml={20}>Invest</Heading>
        <StyleGrid>
          <StyledCard>
            <StyledCardBody>
              <Text fontSize="18px" mb="8px">{t('Daily ROI')}</Text>
              <Row>
                <CardValue fontSize="22px" decimals={0}  value={10}/>
                <Text fontSize="24px" ml="5px">%</Text>
              </Row>
            </StyledCardBody>
          </StyledCard>
          <StyledCard>
            <StyledCardBody>
              <Text fontSize="18px" mb="8px">{t('Total ROI')}</Text>
              <Row>
                <CardValue fontSize="22px" decimals={0}  value={200}/>
                <Text fontSize="24px" ml="5px">%</Text>
              </Row>
            </StyledCardBody>
          </StyledCard>
        </StyleGrid>
        <StakeInner days="20" pdaily={100} pid={3} total={200}/>
      </Card>
    </Box>
    </>
  )
}

export default StakeCard