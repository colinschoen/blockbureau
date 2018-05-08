var blockbureau= artifacts.require("./blockbureau.sol");

module.exports = function(deployer) {
  deployer.deploy(blockbureau, {gas: 4700000});
};
