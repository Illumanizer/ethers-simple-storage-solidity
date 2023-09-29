const fs = require("fs-extra");
const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); //RPC network address of blockchain
  const encryptedJsonKey = fs.readFileSync("./encryptedKey.json", "utf8");

  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    encryptedJsonKey,
    process.env.PRIVATE_KEY_PASSWORD
  ); //private key of wallet user
  wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please Wait.......");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);
  //   console.log(contract);

  // console.log(deploymentReceipt)

  // console.log('====================================');
  // const nonce=await wallet.getNonce()
  // console.log("Let's'deploy with transaction data");
  // const tx={
  //   nonce: nonce,
  //   gasPrice: 100000000000,
  //   gasLimit: 1000000,
  //   to:null,
  //   value:0,
  //   data:"0x608060405234801561000f575f80fd5b506108f28061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610055575f3560e01c80632e64cec1146100595780636057361d146100775780636f760f41146100935780638bab8dd5146100af5780639e7a13ad146100df575b5f80fd5b610061610110565b60405161006e919061029f565b60405180910390f35b610091600480360381019061008c91906102f3565b610118565b005b6100ad60048036038101906100a8919061045a565b610121565b005b6100c960048036038101906100c491906104b4565b6101a5565b6040516100d6919061029f565b60405180910390f35b6100f960048036038101906100f491906102f3565b6101d2565b604051610107929190610575565b60405180910390f35b5f8054905090565b805f8190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003905f5260205f2090600202015f909190919091505f820151815f0155602082015181600101908161017b919061079d565b5050508060028360405161018f91906108a6565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050505f915090505481565b600181815481106101e1575f80fd5b905f5260205f2090600202015f91509050805f015490806001018054610206906105d0565b80601f0160208091040260200160405190810160405280929190818152602001828054610232906105d0565b801561027d5780601f106102545761010080835404028352916020019161027d565b820191905f5260205f20905b81548152906001019060200180831161026057829003601f168201915b5050505050905082565b5f819050919050565b61029981610287565b82525050565b5f6020820190506102b25f830184610290565b92915050565b5f604051905090565b5f80fd5b5f80fd5b6102d281610287565b81146102dc575f80fd5b50565b5f813590506102ed816102c9565b92915050565b5f60208284031215610308576103076102c1565b5b5f610315848285016102df565b91505092915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61036c82610326565b810181811067ffffffffffffffff8211171561038b5761038a610336565b5b80604052505050565b5f61039d6102b8565b90506103a98282610363565b919050565b5f67ffffffffffffffff8211156103c8576103c7610336565b5b6103d182610326565b9050602081019050919050565b828183375f83830152505050565b5f6103fe6103f9846103ae565b610394565b90508281526020810184848401111561041a57610419610322565b5b6104258482856103de565b509392505050565b5f82601f8301126104415761044061031e565b5b81356104518482602086016103ec565b91505092915050565b5f80604083850312156104705761046f6102c1565b5b5f83013567ffffffffffffffff81111561048d5761048c6102c5565b5b6104998582860161042d565b92505060206104aa858286016102df565b9150509250929050565b5f602082840312156104c9576104c86102c1565b5b5f82013567ffffffffffffffff8111156104e6576104e56102c5565b5b6104f28482850161042d565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b83811015610532578082015181840152602081019050610517565b5f8484015250505050565b5f610547826104fb565b6105518185610505565b9350610561818560208601610515565b61056a81610326565b840191505092915050565b5f6040820190506105885f830185610290565b818103602083015261059a818461053d565b90509392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806105e757607f821691505b6020821081036105fa576105f96105a3565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261065c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610621565b6106668683610621565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6106a161069c61069784610287565b61067e565b610287565b9050919050565b5f819050919050565b6106ba83610687565b6106ce6106c6826106a8565b84845461062d565b825550505050565b5f90565b6106e26106d6565b6106ed8184846106b1565b505050565b5b81811015610710576107055f826106da565b6001810190506106f3565b5050565b601f8211156107555761072681610600565b61072f84610612565b8101602085101561073e578190505b61075261074a85610612565b8301826106f2565b50505b505050565b5f82821c905092915050565b5f6107755f198460080261075a565b1980831691505092915050565b5f61078d8383610766565b9150826002028217905092915050565b6107a6826104fb565b67ffffffffffffffff8111156107bf576107be610336565b5b6107c982546105d0565b6107d4828285610714565b5f60209050601f831160018114610805575f84156107f3578287015190505b6107fd8582610782565b865550610864565b601f19841661081386610600565b5f5b8281101561083a57848901518255600182019150602085019450602081019050610815565b868310156108575784890151610853601f891682610766565b8355505b6001600288020188555050505b505050505050565b5f81905092915050565b5f610880826104fb565b61088a818561086c565b935061089a818560208601610515565b80840191505092915050565b5f6108b18284610876565b91508190509291505056fea2646970667358221220e67a69b8ab2ed7cdd4b13955e60fb7b9e4dace88d893537204f203901b01b25264736f6c63430008150033",
  //   chainId:1337,
  // }
  // const signedTxResponse=await wallet.signTransaction(tx);

  // const sendTxResponse=await wallet.sendTransaction(tx);
  // await sendTxResponse.wait(1);
  // console.log(sendTxResponse)
  // console.log('====================================');

  const currentFavouriteNumber = await contract.retrieve();
  console.log("Current Favourite Number:", currentFavouriteNumber.toString());
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavouriteNumber = await contract.retrieve();
  console.log("Updated Favourite Number:", updatedFavouriteNumber.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
