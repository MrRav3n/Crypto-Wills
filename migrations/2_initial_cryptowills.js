const CryptoWills = artifacts.require("CryptoWills");

module.exports = function(deployer) {
    deployer.deploy(CryptoWills, "0x38AbE9cD95ED1F7d7a4fa087Fb93B7694eB2D625");
};
