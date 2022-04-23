import React from 'react'
import { Box, BoxProps } from '@pancakeswap/uikit'

const Container: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box px={['16px', '24px']} mx="auto" {...props}>
    {children}
  </Box>
)

export default Container
