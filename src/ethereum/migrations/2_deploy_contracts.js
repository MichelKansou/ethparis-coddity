var PrinterContract = artifacts.require("./PrinterContract.sol");

module.exports = function(deployer) {
    deployer.deploy(PrinterContract);
};