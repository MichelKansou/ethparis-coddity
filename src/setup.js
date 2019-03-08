import Web3 from 'web3';
import * as PrinterContractABI from './ethereum/build/contracts/PrinterContract.json'

const web3 = new Web3(window.web3.currentProvider);
const contractAddress = '0x536b420a77f647d544ee2b35eb700107d4f53602';
const ABI = PrinterContractABI.abi;
const printerContractABI = new web3.eth.Contract(ABI, contractAddress);
export {web3, printerContractABI, contractAddress, ABI};
