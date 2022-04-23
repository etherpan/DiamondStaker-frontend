import { Box, Table, Th, Td } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import useRollInfo, { useRollIndex } from 'hooks/useDice'
import { getBalanceNumber } from 'utils/formatBalance'
import HistoryItem from './HistoryItem'

const History = () => {
    const rollindex = useRollIndex()
    const rollindexs: (number)[] = []
    let i;
    for(i = 0; i < 10 ; i++) {
        if (i < rollindex){
            rollindexs.push(rollindex - i)
        }
    }
    return (
      <>
        <Box>
            <h1 style={{fontSize: "24px", textAlign: "center", color: "white"}}>History</h1>
            <Table>
                <tr>
                    <Th>ID</Th>
                    <Th>User</Th>
                    <Th>Result</Th>
                    <Th>Guess</Th>
                    <Th>Amount</Th>
                </tr>
                {
                    rollindexs.map((_index) =>
                        <HistoryItem index = {_index - 1} />
                    )
                }
            </Table>
        </Box>
      </>
    )
  }
  
  export default History