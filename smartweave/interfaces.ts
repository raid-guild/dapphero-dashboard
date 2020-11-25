export interface ProjectActionInterface {
    input: ProjectInput
    caller: string
}

export interface ContractActionInterface {
    input: ContractInput
    caller: string
}

export interface ContractHandlerResult {
    result?: any
    state?: any
}

export interface ProjectInterface {
    name: string
    description: string
    coverImg: string
    network: NetworkType
    contracts: string[]
    creator?: string
    createdAt?: string
    updatedAt?: string
    isPaused?: boolean
    isLocked?: boolean
}

export interface ContractInterface {
    name: string
    description: string
    network: NetworkType
    deployedAddress: string
    abi: string
    creator?: string
    createdAt?: string
    updatedAt?: string
    isLocked?: boolean
}

export interface ProjectInput {
    function: FunctionType
    id?: string
    project: ProjectInterface
}

export interface ContractInput {
    function: FunctionType
    id?: string,
    contract: ContractInterface
}

export type NetworkType = 'rinkeby' | 'mainnet' | 'kovan' | 'goerli' | 'ropsten' | 'xDai' | 'maticMumbaiTestnet'
export type FunctionType = 'create' | 'update' | 'get'