export interface INewContract {
  id: string;
  name: string;
  description: string;
  network: NetworkType;
  deployedAddress: string;
  abi: string;
  creator?: string;
  createdAt?: string;
  updatedAt?: string;
  isLocked?: boolean;
}

export type NetworkType = 'rinkeby' | 'mainnet' | 'kovan' | 'goerli' | 'ropsten' | 'xDai' | 'maticMumbaiTestnet';
