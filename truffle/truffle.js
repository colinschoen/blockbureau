module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
//  contracts_build_directory: "../output",
//
  networks: {
    development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
    },
    rinkeby: {
        host: "localhost",
        port: "8545",
        from: "0x5a2Ea2c468765fa2b508847B10c57d8a7C153beb",
        network_id: "*",
        gas: 4612388

    }
   }

};
