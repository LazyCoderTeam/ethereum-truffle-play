import { ITransactionObject, OnCompletedCallback, IContractDeploymentReceipt, IError } from "Uforeum";


/** SimpleStorage Ethereum smart contract repository. */
class SimpleStorageRepository {
	private abi: any = JSON.parse('[{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
	private bin: string = '6060604052341561000f57600080fd5b60de8061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e60a9565b6040518082815260200191505060405180910390f35b5b60011560a657806000819055506095565b50565b600080549050905600a165627a7a7230582043deb08da8d616ad11cafd1995febdfd724de43c9b87f2956a4f53778bbfb37d0029';

	constructor(private web3: any){
	}

	getDeployed(address:string) : SimpleStorage {
		const contract : any = this.web3.eth.contract(this.abi);
		return new SimpleStorage(contract.at(address), this.web3, this.abi, this.bin);
	}
	
	deploy() : IContractDeploymentReceipt<SimpleStorage>  {	
		let contract : any = this.web3.eth.contract(this.abi);
		 
		const response = contract.new({
			data: this.bin,
			gas: 88976, 
			from: this.web3.eth.defaultAccount
		});
				
		let receipt = this.web3.eth.getTransactionReceipt(response.transactionHash);
		return {
			transactionHash: response.transactionHash,
			transactionIndex: receipt.transactionIndex,
			blockHash: receipt.blockHash,
			blockNumber: receipt.blockNumber,
			contractAddress: receipt.contractAddress,
			cumulativeGasUsed: receipt.cumulativeGasUsed,
			getDeployed: () => {
				if (receipt && receipt.contractAddress) {
					console.log("Your contract has been deployed at " + receipt.contractAddress);
					console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");	
					contract = this.web3.eth.contract(this.abi);
					return new SimpleStorage(contract.at(receipt.contractAddress), this.web3, this.abi, this.bin);					
				}
				return undefined;
			}
		};	
	}
}


 

class SimpleStorage{
	public address: string;

	constructor(private innerProxy: any, private web3: any, private abi: any, private bin: string){
		this.address = innerProxy.address;
	}

	
	 	
	/** get (View). */
	get() : number{
		 
		var result = this.innerProxy.get.call(); 
		return result; 
	}

	/** get (View). */
	getAsync() : Promise<number>{
		return new Promise<number>((resolve, reject) => {
			try {
				this.innerProxy.get.call((err, result) => {
					if (err)
						reject(err);

					resolve(result);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}  

	 	
	/** set (NonPayable). */
	set(x: number) : Promise<void>{
			return new Promise<void>((resolve, reject) => {
			try {
				var callback = (err, result) => { if (err) {reject(err);} resolve(result); };
				 

				const contract : any = this.web3.eth.contract(this.abi).at(this.address);
				var estimate = contract.set.estimateGas(x, { from: this.web3.eth.defaultAccount });
				console.log("Estimate for 'set': " + estimate);


				 
				var trn = {gas: estimate, from: this.web3.eth.defaultAccount};
				 

				
				return this.innerProxy.set.sendTransaction(x, trn, callback); 
				
				 
			}
			catch (err) {
				reject(err);
			}
		});
	}  
}

 

export{ SimpleStorageRepository, SimpleStorage}

