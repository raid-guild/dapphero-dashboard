export interface INewContract {
  id?: string;
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

export interface IProject {
  name: string;
  description: string;
  coverImg: string;
  network: NetworkType;
  contracts: never[];
  provider: string;
  creator: string;
  htmlLink: string;
  createdAt: string;
  updatedAt: string;
  isPaused: boolean;
  isLocked: boolean;
}

export interface IContract {
  id?: string;
  name: string;
  description: string;
  network: NetworkType;
  deployedAddress: string;
  abi: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  isLocked: boolean;
}

export type NetworkType = 'rinkeby' | 'mainnet' | 'kovan' | 'goerli' | 'ropsten' | 'xDai' | 'maticMumbaiTestnet' | '';
