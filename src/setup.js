import Web3 from 'web3';
import * as PrinterContractABI from './ethereum/build/contracts/PrinterContract.json'

const web3 = new Web3(window.web3.currentProvider);
const contractAddress = '0xb72f7d89fa89f258f6a73c3108a0b15cb4242db1';
const ABI = PrinterContractABI.abi;
const printerContract = new web3.eth.Contract(ABI, contractAddress);
export {web3, printerContract, contractAddress, ABI};
