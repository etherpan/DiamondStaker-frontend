import { Flex, Image, Td } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import useRollInfo, { useRollIndex } from 'hooks/useDice'
import { getBalanceNumber } from 'utils/formatBalance'
import { shortenAddress } from 'utils'

interface HistoryItemProps {
    index: number
}
const HistoryItem: React.FC<HistoryItemProps> = ({index}) => {
    const rollitem = useRollInfo(index)
    const paid = rollitem.info.paid
    const diceImg = (i: number, b: boolean) => {
        return <Image src={`images/${i}.png`} width={32} height={32} alt="diceLogo" style={{border: b ? '2px solid red' : 'none'}}/>
    }
    return (
      <>
        <tr style={{textAlign: "center"}}>
            <Td>{rollitem.info.id ? rollitem.info.id.toString() : "N/A"}</Td>
            <Td>{rollitem.info.id ? shortenAddress(rollitem.info.user) : "N/A"}</Td>
            <Td><Flex justifyContent="center">{rollitem.info.id ? diceImg(rollitem.info.result, true) : "N/A"}</Flex></Td>
            <Td><Flex justifyContent="center">{rollitem.info.id ? diceImg(rollitem.info.guess, false) : "N/A"}</Flex></Td>
            <Td style={{color: `${paid ? "green" : "red"}`}}>{rollitem.info.id ? `${paid ? getBalanceNumber(rollitem.info.paidAmount.toString()) : getBalanceNumber(rollitem.info.rollAmount.toString())} BNB` : "N/A"}</Td>
        </tr>
      </>
    )
  }
  
  export default HistoryItem