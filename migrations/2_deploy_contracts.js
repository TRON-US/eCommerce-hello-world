var ECommerce = artifacts.require("./ECommerce.sol");

module.exports = function(deployer) {
  deployer.deploy(ECommerce);
};
