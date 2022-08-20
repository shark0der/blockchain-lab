require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: '0.8.9',

  networks: {
    hardhat: {
      hardfork: 'berlin',
      forking: {
        url: process.env.PROVIDER_URL,
        enabled: !!process.env.FORK,
      },
    },
  },

};
