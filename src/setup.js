import Web3 from 'web3';
import * as PrinterContractABI from './ethereum/build/contracts/PrinterContract.json'

const web3 = new Web3(window.web3.currentProvider);
const contractAddress = '0x63d00e7a139e6ce6a25b1693e948ac9d2e425009';
const ABI = PrinterContractABI.abi;
const printerContract = new web3.eth.Contract(ABI, contractAddress);
export {web3, printerContract, contractAddress, ABI};
