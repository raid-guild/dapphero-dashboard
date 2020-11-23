/* eslint-disable no-undef */
import { validateContract } from './utils'

/**
 * Contract
 *  name: string
 *  description: string
 *  network: string
 *  deployedAddress: string
 *  abi: string
 *  creator: string
 *  createdAt: string
 *  updatedAt: string
 *  isLocked: boolean
 */

export function handle(state, action) {

    if (action.input.function === 'create') {
        validateContract(action.input)

        state.contracts[SmartWeave.transaction.id] = {
            name: action.input.name,
            description: action.input.description,
            network: action.input.network,
            deployedAddress: action.input.deployedAddress,
            abi: action.input.abi,
            creator: SmartWeave.transaction.owner,
            createdAt: new Date().toUTCString(),
            updatedAt: new Date().toUTCString(),
            isLocked: false
        }

        return { state }
    }

    if (action.input.function === 'update') {
        if (!state.contracts[action.input.id]) {
            throw new ContractError('Contract deos not exist')
        }

        validateContract(action.input)

        state.contracts[action.input.id].name = action.input.name
        state.contracts[action.input.id].description = action.input.description
        state.contracts[action.input.id].network = action.input.network
        state.contracts[action.input.id].deployedAddress = action.input.deployedAddress
        state.contracts[action.input.id].abi = action.input.abi
        state.contracts[action.input.id].updatedAt = new Date().toUTCString()

        return { state }
    }

    if (action.input.function === 'setLocked') {

        if (!state.contracts[action.input.id]) {
            throw new ContractError('Project does not exist')
        }

        if (!isBool(action.input.isLocked)) {
            throw new ContractError('Invalid locked state provided')
        }

        state.contracts[action.input.id].isLocked = action.input.isLocked
        state.contracts[action.input.id].updatedAt = new Date().toUTCString()

        return { state }
    }

    throw new ContractError('Invalid input')
}