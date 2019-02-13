const utils = {
  tronWeb: false,
  contract: false,

  setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
  },

  async setContract(tronWeb, contractAddress) {
    this.contract = await tronWeb.contract().at(contractAddress);
  }
};

export default utils;
