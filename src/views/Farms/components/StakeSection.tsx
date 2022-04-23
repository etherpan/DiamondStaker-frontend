import React, { useState } from 'react'
import styled from 'styled-components'
import { ExpandableLabel, Flex, FlexProps, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

interface StakeSectionProps extends FlexProps {
  days?: string
  pdaily?: number
  total?: string
  pid?: number
}

const Wrapper = styled.tr`
  cursor: pointer;
  td:last-child{
      padding: 30px 0px;
  }
`

const StrTd = styled.td`
    padding: 30px 20px;
`

const StyledExpandableLabelWrapper = styled(Flex)`
  button {
    align-items: center;
    justify-content: flex-start;
  }
`

const StyledChildrenFlex = styled(Flex)<{ isExpanded?: boolean }>`
  overflow: hidden;
  padding: 0px 20px;
  height: ${({ isExpanded }) => (isExpanded ? '100%' : '0px')};
  padding-bottom: ${({ isExpanded }) => (isExpanded ? '16px' : '0px')};
  padding-top: ${({ isExpanded }) => (isExpanded ? '16px' : '0px')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  align-items: center;
  justify-content: space-between;
  @media (max-width: 767px) {
        display: block;
    }
`

const StakeSection: React.FC<StakeSectionProps> = ({ days, pdaily, total, pid, children, ...props }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
      <>
    <Wrapper {...props}  onClick={() => setIsExpanded(!isExpanded)}>
      <StrTd>
        <Text fontWeight="bold" >{days}</Text>
      </StrTd>
      <StrTd>
        <Text fontWeight="bold"  textAlign="center">{pdaily/10}%</Text>
      </StrTd>
      <StrTd>
        <Text fontWeight="bold"  textAlign="center">{`${total}%`}</Text>
      </StrTd>
      <StrTd>
        <StyledExpandableLabelWrapper>
          <ExpandableLabel expanded={isExpanded} >
            {/* {isExpanded ? t('Hide') : t('Details')} */}
          </ExpandableLabel>
        </StyledExpandableLabelWrapper>
      </StrTd>
    </Wrapper>
    <tr>
        <td colSpan={4}>
      <StyledChildrenFlex isExpanded={isExpanded} flexDirection="row">
        {children}
      </StyledChildrenFlex>
      </td>
    </tr>
    </>
  )
}

export default StakeSection