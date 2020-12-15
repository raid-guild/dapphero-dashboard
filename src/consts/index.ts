export const CORE_ADDRESS = 'https://arweave.net/Bvlkgd4UbOTxt0qsXAy_Wucxpo9xZ9IMj3v2egIDWNI'

export const DASHBOARD_ADDRESS = 'https://arweave.net/CvPRezjo7CrvhRebqbiadAmXi-5n16B2mCqEAw1bIFo'

export const DEFAULT_CONTRACT = {
	name: 'newContract',
	description: 'My new contract description',
	network: '',
	deployedAddress: '0x0000000000000000000000000000000000000000',
	abi: '[]',
	creator: '',
	createdAt: new Date().toUTCString(),
	updatedAt: new Date().toUTCString(),
	isLocked: false
}

export const DEFAULT_PROJECT = {
    name: 'myProjectName',
    description: 'My new project description',
    coverImg: 'Test 1 image',
    network: '',
    contracts: [],
    provider: 'https://<network>.infura.io/v3/<Project ID>',
    creator: '',
    createdAt: '',
    updatedAt: '',
    isPaused: false,
    isLocked: false,
}
