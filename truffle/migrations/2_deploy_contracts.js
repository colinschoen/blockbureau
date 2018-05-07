var blockbureau= artifacts.require("./blockbureau.sol");

module.exports = function(deployer) {
  deployer.deploy(blockbureau, {gas: 200000});
};
