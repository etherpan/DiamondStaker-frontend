import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT } from 'config'
import getGasPrice from 'utils/getGasPrice'
import Cookies from 'universal-cookie';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const cookies = new Cookies();

export const claimReward = async (shivaContract) => {

  const gasPrice = getGasPrice()

  const tx = await shivaContract.claim({ ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const exchangeNew = async (exchangeContract) => {
  const gasPrice = getGasPrice()

  const tx = await exchangeContract.exchange({ ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}
