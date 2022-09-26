function getContractByName(name, web3) {
    const contract = require("../abi/" + name + ".json")
    const chainId =  "1234"
    return new web3.eth.Contract(contract.abi, contract.networks[chainId].address, {});
}

async function getContractByToken(name, address, web3) {
    const contract = require("../abi/" + name + ".json")
    // const chainId = await web3.eth.getChainId()
    const chainId = 1234
    return new web3.eth.Contract(contract.abi, contract.networks[chainId].address, {});
}
function getContractByAddress(name, address, web3) {
    const contract = require("../abi/" + name + ".json")
    return new web3.eth.Contract(contract.abi, address, {});
}
async function getContractAddress(name, web3) {
    console.log(web3)
    const contract = require("../abi/" + name + ".json")
    // const chainId = await web3.eth.getChainId()
    const chainId = 1234
    return contract.networks[chainId].address;
}

export default {
    getContractByName,
    getContractByToken,
    getContractByAddress,
    getContractAddress
};
