require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const forking = process.env.FORK_URL
  ? { url: process.env.FORK_URL }
  : undefined;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: '0.8.9',

  networks: {
    hardhat: {
      forking,
    },
  },

};
