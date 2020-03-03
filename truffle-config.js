require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    nodeOne: {
      host: "127.0.0.1",
      port: 22000, // replace with quorum node port you wish to connect to
      network_id: "*",
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    nodeSeven: {
      host: "127.0.0.1",
      port: 22006, // replace with quorum node port you wish to connect to
      network_id: "*",
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    nodeFour: {
      host: "127.0.0.1",
      port: 22003, // replace with quorum node port you wish to connect to
      network_id: "*",
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
