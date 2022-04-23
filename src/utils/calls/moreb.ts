import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import getGasPrice from 'utils/getGasPrice'
import Cookies from 'universal-cookie';
import rot13 from 'utils/encode';
import { isAddress } from 'utils';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const cookies = new Cookies();

export const stake = async (morebnbContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  console.log('debug->value', amount)
  // if (pid === 0) {
  //   const tx = await masterChefContract.enterStaking(value, { ...options, gasPrice })
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  let ref
  if(cookies.get('ref')) {
    if(isAddress( rot13(cookies.get('ref')) )) {
      ref = rot13(cookies.get('ref'))
    }
  } else {
    ref = "0x0000000000000000000000000000000000000000"
  }
  const tx = await morebnbContract.invest(pid, ref, { ...options, gasPrice, value })
  // const tx = await callWithGasPrice(morebnbContract, 'invest', [ref, pid], { value: amount.toString() })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestReward = async (morebnbContract, amount) => {

    const gasPrice = getGasPrice()

    const tx = await morebnbContract.withdraw(amount)
    const receipt = await tx.wait()
    return receipt.status
}

export const reinvestReward = async (morebnbContract) => {

  const gasPrice = getGasPrice()
  const pid = 2 
  const tx = await morebnbContract.reinvest(pid, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}