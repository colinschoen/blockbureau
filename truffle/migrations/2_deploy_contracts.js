var blockbureau= artifacts.require("blockbureau");

module.exports = function(deployer) {
  deployer.deploy(blockbureau, {gas: 4700000});
};
