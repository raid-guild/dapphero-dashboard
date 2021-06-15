import type { NetworkType } from 'utils/types';

export const CORE_ADDRESS = 'https://arweave.net/GmzoDdqjQC_VNHrScKuNtWyTFzD1UVIkfhkC-4MYYWE';

export const DASHBOARD_ADDRESS = 'https://arweave.net/CvPRezjo7CrvhRebqbiadAmXi-5n16B2mCqEAw1bIFo';

export const DEFAULT_CONTRACT = {
  name: 'newContract',
  description: 'My new contract description',
  network: '' as NetworkType,
  deployedAddress: '0x0000000000000000000000000000000000000000',
  abi: '',
  creator: '',
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
  isLocked: false,
};

export const DEFAULT_PROJECT = {
  name: 'myProjectName',
  description: 'My new project description',
  coverImg: 'Test 1 image',
  network: '' as NetworkType,
  contracts: [],
  provider: 'https://<network>.infura.io/v3/<Project ID>',
  creator: '',
  htmlLink: '',
  createdAt: '',
  updatedAt: '',
  isPaused: false,
  isLocked: false,
};
