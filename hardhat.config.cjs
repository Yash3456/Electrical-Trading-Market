/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      accounts: {
        count: 10,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
