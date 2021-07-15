import { ContractActionInterface, ContractInput, ContractList } from './interfaces';

declare const ContractError: any;
declare const SmartWeave: any;

export function handle(state: any, action: ContractActionInterface) {
  const input: ContractInput = action.input;

  if (input.function === 'create') {
    const contract = input.contract;

    state.contracts[SmartWeave.transaction.id] = {
      name: contract.name,
      description: contract.description,
      network: contract.network,
      deployedAddress: contract.deployedAddress,
      abi: contract.abi,
      creator: action.caller,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      isLocked: contract.isLocked || false,
    };

    return { state };
  }

  if (action.input.function === 'update') {
    const id = input.id || '';
    const contract = input.contract;

    if (!state.contracts[id]) {
      throw new ContractError('Contract deos not exist');
    }

    if (state.contracts[id].creator !== action.caller) {
      throw new ContractError('Contract is owned by another caller');
    }

    state.contracts[id].name = contract.name;
    state.contracts[id].description = contract.description;
    state.contracts[id].network = contract.network;
    state.contracts[id].deployedAddress = contract.deployedAddress;
    state.contracts[id].abi = contract.abi;
    state.contracts[id].isLocked = contract.isLocked;
    state.contracts[id].updatedAt = new Date().toUTCString();

    return { state };
  }

  if (action.input.function === 'get') {
    const id = input.id || '';

    if (!state.contracts[id]) {
      throw new ContractError('Contract does not exist');
    }

    const result = state.contracts[id];

    return { result };
  }

  if (action.input.function === 'delete') {
    const id = input.id || '';

    if (!state.contracts[id]) {
      throw new ContractError('Contract does not exist');
    }

    if (state.contracts[id].creator !== action.caller) {
      throw new ContractError('Contract is owned by another caller');
    }

    delete state.contracts[id];

    return { state };
  }

  if (action.input.function === 'getByCreator') {
    const result: ContractList = {};

    for (const key in state.contracts) {
      if (state.contracts[key].creator === action.caller) {
        result[key] = state.contracts[key];
      }
    }

    return { result };
  }

  throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
}
